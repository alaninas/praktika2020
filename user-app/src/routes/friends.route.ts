import express from 'express';
import createError from 'http-errors';
import mongoose, { Document, model, Schema } from 'mongoose';
import UserModel, { IPerson } from '../models/user.model';
import UserVUtility from '../utilities/userv.utility';

// Digest: md5('mypwd') := 318bcb4be908d0da6448a0db76908d78
const FriendsRouter = express.Router();

function generateObjectIds ({ userId, friendId, next }:
    { userId: string | undefined; friendId: string | undefined; next: express.NextFunction; }): any {
        if (!userId || !friendId) return next(createError(400, 'Insufficient information provided'));
        const userObjectId = mongoose.Types.ObjectId(userId);
        const friendObjectId = mongoose.Types.ObjectId(friendId);
        const match = {_id: {$in: [userObjectId, friendObjectId]}};
        UserModel.aggregate([{$match: match}], (err: any, docs: any) => {
            if (docs.length !== 2 || err) return next(createError(404, 'No such pair of users found in DB'));
        });
        return {uid: userObjectId, fid: friendObjectId};
}

FriendsRouter.get('/users/:id/friends', (req, res, next) => {
    const userId = req.params.id;
    if (!userId) return next(createError(400, 'Insufficient information provided'));
    const lookup = {from: "people", localField: "friends", foreignField: "_id", as: "friends"};
    const match = {_id: mongoose.Types.ObjectId(userId)};
    UserModel.aggregate([{$lookup: lookup}, {$match: match}], (err: any, docs: any) => {
        if (err) return next(createError(404, 'No friends for this user'));
        res.json({friends: docs[0].friends});
    });
})

FriendsRouter.post('/users/addfriend', async (req, res, next) => {
    const oids = generateObjectIds({userId: req.body.id, friendId: req.body.friend, next});
    if (!oids) return next(createError(400, 'Error while reading DB'));
    const duplicates = {$in: [oids.fid]};
    try {
        const areDuplicates = await UserModel.findOne({_id: oids.uid, friends: duplicates});
        if (areDuplicates) return next(createError(400, 'Already friends'));
        const resUID = await UserModel.findById(oids.uid);
        const resFID = await UserModel.findById(oids.fid);
        if (!resUID || !resFID) return next(createError(404, 'No such user found in DB'));
        resUID.friends.push(oids.fid);
        resFID.friends.push(oids.uid);
        await resUID.save();
        await resFID.save();
        res.json({Success: 'Friends added'});
    } catch (error) {
        next(createError(400, 'Error while saving data to DB'));
    }
})

FriendsRouter.post('/users/remfriend', async (req, res, next) => {
    const oids = generateObjectIds({userId: req.body.id, friendId: req.body.friend, next});
    if (!oids) return next(createError(400, 'Error while reading DB'));
    const duplicates = {$in: [oids.fid]};
    try {
        const areDuplicates = await UserModel.findOne({_id: oids.uid, friends: duplicates});
        if (!areDuplicates) return next(createError(400, 'Not friends'));
        const resUID = await UserModel.findById(oids.uid);
        const resFID = await UserModel.findById(oids.fid);
        if (!resUID || !resFID) return next(createError(404, 'No such user found in DB'));
        const indexFID = resUID.friends.indexOf(oids.fid);
        const indexUID = resFID.friends.indexOf(oids.uid);
        resUID.friends.splice(indexFID, 1);
        resFID.friends.splice(indexUID, 1);
        await resUID.save();
        await resFID.save();
        res.json({Success: 'Friends removed'});
    } catch (error) {
        next(createError(400, 'Error while saving data to DB'));
    }
})

export default FriendsRouter;
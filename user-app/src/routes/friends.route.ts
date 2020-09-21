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
        const result = await UserModel.findOne({_id: oids.uid, friends: duplicates});
        if (result) return next(createError(400, 'Already friends'));
        const resUID = await UserModel.findById(oids.uid);
        const resFID = await UserModel.findById(oids.fid);
        if (!resUID || !resFID) return next(createError(404, 'No such user found in DB'));
        resUID.friends.push(oids.fid);
        resFID.friends.push(oids.uid);
        await resUID.save();
        await resFID.save();
        res.json({Success: 'Friends updated'});
    } catch (error) {
        next(createError(400, 'Error while saving data to DB'));
    }
})

FriendsRouter.post('/users/remfriend', (req, res, next) => {
    const oids = generateObjectIds({userId: req.body.id, friendId: req.body.friend, next});
    if (!oids) return next(createError(400, 'Error while reading DB'));
    const duplicates = {$in: [oids.fid]};
    UserModel.findOne({_id: oids.uid, friends: duplicates}, (err: any, result: IPerson | null) => {
        if (!result || err) return next(createError(400, 'Not friends'))
        UserModel.findById(oids.uid, (err2: any, result2: IPerson | null) => {
            if (result2 && result2.friends) {
                const index = result2.friends.indexOf(oids.fid);
                result2.friends.splice(index, 1);
                result2.save((err3: any, raw: any) => {
                    err3 ? next(createError(400, 'Error while saving data to DB')) : res.json(raw);
                });
            }
        });
    })
})

export default FriendsRouter;
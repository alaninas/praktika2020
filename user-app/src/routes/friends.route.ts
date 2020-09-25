import express from 'express';
import createError from 'http-errors';
import mongoose from 'mongoose';
import UserModel from '../models/user.model';

// Digest: md5('mypwd') := 318bcb4be908d0da6448a0db76908d78
const FriendsRouter = express.Router();

function generateObjectIds ({ userId, friendId, next }:
    { userId: string | undefined; friendId: string | undefined; next: express.NextFunction; }): any {
        if (!userId || !friendId) return next(createError(400, 'Insufficient information provided'));
        // if (!userId || !friendId) return {uid: userId || null, fid: friendId || null};
        const userObjectId = mongoose.Types.ObjectId(userId);
        const friendObjectId = mongoose.Types.ObjectId(friendId);
        // const match = {_id: {$in: [userObjectId, friendObjectId]}};
        // UserModel.aggregate([{$match: match}], (err: any, docs: any) => {
            // if (docs.length !== 2 || err) return next(createError(404, 'No such pair of users found in DB'));
            // if (docs.length !== 2 || err) return {uid: userId || null, fid: friendId || null};
        // });
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

// const {uid,fid} = generateObjectIds({userId: req.body.id, friendId: req.body.friend, next});
// if !uid || !fid -->> two different errors throw here
FriendsRouter.post('/users/addfriend', async (req, res, next) => {
    const oids = generateObjectIds({userId: req.body.id, friendId: req.body.friend, next});
    if (!oids) return next(createError(400, 'Error while reading DB'));
    const match = {_id: {$in: [oids.uid, oids.fid]}};
    const project1 = {
        "friends": 1, addedFriends: {$cond: [{$eq: ["$_id", oids.uid]}, [oids.fid], [oids.uid]]}
    };
    const project2 = {
        friends: {$concatArrays: ["$friends", {"$setDifference": ["$addedFriends", "$friends"]}]}
    };
    try {
        const updatedFriends = await UserModel.aggregate([
            {$match: match}, {$project: project1}, {$project: project2}
        ]);
        await UserModel.findByIdAndUpdate(oids.uid, {friends: updatedFriends[0].friends});
        await UserModel.findByIdAndUpdate(oids.fid, {friends: updatedFriends[1].friends});
        // console.log(updatedFriends[0])
        res.json({Success: 'Friends added'});
    } catch (error) {
        next(createError(400, 'Error while saving data to DB'));
    }
})

FriendsRouter.post('/users/remfriend', async (req, res, next) => {
    const oids = generateObjectIds({userId: req.body.id, friendId: req.body.friend, next});
    if (!oids) return next(createError(400, 'Error while reading DB'));
    const match = {_id: {$in: [oids.uid, oids.fid]}};
    UserModel.aggregate([{$match: match}], (err: any, docs: any) => {
        if (docs.length !== 2 || err) return next(createError(404, 'No such pair of users found in DB'));
        // if (docs.length !== 2 || err) return {uid: userId || null, fid: friendId || null};
    });
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
import express from 'express';
import createError from 'http-errors';
import mongoose from 'mongoose';
import UserModel from '../models/user.model';

// Digest: md5('mypwd') := 318bcb4be908d0da6448a0db76908d78
const FriendsRouter = express.Router();

function createObjectIds({ userId, friendId }: { userId: string | undefined; friendId: string | undefined; }): any {
    if (!userId || !friendId) return {uid: userId || null, fid: friendId || null};
    let userObjectId: mongoose.Types.ObjectId | null = null;
    let friendObjectId: mongoose.Types.ObjectId | null = null;
    try {
        userObjectId = new mongoose.Types.ObjectId(userId);
        friendObjectId = new mongoose.Types.ObjectId(friendId);
    } catch (error) {
        return {uid: userObjectId, fid: friendObjectId};
    }
    return {uid: userObjectId, fid: friendObjectId};
}

function createAggregateStages({ uid, fid, deleteFriendFlag }:
    { uid: mongoose.Types.ObjectId; fid: mongoose.Types.ObjectId; deleteFriendFlag: string | undefined; }): any {
    const match = {_id: {$in: [uid, fid]}};
    const projectTemp = {
        "friends": 1, addedFriends: {$cond: [{$eq: ["$_id", uid]}, fid, uid]}
    };
    const projectFin = {
        friends: !deleteFriendFlag ?
            {$concatArrays: ["$friends", {"$setDifference": [["$addedFriends"], "$friends"]}]}:
            {$filter: {input: "$friends", as: "friend", cond: {$ne: ["$$friend", "$addedFriends"]}}}
    };
    // console.log(projectFin)
    return {match, projectTemp, projectFin};
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
    const userId = req.body.id;
    const friendId = req.body.friend;
    const {uid, fid} = createObjectIds({userId, friendId});
    if (!uid || !fid) return next(createError(400, `Bad information provided: user #${userId}, friend #${friendId}`));
    const {match, projectTemp, projectFin} = createAggregateStages({uid, fid, deleteFriendFlag: ''});
    try {
        const newFriends = await UserModel.aggregate([
            {$match: match}, {$project: projectTemp}, {$project: projectFin}
        ]);
        Promise.all([
            UserModel.findByIdAndUpdate(newFriends[0]._id, {friends: newFriends[0].friends}),
            UserModel.findByIdAndUpdate(newFriends[1]._id, {friends: newFriends[1].friends})
        ]);
        res.json({Success: `User #${newFriends[0]._id} friended #${newFriends[1]._id}`});
    } catch (error) {
        next(createError(400, `Error writing data to DB: user #${userId}, friend #${friendId}`));
    }
})

FriendsRouter.post('/users/remfriend', async (req, res, next) => {
    const userId = req.body.id;
    const friendId = req.body.friend;
    const {uid, fid} = createObjectIds({userId, friendId});
    if (!uid || !fid) return next(createError(400, `Bad information provided: user #${userId}, friend #${friendId}`));
    const {match, projectTemp, projectFin} = createAggregateStages({uid, fid, deleteFriendFlag: 'true'});
    try {
        const newFriends = await UserModel.aggregate([
            {$match: match}, {$project: projectTemp}, {$project: projectFin}
        ]);
        // console.log(newFriends[0]);
        // console.log(newFriends[1]);
        Promise.all([
            UserModel.findByIdAndUpdate(newFriends[0]._id, {friends: newFriends[0].friends}),
            UserModel.findByIdAndUpdate(newFriends[1]._id, {friends: newFriends[1].friends})
        ]);
        res.json({Success: `User #${newFriends[0]._id} unfriended #${newFriends[1]._id}`});
    } catch (error) {
        next(createError(400, `Error writing data to DB: user #${userId}, friend #${friendId}`));
    }
})

export default FriendsRouter;
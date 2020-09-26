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

async function updateFriends({ uid, fid, deleteFriendFlag, res, next}:
    { uid: mongoose.Types.ObjectId; fid: mongoose.Types.ObjectId; deleteFriendFlag: string | undefined; res: express.Response, next: express.NextFunction}) {
    const matchIdPair = {_id: {$in: [uid, fid]}};
    const matchForAdd = {friends: {$not: {$in: [uid, fid]}}};
    const matchForDelete = {friends: {$in: [uid, fid]}};
    const projectUtil = {"friends": 1, addedFriends: {$cond: [{$eq: ["$_id", uid]}, fid, uid]}};
    const projectUpdate = {
        friends: !deleteFriendFlag ?
            {$concatArrays: ["$friends", {"$setDifference": [["$addedFriends"], "$friends"]}]}:
            {$filter: {input: "$friends", as: "friend", cond: {$ne: ["$$friend", "$addedFriends"]}}}
    };
    try {
        const newFriends = await UserModel.aggregate([
            {$match: matchIdPair}, {$project: projectUtil}, {$match: (!deleteFriendFlag ? matchForAdd : matchForDelete)}, {$project: projectUpdate}
        ]);
        Promise.all([
            UserModel.findByIdAndUpdate(newFriends[0]._id, {friends: newFriends[0].friends}),
            UserModel.findByIdAndUpdate(newFriends[1]._id, {friends: newFriends[1].friends})
        ]);
        res.json({Success: `User #${uid} ` + (!deleteFriendFlag ? `` : `un`) + `friended #${fid}`});
    } catch (error) {
        // console.error({error});
        next(createError(400, `Error writing data to DB: user #${uid}, friend #${fid}`));
    }
}

FriendsRouter.get('/users/:id/friends', (req, res, next) => {
    const userId = req.params.id;
    if (!userId) return next(createError(400, `Insufficient information provided: user #${userId}`));
    const lookup = {from: "people", localField: "friends", foreignField: "_id", as: "friends"};
    const match = {_id: mongoose.Types.ObjectId(userId)};
    UserModel.aggregate([{$lookup: lookup}, {$match: match}], (err: any, docs: any) => {
        if (err) return next(createError(400, `Error reading data from DB: user #${userId}`));
        res.json({friends: docs[0].friends});
    });
})

FriendsRouter.post('/users/addfriend', (req, res, next) => {
    const userId = req.body.id;
    const friendId = req.body.friend;
    const {uid, fid} = createObjectIds({userId, friendId});
    if (!uid || !fid) return next(createError(400, `Bad information provided: user #${userId}, friend #${friendId}`));
    updateFriends({uid, fid, deleteFriendFlag: '', res, next});
})

FriendsRouter.post('/users/remfriend', (req, res, next) => {
    const userId = req.body.id;
    const friendId = req.body.friend;
    const {uid, fid} = createObjectIds({userId, friendId});
    if (!uid || !fid) return next(createError(400, `Bad information provided: user #${userId}, friend #${friendId}`));
    updateFriends({uid, fid, deleteFriendFlag: 'true', res, next});
})

export default FriendsRouter;
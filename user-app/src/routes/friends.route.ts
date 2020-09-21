import express from 'express';
import createError from 'http-errors';
import mongoose, { Document, model, Schema } from 'mongoose';
import IPerson from '../models/user.interface';
import PersonSchema from '../models/user.schema';

// Digest: md5('mypwd') := 318bcb4be908d0da6448a0db76908d78
const UserModel = model<IPerson>('Person', PersonSchema);
const FriendsRouter = express.Router();

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

FriendsRouter.post('/users/addfriend', (req, res, next) => {
    const userId = req.body.id;
    const friendId = req.body.friend;
    if (!userId || !friendId) return next(createError(400, 'Insufficient information provided'));
    const userIdObjectId = mongoose.Types.ObjectId(userId);
    const friendIdObjectId = mongoose.Types.ObjectId(friendId);
    const match = {_id: {$in: [userIdObjectId, friendIdObjectId]}};
    UserModel.aggregate([{$match: match}], (err: any, docs: any) => {
        if (docs.length !== 2 || err) return next(createError(404, 'No such pair of users found in DB'));
    });
    const duplicates = {$in: [friendIdObjectId]};
    UserModel.findOne({_id: userIdObjectId, friends: duplicates}, (err: any, result: IPerson | null) => {
        if (result || err) return next(createError(400, 'Already friends'));
        UserModel.findById(userId, (err2: any, result2: IPerson | null) => {
            if (result2 && result2.friends) {
                result2.friends.push(friendIdObjectId);
                result2.save((err3: any, raw: any) => {
                    err3 ? next(createError(400, 'Error while saving data to DB')) : res.json(raw);
                });
            }
        });
    })
})

FriendsRouter.post('/users/remfriend', (req, res, next) => {
    const userId = req.body.id;
    const friendId = req.body.friend;
    if (!userId || !friendId) return next(createError(400, 'Insufficient information provided'));
    const userIdObjectId = mongoose.Types.ObjectId(userId);
    const friendIdObjectId = mongoose.Types.ObjectId(friendId);
    const match = {_id: {$in: [userIdObjectId, friendIdObjectId]}};
    UserModel.aggregate([{$match: match}], (err: any, docs: any) => {
        if (docs.length !== 2 || err) return next(createError(401, 'No such pair of users found in DB'));
    });
    const duplicates = {$in: [friendIdObjectId]};
    UserModel.findOne({_id: userIdObjectId, friends: duplicates}, (err: any, result: IPerson | null) => {
        if (!result || err) return next(createError(400, 'Not friends'))
        UserModel.findById(userId, (err2: any, result2: IPerson | null) => {
            if (result2 && result2.friends) {
                const index = result2.friends.indexOf(friendIdObjectId);
                result2.friends.splice(index, 1);
                result2.save((err3: any, raw: any) => {
                    err3 ? next(createError(400, 'Error while saving data to DB')) : res.json(raw);
                });
            }
        });
    })
})

export default FriendsRouter;
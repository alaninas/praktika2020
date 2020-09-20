import express from 'express';
import mongoose, { Document, model, Schema } from 'mongoose';
import IPerson from '../models/user.interface';
import PersonSchema from '../models/user.schema';

// Digest: md5('mypwd') := 318bcb4be908d0da6448a0db76908d78
const UserModel = model<IPerson>('Person', PersonSchema);
const FriendsRouter = express.Router();

FriendsRouter.get('/users/:id/friends', (req, res) => {
    const userId = req.params.id;
    if (!userId) return res.status(400).send('Insufficient information provided');
    const lookup = {from: "people", localField: "friends", foreignField: "_id", as: "friends"};
    const match = {_id: mongoose.Types.ObjectId(userId)};
    UserModel.aggregate([
        {$lookup: lookup}, {$match: match}
    ], (err: any, docs: any) => {
        if (err) return res.status(400).json({err});
        res.json({friends: docs[0].friends});
    });
})

FriendsRouter.post('/users/addfriend', (req, res) => {
    const userId = req.body.id;
    const friendId = req.body.friend;
    if (!userId || !friendId) return res.status(400).send('Insufficient information provided');
    const match = {_id: {$in: [mongoose.Types.ObjectId(userId), mongoose.Types.ObjectId(friendId)]}};
    UserModel.aggregate([
        {$match: match}
    ], (err: any, docs: any) => {
        if (err) return res.status(400).json({err});
        // res.send(userId);
        console.log(docs[0]._id);
        console.log(typeof docs[0]._id.toString());
        console.log(docs[1]._id);
        console.log(typeof docs[1]._id);

        res.send(typeof docs);
        // res.json({friends: docs[0].friends});
    });
    // res.send(userId);
    // UserModel.findById(userId, (err: any, result: IPerson | null) => {
        // if (!result) return res.status(404).json({err});
        // UserModel.findById(friendId, (err2: any, fr: IPerson | null) => {
            // if (!fr) return res.status(400).json({error: err2.message});
            // result.friends?.push(fr._id);
            // const d = new mongoose.Types.ObjectId(fr._id);
            // if (result.friends && result.friends.length > 0) {
                // result.friends.push(d);
                // result.save((err3: any, raw: any) => {err3 ? res.status(400).send(err2) : res.json(raw);});
            // }
        // });
    // });
})

FriendsRouter.post('/users/remfriend', (req, res) => {
    const userId = req.body.id;
    const friendId = req.body.friend;
    if (!userId || !friendId) return res.status(400).send('Insufficient information provided');
    UserModel.findById(userId, (err: any, result: IPerson | null) => {
        if (!result) return res.status(404).json({err});
        UserModel.findById(friendId, (err2: any, fr: IPerson | null) => {
            if (!fr) return res.status(400).json({error: err2.message});
            const d = new mongoose.Types.ObjectId(fr._id);
            if (result.friends && result.friends.length > 0) {
                if (result.friends.indexOf(d) > -1) {
                    // In the array
                    const index = result.friends.indexOf(d);
                    result.friends.splice(index, 1);
                    result.save((err3: any, raw: any) => {err3 ? res.status(400).send(err2) : res.json(raw);});
                    // if (friend.friends.indexOf(this.name) > -1) {
                        // friend.removeFriend(this);
                    // }
                }
            }
        });
    });
})

export default FriendsRouter;
import express from 'express';
import mongoose, { Document, model, Schema } from 'mongoose';
import md5 from 'md5';
import IPerson from '../models/user.interface';
import PersonSchema from '../models/user.schema';
import UserVUtility from '../utilities/userv.utility';

// Digest: md5('mypwd') := 318bcb4be908d0da6448a0db76908d78
const UserModel = model<IPerson>('Person', PersonSchema);
const FriendsRouter = express.Router();

// See
// https://mongoosejs.com/docs/populate.html
// https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/
// https://masteringjs.io/tutorials/mongoose/aggregate
FriendsRouter.get('/users/:userid/friends', (req, res) => {
    const userId = req.params.userid;
    if (!userId) return res.status(400).send('Insufficient information provided');

    UserModel.aggregate([
        {
          $lookup: {
            from: "people",
            localField: "friends",
            foreignField: "_id",
            as: "friends"
          }
        },
        {
          $match: {
            _id: mongoose.Types.ObjectId(userId)
          }
        },
        {
          "$project": {
            "password": 0,
            "email": 0,
            "__v": 0,
            "name": 0,
            "_id": 0
          }
        },
        // {$unwind: "$friends"}
      // tslint:disable-next-line: no-string-literal
      ], (err: any, docs: any) => {res.json(docs[0]["friends"])});

    // UserModel
        // .findById(userId)
        // .populate("friends")
        // .then((results: IPerson | null) => {
            // res.json({friends: results?.friends})
        // }, (err: any) => res.status(404).send('knlknlknlnl'));

    // const ss = UserModel.aggregate([
        // {
            // $match: {
            //   _id: mongoose.Types.ObjectId(userId)
            // }
        // },
        // {
            // $project: {"friends": 1, _id: 0}
        // }
    // ], (err: any, docs: object) => {res.json(docs)});

    // res.send(ss.project());
    // res.send(ss);
    // aggregate
    // const ans = UserModel.findById(userId, (err: any, result: IPerson | null) => {
        // if (!result) return res.status(404).send('No such user');
        // if (result.friends) {
            // if (result.friends.length < 1) return res.status(200).send('No friends yet');
            // (result.friends).forEach(element => {
                //
            // });
        // }
    // });
})

FriendsRouter.put('/users/addfriend', (req, res) => {
    const userId = req.body.id;
    const friendId = req.body.friend;
    if (!userId || !friendId) return res.status(400).send('Insufficient information provided');
    UserModel.findById(userId, (err: any, result: IPerson | null) => {
        if (!result) return res.status(404).json({err});
        UserModel.findById(friendId, (err2: any, fr: IPerson | null) => {
            if (!fr) return res.status(400).json({error: err2.message});
            // result.friends?.push(fr._id);
            const d = new mongoose.Types.ObjectId(fr._id);
            // res.send(d);
            // user.reviews.push(review);
            // user.save();
            if (result.friends && result.friends.length > 0) {
                result.friends.push(d);
                result.save((err3: any, raw: any) => {err3 ? res.status(400).send(err2) : res.json(raw);});
            }
            // result.friends = fr._id;
            // res.json(result);
            // res.json(fr);
        });
    });
})

FriendsRouter.put('/users/remfriend', (req, res) => {
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
import express from 'express';
import createError from 'http-errors';
import { model } from 'mongoose';
import md5 from 'md5';
import UserModel, { IPerson } from '../models/user.model';
import UserVUtility from '../utilities/userv.utility';

// Digest: md5('mypwd') := 318bcb4be908d0da6448a0db76908d78
// const UserModel = model<IPerson>('Person', PersonSchema);
const UsersRouter = express.Router();

UsersRouter.get('/users', (req, res, next) => {
    UserModel.find({}, (err: any, result: IPerson[]) => {
        // if return value := [], empty array === TRUE; have to compare to an array length instead
        result.length > 0 ? res.json(result) : next(createError(404, 'No users in DB'));
    })
})

UsersRouter.get('/users/:id/', (req, res, next) => {
    UserModel.findById(req.params.id, (err: any, result: IPerson | null) => {
        result ? res.json(result) : next(createError(404, 'No such user found in DB'));
    })
})

UsersRouter.post('/users/', (req, res, next) => {
    const uname = req.body.name;
    const upwd = md5(req.body.password);
    if (!uname || !upwd) return next(createError(400, 'Insufficient information provided'));
    const newUser = new UserModel({ name: uname, password: upwd, friends: [] });
    newUser.save((err: any, result: IPerson) => {
        err ? res.json(result) : next(createError(400, 'Error while saving data to DB'));
    });
})

UsersRouter.put('/users/', (req, res, next) => {
    const data = req.body;
    const uid = data.id;
    const upwd = md5(data.password);
    if (!uid || !upwd) return next(createError(400, 'Insufficient information provided'));
    UserModel.findById(uid, (err: any, result: IPerson | null) => {
        if (!result) return next(createError(404, 'No such user found in DB'));
        try {
            const util = new UserVUtility(result);
            const fields = {password: util.password(upwd), email: util.email(data.email), address: util.address(data.address), age: util.age(data.age), height: util.height(data.height)};
            result.updateOne(fields, (err2: any, raw: any) => {err2 ? res.status(400).send(err2) : res.json(raw);});
        } catch (error) {
            next(createError(400, 'Error while saving data to DB'));
        }
    });
})

// after introducing referenced relationship between users(as addFriend/removeFriend)
// need to accomodate user deletion to represent the updated data accordingly
// (possible implementaion : in UserVUtlit module)
UsersRouter.delete('/users/', (req, res, next) => {
    const uid = req.body.id;
    if (!uid) return next(createError(400, 'Insufficient information provided'));
    UserModel.findOneAndDelete({_id: uid}, (err: any, result: IPerson | null) => {
        result ? res.json(result) : next(createError(404, 'No such user found in DB'));
    });
})

UsersRouter.post('/users/login', (req, res, next) => {
    const uid = req.body.id;
    const upwd = md5(req.body.password);
    if (!uid) return next(createError(400, 'Insufficient information provided'));
    UserModel.findById(uid, (err: any, result: IPerson | null) => {
        if (!result) return next(createError(404, 'No such user found in DB'));
        result.password === upwd ? res.send('Successful login') : next(createError(401, 'Wrong password provided'));
    })
})

export default UsersRouter;
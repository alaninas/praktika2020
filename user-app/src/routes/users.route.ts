import express from 'express';
import createError from 'http-errors';
import md5 from 'md5';
import UserModel, { IPerson } from '../models/user.model';
import UserVUtility from '../utilities/userv.utility';

// Digest: md5('mypwd') := 318bcb4be908d0da6448a0db76908d78
const UsersRouter = express.Router();

UsersRouter.get('/users', (req, res, next) => {
    UserModel.find({}, (err: any, result: IPerson[]) => {
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
        result ? res.json(result) : next(createError(400, 'Error while saving data to DB'));
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

UsersRouter.delete('/users/', (req, res, next) => {
    const uid = req.body.id;
    if (!uid) return next(createError(400, 'Insufficient information provided'));
    UserModel.findById(uid, async (err: any, userToDelete: IPerson | null) => {
        if (!userToDelete || err) return next(createError(404, 'No such user found in DB'));
        try {
            const allUsers = await UserModel.find();
            const util = new UserVUtility(userToDelete);
            const allUsersUpdated = util.clearFriends(allUsers);
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < allUsersUpdated.length; i++) {
                await allUsersUpdated[i].save();
            }
            const u = await UserModel.findOneAndDelete({_id: uid});
            if (u) res.json(u);
        } catch (error) {
            return next(createError(400, 'Error while updating DB'));
        }
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
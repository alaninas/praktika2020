import express from 'express';
import { model } from 'mongoose';
import md5 from 'md5';
import IPerson from '../models/user.interface';
import PersonSchema, {UserModel} from '../models/user.schema';
import UserVUtility from '../utilities/userv.utility';

// Digest: md5('mypwd') := 318bcb4be908d0da6448a0db76908d78
// const UserModel = model<IPerson>('Person', PersonSchema);
const UsersRouter = express.Router();

UsersRouter.get('/users', (req, res) => {
    UserModel.find({}, (err: any, result: IPerson[]) => {
        // if return value := [], empty array === TRUE; have to compare to an array length instead
        result.length > 0 ? res.json(result) : res.status(404).json({Error: 'DB is empty'});
    })
})

UsersRouter.get('/users/:id/', (req, res) => {
    UserModel.findById(req.params.id, (err: any, result: IPerson | null) => {
        result ? res.json(result) : res.status(404).json({Error: 'No user found'});
    })
})

UsersRouter.post('/users/', (req, res) => {
    const uname = req.body.name;
    const upwd = md5(req.body.password);
    if (!uname || !upwd) return res.status(400).json({Error: 'Insufficient information provided'});
    const newUser = new UserModel({ name: uname, password: upwd });
    newUser.save((err: any, result: IPerson) => {
        err ? res.json(result) : res.status(400).json({Error: 'Error while saving the document'});
    });
})

UsersRouter.put('/users/', (req, res) => {
    const data = req.body;
    const uid = data.id;
    const upwd = md5(data.password);
    if (!uid || !upwd) return res.status(400).json({Error: 'Insufficient information provided'});
    UserModel.findById(uid, (err: any, result: IPerson | null) => {
        if (!result) return res.status(404).json({Error: 'No such user in DB'});
        try {
            const util = new UserVUtility(result);
            const fields = {password: util.password(upwd), email: util.email(data.email), address: util.address(data.address), age: util.age(data.age), height: util.height(data.height)};
            result.updateOne(fields, (err2: any, raw: any) => {err2 ? res.status(400).send(err2) : res.json(raw);});
        } catch (error) {
            res.status(400).json({Error: error.message});
        }
    });
})

// after introducing referenced relationship between users(as addFriend/removeFriend)
// need to accomodate user deletion to represent the updated data accordingly
// (possible implementaion : in UserVUtlit module)
UsersRouter.delete('/users/', (req, res) => {
    const uid = req.body.id;
    if (!uid) return res.status(400).json({Error: 'Insufficient information provided'});
    UserModel.findOneAndDelete({_id: uid}, (err: any, result: IPerson | null) => {
        result ? res.json(result) : res.status(404).json({err});
    });
})

UsersRouter.post('/users/login', (req, res) => {
    const uid = req.body.id;
    const upwd = md5(req.body.password);
    if (!uid) return res.status(400).json({Error: 'Insufficient information provided'});
    UserModel.findById(uid, (err: any, result: IPerson | null) => {
        if (!result) return res.status(404).json({Error: 'No such user in DB'});
        result.password === upwd ? res.send('Successful login') : res.status(400).send('Wrong password provided: ' + upwd + ', from DB: ' + result.password);
    })
})

export default UsersRouter;
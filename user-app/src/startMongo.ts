import express from 'express';
import bodyParser from 'body-parser';
// import { User } from './user/user';
import mongoose, { Document, model, Schema } from 'mongoose';
import IPerson from './models/user.interface'
import PersonSchema from './models/user.schema';
import md5 from 'md5';

// md5('mypwd') := 318bcb4be908d0da6448a0db76908d78
// tslint:disable-next-line: no-console
console.log('---> md5: ' + md5('mypwd'));

mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    // tslint:disable-next-line: no-console
    return console.log('Success');
// tslint:disable-next-line: no-console
}, error => console.log(error));

const UserModel = model<IPerson>('Person', PersonSchema);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/users', (req, res) => {
    UserModel.find({}, (err: any, result: IPerson[]) => {
        // if return value := [], empty array === TRUE; have to compare to an array length instead
        result.length > 0 ? res.json(result) : res.status(404).json({err});
    })
})

app.get('/users/:id/', (req, res) => {
    UserModel.findById(req.params.id, (err: any, result: IPerson | null) => {
        result ? res.json(result) : res.status(404).json({err});
    })
})

app.post('/users/login', (req, res) => {
    const uid = req.body.id;
    const upwd = md5(req.body.password);
    if (uid) {
        UserModel.findById(uid, (err: any, result: IPerson | null) => {
            if (result) {
                result.password === upwd ?
                res.send('Successful login') :
                res.status(400).send('Wrong password provided: ' + upwd + ', from DB: ' + result.password);
            } else {
                res.status(404).json({err});
            }
        })
    } else {
        res.status(400).send('No user ID provided');
    }
})

app.post('/users/', (req, res) => {
    const uname = req.body.name;
    const upwd = md5(req.body.password);
    if (uname) {
        const newUser = new UserModel({ name: uname, password: upwd });
        newUser.save((err: any, result: IPerson | null) => {
            err ? res.status(400).json({err}) : res.json(result);
        });
    } else {
        res.status(400).send('No user name provided');
    }
})

app.put('/users/', (req, res) => {
    const uid = req.body.id;
    const upwd = md5(req.body.password);
    // change all the user info here: changeInfo()....
    if (uid && upwd) {
        UserModel.findByIdAndUpdate(uid, { password: upwd }, (err: any, result: IPerson | null) => {
            result ? res.json(result) : res.status(404).json({err});
        });
    } else {
        res.status(400).send('No sufficient information provided');
    }
})

app.delete('/users/', (req, res) => {
    const uid = req.body.id;
    if (uid) {
        UserModel.findOneAndDelete({_id: uid}, (err: any, result: IPerson | null) => {
            err ? res.status(404).json({err}) : res.json(result);
        });
    } else {
        res.status(400).send('No user ID provided');
    }
})

app.listen(3030);
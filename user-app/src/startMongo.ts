import express from 'express';
import bodyParser from 'body-parser';
// import { User } from './user/user';
import mongoose, { Document, model, Schema } from 'mongoose';
import IPerson from './models/user.interface'
import PersonSchema from './models/user.schema';


mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    // tslint:disable-next-line: no-console
    return console.log('Success');
// tslint:disable-next-line: no-console
}, error => console.log(error));

const UserModel = model<IPerson>('Person', PersonSchema);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// get all users
app.get('/users', (req, res) => {
    UserModel.find({}, (err: any, result: IPerson[] | null) => {
        if (result) {
            res.json(result);
        } else {
            res.status(404).send('No users in DB');
        }
    })
})

// get single user
// ?
app.get('/users/:id/', (req, res) => {
    UserModel.findById(req.params.id, (err: any, result: IPerson | null) => {
        if (result) {
            res.json(result);
        } else {
            res.status(404).send('No such user in DB');
        }
    })
})

// create one or more users
app.post('/users/', (req, res) => {
    const uname = req.body.name;
    if (uname) {
        UserModel.create({ name: uname }, (err: any, result: IPerson | null) => {
            if (err) {
                res.status(400).send('Error in inserting user');
            } else {
                res.json(result);
            }
        });
    } else {
        res.status(400).send('No user name provided');
    }
})

// update one or more users
// here change only pswd?
app.put('/users/', (req, res) => {
    const uid = req.body.id;
    const upwd = req.body.password;
    if (uid && upwd) {
        UserModel.findByIdAndUpdate(uid, { password: upwd }, (err: any, result: IPerson | null) => {
            if (result) {
                res.json(result);
            } else {
                res.status(404).send('Error while updating');
            }
        });
    } else {
        res.status(400).send('Not sufficient information provided');
    }
})

// delete one or more users
app.delete('/users/', (req, res) => {
    const uid = req.body.id;
    if (uid) {
        UserModel.findByIdAndDelete(uid, (err: any, result: IPerson | null) => {
            if (err) {
                res.status(404).send('No such user found');
            } else {
                res.json(result);
            }
        });
    } else {
        res.status(400).send('No user ID provided');
    }
})

app.listen(3030);
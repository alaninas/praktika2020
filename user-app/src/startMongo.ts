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
const testPerson = UserModel.create({ name: 'petras', age: 22 }).then(() => {
    // tslint:disable-next-line: no-console
    return console.log('Successful creation!');
// tslint:disable-next-line: no-console
}, error => console.log(error))

UserModel.findById('5f60b756e683317d7f192516', (err: any, response: IPerson) => {
    if (response) {
        // tslint:disable-next-line: no-console
        console.log('---> GOT:' + response);
    } else {
        // tslint:disable-next-line: no-console
        console.log(err)
    }
});
// UserModel.remove({ _id: this.toObjectId('5f60b756e683317d7f192516') }, (err) => callback(err, null));


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// get all users
app.get('/users', (req, res) => {
    UserModel.find({}, (err: any, result: IPerson[]) => {
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
    UserModel.findById(req.params.id, (err: any, result: IPerson) => {
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
        UserModel.create({ name: uname }, (err: any, result: IPerson) => {
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

app.put('/users/', (req, res) => {
    res.send('update one or more users');
})

app.delete('/users/', (req, res) => {
    res.send('delete one or more users');
})

app.listen(3030);
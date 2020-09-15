import express from 'express';
import bodyParser from 'body-parser';
import { User } from './user/user';
import mongoose from 'mongoose';
import UserModel from './models/user.model';

mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    // tslint:disable-next-line: no-console
    return console.log('Success');
// tslint:disable-next-line: no-console
}, error => console.log(error));

const testPerson = UserModel.create({ name: 'petras', age: 22 }).then(() => {
    // tslint:disable-next-line: no-console
    return console.log('Successful creation!');
// tslint:disable-next-line: no-console
}, error => console.log(error))

// tslint:disable-next-line: no-console
UserModel.findById('5f60b756e683317d7f192516', (err, response) => {
    // tslint:disable-next-line: no-console
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

// get all users'
app.get('/users', (req, res) => {
    UserModel.find({}, (err, result) => {
        if (result) {
            res.json(result);
        } else {
            res.status(404).send('No users in DB');
        }
    })
})

app.get('/users/:id/', (req, res) => {
    res.send('get single user');
})

app.post('/users/', (req, res) => {
    res.send('create one or more users');
})

app.put('/users/', (req, res) => {
    res.send('update one or more users');
})

app.delete('/users/', (req, res) => {
    res.send('delete one or more users');
})

app.listen(3030);
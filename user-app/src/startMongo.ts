import express from 'express';
import bodyParser from 'body-parser';
import { User } from './user/user';
import mongoose from 'mongoose';
import UserModel from './models/user.model';

// const mongoDB = 'mongodb://localhost:27017/users';
// mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
// const db = mongoose.connection;
// db.on('success', () => console.log('sss'));
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    // tslint:disable-next-line: no-console
    return console.log('Success');
// tslint:disable-next-line: no-console
}, error => console.log(error));

const testPerson = UserModel.create({ name: 'petras' });

// UserModel.findOne({}).then(val => {
    // if (val) {
        // console.log(val.name);
    // } else {
        // console.log('Database is empty');
    // }
// });

// tslint:disable-next-line: no-console
UserModel.find({ name: "petras"}).then(val => console.log(val));




const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/users', (req, res) => {
    res.send('get all users');
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

app.listen(3000);
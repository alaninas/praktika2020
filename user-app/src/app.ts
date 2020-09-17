import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import UsersRouter from './routes/users.route';

// Digest: md5('mypwd') := 318bcb4be908d0da6448a0db76908d78
mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
    // tslint:disable-next-line: no-console
    return console.log('Success');
// tslint:disable-next-line: no-console
}, error => console.log(error));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/', UsersRouter);

app.listen(3030);
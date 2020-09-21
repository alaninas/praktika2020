import express from 'express';
import createError from 'http-errors';
import bodyParser from 'body-parser';
// tslint:disable-next-line: no-var-requires
import mongoose from 'mongoose';
import UsersRouter from './routes/users.route';
import FriendsRouter from './routes/friends.route';

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
app.use('/', FriendsRouter);

app.use((req, res, next) => {
    next(createError(404))
})

app.use((error: { status: any; message: any; stack: any; },
        req: any,
        res: { status: (arg0: any) => void; json: (arg0: { status: any; message: any; stack: any; }) => void; },
        next: any) => {
    res.status(error.status || 500)
    res.json({
      status: error.status,
      message: error.message,
      stack: error.stack
    })
})

app.listen(3030);
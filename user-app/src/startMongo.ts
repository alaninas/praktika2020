import express from 'express';
import bodyParser from 'body-parser';
// import { User } from './user/user';
import mongoose, { Document, model, Schema } from 'mongoose';
import IPerson from './models/user.interface'
import PersonSchema from './models/user.schema';
import md5 from 'md5';

// tslint:disable-next-line: no-console
console.log('---> ' + typeof md5('message2'));

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
    // const users = await UserModel.find({});
    UserModel.find({}, (err: any, result: IPerson[]) => {
        // if return value := [], empty array === TRUE
        // have to compare to an array length instead
        result.length > 0 ? res.json(result) : res.status(404).json({err});
    })
})

app.get('/users/:id/', (req, res) => {
    UserModel.findById(req.params.id, (err: any, result: IPerson | null) => {
        result ? res.json(result) : res.status(404).json({err});
    })
})

app.post('/users/', (req, res) => {
    const uname = req.body.name;
    if (uname) {
        // const c = new UserModel({name: "iouoiu"});
        // c.save( (err, result) => void);
        UserModel.create({ name: uname }, (err: any, result: IPerson | null) => {
            err ? res.status(400).json({err}) : res.json(result);
        });
    } else {
        res.status(400).send('No user name provided');
    }
})

app.put('/users/', (req, res) => {
    const uid = req.body.id;
    // use md5
    const upwd = req.body.password;
    // change all the user info here: changeInfo()....
    if (uid && upwd) {
        UserModel.findByIdAndUpdate(uid, { password: md5(upwd) }, (err: any, result: IPerson | null) => {
            result ? res.json(result) : res.status(404).json({err});
        });
    } else {
        res.status(400).send('No sufficient information provided');
    }
})

app.delete('/users/', (req, res) => {
    const uid = req.body.id;
    if (uid) {
        // UserModel.findOneAndDelete
        UserModel.findByIdAndDelete(uid, (err: any, result: IPerson | null) => {
            err ? res.status(404).json({err}) : res.json(result);
        });
    } else {
        res.status(400).send('No user ID provided');
    }
})

app.listen(3030);
import express from 'express';
import createError from 'http-errors';
import md5 from 'md5';
import UserModel, { IPerson } from '../models/user.model';
import UserVUtility from '../utilities/userv.utility';
import mongoose from 'mongoose';
import MovieModel, { IMovie } from '../models/movie.model';

// Digest: md5('mypwd') := 318bcb4be908d0da6448a0db76908d78
const UsersRouter = express.Router();

async function populateMovies({ userId, res, next }: { userId: string; res: express.Response; next: express.NextFunction; }) {
    try {
        const omid = new mongoose.Types.ObjectId(userId);
        const lookup = {from: "movies", localField: "movies", foreignField: "_id", as: "movies"};
        const match = {_id: omid};
        const docs = await UserModel.aggregate([{$lookup: lookup}, {$match: match}]);
        return res.json({movies: docs[0].movies});
    } catch (error) {
        return next(createError(400, `Error reading data from DB: user #${userId}`));
    }
}

async function purgeUsersRecords(userToDelete: IPerson) {
    const allUsers = await UserModel.find({});
    for (const user of allUsers) {
        const index = user.friends.indexOf(userToDelete._id);
        if (index > -1) {
            user.friends.splice(index, 1);
            await user.save();
        }
    }
    return allUsers;
}

async function purgeMoviesRecords(userToDelete: IPerson) {
    const allMovies = await MovieModel.find({});
    for (const movie of allMovies) {
        const index = movie.directors.indexOf(userToDelete._id);
        if (index > -1) {
            movie.directors.splice(index, 1);
            await movie.save();
        }
    }
    return allMovies;
}

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

UsersRouter.get('/users/:id/movies', (req, res, next) => {
    const userId = req.params.id;
    if (!userId) return next(createError(400, `Insufficient information provided: user #${userId}`));
    populateMovies({userId, res, next});
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

UsersRouter.post('/users/login', (req, res, next) => {
    const uid = req.body.id;
    const upwd = md5(req.body.password);
    if (!uid) return next(createError(400, 'Insufficient information provided'));
    UserModel.findById(uid, (err: any, result: IPerson | null) => {
        if (!result) return next(createError(404, 'No such user found in DB'));
        result.password === upwd ? res.send('Successful login') : next(createError(401, 'Wrong password provided'));
    })
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
            result.updateOne(fields, (err2: any, raw: any) => {err2 ? res.status(400).json({err2}) : res.json(raw);});
        } catch (error) {
            next(createError(400, error.message));
        }
    });
})

UsersRouter.delete('/users/', (req, res, next) => {
    const uid = req.body.id;
    if (!uid) return next(createError(400, 'Insufficient information provided'));
    UserModel.findById(uid, async (err: any, userToDelete: IPerson | null) => {
        if (!userToDelete || err) return next(createError(404, 'No such user found in DB'));
        try {
            const users = await purgeUsersRecords(userToDelete);
            const movies = await purgeMoviesRecords(userToDelete);
            const udel = await userToDelete.deleteOne();
            Promise.all([users, movies, udel]);
            res.json(udel);
        } catch (error) {
            next(createError(400, 'Error while updating DB'));
        }
    });
})

export default UsersRouter;
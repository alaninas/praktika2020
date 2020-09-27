import express from 'express';
import createError from 'http-errors';
import MovieModel, { IMovie } from '../models/movie.model';
import UserModel, { IPerson } from '../models/user.model';

// Digest: md5('mypwd') := 318bcb4be908d0da6448a0db76908d78
const MoviesRouter = express.Router();

async function purgeUsersRecords(movieToDelete: IMovie) {
    const allUsers = await UserModel.find({});
    for (const user of allUsers) {
        const index = user.movies?.indexOf(movieToDelete._id);
        if (index !== undefined && index > -1) {
            user.movies?.splice(index, 1);
            await user.save();
        }
    }
    return allUsers;
}

MoviesRouter.get('/movies', (req, res, next) => {
    MovieModel.find({}, (err: any, result: IMovie[]) => {
        // if return value := [], empty array === TRUE; have to compare to an array length instead
        result.length > 0 ? res.json(result) : next(createError(404, 'No movies in DB'));
    })
})

MoviesRouter.get('/movies/:id/', (req, res, next) => {
    MovieModel.findById(req.params.id, (err: any, result: IMovie | null) => {
        result ? res.json(result) : next(createError(404, 'No such movie found in DB'));
    })
})

MoviesRouter.post('/movies/', (req, res, next) => {
    const mtitle = req.body.title;
    if (!mtitle) return next(createError(400, 'Insufficient information provided'));
    const newMovie = new MovieModel({ title: mtitle, directors: [] });
    newMovie.save((err: any, result: IMovie) => {
        result ? res.json(result) : next(createError(400, 'Error while saving data to DB'));
    });
})

MoviesRouter.put('/movies/', (req, res, next) => {
    const data = req.body;
    const mid = data.id;
    if (!mid) return next(createError(400, `Insufficient information provided: movie #${mid}`));
    MovieModel.findById(mid, (err: any, result: IMovie | null) => {
        if (!result) return next(createError(404, `No such movie found in DB: movie #${mid}`));
        const fields = {year: data.year, poster: data.poster};
        result.updateOne(fields, (err2: any, raw: any) => {err2 ? next(createError(400, 'Error while saving data to DB')) : res.json(raw);});
    });
})

MoviesRouter.delete('/movies/', (req, res, next) => {
    const mid = req.body.id;
    if (!mid) return next(createError(400, 'Insufficient information provided'));
    MovieModel.findById(mid, async (err: any, movieToDelete: IMovie | null) => {
        if (!movieToDelete || err) return next(createError(404, 'No such movie found in DB'));
        try {
            const users = await purgeUsersRecords(movieToDelete);
            const mdel = await movieToDelete.deleteOne();
            Promise.all([users, mdel]);
            res.json(mdel);
        } catch (error) {
            next(createError(400, 'Error while updating DB'));
        }
    });
})

export default MoviesRouter;
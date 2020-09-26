import express from 'express';
import createError from 'http-errors';
import md5 from 'md5';
import MovieModel, { IMovie } from '../models/movie.model';
import UserModel, { IPerson } from '../models/user.model';
import UserVUtility from '../utilities/userv.utility';

// Digest: md5('mypwd') := 318bcb4be908d0da6448a0db76908d78
const MoviesRouter = express.Router();

function clearFriends(allUsers: IPerson[], movie: IMovie) {
    // const [i, v] of ['a', 'b', 'c'].entries()
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < allUsers.length; i++) {
        const index = allUsers[i].movies?.indexOf(movie._id);
        if (index !== undefined && index > -1) {
            allUsers[i].movies?.splice(index, 1);
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
        try {
            const fields = {year: data.year, poster: data.poster};
            result.updateOne(fields, (err2: any, raw: any) => {err2 ? res.status(400).send(err2) : res.json(raw);});
        } catch (error) {
            next(createError(400, 'Error while saving data to DB'));
        }
    });
})

MoviesRouter.delete('/movies/', (req, res, next) => {
    const mid = req.body.id;
    if (!mid) return next(createError(400, 'Insufficient information provided'));
    MovieModel.findById(mid, async (err: any, movieToDelete: IMovie | null) => {
        if (!movieToDelete || err) return next(createError(404, 'No such movie found in DB'));
        try {
            const allUsers = await UserModel.find({});
            console.log('INIT USERS');
            console.log(allUsers);
            const allUsersUpdated = clearFriends(allUsers, movieToDelete);
            console.log('UPDATED USERS');
            console.log(allUsersUpdated);
            // tslint:disable-next-line: prefer-for-of
            // for (let i = 0; i < allUsersUpdated.length; i++) {
                // await allUsersUpdated[i].save();
            // }
            // const mdel = await MovieModel.findOneAndDelete({_id: mid});
            // if (mdel) res.json(mdel);
            res.json({Success: 'movie deleted'});
        } catch (error) {
            return next(createError(400, 'Error while updating DB'));
        }
    });
})

export default MoviesRouter;
import express from 'express';
import createError from 'http-errors';
import mongoose from 'mongoose';
import UserModel from '../models/user.model';
import MovieModel, { IMovie } from '../models/movie.model';

// Digest: md5('mypwd') := 318bcb4be908d0da6448a0db76908d78
const DirectorsRouter = express.Router();

function createObjectIds({ movieId, directorId }: { movieId: string | undefined; directorId: string | undefined; }): any {
    if (!movieId || !directorId) return {mid: movieId || null, did: directorId || null};
    let movieObjectId: mongoose.Types.ObjectId | null = null;
    let directorObjectId: mongoose.Types.ObjectId | null = null;
    try {
        movieObjectId = new mongoose.Types.ObjectId(movieId);
        directorObjectId = new mongoose.Types.ObjectId(directorId);
    } catch (error) {
        return {mid: movieObjectId, did: directorObjectId};
    }
    return {mid: movieObjectId, did: directorObjectId};
}

function createMoviePipeStages({ mid, did, deleteItemFlag}:
    { mid: mongoose.Types.ObjectId; did: mongoose.Types.ObjectId; deleteItemFlag: string | undefined; }) {
    const mMatchDuplicate = !deleteItemFlag ? {directors: {$not: {$in: [did]}}} : {directors: {$in: [did]}};
    const mProjectNew = {
        directors: !deleteItemFlag ? {$concatArrays: ["$directors", ["$addedDirs"]]}:
        {$filter: {input: "$directors", as: "director", cond: {$ne: ["$$director", "$addedDirs"]}}}
    };
    return {mMatchId: {_id: mid}, mMatchDuplicate, mProjectUtil: {"directors": 1, addedDirs: did}, mProjectNew};
}

function createUserPipeStages({ did, mid, deleteItemFlag}:
    { mid: mongoose.Types.ObjectId; did: mongoose.Types.ObjectId; deleteItemFlag: string | undefined; }) {
    const uMatchDuplicate = !deleteItemFlag ? {movies: {$not: {$in: [mid]}}} : {movies: {$in: [mid]}};
    const uProjectNew = {
        movies: !deleteItemFlag ? {$concatArrays: ["$movies", ["$addedMovies"]]}:
        {$filter: {input: "$movies", as: "movie", cond: {$ne: ["$$movie", "$addedMovies"]}}}
    };
    return {uMatchId: {_id: did}, uMatchDuplicate, uProjectUtil: {"movies": 1, addedMovies: mid}, uProjectNew};
}

// IMPORTANT:
// In order not to have duplicate logic
// dont' let users to add/remove films on their router.
// Users only have the right to see users/:id/movies list.

// Give the right to add/remove directors for movies only for the 'producer' personality
// that is currently logged in VIA movies endpoint.

// Directors update logic:
// find user and movie (probably use Promise.all)
// - see if user's already having this movie or not (for addition) -- opposite for deletion
// - see if the movie already having him as director (for addition) -- opposite for deletion
// - update users.model movies list -- by adding new movie
// - update movies.model directors list -- by adding new user as director
async function updateDirectors({ mid, did, deleteItemFlag, res, next}:
    { mid: mongoose.Types.ObjectId; did: mongoose.Types.ObjectId; deleteItemFlag: string | undefined; res: express.Response, next: express.NextFunction}) {
    const {mMatchId, mMatchDuplicate, mProjectUtil, mProjectNew} = createMoviePipeStages({mid, did, deleteItemFlag});
    const {uMatchId, uMatchDuplicate, uProjectUtil, uProjectNew} = createUserPipeStages({did, mid, deleteItemFlag});
    try {
        const newUMovies = await UserModel.aggregate([{$match: uMatchId}, {$project: uProjectUtil}, {$match: uMatchDuplicate}, {$project: uProjectNew}]);
        const newMDirectors = await MovieModel.aggregate([{$match: mMatchId}, {$project: mProjectUtil}, {$match: mMatchDuplicate}, {$project: mProjectNew}]);
        Promise.all([
            UserModel.findByIdAndUpdate(newUMovies[0]._id, {movies: newUMovies[0].movies}),
            MovieModel.findByIdAndUpdate(newMDirectors[0]._id, {directors: newMDirectors[0].directors})
        ]);
        return res.json({Success: `Director #${did} ` + (!deleteItemFlag ? `added to` : `removed from`) + ` movie #${mid}`});
    } catch (error) {
        return next(createError(400, `Error writing data to DB: movie #${mid}, director #${did}`));
    }
}

async function populateDirectors({ movieId, res, next }: { movieId: string; res: express.Response; next: express.NextFunction; }) {
    try {
        const omid = new mongoose.Types.ObjectId(movieId);
        const lookup = {from: "people", localField: "directors", foreignField: "_id", as: "directors"};
        const match = {_id: omid};
        const docs = await MovieModel.aggregate([{$lookup: lookup}, {$match: match}]);
        return res.json({directors: docs[0].directors});
    } catch (error) {
        return next(createError(400, `Error reading data from DB: movie #${movieId}`));
    }
}

DirectorsRouter.get('/movies/:id/directors', (req, res, next) => {
    const movieId = req.params.id;
    if (!movieId) return next(createError(400, `Insufficient information provided: movie #${movieId}`));
    populateDirectors({movieId, res, next});
})

DirectorsRouter.post('/movies/adddirector', (req, res, next) => {
    const movieId = req.body.id;
    const directorId = req.body.director;
    const {mid, did} = createObjectIds({movieId, directorId});
    if (!mid || !did) return next(createError(400, `Bad information provided: movie #${movieId}, director #${directorId}`));
    updateDirectors({mid, did, deleteItemFlag: '', res, next});
})

DirectorsRouter.post('/movies/remdirector', (req, res, next) => {
    const movieId = req.body.id;
    const directorId = req.body.director;
    const {mid, did} = createObjectIds({movieId, directorId});
    if (!mid || !did) return next(createError(400, `Bad information provided: movie #${movieId}, director #${directorId}`));
    updateDirectors({mid, did, deleteItemFlag: 'true', res, next});
})

export default DirectorsRouter;
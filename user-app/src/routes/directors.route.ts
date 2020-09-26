import express from 'express';
import createError from 'http-errors';
import mongoose from 'mongoose';
import UserModel from '../models/user.model';
import MovieModel, { IMovie } from '../models/movie.model';

// Digest: md5('mypwd') := 318bcb4be908d0da6448a0db76908d78
const DirectorsRouter = express.Router();

function createObjectIds({ movieId, directorId }: { movieId: string | undefined; directorId: string | undefined; }): any {
    if (!movieId || !directorId) return {uid: movieId || null, fid: directorId || null};
    let movieObjectId: mongoose.Types.ObjectId | null = null;
    let directorObjectId: mongoose.Types.ObjectId | null = null;
    try {
        movieObjectId = new mongoose.Types.ObjectId(movieId);
        directorObjectId = new mongoose.Types.ObjectId(directorId);
    } catch (error) {
        return {uid: movieObjectId, fid: directorObjectId};
    }
    return {uid: movieObjectId, fid: directorObjectId};
}

// IMPORTANT:
// in order not to have duplicate logic
// dont' let users to add/remove films on their router
// users have the right to see users/:id/movies list

// give the right to add/remove directors for movies only for the 'producer' personality
// that is currently logged in VIA movies endpoint

// Directors update logic:
// find user (probably use Promise.all)
// see if he's already having this movie or not (for addition) -- opposite for deletion
// see if the movie already having him as director (for addition) -- opposite for deletion
// update users.model movies list -- by adding new movie
// update movies.model directors list -- by adding new user as director
async function updateDirectors({ uid, fid, deleteFriendFlag, res, next}:
    { uid: mongoose.Types.ObjectId; fid: mongoose.Types.ObjectId; deleteFriendFlag: string | undefined; res: express.Response, next: express.NextFunction}) {
    const matchIdPair = {_id: {$in: [uid, fid]}};
    const matchForAdd = {friends: {$not: {$in: [uid, fid]}}};
    const matchForDelete = {friends: {$in: [uid, fid]}};
    const projectUtil = {"friends": 1, addedFriends: {$cond: [{$eq: ["$_id", uid]}, fid, uid]}};
    const projectUpdate = {
        friends: !deleteFriendFlag ?
            {$concatArrays: ["$friends", {"$setDifference": [["$addedFriends"], "$friends"]}]}:
            {$filter: {input: "$friends", as: "friend", cond: {$ne: ["$$friend", "$addedFriends"]}}}
    };
    try {
        const newFriends = await UserModel.aggregate([
            {$match: matchIdPair}, {$project: projectUtil}, {$match: (!deleteFriendFlag ? matchForAdd : matchForDelete)}, {$project: projectUpdate}
        ]);
        Promise.all([
            UserModel.findByIdAndUpdate(newFriends[0]._id, {friends: newFriends[0].friends}),
            UserModel.findByIdAndUpdate(newFriends[1]._id, {friends: newFriends[1].friends})
        ]);
        res.json({Success: `User #${uid} ` + (!deleteFriendFlag ? `` : `un`) + `friended #${fid}`});
    } catch (error) {
        // console.error({error});
        next(createError(400, `Error writing data to DB: movie #${uid}, friend #${fid}`));
    }
}

DirectorsRouter.get('/movies/:id/directors', (req, res, next) => {
    const movieId = req.params.id;
    if (!movieId) return next(createError(400, `Insufficient information provided: movie #${movieId}`));
    const lookup = {from: "people", localField: "directors", foreignField: "_id", as: "directors"};
    const match = {_id: mongoose.Types.ObjectId(movieId)};
    MovieModel.aggregate([{$lookup: lookup}, {$match: match}], (err: any, docs: any) => {
        if (err) return next(createError(400, `Error reading data from DB: movie #${movieId}`));
        res.json({directors: docs[0].directors});
    });
})

DirectorsRouter.post('/movies/adddirector', (req, res, next) => {
    const movieId = req.body.id;
    const directorId = req.body.director;
    const {uid, fid} = createObjectIds({movieId, directorId});
    if (!uid || !fid) return next(createError(400, `Bad information provided: movie #${movieId}, director #${directorId}`));
    // updateDirectors({uid, fid, deleteFriendFlag: '', res, next});
    res.json({Success: `added director for movie #${movieId}, director #${directorId}`});
})

DirectorsRouter.post('/movies/remdirector', (req, res, next) => {
    const movieId = req.body.id;
    const directorId = req.body.director;
    const {uid, fid} = createObjectIds({movieId, directorId});
    if (!uid || !fid) return next(createError(400, `Bad information provided: movie #${movieId}, director #${directorId}`));
    // updateDirectors({uid, fid, deleteFriendFlag: 'true', res, next});
    res.json({Success: `removed director for movie #${movieId}, director #${directorId}`});
})

export default DirectorsRouter;
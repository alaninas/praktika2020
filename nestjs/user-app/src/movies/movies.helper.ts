import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Movie } from './schemas/movie.schema';
import { Person } from '../users/schemas/user.schema'
import { ObjectID } from 'mongodb';

@Injectable()
export class MoviesHelper {
    private myMModel: Model<Movie>;
    private myPModel: Model<Person>;
    constructor(
        @InjectModel(Person.name) private personModel: Model<Person>,
        @InjectModel(Movie.name) private movieModel: Model<Movie>) {
        this.myPModel = personModel;
        this.myMModel = movieModel;
    }

    getMovieModel(): Model<Movie> {
        return this.myMModel;
    }

    createMoviePipe(mid: ObjectID, did: ObjectID, deleteItemFlag: string | undefined): any {
        const mMatchDuplicate = !deleteItemFlag ? {directors: {$not: {$in: [did]}}} : {directors: {$in: [did]}};
        const mProjectNew = { directors: !deleteItemFlag ? {$concatArrays: ["$directors", ["$addedDirs"]]}:
                              {$filter: {input: "$directors", as: "director", cond: {$ne: ["$$director", "$addedDirs"]}}} };
        return {mMatchId: {_id: mid}, mMatchDuplicate, mProjectUtil: {"directors": 1, addedDirs: did}, mProjectNew};
    }

    createUserPipe(did: ObjectID, mid: ObjectID, deleteItemFlag: string | undefined): any {
        const uMatchDuplicate = !deleteItemFlag ? {movies: {$not: {$in: [mid]}}} : {movies: {$in: [mid]}};
        const uProjectNew = { movies: !deleteItemFlag ? {$concatArrays: ["$movies", ["$addedMovies"]]}:
                              {$filter: {input: "$movies", as: "movie", cond: {$ne: ["$$movie", "$addedMovies"]}}} };
        return {uMatchId: {_id: did}, uMatchDuplicate, uProjectUtil: {"movies": 1, addedMovies: mid}, uProjectNew};
    }

    async populateDirectors(mid: ObjectID): Promise<mongoose.Types.ObjectId[]> {
        const lookup = {from: "people", localField: "directors", foreignField: "_id", as: "directors"};
        const match = {_id: mid};
        const docs = await this.myMModel.aggregate([ {$match: match}, {$lookup: lookup}, {$project: {"directors": 1, _id: 0}} ]);
        // console.log(docs);
        return docs[0];
    }

    async updateDirectors(mid: ObjectID, did: ObjectID, deleteItemFlag: string | undefined): Promise<[Person, Movie]> {
        const {mMatchId, mMatchDuplicate, mProjectUtil, mProjectNew} = this.createMoviePipe(mid, did, deleteItemFlag);
        const {uMatchId, uMatchDuplicate, uProjectUtil, uProjectNew} = this.createUserPipe(did, mid, deleteItemFlag);
        const newPMovies = await this.myPModel.aggregate([{$match: uMatchId}, {$project: uProjectUtil}, {$match: uMatchDuplicate}, {$project: uProjectNew}]);
        const newMDirectors = await this.myMModel.aggregate([{$match: mMatchId}, {$project: mProjectUtil}, {$match: mMatchDuplicate}, {$project: mProjectNew}]);
        return Promise.all([this.myPModel.findByIdAndUpdate(newPMovies[0]._id, {movies: newPMovies[0].movies}),
                            this.myMModel.findByIdAndUpdate(newMDirectors[0]._id, {directors: newMDirectors[0].directors})]);
    }

    async purgeUsersRecords(mid: ObjectID): Promise<Person[]> {
        const allUsers = await this.myPModel.find({});
        for (const user of allUsers) {
            const index = user.movies.indexOf(mid);
            if (index > -1) {
                user.movies.splice(index, 1);
                await user.save();
            }
        }
        return allUsers;
    }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Person } from './schemas/user.schema';
import { Movie } from '../movies/schemas/movie.schema'
import { ObjectID } from 'mongodb';

@Injectable()
export class UsersHelper {
    private myPModel: Model<Person>;
    private myMModel: Model<Movie>;
    constructor(
        @InjectModel(Person.name) private personModel: Model<Person>,
        @InjectModel(Movie.name) private movieModel: Model<Movie>) {
        this.myPModel = personModel;
        this.myMModel = movieModel;
    }

    getPersonModel(): Model<Person> {
        return this.myPModel;
    }

    async sortUsers(column: string, direction: string): Promise<Person[]> {
        const directions = {
            asc: 1,
            dsc: -1
        };
        const docs = await this.myPModel.aggregate([ {$sort: {[column]: directions[direction], _id: -1} } ]);
        return docs
    }

    getNewFriendsStages(uid: ObjectID, fid: ObjectID, deleteItemFlag: string | undefined): Record<string, unknown> {
        const matchDuplicate = !deleteItemFlag ? {friends: {$not: {$in: [uid, fid]}}} : {friends: {$in: [uid, fid]}};
        const projectUtil = {
            "friends": 1, addedFriends: {$cond: [{$eq: ["$_id", uid]}, fid, uid]}
        };
        const projectNew = {friends: !deleteItemFlag ?
            {$concatArrays: ["$friends", {"$setDifference": [["$addedFriends"], "$friends"]}]}:
            {$filter: {input: "$friends", as: "friend", cond: {$ne: ["$$friend", "$addedFriends"]}}}
        };
        return {matchIds: {_id: {$in: [uid, fid]}}, matchDuplicate, projectUtil, projectNew};
    }

    async getFriendsDetails(uid: ObjectID): Promise<any[]> {
        const lookup = {from: "people", localField: "friends", foreignField: "_id", as: "friends"};
        const match = {_id: uid};
        const docs = await this.myPModel.aggregate([ {$match: match}, {$lookup: lookup}, {$project: {"friends": 1, _id: 0}} ]);
        return docs[0];
    }

    async getMoviesDetails(uid: ObjectID): Promise<mongoose.Types.ObjectId[]> {
        const lookup = {from: "movies", localField: "movies", foreignField: "_id", as: "movies"};
        const match = {_id: uid};
        const docs = await this.myPModel.aggregate([ {$match: match}, {$lookup: lookup}, {$project: {"movies": 1, _id: 0}} ]);
        return docs[0];
    }

    async updateFriends(uid: ObjectID, fid: ObjectID, deleteItemFlag: string | undefined): Promise<[Person, Person]> {
        const {matchIds, matchDuplicate, projectUtil, projectNew} = this.getNewFriendsStages(uid, fid, deleteItemFlag);
        const newFriends = await this.myPModel.aggregate([{$match: matchIds}, {$project: projectUtil}, {$match: matchDuplicate}, {$project: projectNew}]);
        return Promise.all([this.myPModel.findByIdAndUpdate(newFriends[0]._id, {friends: newFriends[0].friends}),
                            this.myPModel.findByIdAndUpdate(newFriends[1]._id, {friends: newFriends[1].friends})]);
    }
    
    async purgeUsersRecords(uid: ObjectID): Promise<Person[]> {
        const allUsers = await this.myPModel.find();
        try {
            for (const user of allUsers) {
                const index = user.friends.indexOf(uid);
                if (index > -1) {
                    user.friends.splice(index, 1);
                    await user.save();
                }
            }
            return allUsers;
        } catch (error) {
            throw new HttpException(`Error: ${error.message}`, HttpStatus.NOT_FOUND); 
        }
    }

    async purgeMoviesRecords(uid: ObjectID): Promise<Movie[]> {
        const allMovies = await this.myMModel.find();
        // console.log(allMovies);
        try {
            for (const movie of allMovies) {
                const index = movie.directors.indexOf(uid);
                if (index > -1) {
                    movie.directors.splice(index, 1);
                    await movie.save();
                }
            }
            return allMovies;
        } catch (error) {
            throw new HttpException(`Error: ${error.message}`, HttpStatus.NOT_FOUND);
        }
    }
}
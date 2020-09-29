import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Person } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UsersHelper } from './users.helper';
import { ObjectID } from 'mongodb';
import { Md5 } from 'ts-md5/dist/md5';
// import { Movie } from 'src/movies/schemas/movie.schema';

@Injectable()
export class UsersService {
    private personModel: Model<Person>;
    // private movieModel: Model<Movie>;
    constructor(private readonly usersHelper: UsersHelper) {
        this.personModel = usersHelper.getPersonModel();
        // this.movieModel = usersHelper.getMovieModel();
    }

    async getAllUsers(): Promise<Person[]> {
        return await this.personModel.find();
    }

    async getOneUser(id: ObjectID): Promise<Person> {
        const u = await this.personModel.findById(id).exec();
        console.log(u);
        return u;
    }

    async getUserFriends(id: ObjectID): Promise<mongoose.Types.ObjectId[]> {
        return (await this.personModel.findById(id).populate('friends')).friends;
    }

    async getUserMovies(id: ObjectID): Promise<mongoose.Types.ObjectId[]> {
        // mongoose.populate working for single collection lookup
        // doesn't work on lookup with foreign colllection: some issue with _id fields...
        // https://github.com/Automattic/mongoose/issues/2562
            // const u = await this.personModel.findById(id).exec();
            // console.log(u);
            // const ms = await u.populate('movies').execPopulate();
            // console.log(ms)
            // console.log(id)
            // return ms;
        return await this.usersHelper.populateMovies(id);
    }

    async createUser(user: CreateUserDto): Promise<Person> {
        if (await this.personModel.findOne({name: user.name})) throw new HttpException(`User name already in use #${user.name}`, HttpStatus.BAD_REQUEST);
        user.password = Md5.hashStr(user.password).toString();
        return await (new this.personModel(user)).save();
    }

    async loginUser(user: LoginUserDto): Promise<string> {
        const userToLogin = await this.personModel.findOne({name: user.name});
        const passwordDigest = Md5.hashStr(user.password).toString();
        if (passwordDigest !== userToLogin.password) throw new HttpException(`Can not login: wrong password. User #${user.name}`, HttpStatus.BAD_REQUEST);
        return `logs in user name ${user.name}`;
    }
    
    async addUserFriends(uid: ObjectID, fid: ObjectID): Promise<string> {
        try {
            await this.usersHelper.updateFriends(uid, fid, '');
            return `User #${uid} friended #${fid}`;
        } catch (error) {
            throw new HttpException(`Can not add friends: user #${uid}, friend #${fid}`, HttpStatus.BAD_REQUEST);
        }
    }

    async removeUserFriends(uid: ObjectID, fid: ObjectID): Promise<string> {
        try {
            await this.usersHelper.updateFriends(uid, fid, 'delete');
            return `User #${uid} unfriended #${fid}`;
        } catch (error) {
            throw new HttpException(`Can not remove friends: user #${uid}, friend #${fid}`, HttpStatus.BAD_REQUEST);
        }
    }

    async updateUser(user: UpdateUserDto): Promise<Person> {
        const userToUpdate = await this.personModel.findOne({name: user.name});
        const passwordDigest = Md5.hashStr(user.password).toString();
        if (passwordDigest === userToUpdate.password) throw new HttpException(`New password matches the old: user #${user.name}`, HttpStatus.BAD_REQUEST);
        return await userToUpdate.updateOne({password: passwordDigest, age: user.age, email: user.email});
    }
    
    async deleteUser(id: ObjectID): Promise<Person> {
        try {
            const users = await this.usersHelper.purgeUsersRecords(id);
            const movies = await this.usersHelper.purgeMoviesRecords(id);
            const userDeleted = await this.personModel.findOneAndDelete({_id: id});
            Promise.all([users, movies, userDeleted]);
            return userDeleted;
        } catch (error) {
            throw new HttpException(`Error: ${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }
}

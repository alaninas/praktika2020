import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Person } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersHelper } from './users.helper';
import { ObjectID } from 'mongodb';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class UsersService {
    private personModel: Model<Person>;
    constructor(private readonly usersHelper: UsersHelper) {
        this.personModel = usersHelper.getPersonModel();
    }

    async getAllUsers(): Promise<Person[]> {
        return await this.personModel.find();
    }

    async getOneUserById(id: ObjectID): Promise<Person> {
        return await this.personModel.findById(id);
    }

    async getUserFriends(id: ObjectID): Promise<mongoose.Types.ObjectId[]> {
        return await this.usersHelper.getFriendsDetails(id);
    }

    async getUserMovies(id: ObjectID): Promise<mongoose.Types.ObjectId[]> {
        return await this.usersHelper.getMoviesDetails(id);
    }

    async getOneUserByName(username: string): Promise<Person> {
        return this.personModel.findOne({name: username});
    }
    
    async createUser(user: CreateUserDto): Promise<Person> {
        if (await this.getOneUserByName(user.name)) throw new HttpException(`User name already in use #${user.name}`, HttpStatus.BAD_REQUEST);
        user.password = Md5.hashStr(user.password).toString();
        return await (new this.personModel(user)).save();
    }
    
    async addUserFriends(uid: ObjectID, fid: ObjectID): Promise<Record<string, unknown>> {
        try {
            await this.usersHelper.updateFriends(uid, fid, '');
            return {data: `User #${uid} friended #${fid}`};
        } catch (error) {
            throw new HttpException(`Can not add friends: user #${uid}, friend #${fid}`, HttpStatus.BAD_REQUEST);
        }
    }

    async removeUserFriends(uid: ObjectID, fid: ObjectID): Promise<Record<string, unknown>> {
        try {
            await this.usersHelper.updateFriends(uid, fid, 'delete');
            return {data: `User #${uid} unfriended #${fid}`};
        } catch (error) {
            throw new HttpException(`Can not remove friends: user #${uid}, friend #${fid}`, HttpStatus.BAD_REQUEST);
        }
    }

    async updateUser(user: UpdateUserDto): Promise<Person> {
        const userToUpdate = await this.getOneUserByName(user.name);
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

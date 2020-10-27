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

    async getAllUsersSorted(column: string, direction: string): Promise<Person[]> {
        // TODO: add params -- offset/pageNr ($skip), limit ($limit)
        try {
            return await this.usersHelper.sortUsers(column, direction);
        } catch (error) {
            throw new HttpException(`Can not sort users by column: ${column} in order: ${direction}`, HttpStatus.BAD_REQUEST);
        }
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

    async getOneUserByEmail(useremail: string): Promise<Person> {
        return this.personModel.findOne({email: useremail});
    }
    
    async createUser(user: CreateUserDto): Promise<Person> {
        if (await this.getOneUserByEmail(user.email)) throw new HttpException(`Email already in use #${user.email}`, HttpStatus.BAD_REQUEST);
        user.password = Md5.hashStr(user.password).toString();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {fullname, password, age, email, ...args} = user;
        // return await (new this.personModel(user)).save();
        return await this.personModel.create({ fullname, password, age, email });

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
        const userToUpdate = await this.getOneUserByEmail(user.email);
        const passwordDigest = Md5.hashStr(user.password).toString();
        if (passwordDigest === userToUpdate.password) throw new HttpException(`New password matches the old: user #${user.email}`, HttpStatus.BAD_REQUEST);
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
            throw new HttpException(`Error: ${error.message}`, HttpStatus.NOT_FOUND);
        }
    }
}

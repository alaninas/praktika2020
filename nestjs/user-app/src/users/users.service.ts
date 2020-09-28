import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Person } from './schemas/user.schema';
import { CreateUserDto } from './create-user.dto';
import mongoose from 'mongoose';
import { UsersHelper } from './users.helper';
import { ObjectID } from 'mongodb';

@Injectable()
export class UsersService {
    private personModel: Model<Person>;
    constructor(private readonly usersHelper: UsersHelper) {
        this.personModel = usersHelper.getPersonModel();
    }

    async getAllUsers(): Promise<Person[]> {
        const u =  await this.personModel.find();
        if (!u) throw new HttpException(`DB is empty`, HttpStatus.NOT_FOUND);
        return u;
    }

    async getOneUser(id: ObjectID): Promise<Person> {
        const u = await this.personModel.findById(id).exec();
        if (!u) throw new HttpException(`No user #${id} in DB`, HttpStatus.NOT_FOUND);
        return u;
    }

    async getUserFriends(id: ObjectID): Promise<mongoose.Types.ObjectId[]> {
        const u = await this.personModel.findById(id).populate('friends');
        if (u.friends.length < 1) throw new HttpException(`User #${id} has no friends`, HttpStatus.NOT_FOUND);
        return u.friends;
    }

    async createUser(user: CreateUserDto): Promise<Person> {
        try {
            return await (new this.personModel(user)).save();
        } catch (error) {
            throw new HttpException(`Can save user to BD: user #${user.name}`, HttpStatus.BAD_REQUEST);
        }
    }

    loginUser(user: CreateUserDto): string {
        return `logs in user: name ${user.name} age ${user.age} email ${user.email}`;
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

    updateUser(user: CreateUserDto): string {
        return `updates user: name ${user.name} age ${user.age} email ${user.email}`;
    }
    
    async deleteUser(id: ObjectID): Promise<Person> {
        try {
            const userToDelete = await this.personModel.findById(id);
            const users = await this.usersHelper.purgeUsersRecords(userToDelete._id);
            // const movies = await purgeMoviesRecords(userToDelete);
            const udel = await userToDelete.deleteOne();
            Promise.all([users, udel]);
            return udel;
        } catch (error) {
            throw new HttpException(`Error: ${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }
}

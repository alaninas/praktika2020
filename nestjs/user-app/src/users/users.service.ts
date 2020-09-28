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
        return await (new this.personModel(user)).save();
    }

    loginUser(user: CreateUserDto): string {
        return `logs in user: name ${user.name} age ${user.age} email ${user.email}`;
    }
    
    // if success on modelFindById('friendIdToAdd') --> then add to the current user friends[]
    // else throw 'Cannot find such friend in a DB'
    async addUserFriends(uid: ObjectID, fid: ObjectID): Promise<string> {
        return await this.usersHelper.updateFriends(uid, fid, '');
    }

    async removeUserFriends(uid: ObjectID, fid: ObjectID): Promise<string> {
        return await this.usersHelper.updateFriends(uid, fid, 'delete');
    }

    updateUser(user: CreateUserDto): string {
        return `updates user: name ${user.name} age ${user.age} email ${user.email}`;
    }
    
    deleteUser(user: CreateUserDto): string {
        return `deletes user: name ${user.name} age ${user.age} email ${user.email}`;
    }
}

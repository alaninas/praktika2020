import { HttpException, HttpStatus, Injectable, Next, Response} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Person } from './schemas/user.schema';
import { CreateUserDto } from './create-user.dto';
import mongoose from 'mongoose';
import { UsersHelper } from './users.helper';
import { ObjectID } from 'mongodb';

@Injectable()
export class UsersService {
    private personModel: Model<Person>;
    // add IsUser method ? probably not neccessary
    // add afterEach(async => .catch())
    constructor(private readonly usersHelper: UsersHelper) {
        this.personModel = this.usersHelper.getPersonModel();
    }

    async getAllUsers(): Promise<Person[]> {
        return await this.personModel.find().exec();
    }

    async getOneUser(id: string): Promise<Person> {
        return await this.personModel.findById(id);
    }

    async getUserFriends(id: ObjectID):  Promise<mongoose.Types.ObjectId[]> {
        try {
            return await this.usersHelper.populateFriends(id);
        } catch (error) {
            throw new HttpException(`Can not populate user #${id} friends`, HttpStatus.BAD_REQUEST);
        }
    }

    async createUser(user: CreateUserDto): Promise<Person> {
        try {
            return await (new this.personModel(user)).save();
        } catch (error) {
            throw new HttpException(`Can not save user #${user.name}`, HttpStatus.BAD_REQUEST);
        }
    }

    loginUser(user: CreateUserDto): string {
        return `logs in user: name ${user.name} age ${user.age} email ${user.email}`;
    }
    
    // if success on modelFindById('friendIdToAdd') --> then add to the current user friends[]
    // else throw 'Cannot find such friend in a DB'
    addUserFriends(user: CreateUserDto): string {
        return `adds friends to user: name ${user.name} age ${user.age} email ${user.email}`;
    }
    removeUserFriends(user: CreateUserDto): string {
        return `removes friends from user: name ${user.name} age ${user.age} email ${user.email}`;
    }

    updateUser(user: CreateUserDto): string {
        return `updates user: name ${user.name} age ${user.age} email ${user.email}`;
    }
    
    deleteUser(user: CreateUserDto): string {
        return `deletes user: name ${user.name} age ${user.age} email ${user.email}`;
    }
}

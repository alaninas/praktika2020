import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Person } from './schemas/user.schema';
import { CreateUserDto } from './create-user.dto';
import mongoose from 'mongoose';
@Injectable()
export class UsersService {
    //  add IsUser method ? probably not neccessary

    // add afterEach(async => .catch())

    constructor(@InjectModel(Person.name) private personModel: Model<Person>) {}

    async getAllUsers(): Promise<Person[]> {
        return this.personModel.find().exec();
    }

    async getOneUser(id: string): Promise<Person> {
        return this.personModel.findById(id);
    }

    async getUserFriends(id: string):  Promise<mongoose.Types.ObjectId[]> | undefined {
        const user = await this.personModel.findById(id);
        return user ? user.friends : undefined;
    }

    createUser(user: CreateUserDto): string {
        return `creates user: name ${user.name} age ${user.age} email ${user.email} friends ${user.friends}`;
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

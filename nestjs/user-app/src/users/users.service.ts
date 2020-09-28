import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Person } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import mongoose from 'mongoose';
import { UsersHelper } from './users.helper';
import { ObjectID } from 'mongodb';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class UsersService {
    private personModel: Model<Person>;
    constructor(private readonly usersHelper: UsersHelper) {
        this.personModel = usersHelper.getPersonModel();
    }

    /**
    * @param { Promise } promise
    * @param { Object } improved - If you need to enhance the error.
    * @return { Promise }
    */
    to(promise, improved?){
        return promise
          .then((data) => [null, data])
          .catch((err) => {
            if (improved) {
              Object.assign(err, improved);
            }
            return [err]; // which is same as [err, undefined];
          });
    }

    async getAllUsers(): Promise<Person[]> {
        return await this.personModel.find();
    }

    async getOneUser(id: ObjectID): Promise<Person> {
        // const u = await this.personModel.findById(id).exec();
        // if (!u) throw new HttpException(`No user #${id} in DB`, HttpStatus.NOT_FOUND);
        // return u;
        const [error, result] = await this.to(this.personModel.findById(id).exec());
        return result;
    }

    async getUserFriends(id: ObjectID): Promise<mongoose.Types.ObjectId[]> {
        const u = await this.personModel.findById(id).populate('friends');
        return u.friends;
    }

    async createUser(user: CreateUserDto): Promise<Person> {
        try {
            user.password = Md5.hashStr(user.password).toString();
            return await (new this.personModel(user)).save();
        } catch (error) {
            throw new HttpException(`Can't save user to BD: user #${user.name}`, HttpStatus.BAD_REQUEST);
        }
    }

    loginUser(user: LoginUserDto): string {
        return `logs in user: name ${user.name} age ${user.password}`;
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
        // check if new pswd matches the old
        const passwordDigest = Md5.hashStr(user.password).toString();
        return await this.personModel.findOneAndUpdate({name: user.name}, {password: passwordDigest, age: user.age, email: user.email});
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

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Person } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersHelper } from './users.helper';
import { ObjectID } from 'mongodb';
import { Md5 } from 'ts-md5/dist/md5';
import { sendMail } from './utilities/mail-user.utility';

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

    async updatePasswordByEmail(email: string, pass: string): Promise<Person> {
        const userToUpdate = await this.personModel.findOne({email});
        if (!userToUpdate) throw new HttpException(`No such user in DB #${userToUpdate}`, HttpStatus.NOT_FOUND);
        const passwordDigest = Md5.hashStr(pass).toString();
        const passwordConfirm = passwordDigest
        const password = passwordDigest
        await sendMail(email, password)
        return await userToUpdate.updateOne({ password, passwordConfirm });
    }
    
    async createUser(user: CreateUserDto): Promise<Person> {
        const duplicate = await this.personModel.findOne({ email: user.email });
        if (duplicate) throw new HttpException(`Email already in use #${user.email}`, HttpStatus.BAD_REQUEST);
        const passwordDigest = Md5.hashStr(user.password).toString();
        user.password = passwordDigest;
        user.passwordConfirm = passwordDigest;
        return await this.personModel.create(user);
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
        const { _id, ...args } = user
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, passwordConfirm, ...argsWOpswd } = args
        const userToUpdate = await this.personModel.findOne({ _id: _id });
        const oldpswd = userToUpdate.password
        if (password) {
            const passwordDigest = Md5.hashStr(args.password).toString();
            if (passwordDigest === oldpswd) throw new HttpException(`New password matches the old: user #${_id} pswd: ${passwordDigest}`, HttpStatus.BAD_REQUEST);
            args.password = passwordDigest;
            args.passwordConfirm = passwordDigest;
        } else {
            args.password = userToUpdate.password;
            args.passwordConfirm = userToUpdate.passwordConfirm;
        }
        return await userToUpdate.updateOne(args);
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

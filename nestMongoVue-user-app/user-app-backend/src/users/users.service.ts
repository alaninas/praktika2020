import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Person } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersHelper } from './users.helper';
import { ObjectID } from 'mongodb';
import { sendMail } from './utilities/mail-user.utility';
import { to, getMd5Hash, createUserPassword, updateUserPassword } from './utilities/base-user.utility';
import IFile from './types/IFile';
import { prepareFileUpdate } from './utilities/file-upload.utility';

@Injectable()
export class UsersService {
    private personModel: Model<Person>;
    constructor(private readonly usersHelper: UsersHelper) {
        this.personModel = usersHelper.getPersonModel();
    }

    async getAllUsers(): Promise<Person[]> {
        return await this.personModel.find();
    }

    async getAllUsersSorted({ column, direction }: { column: string; direction: string; }): Promise<Person[]> {
        // TODO: add params -- offset/pageNr ($skip), limit ($limit)
        const [error, result] = await to(this.usersHelper.sortUsers(column, direction));
        if (error) throw new HttpException(`Can not sort users by column: ${column} in order: ${direction}`, HttpStatus.BAD_REQUEST);
        return result
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

    async getUserFiles(id: ObjectID): Promise<string[]> {
        const user = await this.personModel.findById(id);
        return user.images
    }

    async updatePasswordByEmail({ email, newPass }: { email: string; newPass: string; }): Promise<[Person, string]> {
        const userToUpdate = await this.personModel.findOne({email});
        if (!userToUpdate) throw new HttpException(`No such user in DB #${userToUpdate}`, HttpStatus.NOT_FOUND);
        const passwordDigest = getMd5Hash(newPass);
        return Promise.all([userToUpdate.updateOne({ password: passwordDigest, passwordConfirm: passwordDigest }), sendMail(email, newPass)]);
    }

    async uploadMultipleFiles({ id, files }: { id: ObjectID; files: IFile[]; }): Promise<Person> {
        const userToUpdate = await this.personModel.findOne({ _id: id });
        return await userToUpdate.updateOne(prepareFileUpdate({ files, oldFiles: userToUpdate.images }));
    }
    
    async createUser(user: CreateUserDto): Promise<Person> {
        const duplicate = await this.personModel.findOne({ email: user.email });
        if (duplicate) throw new HttpException(`Email already in use #${user.email}`, HttpStatus.BAD_REQUEST);
        return await this.personModel.create(createUserPassword(user));
    }
    
    async addUserFriends({ uid, fid }: { uid: ObjectID; fid: ObjectID; }): Promise<Record<string, unknown>> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [error, result] = await to(this.usersHelper.updateFriends(uid, fid, ''));
        if (error) throw new HttpException(`Can not add friends: user #${uid}, friend #${fid}`, HttpStatus.BAD_REQUEST);
        return {data: `User #${uid} friended #${fid}`};
    }

    async removeUserFriends({ uid, fid }: { uid: ObjectID; fid: ObjectID; }): Promise<Record<string, unknown>> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [error, result] = await to(this.usersHelper.updateFriends(uid, fid, 'delete'));
        if (error) throw new HttpException(`Can not remove friends: user #${uid}, friend #${fid}`, HttpStatus.BAD_REQUEST);
        return {data: `User #${uid} unfriended #${fid}`};
    }

    async updateUser(user: UpdateUserDto): Promise<Person> {
        const { _id, ...args } = user
        const userToUpdate = await this.personModel.findOne({ _id: _id });
        return await userToUpdate.updateOne(updateUserPassword({ args, userToUpdate }));
    }
    
    async deleteUser(id: ObjectID): Promise<boolean> {
        try {
            Promise.all([ this.usersHelper.purgeUsersRecords(id), this.usersHelper.purgeMoviesRecords(id), this.personModel.findOneAndDelete({_id: id}) ]);
            return true;
        } catch (error) {
            throw new HttpException(`Error: ${error.message}`, HttpStatus.NOT_FOUND);
        }
    }
}

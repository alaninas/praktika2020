import { HttpException, HttpStatus, Injectable, NestMiddleware, Next, Response } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Person } from './schemas/user.schema';
import { ObjectID } from 'mongodb';


@Injectable()
export class UsersHelper {
  constructor(@InjectModel(Person.name) private personModel: Model<Person>) {}

  getPersonModel() {
    return this.personModel;
  }

  async transform(value: any): Promise<ObjectID> {
    try {
      const transformedObjectId: ObjectID = ObjectID.createFromHexString(value);
      return transformedObjectId;
    } catch (error) {
      throw new HttpException(`Can not create ObjectId from #${value}`, HttpStatus.BAD_REQUEST);
    }
  }

  async populateFriends(id: string): Promise<any> {
    try {
      // const u = await this.personModel.findById(id).populate('friends');
      // return u.friends;

      const omid = await this.transform(id);
      const lookup = {from: "people", localField: "friends", foreignField: "_id", as: "friends"};
      const docs = await this.personModel.aggregate([{$lookup: lookup}, {$match: {_id: omid}}]);
      return docs[0].friends;
    } catch (error) {
      console.log(error.message)
      throw new HttpException(`Can not find user #${id}`, HttpStatus.BAD_REQUEST);
    }
  }
}

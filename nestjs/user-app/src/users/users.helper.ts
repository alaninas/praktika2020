import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person } from './schemas/user.schema';
import { ObjectID } from 'mongodb';


@Injectable()
export class UsersHelper {
  private myModel: Model<Person>;
  constructor(@InjectModel(Person.name) private personModel: Model<Person>) {
    this.myModel = personModel;
  }

  getPersonModel() {
    return this.myModel;
  }

  async populateFriends(id: ObjectID): Promise<Person[]> {
    const lookup = {from: "people", localField: "friends", foreignField: "_id", as: "friends"};
    const docs = await this.personModel.aggregate([{$lookup: lookup}, {$match: {_id: id}}, {$project: {"friends": 1, "_id": 0}}]);
    return docs[0];
  }
}

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

  getPersonModel(): Model<Person>{
    return this.myModel;
  }

  createPipeStages(uid: ObjectID, fid: ObjectID, deleteItemFlag: string | undefined): any {
    const matchDuplicate = !deleteItemFlag ? {friends: {$not: {$in: [uid, fid]}}} : {friends: {$in: [uid, fid]}};
    const projectUtil = {
        "friends": 1, addedFriends: {$cond: [{$eq: ["$_id", uid]}, fid, uid]}
    };
    const projectNew = {
        friends: !deleteItemFlag ?
            {$concatArrays: ["$friends", {"$setDifference": [["$addedFriends"], "$friends"]}]}:
            {$filter: {input: "$friends", as: "friend", cond: {$ne: ["$$friend", "$addedFriends"]}}}
    };
    return {matchIds: {_id: {$in: [uid, fid]}}, matchDuplicate, projectUtil, projectNew};
  }

  async populateFriends(id: ObjectID): Promise<Person[]> {
    const lookup = {from: "people", localField: "friends", foreignField: "_id", as: "friends"};
    const docs = await this.personModel.aggregate([{$lookup: lookup}, {$match: {_id: id}}, {$project: {"friends": 1, "_id": 0}}]);
    return docs[0];
  }

  async updateFriends(uid: ObjectID, fid: ObjectID, deleteItemFlag: string | undefined): Promise<[Person, Person]> {
    const {matchIds, matchDuplicate, projectUtil, projectNew} = this.createPipeStages(uid, fid, deleteItemFlag);
    const newFriends = await this.myModel.aggregate([{$match: matchIds}, {$project: projectUtil}, {$match: matchDuplicate}, {$project: projectNew}]);
    return Promise.all([this.myModel.findByIdAndUpdate(newFriends[0]._id, {friends: newFriends[0].friends}),
                        this.myModel.findByIdAndUpdate(newFriends[1]._id, {friends: newFriends[1].friends})]);
  }

  async purgeUsersRecords(uid: ObjectID): Promise<Person[]> {
    const allUsers = await this.myModel.find({});
    for (const user of allUsers) {
        const index = user.friends.indexOf(uid);
        if (index > -1) {
            user.friends.splice(index, 1);
            await user.save();
        }
    }
    return allUsers;
  }
}
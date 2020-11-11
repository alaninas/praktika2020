import { HttpException, HttpStatus } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { Md5 } from 'ts-md5/dist/md5';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Person } from '../schemas/user.schema';

function getDirection(direction: string): number {
  const directions = {
    asc: 1,
    dsc: -1
  };
  return directions[direction]
}

function getNewFriendsStages({ uid, fid, deleteItemFlag }: { uid: ObjectID; fid: ObjectID; deleteItemFlag: string | undefined; }): Record<string, unknown> {
  const matchDuplicate = !deleteItemFlag ? {friends: {$not: {$in: [uid, fid]}}} : {friends: {$in: [uid, fid]}};
  const projectUtil = {
      "friends": 1, addedFriends: {$cond: [{$eq: ["$_id", uid]}, fid, uid]}
  };
  const projectNew = {friends: !deleteItemFlag ?
      {$concatArrays: ["$friends", {"$setDifference": [["$addedFriends"], "$friends"]}]}:
      {$filter: {input: "$friends", as: "friend", cond: {$ne: ["$$friend", "$addedFriends"]}}}
  };
  return {matchIds: {_id: {$in: [uid, fid]}}, matchDuplicate, projectUtil, projectNew};
}

function to(promise: Promise<any>, improved?: any) {
  return promise
    .then((data: any) => [null, data])
    .catch((err: any) => {
      if (improved) {
        Object.assign(err, improved)
      }
      return [err] // which is same as [err, undefined];
    })
}

function getMd5Hash(inp: string): string {
  return Md5.hashStr(inp).toString()
}

function createUserPassword(user: CreateUserDto): CreateUserDto {
  const passwordDigest = getMd5Hash(user.password);
  user.password = passwordDigest;
  user.passwordConfirm = passwordDigest;
  return user;
}

function updateUserPassword({ args, userToUpdate }: { args: UpdateUserDto; userToUpdate: Person; }): UpdateUserDto {
  const oldpswd = userToUpdate.password
  if (args.password) {
      const passwordDigest = getMd5Hash(args.password);
      if (passwordDigest === oldpswd) throw new HttpException(`New password matches the old: user #${userToUpdate._id} pswd: ${passwordDigest}`, HttpStatus.BAD_REQUEST);
      args.password = passwordDigest;
      args.passwordConfirm = passwordDigest;
  } else {
      args.password = userToUpdate.password;
      args.passwordConfirm = userToUpdate.passwordConfirm;
  }
  return args;
}


export {
  getDirection,
  getNewFriendsStages,
  to,
  getMd5Hash,
  createUserPassword,
  updateUserPassword
}
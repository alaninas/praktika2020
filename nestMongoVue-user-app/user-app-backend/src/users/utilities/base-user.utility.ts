import { ObjectID } from 'mongodb';

function getDirection(direction: string): number {
  const directions = {
    asc: 1,
    dsc: -1
  };
  return directions[direction]
}

function getNewFriendsStages(uid: ObjectID, fid: ObjectID, deleteItemFlag: string | undefined): Record<string, unknown> {
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

function to (promise: Promise<any>, improved?: any) {
  return promise
    .then((data: any) => [null, data])
    .catch((err: any) => {
      if (improved) {
        Object.assign(err, improved)
      }
      return [err] // which is same as [err, undefined];
    })
}


export {
  getDirection,
  getNewFriendsStages,
  to
}
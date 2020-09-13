import { User } from './user';

export class UserList {
    // public static list: User[] = [];
    public static list: User[];

    constructor(list: User[]) {
      UserList.list = list;
    }

    public getUser (arr: User[], name: string) {
      return arr.find(obj => {return obj.name === name}) || 0;
    }

    public getList() {
      return UserList.list;
    }

    // public emptyList() {
      // UserList.list = [];
    // }

    public checkFriendship (arr: User[], userName: string, friendName: string) {
      const user = this.getUser(arr, userName);
      let result: string | number = 0;
      if (!user) {
        throw new Error("No such user in DB");
      }
      else {
        const friends = user.friends;
        result = friends.find(frName => {return frName === friendName}) || 0;
      }
      return result;
    }
}

// export { User } from './user';
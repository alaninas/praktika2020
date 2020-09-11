import { User } from './user';

export class UserList {
    // public static list: User[] = [];
    public static list: User[];

    constructor(list: User[]) {
      UserList.list = list;
    }

    public getUser (arr: User[], name: string) {
      return arr.find(obj => {
          return obj.name === name
      });
    }

    public getList() {
      return UserList.list;
    }

    // public emptyList() {
      // UserList.list = [];
    // }
}

// export { User } from './user';
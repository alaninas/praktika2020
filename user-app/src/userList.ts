// import { User } from './user';
import { Friend } from './friend';

export class UserList {
    // public static list: User[] = [];
    public static list: Friend[];

    constructor(list: Friend[]) {
      UserList.list = list;
    }

    public getUser (arr: Friend[], name: string) {
      return arr.find(obj => {
          return obj.name === name
      });
    }

    public getList() {
      return UserList.list;
    }

    public emptyList() {
      UserList.list = [];
    }
}

// export { User } from './user';
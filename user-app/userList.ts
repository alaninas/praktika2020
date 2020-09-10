import { User } from './user';

export class UserList {
    // private userList: User[] = [];
    public static list: User[] = [new User('U1'),new User('U2'),new User('U3')];;

    public getUser = (arr: User[], name: string) => {
      return arr.find(obj => {
          return obj.name === name
      });
    }

    public getList() {
      return UserList.list;
    }

}

export { User } from './user';
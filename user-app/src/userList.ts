// import { User } from './user';
import { Friend } from './friend';

export class UserList {
    // public static list: User[] = [];
    public static list: Friend[] = [new Friend('U1'), new Friend('U2'), new Friend('U3')];

    public getUser (arr: Friend[], name: string) {
      return arr.find(obj => {
          return obj.name === name
      });
    }

    public getList() {
      return UserList.list;
    }
}

// export { User } from './user';
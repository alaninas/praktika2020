import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(name: string, pass: string): Promise<any> {
      const user = await this.usersService.getOneUserByName(name);
      // console.log(user);
      // console.log(pass);
      // console.log(user.password);
      // console.log(Md5.hashStr(pass).toString());
      if (user && user.password === Md5.hashStr(pass).toString()) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
}

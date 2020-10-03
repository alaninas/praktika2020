import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Md5 } from 'ts-md5/dist/md5';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

    async validateUser(name: string, pass: string): Promise<any> {
        const user = await this.usersService.getOneUserByName(name);
        if (user && user.password === Md5.hashStr(pass).toString()) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }
        return null;
	}
	
	async login(user: any) {
        const payload = { username: user.name, sub: user._id };
        // console.log(payload);
		return {
		    access_token: this.jwtService.sign(payload, {expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES})
		};
	}
}

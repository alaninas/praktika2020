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

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.getOneUserByEmail(email);
        if (user && user.password === Md5.hashStr(pass).toString()) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }
        // console.log(user)
        return null;
	}
	
	async login(user: any) {
        // console.log('---> inside login')
        // console.log(user)
        const payload = { email: user.email, sub: user.password, _id: user._id };
		return { 
            access_token: this.jwtService.sign(payload, {expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES}),
            email: payload.email,
            id: payload._id
        };
	}
}

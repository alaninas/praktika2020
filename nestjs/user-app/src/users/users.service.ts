import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
    getAllUsers(): string {
        return `gets all users`;
    }
    getOneUser(id: string): string {
        return `gets user by id ${id}`;
    }
    createUser(user: CreateUserDto): string {
        return `creates user: name ${user.name} age ${user.age} email ${user.email}`;
    }
}

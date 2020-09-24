import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
    //  add IsUser method
    
    getAllUsers(): string {
        return `gets all users`;
    }
    getOneUser(id: string): string {
        return `gets user by id ${id}`;
    }
    getUserFriends(id: string): string {
        return `gets user id ${id} friends list`;
    }

    createUser(user: CreateUserDto): string {
        return `creates user: name ${user.name} age ${user.age} email ${user.email}`;
    }
    loginUser(user: CreateUserDto): string {
        return `logs in user: name ${user.name} age ${user.age} email ${user.email}`;
    }
    addUserFriends(user: CreateUserDto): string {
        return `adds friends to user: name ${user.name} age ${user.age} email ${user.email}`;
    }
    removeUserFriends(user: CreateUserDto): string {
        return `removes friends from user: name ${user.name} age ${user.age} email ${user.email}`;
    }

    updateUser(user: CreateUserDto): string {
        return `updates user: name ${user.name} age ${user.age} email ${user.email}`;
    }
    
    deleteUser(user: CreateUserDto): string {
        return `deletes user: name ${user.name} age ${user.age} email ${user.email}`;
    }
}

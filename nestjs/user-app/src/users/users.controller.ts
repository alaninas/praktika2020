import { Body, Controller, Delete, Get, Param, Post, Put, HttpException, Catch} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Person } from './schemas/user.schema';
import { UsersService } from './users.service';
import mongoose from 'mongoose';
import { ParseObjectIdPipe } from './users.pipe';
import { ObjectID } from 'mongodb';

@Catch(HttpException)
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAllUsers(): Promise<Person[]> {
        return this.usersService.getAllUsers();
    }
    
    @Get(':id')
    async getOneUser(@Param('id', ParseObjectIdPipe) id: ObjectID): Promise<Person> {
        return this.usersService.getOneUser(id);
    }

    @Get(':id/friends')
    async getUserFriends(@Param('id', ParseObjectIdPipe) id: ObjectID): Promise<mongoose.Types.ObjectId[]> {
        return this.usersService.getUserFriends(id);
    }

    @Get(':id/movies')
    async getUserMovies(@Param('id', ParseObjectIdPipe) id: ObjectID): Promise<mongoose.Types.ObjectId[]> {
        return this.usersService.getUserMovies(id);
    }
    
    @Post()
    async createUser(@Body() user: CreateUserDto): Promise<Person> {
        return this.usersService.createUser(user);
    }

    @Post('login')
    async loginUser(@Body() user: LoginUserDto): Promise<string> {
        return this.usersService.loginUser(user);
    }

    @Post('friends/add')
    // @Param('id')
    async addUserFriends(@Body('id', ParseObjectIdPipe) uid: ObjectID, @Body('friend', ParseObjectIdPipe) fid: ObjectID): Promise<string> {
        return this.usersService.addUserFriends(uid, fid);
    }

    @Post('friends/remove')
    async removeUserFriends(@Body('id', ParseObjectIdPipe) uid: ObjectID, @Body('friend', ParseObjectIdPipe) fid: ObjectID): Promise<string> {
        return this.usersService.removeUserFriends(uid, fid);
    }

    @Put()
    async updateUser(@Body() user: UpdateUserDto): Promise<Person> {
        return this.usersService.updateUser(user);
    }

    @Delete()
    async deleteUser(@Body('id', ParseObjectIdPipe) id: ObjectID): Promise<Person> {
        return this.usersService.deleteUser(id);
    }
}

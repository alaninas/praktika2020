import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getAllUsers(): string {
        return this.usersService.getAllUsers();
    }
    @Get(':id')
    getOneUser(@Param('id') id: string): string {
        return this.usersService.getOneUser(id);
    }
    @Get(':id/friends')
    getUserFriends(@Param('id') id: string): string {
        return this.usersService.getUserFriends(id);
    }
    
    @Post()
    createUser(@Body() user: CreateUserDto): string {
        return this.usersService.createUser(user);
    }
    @Post('login')
    loginUser(@Body() user: CreateUserDto): string {
        return this.usersService.loginUser(user);
    }
    @Post('friends/add')
    addUserFriends(@Body() user: CreateUserDto): string {
        return this.usersService.addUserFriends(user);
    }
    @Post('friends/remove')
    removeUserFriends(@Body() user: CreateUserDto): string {
        return this.usersService.removeUserFriends(user);
    }

    @Put()
    updateUser(@Body() user: CreateUserDto): string {
        return this.usersService.updateUser(user);
    }

    @Delete()
    deleteUser(@Body() user: CreateUserDto): string {
        return this.usersService.deleteUser(user);
    }
}

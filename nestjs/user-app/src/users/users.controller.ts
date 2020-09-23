import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    
    @Post()
    createUser(@Body() user: CreateUserDto): string {
        return this.usersService.createUser(user);
    }
}

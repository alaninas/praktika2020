import { Body, Controller, Delete, Get, Param, Post, Put, HttpException, Catch, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Person } from './schemas/user.schema';
import { UsersService } from './users.service';
import mongoose from 'mongoose';
import { ParseObjectIdPipe } from './users.pipe';
import { ObjectID } from 'mongodb';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter, editDestination } from './utilities/files-interceptor.utility';
import IFile from './types/IFile';

@Catch(HttpException)
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

    @Get()
    async getAllUsers(): Promise<Person[]> {
        return this.usersService.getAllUsers();
    }
    @Get('sort/:column/:direction')
    async getAllUsersSorted(@Param('column') column: string, @Param('direction') direction: string): Promise<Person[]> {
        return this.usersService.getAllUsersSorted({ column, direction });
    }
    @Get(':id')
    async getOneUser(@Param('id', ParseObjectIdPipe) id: ObjectID): Promise<Person> {
        return this.usersService.getOneUserById(id);
    }
    @Get(':id/friends')
    async getUserFriends(@Param('id', ParseObjectIdPipe) id: ObjectID): Promise<mongoose.Types.ObjectId[]> {
        return this.usersService.getUserFriends(id);
    }
    @Get(':id/movies')
    async getUserMovies(@Param('id', ParseObjectIdPipe) id: ObjectID): Promise<mongoose.Types.ObjectId[]> {
        return this.usersService.getUserMovies(id);
    }
    @Get('email/:email')
    async getOneUserByEmail(@Param('email') email: string): Promise<Person> {
        return this.usersService.getOneUserByEmail(email);
    }
    @Get('gallery/:id')
    async getUserImages(@Param('id', ParseObjectIdPipe) id: ObjectID): Promise<string[]> {
      return this.usersService.getUserImages(id);
    }
    
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Body() user: LoginUserDto) {
        return this.authService.login(user);
    }
    @Post()
    async createUser(@Body() user: CreateUserDto): Promise<Person> {
        return this.usersService.createUser(user);
    }
    @Post('friends/add')
    async addUserFriends(@Body('id', ParseObjectIdPipe) uid: ObjectID, @Body('friend', ParseObjectIdPipe) fid: ObjectID): Promise<Record<string, unknown>> {
        return this.usersService.addUserFriends({ uid, fid });
    }
    @Post('friends/remove')
    async removeUserFriends(@Body('id', ParseObjectIdPipe) uid: ObjectID, @Body('friend', ParseObjectIdPipe) fid: ObjectID): Promise<Record<string, unknown>> {
        return this.usersService.removeUserFriends({ uid, fid });
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updateUser(@Body() user: UpdateUserDto): Promise<Person> {
        return this.usersService.updateUser(user);
    }
    @Put('email/:email')
    async updatePasswordByEmail(@Param('email') email: string, @Body('sub') sub: string): Promise<[Person, string]> {
        return this.usersService.updatePasswordByEmail({ email, newPass: sub });
    }
    // TODO: add guards
    @Put('uploads/:id')
    @UseInterceptors(
      FilesInterceptor('image', 20, {
        storage: diskStorage({
          destination: editDestination,
          filename: editFileName
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async uploadMultipleFiles(@UploadedFiles() files: IFile[], @Param('id') id: string): Promise<Person> {
        const oid = ObjectID.createFromHexString(id);
        return this.usersService.uploadMultipleFiles({ id: oid, files });
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id', ParseObjectIdPipe) id: ObjectID): Promise<boolean> {
        return this.usersService.deleteUser(id);
    }
    // TODO: add guards
    @Delete('gallery/:path')
    async deleteImage(@Param('path') path: string): Promise<boolean> {
        return this.usersService.deleteUserImage(path);
    }
}

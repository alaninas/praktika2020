// import { Type } from "class-transformer/decorators";
import { IsArray, IsEmail, IsString, IsInt, IsMongoId, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
// import { Person } from "./schemas/user.schema";
import { IsEqualTo } from '../decorators/isequal'

export class CreateUserDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsEqualTo('password', {message: 'passwords do not match'})
    passwordConfirm: string;

    @IsOptional()
    @IsInt()
    age: number;

    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsArray()
    @IsMongoId({each:true})
    friends: string[];
}
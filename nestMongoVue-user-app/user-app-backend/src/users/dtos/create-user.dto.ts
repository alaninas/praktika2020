import { IsEmail, IsString, IsInt, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { IsEqualTo } from '../decorators/IsEqualTo'

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

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
    @IsString()
    address?: string;

    @IsOptional()
    @IsInt()
    age?: number;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    firstname?: string;   

    @IsOptional()
    @IsString()
    fullname?: string;  
    
    @IsOptional()
    @IsInt()
    houseNumber?: number;​

    @IsOptional()
    @IsString()
    lastname?: string

    @IsOptional()
    @IsString()
    street?: string;

    @IsOptional()
    @IsInt()
    zipCode?: number;​

    // type string is not assignable to Type 'string[]' is not assignable to type '{ generationTime: number; equals: {}; getTimestamp: {}; toHexString: {}; }[]'
    // @IsOptional()
    // @IsArray()
    // @IsMongoId({each:true})
    // friends?: string[];
    // @IsOptional()
    // @IsArray()
    // @IsMongoId({each:true})
    // movies?: string[];
}
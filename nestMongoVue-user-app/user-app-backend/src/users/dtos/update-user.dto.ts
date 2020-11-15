import { IsArray, IsInt, IsMongoId, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { IsEqualTo } from "../decorators/IsEqualTo";

export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty()
    @IsMongoId()
    _id?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(40)
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(40)
    @IsEqualTo('password', {message: 'passwords do not match'})
    passwordConfirm?: string;

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
    @IsInt()
    houseNumber?: number;​

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    @Matches(/\.(jpg|jpeg|png|gif)$/, {each: true, message: 'file extension not a picture'})
    images?: string[];

    @IsOptional()
    @IsString()
    lastname?: string

    @IsOptional()
    @IsString()
    street?: string;

    @IsOptional()
    @IsString()
    website?: string;

    @IsOptional()
    @IsInt()
    zipCode?: number;​
}
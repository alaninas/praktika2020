// import { Type } from "class-transformer/decorators";
import { IsArray, IsEmail, IsInt, IsMongoId, IsNotEmpty, IsOptional } from "class-validator";
// import { Person } from "./schemas/user.schema";

export class CreateUserDto {
    @IsNotEmpty()
    readonly name: string;

    @IsOptional()
    @IsInt()
    age: number;

    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsArray()
    // @ValidateNested({each: true})
    // @Type(() => Person)
    @IsMongoId({each:true})
    friends: string[];

    // .friends[] list
    // for-each in a list
    // .movies[] list
    // for-each in a list
    // validate the array --> logic inside the service
    // director: string --> validate inside services
    // use isObjectId
}
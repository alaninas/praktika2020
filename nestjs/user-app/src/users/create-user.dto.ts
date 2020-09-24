import { IsEmail, IsInt, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    readonly name: string;

    @IsInt()
    readonly age: number;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    // .friends[] list
    // for-each in a list
    // check if @IsUser
    // ? How from @Body().user.id --> getUser(@Body().user.id) 
    // ? The same logic extends to Movies.directors[]
    // ? SwaggerModule

    // @Body(key?: string) and req.body / req.body[key]
    // (see Request Payloads)

    // .movies[] list
    // for-each in a list
    // check if @IsMovie
    // ? How from @Body().movie.id --> getMovie(@Body().movie.id) 

    // validate the array --> logic inside the service
    // director: string --> validate inside services
    // and check id.length
    // and check isHex
    // use isObjectId
}
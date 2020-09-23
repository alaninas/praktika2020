import { IsEmail, IsInt, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    readonly name: string;

    @IsInt()
    readonly age: number;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;

    @IsOptional()
    @IsInt()
    age: number;

    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
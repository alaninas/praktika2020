// import { Type } from "class-transformer/decorators";
import { IsDateString, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";
// import { Person } from "./schemas/user.schema";

export class UpdateUserDto {
    @IsNotEmpty()
    @Length(3, 20)
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    genre: string;

    @IsOptional()
    @IsDateString()
    date: string;

    @IsOptional()
    @IsNotEmpty()
    @Length(2, 20)
    @Matches(/^(\.*?\/)*([A-z0-9-_+]+\/)*([A-z0-9]+\.([A-z]*))$/, {message: 'not a file path'})
    poster: string;
}
import { IsArray, IsString, IsMongoId, IsNotEmpty, IsOptional, IsDateString, Length, Matches } from "class-validator";

export class CreateUserDto {
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
    @Matches(/^(\.*?\/)*([A-z0-9-_+]+\/)*([A-z0-9]+\.(png|jpg|jpeg|gif|svg))$/, {message: 'not a picture file path'})
    poster: string;

    @IsOptional()
    @IsArray()
    @IsMongoId({each:true})
    directors: string[];
}
import { IsArray, IsString, IsMongoId, IsNotEmpty, IsOptional, IsDateString, Length, Matches } from "class-validator";

export class CreateMovieDto {
    @IsNotEmpty()
    @Length(3, 40)
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
    @Length(2, 60)
    @Matches(/^(\.*?\/)*([A-z0-9-_+]+\/)*([A-z0-9]+\.(png|jpg|jpeg|gif|svg))$/, {message: 'not a picture file path'})
    poster: string;

    @IsOptional()
    @IsArray()
    @IsMongoId({each:true})
    directors: string[];
}
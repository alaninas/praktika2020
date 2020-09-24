import { IsAlpha, IsDateString, IsNotEmpty } from "class-validator";

export class CreateMovieDto {
    @IsNotEmpty()
    readonly name: string;

    // ? From @Body().movie.string in postman --> getDate(@Body().movie.string)
    @IsDateString()
    // @IsDate()
    readonly date: string;

    @IsAlpha()
    readonly genre: string;
}
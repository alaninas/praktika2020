import { IsAlpha, IsDate, IsNotEmpty } from "class-validator";

export class CreateMovieDto {
    @IsNotEmpty()
    readonly name: string;

    // ? From @Body().movie.string in postman --> getDate(@Body().movie.string)
    @IsDate()
    readonly date: Date;

    @IsAlpha()
    readonly genre: string;
}
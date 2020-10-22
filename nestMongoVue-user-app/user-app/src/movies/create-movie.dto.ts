import { IsAlpha, IsDateString, IsNotEmpty } from "class-validator";

export class CreateMovieDto {
    @IsNotEmpty()
    readonly name: string;

    @IsDateString()
    readonly date: string;

    @IsAlpha()
    readonly genre: string;
}
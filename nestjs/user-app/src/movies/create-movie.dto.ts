import { IsAlpha, IsDate, IsNotEmpty } from "class-validator";

export class CreateMovieDto {
    @IsNotEmpty()
    readonly name: string;

    @IsDate()
    readonly date: Date;

    @IsAlpha()
    readonly genre: string;
}
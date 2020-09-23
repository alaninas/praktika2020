import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './create-movie.dto';

@Injectable()
export class MoviesService {
    getAllMovies(): string {
        return `gets all movies`;
    }
    getOneMovie(id: string): string {
        return `gets movie by id ${id}`;
    }
    createMovie(movie: CreateMovieDto): string {
        return `creates movie: name ${movie.name} date ${movie.date} genre ${movie.genre}`;
    }
}

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateMovieDto } from './create-movie.dto';
import { MoviesHelper } from './movies.helper';
import { Movie } from './schemas/movie.schema';

@Injectable()
export class MoviesService {
    private movieModel: Model<Movie>;
    constructor(private readonly moviesHelper: MoviesHelper) {
        this.movieModel = moviesHelper.getMovieModel();
    }

    getAllMovies(): string {
        return `gets all movies`;
    }

    getOneMovie(id: string): string {
        return `gets movie by id ${id}`;
    }

    getMovieDirectors(id: string): string {
        return `gets movie id ${id} directors list`;
    }

    createMovie(movie: CreateMovieDto): string {
        return `creates movie: name ${movie.name} age ${movie.date} email ${movie.genre}`;
    }

    addMovieDirectors(movie: CreateMovieDto): string {
        return `adds directors to movie: name ${movie.name} age ${movie.date} email ${movie.genre}`;
    }
    
    removeMovieDirectors(movie: CreateMovieDto): string {
        return `removes directors from movie: name ${movie.name} age ${movie.date} email ${movie.genre}`;
    }

    updateMovie(movie: CreateMovieDto): string {
        return `updates movie: name ${movie.name} age ${movie.date} email ${movie.genre}`;
    }
    
    deleteMovie(movie: CreateMovieDto): string {
        return `deletes movie: name ${movie.name} age ${movie.date} email ${movie.genre}`;
    }
}

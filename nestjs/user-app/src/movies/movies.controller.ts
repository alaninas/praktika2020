import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMovieDto } from './create-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Get()
    getAllMovies(): string {
        return this.moviesService.getAllMovies();
    }

    @Get(':id')
    getOneMovie(@Param('id') id: string): string {
        return this.moviesService.getOneMovie(id);
    }
    
    @Post()
    createMovie(@Body() movie: CreateMovieDto): string {
        return this.moviesService.createMovie(movie);
    }
}

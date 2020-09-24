import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
    
    @Get(':id/directors')
    getMovieDirectors(@Param('id') id: string): string {
        return this.moviesService.getMovieDirectors(id);
    }
    
    @Post()
    createMovie(@Body() movie: CreateMovieDto): string {
        return this.moviesService.createMovie(movie);
    }
    @Post('directors/add')
    addMovieDirectors(@Body() movie: CreateMovieDto): string {
        return this.moviesService.addMovieDirectors(movie);
    }
    @Post('directors/remove')
    removeMovieDirectors(@Body() movie: CreateMovieDto): string {
        return this.moviesService.removeMovieDirectors(movie);
    }

    @Put()
    updateMovie(@Body() movie: CreateMovieDto): string {
        return this.moviesService.updateMovie(movie);
    }

    @Delete()
    deleteMovie(@Body() movie: CreateMovieDto): string {
        return this.moviesService.deleteMovie(movie);
    }
}

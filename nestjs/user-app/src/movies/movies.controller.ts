import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { MoviesService } from './movies.service';
import { ParseObjectIdPipe } from './movies.pipe';
import { ObjectID } from 'mongodb';
import { Movie } from './schemas/movie.schema';
import mongoose from 'mongoose';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Get()
    async getAllMovies(): Promise<Movie[]> {
        return this.moviesService.getAllMovies();
    }
    
    @Get(':id')
    async getOneMovie(@Param('id', ParseObjectIdPipe) id: ObjectID): Promise<Movie> {
        return this.moviesService.getOneMovie(id);
    }

    @Get(':id/directors')
    async getUserDirectors(@Param('id', ParseObjectIdPipe) id: ObjectID): Promise<mongoose.Types.ObjectId[]> {
        return this.moviesService.getUserDirectors(id);
    }

    @Post()
    async createMovie(@Body() movie: CreateMovieDto): Promise<Movie> {
        return this.moviesService.createMovie(movie);
    }

    @Post('directors/add')
    // @Param('id')
    async addMovieDirectors(@Body('id', ParseObjectIdPipe) uid: ObjectID, @Body('director', ParseObjectIdPipe) fid: ObjectID): Promise<string> {
        return this.moviesService.addMovieDirectors(uid, fid);
    }

    @Post('directors/remove')
    async removeMovieDirectors(@Body('id', ParseObjectIdPipe) uid: ObjectID, @Body('director', ParseObjectIdPipe) fid: ObjectID): Promise<string> {
        return this.moviesService.removeMovieDirectors(uid, fid);
    }

    @Put()
    async updateMovie(@Body() movie: UpdateMovieDto): Promise<Movie> {
        return this.moviesService.updateMovie(movie);
    }

    @Delete()
    async deleteMovie(@Body('id', ParseObjectIdPipe) id: ObjectID): Promise<Movie> {
        return this.moviesService.deleteMovie(id);
    }
}

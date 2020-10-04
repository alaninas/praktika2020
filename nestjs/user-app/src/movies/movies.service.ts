import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { MoviesHelper } from './movies.helper';
import { Movie } from './schemas/movie.schema';
import { ObjectID } from 'mongodb';

@Injectable()
export class MoviesService {
    private movieModel: Model<Movie>;
    constructor(private readonly moviesHelper: MoviesHelper) {
        this.movieModel = moviesHelper.getMovieModel();
    }

    async getAllMovies(): Promise<Movie[]> {
        return await this.movieModel.find();
    }

    async getOneMovie(id: ObjectID): Promise<Movie> {
        return await this.movieModel.findById(id).exec();
    }

    async getUserDirectors(id: ObjectID): Promise<mongoose.Types.ObjectId[]> {
        return await this.moviesHelper.getDirectorsDetails(id);
    }

    async createMovie(movie: CreateMovieDto): Promise<Movie> {
        const {title, genre, date, poster} = movie;
        if (await this.movieModel.findOne({title: title})) throw new HttpException(`Movie title already in use #${movie.title}`, HttpStatus.BAD_REQUEST);
        // return await (new this.movieModel(movie)).save();
        return await this.movieModel.create({
            title, genre, date, poster
        });
    }

    async addMovieDirectors(mid: ObjectID, did: ObjectID): Promise<Record<string, unknown>> {
        try {
            await this.moviesHelper.updateDirectors(mid, did, '');
            return {data: `Added user #${did} to movie #${mid} directors`};
        } catch (error) {
            throw new HttpException(`Can not add director: movie #${mid}, director #${did}`, HttpStatus.BAD_REQUEST);
        }
    }

    async removeMovieDirectors(mid: ObjectID, did: ObjectID): Promise<Record<string, unknown>> {
        try {
            await this.moviesHelper.updateDirectors(mid, did, 'delete');
            return {data: `Removed user #${did} from movie #${mid} directors`};
        } catch (error) {
            throw new HttpException(`Can not remove director: movie #${mid}, director #${did}`, HttpStatus.BAD_REQUEST);
        }
    }
    
    async updateMovie(movie: UpdateMovieDto): Promise<Movie> {
        const movieToUpdate = await this.movieModel.findOne({titile: movie.title});
        return await movieToUpdate.updateOne({genre: movie.genre, date: movie.date, poster: movie.poster});
    }
    
    async deleteMovie(id: ObjectID): Promise<Movie> {
        try {
            const users = await this.moviesHelper.purgeUsersRecords(id);
            const movieDeleted = await this.movieModel.findOneAndDelete({_id: id});
            Promise.all([users, movieDeleted]);
            return movieDeleted;
        } catch (error) {
            throw new HttpException(`Error: ${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }
}

import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MoviesHelper } from './movies.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from 'src/users/schemas/user.schema';
import { Movie, MovieSchema } from './schemas/movie.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }])
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesHelper]
})
export class MoviesModule {}

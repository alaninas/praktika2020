import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersHelper } from './users.helper';
import { Person, PersonSchema } from './schemas/user.schema';
import { Movie, MovieSchema } from '../movies/schemas/movie.schema';

@Module({
  imports: [
    // forwardRef(() => MoviesModule),
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }])
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersHelper]
})
export class UsersModule {}

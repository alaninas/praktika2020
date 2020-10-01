import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersHelper } from './users.helper';
import { Person, PersonSchema } from './schemas/user.schema';
import { Movie, MovieSchema } from '../movies/schemas/movie.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }])
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersHelper],
  exports: [UsersService]
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // AuthModule,
    UsersModule, 
    MoviesModule, 
    MongooseModule.forRoot('mongodb://localhost:27017/users', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    UsersModule, 
    MoviesModule, 
    MongooseModule.forRoot(
      process.env.DB_URL, 
      {
        useNewUrlParser: JSON.parse(process.env.DB_USE_NEW_URL_PARSER), 
        useUnifiedTopology: JSON.parse(process.env.DB_USE_UNIFIED_TOPOLOGY), 
        useFindAndModify: JSON.parse(process.env.DB_USE_FIND_AND_MODIFY)
      }
    ),
    MulterModule.register({
      dest: `./${process.env.MULTER_OPTIONS_DESTINATION}`,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

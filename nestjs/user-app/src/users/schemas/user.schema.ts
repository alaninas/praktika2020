import { forwardRef, Inject } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Movie } from 'src/movies/schemas/movie.schema';

@Schema()
export class Person extends Document {
  // constructor(
    // @Inject(forwardRef(() => Movie))
    // private movie: Movie,
  // ) {
    // super();
  // }
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  age: number;

  @Prop()
  email: string;

  @Prop({ ref: Person })
  friends: mongoose.Types.ObjectId[];

  @Prop({ ref: async ()=> (await import('../../movies/schemas/movie.schema')).Movie })
  movies: mongoose.Types.ObjectId[];
}

export const PersonSchema = SchemaFactory.createForClass(Person)
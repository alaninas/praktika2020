import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Person } from '../../users/schemas/user.schema';

@Schema()
export class Movie extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  genre: string;

  @Prop()
  date: string;

  @Prop()
  poster: string;

  @Prop({ ref: Person })
  directors: mongoose.Types.ObjectId[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie)

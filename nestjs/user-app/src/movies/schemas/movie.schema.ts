import { forwardRef, Inject } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Person } from 'src/users/schemas/user.schema';

@Schema()
export class Movie extends Document {
  // constructor(
    // @Inject(forwardRef(() => Person))
    // private person: Person,
  // ) {
    // super();
  // }
  @Prop({ required: true })
  title: string;

  @Prop()
  genre: string;

  @Prop()
  date: string;

  @Prop()
  poster: string;

  // Use dynamic imports:
  // https://github.com/typegoose/typegoose/issues/93
  // @prop({ ref: async ()=> (await import('./group.model')).Group })
  @Prop({ ref: async ()=> (await import('../../users/schemas/user.schema')).Person })
  directors: mongoose.Types.ObjectId[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie)

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Movie extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  genre?: string;

  @Prop()
  date?: string;

  @Prop()
  poster?: string;

  // Use dynamic imports:
  // https://github.com/typegoose/typegoose/issues/93
  // @prop({ ref: async ()=> (await import('./group.model')).Group })
  @Prop()
  directors?: mongoose.Types.ObjectId[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie)

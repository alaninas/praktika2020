import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Person extends Document {
  // TODO: remove deprecated
  @Prop()
  name?: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  age?: number;

  @Prop({ required: true })
  email: string;

  @Prop()
  fullname?: string;

  @Prop()
  city?: string;

  @Prop()
  address?: string;

  @Prop({ ref: Person })
  friends?: mongoose.Types.ObjectId[];

  @Prop()
  movies?: mongoose.Types.ObjectId[];
}

export const PersonSchema = SchemaFactory.createForClass(Person)
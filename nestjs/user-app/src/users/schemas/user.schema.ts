import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Person extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop()
  email: string;

  @Prop()
  friends: mongoose.Types.ObjectId[];
}

export const PersonSchema = SchemaFactory.createForClass(Person)
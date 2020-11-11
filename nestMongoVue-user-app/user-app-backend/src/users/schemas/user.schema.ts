import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Person extends Document {
  @Prop()
  password?: string;

  @Prop()
  passwordConfirm?: string;

  @Prop()
  email?: string;

  @Prop()
  address?: string;

  @Prop()
  age?: number;

  @Prop()
  city?: string;

  @Prop()
  country?: string;

  @Prop()
  firstname?: string;   

  @Prop()
  fullname?: string;  
  
  @Prop()
  houseNumber?: number;​

  @Prop()
  images?: string[];

  @Prop()
  lastname?: string;

  @Prop()
  street?: string;

  @Prop()
  zipCode?: number;​

  @Prop()
  friends?: mongoose.Types.ObjectId[];

  @Prop()
  movies?: mongoose.Types.ObjectId[];
}

export const PersonSchema = SchemaFactory.createForClass(Person)
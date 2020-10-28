import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Person extends Document {
  @Prop({ required: true })
  password?: string;

  @Prop({ required: true })
  passwordConfirm?: string;

  @Prop({ required: true })
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
  lastname?: string

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
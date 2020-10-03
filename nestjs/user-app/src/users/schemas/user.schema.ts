import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Person extends Document {
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

  // Probably 'ref' not neede at all, seein as that mongoose.populate() not working properly
  @Prop({ ref: async ()=> (await import('../../movies/schemas/movie.schema')).Movie })
  movies: mongoose.Types.ObjectId[];
}

export const PersonSchema = SchemaFactory.createForClass(Person)
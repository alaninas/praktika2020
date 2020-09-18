import mongoose, { Document, model, Schema } from 'mongoose';

interface IMovie extends Document {
    name: string,
    password: string,
    age?: number,
    height?: number,
    address?: string,
    email?: string,
    directors?: mongoose.Types.ObjectId[]
};

export default IMovie;
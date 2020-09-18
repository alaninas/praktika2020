import mongoose, { Document, model, Schema } from 'mongoose';

interface IPerson extends Document {
    name: string,
    password: string,
    age?: number,
    height?: number,
    address?: string,
    email?: string,
    friends?: mongoose.Types.ObjectId[]
};

export default IPerson;
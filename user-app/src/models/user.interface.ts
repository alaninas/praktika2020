import { Document, model, Schema } from 'mongoose';

interface IPerson extends Document {
    name: string,
    password: string,
    age?: number,
    height?: number,
    physAddress?: string,
    friends?: string[]
};

export default IPerson;
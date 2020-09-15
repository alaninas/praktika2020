import { Document, model, Schema } from 'mongoose';

interface IPerson extends Document {
    name: string,
    age?: number,
    height?: number,
    password?: string,
    physAddress?: string,
    friends?: [string]
};

export default IPerson;
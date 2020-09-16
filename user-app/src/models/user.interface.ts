import { Document, model, Schema } from 'mongoose';

interface IPerson extends Document {
    name: string,
    password: string,
    age?: number,
    height?: number,
    address?: string,
    email?: string,
    friends?: string[]
};

export default IPerson;
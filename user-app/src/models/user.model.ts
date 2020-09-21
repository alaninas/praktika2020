import mongoose, { Document, model, Schema } from 'mongoose';

export interface IPerson extends Document {
    name: string,
    password: string,
    age?: number,
    height?: number,
    address?: string,
    email?: string,
    friends?: mongoose.Types.ObjectId[]
};

const PersonSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, min: 18, max: 65 },
    height: { type: Number, min: 1, max: 265 },
    address: String,
    email: String,
    friends: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const UserModel = model<IPerson>('Person', PersonSchema);

export default UserModel;
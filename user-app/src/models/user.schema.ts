import mongoose, { Document, model, Schema } from 'mongoose';
import IPerson from '../models/user.interface';

const PersonSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, min: 18, max: 65 },
    height: { type: Number, min: 1, max: 265 },
    address: String,
    email: String,
    friends: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

export const UserModel = model<IPerson>('Person', PersonSchema);

// export interface INewPerson {
    // name: string;
// }

export default PersonSchema;
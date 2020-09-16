import { Document, model, Schema } from 'mongoose';

const PersonSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, min: 18, max: 65 },
    height: { type: Number, min: 1, max: 265 },
    address: String,
    email: String,
    friends: [String]
});

// export interface INewPerson {
    // name: string;
// }

export default PersonSchema;
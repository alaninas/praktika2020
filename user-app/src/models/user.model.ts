import { Document, model, Schema } from 'mongoose';

const PersonSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, min: 18, max: 65 },
    height: { type: Number, min: 1, max: 265 },
    password: String,
    physAddress: String,
    friends: [String]
});

interface IPerson extends Document {
    name: string,
    age?: number,
    height?: number,
    password?: string,
    physAddress?: string,
    friends?: [string]
};

const UserModel = model<IPerson>('Person', PersonSchema);
// const UserModel = model('Person', PersonSchema);

export default UserModel;
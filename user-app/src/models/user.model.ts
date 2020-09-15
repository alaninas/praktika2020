import { Document, model, Schema } from 'mongoose';

const PersonSchema = new Schema({
    name: {
        required: true,
        type: String
    }
});

interface IPerson extends Document {
    name: string;
};

const UserModel = model<IPerson>('Person', PersonSchema);

export default UserModel;
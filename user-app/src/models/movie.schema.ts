import mongoose, { Document, model, Schema } from 'mongoose';

const MovieSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, min: 18, max: 65 },
    height: { type: Number, min: 1, max: 265 },
    address: String,
    email: String,
    directors: [{ type: Schema.Types.ObjectId }]
});

export default MovieSchema;
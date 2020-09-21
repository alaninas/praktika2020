import mongoose, { Document, model, Schema } from 'mongoose';

export interface IMovie extends Document {
    title: string,
    year?: number,
    poster?: string,
    directors?: mongoose.Types.ObjectId[]
};

const MovieSchema = new Schema({
    title: { type: String, required: true },
    year: { type: Number, min: 1000, max: 2500 },
    poster: String,
    directors: [{ type: Schema.Types.ObjectId }]
});

const MovieModel = model<IMovie>('Movie', MovieSchema);

export default MovieModel;
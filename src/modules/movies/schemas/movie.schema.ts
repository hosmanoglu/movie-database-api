import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const MovieSchema = new Schema({
  id: { type: String, default: uuidv4, unique: true },
  imdbId: { type: String, required: true, unique: true },
  name: String,
  overview: String,
  popularity: Number,
  voteAverage: Number,
  voteCount: Number,
  releaseDate: String,
  genres: [{ id: Number, name: String, _id: false }],
});

export { MovieSchema };

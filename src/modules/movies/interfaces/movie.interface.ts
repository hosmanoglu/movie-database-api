import { Document } from 'mongoose';

export interface Genre {
  id: number;
  name: string;
}

export interface Movie extends Document {
  id: string;
  imdbId: String;
  name: string;
  overview: string;
  popularity: number;
  voteAverage: number;
  voteCount: number;
  releaseDate: string;
  genres: Genre[];
}

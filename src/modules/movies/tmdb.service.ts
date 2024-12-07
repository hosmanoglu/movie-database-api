import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { tmdbConfig } from '../../config/tmdb.config.ts';

@Injectable()
export class TMDBService {
  private readonly apiKey = tmdbConfig.TMDB_API_KEY;
  private readonly tmdbUri = tmdbConfig.TMDB_URI;

  async fetchMovies(): Promise<any> {
    const response = await axios.get(`${this.tmdbUri}/3/discover/movie`, {
      params: {
        api_key: this.apiKey,
        sort_by: 'release_date.asc',
        vote_count_gte: 1500,
        vote_average_gte: 8.4,
        with_watch_providers: 8,
        watch_region: 'TR',
      },
    });
    return response.data.results;
  }

  async fetchMovieDetails(movieId: number): Promise<any> {
    const response = await axios.get(`${this.tmdbUri}/3/movie/${movieId}`, {
      params: {
        api_key: this.apiKey,
      },
    });
    return response.data;
  }
}

import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './interfaces/movie.interface';
import { CreateMovieDto } from './dto/create-movie.dto';
import { TMDBService } from './tmdb.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
    private readonly tmdbService: TMDBService
  ) {}

  async fetchAndSaveMovies(): Promise<void> {
    try {
      const movies = await this.tmdbService.fetchMovies();
      await Promise.all(
        movies.map(async (movie) => {
          const details = await this.tmdbService.fetchMovieDetails(movie.id);
          const createMovieDto: CreateMovieDto = {
            id: uuidv4(),
            imdbId: details.imdb_id,
            name: details.title,
            overview: details.overview,
            popularity: details.popularity,
            voteAverage: details.vote_average,
            voteCount: details.vote_count,
            releaseDate: details.release_date,
            genres: details.genres.map((genre) => ({
              id: genre.id,
              name: genre.name,
            })),
          };
          try {
            await this.create(createMovieDto);
          } catch (error: any) {}
        })
      );
    } catch (error) {
      console.error(error);
    }
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    try {
      const createdMovie = new this.movieModel(createMovieDto);
      return await createdMovie.save();
    } catch (error: any) {
      if (error?.code === 11000) {
        // Mongoose unique index error code
        throw new ConflictException(`Movie with  ${JSON.stringify(error.keyValue)}  already exists.`);
      } else {
        console.error(error);
        throw error;
      }
    }
  }

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async findById(id: string): Promise<Movie> {
    const movie = await this.movieModel.findOne({ id }).exec();
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  async update(id: string, updateData: CreateMovieDto): Promise<Movie> {
    const movie = await this.movieModel.findOneAndUpdate({ id }, updateData, { new: true }).exec();
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  async delete(id: string): Promise<any> {
    const movie = await this.movieModel.findOneAndDelete({ id }).exec();
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }
}

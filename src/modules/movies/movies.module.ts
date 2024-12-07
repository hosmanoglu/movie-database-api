import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './schemas/movie.schema';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { MoviesController } from './movies.controller';
import { TMDBService } from './tmdb.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema, collection: 'netflix.movies' }])],
  providers: [MoviesService, MoviesResolver, TMDBService],
  controllers: [MoviesController],
})
export class MoviesModule {}

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { Movie } from './models/movie.model';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('movies')
@Resolver((of) => Movie)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Query((returns) => [Movie])
  @ApiOperation({ summary: 'Get all movies' })
  async movies() {
    return this.moviesService.findAll();
  }

  @Mutation((returns) => Movie)
  @ApiOperation({ summary: 'Create a movie' })
  @ApiResponse({
    status: 201,
    description: 'The movie has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createMovie(@Args('createMovieDto') createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }
}

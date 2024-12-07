import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './interfaces/movie.interface';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a movie' })
  @ApiResponse({
    status: 201,
    description: 'The movie has been successfully created.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict: Movie with this ID already exists.',
  })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto);
  }

  @Post('fetch')
  @ApiOperation({ summary: 'Fetch and save movies from TMDB' })
  async fetchAndSave(): Promise<void> {
    await this.moviesService.fetchAndSaveMovies();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the movie to retrieve',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: Movie with this ID not found.',
  })
  @ApiOperation({ summary: 'Get a movie by ID' })
  findById(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all movies' })
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the movie to update',
  })
  @ApiOperation({ summary: 'Update a movie by ID' })
  @ApiResponse({
    status: 200,
    description: 'The movie has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: Movie with this ID not found.',
  })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateById(@Param('id') id: string, @Body() updateMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the movie to delete',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: Movie with this ID not found.',
  })
  @ApiOperation({ summary: 'Delete a movie by ID' })
  deleteById(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.delete(id);
  }
}

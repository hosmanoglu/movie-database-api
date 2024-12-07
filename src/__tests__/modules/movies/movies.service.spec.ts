import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from '../../../modules//movies//movies.service';
import { getModelToken } from '@nestjs/mongoose';
import { Movie } from '../../../modules/movies/interfaces/movie.interface';
import { TMDBService } from '../../../modules/movies/tmdb.service';
import { Model } from 'mongoose';
import { ConflictException, NotFoundException } from '@nestjs/common';

const mockMovie = {
  id: 'f748adf9-5d7b-4481-95bd-18748db91bc4',
  imdbId: '3',
  name: 'Test Movie',
  overview: 'Test overview',
  popularity: 100,
  voteAverage: 9.0,
  voteCount: 1000,
  releaseDate: '2022-01-01',
  genres: [{ id: 1, name: 'Drama' }],
};
const mockTMDBService = {
  fetchMovies: jest.fn().mockResolvedValue([mockMovie]),
  fetchMovieDetails: jest.fn().mockResolvedValue(mockMovie),
};

const exec = jest.fn();
class MockMovieModel {
  constructor(private data) {}
  static find = jest.fn().mockImplementation(() => {
    return { exec: () => [mockMovie] };
  });
  static findOne = jest.fn().mockReturnValue({ exec });
  static create = jest.fn();
  static findOneAndUpdate = jest.fn().mockReturnValue({ exec });
  static findOneAndDelete = jest.fn().mockReturnValue({ exec });
  save = jest.fn().mockImplementation(() => {
    if (this.data.id === 'f748adf9-5d7b-4481-95bd-alreadyExist') {
      return Promise.reject({ code: 11000 });
    }
    return Promise.resolve(this.data);
  });
}

describe('MoviesService', () => {
  let service: MoviesService;
  let model: Model<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: TMDBService, useValue: mockTMDBService },
        {
          provide: getModelToken('Movie'),
          useValue: MockMovieModel,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    model = module.get<Model<Movie>>(getModelToken('Movie'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', async () => {
      const createMovieDto = { ...mockMovie };

      const result = await service.create(createMovieDto);
      expect(result).toEqual(mockMovie);
    });

    it('should throw a ConflictException if movie already exists', async () => {
      const createMovieDto = { ...mockMovie, id: 'f748adf9-5d7b-4481-95bd-alreadyExist' };

      const result = service.create(createMovieDto);
      expect(result).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockMovie]);
    });
  });
  describe('findById', () => {
    it('should return a movie', async () => {
      exec.mockResolvedValueOnce(mockMovie);
      const result = await service.findById('1');
      expect(result).toEqual(mockMovie);
    });
    it('should throw a NotFoundException if not found', async () => {
      exec.mockResolvedValueOnce(null);
      await expect(service.findById('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a movie', async () => {
      const updatedMovie = { ...mockMovie, name: 'Updated Movie' };
      exec.mockResolvedValueOnce(updatedMovie);
      const result = await service.update('1', updatedMovie as any);
      expect(result).toEqual(updatedMovie);
    });
    it('should throw a NotFoundException if not found', async () => {
      exec.mockResolvedValueOnce(null);
      await expect(service.update('2', {} as any)).rejects.toThrowError(NotFoundException);
    });
  });
  describe('delete', () => {
    it('should delete a movie', async () => {
      exec.mockResolvedValueOnce(mockMovie);
      const result = await service.delete('1');
      expect(result).toEqual(mockMovie);
    });
    it('should throw a NotFoundException if not found', async () => {
      exec.mockResolvedValueOnce(null);
      await expect(service.delete('2')).rejects.toThrowError(NotFoundException);
    });
  });

  describe('fetchAndSaveMovieData', () => {
    it('should fetch movie data from TMDB and save it to the database', async () => {
      await service.fetchAndSaveMovies();
      expect(mockTMDBService.fetchMovies).toHaveBeenCalledTimes(1);
      expect(mockTMDBService.fetchMovieDetails).toHaveBeenCalledTimes(1);
    });
  });
});

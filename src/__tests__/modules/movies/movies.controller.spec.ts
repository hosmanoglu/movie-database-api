import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from '../../../modules/movies/movies.controller';
import { MoviesService } from '../../../modules/movies/movies.service';
import { CreateMovieDto } from '../../../modules/movies/dto/create-movie.dto';

const mockMovie = {
  id: '1',
  imdbId: '2',
  name: 'Test Movie',
  overview: 'Test overview',
  popularity: 100,
  voteAverage: 9.0,
  voteCount: 1000,
  releaseDate: '2022-01-01',
  genres: [{ id: 1, name: 'Drama' }],
};

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockMovie),
            findAll: jest.fn().mockResolvedValue([mockMovie]),
            findById: jest.fn().mockResolvedValue(mockMovie),
            update: jest.fn().mockResolvedValue(mockMovie),
            delete: jest.fn().mockResolvedValue(mockMovie),
          },
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', async () => {
      const createMovieDto: CreateMovieDto = { ...mockMovie };
      const result = await controller.create(createMovieDto);
      expect(result).toEqual(mockMovie);
    });
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockMovie]);
    });
  });

  describe('findById', () => {
    it('should return a movie', async () => {
      const result = await controller.findById('1');
      expect(result).toEqual(mockMovie);
    });
  });

  describe('update', () => {
    it('should update a movie', async () => {
      const updatedMovie = { ...mockMovie, name: 'Updated Movie' };
      const result = await controller.updateById('1', updatedMovie as any);
      expect(result).toEqual(mockMovie);
    });
  });

  describe('delete', () => {
    it('should delete a movie', async () => {
      const result = await controller.deleteById('1');
      expect(result).toEqual(mockMovie);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService]
    }).compile();
    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllMovies', () => {
    const response = 'gets all movies';
    it('should get all movies', async () => {
      jest.spyOn(service, 'getAllMovies').mockImplementation(() => response);
      expect(controller.getAllMovies()).toBe(response);
    });
  });

  describe('getOneMovie', () => {
    const param = 'myid';
    const response = 'gets movie by id myid';
    it('should get one movie', async () => {
      jest.spyOn(service, 'getOneMovie').mockImplementation(() => response);
      expect(controller.getOneMovie(param)).toBe(response);
    });
  });

  describe('createMovie', () => {
    const movie = {name: 'mtitle', date: new Date('05 October 2011 14:48 UTC'), genre: 'western'};
    const response = `creates movie: name ${movie.name} date ${movie.date} genre ${movie.genre}`;
    it('should get one movie', async () => {
      jest.spyOn(service, 'createMovie').mockImplementation(() => response);
      expect(controller.createMovie(movie)).toBe(response);
    });
  });
});

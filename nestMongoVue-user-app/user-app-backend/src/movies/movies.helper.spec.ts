import { Test, TestingModule } from '@nestjs/testing';
import { MoviesHelper } from './movies.helper';

describe('MoviesHelper', () => {
  let provider: MoviesHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesHelper],
    }).compile();

    provider = module.get<MoviesHelper>(MoviesHelper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

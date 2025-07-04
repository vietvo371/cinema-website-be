import { Test, TestingModule } from '@nestjs/testing';
import { GenreService } from './genre.service';
import { CacheService } from 'src/common/cache/cache.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('GenreService', () => {
  let service: GenreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenreService, CacheService, PrismaService],
    }).compile();

    service = module.get<GenreService>(GenreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { CacheService } from 'src/common/cache/cache.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('GenreController', () => {
  let controller: GenreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenreController],
      providers: [GenreService, CacheService, PrismaService],
    }).compile();

    controller = module.get<GenreController>(GenreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

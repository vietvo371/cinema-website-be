import { Test, TestingModule } from '@nestjs/testing';
import { TheaterService } from './theater.service';
import { CacheService } from 'src/common/cache/cache.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('TheaterService', () => {
  let service: TheaterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TheaterService, CacheService, PrismaService],
    }).compile();

    service = module.get<TheaterService>(TheaterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

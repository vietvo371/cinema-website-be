import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { CacheModule } from 'src/common/cache/cache.module';

@Module({
  imports: [PrismaModule, CacheModule],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}

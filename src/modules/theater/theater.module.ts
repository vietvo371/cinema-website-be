import { Module } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { TheaterController } from './theater.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CacheModule } from 'src/common/cache/cache.module';

@Module({
  imports: [PrismaModule, CacheModule],
  controllers: [TheaterController],
  providers: [TheaterService],
  exports: [TheaterService],
})
export class TheaterModule {}

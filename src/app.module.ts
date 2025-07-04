import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import configuration from './config/configuration';
import { MoviesModule } from './modules/movies/movies.module';
import { CacheModule } from './common/cache/cache.module';
import { GenreModule } from './modules/genre/genre.module';
import { TheaterModule } from './modules/theater/theater.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    MoviesModule,
    CacheModule,
    GenreModule,
    TheaterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

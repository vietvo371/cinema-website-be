import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheService } from 'src/common/cache/cache.service';
import { FilterOptionsDto } from 'src/common/dto/filter-options.dto';

@Injectable()
export class MoviesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    const slug_title = createMovieDto.title.toLowerCase().replace(/ /g, '-');
    createMovieDto.slug_title = slug_title;
    const movie = this.prisma.movie.create({
      data: createMovieDto,
    });
    // Invalidate cache after creating new movie
    this.cacheService.del('movies:all');
    return movie;
  }

  async findAll(filterOptions: FilterOptionsDto = {}) {
    const {
      search,
      genre,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
      startDate,
      endDate,
    } = filterOptions;

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (search) {
      where.title = {
        contains: search,
        mode: 'insensitive'
      };
    }

    if (genre) {
      where.genres = {
        some: {
          genre: {
            name: genre,
          },
        },
      };
    }

    if (startDate || endDate) {
      where.releaseDate = {};
      if (startDate) {
        where.releaseDate.gte = new Date(startDate);
      }
      if (endDate) {
        where.releaseDate.lte = new Date(endDate);
      }
    }

    // Build orderBy clause
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Get total count for pagination
    const total = await this.prisma.movie.count({ where });

    // Get movies with pagination and filters
    const movies = await this.prisma.movie.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
      },
    });

    return {
      data: movies,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    // Try to get from cache first
    const cachedMovie = await this.cacheService.get(`movie:${id}`);
    if (cachedMovie) {
      return cachedMovie;
    }

    // If not in cache, get from database
    const movie = await this.prisma.movie.findUnique({
      where: { id },
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
      },
    });

    if (movie) {
      // Store in cache
      await this.cacheService.set(`movie:${id}`, movie);
    }
    
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.prisma.movie.update({
      where: { id },
      data: updateMovieDto,
    });
    // Invalidate cache after updating movie
    await this.cacheService.del(`movie:${id}`);
    await this.cacheService.del('movies:all');
    return movie;
  }

  async remove(id: number) {
    const movie = await this.prisma.movie.delete({
      where: { id },
    });
    // Invalidate cache after deleting movie
    await this.cacheService.del(`movie:${id}`);
    await this.cacheService.del('movies:all');
    return movie;
  }
}

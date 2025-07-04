import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from 'src/common/cache/cache.service';

@Injectable()
export class GenreService {
  constructor(
    private prisma: PrismaService,
    private cacheService: CacheService,
  ) {}
  async create(createGenreDto: CreateGenreDto) {
    const genre = await this.prisma.genre.findUnique({
      where: { name: createGenreDto.name },
    });
    if (genre) {
      throw new BadRequestException('Tên thể loại đã tồn tại');
    }
    const newGenre = await this.prisma.genre.create({
      data: createGenreDto,
    });
    await this.cacheService.del('genres:all');
    return newGenre;
  }

  async findAll() {
    const cachedGenres = await this.cacheService.get('genres:all');
    if (cachedGenres) {
      return cachedGenres;
    }
    const genres = await this.prisma.genre.findMany();
    await this.cacheService.set('genres:all', genres);
    return genres;
  }

  async findOne(id: number) {
    const cachedGenre = await this.cacheService.get(`genre:${id}`);
    if (cachedGenre) {
      return cachedGenre;
    }
    const genre = await this.prisma.genre.findUnique({
      where: { id },
    });
    await this.cacheService.set(`genre:${id}`, genre);
    return genre;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    const genre = await this.prisma.genre.findUnique({
      where: { id },
    });
    if (!genre) {
      throw new NotFoundException('Thể loại không tồn tại');
    }
    const updatedGenre = await this.prisma.genre.update({
      where: { id },
      data: updateGenreDto,
    });
    await this.cacheService.del('genres:all');
    return updatedGenre;
  }

  async remove(id: number) {
    const genre = await this.prisma.genre.delete({
      where: { id },
    });
    await this.cacheService.del('genres:all');
    return genre;
  }
}

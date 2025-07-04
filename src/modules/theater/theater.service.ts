import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheService } from 'src/common/cache/cache.service';

@Injectable()
export class TheaterService {
  constructor(
    private prisma: PrismaService,
    private cacheService: CacheService,
  ) {}
  async create(createTheaterDto: CreateTheaterDto) {
    const theater = await this.prisma.theater.findFirst({
      where: {
        name: createTheaterDto.name,
        location: createTheaterDto.location,
      },
    });
    if (theater) {
      throw new BadRequestException('Rạp đã tồn tại');
    }
    const newTheater = await this.prisma.theater.create({
      data: createTheaterDto,
    });
    await this.cacheService.del('theaters:all');
    return newTheater;
  }

  async findAll() {
    const theaters = await this.cacheService.get('theaters:all');
    if (theaters) {
      return theaters;
    }
    const newTheaters = await this.prisma.theater.findMany();
    await this.cacheService.set('theaters:all', newTheaters);
    return newTheaters;
  }

  async findOne(id: number) {
    const theater = await this.cacheService.get(`theater:${id}`);
    if (theater) {
      return theater;
    }
    const newTheater = await this.prisma.theater.findUnique({
      where: { id },
    });
    if (!newTheater) {
      throw new NotFoundException('Rạp không tồn tại');
    }
    await this.cacheService.set(`theater:${id}`, newTheater);
    return newTheater;
  }

  async update(id: number, updateTheaterDto: UpdateTheaterDto) {
    const theater = await this.prisma.theater.findUnique({
      where: { id },
    });
    if (!theater) {
      throw new NotFoundException('Rạp không tồn tại');
    }
    const updatedTheater = await this.prisma.theater.update({
      where: { id },
      data: updateTheaterDto,
    });
    await this.cacheService.del(`theater:${id}`);
    return updatedTheater;
  }

  async remove(id: number) {
    const theater = await this.prisma.theater.findUnique({
      where: { id },
    });
    if (!theater) {
      throw new NotFoundException('Rạp không tồn tại');
    }
    await this.prisma.theater.delete({ where: { id } });
    await this.cacheService.del(`theater:${id}`);
    return theater;
  }
}

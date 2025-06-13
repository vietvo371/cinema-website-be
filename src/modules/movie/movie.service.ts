import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  create(createMovieDto: CreateMovieDto) {
    return this.prisma.movie.create({
      data: createMovieDto,
    });
  }

  findAll() {
    return this.prisma.movie.findMany();
  }

  findOne(id: bigint) {
    return this.prisma.movie.findUnique({
      where: { id },
    });
  }

  update(id: bigint, updateMovieDto: UpdateMovieDto) {
    return this.prisma.movie.update({
      where: { id },
      data: updateMovieDto,
    });
  }

  remove(id: bigint) {
    return this.prisma.movie.delete({
      where: { id },
    });
  }
} 
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilterOptionsDto } from 'src/common/dto/filter-options.dto';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo phim mới' })
  @ApiResponse({ status: 201, description: 'Phim đã được tạo thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách phim' })
  @ApiResponse({ status: 200, description: 'Danh sách phim' })
  findAll(@Query() filterOptions: FilterOptionsDto) {
    return this.moviesService.findAll(filterOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin phim' })
  @ApiResponse({ status: 200, description: 'Thông tin phim' })
  @ApiResponse({ status: 404, description: 'Phim không tồn tại' })
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin phim' })
  @ApiResponse({ status: 200, description: 'Phim đã được cập nhật thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Phim không tồn tại' })
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa phim' })
  @ApiResponse({ status: 200, description: 'Phim đã được xóa thành công' })
  @ApiResponse({ status: 404, description: 'Phim không tồn tại' })
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}

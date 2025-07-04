import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiOperation, ApiResponse, ApiTags  } from '@nestjs/swagger';

@ApiTags('genre')
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo thể loại mới' })
  @ApiResponse({ status: 201, description: 'Thể loại đã được tạo thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  @ApiResponse({ status: 409, description: 'Tên thể loại đã tồn tại' })
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách thể loại' })
  @ApiResponse({ status: 200, description: 'Danh sách thể loại' })
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin thể loại' })
  @ApiResponse({ status: 200, description: 'Thông tin thể loại' })
  @ApiResponse({ status: 404, description: 'Thể loại không tồn tại' })
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin thể loại' })
  @ApiResponse({ status: 200, description: 'Thể loại đã được cập nhật thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Thể loại không tồn tại' })
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(+id, updateGenreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa thể loại' })
  @ApiResponse({ status: 200, description: 'Thể loại đã được xóa thành công' })
  @ApiResponse({ status: 404, description: 'Thể loại không tồn tại' })
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}

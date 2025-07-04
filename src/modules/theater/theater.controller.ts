import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('theater')
@ApiTags('Theater')
export class TheaterController {
  constructor(private readonly theaterService: TheaterService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo rạp' })
  @ApiResponse({ status: 201, description: 'Rạp đã được tạo thành công' })
  @ApiResponse({ status: 400, description: 'Rạp đã tồn tại' })
  create(@Body() createTheaterDto: CreateTheaterDto) {
    return this.theaterService.create(createTheaterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả rạp' })
  @ApiResponse({ status: 200, description: 'Lấy tất cả rạp thành công' })
  findAll() {
    return this.theaterService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy rạp theo id' })
  @ApiResponse({ status: 200, description: 'Lấy rạp theo id thành công' })
  @ApiResponse({ status: 404, description: 'Rạp không tồn tại' })
  findOne(@Param('id') id: string) {
    return this.theaterService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật rạp' })
  @ApiResponse({ status: 200, description: 'Cập nhật rạp thành công' })
  @ApiResponse({ status: 404, description: 'Rạp không tồn tại' })
  update(@Param('id') id: string, @Body() updateTheaterDto: UpdateTheaterDto) {
    return this.theaterService.update(+id, updateTheaterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa rạp' })
  @ApiResponse({ status: 200, description: 'Xóa rạp thành công' })
  @ApiResponse({ status: 404, description: 'Rạp không tồn tại' })
  remove(@Param('id') id: string) {
    return this.theaterService.remove(+id);
  }
}

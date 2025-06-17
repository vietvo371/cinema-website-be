import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterOptionsDto {
  @ApiPropertyOptional({ description: 'Tên phim' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Thể loại phim' })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiPropertyOptional({ description: 'Trạng thái phim' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'Trường sắp xếp' })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({ description: 'Thứ tự sắp xếp', enum: ['asc', 'desc'] })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  @ApiPropertyOptional({ description: 'Số trang', minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ description: 'Số lượng phim trên trang', minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({ description: 'Ngày bắt đầu' })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiPropertyOptional({ description: 'Ngày kết thúc' })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiPropertyOptional({ description: 'ID rạp' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  theaterId?: number;

  @ApiPropertyOptional({ description: 'ID phòng' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  roomId?: number;

  @ApiPropertyOptional({ description: 'ID phim' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  movieId?: number;

  @ApiPropertyOptional({ description: 'ID người dùng' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  userId?: number;
} 
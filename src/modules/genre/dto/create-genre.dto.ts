import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenreDto {
    @ApiProperty({ description: 'Tên thể loại', example: 'Hành động' })
    @IsString({ message: 'Tên thể loại phải là một chuỗi' })
    @IsNotEmpty({ message: 'Tên thể loại không được để trống' })
    name: string;
}

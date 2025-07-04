import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTheaterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Tên rạp', example: 'Rạp 1' })
  name: string;

  @IsString()   
  @IsNotEmpty()
  @ApiProperty({ description: 'Vị trí rạp', example: 'Hà Nội' })
  location: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Địa chỉ rạp', example: '123 Đường ABC, Quận XYZ' })
  address: string;
}

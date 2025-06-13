import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email của người dùng' })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @ApiProperty({ example: 'Password123!', description: 'Mật khẩu của người dùng' })
  @IsString({ message: 'Mật khẩu phải là một chuỗi' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @ApiProperty({ example: 'Nguyễn Văn A', description: 'Họ tên đầy đủ' })
  @IsString({ message: 'Tên người dùng phải là một chuỗi' })
  @IsNotEmpty({ message: 'Tên người dùng không được để trống' })
  fullName: string;

  @ApiProperty({ example: '0707070707', description: 'Số điện thoại', required: false })
  @IsOptional()
  @IsPhoneNumber('VN', { message: 'Số điện thoại không đúng định dạng' })
  phone?: string;

  @ApiProperty({ example: '123 Đường ABC, Quận XYZ, TP. HCM', description: 'Địa chỉ của người dùng', required: false })
  @IsOptional()
  @IsString({ message: 'Địa chỉ phải là một chuỗi' })
  address?: string;
} 
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";

export class CreateUserDto {
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsString({ message: 'Mật khẩu phải là một chuỗi' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6)
  password: string;

  @IsString({ message: 'Tên người dùng phải là một chuỗi' })
  @IsNotEmpty({ message: 'Tên người dùng không được để trống' })
  fullName: string;

  @IsString({ message: 'Số điện thoại phải là một chuỗi' })
  @IsPhoneNumber('VN', { message: 'Số điện thoại không đúng định dạng' })
  @IsOptional()
  phoneNumber?: string;

  @IsString({ message: 'Địa chỉ phải là một chuỗi' })
  @IsOptional()
  address?: string;

  @ApiProperty({ enum: UserRole, default: UserRole.USER })
  @IsEnum(UserRole, { message: 'Vai trò không hợp lệ' })
  @IsOptional()
  role?: UserRole = UserRole.USER;
}

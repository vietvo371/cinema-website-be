import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, ValidateIf } from 'class-validator';

export class RegisterUserDto {
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsString({ message: 'Mật khẩu phải là một chuỗi' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;

  @IsString({ message: 'Mật khẩu xác nhận phải là một chuỗi' })
  @IsNotEmpty({ message: 'Mật khẩu xác nhận không được để trống' })
  @ValidateIf((object, value) => value === object.password, {
    message: 'Mật khẩu xác nhận không khớp',
  })
  confirmPassword: string;

  @IsString({ message: 'Tên người dùng phải là một chuỗi' })
  @IsNotEmpty({ message: 'Tên người dùng không được để trống' })
  fullName: string;

  @IsString({ message: 'Số điện thoại phải là một chuỗi' })
  @IsPhoneNumber('VN', { message: 'Số điện thoại không đúng định dạng' })
  phoneNumber?: string;
}
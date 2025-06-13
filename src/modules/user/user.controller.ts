import { IsEmail } from 'class-validator';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { User, UserRole } from '@prisma/client';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
}

@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Lấy thông tin người dùng đang đăng nhập' })
  @ApiResponse({ status: 200, description: 'Trả về thông tin người dùng.' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy thông tin người dùng.' })
  getProfile(@Req() req: RequestWithUser) {
    return this.userService.getProfile(req.user);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Tạo tài khoản (Admin only)' })
  @ApiResponse({ status: 201, description: 'Tài khoản đã được tạo thành công.' })
  @ApiResponse({ status: 400, description: 'Yêu cầu không hợp lệ.' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập.' })
  @ApiResponse({ status: 403, description: 'Không đủ quyền hạn.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Lấy danh sách người dùng (Admin only)' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách người dùng.' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập.' })
  @ApiResponse({ status: 403, description: 'Không đủ quyền hạn.' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Lấy thông tin người dùng theo ID' })
  @ApiResponse({ status: 200, description: 'Trả về thông tin người dùng.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng.' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập.' })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Cập nhật thông tin người dùng (Admin only)' })
  @ApiResponse({ status: 200, description: 'Cập nhật thông tin thành công.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng.' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập.' })
  @ApiResponse({ status: 403, description: 'Không đủ quyền hạn.' })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Xóa người dùng (Admin only)' })
  @ApiResponse({ status: 200, description: 'Xóa người dùng thành công.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng.' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập.' })
  @ApiResponse({ status: 403, description: 'Không đủ quyền hạn.' })
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}

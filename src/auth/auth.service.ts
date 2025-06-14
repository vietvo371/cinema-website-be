import { Injectable, UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    try {
      const payload = { 
        email: user.email, 
        sub: user.id.toString(),
        role: user.role 
      };
      
      return {
        access_token: this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRES_IN }),
        refresh_token: this.jwtService.sign(payload, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }),
        user: {
          id: user.id.toString(),
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new InternalServerErrorException('Login failed');
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      console.log('Starting registration with data:', { ...registerDto, password: '[REDACTED]' });
      
      const existingUser = await this.prisma.user.findUnique({
        where: { email: registerDto.email },
      });
      
      if (existingUser) {
        console.log('Email already exists:', registerDto.email);
        throw new UnauthorizedException('Email đã tồn tại');
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      console.log('Password hashed successfully');

      const userData = {
        email: registerDto.email,
        password: hashedPassword,
        fullName: registerDto.fullName,
        phone: registerDto.phone,
        address: registerDto.address,
        role: UserRole.USER,
        status: 'Unverified',
      };
      
      console.log('Attempting to create user with data:', { ...userData, password: '[REDACTED]' });
      
      const user = await this.prisma.user.create({
        data: userData,
      });
      
      console.log('User created successfully:', { id: user.id, email: user.email });

      const { password, ...result } = user;
      return result;
    } catch (error) {
      console.error('Registration error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      throw new InternalServerErrorException(
        `Registration failed: ${error.message || 'Unknown error'}`
      );
    }
  }

  // async logout(userId: string) {
  //   await this.prisma.user.update({
  //     where: { id: userId },
  //     data: { refreshToken: null },
  //   });
  // }
} 
import { IsDate, IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  director?: string;

  @IsInt()
  @IsOptional()
  duration?: number;

  @IsDate()
  @IsOptional()
  releaseDate?: Date;

  @IsUrl()
  @IsOptional()
  posterUrl?: string;
} 
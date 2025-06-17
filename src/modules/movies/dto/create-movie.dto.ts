import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDto {
    @ApiProperty({ description: 'Tên phim', example: 'Phim 1' })
    @IsString({ message: 'Tên phim phải là một chuỗi' })
    @IsNotEmpty({ message: 'Tên phim không được để trống' })
    title: string;

    @ApiProperty({ description: 'Đạo diễn', example: 'Đạo diễn 1' })
    @IsString({ message: 'Đạo diễn phải là một chuỗi' })
    @IsOptional({ message: 'Đạo diễn không được để trống' })
    director: string;

    @ApiProperty({ description: 'Thời lượng', example: 120 })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Thời lượng phải là một số' })
    @IsNotEmpty({ message: 'Thời lượng không được để trống' })
    duration: number;

    @ApiProperty({ description: 'Ngày phát hành', example: '2025-01-01' })
    @IsDate({ message: 'Ngày phát hành phải là một ngày' })
    @IsNotEmpty({ message: 'Ngày phát hành không được để trống' })
    releaseDate: Date;

    @ApiProperty({ description: 'URL poster', example: 'https://example.com/poster.jpg' })
    @IsString({ message: 'URL poster phải là một chuỗi' })
    @IsNotEmpty({ message: 'URL poster không được để trống' })
    posterUrl: string;

    @ApiProperty({ description: 'URL trailer', example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
    @IsString({ message: 'URL trailer phải là một chuỗi' })
    @IsNotEmpty({ message: 'URL trailer không được để trống' })
    trailer_ytb: string;

    @ApiProperty({ description: 'Nhà sản xuất', example: 'Nhà sản xuất 1' })
    @IsString({ message: 'Nhà sản xuất phải là một chuỗi' })
    @IsNotEmpty({ message: 'Nhà sản xuất không được để trống' })
    manufacturer: string;

    @ApiProperty({ description: 'Mô tả', example: 'Mô tả phim' })
    @IsString({ message: 'Mô tả phải là một chuỗi' })
    @IsNotEmpty({ message: 'Mô tả không được để trống' })
    description: string;

    @ApiProperty({ description: 'Đánh giá', example: 5 })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Đánh giá phải là một số' })
    @IsNotEmpty({ message: 'Đánh giá không được để trống' })
    rate: number;

    @ApiProperty({ description: 'Trạng thái', example: 'active' })
    @IsString({ message: 'Trạng thái phải là một chuỗi' })
    @IsNotEmpty({ message: 'Trạng thái không được để trống' })
    status: string;

    @ApiProperty({ description: 'Slug title', example: 'phim-1' })
    @IsString({ message: 'Slug title phải là một chuỗi' })
    @IsNotEmpty({ message: 'Slug title không được để trống' })
    slug_title: string;

}

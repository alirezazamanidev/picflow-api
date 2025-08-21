import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  caption?: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  mediaFile: Express.Multer.File;
}

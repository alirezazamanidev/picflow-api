import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContentTypeEnum } from 'src/common/enums/form.enum';
import { Auth } from '../auth/decorators/auth.decourator';
import { memoryStorage } from 'multer';
@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Create a new post' })
  @UseInterceptors(FileInterceptor('mediaFile',{storage:memoryStorage()}))
  @Post('crrate')
  @Auth()
  @ApiConsumes(ContentTypeEnum.Multipart)
  create(
    @Body() dto: CreatePostDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 10 * 1024 * 1024, // 10MB
            message: 'حجم فایل نباید بیشتر از ۵ مگابایت باشد',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    
   return this.postService.create(dto,file);
  }
}

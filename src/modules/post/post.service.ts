import {
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  Scope,
} from '@nestjs/common';
import { Client } from 'minio';
import { CreatePostDto } from './dtos/create-post.dto';
import { MinioService } from '../minio/minio.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';
import { PublicMessages } from 'src/common/enums/messages.enum';

@Injectable({ scope: Scope.REQUEST })
export class PostService {
  constructor(
    private readonly minioService: MinioService,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async create(dto: CreatePostDto, file: Express.Multer.File) {
    const { caption } = dto;
    const fileInfo = await this.minioService.uploadFile(
      file,
      this.request.user.id,
      'post',
    );
    if (fileInfo) {
      const newPost = this.postRepository.create({
        caption,
        mediaUrl: fileInfo.filePath,
        MediaType: file.mimetype,

        userId: this.request.user.id,
      });
      await this.postRepository.save(newPost);
      return {
        message:PublicMessages.PostCreated,
        postId:newPost.id
      }
    }
  }
}

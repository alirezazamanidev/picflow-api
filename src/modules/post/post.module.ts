import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { MinIoModule } from '../minio/minio.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), MinIoModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

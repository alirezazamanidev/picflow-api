import { Inject, Injectable, Logger } from '@nestjs/common';
import { MINIO_CLIENT } from './minio.module';
import { Client } from 'minio';
import { extname } from 'path';
@Injectable()
export class MinioService {
  private readonly logger = new Logger(MinioService.name);

  constructor(@Inject('MINIO_CLIENT') private readonly minioClient: Client) {}
  async onModuleInit() {
    // create bucket minio
    const exists = await this.minioClient.bucketExists(
      process.env.MINIO_BUCKET_NAME,
    );
    if (!exists) {
      await this.minioClient.makeBucket(process.env.MINIO_BUCKET_NAME);
      this.logger.log(`Bucket ${process.env.MINIO_BUCKET_NAME} created`);
    }
  }
  async uploadFile(file: Express.Multer.File, userId: string, subject: string) {
    const objectName = `${userId}/${subject}/${Date.now().toString()}${extname(file.originalname)}`;
    const bucketName = process.env.MINIO_BUCKET_NAME;

    await this.minioClient.putObject(
      bucketName,
      objectName,
      Buffer.from(file.buffer),
      file.size,
      { 'Content-Type': file.mimetype },
    );

    this.logger.log(`File uploaded: ${objectName}`);
    return {
      filePath: objectName,
      size: file.size,
      mimetype: file.mimetype,
      originalname: file.originalname,
    };
  }
}

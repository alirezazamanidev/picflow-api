import { DynamicModule, Global, Module } from '@nestjs/common';
import { Client } from 'minio';
import { MinioService } from './minio.service';

export const MINIO_CLIENT = '';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: 'MINIO_CLIENT',
      useFactory: () => {
        const client = new Client({
          endPoint: process.env.MINIO_ENDPOINT,
          port: process.env.MINIO_PORT,
          useSSL: process.env.MINIO_USE_SSL === 'true',
          accessKey: process.env.MINIO_ACCESS_KEY,
          secretKey: process.env.MINIO_SECRET_KEY,
        });
        return client;
      },
    },
    MinioService,
  ],
  exports:[MinioService]
})
export class MinIoModule {}

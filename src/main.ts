import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { SwaggerConfig } from './configs/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['debug', 'error', 'log'],
  });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  //swagger config
  SwaggerConfig(app);
  await app.listen(process.env.APP_PORT ?? 3000, () => {
    console.log(
      `server running at http://localhost:${process.env.APP_PORT ?? 3000}`,
    );
    console.log(
      `Swagger documentation available at http://localhost:${process.env.APP_PORT ?? 3000}/docs`,
    );
  });
}
bootstrap();

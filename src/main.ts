import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './todo/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({transform: true, whitelist: true}));
  app.enableVersioning({
    type: VersioningType.URI
  });
  await app.listen(3000);
}
bootstrap();

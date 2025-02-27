import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import configureLogger from './logger/winston-logger';
import { configureSwagger } from './swagger/configure-swagger';
import { configureViews } from './views/configure-views';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: configureLogger('coder-nest'),
  });
  app.useGlobalPipes(new ValidationPipe());

  configureViews(app);
  configureSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

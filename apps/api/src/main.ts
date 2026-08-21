import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { API_GLOBAL_PREFIX } from '@platform/shared-types';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API_GLOBAL_PREFIX);

  const corsOrigin = process.env.CORS_ORIGIN;
  if (corsOrigin) {
    app.enableCors({ origin: corsOrigin.split(',').map((o) => o.trim()) });
  }

  const port = process.env.PORT ? Number(process.env.PORT) : 3333;
  const host = process.env.HOST ?? '0.0.0.0';
  await app.listen(port, host);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${API_GLOBAL_PREFIX}`,
  );
}

bootstrap();

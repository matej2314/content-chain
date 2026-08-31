import 'reflect-metadata';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { configureHttpApp } from './shared/http/configure-http-app';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  configureHttpApp(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3001);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Content Chain API')
    .setDescription('HTTP API - DX OpenAPI')
    .setVersion('1.0')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(port);
  app.get(Logger).log(`Server is running on http://localhost:${port}`);
}
void bootstrap();

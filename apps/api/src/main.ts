import 'reflect-metadata';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { configureHttpApp } from './shared/http/configure-http-app';
import { buildSwaggerConfig } from './shared/http/configure-swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  configureHttpApp(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3001);

  const swaggerConfig = buildSwaggerConfig();
  const documentFactory = () => {
    return SwaggerModule.createDocument(app, swaggerConfig);
  };

  SwaggerModule.setup('docs', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
      withCredentials: true,
    },
  });

  await app.listen(port);
  app.get(Logger).log(`Server is running on http://localhost:${port}`);
}
void bootstrap();

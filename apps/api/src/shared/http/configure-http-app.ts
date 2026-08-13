import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { parseCorsOrigins } from '../config/env.schema';
import type { Env } from '../config/env.schema';

export function configureHttpApp(app: INestApplication): void {
  const configService = app.get(ConfigService);
  const nodeEnv = configService.get<Env['NODE_ENV']>('NODE_ENV', 'development');
  const corsOrigin = configService.getOrThrow<string>('CORS_ORIGIN');

  app.use(
    helmet({
      contentSecurityPolicy: nodeEnv === 'production' ? undefined : false,
    }),
  );
  app.enableCors({
    origin: parseCorsOrigins(corsOrigin),
    credentials: true,
  });
  app.setGlobalPrefix('api/v1', { exclude: ['metrics', 'docs', 'docs-json'] });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}

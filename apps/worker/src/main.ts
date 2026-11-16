import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WorkerAppModule } from './worker-app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createApplicationContext(WorkerAppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.enableShutdownHooks();
  const logger = new Logger('WorkerBootstrap');
  logger.log('Worker started.');
}

bootstrap().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});

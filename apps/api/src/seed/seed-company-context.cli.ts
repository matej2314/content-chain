import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeedCliModule } from './seed-cli.module';
import { SeedService } from './seed.service';

async function main(): Promise<void> {
  const app = await NestFactory.createApplicationContext(SeedCliModule, {
    logger: ['error', 'warn', 'log'],
  });
  try {
    const seed = app.get(SeedService);
    const result = await seed.seedCompanyContext();
    Logger.log(JSON.stringify(result), 'seed:company-context');
  } finally {
    await app.close();
  }
}

void main().catch((error: unknown) => {
  const message =
    error instanceof Error ? (error.stack ?? error.message) : String(error);
  console.error(message);
  process.exitCode = 1;
});

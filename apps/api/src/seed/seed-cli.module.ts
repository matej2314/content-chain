import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CompanyContextModule } from '../company-context/company-context.module';
import { EnvModule } from '../shared/config/env.module';
import { validateEnv } from '../shared/config/env.schema';
import { PrismaModule } from '../shared/persistence/prisma.module';
import { SeedModule } from './seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      ignoreEnvFile: process.env.NODE_ENV === 'test',
    }),
    EnvModule,
    PrismaModule,
    CompanyContextModule,
    SeedModule,
  ],
})
export class SeedCliModule {}

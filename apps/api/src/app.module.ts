import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { JwtAuthGuard } from './shared/guards/jwt-auth.guard';
import { RolesGuard } from './shared/guards/roles.guard';
import { GuestGuard } from './shared/guards/guest.guard';
import { AuthModule } from './auth/auth.module';
import { CompanyContextModule } from './company-context/company-context.module';
import { HealthModule } from './health/health.module';
import {
  CONTENT_RESULT_STORE,
  RunPipelineResultStoresModule,
  SOCIAL_RESULT_STORE,
  type ContentResultStore,
  type SocialResultStore,
} from '@content-chain/run-pipelines';
import { RunsModule } from './runs/runs.module';
import { PrismaModule } from '@content-chain/persistence';
import { UnsupportedRunExecutor } from '@content-chain/runs-kernel';
import type { RunExecutorPort } from '@content-chain/runs-kernel';
import type { RunResultReader } from './runs/domain/run-result-reader.port';
import { EnvModule } from './shared/config/env.module';
import { validateEnv } from './shared/config/env.schema';
import { HttpExceptionFilter } from './shared/http/http-exception.filter';
import { RequestIdMiddleware } from './shared/http/request-id.middleware';

import { MetricsModule } from './metrics/metrics.module';
import { SeedModule } from './seed/seed.module';
import { RunLifecycleModule } from './runs/run-lifecycle.module';
import { PublicConfigModule } from './public-config/public-config.module';
import { FeedbackModule } from './feedback/feedback.module';

import { CompositeRunResultReader } from './runs/application/composite-run-result.reader';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      ignoreEnvFile: process.env.NODE_ENV === 'test',
    }),
    EnvModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level:
          process.env.NODE_ENV === 'production'
            ? 'info'
            : process.env.NODE_ENV === 'test'
              ? 'silent'
              : 'debug',
        transport:
          process.env.NODE_ENV === 'production' ||
          process.env.NODE_ENV === 'test'
            ? undefined
            : { target: 'pino-pretty' },
      },
      forRoutes: [{ path: '{*splat}', method: RequestMethod.ALL }],
    }),
    AuthModule,
    CompanyContextModule,
    RunPipelineResultStoresModule,
    RunsModule.registerAsync({
      imports: [RunPipelineResultStoresModule, RunLifecycleModule],
      inject: [],
      useFactory: (): RunExecutorPort => new UnsupportedRunExecutor(),
      resultReader: {
        inject: [SOCIAL_RESULT_STORE, CONTENT_RESULT_STORE],
        useFactory: (
          social: SocialResultStore,
          content: ContentResultStore,
        ): RunResultReader => new CompositeRunResultReader(social, content),
      },
    }),
    PrismaModule,
    HealthModule,
    MetricsModule,
    FeedbackModule,
    PublicConfigModule,
    SeedModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: GuestGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestIdMiddleware).forRoutes({
      path: '{*splat}',
      method: RequestMethod.ALL,
    });
  }
}

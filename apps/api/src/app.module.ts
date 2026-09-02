import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { CompanyContextModule } from './company-context/company-context.module';
import { HealthModule } from './health/health.module';
import { SocialModule } from './social/social.module';
import { SocialRunExecutor } from './social/application/social-run.executor';
import {
  SOCIAL_RESULT_STORE,
  type SocialResultStore,
} from './social/domain/social-result.port';
import { RunsModule } from './runs/runs.module';
import type { RunExecutorPort } from './runs/domain/run-executor.port';
import type { RunResultReader } from './runs/domain/run-result-reader.port';
import { EnvModule } from './shared/config/env.module';
import { validateEnv } from './shared/config/env.schema';
import { HttpExceptionFilter } from './shared/http/http-exception.filter';
import { RequestIdMiddleware } from './shared/http/request-id.middleware';
import { PrismaModule } from './shared/persistence/prisma.module';
import { LlmModule } from './llm/llm.module';
import { MetricsModule } from './metrics/metrics.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
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
    SocialModule,
    RunsModule.registerAsync({
      imports: [SocialModule],
      inject: [SocialRunExecutor],
      useFactory: (executor: SocialRunExecutor): RunExecutorPort => executor,
      resultReader: {
        inject: [SOCIAL_RESULT_STORE],
        useFactory: (store: SocialResultStore): RunResultReader => store,
      },
    }),
    PrismaModule,
    HealthModule,
    LlmModule,
    MetricsModule,
    ContentModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestIdMiddleware).forRoutes({
      path: '{*splat}',
      method: RequestMethod.ALL,
    });
  }
}

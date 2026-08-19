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
import { RunsModule } from './runs/runs.module';
import { EnvModule } from './shared/config/env.module';
import { validateEnv } from './shared/config/env.schema';
import { HttpExceptionFilter } from './shared/http/http-exception.filter';
import { RequestIdMiddleware } from './shared/http/request-id.middleware';
import { PrismaModule } from './shared/persistence/prisma.module';
import { LlmModule } from './llm/llm.module';
import { MetricsModule } from './metrics/metrics.module';

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
    RunsModule,
    PrismaModule,
    HealthModule,
    LlmModule,
    MetricsModule,
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

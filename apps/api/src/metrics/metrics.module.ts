import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RunLifecycleModule } from '../runs/run-lifecycle.module';
import { HttpMetricsInterceptor } from './http-metrics.interceptor';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';

@Module({
  imports: [RunLifecycleModule],
  providers: [
    MetricsService,
    { provide: APP_INTERCEPTOR, useClass: HttpMetricsInterceptor },
  ],
  controllers: [MetricsController],
  exports: [MetricsService],
})
export class MetricsModule {}

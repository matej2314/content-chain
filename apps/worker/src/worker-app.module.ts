import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WorkerRuntimeModule } from './worker-runtime.module';

/**
 * Thin runtime shell. WorkerRuntimeModule is the worker composition root
 * (kernel providers; pipelines land in FAZA 3).
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'test',
    }),
    WorkerRuntimeModule,
  ],
})
export class WorkerAppModule {}

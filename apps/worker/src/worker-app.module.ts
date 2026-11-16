import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// Relative (not @api): nodenext emit keeps path aliases as bare require — Node cannot resolve them.
import { WorkerRuntimeModule } from '../../api/src/runs/worker-runtime.module';

/**
 * Thin runtime shell. WorkerRuntimeModule lives in the api tree (day-1 import);
 * extract to packages/* is out of scope for this cut.
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

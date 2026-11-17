import { Global, Module } from '@nestjs/common';
import { ENV } from './env.token';
import { validateWorkerEnv } from './worker-env.schema';

/** Worker process only — narrower validate than EnvModule (no CORS/SMTP). */
@Global()
@Module({
  providers: [
    {
      provide: ENV,
      useFactory: () => validateWorkerEnv(process.env),
    },
  ],
  exports: [ENV],
})
export class WorkerEnvModule {}

import { Global, Module } from '@nestjs/common';
import { ENV } from './env';
import { validateEnv } from './env.schema';

@Global()
@Module({
  providers: [
    {
      provide: ENV,
      useFactory: () => validateEnv(process.env as Record<string, unknown>),
    },
  ],
  exports: [ENV],
})
export class EnvModule {}

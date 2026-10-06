import { Module } from '@nestjs/common';
import { ENV, type Env } from '../shared/config/env';
import { resolveRedisStandalone } from '../shared/config/redis-connection';
import { GUEST_QUOTA, type GuestQuotaPort } from './domain/guest-quota.port';
import { IoredisGuestQuotaAdapter } from './infrastructure/ioredis-guest-quota.adapter';
import { UnavailableGuestQuotaAdapter } from './infrastructure/unavailable-guest-quota.adapter';

@Module({
  providers: [
    {
      provide: GUEST_QUOTA,
      inject: [ENV],
      useFactory: (env: Env): GuestQuotaPort => {
        if (resolveRedisStandalone(env) === null) {
          return new UnavailableGuestQuotaAdapter();
        }
        return new IoredisGuestQuotaAdapter(env);
      },
    },
  ],
  exports: [GUEST_QUOTA],
})
export class GuestQuotaModule {}

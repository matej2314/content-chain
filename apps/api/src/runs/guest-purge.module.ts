import { Module } from '@nestjs/common';
import { PrismaModule } from '../shared/persistence/prisma.module';
import { GUEST_PURGE } from './domain/guest-purge.port';
import { PrismaGuestPurgeAdapter } from './infrastructure/persistence/prisma-guest-purge.adapter';

@Module({
  imports: [PrismaModule],
  providers: [
    PrismaGuestPurgeAdapter,
    { provide: GUEST_PURGE, useExisting: PrismaGuestPurgeAdapter },
  ],
  exports: [GUEST_PURGE],
})
export class GuestPurgeModule {}

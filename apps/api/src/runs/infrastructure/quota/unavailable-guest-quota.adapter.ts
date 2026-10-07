import type { UserId } from '@content-chain/shared';
import type {
  GuestQuotaAdmitResult,
  GuestQuotaPort,
} from '../../domain/guest-quota.port';

export class UnavailableGuestQuotaAdapter implements GuestQuotaPort {
  async tryAdmitDailyRun(): Promise<GuestQuotaAdmitResult> {
    return Promise.resolve({ kind: 'unavailable' });
  }

  releaseDailyRun(): Promise<void> {
    return Promise.resolve();
  }

  async tryAdmitDailyRating(_userId: UserId): Promise<GuestQuotaAdmitResult> {
    return Promise.resolve({ kind: 'unavailable' });
  }

  async deleteDailyRatings(_userId: UserId): Promise<boolean> {
    return Promise.resolve(true);
  }
}

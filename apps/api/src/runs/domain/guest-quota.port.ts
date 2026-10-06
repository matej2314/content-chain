import type { UserId } from '@content-chain/shared';

export const GUEST_QUOTA = Symbol('GUEST_QUOTA');

export type GuestQuotaAdmitResult =
  | { readonly kind: 'ok' }
  | { readonly kind: 'exceeded' }
  | { readonly kind: 'unavailable' };

export interface GuestQuotaPort {
  tryAdmitDailyRun(cap: number, now?: Date): Promise<GuestQuotaAdmitResult>;
  releaseDailyRun(now?: Date): Promise<void>;
  tryAdmitDailyRating(
    userId: UserId,
    cap: number,
    now?: Date,
  ): Promise<GuestQuotaAdmitResult>;
}

import type { UserId } from '@content-chain/shared';

export const REFRESH_SESSION_REPOSITORY = Symbol('REFRESH_SESSION_REPOSITORY');

export type RefreshSessionRecord = {
  id: string;
  userId: UserId;
  tokenHash: string;
  expiresAt: Date;
};

export type RotateRefreshSessionResult =
  | { ok: true }
  | { ok: false; reason: 'not-found' };

export interface RefreshSessionRepository {
  create(session: RefreshSessionRecord): Promise<void>;
  //finds valid session if tokenHash matches and is not expired
  findValid(
    userId: UserId,
    tokenHash: string,
  ): Promise<RefreshSessionRecord | null>;
  findValidByHash(tokenHash: string): Promise<RefreshSessionRecord | null>;
  /**
   * Atomically claims `currentTokenHash` (unexpired, belonging to `next.userId`)
   * and inserts `next`. `not-found` = hash already consumed or missing (reuse / race).
   */
  rotate(
    currentTokenHash: string,
    next: RefreshSessionRecord,
  ): Promise<RotateRefreshSessionResult>;
  deleteById(id: string): Promise<void>;

  // deletes all sessions for a user
  deleteByUser(userId: UserId): Promise<void>;
}

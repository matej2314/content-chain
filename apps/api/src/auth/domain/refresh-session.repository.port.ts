import type { UserId } from '@content-chain/shared';

export const REFRESH_SESSION_REPOSITORY = Symbol('REFRESH_SESSION_REPOSITORY');

export type RefreshSessionRecord = {
  id: string;
  userId: UserId;
  tokenHash: string;
  expiresAt: Date;
};

export interface RefreshSessionRepository {
  create(session: RefreshSessionRecord): Promise<void>;
  //finds valid session if tokenHash matches and is not expired
  findValid(
    userId: UserId,
    tokenHash: string,
  ): Promise<RefreshSessionRecord | null>;
  deleteById(id: string): Promise<void>;

  // deletes all sessions for a user
  deleteByUser(userId: UserId): Promise<void>;
}

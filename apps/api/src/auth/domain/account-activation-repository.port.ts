import type { AccountActivationId, UserId } from '@content-chain/shared';
import type { AuthUser } from './auth-user.types';
import type { CreateUserData } from './user-repository.port';

export const ACCOUNT_ACTIVATION_REPOSITORY = Symbol(
  'ACCOUNT_ACTIVATION_REPOSITORY',
);

export type AccountActivationRecord = {
  id: AccountActivationId;
  userId: UserId;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
};

export type CreatePendingUser = {
  user: CreateUserData & { verifiedAt: null };
  activation: {
    id: AccountActivationId;
    tokenHash: string;
    expiresAt: Date;
  };
};

export type RotateActivationTokenInput = {
  userId: UserId;
  tokenHash: string;
  expiresAt: Date;
};

export interface AccountActivationRepository {
  createPendingUser(input: CreatePendingUser): Promise<AuthUser>;
  findValidByTokenHash(
    tokenHash: string,
    now: Date,
  ): Promise<AccountActivationRecord | null>;
  findValidByUserId(userId: UserId): Promise<AccountActivationRecord | null>;
  consumeAndVerify(userId: UserId, verifiedAt: Date): Promise<AuthUser>;
  rotateToken(
    input: RotateActivationTokenInput,
  ): Promise<AccountActivationRecord>;
  deleteByUserId(userId: UserId): Promise<void>;
}

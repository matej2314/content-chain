import type { EmailChangeRequestId, UserId } from '@content-chain/shared';

export const EMAIL_CHANGE_REQUEST_REPOSITORY = Symbol(
  'EMAIL_CHANGE_REQUEST_REPOSITORY',
);

export type EmailChangeRequestRecord = {
  id: EmailChangeRequestId;
  userId: UserId;
  pendingEmail: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
};

export type UpsertEmailChangeRequestInput = {
  id: EmailChangeRequestId;
  userId: UserId;
  pendingEmail: string;
  tokenHash: string;
  expiresAt: Date;
};

export interface EmailChangeRequestRepository {
  upsertForUser(
    input: UpsertEmailChangeRequestInput,
  ): Promise<EmailChangeRequestRecord>;
  findByUserId(userId: UserId): Promise<EmailChangeRequestRecord | null>;
  findValidByTokenHash(
    tokenHash: string,
    now: Date,
  ): Promise<EmailChangeRequestRecord | null>;
  findByPendingEmail(
    pendingEmail: string,
  ): Promise<EmailChangeRequestRecord | null>;
  rotateToken(
    userId: UserId,
    tokenHash: string,
    expiresAt: Date,
  ): Promise<EmailChangeRequestRecord>;
  consumeAndApplyEmail(
    userId: UserId,
    newEmail: string,
  ): Promise<{ id: UserId; email: string; role: string }>;
  deleteByUserId(userId: UserId): Promise<void>;
}

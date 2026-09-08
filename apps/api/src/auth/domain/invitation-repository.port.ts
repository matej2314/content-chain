import type { InvitationId, UserId } from '@content-chain/shared';
import type { AuthUser } from './auth-user.types';

export const INVITATION_REPOSITORY = Symbol('INVITATION_REPOSITORY');

export type InvitationPurpose = 'invite';
export type InvitationStatus = 'pending' | 'accepted' | 'revoked';

export type InvitationRecord = {
  id: InvitationId;
  email: string;
  tokenHash: string;
  purpose: InvitationPurpose;
  status: InvitationStatus;
  expiresAt: Date;
  invitedByUserId: UserId;
  createdAt: Date;
};

export type CreateInvitationInput = {
  id: InvitationId;
  email: string;
  tokenHash: string;
  purpose: InvitationPurpose;
  expiresAt: Date;
  invitedByUserId: UserId;
};

export type RotateInvitationTokenInput = {
  id: InvitationId;
  tokenHash: string;
  expiresAt: Date;
};

export type AcceptInviteAndCreateUserInput = {
  invitationId: InvitationId;
  userId: UserId;
  email: string;
  passwordHash: string;
};

export type InvitationListRecord = {
  id: InvitationId;
  email: string;
  status: InvitationStatus;
  expiresAt: Date;
  createdAt: Date;
  invitedBy: { id: UserId; email: string };
};

export type AcceptInviteAndCreateUserResult =
  { ok: true; user: AuthUser } | { ok: false; reason: 'email-taken' };

export type CreatePendingResult =
  | { ok: true; invitation: InvitationRecord }
  | { ok: false; reason: 'pending-exists' };

export type InvitationRepository = {
  createPending(input: CreateInvitationInput): Promise<CreatePendingResult>;
  findPendingByEmail(email: string): Promise<InvitationRecord | null>;
  listPending(): Promise<InvitationListRecord[]>;
  findById(id: InvitationId): Promise<InvitationRecord | null>;
  findPendingByHash(
    tokenHash: string,
    now: Date,
  ): Promise<InvitationRecord | null>;
  rotateToken(input: RotateInvitationTokenInput): Promise<InvitationRecord>;
  revoke(id: InvitationId): Promise<void>;
  markAccepted(id: InvitationId): Promise<void>;
  acceptAndCreateUser(
    input: AcceptInviteAndCreateUserInput,
  ): Promise<AcceptInviteAndCreateUserResult>;
};

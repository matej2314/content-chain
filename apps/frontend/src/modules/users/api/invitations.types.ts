import {
  createInvitationId,
  createUserId,
  isInvitationId,
  isUserId,
  type InvitationId,
  type UserId,
} from '@content-chain/shared';
import { isRecord } from '@/shared/api/envelope';

export type InvitationListItem = {
  readonly id: InvitationId;
  readonly email: string;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly invitedBy: { readonly id: UserId; readonly email: string };
};

export type InviteCreated = {
  readonly id: InvitationId;
  readonly email: string;
  readonly expiresAt: string;
};

export function isInvitationExpired(expiresAt: string, nowMs: number = Date.now()): boolean {
  const expiresMs = Date.parse(expiresAt);
  if (Number.isNaN(expiresMs)) throw new Error('Invalid expiresAt');
  return expiresMs < nowMs;
}

export function parseInvitationListItem(value: unknown): InvitationListItem {
  if (
    !isRecord(value) ||
    typeof value.id !== 'string' ||
    !isInvitationId(value.id) ||
    typeof value.email !== 'string' ||
    value.email.length === 0 ||
    typeof value.createdAt !== 'string' ||
    typeof value.expiresAt !== 'string' ||
    !isRecord(value.invitedBy) ||
    typeof value.invitedBy.id !== 'string' ||
    !isUserId(value.invitedBy.id) ||
    typeof value.invitedBy.email !== 'string'
  ) {
    throw new Error('Invalid invitation item');
  }
  return {
    id: createInvitationId(value.id),
    email: value.email,
    createdAt: value.createdAt,
    expiresAt: value.expiresAt,
    invitedBy: {
      id: createUserId(value.invitedBy.id),
      email: value.invitedBy.email,
    },
  };
}

export function parseInvitationList(value: unknown): readonly InvitationListItem[] {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    throw new Error('Invalid invitations payload');
  }
  return value.items.map(parseInvitationListItem);
}

export function parseInviteCreated(value: unknown): InviteCreated {
  if (
    !isRecord(value) ||
    typeof value.id !== 'string' ||
    !isInvitationId(value.id) ||
    typeof value.email !== 'string' ||
    typeof value.expiresAt !== 'string'
  ) {
    throw new Error('Invalid invite payload');
  }
  if ('token' in value || 'rawToken' in value || 'tokenHash' in value) {
    throw new Error('Invite payload must not include token');
  }
  return {
    id: createInvitationId(value.id),
    email: value.email,
    expiresAt: value.expiresAt,
  };
}

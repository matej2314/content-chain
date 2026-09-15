import {
  createUserId,
  isUserId,
  isUserRole,
  type UserId,
  type UserRole,
} from '@content-chain/shared';
import { isRecord } from '@/shared/api/envelope';

export type SessionUser = {
  readonly id: UserId;
  readonly email: string;
  readonly role: UserRole;
};

export function parseSessionUser(value: unknown): SessionUser {
  if (!isRecord(value)) {
    throw new Error('Invalid session payload');
  }
  const { id, email, role } = value;
  if (typeof id !== 'string' || !isUserId(id)) {
    throw new Error('Invalid session user id');
  }
  if (typeof email !== 'string' || email.length === 0) {
    throw new Error('Invalid session email');
  }
  if (typeof role !== 'string' || !isUserRole(role)) {
    throw new Error('Invalid session role');
  }
  return { id: createUserId(id), email, role };
}

export function parseAuthUserWrapper(value: unknown): SessionUser {
  if (!isRecord(value) || !('user' in value)) {
    throw new Error('Invalid auth user wrapper');
  }
  return parseSessionUser(value.user);
}

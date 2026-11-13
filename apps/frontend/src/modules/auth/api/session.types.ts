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
  /** Pending address after PATCH /auth/me/email (V1); null when none. */
  readonly pendingEmail: string | null;
};

export function parseSessionUser(value: unknown): SessionUser {
  if (!isRecord(value)) {
    throw new Error('Invalid session payload');
  }
  const { id, email, role, pendingEmail } = value;
  if (typeof id !== 'string' || !isUserId(id)) {
    throw new Error('Invalid session user id');
  }
  if (typeof email !== 'string' || email.length === 0) {
    throw new Error('Invalid session email');
  }
  if (typeof role !== 'string' || !isUserRole(role)) {
    throw new Error('Invalid session role');
  }
  // /me + resend: string | null; public confirm may omit → null
  if (
    !(
      pendingEmail === undefined ||
      pendingEmail === null ||
      typeof pendingEmail === 'string'
    )
  ) {
    throw new Error('Invalid session pendingEmail');
  }
  return {
    id: createUserId(id),
    email,
    role,
    pendingEmail: pendingEmail === undefined ? null : pendingEmail,
  };
}

export function parseAuthUserWrapper(value: unknown): SessionUser {
  if (!isRecord(value) || !('user' in value)) {
    throw new Error('Invalid auth user wrapper');
  }
  return parseSessionUser(value.user);
}

/** Response from `POST /auth/register` - `verifiedAt: null` = thank-you (prod). */
export type RegisteredUser = {
  readonly id: UserId;
  readonly email: string;
  readonly role: UserRole;
  readonly verifiedAt: string | null;
};

export function parseRegisteredUser(value: unknown): RegisteredUser {
  if (!isRecord(value)) {
    throw new Error('Invalid registered user payload');
  }
  const { id, email, role, verifiedAt } = value;
  if (typeof id !== 'string' || !isUserId(id)) {
    throw new Error('Invalid registered user id');
  }
  if (typeof email !== 'string' || email.length === 0) {
    throw new Error('Invalid registered user email');
  }
  if (typeof role !== 'string' || !isUserRole(role)) {
    throw new Error('Invalid registered user role');
  }
  if (!(verifiedAt === null || typeof verifiedAt === 'string')) {
    throw new Error('Invalid registered user verifiedAt');
  }
  return {
    id: createUserId(id),
    email,
    role,
    verifiedAt,
  };
}

export function parseRegisteredUserWrapper(value: unknown): RegisteredUser {
  if (!isRecord(value) || !('user' in value)) {
    throw new Error('Invalid register user wrapper');
  }
  return parseRegisteredUser(value.user);
}

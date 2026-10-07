import { apiFetch } from '@/shared/api/api-fetch';
import { isRecord } from '@/shared/api/envelope';
import {
  parseAuthUserWrapper,
  parseRegisteredUserWrapper,
  parseSessionUser,
  type RegisteredUser,
  type SessionUser,
} from '@/modules/auth/api/session.types';

export type Credentials = {
  readonly email: string;
  readonly password: string;
};

export async function fetchBootstrapStatus(): Promise<boolean> {
  const body = await apiFetch('/auth/bootstrap-status', { skipAuthRefresh: true });
  if (!isRecord(body) || typeof body.available !== 'boolean') {
    throw new Error('Invalid bootstrap status payload');
  }
  return body.available;
}

export async function fetchUserSession(): Promise<SessionUser> {
  const body = await apiFetch('/auth/me');
  return parseSessionUser(body);
}

export async function patchOwnEmail(input: {
  readonly email: string;
  readonly currentPassword: string;
}): Promise<SessionUser> {
  const body = await apiFetch('/auth/me/email', {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      email: input.email,
      currentPassword: input.currentPassword,
    }),
  });
  return parseSessionUser(body);
}

export async function loginWithPassword(credentials: Credentials): Promise<SessionUser> {
  const body = await apiFetch('/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(credentials),
    skipAuthRefresh: true,
  });
  return parseAuthUserWrapper(body);
}

export async function bootstrapAdmin(credentials: Credentials): Promise<SessionUser> {
  const body = await apiFetch('/auth/bootstrap-admin', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(credentials),
    skipAuthRefresh: true,
  });
  return parseAuthUserWrapper(body);
}

export async function logoutSession(): Promise<void> {
  await apiFetch('/auth/logout', { method: 'POST' });
}

/**
 * Publiczny accept-invite: **201** bez Set-Cookie.
 * Parsuje `user.role` (w tym `guest` przy demo on — api Faza 19), ale **nie**
 * ustanawia sesji FE — dashboard dopiero po `loginSession`.
 */
export async function acceptInvite(input: {
  readonly token: string;
  readonly password: string;
}): Promise<void> {
  const body = await apiFetch('/auth/accept-invite', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
    skipAuthRefresh: true,
  });
  // Walidacja kształtu + roli (guest|user|admin) — wynik celowo odrzucony.
  parseAuthUserWrapper(body);
}

export async function registerAccount(credentials: Credentials): Promise<RegisteredUser> {
  const body = await apiFetch('/auth/register', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(credentials),
    skipAuthRefresh: true,
  });
  return parseRegisteredUserWrapper(body);
}

export async function activateAccount(token: string): Promise<SessionUser> {
  const body = await apiFetch('/auth/activate', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ token }),
    skipAuthRefresh: true,
  });
  return parseAuthUserWrapper(body);
}

export async function resendActivation(email: string): Promise<void> {
  await apiFetch('/auth/resend-activation', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email }),
    skipAuthRefresh: true,
  });
}

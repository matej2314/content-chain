import { apiFetch } from '@/shared/api/api-fetch';
import { isRecord } from '@/shared/api/envelope';
import {
  parseAuthUserWrapper,
  parseSessionUser,
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

export async function acceptInvite(input: {
  readonly token: string;
  readonly password: string;
}): Promise<SessionUser> {
  const body = await apiFetch('/auth/accept-invite', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
    skipAuthRefresh: true,
  });
  return parseAuthUserWrapper(body);
}

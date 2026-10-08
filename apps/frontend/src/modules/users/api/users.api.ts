import { apiFetch } from '@/shared/api/api-fetch';
import { isRecord } from '@/shared/api/envelope';
import {
  parseUserList,
  parseUserListItem,
  type UserListItem,
} from '@/modules/users/api/users.types';
import type { UserId } from '@content-chain/shared';

export const GUEST_HAS_ACTIVE_RUN = 'GUEST_HAS_ACTIVE_RUN' as const;

function parseOkBody(body: unknown): void {
  if (!isRecord(body) || body.ok !== true) {
    throw new Error('Invalid users mutation payload');
  }
}

export async function fetchUsers(): Promise<readonly UserListItem[]> {
  const body = await apiFetch('/users');
  return parseUserList(body);
}

export async function deleteUser(
  id: UserId,
  options?: { readonly purge?: boolean },
): Promise<void> {
  const purge = options?.purge === true;
  const path = purge ? `/users/${id}?purge=true` : `/users/${id}`;
  const body = await apiFetch(path, { method: 'DELETE' });
  parseOkBody(body);
}

export async function reactivateUser(id: UserId): Promise<void> {
  const response = await apiFetch(`/users/${id}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ isActive: true }),
  });
  parseUserListItem(response);
}

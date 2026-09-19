import { apiFetch } from '@/shared/api/api-fetch';
import { parseUserList, type UserListItem } from '@/modules/users/api/users.types';

export async function fetchUsers(): Promise<readonly UserListItem[]> {
  const body = await apiFetch('/users');
  return parseUserList(body);
}

import {
  createUserId,
  isUserId,
  isUserRole,
  type UserId,
  type UserRole,
} from '@content-chain/shared';
import { isRecord } from '@/shared/api/envelope';

export type UserListItem = {
  readonly id: UserId;
  readonly email: string;
  readonly role: UserRole;
  readonly isActive: boolean;
  readonly createdAt: string;
};

export function parseUserListItem(value: unknown): UserListItem {
  if (
    !isRecord(value) ||
    typeof value.id !== 'string' ||
    !isUserId(value.id) ||
    typeof value.email !== 'string' ||
    value.email.length === 0 ||
    typeof value.role !== 'string' ||
    !isUserRole(value.role) ||
    typeof value.isActive !== 'boolean' ||
    typeof value.createdAt !== 'string'
  ) {
    throw new Error('Invalid user item');
  }
  return {
    id: createUserId(value.id),
    email: value.email,
    role: value.role,
    isActive: value.isActive,
    createdAt: value.createdAt,
  };
}

export function parseUserList(value: unknown): readonly UserListItem[] {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    throw new Error('Invalid users payload');
  }
  return value.items.map(parseUserListItem);
}

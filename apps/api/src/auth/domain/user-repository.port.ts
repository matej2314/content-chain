import type { UserId, UserRole } from '@content-chain/shared';
import type { AuthUser } from './auth-user.types';
import type { PaginationMode } from '../../shared/http/pagination';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export type UserForAuth = AuthUser & { passwordHash: string };

export type CreateAdminIfNoneData = {
  id: UserId;
  email: string;
  passwordHash: string;
};

export type CreateUserData = {
  id: UserId;
  email: string;
  passwordHash: string;
  role: UserRole;
  verifiedAt: Date | null;
};

export type CreateAdminIfNoneResult =
  { ok: true; user: AuthUser } | { ok: false; reason: 'admin-exists' };

export type ListUsersResult = {
  items: AuthUser[];
  page: number;
  pageSize: number;
  total: number;
};

export interface UserRepository {
  findForAuth(email: string): Promise<UserForAuth | null>;
  findById(id: UserId): Promise<AuthUser | null>;
  findAdminCount(): Promise<number>;
  create(data: CreateUserData): Promise<AuthUser>;
  createAdminIfNone(
    data: CreateAdminIfNoneData,
  ): Promise<CreateAdminIfNoneResult>;
  setActive(id: UserId, isActive: boolean): Promise<void>;
  setVerifiedAt(id: UserId, verifiedAt: Date): Promise<AuthUser>;
  list(pagination: PaginationMode): Promise<ListUsersResult>;
  updateEmail(id: UserId, email: string): Promise<AuthUser>;
}

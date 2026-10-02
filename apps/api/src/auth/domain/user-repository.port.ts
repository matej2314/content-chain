import type { UserId, UserRole } from '@content-chain/shared';
import type { AuthUser } from './auth-user.types';

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
  list(): Promise<AuthUser[]>;
  updateEmail(id: UserId, email: string): Promise<AuthUser>;
}

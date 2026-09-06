import type { UserId, UserRole } from '@content-chain/shared';
import type { AuthUser } from './auth-user.types';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export type UserForAuth = AuthUser & { passwordHash: string };

export type CreateAdminIfNoneData = {
  id: UserId;
  email: string;
  passwordHash: string;
};

export type CreateAdminIfNoneResult =
  | { ok: true; user: AuthUser }
  | { ok: false; reason: 'admin-exists' };

export interface UserRepository {
  findForAuth(email: string): Promise<UserForAuth | null>;
  findById(id: UserId): Promise<AuthUser | null>;
  findAdminCount(): Promise<number>;
  create(data: {
    id: UserId;
    email: string;
    passwordHash: string;
    role: UserRole;
  }): Promise<AuthUser>;
  createAdminIfNone(
    data: CreateAdminIfNoneData,
  ): Promise<CreateAdminIfNoneResult>;
  setActive(id: UserId, isActive: boolean): Promise<void>;
  list(): Promise<AuthUser[]>;
}

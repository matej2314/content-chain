import type { UserId, UserRole } from '@content-chain/shared';
export type { AuthUserContext } from '../../shared/types/auth-user-context';

export type AuthUser = {
  id: UserId;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type JwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
};

import type { UserId, UserRole } from '@content-chain/shared';

export type AuthUserContext = {
  id: UserId;
  email: string;
  role: UserRole;
};

import type { UserRole } from '@content-chain/shared';

export const USER_ROLE_LABELS = {
  admin: 'Administrator',
  user: 'Użytkownik',
  guest: 'Gość',
} as const satisfies Record<UserRole, string>;

import type { UserRole } from '@content-chain/shared';
import { DomainException } from '@content-chain/domain-kit';

export function rejectDeadGuestSession(
  role: UserRole,
  demoMode: boolean,
): void {
  if (role === 'guest' && !demoMode) {
    throw new DomainException('UNAUTHORIZED', 'Invalid credentials', 401);
  }
}

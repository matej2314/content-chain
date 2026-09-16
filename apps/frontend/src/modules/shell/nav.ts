import type { UserRole } from '@content-chain/shared';

export type AppNavItem = {
  readonly href: '/context' | '/runs' | '/account' | '/users';
  readonly label: string;
  readonly icon: string;
  readonly adminOnly: boolean;
};

export const APP_NAV: readonly AppNavItem[] = [
  { href: '/context', label: 'Kontekst firmy', icon: 'lucide:building-2', adminOnly: false },
  { href: '/runs', label: 'Runy', icon: 'lucide:archive', adminOnly: false },
  { href: '/account', label: 'Konto', icon: 'lucide:circle-user', adminOnly: false },
  { href: '/users', label: 'Użytkownicy', icon: 'lucide:users', adminOnly: true },
] as const;

export function navItemsForRole(role: UserRole): readonly AppNavItem[] {
  return APP_NAV.filter((item) => !item.adminOnly || role === 'admin');
}

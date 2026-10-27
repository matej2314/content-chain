import type { Metadata } from 'next';
import { UsersView } from '@/modules/users/components/users-view';

export const metadata: Metadata = {
  title: 'Użytkownicy',
};

export default function UsersPage() {
  return <UsersView />;
}

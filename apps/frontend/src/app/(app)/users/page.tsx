'use client';

import Link from 'next/link';
import { useSession } from '@/modules/auth/components/session-provider';
import { UsersView } from '@/modules/users/components/users-view';

export default function UsersPage() {
  const { state } = useSession();
  if (state.status !== 'authenticated') return null;
  if (state.user.role !== 'admin') {
    return (
      <section className="flex max-w-xl flex-col gap-2">
        <h1 className="text-lg font-medium">Użytkownicy</h1>
        <p className="text-sm text-muted-foreground">Brak dostępu.</p>
        <Link href="/account" className="text-sm text-primary underline-offset-4 hover:underline">
          Wróć na Konto
        </Link>
      </section>
    );
  }
  return <UsersView />;
}

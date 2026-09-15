'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/shared/ui/skeleton';
import { LoginCard } from '@/modules/auth/components/login-card';
import { useSession } from '@/modules/auth/components/session-provider';

export function HomeEntry() {
  const router = useRouter();
  const { state } = useSession();

  useEffect(() => {
    if (state.status === 'authenticated') {
      router.replace('/account');
    }
  }, [router, state.status]);

  if (state.status === 'loading' || state.status === 'authenticated') {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-background p-4">
        <div className="flex w-full max-w-md flex-col gap-3 rounded-lg border bg-card p-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background p-4">
      <LoginCard />
    </div>
  );
}

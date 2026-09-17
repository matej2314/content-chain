'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/shared/ui/skeleton';
import { useSession } from '@/modules/auth/components/session-provider';
import { AppHeader } from '@/modules/shell/components/app-header';
import { AppSidebar } from '@/modules/shell/components/app-sidebar';
import { FloatingBoxSlot } from '@/modules/shell/components/chrome-slots';
import { CompletenessProvider } from '@/modules/company-context/components/completeness-provider';
import { OwnRunsProvider } from '@/modules/runs/components/own-runs-provider';
import { EventSourceRegistryProvider } from '@/modules/shell/components/event-source-registry-provider';

export function DashboardShell({ children }: { readonly children: ReactNode }) {
  const router = useRouter();
  const { state } = useSession();

  useEffect(() => {
    if (state.status === 'anonymous') {
      router.replace('/');
    }
  }, [router, state.status]);

  if (state.status !== 'authenticated') {
    return (
      <div className="flex min-h-dvh">
        <Skeleton className="hidden h-dvh w-56 md:block" />
        <div className="flex flex-1 flex-col">
          <Skeleton className="h-12 w-full" />
          <div className="p-4">
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <EventSourceRegistryProvider>
      <CompletenessProvider>
        <OwnRunsProvider>
          <div className="flex min-h-dvh bg-background">
            <div className="hidden md:block">
              <AppSidebar role={state.user.role} />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <AppHeader user={state.user} />
              <main className="min-w-0 flex-1 p-4 text-sm">{children}</main>
            </div>
            <FloatingBoxSlot />
          </div>
        </OwnRunsProvider>
      </CompletenessProvider>
    </EventSourceRegistryProvider>
  );
}

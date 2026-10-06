'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/shared/ui/skeleton';
import { useSession } from '@/modules/auth/components/session-provider';
import { AppHeader } from '@/modules/shell/components/app-header';
import { AppSidebar } from '@/modules/shell/components/app-sidebar';
import { FloatingBoxSlot } from '@/modules/shell/components/chrome-slots';
import { CompletenessProvider } from '@/modules/company-context/components/completeness-provider';
import { DemoModeProvider } from '@/modules/demo/components/demo-mode-provider';
import { GatewayAliveProvider } from '@/modules/health/components/gateway-alive-provider';
import { OwnRunsProvider } from '@/modules/runs/components/own-runs-provider';
import { EventSourceRegistryProvider } from '@/modules/shell/components/event-source-registry-provider';
import { Toaster } from '@/shared/ui/sonner';
import { TooltipProvider } from '@/shared/ui/tooltip';

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
      <div className="flex h-dvh overflow-hidden">
        <Skeleton className="hidden h-full w-56 md:block" />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <Skeleton className="h-12 w-full shrink-0" />
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <EventSourceRegistryProvider>
      <DemoModeProvider>
        <CompletenessProvider>
          <GatewayAliveProvider>
            <OwnRunsProvider>
              <TooltipProvider>
                <div className="flex h-dvh overflow-hidden bg-background">
                  <div className="hidden h-full md:block">
                    <AppSidebar role={state.user.role} />
                  </div>
                  <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                    <AppHeader user={state.user} />
                    <main className="min-h-0 min-w-0 flex-1 overflow-y-auto p-4 text-sm">
                      {children}
                    </main>
                  </div>
                  <FloatingBoxSlot />
                </div>
                <Toaster />
              </TooltipProvider>
            </OwnRunsProvider>
          </GatewayAliveProvider>
        </CompletenessProvider>
      </DemoModeProvider>
    </EventSourceRegistryProvider>
  );
}

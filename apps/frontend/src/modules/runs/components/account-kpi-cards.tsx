'use client';

import { useEffect, useRef, useState } from 'react';
import type { RunsSummaryResponse } from '@content-chain/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';
import { useSession, type SessionState } from '@/modules/auth/components/session-provider';
import { useDemoMode, type DemoModeState } from '@/modules/demo/components/demo-mode-provider';
import { fetchRunsSummary } from '@/modules/runs/api/runs.api';
import { RUN_TASK_TYPE_LABELS } from '@/modules/runs/api/run-labels';
import { formatKpiWindow } from '@/modules/runs/lib/format-kpi-window';

type KpiGate = 'hidden' | 'pending-demo' | 'allowed';

type FetchResult =
  | { readonly key: string; readonly status: 'ready'; readonly summary: RunsSummaryResponse }
  | { readonly key: string; readonly status: 'failed' };

function shouldFetchKpi(role: string, demoReady: boolean, demoMode: boolean): boolean {
  if (role === 'admin' || role === 'user') return true;
  if (role === 'guest') return demoReady && demoMode;
  return false;
}

function resolveKpiGate(
  session: SessionState,
  demo: DemoModeState,
): { readonly gate: KpiGate; readonly fetchKey: string | null } {
  if (session.status !== 'authenticated') {
    return { gate: 'hidden', fetchKey: null };
  }

  const demoReady = demo.status === 'ready';
  const demoMode = demo.status === 'ready' ? demo.demoMode : false;
  const { role } = session.user;

  if (role === 'guest' && demo.status === 'loading') {
    return { gate: 'pending-demo', fetchKey: null };
  }

  if (!shouldFetchKpi(role, demoReady, demoMode)) {
    return { gate: 'hidden', fetchKey: null };
  }

  return {
    gate: 'allowed',
    fetchKey: `${role}:${demoReady ? String(demoMode) : 'pending'}`,
  };
}

function KpiSkeleton() {
  return (
    <section className="flex max-w-3xl flex-col gap-3" data-slot="account-kpi" aria-busy="true">
      <h2 className="text-base font-medium">Statystyki</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </section>
  );
}

export function AccountKpiCards() {
  const { state: session } = useSession();
  const { state: demo } = useDemoMode();
  const { gate, fetchKey } = resolveKpiGate(session, demo);
  const [fetchResult, setFetchResult] = useState<FetchResult | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (gate !== 'allowed' || fetchKey === null) {
      return;
    }

    const requestId = ++requestIdRef.current;
    const key = fetchKey;

    void fetchRunsSummary()
      .then((summary) => {
        if (requestId !== requestIdRef.current) return;
        setFetchResult({ key, status: 'ready', summary });
      })
      .catch((reason: unknown) => {
        if (requestId !== requestIdRef.current) return;
        void reason;
        setFetchResult({ key, status: 'failed' });
      });

    return () => {
      requestIdRef.current += 1;
    };
  }, [gate, fetchKey]);

  if (gate === 'hidden') {
    return null;
  }

  if (gate === 'pending-demo') {
    return <KpiSkeleton />;
  }

  const matched =
    fetchResult !== null && fetchResult.key === fetchKey ? fetchResult : null;

  if (matched === null) {
    return <KpiSkeleton />;
  }

  if (matched.status === 'failed') {
    return null;
  }

  const { summary } = matched;
  const topLabel =
    summary.topTaskTypeLast30d === null
      ? '—'
      : RUN_TASK_TYPE_LABELS[summary.topTaskTypeLast30d];

  const cards: readonly { readonly title: string; readonly value: string }[] = [
    { title: 'Runy (30 dni)', value: String(summary.totalLast30d) },
    {
      title: 'Skuteczność',
      value: `${summary.successRateLast30d.toLocaleString('pl-PL', {
        maximumFractionDigits: 1,
        minimumFractionDigits: 0,
      })}%`,
    },
    { title: 'Aktywne teraz', value: String(summary.activeNow) },
    { title: 'Najczęstszy typ', value: topLabel },
  ];

  return (
    <section className="flex max-w-4xl flex-col gap-3" data-slot="account-kpi">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-base font-medium">Statystyki</h2>
        <p className="text-xs text-muted-foreground">
          Okno: {formatKpiWindow(summary.windowFrom, summary.windowTo)}
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} className="border bg-card shadow-none">
            <CardHeader className="gap-1 px-4 pt-4 pb-1">
              <CardTitle className="font-secondary text-[1rem] font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <p className="text-lg font-semibold tabular-nums tracking-tight">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

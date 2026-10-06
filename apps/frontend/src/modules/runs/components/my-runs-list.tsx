'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { RunId } from '@content-chain/shared';
import { Button } from '@/shared/ui/button';
import { EnvelopeError } from '@/shared/ui/form-field';
import { Skeleton } from '@/shared/ui/skeleton';
import { CancelRunDialog } from '@/modules/runs/components/cancel-run-dialog';
import { useOwnRuns } from '@/modules/runs/components/own-runs-provider';
import { RunStatusView } from '@/modules/runs/components/run-status';
import { isCancelableRunStatus } from '@/modules/runs/api/runs.types';
import { RUN_PLATFORM_LABELS, RUN_TASK_TYPE_LABELS } from '@/modules/runs/api/run-labels';
import { IsoDateTime } from '@/shared/datetime/iso-date-time';

/** Matches archive listing `pageSize` (SPEC-RUNY R-3a / UI Runy). */
const PAGE_SIZE = 10;

type MyRunsListProps = {
  readonly onPrefill: (runId: RunId) => void;
};

export function MyRunsList({ onPrefill }: MyRunsListProps) {
  const { state, patchStatus, refresh } = useOwnRuns();
  const [cancelTarget, setCancelTarget] = useState<RunId | null>(null);
  const [page, setPage] = useState(1);

  const total = state.status === 'ready' ? state.items.length : 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  if (state.status === 'loading') {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }
  if (state.status === 'error') {
    return <EnvelopeError code={state.envelope.code} message={state.envelope.message} />;
  }
  if (state.items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Brak własnych runów. Uruchom pierwszy z formularza powyżej.
      </p>
    );
  }

  const safePage = Math.min(page, totalPages);
  const pageItems = state.items.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto">
        <table className="w-full min-w-xl text-left text-sm">
          <thead>
            <tr className="border-b text-xs text-muted-foreground">
              <th className="py-2 pr-3 font-medium">Typ</th>
              <th className="py-2 pr-3 font-medium">Platforma</th>
              <th className="py-2 pr-3 font-medium">Status</th>
              <th className="py-2 pr-3 font-medium">Utworzono</th>
              <th className="py-2 font-medium">Akcje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {pageItems.map((item) => (
              <tr key={item.runId}>
                <td className="py-2 pr-3">
                  <Link href={`/runs/${item.runId}`} className="underline-offset-4 hover:underline">
                    {RUN_TASK_TYPE_LABELS[item.taskType]}
                  </Link>
                </td>
                <td className="py-2 pr-3">{RUN_PLATFORM_LABELS[item.platform]}</td>
                <td className="py-2 pr-3">
                  <RunStatusView status={item.status} compact />
                </td>
                <td className="py-2 pr-3">
                  <IsoDateTime iso={item.createdAt} />
                </td>
                <td className="py-2">
                  <div className="flex flex-wrap items-center gap-1">
                    {isCancelableRunStatus(item.status) ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCancelTarget(item.runId)}
                      >
                        Stop
                      </Button>
                    ) : null}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onPrefill(item.runId)}
                    >
                      Nowy z tym briefem
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={safePage <= 1}
          onClick={() => setPage((current) => Math.max(1, current - 1))}
        >
          Poprzednia
        </Button>
        <p className="tabular-nums text-muted-foreground">
          {safePage} / {totalPages} ({total})
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={safePage >= totalPages}
          onClick={() => setPage((current) => current + 1)}
        >
          Następna
        </Button>
      </div>
      <CancelRunDialog
        open={cancelTarget !== null}
        onOpenChange={(open) => {
          if (!open) setCancelTarget(null);
        }}
        runId={cancelTarget}
        onCancelled={(snapshot) => {
          patchStatus(snapshot.runId, snapshot.status);
          void refresh();
        }}
      />
    </div>
  );
}

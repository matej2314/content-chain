'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { RunId } from '@content-chain/shared';
import { ApiError } from '@/shared/api/envelope';
import { Button } from '@/shared/ui/button';
import { EnvelopeError } from '@/shared/ui/form-field';
import { Skeleton } from '@/shared/ui/skeleton';
import { CancelRunDialog } from '@/modules/runs/components/cancel-run-dialog';
import { useOwnRuns } from '@/modules/runs/components/own-runs-provider';
import { RunStatusView } from '@/modules/runs/components/run-status';
import { useSession } from '@/modules/auth/components/session-provider';
import { fetchUserRunsPage } from '@/modules/runs/api/runs.api';
import {
  isCancelableRunStatus,
  type UserRunItem,
} from '@/modules/runs/api/runs.types';
import { RUN_PLATFORM_LABELS, RUN_TASK_TYPE_LABELS } from '@/modules/runs/api/run-labels';
import { IsoDateTime } from '@/shared/datetime/iso-date-time';
import { ListPaginationBar } from '@/shared/pagination/list-pagination-bar';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  totalPagesFromMeta,
  type PageSize,
} from '@/shared/pagination/page-size';

type MyRunsListProps = {
  readonly onPrefill: (runId: RunId) => void;
};

type PageState =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly code: string; readonly message: string }
  | {
      readonly status: 'ready';
      readonly items: readonly UserRunItem[];
      readonly total: number;
      readonly pageSize: number;
    };

const FALLBACK = {
  code: 'INTERNAL_ERROR',
  message: 'Nie udało się odczytać odpowiedzi.',
} as const;

export function MyRunsList({ onPrefill }: MyRunsListProps) {
  const { state: session } = useSession();
  const userId = session.status === 'authenticated' ? session.user.id : null;
  const { state: ownState, patchStatus, refresh } = useOwnRuns();
  const [cancelTarget, setCancelTarget] = useState<RunId | null>(null);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState<PageSize>(DEFAULT_PAGE_SIZE);
  const [reloadToken, setReloadToken] = useState(0);
  const [list, setList] = useState<PageState>({ status: 'loading' });

  const ownRunIdsKey =
    ownState.status === 'ready' ? ownState.items.map((item) => item.runId).join(',') : ownState.status;

  const ownStatusById = useMemo(() => {
    const map = new Map<RunId, UserRunItem['status']>();
    if (ownState.status === 'ready') {
      for (const item of ownState.items) {
        map.set(item.runId, item.status);
      }
    }
    return map;
  }, [ownState]);

  useEffect(() => {
    if (!userId) return;
    const id = userId;
    let cancelled = false;
    async function load(): Promise<void> {
      setList((current) =>
        current.status === 'ready' ? current : { status: 'loading' },
      );
      try {
        const data = await fetchUserRunsPage(id, { page, pageSize });
        if (cancelled) return;
        if (data.total > 0 && data.items.length === 0 && page > 1) {
          setPage((current) => Math.max(DEFAULT_PAGE, current - 1));
          return;
        }
        setList({
          status: 'ready',
          items: data.items,
          total: data.total,
          pageSize: data.pageSize,
        });
      } catch (reason: unknown) {
        if (cancelled) return;
        if (reason instanceof ApiError) {
          setList({
            status: 'error',
            code: reason.envelope.code,
            message: reason.envelope.message,
          });
          return;
        }
        setList({ status: 'error', ...FALLBACK });
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [userId, page, pageSize, ownRunIdsKey, reloadToken]);

  if (!userId || list.status === 'loading') {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }
  if (list.status === 'error') {
    return <EnvelopeError code={list.code} message={list.message} />;
  }
  if (list.total === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Brak własnych runów. Uruchom pierwszy z formularza powyżej.
      </p>
    );
  }

  const totalPages = totalPagesFromMeta(list.total, list.pageSize);
  const rows = list.items.map((item) => {
    const liveStatus = ownStatusById.get(item.runId);
    return liveStatus && liveStatus !== item.status
      ? { ...item, status: liveStatus }
      : item;
  });

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
            {rows.map((item) => (
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
      <ListPaginationBar
        sizeSelectId="my-runs-page-size"
        page={page}
        pageSize={pageSize}
        total={list.total}
        totalPages={totalPages}
        onPageChange={setPage}
        onPageSizeChange={(next) => {
          setPageSize(next);
          setPage(DEFAULT_PAGE);
        }}
      />
      <CancelRunDialog
        open={cancelTarget !== null}
        onOpenChange={(open) => {
          if (!open) setCancelTarget(null);
        }}
        runId={cancelTarget}
        onCancelled={(snapshot) => {
          patchStatus(snapshot.runId, snapshot.status);
          void refresh();
          setReloadToken((n) => n + 1);
        }}
      />
    </div>
  );
}

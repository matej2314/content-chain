'use client';

import Link from 'next/link';
import type { RunId } from '@content-chain/shared';
import { Button } from '@/shared/ui/button';
import { EnvelopeError } from '@/shared/ui/form-field';
import { Skeleton } from '@/shared/ui/skeleton';
import { useOwnRuns } from '@/modules/runs/components/own-runs-provider';
import { RunStatusView } from '@/modules/runs/components/run-status';
import { RUN_PLATFORM_LABELS, RUN_TASK_TYPE_LABELS } from '@/modules/runs/api/run-labels';

type MyRunsListProps = {
  readonly onPrefill: (runId: RunId) => void;
};

export function MyRunsList({ onPrefill }: MyRunsListProps) {
  const { state } = useOwnRuns();

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

  return (
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
          {state.items.map((item) => (
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
              <td className="py-2 pr-3 font-mono text-xs tabular-nums">{item.createdAt}</td>
              <td className="py-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onPrefill(item.runId)}
                >
                  Nowy z tym briefem
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

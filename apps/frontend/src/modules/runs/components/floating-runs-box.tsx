'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Button } from '@/shared/ui/button';
import { useOwnRuns } from '@/modules/runs/components/own-runs-provider';
import { RunStatusView } from '@/modules/runs/components/run-status';
import { RUN_TASK_TYPE_LABELS } from '@/modules/runs/api/run-labels';

export function FloatingRunsBox() {
  const { inProgress } = useOwnRuns();
  const [collapsed, setCollapsed] = useState(false);

  if (inProgress.length === 0) return null;

  return (
    <section
      data-slot="floating-box"
      className="fixed right-4 bottom-4 z-(--z-overlay) w-80 max-w-[calc(100%-2rem)] rounded-lg border border-border bg-card text-sm"
    >
      <div className="flex items-center justify-between gap-2 border-b px-3 py-2">
        <p className="font-medium">Runy w toku ({inProgress.length})</p>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-expanded={!collapsed}
          aria-label={collapsed ? 'Rozwiń' : 'Zwiń'}
          onClick={() => setCollapsed((value) => !value)}
        >
          <Icon
            icon={collapsed ? 'lucide:chevron-up' : 'lucide:chevron-down'}
            className="size-3.5"
          />
        </Button>
      </div>
      {collapsed ? null : (
        <ul className="flex flex-col divide-y divide-border">
          {inProgress.map((item) => (
            <li key={item.runId} className="flex flex-col gap-1 px-3 py-2">
              <RunStatusView status={item.status} compact />
              <p className="text-xs text-muted-foreground">{RUN_TASK_TYPE_LABELS[item.taskType]}</p>
              <Link
                href={`/runs/${item.runId}`}
                className="text-xs underline-offset-4 hover:underline"
              >
                Szczegóły
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

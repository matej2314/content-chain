import type { RunStatus } from '@content-chain/shared';
import { cn } from '@/shared/utils/utils';
import { RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS } from '@/modules/runs/api/run-labels';

type RunStatusViewProps = {
  readonly status: RunStatus;
  readonly compact?: boolean;
  readonly className?: string;
};

export function RunStatusView({ status, compact = false, className }: RunStatusViewProps) {
  const label = compact ? RUN_STATUS_SHORT_LABELS[status] : RUN_STATUS_LABELS[status];
  const liveMotion = status === 'running' || status === 'awaiting_hitl';
  return (
    <span
      data-slot="run-status"
      data-status={status}
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-medium tabular-nums',
        status === 'interrupted' && 'text-muted-foreground',
        status === 'failed' && 'text-destructive',
        status === 'queued' && 'text-muted-foreground',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'size-1.5 shrink-0 rounded-full bg-foreground/50',
          status === 'running' && 'bg-foreground',
          status === 'awaiting_hitl' && 'rounded-sm bg-foreground/80',
          status === 'interrupted' && 'bg-muted-foreground',
          liveMotion && 'motion-safe:animate-pulse',
        )}
      />
      {label}
    </span>
  );
}

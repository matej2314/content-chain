import type { RunStatus } from '@content-chain/shared';
import { cn } from '@/shared/utils/utils';
import { RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS } from '@/modules/runs/api/run-labels';

type RunStatusViewProps = {
  readonly status: RunStatus;
  readonly compact?: boolean;
  readonly className?: string;
};

const STATUS_PILL: Record<RunStatus, string> = {
  running: 'border-success/40 bg-success/15 text-success',
  awaiting_hitl: 'border-warning/50 bg-warning/20 text-warning-foreground',
  completed: 'border-completed/40 bg-completed/15 text-completed',
  failed: 'border-destructive/40 bg-destructive/15 text-destructive',
  interrupted: 'border-interrupted/40 bg-interrupted/15 text-interrupted',
  cancelled: 'border-cancelled/40 bg-cancelled/20 text-cancelled-foreground',
  queued: 'border-queued/40 bg-queued/15 text-queued',
};

export function RunStatusView({ status, compact = false, className }: RunStatusViewProps) {
  const label = compact ? RUN_STATUS_SHORT_LABELS[status] : RUN_STATUS_LABELS[status];
  const liveMotion = status === 'running' || status === 'awaiting_hitl';

  return (
    <span
      data-slot="run-status"
      data-status={status}
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium tabular-nums',
        STATUS_PILL[status],
        liveMotion && 'motion-safe:animate-pulse',
        className,
      )}
    >
      {label}
    </span>
  );
}

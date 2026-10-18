import type { RunStatus } from '@content-chain/shared';
import { cn } from '@/shared/utils/utils';
import { RunStatusView } from '@/modules/runs/components/run-status';

type RunLiveHeroProps = {
  readonly status: RunStatus;
  readonly className?: string;
};

export function RunLiveHero({ status, className }: RunLiveHeroProps) {
  if (status !== 'running' && status !== 'awaiting_hitl') {
    return null;
  }

  return (
    <div
      data-slot="run-live-hero"
      data-status={status}
      className={cn(
        'rounded-lg border px-4 py-3',
        status === 'running' &&
        'border-success/30 bg-linear-to-r from-success/25 via-success/10 to-transparent',
        status === 'awaiting_hitl' &&
        'border-warning/40 bg-linear-to-r from-warning/30 via-warning/10 to-transparent',
        'motion-safe:animate-pulse',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-medium">
          {status === 'running' ? 'Run w toku' : 'Oczekuje na decyzję HITL'}
        </p>
        <RunStatusView status={status} />
      </div>
    </div>
  );
}

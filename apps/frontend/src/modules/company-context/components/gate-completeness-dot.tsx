import { cn } from '@/shared/utils/utils';
import {
  CONTEXT_TAB_LABELS,
  gateTabIsMissing,
  type ContextTab,
  type GateSection,
} from '@/modules/company-context/api/company-context.types';

type GateCompletenessDotProps = {
  readonly tab: ContextTab;
  readonly missing: readonly GateSection[];
};

export function GateCompletenessDot({ tab, missing }: GateCompletenessDotProps) {
  const missingFlag = gateTabIsMissing(tab, missing);
  if (missingFlag === null) return null;

  return (
    <span className="inline-flex items-center" data-slot="gate-completeness-dot">
      <span
        aria-hidden
        className={cn(
          'size-1.5 shrink-0 rounded-full',
          missingFlag ? 'bg-destructive' : 'bg-[oklch(0.48_0.11_150)]',
        )}
      />
      <span className="sr-only">{missingFlag ? 'niekompletna' : 'kompletna'}</span>
    </span>
  );
}

export function gateTabAriaLabel(tab: ContextTab, missing: readonly GateSection[]): string {
  const label = CONTEXT_TAB_LABELS[tab];
  const missingFlag = gateTabIsMissing(tab, missing);
  if (missingFlag === null) return label;
  return `${label}, ${missingFlag ? 'niekompletna' : 'kompletna'}`;
}

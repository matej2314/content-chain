'use client';

import { useMemo, type ReactNode } from 'react';
import { useCompleteness } from '@/modules/company-context/components/completeness-provider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';

export function useStartRunGate(): {
  readonly agentsActive: boolean;
  readonly disableReason: string | null;
} {
  const { state: completeness } = useCompleteness();
  const agentsActive = completeness.status === 'ready' && completeness.completeness.complete;

  const disableReason = useMemo(() => {
    if (completeness.status === 'loading') return 'Sprawdzanie kompletności kontekstu…';
    if (completeness.status === 'error') return 'Nie można potwierdzić bramki kontekstu.';
    if (!agentsActive) return 'Agenci nieaktywni. Uzupełnij kontekst firmy.';
    return null;
  }, [agentsActive, completeness]);

  return { agentsActive, disableReason };
}

export function AgentsGateTooltip({
  reason,
  children,
}: {
  readonly reason: string | null;
  readonly children: ReactNode;
}): ReactNode {
  if (reason === null) return children;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-block w-fit">{children}</span>
      </TooltipTrigger>
      <TooltipContent>{reason}</TooltipContent>
    </Tooltip>
  );
}

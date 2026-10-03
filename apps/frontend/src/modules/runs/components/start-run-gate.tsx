'use client';

import { useMemo, type ReactNode } from 'react';
import { useCompleteness } from '@/modules/company-context/components/completeness-provider';
import { useGatewayAlive } from '@/modules/health/components/gateway-alive-provider';
import {
  agentsActiveDisableReason,
  computeAgentsActive,
} from '@/modules/health/lib/agents-active';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';

export function useStartRunGate(): {
  readonly agentsActive: boolean;
  readonly disableReason: string | null;
} {
  const { state: completeness } = useCompleteness();
  const { state: gateway } = useGatewayAlive();

  const agentsActive = useMemo(
    () => computeAgentsActive(completeness, gateway),
    [completeness, gateway],
  );

  const disableReason = useMemo(
    () => agentsActiveDisableReason(completeness, gateway),
    [completeness, gateway],
  );

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

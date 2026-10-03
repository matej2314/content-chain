import type { CompletenessState } from '@/modules/company-context/api/company-context.types';
import type { GatewayAliveState } from '@/modules/health/components/gateway-alive-provider';

export const AGENTS_INACTIVE_COPY =
  'Agenci nieaktywni.\nSprawdź kontekst i stan gatewaya.' as const;

export function computeAgentsActive(
  completeness: CompletenessState,
  gateway: GatewayAliveState,
): boolean {
  return (
    completeness.status === 'ready' &&
    completeness.completeness.complete &&
    gateway.status === 'ready' &&
    gateway.gatewayAlive
  );
}

export function agentsActiveDisableReason(
  completeness: CompletenessState,
  gateway: GatewayAliveState,
): string | null {
  if (completeness.status === 'loading') {
    return 'Sprawdzanie kompletności kontekstu…';
  }
  if (completeness.status === 'error') {
    return 'Nie można potwierdzić bramki kontekstu.';
  }
  if (gateway.status === 'loading') {
    return 'Sprawdzanie stanu gatewaya…';
  }
  if (gateway.status === 'error') {
    return 'Nie można potwierdzić stanu gatewaya.';
  }
  if (!computeAgentsActive(completeness, gateway)) {
    return AGENTS_INACTIVE_COPY;
  }
  return null;
}

import type { RunStatus } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';

const ALLOWED_RUN_STATES: Record<RunStatus, readonly RunStatus[]> = {
  queued: ['running', 'cancelled'],
  running: ['awaiting_hitl', 'completed', 'failed', 'interrupted', 'cancelled'],
  interrupted: ['running', 'failed', 'cancelled'],
  awaiting_hitl: ['running', 'cancelled'],
  completed: [],
  failed: [],
  cancelled: [],
};

export function assertTransition(from: RunStatus, to: RunStatus): void {
  if (!ALLOWED_RUN_STATES[from].includes(to)) {
    throw new DomainException(
      'CONFLICT',
      `Illegal run status transition: ${from} -> ${to}`,
      409,
      [{ from, to }],
    );
  }
}

export function canTransition(from: RunStatus, to: RunStatus): boolean {
  return ALLOWED_RUN_STATES[from].includes(to);
}

export const CANCELABLE_RUN_STATUSES = [
  'queued',
  'running',
  'awaiting_hitl',
  'interrupted',
] as const satisfies readonly RunStatus[];

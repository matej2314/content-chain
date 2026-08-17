import type { RunStatus } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';

const ALLOWED: Record<RunStatus, readonly RunStatus[]> = {
  queued: ['running'],
  running: ['awaiting_hitl', 'completed', 'failed'],
  awaiting_hitl: ['running'],
  completed: [],
  failed: [],
};

export function assertTransition(from: RunStatus, to: RunStatus): void {
  if (!ALLOWED[from].includes(to)) {
    throw new DomainException(
      'CONFLICT',
      `Illegal run status transition: ${from} -> ${to}`,
      409,
      [{ from, to }],
    );
  }
}

export function canTransition(from: RunStatus, to: RunStatus): boolean {
  return ALLOWED[from].includes(to);
}

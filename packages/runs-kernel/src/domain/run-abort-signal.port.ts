import type { RunId } from '@content-chain/shared';

export const RUN_ABORT_SIGNAL = Symbol('RUN_ABORT_SIGNAL');

export interface RunAbortSignalPort {
  requestCancel(runId: RunId): Promise<void>;
}

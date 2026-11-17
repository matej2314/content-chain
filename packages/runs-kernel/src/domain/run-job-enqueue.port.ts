import type { RunId } from '@content-chain/shared';

export const RUN_JOB_ENQUEUE = Symbol('RUN_JOB_ENQUEUE');

export interface RunJobEnqueuePort {
  enqueueWake(runId: RunId): Promise<void>;
  enqueueExecute(runId: RunId): Promise<void>;
}

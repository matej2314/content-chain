import type { RunRecord } from './run.types';

export const RUN_EXECUTOR = Symbol('RUN_EXECUTOR');

export interface RunExecutorPort {
  execute(run: RunRecord): Promise<void>;
}

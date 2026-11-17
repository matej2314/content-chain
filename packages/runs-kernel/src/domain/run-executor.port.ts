import type { RunRecord } from './run.types';

export const RUN_EXECUTOR = Symbol('RUN_EXECUTOR');

export type RunExecuteOptions = {
  signal?: AbortSignal;
};

export interface RunExecutorPort {
  execute(run: RunRecord, options?: RunExecuteOptions): Promise<void>;
}

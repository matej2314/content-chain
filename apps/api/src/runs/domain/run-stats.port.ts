import type { RunStatus } from '@content-chain/shared';

export const RUN_STATS_PORT = Symbol('RUN_STATS_PORT');

export interface RunStatsPort {
  countByStatus(): Promise<ReadonlyMap<RunStatus, number>>;
}

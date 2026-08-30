import type { RunLifecycleService } from '../application/run-lifecycle.service';

export const RUN_LIFECYCLE = Symbol('RUN_LIFECYCLE');

export type RunLifecyclePort = Pick<
  RunLifecycleService,
  'appendLog' | 'transition'
>;

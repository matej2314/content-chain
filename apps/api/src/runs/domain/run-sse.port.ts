import type { Observable } from 'rxjs';
import type { RunId, RunStatus } from '@content-chain/shared';
import type { RunLogEntry } from './run.types';

export const RUN_SSE_HUB = Symbol('RUN_SSE_HUB');

export type RunSseEvent =
  | { event: 'run.status'; data: { runId: RunId; status: RunStatus } }
  | { event: 'run.log'; data: RunLogEntry & { runId: RunId } }
  | { event: 'run.hitl'; data: { runId: RunId; options: unknown[] } }
  | { event: 'run.completed'; data: { runId: RunId; resultSummary?: string } }
  | {
      event: 'run.failed';
      data: { runId: RunId; code?: string; message: string };
    };

export interface RunSseHub {
  subscribe(runId: RunId): Observable<RunSseEvent>;
  publish(event: RunSseEvent): void;
  complete(runId: RunId): void;
}

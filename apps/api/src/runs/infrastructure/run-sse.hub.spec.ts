import { firstValueFrom, toArray } from 'rxjs';
import type { Env } from '../../shared/config/env';
import { newRunId } from '../../shared/http/new-ids';
import { InMemoryRunSseHub } from './run-sse.hub';

const TTL_MS = 1_000;

function testEnv(overrides: Partial<Env> = {}): Env {
  return { RUN_SSE_SUBJECT_TTL_MS: 600_000, ...overrides } as Env;
}

describe('InMemoryRunSseHub', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('complete emits to subscriber, deletes the map entry, and is idempotent', async () => {
    const hub = new InMemoryRunSseHub(testEnv());
    const runId = newRunId();
    const seen = firstValueFrom(hub.subscribe(runId).pipe(toArray()));

    hub.publish({
      event: 'run.status',
      data: { runId, status: 'running' },
    });
    expect(hub.has(runId)).toBe(true);

    hub.complete(runId);
    hub.complete(runId);

    await expect(seen).resolves.toEqual([
      { event: 'run.status', data: { runId, status: 'running' } },
    ]);
    expect(hub.has(runId)).toBe(false);
  });

  it('publish after complete does not recreate a subject', () => {
    const hub = new InMemoryRunSseHub(testEnv());
    const runId = newRunId();
    hub.subscribe(runId).subscribe();
    hub.complete(runId);
    expect(hub.has(runId)).toBe(false);

    hub.publish({
      event: 'run.status',
      data: { runId, status: 'completed' },
    });
    expect(hub.has(runId)).toBe(false);
  });

  it('unsubscribe of a client does not evict a living subject', () => {
    const hub = new InMemoryRunSseHub(testEnv());
    const runId = newRunId();
    const sub = hub.subscribe(runId).subscribe();
    expect(hub.has(runId)).toBe(true);
    sub.unsubscribe();
    expect(hub.has(runId)).toBe(true);
  });

  it('closes the subject with an error after TTL and deletes the map entry', () => {
    jest.useFakeTimers();

    const hub = new InMemoryRunSseHub(testEnv({ RUN_SSE_SUBJECT_TTL_MS: TTL_MS }));
    const runId = newRunId();
    const errors: unknown[] = [];
    hub.subscribe(runId).subscribe({
      error: (err) => errors.push(err),
    });

    expect(hub.has(runId)).toBe(true);

    jest.advanceTimersByTime(TTL_MS);

    expect(hub.has(runId)).toBe(false);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(Error);
    expect((errors[0] as Error).message).toContain(
      `SSE subject TTL exceeded for run ${runId}`,
    );
  });

  it('TTL timer does not error a subject already completed', () => {
    jest.useFakeTimers();
    const hub = new InMemoryRunSseHub(testEnv({ RUN_SSE_SUBJECT_TTL_MS: TTL_MS }));
    const runId = newRunId();
    const errors: unknown[] = [];
    hub.subscribe(runId).subscribe({
      error: (err) => errors.push(err),
    });

    hub.complete(runId);
    expect(jest.getTimerCount()).toBe(0);

    jest.advanceTimersByTime(TTL_MS);

    expect(errors).toEqual([]);
    expect(hub.has(runId)).toBe(false);
  });
});

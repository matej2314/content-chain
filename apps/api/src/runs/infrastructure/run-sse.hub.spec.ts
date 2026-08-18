import { firstValueFrom, toArray } from 'rxjs';
import { newRunId } from '../../shared/http/new-ids';
import { InMemoryRunSseHub } from './run-sse.hub';

describe('InMemoryRunSseHub', () => {
  it('complete emits to subscriber, deletes the map entry, and is idempotent', async () => {
    const hub = new InMemoryRunSseHub();
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
    const hub = new InMemoryRunSseHub();
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
    const hub = new InMemoryRunSseHub();
    const runId = newRunId();
    const sub = hub.subscribe(runId).subscribe();
    expect(hub.has(runId)).toBe(true);
    sub.unsubscribe();
    expect(hub.has(runId)).toBe(true);
  });
});

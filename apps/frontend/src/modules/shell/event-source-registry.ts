import type { RunId } from '@content-chain/shared';

export type EventSourceRegistry = {
  acquire: (runId: RunId) => EventSource;
  release: (runId: RunId) => void;
  peek: (runId: RunId) => EventSource | undefined;
};

export function createEventSourceRegistry(): EventSourceRegistry {
  const connections = new Map<RunId, EventSource>();

  return {
    acquire(runId: RunId): EventSource {
      const existing = connections.get(runId);
      if (existing) return existing;
      const source = new EventSource(`/api/v1/runs/${runId}/events`, {
        withCredentials: true,
      });
      connections.set(runId, source);
      return source;
    },
    release(runId: RunId): void {
      const existing = connections.get(runId);
      if (!existing) return;
      existing.close();
      connections.delete(runId);
    },
    peek(runId: RunId): EventSource | undefined {
      return connections.get(runId);
    },
  };
}

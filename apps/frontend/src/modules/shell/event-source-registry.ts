import type { RunId } from '@content-chain/shared';

export type EventSourceRegistry = {
  acquire: (runId: RunId) => EventSource;
  release: (runId: RunId) => void;
  peek: (runId: RunId) => EventSource | undefined;
  closeAll: () => void;
};

type RegistryEntry = {
  readonly source: EventSource;
  refs: number;
};

export function createEventSourceRegistry(): EventSourceRegistry {
  const connections = new Map<RunId, RegistryEntry>();

  return {
    acquire(runId: RunId): EventSource {
      const existing = connections.get(runId);
      if (existing) {
        existing.refs += 1;
        return existing.source;
      }
      const source = new EventSource(`/api/v1/runs/${runId}/events`, {
        withCredentials: true,
      });
      connections.set(runId, { source, refs: 1 });
      return source;
    },
    release(runId: RunId): void {
      const existing = connections.get(runId);
      if (!existing) return;
      existing.refs -= 1;
      if (existing.refs > 0) return;
      existing.source.close();
      connections.delete(runId);
    },
    peek(runId: RunId): EventSource | undefined {
      return connections.get(runId)?.source;
    },
    closeAll(): void {
      for (const entry of connections.values()) {
        entry.source.close();
      }
      connections.clear();
    },
  };
}

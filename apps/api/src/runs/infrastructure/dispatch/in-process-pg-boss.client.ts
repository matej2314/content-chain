import type { PgBossJob, PgBossWorkerClient } from './pg-boss.tokens';

type WorkHandler = (jobs: PgBossJob[]) => Promise<void>;

/**
 * In-memory pg-boss surface for NODE_ENV=test (Jest e2e without ESM load).
 * Production / worker containers use loadPgBoss() instead.
 */
export function createInProcessPgBossClient(): PgBossWorkerClient {
  const handlers = new Map<string, WorkHandler>();
  const pending = new Map<string, Array<{ runId: string }>>();

  async function flush(name: string): Promise<void> {
    const handler = handlers.get(name);
    const queue = pending.get(name);
    if (!handler || !queue || queue.length === 0) return;
    pending.set(name, []);
    for (const data of queue) {
      await handler([{ data }]);
    }
  }

  return {
    async start(): Promise<void> {
      return;
    },
    async stop(): Promise<void> {
      handlers.clear();
      pending.clear();
    },
    async createQueue(_name: string): Promise<void> {
      return;
    },
    async work(name: string, handler: WorkHandler): Promise<string> {
      handlers.set(name, handler);
      await flush(name);
      return `work-${name}`;
    },
    async send(name: string, data: { runId: string }): Promise<string | null> {
      const queue = pending.get(name) ?? [];
      queue.push(data);
      pending.set(name, queue);
      await flush(name);
      return `job-${name}-${data.runId}`;
    },
  };
}

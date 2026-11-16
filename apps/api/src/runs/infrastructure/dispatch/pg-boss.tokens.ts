/** Surface used by api enqueue (pg-boss is ESM-only; avoid importing its types into CJS Nest). */
export type PgBossSendClient = {
  send(name: string, data: { runId: string }): Promise<string | null>;
  stop(options?: { graceful?: boolean }): Promise<void>;
};

/** Job shape passed to work() handlers — structural only (D6). */
export type PgBossJob = {
  data: unknown;
};

/** Worker surface: start/createQueue/work/stop (+ send if needed). */
export type PgBossWorkerClient = PgBossSendClient & {
  start(): Promise<unknown>;
  stop(options?: { graceful?: boolean }): Promise<void>;
  createQueue(name: string): Promise<void>;
  work(
    name: string,
    handler: (jobs: PgBossJob[]) => Promise<void>,
  ): Promise<string>;
};

export const PG_BOSS = Symbol('PG_BOSS');
export const PG_NOTIFY_POOL = Symbol('PG_NOTIFY_POOL');
/** Surface used by api enqueue (pg-boss is ESM-only; avoid importing its types into CJS Nest). */
export type PgBossSendClient = {
  send(name: string, data: { runId: string }): Promise<string | null>;
};

export const PG_BOSS = Symbol('PG_BOSS');
export const PG_NOTIFY_POOL = Symbol('PG_NOTIFY_POOL');

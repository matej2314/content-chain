import type { INestApplicationContext, Type } from '@nestjs/common';
import { Test, type TestingModuleBuilder } from '@nestjs/testing';
import {
  LLM_GATEWAY_PORT,
  type LlmGatewayPort,
} from '@content-chain/run-pipelines';
import {
  ENV,
  PG_BOSS,
  RUN_EXECUTOR,
  validateWorkerEnv,
  type PgBossWorkerClient,
  type RunExecutorPort,
  type RuntimeEnv,
} from '@content-chain/runs-kernel';
import { WorkerRuntimeModule } from '../../worker/src/worker-runtime.module';

import { createInProcessPgBoss } from './in-process-pg-boss';

export type BootWorkerE2eOptions = {
  /** Shared fake / stub LLM (same instance as api override). */
  llm?: LlmGatewayPort;
  /** Holding / stub executor for queue / cancel tests. */
  runExecutor?: RunExecutorPort;
  /** Nest useClass override (e.g. StubRunExecutor). */
  runExecutorClass?: Type<RunExecutorPort>;
  env?: RuntimeEnv;
  /**
   * Shared pg-boss surface with api (required for wake/execute bridge).
   * Defaults to a fresh in-process fake when omitted.
   */
  pgBoss?: PgBossWorkerClient;
};

/**
 * Second Nest context = apps/worker topology in-process for Jest e2e.
 * Api AppModule stays HTTP-only; this owns pump / recovery / sweep / work handlers.
 */
export async function bootWorkerE2e(
  options: BootWorkerE2eOptions = {},
): Promise<INestApplicationContext> {
  const env =
    options.env ?? validateWorkerEnv(process.env);
  const pgBoss = options.pgBoss ?? createInProcessPgBoss();

  let builder: TestingModuleBuilder = Test.createTestingModule({
    imports: [WorkerRuntimeModule],
  })
    .overrideProvider(ENV)
    .useValue(env)
    .overrideProvider(PG_BOSS)
    .useValue(pgBoss);

  if (options.llm !== undefined) {
    builder = builder.overrideProvider(LLM_GATEWAY_PORT).useValue(options.llm);
  }
  if (options.runExecutor !== undefined) {
    builder = builder
      .overrideProvider(RUN_EXECUTOR)
      .useValue(options.runExecutor);
  } else if (options.runExecutorClass !== undefined) {
    builder = builder
      .overrideProvider(RUN_EXECUTOR)
      .useClass(options.runExecutorClass);
  }

  const moduleRef = await builder.compile();
  // TestingModule is already an INestApplicationContext (no HTTP).
  await moduleRef.init();
  return moduleRef;
}

export async function closeWorkerE2e(
  worker: INestApplicationContext | undefined,
): Promise<void> {
  if (!worker) return;
  await worker.close();
}

export { createInProcessPgBoss };

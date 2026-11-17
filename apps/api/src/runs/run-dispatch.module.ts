import {
  Inject,
  Injectable,
  Logger,
  Module,
  OnModuleDestroy,
} from '@nestjs/common';
import { Pool } from 'pg';
import { EnvModule } from '../shared/config/env.module';
import { ENV, type Env } from '../shared/config/env';
import { PG_BOSS, PG_NOTIFY_POOL, PgBossRunJobEnqueue, PgNotifyAbortSignal, RUN_ABORT_SIGNAL, RUN_JOB_ENQUEUE, createInProcessPgBossClient, loadPgBoss, type PgBossSendClient } from '@content-chain/runs-kernel';






/**
 * Api-only: pg-boss send + abort NOTIFY. No createQueue / work (D3).
 * D6: dynamic import('pg-boss') — no static package import.
 */
@Injectable()
class RunDispatchShutdown implements OnModuleDestroy {
  private readonly logger = new Logger(RunDispatchShutdown.name);

  constructor(
    @Inject(PG_BOSS) private readonly boss: PgBossSendClient,
    @Inject(PG_NOTIFY_POOL) private readonly pool: Pool,
  ) {}

  async onModuleDestroy(): Promise<void> {
    try {
      await this.boss.stop({ graceful: true });
    } catch (err) {
      this.logger.warn({ err }, 'pg-boss stop failed');
    }
    try {
      await this.pool.end();
    } catch (err) {
      this.logger.warn({ err }, 'notify pool end failed');
    }
  }
}

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: PG_BOSS,
      useFactory: async (env: Env): Promise<PgBossSendClient> => {
        // Jest e2e: avoid ESM pg-boss under ts-jest (multi-suite teardown).
        if (env.NODE_ENV === 'test') {
          const boss = createInProcessPgBossClient();
          await boss.start();
          return boss;
        }
        const PgBoss = await loadPgBoss();
        const boss = new PgBoss({ connectionString: env.DATABASE_URL });
        await boss.start();
        // D3: send only — no createQueue / work
        return boss;
      },
      inject: [ENV],
    },
    {
      provide: PG_NOTIFY_POOL,
      useFactory: (env: Env): Pool =>
        new Pool({ connectionString: env.DATABASE_URL }),
      inject: [ENV],
    },
    PgBossRunJobEnqueue,
    { provide: RUN_JOB_ENQUEUE, useExisting: PgBossRunJobEnqueue },
    PgNotifyAbortSignal,
    { provide: RUN_ABORT_SIGNAL, useExisting: PgNotifyAbortSignal },
    RunDispatchShutdown,
  ],
  exports: [RUN_JOB_ENQUEUE, RUN_ABORT_SIGNAL, PG_BOSS, PG_NOTIFY_POOL],
})
export class RunDispatchModule {}

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
import { RUN_ABORT_SIGNAL } from './domain/run-abort-signal.port';
import { RUN_JOB_ENQUEUE } from './domain/run-job-enqueue.port';
import { PgBossRunJobEnqueue } from './infrastructure/dispatch/pg-boss.run-job.enqueue';
import { PgNotifyAbortSignal } from './infrastructure/dispatch/pg-notify-abort.signal';
import {
  PG_BOSS,
  PG_NOTIFY_POOL,
  type PgBossSendClient,
} from './infrastructure/dispatch/pg-boss.tokens';

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
        const { PgBoss } = await import('pg-boss');
        const boss = new PgBoss({ connectionString: env.DATABASE_URL });
        await boss.start();
        // D3: send only — no createQueue / work
        return boss as unknown as PgBossSendClient;
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

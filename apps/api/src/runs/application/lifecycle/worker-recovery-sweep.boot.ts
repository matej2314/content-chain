import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { parseTtlMs } from '../../../auth/application/auth.helpers';
import { ENV, type Env } from '../../../shared/config/env';
import { AutoFinalizeExpiredReviewsUseCase } from '../auto-finalize-expired-reviews.use-case';
import { RecoverInterruptedRunsUseCase } from '../recover-interrupted-runs.use-case';

/** Wake po recover (D2) — w K2 podłącz pump.notifyQueued / enqueueWake. */
export const AFTER_RECOVER_WAKE = Symbol('AFTER_RECOVER_WAKE');

export type AfterRecoverWake = {
  notifyQueued(): void;
};

@Injectable()
export class WorkerRecoverySweepBoot
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(WorkerRecoverySweepBoot.name);
  private reviewSweepTimer: ReturnType<typeof setInterval> | null = null;

  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly recover: RecoverInterruptedRunsUseCase,
    private readonly autoFinalize: AutoFinalizeExpiredReviewsUseCase,
    @Inject(AFTER_RECOVER_WAKE) private readonly wake: AfterRecoverWake,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.recover.execute();
    this.wake.notifyQueued();
    await this.autoFinalize.execute();
    this.reviewSweepTimer = setInterval(() => {
      void this.autoFinalize.execute().catch((err: unknown) => {
        this.logger.error({ err }, 'review auto-finalize sweep failed');
      });
    }, parseTtlMs(this.env.REVIEW_SWEEP_INTERVAL));
  }

  onModuleDestroy(): void {
    if (this.reviewSweepTimer === null) return;
    clearInterval(this.reviewSweepTimer);
    this.reviewSweepTimer = null;
  }
}

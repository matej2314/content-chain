import { Inject, Injectable } from '@nestjs/common';
import { parseTtlMs } from '@content-chain/shared';
import { ENV, type RuntimeEnv } from '../config/env.token';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';

@Injectable()
export class AutoFinalizeExpiredReviewsUseCase {
  constructor(
    @Inject(ENV) private readonly env: RuntimeEnv,
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
  ) {}

  async execute(now: Date = new Date()): Promise<number> {
    return this.runs.finalizeExpiredReviews(
      now,
      parseTtlMs(this.env.REVIEW_TTL),
    );
  }
}

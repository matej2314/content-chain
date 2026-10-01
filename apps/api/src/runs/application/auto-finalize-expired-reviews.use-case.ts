import { Inject, Injectable } from '@nestjs/common';
import { parseTtlMs } from '../../auth/application/auth.helpers';
import { ENV, type Env } from '../../shared/config/env';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';

@Injectable()
export class AutoFinalizeExpiredReviewsUseCase {
  constructor(
    @Inject(ENV) private readonly env: Env,
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
  ) {}

  async execute(now: Date = new Date()): Promise<number> {
    return this.runs.finalizeExpiredReviews(
      now,
      parseTtlMs(this.env.REVIEW_TTL),
    );
  }
}

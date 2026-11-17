import { Inject, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { DomainException, RUN_REPOSITORY, assertRunReviewable, computeReviewExpiresAt, parseWithZod, type RunRepository } from '@content-chain/runs-kernel';

import { GUEST_QUOTA, type GuestQuotaPort } from '../domain/guest-quota.port';

import { ENV, type Env } from '../../shared/config/env';
import { parseTtlMs } from '@content-chain/shared';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type { RunId } from '@content-chain/shared';

const ratingSchema = z.object({
  rating: z.union([z.null(), z.number().int().min(1).max(5)]),
});

@Injectable()
export class RateRunUseCase {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    @Inject(ENV) private readonly env: Env,
    @Inject(GUEST_QUOTA) private readonly quota: GuestQuotaPort,
  ) {}

  async execute(runId: RunId, input: unknown, actor: AuthUserContext) {
    const { rating } = parseWithZod(ratingSchema, input);
    const run = await this.runs.getById(runId);
    const reviewTtlMs = parseTtlMs(this.env.REVIEW_TTL);
    assertRunReviewable(run, actor.id, {
      now: new Date(),
      reviewTtlMs,
    });
    if (actor.role === 'guest' && this.env.DEMO_MODE) {
      const admit = await this.quota.tryAdmitDailyRating(
        actor.id,
        this.env.GUEST_RATING_CAP_PER_DAY,
      );
      if (admit.kind === 'exceeded') {
        throw new DomainException(
          'TOO_MANY_REQUESTS',
          'Guest daily rating limit exceeded',
          429,
        );
      }
    }
    const updated = await this.runs.saveRating(runId, rating);
    if (!updated) {
      throw new DomainException(
        'REVIEW_LOCKED',
        'Review is already finalized',
        409,
      );
    }
    return {
      runId: run.id,
      userRating: rating,
      reviewFinalizedAt: null,
      pipelineFinishedAt: run.pipelineFinishedAt?.toISOString() ?? null,
      reviewExpiresAt: computeReviewExpiresAt(
        run.pipelineFinishedAt,
        null,
        reviewTtlMs,
      ),
    };
  }
}

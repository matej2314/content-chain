import { Inject, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { assertRunReviewable } from '../domain/assert-run-reviewable';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type { RunId } from '@content-chain/shared';

const ratingSchema = z.object({
  rating: z.union([z.null(), z.number().int().min(1).max(5)]),
});

@Injectable()
export class RateRunUseCase {
  constructor(@Inject(RUN_REPOSITORY) private readonly runs: RunRepository) {}

  async execute(runId: RunId, input: unknown, actor: AuthUserContext) {
    const { rating } = parseWithZod(ratingSchema, input);
    const run = await this.runs.getById(runId);
    assertRunReviewable(run, actor.id);
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
    };
  }
}

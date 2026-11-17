import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '@content-chain/domain-kit';
import { RUN_REPOSITORY, assertRunReviewable, type RunRepository } from '@content-chain/runs-kernel';


import { ENV, type Env } from '../../shared/config/env';
import { parseTtlMs } from '@content-chain/shared';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type { RunId } from '@content-chain/shared';

@Injectable()
export class FinalizeReviewUseCase {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async execute(runId: RunId, actor: AuthUserContext) {
    const run = await this.runs.getById(runId);
    assertRunReviewable(run, actor.id, {
      now: new Date(),
      reviewTtlMs: parseTtlMs(this.env.REVIEW_TTL),
    });

    const finalizedAt = new Date();
    const updated = await this.runs.saveFinalizedAt(runId, finalizedAt);
    if (!updated) {
      throw new DomainException(
        'REVIEW_LOCKED',
        'Review is already finalized',
        409,
      );
    }
    return {
      runId: run.id,
      userRating: run.userRating,
      outputEdited: run.outputEdited,
      reviewFinalizedAt: finalizedAt.toISOString(),
      pipelineFinishedAt: run.pipelineFinishedAt?.toISOString() ?? null,
      reviewExpiresAt: null,
    };
  }
}

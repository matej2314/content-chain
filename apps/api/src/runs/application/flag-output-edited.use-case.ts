import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { assertRunReviewable } from '../domain/assert-run-reviewable';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type { RunId } from '@content-chain/shared';

@Injectable()
export class FlagOutputEditedUseCase {
  constructor(@Inject(RUN_REPOSITORY) private readonly runs: RunRepository) {}

  async execute(runId: RunId, actor: AuthUserContext) {
    const run = await this.runs.getById(runId);
    assertRunReviewable(run, actor.id);
    const updated = await this.runs.saveOutputEdited(runId);
    if (!updated) {
      throw new DomainException(
        'REVIEW_LOCKED',
        'Review is already finalized',
        409,
      );
    }
    return { runId: run.id, outputEdited: true };
  }
}

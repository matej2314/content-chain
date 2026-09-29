import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import { RunAbortRegistry } from './run-abort.registry';
import { RunLifecycleService } from './run-lifecycle.service';
import { GetRunUseCase, type GetRunOutput } from './get-run.use-case';
import type { RunId, UserId } from '@content-chain/shared';

@Injectable()
export class CancelRunUseCase {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    private readonly abortRegistry: RunAbortRegistry,
    private readonly lifecycle: RunLifecycleService,
    private readonly getRun: GetRunUseCase,
  ) {}

  async execute(runId: RunId, actorId: UserId): Promise<GetRunOutput> {
    const snapshot = await this.runs.getById(runId);
    if (!snapshot) {
      throw new DomainException('RUN_NOT_FOUND', 'Run not found', 404);
    }
    if (snapshot.startedBy?.id !== actorId) {
      throw new DomainException('FORBIDDEN', 'Access denied', 403);
    }
    if (snapshot.status === 'cancelled') {
      return this.getRun.execute(runId);
    }
    if (snapshot.status === 'completed' || snapshot.status === 'failed') {
      throw new DomainException(
        'RUN_NOT_CANCELABLE',
        'Run is already finished',
        409,
      );
    }

    await this.runs.setCancelRequested(runId);
    const caseSucceeded = await this.runs.attemptCancel(runId, new Date());
    if (!caseSucceeded) {
      const latest = await this.runs.getById(runId);
      if (latest?.status === 'cancelled') {
        return this.getRun.execute(runId);
      }
      throw new DomainException(
        'RUN_NOT_CANCELABLE',
        'Run is already finished',
        409,
      );
    }

    this.abortRegistry.requestCancel(runId);

    await this.lifecycle.appendLog({
      runId,
      conversationId: snapshot.conversationId,
      level: 'info',
      message: 'Run cancelled by user',
      step: 'CancelRunUseCase',
    });
    this.lifecycle.publishCancelled(runId);

    return this.getRun.execute(runId);
  }
}

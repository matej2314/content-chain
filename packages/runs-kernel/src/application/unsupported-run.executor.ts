import { Injectable } from '@nestjs/common';
import { DomainException } from '@content-chain/domain-kit';
import type { RunExecutorPort } from '../domain/run-executor.port';
import type { RunRecord } from '../domain/run.types';

/** Api host must not execute pipelines (model A = worker only). */
@Injectable()
export class UnsupportedRunExecutor implements RunExecutorPort {
  execute(_run: RunRecord): Promise<void> {
    return Promise.reject(
      new DomainException(
        'EXECUTE_ON_WORKER_ONLY',
        'Run execute is owned by apps/worker',
        500,
      ),
    );
  }
}

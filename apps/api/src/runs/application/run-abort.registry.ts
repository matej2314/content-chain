import { Injectable } from '@nestjs/common';
import type { RunId } from '@content-chain/shared';

@Injectable()
export class RunAbortRegistry {
  private readonly controllers = new Map<RunId, AbortController>();

  begin(runId: RunId): AbortSignal {
    const existing = this.controllers.get(runId);
    if (existing) return existing.signal;
    const controller = new AbortController();
    this.controllers.set(runId, controller);
    return controller.signal;
  }

  requestCancel(runId: RunId): void {
    const controller = this.controllers.get(runId);
    controller?.abort();
  }

  end(runId: RunId): void {
    this.controllers.delete(runId);
  }
}

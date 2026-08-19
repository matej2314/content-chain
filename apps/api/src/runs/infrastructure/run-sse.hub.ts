import { Injectable, Inject } from '@nestjs/common';
import { Subject, type Observable } from 'rxjs';
import { createRunId, type RunId } from '@content-chain/shared';
import { ENV, type Env } from '../../shared/config/env';

import type { RunSseEvent, RunSseHub } from '../domain/run-sse.port';

@Injectable()
export class InMemoryRunSseHub implements RunSseHub {
  private readonly subjects = new Map<RunId, Subject<RunSseEvent>>();
  private readonly ttlTimers = new Map<RunId, ReturnType<typeof setTimeout>>();

  constructor(@Inject(ENV) private readonly env: Env) {}

  subscribe(runId: RunId): Observable<RunSseEvent> {
    return this.subjectFor(runId).asObservable();
  }

  publish(event: RunSseEvent): void {
    const subject = this.subjects.get(createRunId(event.data.runId));
    if (!subject) return;
    subject.next(event);
  }

  complete(runId: RunId): void {
    const key = createRunId(runId);
    const subject = this.subjects.get(key);
    if (!subject) return;
    this.subjects.delete(key);
    this.clearTtl(key);
    subject.complete();
  }

  has(runId: RunId): boolean {
    return this.subjects.has(createRunId(runId));
  }

  private clearTtl(key: RunId): void {
    const timer = this.ttlTimers.get(key);
    if (!timer) return;
    clearTimeout(timer);
    this.ttlTimers.delete(key);
  }

  private subjectFor(runId: RunId): Subject<RunSseEvent> {
    const key = createRunId(runId);
    let subject = this.subjects.get(key);
    if (!subject) {
      const created = new Subject<RunSseEvent>();
      subject = created;
      this.subjects.set(key, created);

      const timer = setTimeout(() => {
        const current = this.subjects.get(key);
        if (current === created) {
          this.subjects.delete(key);
          this.clearTtl(key);
          created.error(new Error(`SSE subject TTL exceeded for run ${key}`));
        }
      }, this.env.RUN_SSE_SUBJECT_TTL_MS);
      timer.unref();
      this.ttlTimers.set(key, timer);
    }
    return subject;
  }
}

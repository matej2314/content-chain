import { Injectable } from '@nestjs/common';
import { Subject, type Observable } from 'rxjs';
import { createRunId, type RunId } from '@content-chain/shared';
import type { RunSseEvent, RunSseHub } from '../domain/run-sse.port';

@Injectable()
export class InMemoryRunSseHub implements RunSseHub {
  private readonly subjects = new Map<RunId, Subject<RunSseEvent>>();

  subscribe(runId: RunId): Observable<RunSseEvent> {
    return this.subjectFor(runId).asObservable();
  }

  publish(event: RunSseEvent): void {
    this.subjectFor(event.data.runId).next(event);
  }

  private subjectFor(runId: RunId): Subject<RunSseEvent> {
    const key = createRunId(runId);
    let subject = this.subjects.get(key);
    if (!subject) {
      subject = new Subject<RunSseEvent>();
      this.subjects.set(key, subject);
    }
    return subject;
  }
}

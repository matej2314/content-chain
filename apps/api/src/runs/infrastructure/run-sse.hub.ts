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
    const subject = this.subjects.get(createRunId(event.data.runId));
    if (!subject) return;
    subject.next(event);
  }

  complete(runId: RunId): void {
    const key = createRunId(runId);
    const subject = this.subjects.get(key);
    if (!subject) return;
    this.subjects.delete(key);
    subject.complete();
  }

  has(runId: RunId): boolean {
    return this.subjects.has(createRunId(runId));
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

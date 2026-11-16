import { newRunId } from '../../../shared/http/new-ids';
import {
  encodeComplete,
  encodePublish,
  encodePublishLog,
  parseRunSseNotifyPayload,
} from './run-sse-notify.envelope';

describe('run-sse-notify.envelope', () => {
  it('round-trips publish / publish-log / complete', () => {
    const runId = newRunId();

    const publishRaw = encodePublish({
      event: 'run.status',
      data: { runId, status: 'running' },
    });
    expect(parseRunSseNotifyPayload(publishRaw)).toEqual({
      kind: 'publish',
      event: {
        event: 'run.status',
        data: { runId, status: 'running' },
      },
    });

    const logRaw = encodePublishLog('log_1', runId);
    expect(parseRunSseNotifyPayload(logRaw)).toEqual({
      kind: 'publish-log',
      logId: 'log_1',
      runId,
    });

    const completeRaw = encodeComplete(runId);
    expect(parseRunSseNotifyPayload(completeRaw)).toEqual({
      kind: 'complete',
      runId,
    });
  });

  it('rejects invalid JSON and unknown kind', () => {
    expect(parseRunSseNotifyPayload('not-json')).toBeNull();
    expect(
      parseRunSseNotifyPayload(JSON.stringify({ kind: 'nope', runId: 'x' })),
    ).toBeNull();
  });

  it('rejects publish with event run.log', () => {
    const raw = JSON.stringify({
      kind: 'publish',
      event: {
        event: 'run.log',
        data: {
          runId: 'run_1',
          conversationId: null,
          at: new Date().toISOString(),
          level: 'info',
          message: 'hi',
        },
      },
    });
    expect(parseRunSseNotifyPayload(raw)).toBeNull();
  });
});

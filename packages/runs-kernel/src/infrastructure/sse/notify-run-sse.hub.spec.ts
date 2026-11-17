import { Logger } from '@nestjs/common';
import { newRunId } from '../../testing/new-ids';
import { RUN_SSE_CHANNEL } from '../dispatch/run-job.constants';
import { NotifyRunSseHub } from './notify-run-sse.hub';
import type { Pool } from 'pg';

describe('NotifyRunSseHub', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  function makeHub(query: jest.Mock): NotifyRunSseHub {
    return new NotifyRunSseHub({ query } as unknown as Pool);
  }

  it('publish and complete send pg_notify with inline payloads', async () => {
    const query = jest.fn().mockResolvedValue({ rows: [] });
    const hub = makeHub(query);
    const runId = newRunId();

    hub.publish({
      event: 'run.status',
      data: { runId, status: 'running' },
    });
    hub.complete(runId);

    await Promise.resolve();
    await Promise.resolve();

    expect(query).toHaveBeenCalledTimes(2);
    expect(query.mock.calls[0]?.[0]).toBe(`SELECT pg_notify($1, $2)`);
    expect(query.mock.calls[0]?.[1]?.[0]).toBe(RUN_SSE_CHANNEL);
    const publishPayload = JSON.parse(
      String(query.mock.calls[0]?.[1]?.[1]),
    ) as { kind: string; event: { event: string } };
    expect(publishPayload).toEqual({
      kind: 'publish',
      event: {
        event: 'run.status',
        data: { runId, status: 'running' },
      },
    });

    const completePayload = JSON.parse(
      String(query.mock.calls[1]?.[1]?.[1]),
    ) as { kind: string; runId: string };
    expect(completePayload).toEqual({ kind: 'complete', runId });
  });

  it('publishLog sends publish-log envelope', async () => {
    const query = jest.fn().mockResolvedValue({ rows: [] });
    const hub = makeHub(query);
    const runId = newRunId();

    hub.publishLog('log_abc', runId);
    await Promise.resolve();

    const payload = JSON.parse(String(query.mock.calls[0]?.[1]?.[1])) as {
      kind: string;
      logId: string;
      runId: string;
    };
    expect(payload).toEqual({
      kind: 'publish-log',
      logId: 'log_abc',
      runId,
    });
  });

  it('publish(run.log) does not send full log payload', async () => {
    const query = jest.fn().mockResolvedValue({ rows: [] });
    const hub = makeHub(query);
    const runId = newRunId();
    const errorSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation();

    hub.publish({
      event: 'run.log',
      data: {
        runId,
        conversationId: null,
        at: new Date(),
        level: 'info',
        message: 'secret body',
      },
    });
    await Promise.resolve();

    expect(query).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();
  });

  it('subscribe throws', () => {
    const hub = makeHub(jest.fn());
    expect(() => hub.subscribe(newRunId())).toThrow(
      /does not support subscribe/,
    );
  });

  it('query failure logs warn and does not throw', async () => {
    const query = jest.fn().mockRejectedValue(new Error('pg down'));
    const hub = makeHub(query);
    const warnSpy = jest.spyOn(Logger.prototype, 'warn').mockImplementation();
    const runId = newRunId();

    expect(() =>
      hub.publish({
        event: 'run.status',
        data: { runId, status: 'running' },
      }),
    ).not.toThrow();

    await Promise.resolve();
    await Promise.resolve();

    expect(warnSpy).toHaveBeenCalled();
  });
});

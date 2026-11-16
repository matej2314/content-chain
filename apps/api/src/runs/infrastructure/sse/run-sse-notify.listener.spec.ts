import { Client } from 'pg';
import { newRunId } from '../../../shared/http/new-ids';
import type { Env } from '../../../shared/config/env';
import type { RunRepository } from '../../domain/run.port';
import type { RunSseHub } from '../../domain/run-sse.port';
import { RUN_SSE_CHANNEL } from '../dispatch/run-job.constants';
import {
  encodeComplete,
  encodePublish,
  encodePublishLog,
} from './run-sse-notify.envelope';
import { RunSseNotifyListener } from './run-sse-notify.listener';

type NotificationHandler = (msg: {
  channel: string;
  payload?: string;
}) => void;

describe('RunSseNotifyListener', () => {
  const handlers: NotificationHandler[] = [];

  beforeEach(() => {
    handlers.length = 0;
    jest.spyOn(Client.prototype, 'on').mockImplementation(((
      event: string,
      handler: NotificationHandler,
    ) => {
      if (event === 'notification') handlers.push(handler);
      return Client.prototype;
    }) as Client['on']);
    jest
      .spyOn(Client.prototype, 'connect')
      .mockResolvedValue(undefined as never);
    jest
      .spyOn(Client.prototype, 'query')
      .mockResolvedValue({ rows: [] } as never);
    jest.spyOn(Client.prototype, 'end').mockResolvedValue(undefined as never);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  function makeListener(overrides: {
    hub?: RunSseHub & { publish: jest.Mock; complete: jest.Mock };
    getLogById?: jest.Mock;
  } = {}) {
    const hub =
      overrides.hub ??
      ({
        publish: jest.fn(),
        complete: jest.fn(),
        subscribe: jest.fn(),
      } as unknown as RunSseHub & {
        publish: jest.Mock;
        complete: jest.Mock;
      });
    const getLogById =
      overrides.getLogById ?? jest.fn().mockResolvedValue(null);
    const listener = new RunSseNotifyListener(
      { DATABASE_URL: 'postgres://test' } as Env,
      hub,
      { getLogById } as unknown as RunRepository,
    );
    return { listener, hub, getLogById };
  }

  async function flushMicrotasks(): Promise<void> {
    await new Promise((r) => setImmediate(r));
    await new Promise((r) => setImmediate(r));
  }

  it('publish → hub.publish; complete → hub.complete', async () => {
    const { listener, hub } = makeListener();
    await listener.onModuleInit();
    expect(Client.prototype.query).toHaveBeenCalledWith(
      `LISTEN ${RUN_SSE_CHANNEL}`,
    );

    const runId = newRunId();
    handlers[0]!({
      channel: RUN_SSE_CHANNEL,
      payload: encodePublish({
        event: 'run.status',
        data: { runId, status: 'running' },
      }),
    });
    expect(hub.publish).toHaveBeenCalledWith({
      event: 'run.status',
      data: { runId, status: 'running' },
    });

    handlers[0]!({
      channel: RUN_SSE_CHANNEL,
      payload: encodeComplete(runId),
    });
    expect(hub.complete).toHaveBeenCalledWith(runId);

    await listener.onModuleDestroy();
    expect(Client.prototype.query).toHaveBeenCalledWith(
      `UNLISTEN ${RUN_SSE_CHANNEL}`,
    );
    expect(Client.prototype.end).toHaveBeenCalled();
  });

  it('publish-log hydrates via getLogById then hub.publish(run.log)', async () => {
    const runId = newRunId();
    const entry = {
      runId,
      conversationId: null,
      at: new Date('2026-11-16T12:00:00.000Z'),
      level: 'info' as const,
      message: 'hello',
    };
    const getLogById = jest.fn().mockResolvedValue(entry);
    const { listener, hub } = makeListener({ getLogById });

    await listener.onModuleInit();
    handlers[0]!({
      channel: RUN_SSE_CHANNEL,
      payload: encodePublishLog('log_1', runId),
    });
    await flushMicrotasks();

    expect(getLogById).toHaveBeenCalledWith('log_1');
    expect(hub.publish).toHaveBeenCalledWith({
      event: 'run.log',
      data: { ...entry, runId },
    });
    await listener.onModuleDestroy();
  });

  it('queues hydrate per runId in signal order', async () => {
    const runId = newRunId();
    const order: string[] = [];
    const getLogById = jest.fn(async (logId: string) => {
      order.push(`fetch:${logId}`);
      if (logId === 'log_a') {
        await new Promise((r) => setTimeout(r, 20));
      }
      return {
        runId,
        conversationId: null,
        at: new Date(),
        level: 'info' as const,
        message: logId,
      };
    });
    const hub = {
      publish: jest.fn((event: { data: { message: string } }) => {
        order.push(`publish:${event.data.message}`);
      }),
      complete: jest.fn(),
      subscribe: jest.fn(),
    } as unknown as RunSseHub & { publish: jest.Mock; complete: jest.Mock };

    const { listener } = makeListener({ hub, getLogById });
    await listener.onModuleInit();

    handlers[0]!({
      channel: RUN_SSE_CHANNEL,
      payload: encodePublishLog('log_a', runId),
    });
    handlers[0]!({
      channel: RUN_SSE_CHANNEL,
      payload: encodePublishLog('log_b', runId),
    });

    await new Promise((r) => setTimeout(r, 50));

    expect(order).toEqual([
      'fetch:log_a',
      'publish:log_a',
      'fetch:log_b',
      'publish:log_b',
    ]);
    await listener.onModuleDestroy();
  });

  it('missing log row skips publish', async () => {
    const { listener, hub } = makeListener({
      getLogById: jest.fn().mockResolvedValue(null),
    });
    await listener.onModuleInit();
    handlers[0]!({
      channel: RUN_SSE_CHANNEL,
      payload: encodePublishLog('missing', newRunId()),
    });
    await flushMicrotasks();
    expect(hub.publish).not.toHaveBeenCalled();
    await listener.onModuleDestroy();
  });

  it('ignores garbage payload', async () => {
    const { listener, hub } = makeListener();
    await listener.onModuleInit();
    handlers[0]!({ channel: RUN_SSE_CHANNEL, payload: 'not-json' });
    expect(hub.publish).not.toHaveBeenCalled();
    expect(hub.complete).not.toHaveBeenCalled();
    await listener.onModuleDestroy();
  });
});

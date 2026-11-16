import { Client } from 'pg';
import { newRunId } from '../../../shared/http/new-ids';
import type { Env } from '../../../shared/config/env';
import { RunAbortRegistry } from '../../application/lifecycle/run-abort.registry';
import { RUN_ABORT_CHANNEL } from './run-job.constants';
import { RunAbortNotifyListener } from './run-abort-notify.listener';

type NotificationHandler = (msg: {
  channel: string;
  payload?: string;
}) => void;

describe('RunAbortNotifyListener', () => {
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

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function makeListener(registry = new RunAbortRegistry()) {
    const listener = new RunAbortNotifyListener(
      { DATABASE_URL: 'postgres://test' } as Env,
      registry,
    );
    return { listener, registry };
  }

  it('payload runId → abortRegistry.requestCancel', async () => {
    const { listener, registry } = makeListener();
    const requestCancel = jest.spyOn(registry, 'requestCancel');
    await listener.onModuleInit();

    expect(Client.prototype.query).toHaveBeenCalledWith(
      `LISTEN ${RUN_ABORT_CHANNEL}`,
    );

    const runId = newRunId();
    handlers[0]!({ channel: RUN_ABORT_CHANNEL, payload: runId });
    expect(requestCancel).toHaveBeenCalledWith(runId);

    await listener.onModuleDestroy();
    expect(Client.prototype.query).toHaveBeenCalledWith(
      `UNLISTEN ${RUN_ABORT_CHANNEL}`,
    );
    expect(Client.prototype.end).toHaveBeenCalled();
  });

  it('ignores foreign channel', async () => {
    const { listener, registry } = makeListener();
    const requestCancel = jest.spyOn(registry, 'requestCancel');
    await listener.onModuleInit();

    handlers[0]!({
      channel: 'other.channel',
      payload: newRunId(),
    });
    expect(requestCancel).not.toHaveBeenCalled();

    await listener.onModuleDestroy();
  });
});

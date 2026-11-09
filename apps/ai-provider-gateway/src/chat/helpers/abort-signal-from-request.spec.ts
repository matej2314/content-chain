import { EventEmitter } from 'node:events';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { abortSignalFromIncomingMessage } from './abort-signal-from-request';

function createMockReq(
  overrides: Partial<IncomingMessage> & {
    aborted?: boolean;
    destroyed?: boolean;
    complete?: boolean;
  } = {},
): IncomingMessage {
  const emitter = new EventEmitter();
  return Object.assign(emitter, {
    aborted: false,
    destroyed: false,
    complete: false,
    ...overrides,
  }) as IncomingMessage;
}

function createMockRes(
  overrides: Partial<ServerResponse> & { writableEnded?: boolean } = {},
): ServerResponse {
  const emitter = new EventEmitter();
  return Object.assign(emitter, {
    writableEnded: false,
    ...overrides,
  }) as ServerResponse;
}

describe('abortSignalFromIncomingMessage', () => {
  it('returns already-aborted signal when req.aborted is true', () => {
    const req = createMockReq({ aborted: true });
    const res = createMockRes();

    const signal = abortSignalFromIncomingMessage(req, res);

    expect(signal.aborted).toBe(true);
  });

  it('returns already-aborted signal when req.destroyed is true', () => {
    const req = createMockReq({ destroyed: true });
    const res = createMockRes();

    const signal = abortSignalFromIncomingMessage(req, res);

    expect(signal.aborted).toBe(true);
  });

  it('aborts on res.close when body already complete and writableEnded is false (V1 cancel)', () => {
    const req = createMockReq({ complete: true });
    const res = createMockRes({ writableEnded: false });

    const signal = abortSignalFromIncomingMessage(req, res);
    expect(signal.aborted).toBe(false);

    res.emit('close');

    expect(signal.aborted).toBe(true);
  });

  it('does not abort on res.close when writableEnded is true (successful HTTP end)', () => {
    const req = createMockReq({ complete: true });
    const res = createMockRes({ writableEnded: true });

    const signal = abortSignalFromIncomingMessage(req, res);
    res.emit('close');

    expect(signal.aborted).toBe(false);
  });

  it('aborts when req emits aborted', () => {
    const req = createMockReq();
    const res = createMockRes();

    const signal = abortSignalFromIncomingMessage(req, res);
    req.emit('aborted');

    expect(signal.aborted).toBe(true);
  });
});

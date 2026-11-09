import { newRunId } from '../../../shared/http/new-ids';
import { RunAbortRegistry } from './run-abort.registry';

describe('RunAbortRegistry', () => {
  it('begin → requestCancel sets signal.aborted; end clears the controller', () => {
    const registry = new RunAbortRegistry();
    const runId = newRunId();

    const signal = registry.begin(runId);
    expect(signal.aborted).toBe(false);

    registry.requestCancel(runId);
    expect(signal.aborted).toBe(true);

    registry.end(runId);
    const next = registry.begin(runId);
    expect(next.aborted).toBe(false);
    expect(next).not.toBe(signal);
  });

  it('requestCancel before begin returns an already-aborted signal', () => {
    const registry = new RunAbortRegistry();
    const runId = newRunId();

    registry.requestCancel(runId);
    const signal = registry.begin(runId);
    expect(signal.aborted).toBe(true);
  });

  it('end clears pending cancel so a later begin is not aborted', () => {
    const registry = new RunAbortRegistry();
    const runId = newRunId();

    registry.requestCancel(runId);
    registry.end(runId);
    const signal = registry.begin(runId);
    expect(signal.aborted).toBe(false);
  });

  it('begin returns the same signal for an in-flight runId', () => {
    const registry = new RunAbortRegistry();
    const runId = newRunId();

    const first = registry.begin(runId);
    const second = registry.begin(runId);
    expect(second).toBe(first);
  });
});

import { newRunId } from '../../shared/http/new-ids';
import { RunAbortRegistry } from './run-abort.registry';

describe('RunAbortRegistry', () => {
  it('begin → requestCancel sets signal.aborted; end clears the map', () => {
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

  it('begin returns the same signal for an in-flight runId', () => {
    const registry = new RunAbortRegistry();
    const runId = newRunId();

    const first = registry.begin(runId);
    const second = registry.begin(runId);
    expect(second).toBe(first);
  });
});

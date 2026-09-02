import type { RunRecord } from '../domain/run.types';
import type { RunLifecycleService } from '../application/run-lifecycle.service';
import { makeSocialRun } from '../run-record.test-helpers';
import { StubRunExecutor } from './stub-run.executor';

function makeRun(): RunRecord {
  return makeSocialRun();
}

describe('StubRunExecutor', () => {
  it('appends a readable log and transitions to completed without secrets or LLM', async () => {
    const run = makeRun();
    const appendLog = jest.fn().mockResolvedValue(undefined);
    const transition = jest.fn().mockResolvedValue({
      ...run,
      status: 'completed',
    });
    const executor = new StubRunExecutor({
      appendLog,
      transition,
    } as unknown as RunLifecycleService);

    await executor.execute(run);

    expect(appendLog).toHaveBeenCalledWith(
      expect.objectContaining({
        runId: run.id,
        conversationId: run.conversationId,
        level: 'info',
        step: 'StubRunExecutor',
      }),
    );
    const message = String(appendLog.mock.calls[0]?.[0]?.message ?? '');
    expect(message.length).toBeGreaterThan(0);
    expect(message).not.toMatch(/GATEWAY_KEY|jwt|password|secret/i);

    expect(transition).toHaveBeenCalledWith(
      run,
      'completed',
      expect.objectContaining({ resultSummary: expect.any(String) }),
    );
  });
});

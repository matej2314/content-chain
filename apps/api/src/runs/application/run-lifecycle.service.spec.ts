import { newConversationId, newRunId } from '../../shared/http/new-ids';
import type { RunRepository } from '../domain/run.port';
import type { RunRecord } from '../domain/run.types';
import type { RunSseHub } from '../domain/run-sse.port';
import { RunLifecycleService } from './run-lifecycle.service';

function makeRun(status: RunRecord['status'] = 'running'): RunRecord {
  return {
    id: newRunId(),
    conversationId: newConversationId(),
    taskType: 'post_ideas',
    platform: 'linkedin',
    language: 'pl',
    status,
    brief: { topic: 'Q3' },
    selectedIdeaIds: null,
    startedByUserId: null,
    recoveryAttempts: 0,
    createdAt: new Date(),
  };
}

describe('RunLifecycleService', () => {
  function setup() {
    const runs = {
      saveStatus: jest.fn().mockResolvedValue(undefined),
    } as unknown as RunRepository;
    const sseHub = {
      publish: jest.fn(),
      subscribe: jest.fn(),
      complete: jest.fn(),
    } as unknown as RunSseHub & {
      publish: jest.Mock;
      complete: jest.Mock;
    };
    const service = new RunLifecycleService(runs, sseHub);
    return { runs, sseHub, service };
  }

  it('calls complete only after completed or failed terminal events', async () => {
    const { sseHub, service } = setup();
    const run = makeRun('running');

    await service.transition(run, 'completed', { resultSummary: 'ok' });

    expect(sseHub.publish).toHaveBeenCalledWith({
      event: 'run.status',
      data: { runId: run.id, status: 'completed' },
    });
    expect(sseHub.publish).toHaveBeenCalledWith({
      event: 'run.completed',
      data: { runId: run.id, resultSummary: 'ok' },
    });
    expect(sseHub.complete).toHaveBeenCalledWith(run.id);
    const completeOrder = sseHub.complete.mock.invocationCallOrder[0];
    const failedOrCompletedOrder = sseHub.publish.mock.invocationCallOrder[1];
    expect(completeOrder).toBeGreaterThan(failedOrCompletedOrder);
  });

  it('calls complete after run.failed', async () => {
    const { sseHub, service } = setup();
    const run = makeRun('running');

    await service.transition(run, 'failed', { failedMessage: 'boom' });

    expect(sseHub.publish).toHaveBeenCalledWith(
      expect.objectContaining({ event: 'run.failed' }),
    );
    expect(sseHub.complete).toHaveBeenCalledWith(run.id);
  });

  it('does not complete on awaiting_hitl or interrupted', async () => {
    const hitl = setup();
    await hitl.service.transition(makeRun('running'), 'awaiting_hitl');
    expect(hitl.sseHub.complete).not.toHaveBeenCalled();

    const interrupted = setup();
    await interrupted.service.transition(makeRun('running'), 'interrupted');
    expect(interrupted.sseHub.complete).not.toHaveBeenCalled();
  });
});

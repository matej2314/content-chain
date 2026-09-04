import type { RunExecutorPort } from '../domain/run-executor.port';
import type { RunLifecyclePort } from '../domain/run-lifecycle.port';
import type { RunRecord } from '../domain/run.types';
import {
  makeContentRun,
  makeSocialRun,
} from '../run-record.test-helpers';
import { RunDispatchExecutor } from './run-dispatch.executor';

function fakeExecutor(): jest.Mocked<RunExecutorPort> {
  return {
    execute: jest.fn().mockResolvedValue(undefined),
  };
}

function fakeLifecycle(): jest.Mocked<RunLifecyclePort> {
  return {
    appendLog: jest.fn().mockResolvedValue(undefined),
    transition: jest
      .fn()
      .mockImplementation(async (run: RunRecord, to: RunRecord['status']) => ({
        ...run,
        status: to,
      })),
  };
}

function runWithUnknownTask(): RunRecord {
  return {
    ...makeSocialRun(),
    // D-19: persistence garbage poza unią RunTaskType — testuje fail-closed composite.
    // as na całym obiekcie: sam as na taskType poszerza dyskryminator i nie składa się w unię.
    taskType: 'legacy_blog',
  } as unknown as RunRecord;
}

describe('RunDispatchExecutor', () => {
  it('routes post_ideas to social and does not call content or lifecycle', async () => {
    const run = makeSocialRun({ taskType: 'post_ideas' });
    const social = fakeExecutor();
    const content = fakeExecutor();
    const lifecycle = fakeLifecycle();
    const executor = new RunDispatchExecutor(social, content, lifecycle);

    await executor.execute(run);

    expect(social.execute).toHaveBeenCalledTimes(1);
    expect(social.execute).toHaveBeenCalledWith(run);
    expect(content.execute).not.toHaveBeenCalled();
    expect(lifecycle.transition).not.toHaveBeenCalled();
    expect(lifecycle.appendLog).not.toHaveBeenCalled();
  });

  it('routes page_copy to content and does not call social or lifecycle', async () => {
    const run = makeContentRun({ taskType: 'page_copy' });
    const social = fakeExecutor();
    const content = fakeExecutor();
    const lifecycle = fakeLifecycle();
    const executor = new RunDispatchExecutor(social, content, lifecycle);

    await executor.execute(run);

    expect(content.execute).toHaveBeenCalledTimes(1);
    expect(content.execute).toHaveBeenCalledWith(run);
    expect(social.execute).not.toHaveBeenCalled();
    expect(lifecycle.transition).not.toHaveBeenCalled();
    expect(lifecycle.appendLog).not.toHaveBeenCalled();
  });

  it('fails closed on unknown taskType without calling either executor', async () => {
    const run = runWithUnknownTask();
    const social = fakeExecutor();
    const content = fakeExecutor();
    const lifecycle = fakeLifecycle();
    const executor = new RunDispatchExecutor(social, content, lifecycle);

    await executor.execute(run);

    expect(social.execute).not.toHaveBeenCalled();
    expect(content.execute).not.toHaveBeenCalled();
    expect(lifecycle.transition).toHaveBeenCalledWith(run, 'failed', {
      failedCode: 'UNKNOWN_TASK_TYPE',
      failedMessage: `Unknown taskType: ${run.taskType}`,
    });
  });
});

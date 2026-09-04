import type { PageOutline } from '../../content/domain/content.types';
import type { RunResultReader } from '../domain/run-result-reader.port';
import type { RunRepository, RunSnapshot } from '../domain/run.port';
import type { RunRecord } from '../domain/run.types';
import { makeContentRun, makeSocialRun } from '../run-record.test-helpers';
import type { InProcessRunWorker } from './in-process-run.worker';
import type { RunLifecycleService } from './run-lifecycle.service';
import { ResumeHitlUseCase } from './resume-hitl.use-case';

const outline: PageOutline = {
  id: 'outl_1',
  title: 'Audyt w 10 dni',
  sections: [{ id: 'osec_1', heading: 'Problem', summary: 'Chaos ops.' }],
};

function unusedRepo(overrides: Partial<RunRepository>): RunRepository {
  const unexpected = async () => {
    throw new Error('unexpected repository call');
  };
  return {
    create: unexpected,
    getById: unexpected,
    saveStatus: unexpected,
    saveRecoveryAttempt: unexpected,
    claimNextQueued: unexpected,
    claimNextInterrupted: unexpected,
    findInterruptedRunning: unexpected,
    appendLog: unexpected,
    listLogs: unexpected,
    list: unexpected,
    saveSelectedIdeaIds: unexpected,
    ...overrides,
  };
}

function asSnapshot(run: RunRecord): RunSnapshot {
  return { ...run, startedBy: null };
}

function fakeReader(overrides: Partial<RunResultReader> = {}): RunResultReader {
  return {
    listIdeas: async () => [],
    getContent: async () => null,
    listReelIdeas: async () => [],
    getReelScript: async () => null,
    getPageOutline: async () => null,
    getPageDocument: async () => null,
    ...overrides,
  };
}

function makeUseCase(args: {
  run: RunRecord;
  reader?: RunResultReader;
  saveSelectedIdeaIds?: jest.Mock;
  notifyHitlResumed?: jest.Mock;
  transition?: jest.Mock;
}) {
  const saveSelectedIdeaIds =
    args.saveSelectedIdeaIds ?? jest.fn().mockResolvedValue(undefined);
  const notifyHitlResumed = args.notifyHitlResumed ?? jest.fn();
  const transition =
    args.transition ??
    jest.fn(async (run: RunRecord, to: RunRecord['status']) => ({
      ...run,
      status: to,
    }));
  const useCase = new ResumeHitlUseCase(
    unusedRepo({
      getById: async () => asSnapshot(args.run),
      saveSelectedIdeaIds,
    }),
    { notifyHitlResumed } as unknown as InProcessRunWorker,
    { transition } as unknown as RunLifecycleService,
    args.reader ?? fakeReader(),
  );
  return { useCase, saveSelectedIdeaIds, notifyHitlResumed, transition };
}

describe('ResumeHitlUseCase', () => {
  it('rejects page HITL mismatch with HITL_INVALID_SELECTION and does not persist or notify', async () => {
    const run = makeContentRun({
      status: 'awaiting_hitl',
      taskType: 'page_outline_then_copy',
    });
    const { useCase, saveSelectedIdeaIds, notifyHitlResumed, transition } =
      makeUseCase({
        run,
        reader: fakeReader({ getPageOutline: async () => outline }),
      });

    await expect(useCase.execute(run.id, ['not-the-outline-id'])).rejects.toMatchObject({
      name: 'DomainException',
      code: 'HITL_INVALID_SELECTION',
      httpStatus: 400,
      message: 'selectedIdeaIds must be exactly [outline.id]',
    });

    expect(saveSelectedIdeaIds).not.toHaveBeenCalled();
    expect(transition).not.toHaveBeenCalled();
    expect(notifyHitlResumed).not.toHaveBeenCalled();
  });

  it('rejects page HITL when outline is missing with CONFLICT and does not persist', async () => {
    const run = makeContentRun({
      status: 'awaiting_hitl',
      taskType: 'page_outline_then_copy',
    });
    const { useCase, saveSelectedIdeaIds, notifyHitlResumed, transition } =
      makeUseCase({ run });

    await expect(useCase.execute(run.id, [outline.id])).rejects.toMatchObject({
      name: 'DomainException',
      code: 'CONFLICT',
      httpStatus: 409,
    });

    expect(saveSelectedIdeaIds).not.toHaveBeenCalled();
    expect(transition).not.toHaveBeenCalled();
    expect(notifyHitlResumed).not.toHaveBeenCalled();
  });

  it('resumes page HITL when selectedIdeaIds is exactly [outline.id]', async () => {
    const run = makeContentRun({
      status: 'awaiting_hitl',
      taskType: 'page_outline_then_copy',
    });
    const { useCase, saveSelectedIdeaIds, notifyHitlResumed, transition } =
      makeUseCase({
        run,
        reader: fakeReader({ getPageOutline: async () => outline }),
      });

    await expect(useCase.execute(run.id, [outline.id])).resolves.toEqual({
      runId: run.id,
      status: 'running',
    });

    expect(saveSelectedIdeaIds).toHaveBeenCalledWith(run.id, [outline.id]);
    expect(transition).toHaveBeenCalledWith(asSnapshot(run), 'running');
    expect(notifyHitlResumed).toHaveBeenCalledWith({
      ...asSnapshot(run),
      status: 'running',
      selectedIdeaIds: [outline.id],
    });
  });

  it('resumes social HITL without reading a page outline', async () => {
    const run = makeSocialRun({
      status: 'awaiting_hitl',
      taskType: 'post_ideas_then_content',
    });
    const getPageOutline = jest.fn(async () => outline);
    const { useCase, saveSelectedIdeaIds, notifyHitlResumed } = makeUseCase({
      run,
      reader: fakeReader({ getPageOutline }),
    });

    await expect(useCase.execute(run.id, ['idea_1'])).resolves.toEqual({
      runId: run.id,
      status: 'running',
    });

    expect(getPageOutline).not.toHaveBeenCalled();
    expect(saveSelectedIdeaIds).toHaveBeenCalledWith(run.id, ['idea_1']);
    expect(notifyHitlResumed).toHaveBeenCalled();
  });
});

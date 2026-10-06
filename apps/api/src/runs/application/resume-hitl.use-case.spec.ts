import type { PageOutline } from '../../content/domain/content.types';
import { createUserId } from '@content-chain/shared';
import type { Env } from '../../shared/config/env';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type { GuestQuotaPort } from '../domain/guest-quota.port';
import type { RunResultReader } from '../domain/run-result-reader.port';
import type { RunRepository, RunSnapshot } from '../domain/run.port';
import type { RunRecord } from '../domain/run.types';
import { makeContentRun, makeSocialRun } from '../run-record.test-helpers';
import type { ReelIdea, SocialIdea } from '../../social/domain/social.types';
import type { InProcessRunWorker } from './in-process-run.worker';
import type { RunLifecycleService } from './run-lifecycle.service';
import { GuestRunPolicyService } from './guest-run-policy.service';
import { ResumeHitlUseCase } from './resume-hitl.use-case';

const outline: PageOutline = {
  id: 'outl_1',
  title: 'Audyt w 10 dni',
  sections: [{ id: 'osec_1', heading: 'Problem', summary: 'Chaos ops.' }],
};

const socialIdeas: SocialIdea[] = [
  { id: 'idea_1', title: 'T1', angle: 'A1', hook: 'H1' },
  { id: 'idea_2', title: 'T2', angle: 'A2', hook: 'H2' },
];

const reelIdeas: ReelIdea[] = [
  {
    id: 'idea_1',
    title: 'R1',
    description: 'D1',
    hook: 'H1',
    durationSeconds: 15,
  },
  {
    id: 'idea_2',
    title: 'R2',
    description: 'D2',
    hook: 'H2',
    durationSeconds: 30,
  },
];

const hitlInvalidSelection = {
  name: 'DomainException',
  code: 'HITL_INVALID_SELECTION',
  httpStatus: 400,
  message: 'selectedIdeaIds must be a non-empty unique subset of hitl draft',
} as const;

const ADMIN: AuthUserContext = {
  id: createUserId('usr_aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  email: 'admin@example.com',
  role: 'admin',
};
const GUEST: AuthUserContext = {
  id: createUserId('usr_bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'),
  email: 'guest@example.com',
  role: 'guest',
};
const OTHER_ID = createUserId('usr_cccccccc-cccc-4ccc-8ccc-cccccccccccc');

function makeGuestPolicy(): GuestRunPolicyService {
  return new GuestRunPolicyService(
    {} as Env,
    {} as RunRepository,
    {} as GuestQuotaPort,
  );
}

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
    findCancelRequestedLeftovers: unexpected,
    appendLog: unexpected,
    listLogs: unexpected,
    list: unexpected,
    setCancelRequested: unexpected,
    attemptCancel: unexpected,
    saveSelectedIdeaIds: unexpected,
    listByUser: unexpected,
    saveRating: unexpected,
    saveOutputEdited: unexpected,
    saveFinalizedAt: unexpected,
    setPipelineFinishedAt: unexpected,
    finalizeExpiredReviews: unexpected,
    countByUserAndType: unexpected,
    ...overrides,
  };
}

function asSnapshot(run: RunRecord): RunSnapshot {
  return {
    ...run,
    startedBy: null,
    userRating: null,
    outputEdited: false,
    reviewFinalizedAt: null,
    pipelineFinishedAt: null,
    cancelledAt: null,
  };
}

function fakeReader(overrides: Partial<RunResultReader> = {}): RunResultReader {
  return {
    listIdeas: async () => [],
    getContent: async () => null,
    listContents: async () => [],
    listReelIdeas: async () => [],
    getReelScript: async () => null,
    listReelScripts: async () => [],
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
    makeGuestPolicy(),
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

    await expect(
      useCase.execute(run.id, ['not-the-outline-id'], ADMIN),
    ).rejects.toMatchObject({
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

    await expect(
      useCase.execute(run.id, [outline.id], ADMIN),
    ).rejects.toMatchObject({
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

    await expect(useCase.execute(run.id, [outline.id], ADMIN)).resolves.toEqual(
      {
        runId: run.id,
        status: 'running',
      },
    );

    expect(saveSelectedIdeaIds).toHaveBeenCalledWith(run.id, [outline.id]);
    expect(transition).toHaveBeenCalledWith(asSnapshot(run), 'running');
    expect(notifyHitlResumed).toHaveBeenCalledWith({
      ...asSnapshot(run),
      status: 'running',
      selectedIdeaIds: [outline.id],
    });
  });

  it('rejects social HITL empty selectedIdeaIds with HITL_INVALID_SELECTION and does not persist', async () => {
    const run = makeSocialRun({
      status: 'awaiting_hitl',
      taskType: 'post_ideas_then_content',
    });
    const { useCase, saveSelectedIdeaIds, notifyHitlResumed, transition } =
      makeUseCase({
        run,
        reader: fakeReader({ listIdeas: async () => socialIdeas }),
      });

    await expect(useCase.execute(run.id, [], ADMIN)).rejects.toMatchObject(
      hitlInvalidSelection,
    );

    expect(saveSelectedIdeaIds).not.toHaveBeenCalled();
    expect(transition).not.toHaveBeenCalled();
    expect(notifyHitlResumed).not.toHaveBeenCalled();
  });

  it('rejects social HITL duplicate ids with HITL_INVALID_SELECTION and does not persist', async () => {
    const run = makeSocialRun({
      status: 'awaiting_hitl',
      taskType: 'post_ideas_then_content',
    });
    const { useCase, saveSelectedIdeaIds, notifyHitlResumed, transition } =
      makeUseCase({
        run,
        reader: fakeReader({ listIdeas: async () => socialIdeas }),
      });

    await expect(
      useCase.execute(run.id, ['idea_1', 'idea_1'], ADMIN),
    ).rejects.toMatchObject(hitlInvalidSelection);

    expect(saveSelectedIdeaIds).not.toHaveBeenCalled();
    expect(transition).not.toHaveBeenCalled();
    expect(notifyHitlResumed).not.toHaveBeenCalled();
  });

  it('rejects social HITL id outside draft with HITL_INVALID_SELECTION and does not persist', async () => {
    const run = makeSocialRun({
      status: 'awaiting_hitl',
      taskType: 'post_ideas_then_content',
    });
    const { useCase, saveSelectedIdeaIds, notifyHitlResumed, transition } =
      makeUseCase({
        run,
        reader: fakeReader({ listIdeas: async () => socialIdeas }),
      });

    await expect(
      useCase.execute(run.id, ['not-in-draft'], ADMIN),
    ).rejects.toMatchObject(hitlInvalidSelection);

    expect(saveSelectedIdeaIds).not.toHaveBeenCalled();
    expect(transition).not.toHaveBeenCalled();
    expect(notifyHitlResumed).not.toHaveBeenCalled();
  });

  it('resumes social HITL without reading a page outline', async () => {
    const run = makeSocialRun({
      status: 'awaiting_hitl',
      taskType: 'post_ideas_then_content',
    });
    const getPageOutline = jest.fn(async () => outline);
    const { useCase, saveSelectedIdeaIds, notifyHitlResumed, transition } =
      makeUseCase({
        run,
        reader: fakeReader({
          getPageOutline,
          listIdeas: async () => socialIdeas,
        }),
      });

    await expect(useCase.execute(run.id, ['idea_1'], ADMIN)).resolves.toEqual({
      runId: run.id,
      status: 'running',
    });

    expect(getPageOutline).not.toHaveBeenCalled();
    expect(saveSelectedIdeaIds).toHaveBeenCalledWith(run.id, ['idea_1']);
    expect(transition).toHaveBeenCalledWith(asSnapshot(run), 'running');
    expect(notifyHitlResumed).toHaveBeenCalledWith({
      ...asSnapshot(run),
      status: 'running',
      selectedIdeaIds: ['idea_1'],
    });
  });

  it('resumes social HITL when two distinct ids belong to the draft', async () => {
    const run = makeSocialRun({
      status: 'awaiting_hitl',
      taskType: 'post_ideas_then_content',
    });
    const selectedIdeaIds = ['idea_1', 'idea_2'];
    const { useCase, saveSelectedIdeaIds, notifyHitlResumed, transition } =
      makeUseCase({
        run,
        reader: fakeReader({ listIdeas: async () => socialIdeas }),
      });

    await expect(
      useCase.execute(run.id, selectedIdeaIds, ADMIN),
    ).resolves.toEqual({
      runId: run.id,
      status: 'running',
    });

    expect(saveSelectedIdeaIds).toHaveBeenCalledWith(run.id, selectedIdeaIds);
    expect(transition).toHaveBeenCalledWith(asSnapshot(run), 'running');
    expect(notifyHitlResumed).toHaveBeenCalledWith({
      ...asSnapshot(run),
      status: 'running',
      selectedIdeaIds,
    });
  });

  it('resumes reel HITL from listReelIdeas without reading post ideas', async () => {
    const run = makeSocialRun({
      status: 'awaiting_hitl',
      taskType: 'reel_ideas_then_scripts',
    });
    const listIdeas = jest.fn(async () => socialIdeas);
    const { useCase, saveSelectedIdeaIds, notifyHitlResumed, transition } =
      makeUseCase({
        run,
        reader: fakeReader({
          listIdeas,
          listReelIdeas: async () => reelIdeas,
        }),
      });

    await expect(
      useCase.execute(run.id, ['idea_1', 'idea_2'], ADMIN),
    ).resolves.toEqual({
      runId: run.id,
      status: 'running',
    });

    expect(listIdeas).not.toHaveBeenCalled();
    expect(saveSelectedIdeaIds).toHaveBeenCalledWith(run.id, [
      'idea_1',
      'idea_2',
    ]);
    expect(transition).toHaveBeenCalledWith(asSnapshot(run), 'running');
    expect(notifyHitlResumed).toHaveBeenCalledWith({
      ...asSnapshot(run),
      status: 'running',
      selectedIdeaIds: ['idea_1', 'idea_2'],
    });
  });

  it('allows a guest to resume HITL on their own run', async () => {
    const run = makeContentRun({
      status: 'awaiting_hitl',
      taskType: 'page_outline_then_copy',
      startedByUserId: GUEST.id,
    });
    const { useCase, saveSelectedIdeaIds } = makeUseCase({
      run,
      reader: fakeReader({ getPageOutline: async () => outline }),
    });

    await expect(useCase.execute(run.id, [outline.id], GUEST)).resolves.toEqual(
      {
        runId: run.id,
        status: 'running',
      },
    );
    expect(saveSelectedIdeaIds).toHaveBeenCalledWith(run.id, [outline.id]);
  });

  it('rejects a guest HITL on a foreign run with FORBIDDEN before persist', async () => {
    const run = makeContentRun({
      status: 'awaiting_hitl',
      taskType: 'page_outline_then_copy',
      startedByUserId: OTHER_ID,
    });
    const { useCase, saveSelectedIdeaIds, notifyHitlResumed, transition } =
      makeUseCase({
        run,
        reader: fakeReader({ getPageOutline: async () => outline }),
      });

    await expect(
      useCase.execute(run.id, [outline.id], GUEST),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'FORBIDDEN',
      httpStatus: 403,
    });
    expect(saveSelectedIdeaIds).not.toHaveBeenCalled();
    expect(transition).not.toHaveBeenCalled();
    expect(notifyHitlResumed).not.toHaveBeenCalled();
  });
});

import {
  createUserId,
  isUserId,
  type ConversationId,
  type RunId,
  type RunStatus,
  type UserId,
} from '@content-chain/shared';
import { newConversationId, newRunId } from '../../shared/http/new-ids';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type { RunRepository, RunSnapshot } from '../domain/run.port';
import { makeSocialSnapshot } from '../run-record.test-helpers';
import { CancelRunUseCase } from './cancel-run.use-case';
import type { GetRunOutput, GetRunUseCase } from './get-run.use-case';
import type { RunAbortRegistry } from './run-abort.registry';
import type { RunLifecycleService } from './run-lifecycle.service';

const ACTOR: UserId = createUserId('usr_11111111-1111-4111-8111-111111111111');
const OTHER: UserId = createUserId('usr_22222222-2222-4222-8222-222222222222');
const ACTOR_USER: AuthUserContext = {
  id: ACTOR,
  email: 'user@example.com',
  role: 'user',
};

function unusedRepo(overrides: Partial<RunRepository> = {}): RunRepository {
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

function makeGetRunOutput(overrides: Partial<GetRunOutput> = {}): GetRunOutput {
  const runId = overrides.runId ?? newRunId();
  const conversationId: ConversationId =
    overrides.conversationId ?? newConversationId();
  return {
    runId,
    taskType: 'post_ideas',
    platform: 'linkedin',
    contentKind: null,
    language: 'pl',
    brief: { topic: 'Q3' },
    status: 'running',
    conversationId,
    createdAt: '2026-09-29T12:00:00.000Z',
    startedBy: { id: ACTOR, email: 'user@example.com' },
    userRating: null,
    outputEdited: false,
    reviewFinalizedAt: null,
    pipelineFinishedAt: null,
    reviewExpiresAt: null,
    cancelledAt: null,
    result: {
      ideas: [],
      content: null,
      contents: [],
      reelIdeas: [],
      reelScript: null,
      reelScripts: [],
      pageOutline: null,
      pageDocument: null,
    },
    hitl: null,
    ...overrides,
  };
}

function asRepoSnapshot(output: GetRunOutput, status: RunStatus): RunSnapshot {
  const startedById = output.startedBy?.id;
  return makeSocialSnapshot({
    id: output.runId,
    conversationId: output.conversationId,
    status,
    startedByUserId:
      startedById !== undefined && isUserId(startedById)
        ? createUserId(startedById)
        : null,
    startedBy: output.startedBy,
    cancelRequested: false,
    cancelledAt:
      status === 'cancelled' ? new Date('2026-09-29T12:01:00.000Z') : null,
  });
}

function setup(
  args: {
    getRunOutputs?: GetRunOutput[];
    attemptCancelResult?: boolean;
    latestAfterCas?: RunSnapshot | null;
    /** Initial repo snapshot for first getById; defaults from getRunOutputs[0]. */
    initialSnapshot?: RunSnapshot | null;
  } = {},
) {
  const setCancelRequested = jest.fn(async (_id: RunId): Promise<void> => {});
  const attemptCancel = jest.fn(
    async (_id: RunId, _at: Date): Promise<boolean> =>
      args.attemptCancelResult ?? true,
  );

  const outputs = args.getRunOutputs ?? [];
  const initialOutput = outputs[0];
  const initialSnapshot =
    args.initialSnapshot !== undefined
      ? args.initialSnapshot
      : initialOutput
        ? asRepoSnapshot(initialOutput, initialOutput.status)
        : null;

  let getByIdCall = 0;
  const getById = jest.fn(async (_id: RunId): Promise<RunSnapshot | null> => {
    getByIdCall += 1;
    if (getByIdCall === 1) {
      return initialSnapshot;
    }
    if (args.latestAfterCas !== undefined) {
      return args.latestAfterCas;
    }
    return initialSnapshot;
  });
  const requestCancel = jest.fn((_id: RunId): void => {});
  const appendLog = jest.fn(async (): Promise<void> => {});
  const publishCancelled = jest.fn((_id: RunId): void => {});

  let getRunCall = 0;
  const getRunExecute = jest.fn(
    async (_runId: RunId, _actor: AuthUserContext): Promise<GetRunOutput> => {
      const next = outputs[getRunCall] ?? outputs[outputs.length - 1];
      getRunCall += 1;
      if (!next) {
        throw new Error('getRun mock exhausted');
      }
      return next;
    },
  );

  const useCase = new CancelRunUseCase(
    unusedRepo({
      setCancelRequested,
      attemptCancel,
      getById,
    }),
    { requestCancel } as unknown as RunAbortRegistry,
    { appendLog, publishCancelled } as unknown as RunLifecycleService,
    { execute: getRunExecute } as unknown as GetRunUseCase,
  );

  return {
    useCase,
    setCancelRequested,
    attemptCancel,
    getById,
    requestCancel,
    appendLog,
    publishCancelled,
    getRunExecute,
  };
}

describe('CancelRunUseCase', () => {
  it('happy CAS: flag → attemptCancel → abort → log → SSE → getRun', async () => {
    const initial = makeGetRunOutput({ status: 'running' });
    const cancelled = makeGetRunOutput({
      runId: initial.runId,
      conversationId: initial.conversationId,
      status: 'cancelled',
      cancelledAt: '2026-09-29T12:01:00.000Z',
    });
    const {
      useCase,
      setCancelRequested,
      attemptCancel,
      requestCancel,
      appendLog,
      publishCancelled,
      getRunExecute,
    } = setup({
      getRunOutputs: [cancelled],
      initialSnapshot: asRepoSnapshot(initial, 'running'),
    });

    await expect(useCase.execute(initial.runId, ACTOR_USER)).resolves.toEqual(
      cancelled,
    );

    expect(setCancelRequested).toHaveBeenCalledWith(initial.runId);
    expect(attemptCancel).toHaveBeenCalledWith(initial.runId, expect.any(Date));
    expect(requestCancel).toHaveBeenCalledWith(initial.runId);
    expect(appendLog).toHaveBeenCalledWith({
      runId: initial.runId,
      conversationId: initial.conversationId,
      level: 'info',
      message: 'Run cancelled by user',
      step: 'CancelRunUseCase',
    });
    expect(publishCancelled).toHaveBeenCalledWith(initial.runId);
    expect(getRunExecute).toHaveBeenCalledTimes(1);
    expect(getRunExecute).toHaveBeenCalledWith(initial.runId, ACTOR_USER);
  });

  it('already cancelled: returns snapshot without persist, abort, or cancel log', async () => {
    const cancelled = makeGetRunOutput({
      status: 'cancelled',
      cancelledAt: '2026-09-29T12:01:00.000Z',
    });
    const {
      useCase,
      setCancelRequested,
      attemptCancel,
      requestCancel,
      appendLog,
      publishCancelled,
      getRunExecute,
    } = setup({ getRunOutputs: [cancelled] });

    await expect(useCase.execute(cancelled.runId, ACTOR_USER)).resolves.toEqual(
      cancelled,
    );

    expect(setCancelRequested).not.toHaveBeenCalled();
    expect(attemptCancel).not.toHaveBeenCalled();
    expect(requestCancel).not.toHaveBeenCalled();
    expect(appendLog).not.toHaveBeenCalled();
    expect(publishCancelled).not.toHaveBeenCalled();
    expect(getRunExecute).toHaveBeenCalledTimes(1);
  });

  it('foreign startedBy → FORBIDDEN 403 before persist', async () => {
    const initial = makeGetRunOutput({
      status: 'running',
      startedBy: { id: OTHER, email: 'other@example.com' },
    });
    const {
      useCase,
      setCancelRequested,
      attemptCancel,
      requestCancel,
      getRunExecute,
    } = setup({ getRunOutputs: [initial] });

    await expect(
      useCase.execute(initial.runId, ACTOR_USER),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'FORBIDDEN',
      httpStatus: 403,
    });
    expect(setCancelRequested).not.toHaveBeenCalled();
    expect(attemptCancel).not.toHaveBeenCalled();
    expect(requestCancel).not.toHaveBeenCalled();
    expect(getRunExecute).not.toHaveBeenCalled();
  });

  it.each(['completed', 'failed'] as const)(
    '%s → RUN_NOT_CANCELABLE 409 without setCancelRequested',
    async (status) => {
      const initial = makeGetRunOutput({ status });
      const { useCase, setCancelRequested, attemptCancel, requestCancel } =
        setup({ getRunOutputs: [initial] });

      await expect(
        useCase.execute(initial.runId, ACTOR_USER),
      ).rejects.toMatchObject({
        name: 'DomainException',
        code: 'RUN_NOT_CANCELABLE',
        httpStatus: 409,
      });
      expect(setCancelRequested).not.toHaveBeenCalled();
      expect(attemptCancel).not.toHaveBeenCalled();
      expect(requestCancel).not.toHaveBeenCalled();
    },
  );

  it('CAS false + latest cancelled → idempotent 200', async () => {
    const initial = makeGetRunOutput({ status: 'running' });
    const cancelled = makeGetRunOutput({
      runId: initial.runId,
      conversationId: initial.conversationId,
      status: 'cancelled',
      cancelledAt: '2026-09-29T12:01:00.000Z',
    });
    const {
      useCase,
      setCancelRequested,
      attemptCancel,
      getById,
      requestCancel,
      appendLog,
      publishCancelled,
      getRunExecute,
    } = setup({
      getRunOutputs: [cancelled],
      initialSnapshot: asRepoSnapshot(initial, 'running'),
      attemptCancelResult: false,
      latestAfterCas: asRepoSnapshot(cancelled, 'cancelled'),
    });

    await expect(useCase.execute(initial.runId, ACTOR_USER)).resolves.toEqual(
      cancelled,
    );

    expect(setCancelRequested).toHaveBeenCalledWith(initial.runId);
    expect(attemptCancel).toHaveBeenCalledWith(initial.runId, expect.any(Date));
    expect(getById).toHaveBeenCalledWith(initial.runId);
    expect(requestCancel).not.toHaveBeenCalled();
    expect(appendLog).not.toHaveBeenCalled();
    expect(publishCancelled).not.toHaveBeenCalled();
    expect(getRunExecute).toHaveBeenCalledTimes(1);
  });

  it('CAS false + latest completed → RUN_NOT_CANCELABLE', async () => {
    const initial = makeGetRunOutput({ status: 'running' });
    const {
      useCase,
      setCancelRequested,
      attemptCancel,
      getById,
      requestCancel,
      appendLog,
      publishCancelled,
    } = setup({
      getRunOutputs: [initial],
      initialSnapshot: asRepoSnapshot(initial, 'running'),
      attemptCancelResult: false,
      latestAfterCas: asRepoSnapshot(initial, 'completed'),
    });

    await expect(
      useCase.execute(initial.runId, ACTOR_USER),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'RUN_NOT_CANCELABLE',
      httpStatus: 409,
    });
    expect(setCancelRequested).toHaveBeenCalledWith(initial.runId);
    expect(attemptCancel).toHaveBeenCalledWith(initial.runId, expect.any(Date));
    expect(getById).toHaveBeenCalledWith(initial.runId);
    expect(requestCancel).not.toHaveBeenCalled();
    expect(appendLog).not.toHaveBeenCalled();
    expect(publishCancelled).not.toHaveBeenCalled();
  });

  it('missing run → RUN_NOT_FOUND 404 from getById', async () => {
    const runId = newRunId();
    const { useCase, setCancelRequested, attemptCancel, requestCancel } = setup(
      {
        initialSnapshot: null,
        getRunOutputs: [],
      },
    );

    await expect(useCase.execute(runId, ACTOR_USER)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'RUN_NOT_FOUND',
      httpStatus: 404,
    });
    expect(setCancelRequested).not.toHaveBeenCalled();
    expect(attemptCancel).not.toHaveBeenCalled();
    expect(requestCancel).not.toHaveBeenCalled();
  });
});

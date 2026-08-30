import type { GetCompletenessUseCase } from '../../company-context/application/get-completeness.use-case';
import type { Completeness } from '../../company-context/domain/company-context.types';
import { DomainException } from '../../shared/exceptions/domain.exception';
import type { RunRepository, RunSnapshot } from '../domain/run.port';
import type { RunRecord } from '../domain/run.types';
import type { InProcessRunWorker } from './in-process-run.worker';
import { StartRunUseCase, type StartRunCommand } from './start-run.use-case';

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

function validCommand(
  overrides: Partial<StartRunCommand> = {},
): StartRunCommand {
  return {
    taskType: 'post_ideas',
    platform: 'linkedin',
    language: 'pl',
    brief: { topic: 'Q3' },
    ...overrides,
  };
}

function asSnapshot(run: RunRecord): RunSnapshot {
  return { ...run, startedBy: null };
}

function makeUseCase(args: {
  gate?: Completeness;
  runs: RunRepository;
  notifyQueued?: jest.Mock;
}) {
  const completeness = {
    execute: jest.fn(async () => args.gate ?? { complete: true, missing: [] }),
  };
  const notifyQueued = args.notifyQueued ?? jest.fn();
  return {
    useCase: new StartRunUseCase(
      completeness as unknown as GetCompletenessUseCase,
      args.runs,
      { notifyQueued } as unknown as InProcessRunWorker,
    ),
    completeness,
    notifyQueued,
  };
}

describe('StartRunUseCase', () => {
  it('rejects an invalid command with VALIDATION_FAILED and skips the gate and persist', async () => {
    const create = jest.fn();
    const { useCase, completeness, notifyQueued } = makeUseCase({
      runs: unusedRepo({ create }),
    });

    await expect(
      useCase.execute({
        taskType: 'not-a-task',
        platform: 'linkedin',
        language: 'pl',
        brief: { topic: 'Q3' },
      } as unknown as StartRunCommand),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
      message: 'Application command validation failed',
    });

    expect(completeness.execute).not.toHaveBeenCalled();
    expect(create).not.toHaveBeenCalled();
    expect(notifyQueued).not.toHaveBeenCalled();
  });

  it('rejects an incomplete company context with CONTEXT_INCOMPLETE and does not persist', async () => {
    const create = jest.fn();
    const { useCase, completeness, notifyQueued } = makeUseCase({
      gate: { complete: false, missing: ['identity', 'cta'] },
      runs: unusedRepo({ create }),
    });

    const error = await useCase
      .execute(validCommand())
      .catch((err: unknown) => err);

    expect(error).toBeInstanceOf(DomainException);
    expect(error).toMatchObject({
      code: 'CONTEXT_INCOMPLETE',
      httpStatus: 409,
      message: 'Company context is incomplete',
      details: [{ section: 'identity' }, { section: 'cta' }],
    });
    expect(completeness.execute).toHaveBeenCalledTimes(1);
    expect(create).not.toHaveBeenCalled();
    expect(notifyQueued).not.toHaveBeenCalled();
  });

  it('persists a queued run, notifies the worker, then returns ids and the stored status', async () => {
    const created: RunRecord[] = [];
    const create = jest.fn(async (run: RunRecord) => {
      created.push(run);
    });
    const getById = jest.fn(async (id: RunRecord['id']) => {
      const run = created.find((row) => row.id === id);
      return run ? asSnapshot(run) : null;
    });
    const { useCase, notifyQueued } = makeUseCase({
      runs: unusedRepo({ create, getById }),
    });

    const command = validCommand({
      taskType: 'post_content',
      platform: 'facebook',
      language: 'en',
      brief: {
        topic: 'Launch',
        audience: 'founders',
        goal: 'awareness',
        ideaCount: 3,
      },
    });
    const result = await useCase.execute(command);

    expect(created).toHaveLength(1);
    const run = created[0]!;
    expect(run.id).toMatch(/^run_/);
    expect(run.conversationId).toMatch(/^conv_/);
    expect(run).toEqual(
      expect.objectContaining({
        taskType: 'post_content',
        platform: 'facebook',
        language: 'en',
        status: 'queued',
        brief: command.brief,
        selectedIdeaIds: null,
        startedByUserId: null,
        pipelinePhase: null,
        ideasRefineCount: 0,
        contentRefineCount: 0,
        recoveryAttempts: 0,
      }),
    );
    expect(run.createdAt).toBeInstanceOf(Date);

    expect(notifyQueued).toHaveBeenCalledTimes(1);
    expect(getById).toHaveBeenCalledWith(run.id);
    expect(create.mock.invocationCallOrder[0]).toBeLessThan(
      notifyQueued.mock.invocationCallOrder[0]!,
    );
    expect(notifyQueued.mock.invocationCallOrder[0]).toBeLessThan(
      getById.mock.invocationCallOrder[0]!,
    );

    expect(result).toEqual({
      id: run.id,
      conversationId: run.conversationId,
      status: 'queued',
    });
  });

  it('stores selectedIdeaIds when the command includes them', async () => {
    const created: RunRecord[] = [];
    const { useCase } = makeUseCase({
      runs: unusedRepo({
        create: async (run) => {
          created.push(run);
        },
        getById: async (id) => {
          const run = created.find((row) => row.id === id);
          return run ? asSnapshot(run) : null;
        },
      }),
    });

    await useCase.execute(
      validCommand({ selectedIdeaIds: ['idea-1', 'idea-2'] }),
    );

    expect(created[0]?.selectedIdeaIds).toEqual(['idea-1', 'idea-2']);
  });

  it('returns the snapshot status when getById already advanced past queued', async () => {
    const created: RunRecord[] = [];
    const { useCase } = makeUseCase({
      runs: unusedRepo({
        create: async (run) => {
          created.push(run);
        },
        getById: async (id) => {
          const run = created.find((row) => row.id === id);
          return run ? asSnapshot({ ...run, status: 'running' }) : null;
        },
      }),
    });

    const result = await useCase.execute(validCommand());

    expect(result.status).toBe('running');
    expect(result.id).toBe(created[0]?.id);
  });

  it('falls back to queued when getById returns null after create', async () => {
    const create = jest.fn(async (_run: RunRecord) => undefined);
    const { useCase } = makeUseCase({
      runs: unusedRepo({
        create,
        getById: async () => null,
      }),
    });

    const result = await useCase.execute(validCommand());

    expect(result.status).toBe('queued');
    expect(result.id).toBe(create.mock.calls[0]![0].id);
    expect(result.conversationId).toBe(create.mock.calls[0]![0].conversationId);
  });
});

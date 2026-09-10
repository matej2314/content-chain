import {
  createRunId,
  createUserId,
  isFeedbackId,
  type RunId,
} from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type {
  FeedbackEntry,
  FeedbackRepository,
} from '../domain/feedback.types';
import type {
  FeedbackRunLookup,
  FeedbackRunReader,
} from '../domain/feedback-run.reader.port';
import { CreateFeedbackUseCase } from './create-feedback.use-case';

const AUTHOR: AuthUserContext = {
  id: createUserId('usr_11111111-1111-4111-8111-111111111111'),
  email: 'user@example.com',
  role: 'user',
};

const OTHER_USER_ID = createUserId(
  'usr_22222222-2222-4222-8222-222222222222',
);

const OWN_RUN_ID = 'run_aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

function unusedFeedback(
  overrides: Partial<FeedbackRepository> = {},
): FeedbackRepository {
  return {
    save: async () => {
      throw new Error('unexpected save');
    },
    ...overrides,
  };
}

function unusedReader(
  overrides: Partial<FeedbackRunReader> = {},
): FeedbackRunReader {
  return {
    getStartedBy: async () => {
      throw new Error('unexpected lookup');
    },
    ...overrides,
  };
}

function makeUseCase(args: {
  feedback: FeedbackRepository;
  runReader?: FeedbackRunReader;
}): CreateFeedbackUseCase {
  return new CreateFeedbackUseCase(
    args.feedback,
    args.runReader ?? unusedReader(),
  );
}

describe('CreateFeedbackUseCase', () => {
  it('saves application feedback for the session author', async () => {
    const save = jest.fn(async (_entry: FeedbackEntry) => undefined);
    const useCase = makeUseCase({ feedback: unusedFeedback({ save }) });

    const result = await useCase.execute(
      { targetType: 'application', body: 'Great app' },
      AUTHOR,
    );

    expect(isFeedbackId(result.id)).toBe(true);
    expect(result).toMatchObject({
      targetType: 'application',
      agentKey: null,
      runId: null,
      body: 'Great app',
      authorId: AUTHOR.id,
    });
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledWith(result);
  });

  it('saves agent feedback with a catalog agentKey', async () => {
    const save = jest.fn(async (_entry: FeedbackEntry) => undefined);
    const useCase = makeUseCase({ feedback: unusedFeedback({ save }) });

    const result = await useCase.execute(
      {
        targetType: 'agent',
        body: 'Ideation was slow',
        agentKey: 'IdeationAgent',
      },
      AUTHOR,
    );

    expect(result).toMatchObject({
      targetType: 'agent',
      agentKey: 'IdeationAgent',
      runId: null,
      body: 'Ideation was slow',
      authorId: AUTHOR.id,
    });
    expect(save).toHaveBeenCalledTimes(1);
  });

  it('rejects an unknown agentKey with VALIDATION_FAILED and skips persist', async () => {
    const save = jest.fn(async (_entry: FeedbackEntry) => undefined);
    const useCase = makeUseCase({ feedback: unusedFeedback({ save }) });

    await expect(
      useCase.execute(
        {
          targetType: 'agent',
          body: 'Nope',
          agentKey: 'UnknownAgent',
        },
        AUTHOR,
      ),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
      message: 'Application command validation failed',
    });
    expect(save).not.toHaveBeenCalled();
  });

  it('saves run feedback when the session author started the run', async () => {
    const save = jest.fn(async (_entry: FeedbackEntry) => undefined);
    const getStartedBy = jest.fn(
      async (_runId: RunId): Promise<FeedbackRunLookup> => ({
        kind: 'found',
        startedBy: AUTHOR.id,
      }),
    );
    const useCase = makeUseCase({
      feedback: unusedFeedback({ save }),
      runReader: unusedReader({ getStartedBy }),
    });

    const result = await useCase.execute(
      { targetType: 'run', runId: OWN_RUN_ID, body: 'Nice run' },
      AUTHOR,
    );

    expect(result).toMatchObject({
      targetType: 'run',
      agentKey: null,
      runId: createRunId(OWN_RUN_ID),
      body: 'Nice run',
      authorId: AUTHOR.id,
    });
    expect(getStartedBy).toHaveBeenCalledWith(createRunId(OWN_RUN_ID));
    expect(save).toHaveBeenCalledTimes(1);
  });

  it('rejects another user run with FORBIDDEN and skips persist', async () => {
    const save = jest.fn(async (_entry: FeedbackEntry) => undefined);
    const useCase = makeUseCase({
      feedback: unusedFeedback({ save }),
      runReader: unusedReader({
        getStartedBy: async () => ({
          kind: 'found',
          startedBy: OTHER_USER_ID,
        }),
      }),
    });

    const error = await useCase
      .execute(
        { targetType: 'run', runId: OWN_RUN_ID, body: 'Not mine' },
        AUTHOR,
      )
      .catch((err: unknown) => err);

    expect(error).toBeInstanceOf(DomainException);
    expect(error).toMatchObject({
      code: 'FORBIDDEN',
      httpStatus: 403,
      message: 'Cannot leave feedback on another user run',
    });
    expect(save).not.toHaveBeenCalled();
  });

  it('rejects a run without startedBy with FORBIDDEN', async () => {
    const save = jest.fn(async (_entry: FeedbackEntry) => undefined);
    const useCase = makeUseCase({
      feedback: unusedFeedback({ save }),
      runReader: unusedReader({
        getStartedBy: async () => ({ kind: 'found', startedBy: null }),
      }),
    });

    await expect(
      useCase.execute(
        { targetType: 'run', runId: OWN_RUN_ID, body: 'Orphan run' },
        AUTHOR,
      ),
    ).rejects.toMatchObject({
      code: 'FORBIDDEN',
      httpStatus: 403,
    });
    expect(save).not.toHaveBeenCalled();
  });

  it('rejects a missing run with RUN_NOT_FOUND', async () => {
    const save = jest.fn(async (_entry: FeedbackEntry) => undefined);
    const useCase = makeUseCase({
      feedback: unusedFeedback({ save }),
      runReader: unusedReader({
        getStartedBy: async () => ({ kind: 'missing' }),
      }),
    });

    await expect(
      useCase.execute(
        { targetType: 'run', runId: OWN_RUN_ID, body: 'Ghost run' },
        AUTHOR,
      ),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'RUN_NOT_FOUND',
      httpStatus: 404,
      message: 'Run not found',
    });
    expect(save).not.toHaveBeenCalled();
  });

  it('rejects an invalid runId format with VALIDATION_FAILED and skips lookup', async () => {
    const save = jest.fn(async (_entry: FeedbackEntry) => undefined);
    const getStartedBy = jest.fn(
      async (_runId: RunId): Promise<FeedbackRunLookup> => ({
        kind: 'missing',
      }),
    );
    const useCase = makeUseCase({
      feedback: unusedFeedback({ save }),
      runReader: unusedReader({ getStartedBy }),
    });

    await expect(
      useCase.execute(
        { targetType: 'run', runId: 'not-a-run-id', body: 'Bad id' },
        AUTHOR,
      ),
    ).rejects.toMatchObject({
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
      message: 'Invalid runId format',
    });
    expect(getStartedBy).not.toHaveBeenCalled();
    expect(save).not.toHaveBeenCalled();
  });

  it('allows a second save on the same target', async () => {
    const save = jest.fn(async (_entry: FeedbackEntry) => undefined);
    const useCase = makeUseCase({ feedback: unusedFeedback({ save }) });
    const input = { targetType: 'application' as const, body: 'Again' };

    const first = await useCase.execute(input, AUTHOR);
    const second = await useCase.execute(input, AUTHOR);

    expect(save).toHaveBeenCalledTimes(2);
    expect(first.id).not.toBe(second.id);
    expect(first.authorId).toBe(AUTHOR.id);
    expect(second.authorId).toBe(AUTHOR.id);
  });
});

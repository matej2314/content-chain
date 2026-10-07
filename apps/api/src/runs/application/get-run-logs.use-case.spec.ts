import { createUserId } from '@content-chain/shared';
import type { Env } from '../../shared/config/env';
import { newConversationId, newRunId } from '../../shared/http/new-ids';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type { GuestQuotaPort } from '../domain/guest-quota.port';
import type { RunRepository } from '../domain/run.port';
import type { RunLogEntry } from '../domain/run.types';
import { makeSocialRun } from '../run-record.test-helpers';
import { GetRunLogsUseCase } from './get-run-logs.use-case';
import { GuestRunPolicyService } from './guest/guest-run-policy.service';

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

describe('GetRunLogsUseCase', () => {
  it('returns mapped log items for a found run', async () => {
    const run = makeSocialRun();
    const entry: RunLogEntry = {
      runId: run.id,
      conversationId: newConversationId(),
      at: new Date('2026-10-03T12:00:00.000Z'),
      level: 'info',
      message: 'started',
      step: 'worker',
      requestId: 'req_1',
    };
    const listLogs = jest.fn(async () => [entry]);
    const useCase = new GetRunLogsUseCase(
      unusedRepo({
        getById: async () => ({
          ...run,
          startedBy: null,
          userRating: null,
          outputEdited: false,
          reviewFinalizedAt: null,
          pipelineFinishedAt: null,
          cancelledAt: null,
        }),
        listLogs,
      }),
      makeGuestPolicy(),
    );

    await expect(useCase.execute(run.id, ADMIN)).resolves.toEqual({
      items: [
        {
          at: entry.at.toISOString(),
          level: 'info',
          message: 'started',
          step: 'worker',
          requestId: 'req_1',
          conversationId: entry.conversationId,
        },
      ],
    });
    expect(listLogs).toHaveBeenCalledWith(run.id);
  });

  it('rejects a guest reading logs of a foreign run before listLogs', async () => {
    const run = makeSocialRun({ startedByUserId: OTHER_ID });
    const listLogs = jest.fn(async () => []);
    const useCase = new GetRunLogsUseCase(
      unusedRepo({
        getById: async () => ({
          ...run,
          startedBy: null,
          userRating: null,
          outputEdited: false,
          reviewFinalizedAt: null,
          pipelineFinishedAt: null,
          cancelledAt: null,
        }),
        listLogs,
      }),
      makeGuestPolicy(),
    );

    await expect(useCase.execute(run.id, GUEST)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'FORBIDDEN',
      httpStatus: 403,
    });
    expect(listLogs).not.toHaveBeenCalled();
  });

  it('throws RUN_NOT_FOUND when the run is missing', async () => {
    const useCase = new GetRunLogsUseCase(
      unusedRepo({ getById: async () => null }),
      makeGuestPolicy(),
    );

    await expect(useCase.execute(newRunId(), ADMIN)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'RUN_NOT_FOUND',
      httpStatus: 404,
    });
  });
});

import {
  createEmailChangeRequestId,
  createUserId,
} from '@content-chain/shared';
import type {
  EmailChangeRequestRecord,
  EmailChangeRequestRepository,
} from '../domain/email-change-request.repository.port';
import { ConfirmEmailChangeUseCase } from './confirm-email-change.use-case';
import { hashRefreshToken } from './auth.helpers';

const USER_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const REQUEST_ID = createEmailChangeRequestId(
  'ecr_11111111-1111-4111-8111-111111111111',
);
const CREATED_AT = new Date('2026-01-01T00:00:00.000Z');
const EXPIRES_AT = new Date('2026-12-01T00:00:00.000Z');
const RAW_TOKEN = 'email-change-raw-token';
const PENDING_EMAIL = 'next@example.com';

function unusedEmailChanges(
  overrides: Partial<EmailChangeRequestRepository> = {},
): EmailChangeRequestRepository {
  const unexpected = async () => {
    throw new Error('unexpected email-change repository call');
  };
  return {
    upsertForUser: unexpected,
    findByUserId: unexpected,
    findValidByTokenHash: unexpected,
    findByPendingEmail: unexpected,
    rotateToken: unexpected,
    consumeAndApplyEmail: unexpected,
    deleteByUserId: unexpected,
    ...overrides,
  };
}

function makePending(
  overrides: Partial<EmailChangeRequestRecord> = {},
): EmailChangeRequestRecord {
  return {
    id: REQUEST_ID,
    userId: USER_ID,
    pendingEmail: PENDING_EMAIL,
    tokenHash: hashRefreshToken(RAW_TOKEN),
    expiresAt: EXPIRES_AT,
    createdAt: CREATED_AT,
    ...overrides,
  };
}

describe('ConfirmEmailChangeUseCase', () => {
  it('applies pending email and returns { id, email, role } (D-90)', async () => {
    const findValidByTokenHash = jest.fn(
      async (
        _tokenHash: string,
        _now: Date,
      ): Promise<EmailChangeRequestRecord | null> => makePending(),
    );
    const consumeAndApplyEmail = jest.fn(
      async (_userId: typeof USER_ID, newEmail: string) => ({
        id: USER_ID,
        email: newEmail,
        role: 'user',
      }),
    );
    const useCase = new ConfirmEmailChangeUseCase(
      unusedEmailChanges({ findValidByTokenHash, consumeAndApplyEmail }),
    );

    await expect(useCase.execute({ token: RAW_TOKEN })).resolves.toEqual({
      id: USER_ID,
      email: PENDING_EMAIL,
      role: 'user',
    });

    expect(findValidByTokenHash).toHaveBeenCalledTimes(1);
    expect(findValidByTokenHash.mock.calls[0]?.[0]).toBe(
      hashRefreshToken(RAW_TOKEN),
    );
    expect(findValidByTokenHash.mock.calls[0]?.[1]).toEqual(expect.any(Date));
    expect(consumeAndApplyEmail).toHaveBeenCalledWith(USER_ID, PENDING_EMAIL);
  });

  it('rejects unknown / expired / used token with UNAUTHORIZED 401 (D-91)', async () => {
    const consumeAndApplyEmail = jest.fn(
      async (_userId: typeof USER_ID, _newEmail: string) => ({
        id: USER_ID,
        email: PENDING_EMAIL,
        role: 'user',
      }),
    );
    const useCase = new ConfirmEmailChangeUseCase(
      unusedEmailChanges({
        findValidByTokenHash: async () => null,
        consumeAndApplyEmail,
      }),
    );

    await expect(
      useCase.execute({ token: 'wrong-token' }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'UNAUTHORIZED',
      httpStatus: 401,
      message: 'Invalid token',
    });
    expect(consumeAndApplyEmail).not.toHaveBeenCalled();
  });

  it('does not set session cookies — use-case has no session/mailer deps (D-90)', async () => {
    const useCase = new ConfirmEmailChangeUseCase(
      unusedEmailChanges({
        findValidByTokenHash: async () => makePending(),
        consumeAndApplyEmail: async () => ({
          id: USER_ID,
          email: PENDING_EMAIL,
          role: 'user',
        }),
      }),
    );

    const result = await useCase.execute({ token: RAW_TOKEN });
    expect(result).toEqual({
      id: USER_ID,
      email: PENDING_EMAIL,
      role: 'user',
    });
    expect(result).not.toHaveProperty('accessToken');
    expect(result).not.toHaveProperty('refreshToken');
    expect(Object.keys(result).sort()).toEqual(['email', 'id', 'role']);
  });

  it('rejects unknown body keys / empty token with VALIDATION_FAILED', async () => {
    const findValidByTokenHash = jest.fn(
      async (): Promise<EmailChangeRequestRecord | null> => makePending(),
    );
    const useCase = new ConfirmEmailChangeUseCase(
      unusedEmailChanges({ findValidByTokenHash }),
    );

    await expect(
      useCase.execute({ token: RAW_TOKEN, extra: true }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
    });
    await expect(useCase.execute({ token: '' })).rejects.toMatchObject({
      name: 'DomainException',
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
    });
    expect(findValidByTokenHash).not.toHaveBeenCalled();
  });
});

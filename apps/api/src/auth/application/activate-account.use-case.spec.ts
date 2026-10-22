import {
  createAccountActivationId,
  createUserId,
} from '@content-chain/shared';
import { validateEnv } from '../../shared/config/env.schema';
import type { AuthUser } from '../domain/auth-user.types';
import type {
  AccountActivationRecord,
  AccountActivationRepository,
} from '../domain/account-activation-repository.port';
import type { TransactionalMailer } from '../domain/transactional-mailer.port';
import { ActivateAccountUseCase } from './activate-account.use-case';
import { hashRefreshToken } from './auth.helpers';

const USER_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const ACTIVATION_ID = createAccountActivationId(
  'act_11111111-1111-4111-8111-111111111111',
);
const CREATED_AT = new Date('2026-01-01T00:00:00.000Z');
const EXPIRES_AT = new Date('2026-12-01T00:00:00.000Z');
const RAW_TOKEN = 'activation-raw-token';
const USER_EMAIL = 'pending.user@example.com';

const BASE_ENV_FIELDS = {
  DATABASE_URL: 'file:./test.db',
  GATEWAY_BASE_URL: 'http://localhost:3100',
  GATEWAY_KEY: 'test-gateway-key',
  JWT_SECRET: 'test-jwt-secret',
  CORS_ORIGIN: 'http://localhost:3000',
  APP_PUBLIC_URL: 'https://app.example.com',
  INVITE_TTL: '7d',
  ACTIVATION_TTL: '7d',
} as const;

const TEST_ENV = validateEnv({
  NODE_ENV: 'test',
  ...BASE_ENV_FIELDS,
});

function unusedActivations(
  overrides: Partial<AccountActivationRepository> = {},
): AccountActivationRepository {
  const unexpected = async () => {
    throw new Error('unexpected activation repository call');
  };
  return {
    createPendingUser: unexpected,
    findValidByTokenHash: unexpected,
    findValidByUserId: unexpected,
    consumeAndVerify: unexpected,
    rotateToken: unexpected,
    deleteByUserId: unexpected,
    ...overrides,
  };
}

function unusedMailer(
  overrides: Partial<TransactionalMailer> = {},
): TransactionalMailer {
  return {
    send: jest.fn(async () => undefined),
    ...overrides,
  };
}

function makeActivation(
  overrides: Partial<AccountActivationRecord> = {},
): AccountActivationRecord {
  return {
    id: ACTIVATION_ID,
    userId: USER_ID,
    tokenHash: hashRefreshToken(RAW_TOKEN),
    expiresAt: EXPIRES_AT,
    createdAt: CREATED_AT,
    ...overrides,
  };
}

function makeAuthUser(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    id: USER_ID,
    email: USER_EMAIL,
    role: 'user',
    isActive: true,
    verifiedAt: CREATED_AT,
    createdAt: CREATED_AT,
    updatedAt: CREATED_AT,
    ...overrides,
  };
}

describe('ActivateAccountUseCase', () => {
  it('activates a pending account and consumes the activation (A-12 / D-41)', async () => {
    const findValidByTokenHash = jest.fn(
      async (
        _tokenHash: string,
        _now: Date,
      ): Promise<AccountActivationRecord | null> => makeActivation(),
    );
    const consumeAndVerify = jest.fn(
      async (_userId: typeof USER_ID, verifiedAt: Date): Promise<AuthUser> =>
        makeAuthUser({ verifiedAt }),
    );
    const mailer = unusedMailer();
    const useCase = new ActivateAccountUseCase(
      unusedActivations({ findValidByTokenHash, consumeAndVerify }),
      mailer,
      TEST_ENV,
    );

    await expect(useCase.execute({ token: RAW_TOKEN })).resolves.toEqual({
      user: {
        id: USER_ID,
        email: USER_EMAIL,
        role: 'user',
      },
    });

    expect(findValidByTokenHash).toHaveBeenCalledTimes(1);
    expect(findValidByTokenHash.mock.calls[0]?.[0]).toBe(
      hashRefreshToken(RAW_TOKEN),
    );
    expect(findValidByTokenHash.mock.calls[0]?.[1]).toEqual(expect.any(Date));
    expect(consumeAndVerify).toHaveBeenCalledTimes(1);
    expect(consumeAndVerify.mock.calls[0]?.[0]).toBe(USER_ID);
    expect(consumeAndVerify.mock.calls[0]?.[1]).toEqual(expect.any(Date));
    expect(mailer.send).toHaveBeenCalledTimes(1);
    expect(mailer.send).toHaveBeenCalledWith({
      kind: 'user_welcome',
      to: USER_EMAIL,
      email: USER_EMAIL,
      appPublicUrl: 'https://app.example.com',
      login: 'https://app.example.com/',
    });
  });

  it('returns success when user_welcome mailer fails (best-effort; A-12)', async () => {
    const findValidByTokenHash = jest.fn(
      async (): Promise<AccountActivationRecord | null> => makeActivation(),
    );
    const consumeAndVerify = jest.fn(
      async (_userId: typeof USER_ID, verifiedAt: Date): Promise<AuthUser> =>
        makeAuthUser({ verifiedAt }),
    );
    const mailer = unusedMailer({
      send: jest.fn(async () => {
        throw new Error('SMTP down');
      }),
    });
    const useCase = new ActivateAccountUseCase(
      unusedActivations({ findValidByTokenHash, consumeAndVerify }),
      mailer,
      TEST_ENV,
    );

    await expect(useCase.execute({ token: RAW_TOKEN })).resolves.toEqual({
      user: {
        id: USER_ID,
        email: USER_EMAIL,
        role: 'user',
      },
    });
    expect(mailer.send).toHaveBeenCalledTimes(1);
  });

  it('sends user_welcome for guest role', async () => {
    const findValidByTokenHash = jest.fn(
      async (): Promise<AccountActivationRecord | null> => makeActivation(),
    );
    const consumeAndVerify = jest.fn(
      async (_userId: typeof USER_ID, verifiedAt: Date): Promise<AuthUser> =>
        makeAuthUser({ verifiedAt, role: 'guest' }),
    );
    const mailer = unusedMailer();
    const useCase = new ActivateAccountUseCase(
      unusedActivations({ findValidByTokenHash, consumeAndVerify }),
      mailer,
      TEST_ENV,
    );

    await useCase.execute({ token: RAW_TOKEN });
    expect(mailer.send).toHaveBeenCalledTimes(1);
  });

  it('does not send user_welcome for admin role', async () => {
    const findValidByTokenHash = jest.fn(
      async (): Promise<AccountActivationRecord | null> => makeActivation(),
    );
    const consumeAndVerify = jest.fn(
      async (_userId: typeof USER_ID, verifiedAt: Date): Promise<AuthUser> =>
        makeAuthUser({ verifiedAt, role: 'admin' }),
    );
    const mailer = unusedMailer();
    const useCase = new ActivateAccountUseCase(
      unusedActivations({ findValidByTokenHash, consumeAndVerify }),
      mailer,
      TEST_ENV,
    );

    await useCase.execute({ token: RAW_TOKEN });
    expect(mailer.send).not.toHaveBeenCalled();
  });

  it('rejects an unknown token with the same UNAUTHORIZED as expired/used (D-45)', async () => {
    const consumeAndVerify = jest.fn(
      async (_userId: typeof USER_ID, _verifiedAt: Date): Promise<AuthUser> =>
        makeAuthUser(),
    );
    const useCase = new ActivateAccountUseCase(
      unusedActivations({
        findValidByTokenHash: async () => null,
        consumeAndVerify,
      }),
      unusedMailer(),
      TEST_ENV,
    );

    await expect(useCase.execute({ token: 'wrong-token' })).rejects.toMatchObject(
      {
        name: 'DomainException',
        code: 'UNAUTHORIZED',
        httpStatus: 401,
        message: 'Invalid activation token',
      },
    );
    expect(consumeAndVerify).not.toHaveBeenCalled();
  });

  it('rejects an expired or already-consumed token with the same UNAUTHORIZED (A-12)', async () => {
    const consumeAndVerify = jest.fn(
      async (_userId: typeof USER_ID, _verifiedAt: Date): Promise<AuthUser> =>
        makeAuthUser(),
    );
    const useCase = new ActivateAccountUseCase(
      unusedActivations({
        // Port returns null for expired / already deleted rows (same as bad hash).
        findValidByTokenHash: async () => null,
        consumeAndVerify,
      }),
      unusedMailer(),
      TEST_ENV,
    );

    await expect(
      useCase.execute({ token: RAW_TOKEN }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'UNAUTHORIZED',
      httpStatus: 401,
      message: 'Invalid activation token',
    });
    expect(consumeAndVerify).not.toHaveBeenCalled();
  });

  it('rejects unknown body keys with VALIDATION_FAILED', async () => {
    const findValidByTokenHash = jest.fn(
      async (): Promise<AccountActivationRecord | null> => makeActivation(),
    );
    const useCase = new ActivateAccountUseCase(
      unusedActivations({ findValidByTokenHash }),
      unusedMailer(),
      TEST_ENV,
    );

    await expect(
      useCase.execute({ token: RAW_TOKEN, extra: true }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
    });
    expect(findValidByTokenHash).not.toHaveBeenCalled();
  });

  it('rejects an empty token with VALIDATION_FAILED', async () => {
    const findValidByTokenHash = jest.fn(
      async (): Promise<AccountActivationRecord | null> => makeActivation(),
    );
    const useCase = new ActivateAccountUseCase(
      unusedActivations({ findValidByTokenHash }),
      unusedMailer(),
      TEST_ENV,
    );

    await expect(useCase.execute({ token: '' })).rejects.toMatchObject({
      name: 'DomainException',
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
    });
    expect(findValidByTokenHash).not.toHaveBeenCalled();
  });
});

import {
  createEmailChangeRequestId,
  createUserId,
} from '@content-chain/shared';
import { validateEnv } from '../../shared/config/env.schema';
import type { AuthUserContext } from '../domain/auth-user.types';
import type {
  EmailChangeRequestRecord,
  EmailChangeRequestRepository,
} from '../domain/email-change-request.repository.port';
import type {
  EmailChangeConfirmMail,
  TransactionalMailer,
} from '../domain/transactional-mailer.port';
import { ResendEmailChangeConfirmUseCase } from './resend-email-change-confirm.use-case';

const USER_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const REQUEST_ID = createEmailChangeRequestId(
  'ecr_11111111-1111-4111-8111-111111111111',
);
const CREATED_AT = new Date('2026-01-01T00:00:00.000Z');
const EXPIRES_AT = new Date('2026-01-02T00:00:00.000Z');
const PENDING_EMAIL = 'next@example.com';

const CONTEXT: AuthUserContext = {
  id: USER_ID,
  email: 'me@example.com',
  role: 'user',
};

const TEST_ENV = validateEnv({
  NODE_ENV: 'test',
  DATABASE_URL:
    'postgresql://cc:cc@127.0.0.1:5432/content_chain_test?schema=public',
  GATEWAY_BASE_URL: 'http://localhost:3100',
  GATEWAY_KEY: 'test-gateway-key',
  JWT_SECRET: 'test-jwt-secret',
  CORS_ORIGIN: 'http://localhost:3000',
  APP_PUBLIC_URL: 'http://localhost:3000',
  EMAIL_CHANGE_TTL: '24h',
});

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

function unusedMailer(
  overrides: Partial<TransactionalMailer> = {},
): TransactionalMailer {
  return {
    send: async () => undefined,
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
    tokenHash: 'old-hash',
    expiresAt: EXPIRES_AT,
    createdAt: CREATED_AT,
    ...overrides,
  };
}

describe('ResendEmailChangeConfirmUseCase', () => {
  it('rotates token and sends email_change_confirm to pendingEmail (D-91)', async () => {
    const existing = makePending();
    const rotateToken = jest.fn(
      async (
        userId: typeof USER_ID,
        tokenHash: string,
        expiresAt: Date,
      ): Promise<EmailChangeRequestRecord> => ({
        ...existing,
        userId,
        tokenHash,
        expiresAt,
      }),
    );
    const send = jest.fn(
      async (_mail: EmailChangeConfirmMail): Promise<void> => undefined,
    );
    const useCase = new ResendEmailChangeConfirmUseCase(
      unusedEmailChanges({
        findByUserId: async () => existing,
        rotateToken,
      }),
      unusedMailer({ send }),
      TEST_ENV,
    );

    await expect(useCase.execute(CONTEXT)).resolves.toEqual({
      id: USER_ID,
      email: 'me@example.com',
      role: 'user',
      pendingEmail: PENDING_EMAIL,
    });

    expect(rotateToken).toHaveBeenCalledTimes(1);
    expect(rotateToken.mock.calls[0]?.[0]).toBe(USER_ID);
    expect(rotateToken.mock.calls[0]?.[1]).toEqual(expect.any(String));
    expect(rotateToken.mock.calls[0]?.[2]).toEqual(expect.any(Date));

    expect(send).toHaveBeenCalledTimes(1);
    const mail = send.mock.calls[0]?.[0];
    expect(mail).toMatchObject({
      kind: 'email_change_confirm',
      to: PENDING_EMAIL,
      requestId: REQUEST_ID,
      validityLabel: 'Link jest jednorazowy i wygasa po 24 godzinach.',
    });
    expect(mail?.rawToken.length).toBeGreaterThan(0);
    expect(mail?.confirmUrl).toBe(
      `http://localhost:3000/?emailChangeToken=${mail?.rawToken}`,
    );
  });

  it('returns 409 CONFLICT when there is no pending email change (D-91)', async () => {
    const rotateToken = jest.fn(
      async (): Promise<EmailChangeRequestRecord> => makePending(),
    );
    const send = jest.fn(async () => undefined);
    const useCase = new ResendEmailChangeConfirmUseCase(
      unusedEmailChanges({
        findByUserId: async () => null,
        rotateToken,
      }),
      unusedMailer({ send }),
      TEST_ENV,
    );

    await expect(useCase.execute(CONTEXT)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'CONFLICT',
      httpStatus: 409,
      message: 'No pending email change',
    });
    expect(rotateToken).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it('SMTP failure after rotate → 503 MAIL_DELIVERY_FAILED (D-91)', async () => {
    const existing = makePending();
    const rotateToken = jest.fn(
      async (
        userId: typeof USER_ID,
        tokenHash: string,
        expiresAt: Date,
      ): Promise<EmailChangeRequestRecord> => ({
        ...existing,
        userId,
        tokenHash,
        expiresAt,
      }),
    );
    const useCase = new ResendEmailChangeConfirmUseCase(
      unusedEmailChanges({
        findByUserId: async () => existing,
        rotateToken,
      }),
      unusedMailer({
        send: async () => {
          throw new Error('smtp down');
        },
      }),
      TEST_ENV,
    );

    await expect(useCase.execute(CONTEXT)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'MAIL_DELIVERY_FAILED',
      httpStatus: 503,
      details: [{ id: USER_ID }],
    });
    expect(rotateToken).toHaveBeenCalledTimes(1);
  });
});

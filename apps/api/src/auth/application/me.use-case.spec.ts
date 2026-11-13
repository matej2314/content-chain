import {
  createEmailChangeRequestId,
  createUserId,
} from '@content-chain/shared';
import type { AuthUser, AuthUserContext } from '../domain/auth-user.types';
import type {
  EmailChangeRequestRecord,
  EmailChangeRequestRepository,
} from '../domain/email-change-request.repository.port';
import type { UserRepository } from '../domain/user-repository.port';
import { MeUseCase } from './me.use-case';

const USER_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const CREATED_AT = new Date('2026-01-01T00:00:00.000Z');

const CONTEXT: AuthUserContext = {
  id: USER_ID,
  email: 'stale@example.com',
  role: 'user',
};

function unusedUsers(overrides: Partial<UserRepository> = {}): UserRepository {
  const unexpected = async () => {
    throw new Error('unexpected repository call');
  };
  return {
    findForAuth: unexpected,
    findById: unexpected,
    findAdminCount: unexpected,
    create: unexpected,
    createAdminIfNone: unexpected,
    setActive: unexpected,
    setVerifiedAt: unexpected,
    list: unexpected,
    updateEmail: unexpected,
    updatePassword: unexpected,
    ...overrides,
  };
}

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

function makeUser(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    id: USER_ID,
    email: 'user@example.com',
    role: 'user',
    isActive: true,
    verifiedAt: CREATED_AT,
    createdAt: CREATED_AT,
    updatedAt: CREATED_AT,
    ...overrides,
  };
}

function makePending(
  overrides: Partial<EmailChangeRequestRecord> = {},
): EmailChangeRequestRecord {
  return {
    id: createEmailChangeRequestId(
      'ecr_11111111-1111-4111-8111-111111111111',
    ),
    userId: USER_ID,
    pendingEmail: 'next@example.com',
    tokenHash: 'hash',
    expiresAt: new Date('2026-01-02T00:00:00.000Z'),
    createdAt: CREATED_AT,
    ...overrides,
  };
}

describe('MeUseCase', () => {
  it('returns id, email, role and pendingEmail null when no pending change', async () => {
    const user = makeUser({ email: 'from-db@example.com', role: 'admin' });
    const useCase = new MeUseCase(
      unusedUsers({
        findById: async () => user,
      }),
      unusedEmailChanges({
        findByUserId: async () => null,
      }),
    );

    await expect(useCase.execute(CONTEXT)).resolves.toEqual({
      id: USER_ID,
      email: 'from-db@example.com',
      role: 'admin',
      pendingEmail: null,
    });
  });

  it('returns pendingEmail string when a pending change exists', async () => {
    const user = makeUser({ email: 'from-db@example.com' });
    const useCase = new MeUseCase(
      unusedUsers({
        findById: async () => user,
      }),
      unusedEmailChanges({
        findByUserId: async () => makePending({ pendingEmail: 'next@example.com' }),
      }),
    );

    await expect(useCase.execute(CONTEXT)).resolves.toEqual({
      id: USER_ID,
      email: 'from-db@example.com',
      role: 'user',
      pendingEmail: 'next@example.com',
    });
  });

  it('rejects a missing user with UNAUTHORIZED', async () => {
    const useCase = new MeUseCase(
      unusedUsers({
        findById: async () => null,
      }),
      unusedEmailChanges(),
    );

    await expect(useCase.execute(CONTEXT)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'UNAUTHORIZED',
      httpStatus: 401,
      message: 'User not found or inactive',
    });
  });

  it('rejects an inactive user with the same UNAUTHORIZED as a missing user', async () => {
    const useCase = new MeUseCase(
      unusedUsers({
        findById: async () => makeUser({ isActive: false }),
      }),
      unusedEmailChanges(),
    );

    await expect(useCase.execute(CONTEXT)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'UNAUTHORIZED',
      httpStatus: 401,
      message: 'User not found or inactive',
    });
  });
});

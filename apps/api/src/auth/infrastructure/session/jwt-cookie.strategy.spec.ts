import { createUserId } from '@content-chain/shared';
import { validateEnv } from '../../../shared/config/env.schema';
import type { AuthUser } from '../../domain/auth-user.types';
import type { UserRepository } from '../../domain/user-repository.port';
import { JwtCookieStrategy } from './jwt-cookie.strategy';

const USER_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const CREATED_AT = new Date('2026-01-01T00:00:00.000Z');

const TEST_ENV = validateEnv({
  NODE_ENV: 'test',
  DATABASE_URL: 'file:./test.db',
  GATEWAY_BASE_URL: 'http://localhost:3100',
  GATEWAY_KEY: 'test-gateway-key',
  JWT_SECRET: 'test-jwt-secret',
  CORS_ORIGIN: 'http://localhost:3000',
});

const VALID_PAYLOAD = {
  sub: USER_ID,
  email: 'stale-from-jwt@example.com',
  role: 'user' as const,
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

function makeStrategy(users: UserRepository): JwtCookieStrategy {
  return new JwtCookieStrategy(TEST_ENV, users);
}

describe('JwtCookieStrategy', () => {
  it('returns id, email and role from the stored active user', async () => {
    const user = makeUser({ email: 'from-db@example.com', role: 'admin' });
    const strategy = makeStrategy(
      unusedUsers({
        findById: async () => user,
      }),
    );

    await expect(strategy.validate(VALID_PAYLOAD)).resolves.toEqual({
      id: USER_ID,
      email: 'from-db@example.com',
      role: 'admin',
    });
  });

  it('rejects a missing user with UNAUTHORIZED', async () => {
    const strategy = makeStrategy(
      unusedUsers({
        findById: async () => null,
      }),
    );

    await expect(strategy.validate(VALID_PAYLOAD)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'UNAUTHORIZED',
      httpStatus: 401,
      message: 'User not found or inactive',
    });
  });

  it('rejects an inactive user with the same UNAUTHORIZED as a missing user', async () => {
    const strategy = makeStrategy(
      unusedUsers({
        findById: async () => makeUser({ isActive: false }),
      }),
    );

    await expect(strategy.validate(VALID_PAYLOAD)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'UNAUTHORIZED',
      httpStatus: 401,
      message: 'User not found or inactive',
    });
  });

  it('rejects an invalid token payload before hitting the repository', async () => {
    const findById = jest.fn(async () => makeUser());
    const strategy = makeStrategy(unusedUsers({ findById }));

    await expect(
      strategy.validate({ sub: 'not-a-user-id', email: 'x@y.z', role: 'user' }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'UNAUTHORIZED',
      httpStatus: 401,
      message: 'Invalid token subject',
    });
    expect(findById).not.toHaveBeenCalled();
  });
});

import { JwtService } from '@nestjs/jwt';
import { createUserId } from '@content-chain/shared';
import { validateEnv } from '../../shared/config/env.schema';
import { generateRefreshToken, hashRefreshToken } from './auth.helpers';
import type { AuthUser } from '../domain/auth-user.types';
import type {
  RefreshSessionRecord,
  RefreshSessionRepository,
  RotateRefreshSessionResult,
} from '../domain/refresh-session.repository.port';
import type { UserRepository } from '../domain/user-repository.port';
import { RefreshUseCase } from './refresh.use-case';

jest.mock('@nestjs/jwt', () => ({
  JwtService: class JwtService {},
}));

const USER_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const CREATED_AT = new Date('2026-01-01T00:00:00.000Z');
const ACCESS_TOKEN = 'test.access.jwt';
const INVALID_REFRESH = {
  name: 'DomainException',
  code: 'UNAUTHORIZED',
  httpStatus: 401,
  message: 'Invalid or expired refresh token',
} as const;

const TEST_ENV = validateEnv({
  NODE_ENV: 'test',
  DATABASE_URL: 'file:./test.db',
  GATEWAY_BASE_URL: 'http://localhost:3100',
  GATEWAY_KEY: 'test-gateway-key',
  JWT_SECRET: 'test-jwt-secret',
  CORS_ORIGIN: 'http://localhost:3000',
  JWT_REFRESH_TTL: '1d',
});

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
    list: unexpected,
    ...overrides,
  };
}

function unusedSessions(
  overrides: Partial<RefreshSessionRepository> = {},
): RefreshSessionRepository {
  const unexpected = async () => {
    throw new Error('unexpected session repository call');
  };
  return {
    create: unexpected,
    findValid: unexpected,
    findValidByHash: unexpected,
    rotate: unexpected,
    deleteById: unexpected,
    deleteByUser: unexpected,
    ...overrides,
  };
}

function makeJwt(): JwtService {
  return {
    signAsync: jest.fn(async () => ACCESS_TOKEN),
  } as JwtService;
}

function makeUser(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    id: USER_ID,
    email: 'user@example.com',
    role: 'user',
    isActive: true,
    createdAt: CREATED_AT,
    updatedAt: CREATED_AT,
    ...overrides,
  };
}

describe('RefreshUseCase', () => {
  it('rotates the refresh session and returns new tokens', async () => {
    const { raw, hash } = generateRefreshToken();
    const session: RefreshSessionRecord = {
      id: 'session-1',
      userId: USER_ID,
      tokenHash: hash,
      expiresAt: new Date('2026-12-01T00:00:00.000Z'),
    };
    const rotate = jest.fn(
      async (
        _current: string,
        _next: RefreshSessionRecord,
      ): Promise<RotateRefreshSessionResult> => ({ ok: true }),
    );
    const jwt = makeJwt();
    const user = makeUser();
    const useCase = new RefreshUseCase(
      unusedUsers({
        findById: async () => user,
      }),
      unusedSessions({
        findValidByHash: async (tokenHash) =>
          tokenHash === hashRefreshToken(raw) ? session : null,
        rotate,
      }),
      jwt,
      TEST_ENV,
    );

    const result = await useCase.execute(raw);

    expect(result.user).toEqual({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    expect(result.accessToken).toBe(ACCESS_TOKEN);
    expect(result.refreshToken).not.toBe(raw);
    expect(result.refreshToken.length).toBeGreaterThan(0);
    expect(rotate).toHaveBeenCalledTimes(1);
    expect(rotate.mock.calls[0]?.[0]).toBe(hash);
    expect(rotate.mock.calls[0]?.[1]).toMatchObject({
      userId: USER_ID,
    });
    expect(jwt.signAsync).toHaveBeenCalledWith({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
  });

  it('rejects a missing refresh cookie with UNAUTHORIZED', async () => {
    const findValidByHash = jest.fn(
      async (_hash: string): Promise<RefreshSessionRecord | null> => null,
    );
    const useCase = new RefreshUseCase(
      unusedUsers(),
      unusedSessions({ findValidByHash }),
      makeJwt(),
      TEST_ENV,
    );

    await expect(useCase.execute(undefined)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'UNAUTHORIZED',
      httpStatus: 401,
      message: 'Missing refresh token',
    });
    expect(findValidByHash).not.toHaveBeenCalled();
  });

  it('rejects an unknown hash with UNAUTHORIZED', async () => {
    const rotate = jest.fn(
      async (
        _current: string,
        _next: RefreshSessionRecord,
      ): Promise<RotateRefreshSessionResult> => ({ ok: true }),
    );
    const useCase = new RefreshUseCase(
      unusedUsers(),
      unusedSessions({
        findValidByHash: async () => null,
        rotate,
      }),
      makeJwt(),
      TEST_ENV,
    );

    await expect(useCase.execute('unknown-raw')).rejects.toMatchObject(
      INVALID_REFRESH,
    );
    expect(rotate).not.toHaveBeenCalled();
  });

  it('rejects an inactive user with UNAUTHORIZED and does not rotate', async () => {
    const { raw, hash } = generateRefreshToken();
    const rotate = jest.fn(
      async (
        _current: string,
        _next: RefreshSessionRecord,
      ): Promise<RotateRefreshSessionResult> => ({ ok: true }),
    );
    const useCase = new RefreshUseCase(
      unusedUsers({
        findById: async () => makeUser({ isActive: false }),
      }),
      unusedSessions({
        findValidByHash: async () => ({
          id: 'session-1',
          userId: USER_ID,
          tokenHash: hash,
          expiresAt: new Date('2026-12-01T00:00:00.000Z'),
        }),
        rotate,
      }),
      makeJwt(),
      TEST_ENV,
    );

    await expect(useCase.execute(raw)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'UNAUTHORIZED',
      httpStatus: 401,
      message: 'User not found or inactive',
    });
    expect(rotate).not.toHaveBeenCalled();
  });

  it('rejects a consumed refresh hash (rotate not-found) with UNAUTHORIZED', async () => {
    const { raw, hash } = generateRefreshToken();
    const useCase = new RefreshUseCase(
      unusedUsers({
        findById: async () => makeUser(),
      }),
      unusedSessions({
        findValidByHash: async () => ({
          id: 'session-1',
          userId: USER_ID,
          tokenHash: hash,
          expiresAt: new Date('2026-12-01T00:00:00.000Z'),
        }),
        rotate: async () => ({ ok: false, reason: 'not-found' }),
      }),
      makeJwt(),
      TEST_ENV,
    );

    await expect(useCase.execute(raw)).rejects.toMatchObject(INVALID_REFRESH);
  });
});

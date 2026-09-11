import { hash as bcryptHash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { createUserId } from '@content-chain/shared';
import { validateEnv } from '../../shared/config/env.schema';
import type { AuthUser } from '../domain/auth-user.types';
import type {
  RefreshSessionRecord,
  RefreshSessionRepository,
} from '../domain/refresh-session.repository.port';
import type {
  UserForAuth,
  UserRepository,
} from '../domain/user-repository.port';
import { LoginUseCase } from './login.use-case';

jest.mock('@nestjs/jwt', () => ({
  JwtService: class JwtService {},
}));

const USER_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const CREATED_AT = new Date('2026-01-01T00:00:00.000Z');
const PASSWORD = 'ValidPassword1!';
const ACCESS_TOKEN = 'test.access.jwt';
const INVALID_CREDENTIALS = {
  name: 'DomainException',
  code: 'UNAUTHORIZED',
  httpStatus: 401,
  message: 'Invalid credentials',
} as const;

const TEST_ENV = validateEnv({
  NODE_ENV: 'test',
  DATABASE_URL: 'file:./test.db',
  GATEWAY_BASE_URL: 'http://localhost:3100',
  GATEWAY_KEY: 'test-gateway-key',
  JWT_SECRET: 'test-jwt-secret',
  CORS_ORIGIN: 'http://localhost:3000',
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

describe('LoginUseCase', () => {
  let passwordHash: string;

  beforeAll(async () => {
    passwordHash = await bcryptHash(PASSWORD, 4);
  });

  function makeAuthUser(overrides: Partial<UserForAuth> = {}): UserForAuth {
    return {
      ...makeUser(),
      passwordHash,
      ...overrides,
    };
  }

  it('authenticates an active user and creates a refresh session', async () => {
    const authUser = makeAuthUser();
    const create = jest.fn(
      async (_session: RefreshSessionRecord): Promise<void> => undefined,
    );
    const jwt = makeJwt();
    const useCase = new LoginUseCase(
      unusedUsers({
        findForAuth: async () => authUser,
      }),
      unusedSessions({ create }),
      jwt,
      TEST_ENV,
    );

    const result = await useCase.execute({
      email: authUser.email,
      password: PASSWORD,
    });

    expect(result.user).toEqual({
      id: authUser.id,
      email: authUser.email,
      role: authUser.role,
    });
    expect(result.accessToken).toBe(ACCESS_TOKEN);
    expect(result.refreshToken).toEqual(expect.any(String));
    expect(result.refreshToken.length).toBeGreaterThan(0);
    expect(create).toHaveBeenCalledTimes(1);
    expect(create.mock.calls[0]?.[0]).toMatchObject({
      userId: USER_ID,
    });
    expect(jwt.signAsync).toHaveBeenCalledWith({
      sub: authUser.id,
      email: authUser.email,
      role: authUser.role,
    });
  });

  it('rejects a missing user with the same UNAUTHORIZED as a bad password', async () => {
    const create = jest.fn(
      async (_session: RefreshSessionRecord): Promise<void> => undefined,
    );
    const useCase = new LoginUseCase(
      unusedUsers({
        findForAuth: async () => null,
      }),
      unusedSessions({ create }),
      makeJwt(),
      TEST_ENV,
    );

    await expect(
      useCase.execute({ email: 'missing@example.com', password: PASSWORD }),
    ).rejects.toMatchObject(INVALID_CREDENTIALS);
    expect(create).not.toHaveBeenCalled();
  });

  it('rejects an inactive user with the same UNAUTHORIZED as a bad password', async () => {
    const create = jest.fn(
      async (_session: RefreshSessionRecord): Promise<void> => undefined,
    );
    const useCase = new LoginUseCase(
      unusedUsers({
        findForAuth: async () => makeAuthUser({ isActive: false }),
      }),
      unusedSessions({ create }),
      makeJwt(),
      TEST_ENV,
    );

    await expect(
      useCase.execute({ email: 'user@example.com', password: PASSWORD }),
    ).rejects.toMatchObject(INVALID_CREDENTIALS);
    expect(create).not.toHaveBeenCalled();
  });

  it('rejects a wrong password with UNAUTHORIZED and does not create a session', async () => {
    const create = jest.fn(
      async (_session: RefreshSessionRecord): Promise<void> => undefined,
    );
    const useCase = new LoginUseCase(
      unusedUsers({
        findForAuth: async () => makeAuthUser(),
      }),
      unusedSessions({ create }),
      makeJwt(),
      TEST_ENV,
    );

    await expect(
      useCase.execute({
        email: 'user@example.com',
        password: 'WrongPassword1!',
      }),
    ).rejects.toMatchObject(INVALID_CREDENTIALS);
    expect(create).not.toHaveBeenCalled();
  });

  it('rejects an invalid email with VALIDATION_FAILED and skips lookup', async () => {
    const findForAuth = jest.fn(async () => makeAuthUser());
    const useCase = new LoginUseCase(
      unusedUsers({ findForAuth }),
      unusedSessions(),
      makeJwt(),
      TEST_ENV,
    );

    await expect(
      useCase.execute({ email: 'not-an-email', password: PASSWORD }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
      message: 'Application command validation failed',
    });
    expect(findForAuth).not.toHaveBeenCalled();
  });
});

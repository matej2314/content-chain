import { JwtService } from '@nestjs/jwt';
import { createUserId } from '@content-chain/shared';
import { validateEnv } from '../../shared/config/env.schema';
import type { AuthUser } from '../domain/auth-user.types';
import type {
  CreateAdminIfNoneData,
  CreateAdminIfNoneResult,
  UserRepository,
} from '../domain/user-repository.port';
import type {
  RefreshSessionRecord,
  RefreshSessionRepository,
} from '../domain/refresh-session.repository.port';
import { BootstrapAdminUseCase } from './bootstrap-admin.use-case';

jest.mock('@nestjs/jwt', () => ({
  JwtService: class JwtService {},
}));

const ADMIN_ID = createUserId('usr_22222222-2222-4222-8222-222222222222');
const CREATED_AT = new Date('2026-01-01T00:00:00.000Z');
const PASSWORD = 'ValidPassword1!';
const ACCESS_TOKEN = 'test.access.jwt';
const BOOTSTRAP_BODY = {
  email: 'admin@example.com',
  password: PASSWORD,
};

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

function makeAdmin(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    id: ADMIN_ID,
    email: BOOTSTRAP_BODY.email,
    role: 'admin',
    isActive: true,
    createdAt: CREATED_AT,
    updatedAt: CREATED_AT,
    ...overrides,
  };
}

describe('BootstrapAdminUseCase', () => {
  it('creates the first admin, signs JWT and stores a refresh session', async () => {
    const createdAdmin = makeAdmin();
    const createAdminIfNone = jest.fn(
      async (
        _data: CreateAdminIfNoneData,
      ): Promise<CreateAdminIfNoneResult> => ({
        ok: true,
        user: createdAdmin,
      }),
    );
    const create = jest.fn(
      async (_session: RefreshSessionRecord): Promise<void> => undefined,
    );
    const jwt = makeJwt();
    const useCase = new BootstrapAdminUseCase(
      unusedUsers({
        findAdminCount: async () => 0,
        createAdminIfNone,
      }),
      unusedSessions({ create }),
      jwt,
      TEST_ENV,
    );

    const result = await useCase.execute(BOOTSTRAP_BODY);

    expect(result.user).toEqual({
      id: createdAdmin.id,
      email: createdAdmin.email,
      role: 'admin',
    });
    expect(result.accessToken).toBe(ACCESS_TOKEN);
    expect(result.refreshToken.length).toBeGreaterThan(0);
    expect(createAdminIfNone).toHaveBeenCalledTimes(1);
    expect(createAdminIfNone.mock.calls[0]?.[0]).toMatchObject({
      email: BOOTSTRAP_BODY.email,
    });
    expect(typeof createAdminIfNone.mock.calls[0]?.[0].passwordHash).toBe(
      'string',
    );
    expect(create).toHaveBeenCalledTimes(1);
    expect(jwt.signAsync).toHaveBeenCalledWith({
      sub: createdAdmin.id,
      email: createdAdmin.email,
      role: 'admin',
    });
  });

  it('rejects a second bootstrap when an admin already exists without creating', async () => {
    const createAdminIfNone = jest.fn(
      async (
        _data: CreateAdminIfNoneData,
      ): Promise<CreateAdminIfNoneResult> => ({
        ok: false,
        reason: 'admin-exists',
      }),
    );
    const create = jest.fn(
      async (_session: RefreshSessionRecord): Promise<void> => undefined,
    );
    const useCase = new BootstrapAdminUseCase(
      unusedUsers({
        findAdminCount: async () => 1,
        createAdminIfNone,
      }),
      unusedSessions({ create }),
      makeJwt(),
      TEST_ENV,
    );

    await expect(useCase.execute(BOOTSTRAP_BODY)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'CONFLICT',
      httpStatus: 409,
      message: 'Bootstrap admin already exists',
    });
    expect(createAdminIfNone).not.toHaveBeenCalled();
    expect(create).not.toHaveBeenCalled();
  });

  it('rejects a race where createAdminIfNone reports admin-exists', async () => {
    const create = jest.fn(
      async (_session: RefreshSessionRecord): Promise<void> => undefined,
    );
    const useCase = new BootstrapAdminUseCase(
      unusedUsers({
        findAdminCount: async () => 0,
        createAdminIfNone: async () => ({
          ok: false,
          reason: 'admin-exists',
        }),
      }),
      unusedSessions({ create }),
      makeJwt(),
      TEST_ENV,
    );

    await expect(useCase.execute(BOOTSTRAP_BODY)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'CONFLICT',
      httpStatus: 409,
      message: 'Bootstrap admin already exists',
    });
    expect(create).not.toHaveBeenCalled();
  });

  it('rejects a password that fails policy before persisting', async () => {
    const createAdminIfNone = jest.fn(
      async (
        _data: CreateAdminIfNoneData,
      ): Promise<CreateAdminIfNoneResult> => ({
        ok: false,
        reason: 'admin-exists',
      }),
    );
    const useCase = new BootstrapAdminUseCase(
      unusedUsers({
        findAdminCount: async () => 0,
        createAdminIfNone,
      }),
      unusedSessions(),
      makeJwt(),
      TEST_ENV,
    );

    await expect(
      useCase.execute({ email: BOOTSTRAP_BODY.email, password: 'short' }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
      message: 'Password must be at least 12 characters long',
    });
    expect(createAdminIfNone).not.toHaveBeenCalled();
  });
});

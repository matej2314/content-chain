import 'reflect-metadata';
import { type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { SwaggerModule, type OpenAPIObject } from '@nestjs/swagger';
import { AuthController } from '../../auth/auth.controller';
import { AcceptInviteUseCase } from '../../auth/application/accept-invite.use-case';
import { BootstrapAdminUseCase } from '../../auth/application/bootstrap-admin.use-case';
import { BootstrapStatusUseCase } from '../../auth/application/bootstrap-status.use-case';
import { ListUsersUseCase } from '../../auth/application/list-users.use-case';
import { LoginUseCase } from '../../auth/application/login.use-case';
import { LogoutUseCase } from '../../auth/application/logout.use-case';
import { MeUseCase } from '../../auth/application/me.use-case';
import { RefreshUseCase } from '../../auth/application/refresh.use-case';
import { SoftDeleteUserUseCase } from '../../auth/application/soft-delete-user.use-case';
import { UsersController } from '../../auth/users.controller';
import { HealthController } from '../../health/health.controller';
import { HealthService } from '../../health/health.service';
import { ENV } from '../config/env';
import { validateEnv } from '../config/env.schema';
import {
  ACCESS_COOKIE_NAME,
  COOKIE_AUTH_NAME,
  buildSwaggerConfig,
} from './configure-swagger';

jest.mock('@nestjs/jwt', () => ({
  JwtService: class JwtService {},
}));

type OpenApiMethod = 'get' | 'post' | 'delete';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isCookieApiKeyScheme(scheme: unknown): scheme is {
  type: 'apiKey';
  in: 'cookie';
  name: string;
} {
  if (!isRecord(scheme)) {
    return false;
  }
  if (!('type' in scheme) || !('in' in scheme) || !('name' in scheme)) {
    return false;
  }
  return (
    scheme.type === 'apiKey' &&
    scheme.in === 'cookie' &&
    typeof scheme.name === 'string'
  );
}

function isBearerOrAuthorizationHeaderScheme(scheme: unknown): boolean {
  if (!isRecord(scheme)) {
    return false;
  }
  if (scheme.type === 'http' && scheme.scheme === 'bearer') {
    return true;
  }
  return (
    scheme.type === 'apiKey' &&
    scheme.in === 'header' &&
    scheme.name === 'Authorization'
  );
}

function getOperation(
  document: OpenAPIObject,
  path: string,
  method: OpenApiMethod,
) {
  const pathItem = document.paths?.[path];
  if (pathItem === undefined) {
    throw new Error(`Missing OpenAPI path ${path}`);
  }
  const operation = pathItem[method];
  if (operation === undefined) {
    throw new Error(
      `Missing OpenAPI operation ${method.toUpperCase()} ${path}`,
    );
  }
  return operation;
}

function requiresCookieAuth(
  security: ReadonlyArray<Record<string, string[]>> | undefined,
): boolean {
  if (security === undefined) {
    return false;
  }
  return security.some((requirement) => COOKIE_AUTH_NAME in requirement);
}

const stubExecute = { execute: jest.fn() };

describe('buildSwaggerConfig', () => {
  it('registers cookieAuth as apiKey in cookie cc_access, not Bearer', () => {
    const doc = buildSwaggerConfig();
    const schemes = doc.components?.securitySchemes;
    const scheme = schemes?.[COOKIE_AUTH_NAME];

    expect(isCookieApiKeyScheme(scheme)).toBe(true);
    if (!isCookieApiKeyScheme(scheme)) {
      return;
    }
    expect(scheme.type).toBe('apiKey');
    expect(scheme.in).toBe('cookie');
    expect(scheme.name).toBe(ACCESS_COOKIE_NAME);

    expect(schemes).not.toHaveProperty('bearer');
    expect(
      Object.values(schemes ?? {}).some(isBearerOrAuthorizationHeaderScheme),
    ).toBe(false);
  });
});

describe('SwaggerModule.createDocument (auth + users + health)', () => {
  let app: INestApplication;
  let document: OpenAPIObject;

  beforeAll(async () => {
    const env = validateEnv({
      NODE_ENV: 'test',
      PORT: '3001',
      DATABASE_URL: 'file:./chain.db',
      GATEWAY_BASE_URL: 'http://localhost:3100',
      GATEWAY_KEY: 'change-me-gateway-key',
      JWT_SECRET: 'change-me-jwt-secret',
      CORS_ORIGIN: 'http://localhost:3000',
    });

    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController, UsersController, HealthController],
      providers: [
        { provide: BootstrapStatusUseCase, useValue: stubExecute },
        { provide: BootstrapAdminUseCase, useValue: stubExecute },
        { provide: LoginUseCase, useValue: stubExecute },
        { provide: LogoutUseCase, useValue: stubExecute },
        { provide: RefreshUseCase, useValue: stubExecute },
        { provide: MeUseCase, useValue: stubExecute },
        { provide: AcceptInviteUseCase, useValue: stubExecute },
        { provide: ListUsersUseCase, useValue: stubExecute },
        { provide: SoftDeleteUserUseCase, useValue: stubExecute },
        { provide: HealthService, useValue: { liveness: jest.fn() } },
        { provide: ENV, useValue: env },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api/v1', {
      exclude: ['metrics', 'docs', 'docs-json'],
    });
    await app.init();
    document = SwaggerModule.createDocument(app, buildSwaggerConfig());
  });

  afterAll(async () => {
    await app.close();
  });

  it('requires cookieAuth on GET /auth/me and GET /users', () => {
    expect(getOperation(document, '/api/v1/auth/me', 'get').security).toEqual([
      { [COOKIE_AUTH_NAME]: [] },
    ]);
    expect(getOperation(document, '/api/v1/users', 'get').security).toEqual([
      { [COOKIE_AUTH_NAME]: [] },
    ]);
  });

  it('does not require cookieAuth on POST /auth/login or GET /health', () => {
    expect(
      requiresCookieAuth(
        getOperation(document, '/api/v1/auth/login', 'post').security,
      ),
    ).toBe(false);
    expect(
      requiresCookieAuth(
        getOperation(document, '/api/v1/health', 'get').security,
      ),
    ).toBe(false);
  });
});

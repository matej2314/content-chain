import 'reflect-metadata';
import {
  ForbiddenException,
  UnauthorizedException,
  type ContextType,
  type ExecutionContext,
  type Type,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { createUserId } from '@content-chain/shared';
import { validateEnv } from '../config/env.schema';
import { AllowGuest } from '../decorators/allow-guest.decorator';
import { Public } from '../decorators/public.decorator';
import type { AuthUserContext } from '../types/auth-user-context';
import { GuestGuard } from './guest.guard';

const USER_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');

const BASE_ENV_FIELDS = {
  DATABASE_URL: 'file:./test.db',
  GATEWAY_BASE_URL: 'http://localhost:3100',
  GATEWAY_KEY: 'test-gateway-key',
  JWT_SECRET: 'test-jwt-secret',
  CORS_ORIGIN: 'http://localhost:3000',
} as const;

const ENV_DEMO_OFF = validateEnv({
  NODE_ENV: 'test',
  ...BASE_ENV_FIELDS,
  DEMO_MODE: 'false',
});

const ENV_DEMO_ON = validateEnv({
  NODE_ENV: 'test',
  ...BASE_ENV_FIELDS,
  DEMO_MODE: 'true',
  REDIS_HOST: '127.0.0.1',
  REDIS_PORT: 6379,
});

class ProtectedController {
  handle(): void {}
}

class PublicController {
  @Public()
  handle(): void {}
}

class AllowGuestController {
  @AllowGuest()
  handle(): void {}
}

function guestUser(): AuthUserContext {
  return { id: USER_ID, email: 'guest@example.com', role: 'guest' };
}

function regularUser(): AuthUserContext {
  return { id: USER_ID, email: 'user@example.com', role: 'user' };
}

type GuestHttpRequest = {
  user?: AuthUserContext;
};

/**
 * HTTP ExecutionContext stub for GuestGuard.
 * NestJS: getHandler/getClass for Reflector; switchToHttp().getRequest<T>().
 */
class GuestGuardHttpContext implements ExecutionContext {
  constructor(
    private readonly handler: () => void,
    private readonly controllerType: Type<unknown>,
    private readonly request: GuestHttpRequest,
  ) {}

  getClass<T = unknown>(): Type<T> {
    return this.controllerType as Type<T>;
  }

  getHandler(): () => void {
    return this.handler;
  }

  getArgs<T extends unknown[] = unknown[]>(): T {
    return [this.request] as T;
  }

  getArgByIndex<T = unknown>(index: number): T {
    const args = this.getArgs();
    return args[index] as T;
  }

  switchToRpc(): ReturnType<ExecutionContext['switchToRpc']> {
    throw new Error('GuestGuard tests use HTTP context only');
  }

  switchToHttp(): ReturnType<ExecutionContext['switchToHttp']> {
    const request = this.request;
    return {
      getRequest: <T = GuestHttpRequest>(): T => request as T,
      getResponse: <T = Record<string, never>>(): T => ({}) as T,
      getNext: <T = undefined>(): T => undefined as T,
    };
  }

  switchToWs(): ReturnType<ExecutionContext['switchToWs']> {
    throw new Error('GuestGuard tests use HTTP context only');
  }

  getType<TContext extends string = ContextType>(): TContext {
    return 'http' as TContext;
  }
}

function httpContext(
  handler: () => void,
  controller: Type<unknown>,
  user: AuthUserContext | undefined,
): ExecutionContext {
  return new GuestGuardHttpContext(handler, controller, { user });
}

function createGuard(env: typeof ENV_DEMO_OFF): GuestGuard {
  return new GuestGuard(new Reflector(), env);
}

describe('GuestGuard', () => {
  it('allows a public handler without checking guest role', () => {
    const guard = createGuard(ENV_DEMO_ON);
    const context = httpContext(
      PublicController.prototype.handle,
      PublicController,
      guestUser(),
    );

    expect(guard.canActivate(context)).toBe(true);
  });

  it('allows role=user on a protected handler', () => {
    const guard = createGuard(ENV_DEMO_ON);
    const context = httpContext(
      ProtectedController.prototype.handle,
      ProtectedController,
      regularUser(),
    );

    expect(guard.canActivate(context)).toBe(true);
  });

  it('rejects guest JWT with UnauthorizedException when DEMO_MODE is off', () => {
    const guard = createGuard(ENV_DEMO_OFF);
    const context = httpContext(
      ProtectedController.prototype.handle,
      ProtectedController,
      guestUser(),
    );

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
    expect(() => guard.canActivate(context)).toThrow('Invalid credentials');
  });

  it('rejects guest JWT with UnauthorizedException when DEMO_MODE is off even if AllowGuest is set', () => {
    const guard = createGuard(ENV_DEMO_OFF);
    const context = httpContext(
      AllowGuestController.prototype.handle,
      AllowGuestController,
      guestUser(),
    );

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
    expect(() => guard.canActivate(context)).toThrow('Invalid credentials');
    expect(() => guard.canActivate(context)).not.toThrow(ForbiddenException);
  });

  it('rejects guest without AllowGuest with ForbiddenException when demo is on', () => {
    const guard = createGuard(ENV_DEMO_ON);
    const context = httpContext(
      ProtectedController.prototype.handle,
      ProtectedController,
      guestUser(),
    );

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    expect(() => guard.canActivate(context)).toThrow('FORBIDDEN');
  });

  it('allows guest when demo is on and the handler has AllowGuest', () => {
    const guard = createGuard(ENV_DEMO_ON);
    const context = httpContext(
      AllowGuestController.prototype.handle,
      AllowGuestController,
      guestUser(),
    );

    expect(guard.canActivate(context)).toBe(true);
  });
});

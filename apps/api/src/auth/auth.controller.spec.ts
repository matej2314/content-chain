import 'reflect-metadata';
import { RequestMethod, UnauthorizedException } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import { createUserId } from '@content-chain/shared';
import { ENV, type Env } from '../shared/config/env';
import { IS_PUBLIC_KEY } from '../shared/decorators/public.decorator';
import { BootstrapAdminUseCase } from './application/bootstrap-admin.use-case';
import { BootstrapStatusUseCase } from './application/bootstrap-status.use-case';
import { LoginUseCase } from './application/login.use-case';
import { LogoutUseCase } from './application/logout.use-case';
import { MeUseCase } from './application/me.use-case';
import { RefreshUseCase } from './application/refresh.use-case';
import {
  AcceptInviteUseCase,
  type AcceptInviteResult,
} from './application/accept-invite.use-case';
import type { AuthTokenResult } from './application/bootstrap-admin.use-case';
import type { AuthUserContext } from './domain/auth-user.types';
import { type BootstrapAdminDto } from './http/bootstrap-admin.dto';
import { type LoginDto } from './http/login.dto';
import { type AcceptInviteDto } from './http/accept-invite.dto';
import { AuthController } from './auth.controller';
import {
  clearAuthCookies,
  setAuthCookies,
} from './infrastructure/cookie.helper';
import type { Request, Response } from 'express';

jest.mock('@nestjs/jwt', () => ({
  JwtService: class JwtService {},
}));

jest.mock('./infrastructure/cookie.helper', () => {
  const actual = jest.requireActual(
    './infrastructure/cookie.helper',
  );
  return {
    __esModule: true,
    ...actual,
    setAuthCookies: jest.fn(),
    clearAuthCookies: jest.fn(),
    readCookie: actual.readCookie,
  };
});

const ACCESS_TTL = '15m';
const sessionUser: AuthUserContext = {
  id: createUserId('usr_11111111-1111-4111-8111-111111111111'),
  email: 'admin@example.com',
  role: 'admin',
};
const tokenResult: AuthTokenResult = {
  user: {
    id: sessionUser.id,
    email: sessionUser.email,
    role: sessionUser.role,
  },
  accessToken: 'access.jwt',
  refreshToken: 'refresh.raw',
};

function stubRequest(init: {
  cookies?: unknown;
  user?: AuthUserContext;
}): Request {
  return { cookies: init.cookies, user: init.user } as Request;
}

function isPublic(handler: (...args: never[]) => unknown): boolean {
  return Reflect.getMetadata(IS_PUBLIC_KEY, handler) === true;
}

describe('AuthController', () => {
  let controller: AuthController;
  let bootstrapStatus: { execute: jest.Mock };
  let bootstrapAdmin: { execute: jest.Mock };
  let login: { execute: jest.Mock };
  let logout: { execute: jest.Mock };
  let refresh: { execute: jest.Mock };
  let me: { execute: jest.Mock };
  let acceptInvite: { execute: jest.Mock };
  const env = { JWT_ACCESS_TTL: ACCESS_TTL } as Env;
  const res = {} as Response;

  beforeEach(async () => {
    bootstrapStatus = { execute: jest.fn() };
    bootstrapAdmin = { execute: jest.fn() };
    login = { execute: jest.fn() };
    logout = { execute: jest.fn() };
    refresh = { execute: jest.fn() };
    me = { execute: jest.fn() };
    acceptInvite = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: BootstrapStatusUseCase, useValue: bootstrapStatus },
        { provide: BootstrapAdminUseCase, useValue: bootstrapAdmin },
        { provide: LoginUseCase, useValue: login },
        { provide: LogoutUseCase, useValue: logout },
        { provide: RefreshUseCase, useValue: refresh },
        { provide: MeUseCase, useValue: me },
        { provide: AcceptInviteUseCase, useValue: acceptInvite },
        { provide: ENV, useValue: env },
      ],
    }).compile();

    controller = module.get(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('marks session-recovery routes public and logout/me protected', () => {
    const proto = AuthController.prototype;

    expect(isPublic(proto.getBootstrapStatus)).toBe(true);
    expect(isPublic(proto.postBootstrapAdmin)).toBe(true);
    expect(isPublic(proto.postLogin)).toBe(true);
    expect(isPublic(proto.postAcceptInvite)).toBe(true);
    expect(isPublic(proto.postRefresh)).toBe(true);
    expect(isPublic(proto.postLogout)).toBe(false);
    expect(isPublic(proto.getMe)).toBe(false);

    expect(Reflect.getMetadata('path', proto.getBootstrapStatus)).toBe(
      'bootstrap-status',
    );
    expect(Reflect.getMetadata('path', proto.postBootstrapAdmin)).toBe(
      'bootstrap-admin',
    );
    expect(Reflect.getMetadata('path', proto.postLogin)).toBe('login');
    expect(Reflect.getMetadata('path', proto.postAcceptInvite)).toBe(
      'accept-invite',
    );
    expect(Reflect.getMetadata('path', proto.postRefresh)).toBe('refresh');
    expect(Reflect.getMetadata('path', proto.postLogout)).toBe('logout');
    expect(Reflect.getMetadata('path', proto.getMe)).toBe('me');

    expect(Reflect.getMetadata('method', proto.getBootstrapStatus)).toBe(
      RequestMethod.GET,
    );
    expect(Reflect.getMetadata('method', proto.postLogin)).toBe(
      RequestMethod.POST,
    );
    expect(Reflect.getMetadata('method', proto.postAcceptInvite)).toBe(
      RequestMethod.POST,
    );
  });

  it('delegates GET bootstrap-status without cookies', async () => {
    const payload = { available: true };
    bootstrapStatus.execute.mockResolvedValue(payload);

    await expect(controller.getBootstrapStatus()).resolves.toBe(payload);
    expect(bootstrapStatus.execute).toHaveBeenCalledWith();
    expect(setAuthCookies).not.toHaveBeenCalled();
  });

  it('bootstraps admin, sets cookies, and returns user without tokens', async () => {
    bootstrapAdmin.execute.mockResolvedValue(tokenResult);
    const body: BootstrapAdminDto = {
      email: sessionUser.email,
      password: 'Password12!',
    };

    await expect(controller.postBootstrapAdmin(body, res)).resolves.toEqual({
      user: tokenResult.user,
    });
    expect(bootstrapAdmin.execute).toHaveBeenCalledWith(body);
    expect(setAuthCookies).toHaveBeenCalledWith(
      res,
      tokenResult.accessToken,
      tokenResult.refreshToken,
      env,
    );
  });

  it('accepts invite without setting session cookies', async () => {
    const invited: AcceptInviteResult = {
      user: {
        id: createUserId('usr_22222222-2222-4222-8222-222222222222'),
        email: 'user@example.com',
        role: 'user',
      },
    };
    acceptInvite.execute.mockResolvedValue(invited);
    const body: AcceptInviteDto = {
      token: 'invite.raw',
      password: 'Password12!!',
    };

    await expect(controller.postAcceptInvite(body)).resolves.toEqual(invited);
    expect(acceptInvite.execute).toHaveBeenCalledWith(body);
    expect(setAuthCookies).not.toHaveBeenCalled();
  });

  it('logs in, sets cookies, and returns expiresIn + user without tokens', async () => {
    login.execute.mockResolvedValue(tokenResult);
    const body: LoginDto = {
      email: sessionUser.email,
      password: 'Password12!',
    };

    await expect(controller.postLogin(body, res)).resolves.toEqual({
      expiresIn: ACCESS_TTL,
      user: tokenResult.user,
    });
    expect(login.execute).toHaveBeenCalledWith(body);
    expect(setAuthCookies).toHaveBeenCalledWith(
      res,
      tokenResult.accessToken,
      tokenResult.refreshToken,
      env,
    );
  });

  it('refreshes from cc_refresh cookie and sets rotated cookies', async () => {
    refresh.execute.mockResolvedValue(tokenResult);
    const req = stubRequest({ cookies: { cc_refresh: 'refresh.raw' } });

    await expect(controller.postRefresh(req, res)).resolves.toEqual({
      expiresIn: ACCESS_TTL,
    });
    expect(refresh.execute).toHaveBeenCalledWith('refresh.raw');
    expect(setAuthCookies).toHaveBeenCalledWith(
      res,
      tokenResult.accessToken,
      tokenResult.refreshToken,
      env,
    );
  });

  it('passes undefined to refresh when cc_refresh is missing or not a string', async () => {
    refresh.execute.mockResolvedValue(tokenResult);

    await controller.postRefresh(stubRequest({}), res);
    expect(refresh.execute).toHaveBeenCalledWith(undefined);

    await controller.postRefresh(
      stubRequest({ cookies: { cc_refresh: 1 } }),
      res,
    );
    expect(refresh.execute).toHaveBeenLastCalledWith(undefined);
  });

  it('logout without session user throws 401 and does not clear cookies', async () => {
    const req = stubRequest({ cookies: { cc_refresh: 'refresh.raw' } });

    await expect(controller.postLogout(req, res)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(logout.execute).not.toHaveBeenCalled();
    expect(clearAuthCookies).not.toHaveBeenCalled();
  });

  it('logout forwards session user id and clears cookies', async () => {
    logout.execute.mockResolvedValue(undefined);
    const req = stubRequest({
      user: sessionUser,
      cookies: { cc_refresh: 'refresh.raw' },
    });

    await expect(controller.postLogout(req, res)).resolves.toEqual({ ok: true });
    expect(logout.execute).toHaveBeenCalledWith(sessionUser.id, 'refresh.raw');
    expect(clearAuthCookies).toHaveBeenCalledWith(res, env);
  });

  it('delegates GET me to MeUseCase', async () => {
    const meResult = {
      id: sessionUser.id,
      email: sessionUser.email,
      role: sessionUser.role,
    };
    me.execute.mockResolvedValue(meResult);

    await expect(controller.getMe(sessionUser)).resolves.toBe(meResult);
    expect(me.execute).toHaveBeenCalledWith(sessionUser);
    expect(setAuthCookies).not.toHaveBeenCalled();
  });
});

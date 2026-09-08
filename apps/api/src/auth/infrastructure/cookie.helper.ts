import { parseTtlMs } from '../application/auth.helpers';
import type { CookieOptions, Response, Request } from 'express';
import type { Env } from '../../shared/config/env';

const ACCESS_COOKIE = 'cc_access';
const REFRESH_COOKIE = 'cc_refresh';

export function setAuthCookies(
  res: Response,
  access: string,
  refresh: string,
  env: Env,
): void {
  const isProduction = env.NODE_ENV === 'production';
  const base: CookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    path: '/',
  };
  res.cookie(ACCESS_COOKIE, access, {
    ...base,
    maxAge: parseTtlMs(env.JWT_ACCESS_TTL),
  });
  res.cookie(REFRESH_COOKIE, refresh, {
    ...base,
    maxAge: parseTtlMs(env.JWT_REFRESH_TTL),
  });
}

export function clearAuthCookies(res: Response, env: Env): void {
  const isProduction = env.NODE_ENV === 'production';
  const base: CookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    path: '/',
  };
  res.clearCookie(ACCESS_COOKIE, base);
  res.clearCookie(REFRESH_COOKIE, base);
}

export function readCookie(req: Request, name: string): string | undefined {
  const cookies: unknown = req.cookies;
  if (typeof cookies !== 'object' || cookies === null) return undefined;
  const value = (cookies as Record<string, unknown>)[name];
  return typeof value === 'string' ? value : undefined;
}

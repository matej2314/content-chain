import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { createUserId, isUserId, isUserRole } from '@content-chain/shared';
import { ENV, type Env } from '../../shared/config/env';
import { DomainException } from '../../shared/exceptions/domain.exception';
import type { Request } from 'express';
import type { AuthUserContext } from '../domain/auth-user.types';

function isRecord(value: unknown): value is {
  sub?: unknown;
  email?: unknown;
  role?: unknown;
} {
  return typeof value === 'object' && value !== null;
}

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(
  Strategy,
  'jwt-cookie',
) {
  constructor(@Inject(ENV) private readonly env: Env) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request | undefined) => {
          if (!req?.cookies) return null;
          const token = req.cookies['cc_access'];
          return typeof token === 'string' && token.length > 0 ? token : null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
    });
  }

  validate(payload: unknown): AuthUserContext {
    if (
      !isRecord(payload) ||
      typeof payload.sub !== 'string' ||
      !isUserId(payload.sub) ||
      typeof payload.email !== 'string' ||
      payload.email.length === 0 ||
      typeof payload.role !== 'string' ||
      !isUserRole(payload.role)
    ) {
      throw new DomainException('UNAUTHORIZED', 'Invalid token subject', 401);
    }
    return {
      id: createUserId(payload.sub),
      email: payload.email,
      role: payload.role,
    };
  }
}

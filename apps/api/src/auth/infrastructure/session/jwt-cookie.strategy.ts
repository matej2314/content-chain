import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { createUserId, isUserId, isUserRole } from '@content-chain/shared';
import { ENV, type Env } from '../../../shared/config/env';
import { DomainException } from '../../../shared/exceptions/domain.exception';
import { readCookie } from './cookie.helper';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../../domain/user-repository.port';
import type { Request } from 'express';
import type { AuthUserContext } from '../../domain/auth-user.types';

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
  constructor(
    @Inject(ENV) private readonly env: Env,
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request | undefined) => {
          if (!req?.cookies) return null;
          const token = readCookie(req, 'cc_access');
          return typeof token === 'string' && token.length > 0 ? token : null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
    });
  }

  async validate(payload: unknown): Promise<AuthUserContext> {
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

    const userId = createUserId(payload.sub);
    const user = await this.users.findById(userId);
    if (!user || !user.isActive) {
      throw new DomainException(
        'UNAUTHORIZED',
        'User not found or inactive',
        401,
      );
    }
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}

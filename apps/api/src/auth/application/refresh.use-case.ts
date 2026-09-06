import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { DomainException } from '../../shared/exceptions/domain.exception';
import {
  generateRefreshToken,
  hashRefreshToken,
  parseTtlMs,
} from './auth.helpers';
import {
  REFRESH_SESSION_REPOSITORY,
  type RefreshSessionRepository,
} from '../domain/refresh-session.repository.port';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import { ENV, type Env } from '../../shared/config/env';
import type { AuthTokenResult } from './bootstrap-admin.use-case';

@Injectable()
export class RefreshUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(REFRESH_SESSION_REPOSITORY)
    private readonly sessions: RefreshSessionRepository,
    private readonly jwt: JwtService,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async execute(rawRefreshToken: string | undefined): Promise<AuthTokenResult> {
    if (!rawRefreshToken) {
      throw new DomainException('UNAUTHORIZED', 'Missing refresh token', 401);
    }

    const tokenHash = hashRefreshToken(rawRefreshToken);

    const session = await this.sessions.findValidByHash(tokenHash);
    if (!session) {
      throw new DomainException(
        'UNAUTHORIZED',
        'Invalid or expired refresh token',
        401,
      );
    }

    const user = await this.users.findById(session.userId);
    if (!user || !user.isActive) {
      throw new DomainException(
        'UNAUTHORIZED',
        'User not found or inactive',
        401,
      );
    }

    const { raw: newRefreshToken, hash: newHash } = generateRefreshToken();
    const rotated = await this.sessions.rotate(tokenHash, {
      id: uuidv4(),
      userId: user.id,
      tokenHash: newHash,
      expiresAt: new Date(Date.now() + parseTtlMs(this.env.JWT_REFRESH_TTL)),
    });
    if (!rotated.ok) {
      throw new DomainException(
        'UNAUTHORIZED',
        'Invalid or expired refresh token',
        401,
      );
    }

    const accessToken = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: { id: user.id, email: user.email, role: user.role },
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}

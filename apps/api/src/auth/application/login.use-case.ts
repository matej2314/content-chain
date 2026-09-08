import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import {
  REFRESH_SESSION_REPOSITORY,
  type RefreshSessionRepository,
} from '../domain/refresh-session.repository.port';
import {
  comparePassword,
  generateRefreshToken,
  parseTtlMs,
} from './auth.helpers';
import { loginSchema } from './auth.schemas';
import { ENV, type Env } from '../../shared/config/env';
import type { AuthTokenResult } from './bootstrap-admin.use-case';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(REFRESH_SESSION_REPOSITORY)
    private readonly sessions: RefreshSessionRepository,
    private readonly jwt: JwtService,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async execute(input: unknown): Promise<AuthTokenResult> {
    const command = parseWithZod(loginSchema, input);

    const userForAuth = await this.users.findForAuth(command.email);
    if (!userForAuth || !userForAuth.isActive) {
      throw new DomainException('UNAUTHORIZED', 'Invalid credentials', 401);
    }

    const validPass = await comparePassword(
      command.password,
      userForAuth.passwordHash,
    );

    if (!validPass) {
      throw new DomainException('UNAUTHORIZED', 'Invalid credentials', 401);
    }

    const accessToken = await this.jwt.signAsync({
      sub: userForAuth.id,
      email: userForAuth.email,
      role: userForAuth.role,
    });

    const { raw: refreshToken, hash: tokenHash } = generateRefreshToken();

    await this.sessions.create({
      id: uuidv4(),
      userId: userForAuth.id,
      tokenHash,
      expiresAt: new Date(Date.now() + parseTtlMs(this.env.JWT_REFRESH_TTL)),
    });

    return {
      user: {
        id: userForAuth.id,
        email: userForAuth.email,
        role: userForAuth.role,
      },
      accessToken,
      refreshToken,
    };
  }
}

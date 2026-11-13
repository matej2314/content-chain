import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { ENV, type Env } from '../../shared/config/env';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import {
  REFRESH_SESSION_REPOSITORY,
  type RefreshSessionRepository,
} from '../domain/refresh-session.repository.port';
import { validatePasswordPolicy } from '../domain/password.policy';
import {
  comparePassword,
  generateRefreshToken,
  hashPassword,
  parseTtlMs,
} from './auth.helpers';
import { changeMePasswordSchema } from './auth.schemas';
import type { AuthTokenResult } from './bootstrap-admin.use-case';
import type { AuthUserContext } from '../domain/auth-user.types';

@Injectable()
export class ChangeMePasswordUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(REFRESH_SESSION_REPOSITORY)
    private readonly sessions: RefreshSessionRepository,
    private readonly jwt: JwtService,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async execute(
    context: AuthUserContext,
    input: unknown,
  ): Promise<AuthTokenResult> {
    const command = parseWithZod(changeMePasswordSchema, input);

    const current = await this.users.findForAuth(context.email);
    if (!current || !current.isActive || current.id !== context.id) {
      throw new DomainException(
        'UNAUTHORIZED',
        'User not found or inactive',
        401,
      );
    }

    const isPasswordValid = await comparePassword(
      command.currentPassword,
      current.passwordHash,
    );
    if (!isPasswordValid) {
      throw new DomainException('INVALID_PASSWORD', 'Invalid password', 401);
    }

    validatePasswordPolicy(command.newPassword);

    const passwordHash = await hashPassword(command.newPassword);
    await this.users.updatePassword(context.id, passwordHash);
    await this.sessions.deleteByUser(context.id);

    const accessToken = await this.jwt.signAsync({
      sub: current.id,
      email: current.email,
      role: current.role,
    });
    const { raw: refreshToken, hash: tokenHash } = generateRefreshToken();
    await this.sessions.create({
      id: uuidv4(),
      userId: current.id,
      tokenHash,
      expiresAt: new Date(Date.now() + parseTtlMs(this.env.JWT_REFRESH_TTL)),
    });

    return {
      user: {
        id: current.id,
        email: current.email,
        role: current.role,
      },
      accessToken,
      refreshToken,
    };
  }
}

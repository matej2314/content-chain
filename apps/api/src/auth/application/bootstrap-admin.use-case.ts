import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { createUserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { validatePasswordPolicy } from '../domain/password.policy';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import {
  REFRESH_SESSION_REPOSITORY,
  type RefreshSessionRepository,
} from '../domain/refresh-session.repository.port';
import { hashPassword, generateRefreshToken, parseTtlMs } from './auth.helpers';
import { bootstrapAdminSchema } from './auth.schemas';
import { ENV, type Env } from '../../shared/config/env';
import type { AuthUser } from '../domain/auth-user.types';

export type AuthTokenResult = {
  user: Pick<AuthUser, 'id' | 'email' | 'role'>;
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class BootstrapAdminUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(REFRESH_SESSION_REPOSITORY)
    private readonly sessions: RefreshSessionRepository,
    private readonly jwt: JwtService,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async execute(input: unknown): Promise<AuthTokenResult> {
    const command = parseWithZod(bootstrapAdminSchema, input);

    const count = await this.users.findAdminCount();
    if (count > 0) {
      throw new DomainException(
        'CONFLICT',
        'Bootstrap admin already exists',
        409,
      );
    }

    validatePasswordPolicy(command.password);

    const passwordHash = await hashPassword(command.password);
    const userId = createUserId(`usr_${uuidv4()}`);

    const created = await this.users.createAdminIfNone({
      id: userId,
      email: command.email,
      passwordHash,
    });
    if (!created.ok) {
      throw new DomainException(
        'CONFLICT',
        'Bootstrap admin already exists',
        409,
      );
    }
    const user = created.user;

    const accessToken = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const { raw: refreshToken, hash: tokenHash } = await generateRefreshToken();

    await this.sessions.create({
      id: uuidv4(),
      userId: user.id,
      tokenHash,
      expiresAt: new Date(Date.now() + parseTtlMs(this.env.JWT_REFRESH_TTL)),
    });

    return {
      user: { id: user.id, email: user.email, role: user.role },
      accessToken,
      refreshToken,
    };
  }
}

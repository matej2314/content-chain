import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { newAccountActivationId, newUserId } from '../../shared/http/new-ids';
import { validatePasswordPolicy } from '../domain/password.policy';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import {
  INVITATION_REPOSITORY,
  type InvitationRepository,
} from '../domain/invitation-repository.port';
import {
  ACCOUNT_ACTIVATION_REPOSITORY,
  type AccountActivationRepository,
} from '../domain/account-activation-repository.port';
import {
  TRANSACTIONAL_MAILER,
  type TransactionalMailer,
} from '../domain/transactional-mailer.port';
import { ENV, type Env } from '../../shared/config/env';
import { generateRefreshToken, hashPassword, parseTtlMs } from './auth.helpers';
import { registerUserSchema } from './auth.schemas';
import type { UserId, UserRole } from '@content-chain/shared';

function isUniqueConstraintViolation(
  error: unknown,
): error is Prisma.PrismaClientKnownRequestError {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002'
  );
}

export type RegisterUserOutput = {
  user: {
    id: UserId;
    email: string;
    role: UserRole;
    verifiedAt: Date | null;
  };
};

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(INVITATION_REPOSITORY)
    private readonly invitations: InvitationRepository,
    @Inject(ACCOUNT_ACTIVATION_REPOSITORY)
    private readonly activations: AccountActivationRepository,
    @Inject(TRANSACTIONAL_MAILER) private readonly mailer: TransactionalMailer,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async execute(input: unknown): Promise<RegisterUserOutput> {
    const command = parseWithZod(registerUserSchema, input);

    const existing = await this.users.findForAuth(command.email);
    if (existing) {
      throw new DomainException('CONFLICT', 'Email already in use', 409);
    }

    validatePasswordPolicy(command.password);

    const isPendingInvite = await this.invitations.findPendingByEmail(
      command.email,
    );

    if (isPendingInvite) {
      await this.invitations.revoke(isPendingInvite.id);
    }

    const passwordHash = await hashPassword(command.password);
    const userId = newUserId();
    const role: UserRole = 'user';
    const isProduction = this.env.NODE_ENV === 'production';

    let user;
    let rawToken: string | null = null;
    let activationId = null as ReturnType<typeof newAccountActivationId> | null;

    try {
      if (isProduction) {
        const { raw, hash } = generateRefreshToken();
        rawToken = raw;
        activationId = newAccountActivationId();
        user = await this.activations.createPendingUser({
          user: {
            id: userId,
            email: command.email,
            passwordHash,
            role,
            verifiedAt: null,
          },
          activation: {
            id: activationId,
            tokenHash: hash,
            expiresAt: new Date(
              Date.now() + parseTtlMs(this.env.ACTIVATION_TTL),
            ),
          },
        });
      } else {
        user = await this.users.create({
          id: userId,
          email: command.email,
          passwordHash,
          role,
          verifiedAt: new Date(),
        });
      }
    } catch (error) {
      if (isUniqueConstraintViolation(error)) {
        throw new DomainException('CONFLICT', 'Email already in use', 409);
      }
      throw error;
    }

    if (isProduction && rawToken && activationId) {
      try {
        await this.mailer.send({
          kind: 'user_activation',
          to: user.email,
          activationId,
          activateUrl: `${this.env.APP_PUBLIC_URL ?? ''}/?activationToken=${rawToken}`,
          rawToken,
        });
      } catch {
        throw new DomainException(
          'MAIL_DELIVERY_FAILED',
          'Mail delivery failed',
          503,
          [{ id: user.id }],
        );
      }
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        verifiedAt: user.verifiedAt,
      },
    };
  }
}

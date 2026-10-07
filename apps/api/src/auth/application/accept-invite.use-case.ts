import { Inject, Injectable } from '@nestjs/common';
import { z } from 'zod';
import type { UserId, UserRole } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { newUserId } from '../../shared/http/new-ids';
import { ENV, type Env } from '../../shared/config/env';
import { validatePasswordPolicy } from '../domain/password.policy';
import {
  INVITATION_REPOSITORY,
  type InvitationRepository,
} from '../domain/invitation-repository.port';
import { hashPassword, hashRefreshToken } from './auth.helpers';

const acceptInviteSchema = z
  .object({
    token: z.string().min(1),
    password: z.string().min(1),
  })
  .strict();

export type AcceptInviteResult = {
  user: { id: UserId; email: string; role: UserRole };
};

@Injectable()
export class AcceptInviteUseCase {
  constructor(
    @Inject(INVITATION_REPOSITORY)
    private readonly invitations: InvitationRepository,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async execute(input: unknown): Promise<AcceptInviteResult> {
    const command = parseWithZod(acceptInviteSchema, input);
    const tokenHash = hashRefreshToken(command.token);

    const invitation = await this.invitations.findPendingByHash(
      tokenHash,
      new Date(),
    );
    if (!invitation) {
      throw new DomainException(
        'UNAUTHORIZED',
        'Invalid invitation token',
        401,
      );
    }

    validatePasswordPolicy(command.password);

    const passwordHash = await hashPassword(command.password);
    const role: UserRole = this.env.DEMO_MODE ? 'guest' : 'user';
    const created = await this.invitations.acceptAndCreateUser({
      invitationId: invitation.id,
      userId: newUserId(),
      email: invitation.email,
      passwordHash,
      role,
    });
    if (!created.ok) {
      // A-7b: maskowanie kolizji email jak nieważny token (zakaz 409 na tej trasie).
      throw new DomainException(
        'UNAUTHORIZED',
        'Invalid invitation token',
        401,
      );
    }

    return {
      user: {
        id: created.user.id,
        email: created.user.email,
        role: created.user.role,
      },
    };
  }
}

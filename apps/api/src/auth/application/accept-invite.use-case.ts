import { Inject, Injectable } from '@nestjs/common';
import { z } from 'zod';
import type { UserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { newUserId } from '../../shared/http/new-ids';
import { validatePasswordPolicy } from '../domain/password.policy';
import {
  INVITATION_REPOSITORY,
  type InvitationRepository,
} from '../domain/invitation-repository.port';
import { hashPassword, hashRefreshToken } from './auth.helpers';

const acceptInviteSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(1),
});

export type AcceptInviteResult = {
  user: { id: UserId; email: string; role: 'user' };
};

@Injectable()
export class AcceptInviteUseCase {
  constructor(
    @Inject(INVITATION_REPOSITORY)
    private readonly invitations: InvitationRepository,
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
    const created = await this.invitations.acceptAndCreateUser({
      invitationId: invitation.id,
      userId: newUserId(),
      email: invitation.email,
      passwordHash,
    });
    if (!created.ok) {
      throw new DomainException('CONFLICT', 'Email already in use', 409);
    }

    return {
      user: {
        id: created.user.id,
        email: created.user.email,
        role: 'user',
      },
    };
  }
}

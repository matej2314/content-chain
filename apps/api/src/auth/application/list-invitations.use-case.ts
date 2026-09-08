import { Inject, Injectable } from '@nestjs/common';
import type { InvitationId, UserId } from '@content-chain/shared';
import {
  INVITATION_REPOSITORY,
  type InvitationRepository,
} from '../domain/invitation-repository.port';

export type InvitationListItem = {
  id: InvitationId;
  email: string;
  createdAt: string;
  expiresAt: string;
  invitedBy: { id: UserId, email: string };
};

@Injectable()
export class ListInvitationsUseCase {
  constructor(
    @Inject(INVITATION_REPOSITORY)
    private readonly invitations: InvitationRepository,
  ) {}

  async execute(): Promise<{ items: InvitationListItem[] }> {
    const pending = await this.invitations.listPending();
    return {
      items: pending.map((row) => ({
        id: row.id,
        email: row.email,
        createdAt: row.createdAt.toISOString(),
        expiresAt: row.expiresAt.toISOString(),
        invitedBy: { id: row.invitedBy.id, email: row.invitedBy.email },
      })),
    };
  }
}

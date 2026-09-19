import type { InvitationId } from '@content-chain/shared';
import { apiFetch } from '@/shared/api/api-fetch';
import { isRecord } from '@/shared/api/envelope';
import {
  parseInvitationList,
  parseInviteCreated,
  type InvitationListItem,
  type InviteCreated,
} from '@/modules/users/api/invitations.types';

export async function fetchInvitations(): Promise<readonly InvitationListItem[]> {
  const body = await apiFetch('/invitations');
  return parseInvitationList(body);
}

export async function createInvitation(email: string): Promise<InviteCreated> {
  const body = await apiFetch('/invitations', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return parseInviteCreated(body);
}

export async function resendInvitation(id: InvitationId): Promise<InviteCreated> {
  const body = await apiFetch(`/invitations/${id}/resend`, { method: 'POST' });
  return parseInviteCreated(body);
}

export async function revokeInvitation(id: InvitationId): Promise<void> {
  const body = await apiFetch(`/invitations/${id}`, { method: 'DELETE' });
  if (!isRecord(body) || body.ok !== true) {
    throw new Error('Invalid revoke payload');
  }
}

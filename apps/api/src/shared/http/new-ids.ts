import { v4 as uuidv4 } from 'uuid';
import {
  createConversationId,
  createInvitationId,
  createRequestId,
  createRunId,
  createUserId,
  createAccountActivationId,
  type ConversationId,
  type InvitationId,
  type RequestId,
  type RunId,
  type UserId,
  type AccountActivationId,
} from '@content-chain/shared';

export const newRequestId = (): RequestId => createRequestId(`req_${uuidv4()}`);
export const newConversationId = (): ConversationId =>
  createConversationId(`conv_${uuidv4()}`);
export const newRunId = (): RunId => createRunId(`run_${uuidv4()}`);
export const newUserId = (): UserId => createUserId(`usr_${uuidv4()}`);
export const newInvitationId = (): InvitationId =>
  createInvitationId(`inv_${uuidv4()}`);
export const newAccountActivationId = (): AccountActivationId =>
  createAccountActivationId(`act_${uuidv4()}`);

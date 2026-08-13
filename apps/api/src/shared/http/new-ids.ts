import { v4 as uuidv4 } from 'uuid';
import {
  createConversationId,
  createRequestId,
  createRunId,
  createUserId,
  type ConversationId,
  type RequestId,
  type RunId,
  type UserId,
} from '@content-chain/shared';

export const newRequestId = (): RequestId => createRequestId(`req_${uuidv4()}`);
export const newConversationId = (): ConversationId =>
  createConversationId(`conv_${uuidv4()}`);
export const newRunId = (): RunId => createRunId(`run_${uuidv4()}`);
export const newUserId = (): UserId => createUserId(`usr_${uuidv4()}`);

import { randomUUID } from 'node:crypto';
import {
  createConversationId,
  createRunId,
  type ConversationId,
  type RunId,
} from '@content-chain/shared';

export const newConversationId = (): ConversationId =>
  createConversationId(`conv_${randomUUID()}`);

export const newRunId = (): RunId => createRunId(`run_${randomUUID()}`);

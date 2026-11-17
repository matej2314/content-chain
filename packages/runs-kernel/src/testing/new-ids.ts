import { v4 as uuidv4 } from 'uuid';
import {
  createConversationId,
  createRunId,
  type ConversationId,
  type RunId,
} from '@content-chain/shared';

export const newConversationId = (): ConversationId =>
  createConversationId(`conv_${uuidv4()}`);

export const newRunId = (): RunId => createRunId(`run_${uuidv4()}`);

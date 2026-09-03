import {
  ContentKind,
  ContentLanguage,
  ContentTaskType,
  ConversationId,
  RunId,
} from '@content-chain/shared';
import { ContentBrief } from '../../../runs/domain/run.types';
import {
  ContentPipelinePhase,
  PageOutline,
  PageDocument,
  VerifierVerdict,
} from '../../domain/content.types';
import { CompanyContext } from '../../../company-context/domain/company-context.types';

export type ContentGraphState = {
  runId: RunId;
  conversationId: ConversationId;
  taskType: ContentTaskType;
  contentKind: ContentKind;
  language: ContentLanguage;
  brief: ContentBrief;
  selectedIdeaIds: string[] | null;
  phase: ContentPipelinePhase;
  company: CompanyContext | null;
  outline: PageOutline | null;
  document: PageDocument | null;
  verdict: VerifierVerdict | null;
  outlineRefineCount: number;
  copyRefineCount: number;
  failedCode: string | null;
  failedMessage: string | null;
};

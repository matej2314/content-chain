import type { CompanyContext } from '../../company-context/domain/company-context.types';
import type { ContentBrief } from '../../runs/domain/run.types';
import type {
  ContentKind,
  ContentLanguage,
  ConversationId,
  ContentTaskType,
  RunId,
} from '@content-chain/shared';

export type ContentPipelinePhase = 'outline' | 'copy';

export type PageOutlineSection = {
  id: string;
  heading: string;
  summary: string;
};

export type PageOutline = {
  id: string;
  title: string;
  sections: PageOutlineSection[];
};

export type PageDocument = {
  title: string;
  lead: string;
  body: string;
  metaTitle?: string;
  metaDescription?: string;
};

export type VerifierVerdict = {
  ok: boolean;
  contextIssues: string[];
  languageIssues: string[];
};

export type ContentPipelineState = {
  phase: ContentPipelinePhase | null;
  outlineRefineCount: number;
  copyRefineCount: number;
};

export type ContentRefineSnapshot = {
  outlineRefineCount: number;
  copyRefineCount: number;
};

export type ContentPipelineOutcome =
  | (ContentRefineSnapshot & {
      kind: 'completed';
      outline: PageOutline | null;
      document: PageDocument | null;
    })
  | (ContentRefineSnapshot & {
      kind: 'awaiting_hitl';
      outline: PageOutline;
    })
  | (ContentRefineSnapshot & {
      kind: 'failed';
      code: string;
      message: string;
      contextIssues?: string[];
      languageIssues?: string[];
    });

export type ContentPipelineInput = {
  runId: RunId;
  conversationId: ConversationId;
  taskType: ContentTaskType;
  contentKind: ContentKind;
  language: ContentLanguage;
  brief: ContentBrief;
  selectedIdeaIds: string[] | null;
  phase: ContentPipelinePhase;
  company: CompanyContext;
  outline: PageOutline | null;
  document: PageDocument | null;
};

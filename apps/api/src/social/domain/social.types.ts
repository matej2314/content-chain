import type { CompanyContext } from '../../company-context/domain/company-context.types';
import type { RunBrief } from '../../runs/domain/run.types';
import type {
  ContentLanguage,
  ConversationId,
  RunId,
  RunTaskType,
  SocialPlatform,
} from '@content-chain/shared';

export type PipelinePhase = 'ideas' | 'content';

export type SocialIdea = {
  id: string;
  title: string;
  angle: string;
  hook: string;
};

export type SocialContent = {
  body: string;
  hashtags: string[];
  cta?: string;
};

export type VerifierVerdict = {
  ok: boolean;
  contextIssues: string[];
  languageIssues: string[];
};

export type PipelineState = {
  phase: PipelinePhase | null;
  ideasRefineCount: number;
  contentRefineCount: number;
};

export type SocialPipelineInput = {
  runId: RunId;
  conversationId: ConversationId;
  taskType: RunTaskType;
  platform: SocialPlatform;
  language: ContentLanguage;
  brief: RunBrief;
  selectedIdeaIds: string[] | null;
  phase: PipelinePhase;
  company: CompanyContext;
  ideas: SocialIdea[];
  content: SocialContent | null;
};

export type SocialPipelineOutcome =
  | { kind: 'completed'; ideas: SocialIdea[]; content: SocialContent | null }
  | { kind: 'awaiting_hitl'; ideas: SocialIdea[] }
  | {
      kind: 'failed';
      code: string;
      message: string;
      contextIssues?: string[];
      languageIssues?: string[];
    };

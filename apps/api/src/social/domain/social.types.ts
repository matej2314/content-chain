import type { CompanyContext } from '../../company-context/domain/company-context.types';
import type { SocialBrief } from '../../runs/domain/run.types';
import type {
  ContentLanguage,
  ConversationId,
  RunId,
  SocialPlatform,
  SocialTaskType,
} from '@content-chain/shared';

export type PipelinePhase = 'ideas' | 'content';

export type SocialIdea = {
  id: string;
  title: string;
  angle: string;
  hook: string;
  cta?: string;
};

export type SocialContent = {
  body: string;
  hashtags: string[];
  cta?: string;
  characterCount: number;
};

export type ReelDurationSeconds = 15 | 30 | 90;

export type ReelIdea = {
  id: string;
  title: string;
  description: string;
  hook: string;
  durationSeconds: ReelDurationSeconds;
  cta?: string;
};

export type ReelScriptSegment = {
  startSeconds: number;
  endSeconds: number;
  onScreen: string;
  voiceover: string;
};

export type ReelScript = {
  segments: ReelScriptSegment[];
  cta: string;
  notes?: string;
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
  taskType: SocialTaskType;
  platform: SocialPlatform;
  language: ContentLanguage;
  brief: SocialBrief;
  selectedIdeaIds: string[] | null;
  phase: PipelinePhase;
  company: CompanyContext;
  ideas: SocialIdea[];
  reelIdeas: ReelIdea[];
  reelScript: ReelScript | null;
  content: SocialContent | null;
};

export type SocialPipelineOutcome =
  | {
      kind: 'completed';
      ideas: SocialIdea[];
      content: SocialContent | null;
      reelIdeas: ReelIdea[];
      reelScript: ReelScript | null;
    }
  | { kind: 'awaiting_hitl'; ideas: SocialIdea[]; reelIdeas: ReelIdea[] }
  | {
      kind: 'failed';
      code: string;
      message: string;
      contextIssues?: string[];
      languageIssues?: string[];
    };

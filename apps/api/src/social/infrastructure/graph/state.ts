import type { CompanyContext } from '../../../company-context/domain/company-context.types';
import type { SocialBrief } from '../../../runs/domain/run.types';
import type {
  PipelinePhase,
  ReelIdea,
  ReelScript,
  SocialContent,
  SocialIdea,
  VerifierVerdict,
} from '../../domain/social.types';
import type {
  ContentLanguage,
  ConversationId,
  RunId,
  SocialPlatform,
  SocialTaskType,
} from '@content-chain/shared';

export type SocialGraphState = {
  runId: RunId;
  conversationId: ConversationId;
  taskType: SocialTaskType;
  platform: SocialPlatform;
  language: ContentLanguage;
  brief: SocialBrief;
  selectedIdeaIds: string[] | null;
  phase: PipelinePhase;
  company: CompanyContext | null;
  ideas: SocialIdea[];
  content: SocialContent | null;
  reelIdeas: ReelIdea[];
  reelScript: ReelScript | null;
  verdict: VerifierVerdict | null;
  ideasRefineCount: number;
  contentRefineCount: number;
  failedCode: string | null;
  failedMessage: string | null;
};

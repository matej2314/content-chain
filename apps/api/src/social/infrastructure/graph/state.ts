import type { CompanyContext } from '../../../company-context/domain/company-context.types';
import type { RunBrief } from '../../../runs/domain/run.types';
import type {
  PipelinePhase,
  SocialContent,
  SocialIdea,
  VerifierVerdict,
} from '../../domain/social.types';
import type {
  ContentLanguage,
  ConversationId,
  RunId,
  RunTaskType,
  SocialPlatform,
} from '@content-chain/shared';

export type SocialGraphState = {
  runId: RunId;
  conversationId: ConversationId;
  taskType: RunTaskType;
  platform: SocialPlatform;
  language: ContentLanguage;
  brief: RunBrief;
  selectedIdeaIds: string[] | null;
  phase: PipelinePhase;
  company: CompanyContext | null;
  ideas: SocialIdea[];
  content: SocialContent | null;
  verdict: VerifierVerdict | null;
  ideasRefineCount: number;
  contentRefineCount: number;
  failedCode: string | null;
  failedMessage: string | null;
};

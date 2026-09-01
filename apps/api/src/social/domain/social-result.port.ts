import type { RunId } from '@content-chain/shared';
import type {
  PipelineState,
  ReelIdea,
  ReelScript,
  SocialContent,
  SocialIdea,
  VerifierVerdict,
} from './social.types';

export const SOCIAL_RESULT_STORE = Symbol('SOCIAL_RESULT_STORE');

export interface SocialResultStore {
  replaceIdeas(runId: RunId, ideas: SocialIdea[]): Promise<void>;
  replaceReelIdeas(runId: RunId, ideas: ReelIdea[]): Promise<void>;
  replaceReelScript(
    runId: RunId,
    script: ReelScript,
    verification: VerifierVerdict,
  ): Promise<void>;
  replaceContent(
    runId: RunId,
    content: SocialContent,
    verification: VerifierVerdict,
  ): Promise<void>;
  listIdeas(runId: RunId): Promise<SocialIdea[]>;
  listReelIdeas(runId: RunId): Promise<ReelIdea[]>;
  getContent(runId: RunId): Promise<{
    content: SocialContent;
    verification: VerifierVerdict | null;
  } | null>;
  getReelScript(runId: RunId): Promise<{
    script: ReelScript;
    verification: VerifierVerdict | null;
  } | null>;
  savePipelineState(runId: RunId, state: PipelineState): Promise<void>;
  getPipelineState(runId: RunId): Promise<PipelineState>;
}

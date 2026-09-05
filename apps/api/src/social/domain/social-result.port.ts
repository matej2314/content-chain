import type { RunId } from '@content-chain/shared';
import type {
  PipelineState,
  ReelIdea,
  ReelScript,
  ReelScriptItem,
  SocialContent,
  SocialContentItem,
  SocialIdea,
  VerifierVerdict,
} from './social.types';

export const SOCIAL_RESULT_STORE = Symbol('SOCIAL_RESULT_STORE');

export interface SocialResultStore {
  replaceIdeas(runId: RunId, ideas: SocialIdea[]): Promise<void>;
  replaceReelIdeas(runId: RunId, ideas: ReelIdea[]): Promise<void>;
  listIdeas(runId: RunId): Promise<SocialIdea[]>;
  listReelIdeas(runId: RunId): Promise<ReelIdea[]>;
  replaceContent(
    runId: RunId,
    content: SocialContent,
    verification: VerifierVerdict,
  ): Promise<void>;
  replaceReelScript(
    runId: RunId,
    script: ReelScript,
    verification: VerifierVerdict,
  ): Promise<void>;
  clearContents(runId: RunId): Promise<void>;
  appendContent(
    runId: RunId,
    content: SocialContent,
    verification: VerifierVerdict,
  ): Promise<void>;
  listContents(runId: RunId): Promise<SocialContentItem[]>;
  clearReelScripts(runId: RunId): Promise<void>;
  appendReelScript(
    runId: RunId,
    script: ReelScript,
    verification: VerifierVerdict,
  ): Promise<void>;
  listReelScripts(runId: RunId): Promise<ReelScriptItem[]>;
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

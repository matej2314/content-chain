import type { RunId } from '@content-chain/shared';
import type {
  PageDocument,
  PageOutline,
} from '../../content/domain/content.types';
import type {
  ReelIdea,
  ReelScript,
  ReelScriptItem,
  SocialContent,
  SocialContentItem,
  SocialIdea,
  VerifierVerdict,
} from '../../social/domain/social.types';

export const RUN_RESULT_READER = Symbol('RUN_RESULT_READER');

export interface RunResultReader {
  listIdeas(runId: RunId): Promise<SocialIdea[]>;
  getContent(runId: RunId): Promise<{
    content: SocialContent;
    verification: VerifierVerdict | null;
  } | null>;
  listContents(runId: RunId): Promise<SocialContentItem[]>;
  listReelIdeas(runId: RunId): Promise<ReelIdea[]>;
  getReelScript(runId: RunId): Promise<{
    script: ReelScript;
    verification: VerifierVerdict | null;
  } | null>;
  listReelScripts(runId: RunId): Promise<ReelScriptItem[]>;
  getPageOutline(runId: RunId): Promise<PageOutline | null>;
  getPageDocument(runId: RunId): Promise<{
    document: PageDocument | null;
    verification: VerifierVerdict | null;
  } | null>;
}

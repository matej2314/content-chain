import type { RunId } from '@content-chain/shared';
import type {
  PageDocument,
  PageOutline,
} from '../../content/domain/content.types';
import type {
  SocialContent,
  SocialIdea,
  VerifierVerdict,
  ReelIdea,
  ReelScript,
} from '../../social/domain/social.types';

export const RUN_RESULT_READER = Symbol('RUN_RESULT_READER');

export interface RunResultReader {
  listIdeas(runId: RunId): Promise<SocialIdea[]>;
  getContent(runId: RunId): Promise<{
    content: SocialContent | null;
    verification: VerifierVerdict | null;
  } | null>;
  listReelIdeas(runId: RunId): Promise<ReelIdea[]>;
  getReelScript(runId: RunId): Promise<{
    script: ReelScript | null;
    verification: VerifierVerdict | null;
  } | null>;
  getPageOutline(runId: RunId): Promise<PageOutline | null>;
  getPageDocument(runId: RunId): Promise<{
    document: PageDocument | null;
    verification: VerifierVerdict | null;
  } | null>;
}

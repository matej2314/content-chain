import type { RunId } from '@content-chain/shared';
import type { ContentResultStore } from '../../content/domain/content-result.port';
import type {
  PageDocument,
  PageOutline,
} from '../../content/domain/content.types';
import type { SocialResultStore } from '../../social/domain/social-result.port';
import type {
  ReelIdea,
  ReelScript,
  SocialContent,
  SocialIdea,
  VerifierVerdict,
} from '../../social/domain/social.types';
import type { RunResultReader } from '../domain/run-result-reader.port';

export class CompositeRunResultReader implements RunResultReader {
  constructor(
    private readonly social: SocialResultStore,
    private readonly content: ContentResultStore,
  ) {}

  listIdeas(runId: RunId): Promise<SocialIdea[]> {
    return this.social.listIdeas(runId);
  }

  getContent(runId: RunId): Promise<{
    content: SocialContent | null;
    verification: VerifierVerdict | null;
  } | null> {
    return this.social.getContent(runId);
  }

  listReelIdeas(runId: RunId): Promise<ReelIdea[]> {
    return this.social.listReelIdeas(runId);
  }

  getReelScript(runId: RunId): Promise<{
    script: ReelScript | null;
    verification: VerifierVerdict | null;
  } | null> {
    return this.social.getReelScript(runId);
  }

  getPageOutline(runId: RunId): Promise<PageOutline | null> {
    return this.content.getOutline(runId);
  }

  getPageDocument(runId: RunId): Promise<{
    document: PageDocument | null;
    verification: VerifierVerdict | null;
  } | null> {
    return this.content.getDocument(runId);
  }
}

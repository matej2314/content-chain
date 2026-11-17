import type { RunId } from '@content-chain/shared';
import type { ContentResultStore } from '@content-chain/run-pipelines';
import type {
  PageDocument,
  PageOutline,
} from '@content-chain/run-pipelines';
import type { SocialResultStore } from '@content-chain/run-pipelines';
import type {
  ReelIdea,
  ReelScript,
  ReelScriptItem,
  SocialContent,
  SocialContentItem,
  SocialIdea,
  VerifierVerdict,
} from '@content-chain/run-pipelines';
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
    content: SocialContent;
    verification: VerifierVerdict | null;
  } | null> {
    return this.social.getContent(runId);
  }

  listContents(runId: RunId): Promise<SocialContentItem[]> {
    return this.social.listContents(runId);
  }

  listReelIdeas(runId: RunId): Promise<ReelIdea[]> {
    return this.social.listReelIdeas(runId);
  }

  getReelScript(runId: RunId): Promise<{
    script: ReelScript;
    verification: VerifierVerdict | null;
  } | null> {
    return this.social.getReelScript(runId);
  }

  listReelScripts(runId: RunId): Promise<ReelScriptItem[]> {
    return this.social.listReelScripts(runId);
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

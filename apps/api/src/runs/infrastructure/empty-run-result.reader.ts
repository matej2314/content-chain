import { Injectable } from '@nestjs/common';
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
import type { RunResultReader } from '../domain/run-result-reader.port';

@Injectable()
export class EmptyRunResultReader implements RunResultReader {
  listIdeas(_runId: RunId): Promise<SocialIdea[]> {
    return Promise.resolve([]);
  }

  getContent(_runId: RunId): Promise<{
    content: SocialContent;
    verification: VerifierVerdict | null;
  } | null> {
    return Promise.resolve(null);
  }

  listContents(_runId: RunId): Promise<SocialContentItem[]> {
    return Promise.resolve([]);
  }

  listReelIdeas(_runId: RunId): Promise<ReelIdea[]> {
    return Promise.resolve([]);
  }

  getReelScript(_runId: RunId): Promise<{
    script: ReelScript;
    verification: VerifierVerdict | null;
  } | null> {
    return Promise.resolve(null);
  }

  listReelScripts(_runId: RunId): Promise<ReelScriptItem[]> {
    return Promise.resolve([]);
  }

  getPageOutline(_runId: RunId): Promise<PageOutline | null> {
    return Promise.resolve(null);
  }

  getPageDocument(_runId: RunId): Promise<{
    document: PageDocument | null;
    verification: VerifierVerdict | null;
  } | null> {
    return Promise.resolve(null);
  }
}

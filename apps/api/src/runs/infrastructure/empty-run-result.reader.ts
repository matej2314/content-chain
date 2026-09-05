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
  async listIdeas(_runId: RunId): Promise<SocialIdea[]> {
    return [];
  }

  async getContent(_runId: RunId): Promise<{
    content: SocialContent;
    verification: VerifierVerdict | null;
  } | null> {
    return null;
  }

  async listContents(_runId: RunId): Promise<SocialContentItem[]> {
    return [];
  }

  async listReelIdeas(_runId: RunId): Promise<ReelIdea[]> {
    return [];
  }

  async getReelScript(_runId: RunId): Promise<{
    script: ReelScript;
    verification: VerifierVerdict | null;
  } | null> {
    return null;
  }

  async listReelScripts(_runId: RunId): Promise<ReelScriptItem[]> {
    return [];
  }

  async getPageOutline(_runId: RunId): Promise<PageOutline | null> {
    return null;
  }

  async getPageDocument(_runId: RunId): Promise<{
    document: PageDocument | null;
    verification: VerifierVerdict | null;
  } | null> {
    return null;
  }
}

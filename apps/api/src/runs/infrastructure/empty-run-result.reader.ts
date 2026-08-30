import { Injectable } from '@nestjs/common';
import type { RunId } from '@content-chain/shared';
import type {
  SocialContent,
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
    content: SocialContent | null;
    verification: VerifierVerdict | null;
  } | null> {
    return null;
  }
}

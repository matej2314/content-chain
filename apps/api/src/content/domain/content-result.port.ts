import type { RunId } from '@content-chain/shared';
import type {
  ContentPipelineState,
  PageDocument,
  PageOutline,
  VerifierVerdict,
} from './content.types';

export const CONTENT_RESULT_STORE = Symbol('CONTENT_RESULT_STORE');

export interface ContentResultStore {
  replaceOutline(runId: RunId, outline: PageOutline): Promise<void>;
  replaceDocument(
    runId: RunId,
    document: PageDocument,
    verification: VerifierVerdict,
  ): Promise<void>;
  getOutline(runId: RunId): Promise<PageOutline | null>;
  getDocument(runId: RunId): Promise<{
    document: PageDocument;
    verification: VerifierVerdict | null;
  } | null>;
  savePipelineState(runId: RunId, state: ContentPipelineState): Promise<void>;
  getPipelineState(runId: RunId): Promise<ContentPipelineState>;
}

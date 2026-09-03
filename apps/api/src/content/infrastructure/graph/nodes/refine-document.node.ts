import { pageDocumentOutputSchema } from '../../../application/content.schemas';
import { nextRefineCount } from '../../../domain/refine-policy';
import { loadPrompt, renderPrompt } from '../../prompts/load-prompt';
import type { LlmHopService } from '../../../../shared/llm/llm-hop';
import type { ContentGraphState } from '../state';
import type { PageDocument } from '../../../domain/content.types';
import type { ContentResultStore } from '../../../domain/content-result.port';

export function createRefineDocumentNode(
  hop: LlmHopService,
  store: ContentResultStore,
) {
  const template = loadPrompt('refine-page-document.prompt.md');
  return async (
    state: ContentGraphState,
  ): Promise<Partial<ContentGraphState>> => {
    const { data } = await hop.chatJson({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'RefineDocument',
      schema: pageDocumentOutputSchema,
      userContent: renderPrompt(template, {
        language: state.language,
        contentKind: state.contentKind,
        company: JSON.stringify(state.company),
        document: JSON.stringify(state.document),
        contextIssues: JSON.stringify(state.verdict?.contextIssues ?? []),
        languageIssues: JSON.stringify(state.verdict?.languageIssues ?? []),
      }),
    });
    const document: PageDocument = {
      title: data.title,
      lead: data.lead,
      body: data.body,
      ...(data.metaTitle !== undefined ? { metaTitle: data.metaTitle } : {}),
      ...(data.metaDescription !== undefined
        ? { metaDescription: data.metaDescription }
        : {}),
    };
    const copyRefineCount = nextRefineCount(state.copyRefineCount);
    await store.savePipelineState(state.runId, {
      phase: state.phase,
      outlineRefineCount: state.outlineRefineCount,
      copyRefineCount,
    });
    return {
      document,
      copyRefineCount,
    };
  };
}

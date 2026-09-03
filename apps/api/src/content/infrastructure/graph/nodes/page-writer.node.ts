import { pageDocumentOutputSchema } from '../../../application/content.schemas';
import { loadPrompt, renderPrompt } from '../../prompts/load-prompt';
import type { LlmHopService } from '../../../../shared/llm/llm-hop';
import type { ContentGraphState } from '../state';
import type { PageDocument } from '../../../domain/content.types';

const EMPTY_OUTLINE_INSTRUCTION =
  'brak outline — pisz z ContentBrief (topic / angle / goal / targetLength)';

export function createPageWriterNode(hop: LlmHopService) {
  const template = loadPrompt('page-writer.prompt.md');
  return async (
    state: ContentGraphState,
  ): Promise<Partial<ContentGraphState>> => {
    const { data } = await hop.chatJson({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'PageWriterAgent',
      schema: pageDocumentOutputSchema,
      userContent: renderPrompt(template, {
        language: state.language,
        contentKind: state.contentKind,
        company: JSON.stringify(state.company),
        brief: JSON.stringify(state.brief),
        outline:
          state.outline != null
            ? JSON.stringify(state.outline)
            : EMPTY_OUTLINE_INSTRUCTION,
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
    return { document };
  };
}

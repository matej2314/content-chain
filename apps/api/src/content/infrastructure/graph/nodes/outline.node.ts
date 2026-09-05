import { v4 as uuidv4 } from 'uuid';
import { pageOutlineOutputSchema } from '../../../application/content.schemas';
import { loadPrompt, renderPrompt } from '../../prompts/load-prompt';
import type { LlmHopService } from '../../../../shared/llm/llm-hop';
import type { ContentGraphState } from '../state';
import type { PageOutline } from '../../../domain/content.types';

export function createOutlineNode(hop: LlmHopService) {
  const template = loadPrompt('page-outline.prompt.md');
  return async (
    state: ContentGraphState,
  ): Promise<Partial<ContentGraphState>> => {
    const { data } = await hop.chatJson({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'OutlineAgent',
      schema: pageOutlineOutputSchema,
      userContent: renderPrompt(template, {
        language: state.language,
        contentKind: state.contentKind,
        company: JSON.stringify(state.company),
        brief: JSON.stringify(state.brief),
      }),
    });
    const outline: PageOutline = {
      id: `outl_${uuidv4()}`,
      title: data.title,
      sections: data.sections.map((section) => ({
        id: section.id ?? `osec_${uuidv4()}`,
        heading: section.heading,
        summary: section.summary,
        ...(section.role !== undefined ? { role: section.role } : {}),
      })),
    };
    return { outline };
  };
}

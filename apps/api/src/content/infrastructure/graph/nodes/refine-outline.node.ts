import { v4 as uuidv4 } from 'uuid';
import { pageOutlineOutputSchema } from '../../../application/content.schemas';
import { nextRefineCount } from '../../../domain/refine-policy';
import { loadPrompt, renderPrompt } from '../../prompts/load-prompt';
import type { LlmHopService } from '../../../../shared/llm/llm-hop';
import type { ContentGraphState } from '../state';
import type { PageOutline } from '../../../domain/content.types';
import type { ContentResultStore } from '../../../domain/content-result.port';

export function createRefineOutlineNode(
  hop: LlmHopService,
  store: ContentResultStore,
) {
  const template = loadPrompt('refine-page-outline.prompt.md');
  return async (
    state: ContentGraphState,
  ): Promise<Partial<ContentGraphState>> => {
    const { data } = await hop.chatJson({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'RefineOutline',
      schema: pageOutlineOutputSchema,
      userContent: renderPrompt(template, {
        language: state.language,
        contentKind: state.contentKind,
        company: JSON.stringify(state.company),
        outline: JSON.stringify(state.outline),
        contextIssues: JSON.stringify(state.verdict?.contextIssues ?? []),
        languageIssues: JSON.stringify(state.verdict?.languageIssues ?? []),
      }),
    });
    const outline: PageOutline = {
      id: state.outline?.id ?? `outl_${uuidv4()}`,
      title: data.title,
      sections: data.sections.map((section, index) => ({
        id:
          section.id ??
          state.outline?.sections[index]?.id ??
          `osec_${uuidv4()}`,
        heading: section.heading,
        summary: section.summary,
      })),
    };
    const outlineRefineCount = nextRefineCount(state.outlineRefineCount);
    await store.savePipelineState(state.runId, {
      phase: state.phase,
      outlineRefineCount,
      copyRefineCount: state.copyRefineCount,
    });
    return {
      outline,
      outlineRefineCount,
    };
  };
}

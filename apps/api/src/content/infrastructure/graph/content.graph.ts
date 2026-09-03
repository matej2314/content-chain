import { END, START, StateGraph } from '@langchain/langgraph';
import { z } from 'zod';
import { canRefine } from '../../domain/refine-policy';
import { createLoadContextNode } from './nodes/load-context.node';
import { createNormalizeBriefNode } from './nodes/normalize-brief.node';
import { createOutlineNode } from './nodes/outline.node';
import { createPageWriterNode } from './nodes/page-writer.node';
import { createVerifierNode } from './nodes/verifier.node';
import { createRefineOutlineNode } from './nodes/refine-outline.node';
import { createRefineDocumentNode } from './nodes/refine-document.node';
import { createPersistOutlineNode } from './nodes/persist-outline.node';
import { createPersistDocumentNode } from './nodes/persist-document.node';
import { createFailRunNode } from './nodes/fail-run.node';
import type { RunLifecyclePort } from '../../../runs/domain/run-lifecycle.port';
import type { ContentGraphState } from './state';
import type { CompanyContextRepository } from '../../../company-context/domain/company-context.port';
import type { LlmHopService } from '../../../shared/llm/llm-hop';
import type { ContentResultStore } from '../../domain/content-result.port';

const ContentState = z.object({
  runId: z.custom<ContentGraphState['runId']>(),
  conversationId: z.custom<ContentGraphState['conversationId']>(),
  taskType: z.custom<ContentGraphState['taskType']>(),
  contentKind: z.custom<ContentGraphState['contentKind']>(),
  language: z.custom<ContentGraphState['language']>(),
  brief: z.custom<ContentGraphState['brief']>(),
  selectedIdeaIds: z.custom<ContentGraphState['selectedIdeaIds']>(),
  phase: z.custom<ContentGraphState['phase']>(),
  company: z.custom<ContentGraphState['company']>(),
  outline: z.custom<ContentGraphState['outline']>(),
  document: z.custom<ContentGraphState['document']>(),
  verdict: z.custom<ContentGraphState['verdict']>(),
  outlineRefineCount: z.number(),
  copyRefineCount: z.number(),
  failedCode: z.custom<ContentGraphState['failedCode']>(),
  failedMessage: z.custom<ContentGraphState['failedMessage']>(),
});

interface CompileContentGraphOptions {
  context: CompanyContextRepository;
  store: ContentResultStore;
  hop: LlmHopService;
  lifecycle: RunLifecyclePort;
}

export type CompiledContentGraph = {
  invoke(input: ContentGraphState): Promise<ContentGraphState>;
};

function routeAfterNormalizeBrief(
  state: ContentGraphState,
): 'pageWriterAgent' | 'outlineAgent' {
  return state.phase === 'copy' ? 'pageWriterAgent' : 'outlineAgent';
}

function routeAfterConsistencyVerifier(
  state: ContentGraphState,
):
  | 'failRun'
  | 'persistDocument'
  | 'persistOutline'
  | 'refineDocument'
  | 'refineOutline' {
  if (state.failedCode) return 'failRun';
  if (state.verdict?.ok) {
    return state.phase === 'copy' ? 'persistDocument' : 'persistOutline';
  }
  const attempts =
    state.phase === 'copy'
      ? state.copyRefineCount
      : state.outlineRefineCount;
  if (canRefine(attempts)) {
    return state.phase === 'copy' ? 'refineDocument' : 'refineOutline';
  }
  return 'failRun';
}

export function compileContentGraph(
  deps: CompileContentGraphOptions,
): CompiledContentGraph {
  const graph = new StateGraph(ContentState)
    .addNode('loadContext', createLoadContextNode(deps.context))
    .addEdge(START, 'loadContext')
    .addNode('normalizeBrief', createNormalizeBriefNode())
    .addEdge('loadContext', 'normalizeBrief')
    .addNode('outlineAgent', createOutlineNode(deps.hop))
    .addNode('pageWriterAgent', createPageWriterNode(deps.hop))
    .addNode(
      'consistencyVerifier',
      createVerifierNode(
        deps.hop,
        deps.lifecycle.appendLog.bind(deps.lifecycle),
      ),
    )
    .addNode('refineOutline', createRefineOutlineNode(deps.hop, deps.store))
    .addNode('refineDocument', createRefineDocumentNode(deps.hop, deps.store))
    .addNode('persistOutline', createPersistOutlineNode(deps.store))
    .addNode('persistDocument', createPersistDocumentNode(deps.store))
    .addNode('failRun', createFailRunNode(deps.store))
    .addConditionalEdges('normalizeBrief', routeAfterNormalizeBrief)
    .addEdge('outlineAgent', 'consistencyVerifier')
    .addEdge('pageWriterAgent', 'consistencyVerifier')
    .addEdge('refineOutline', 'consistencyVerifier')
    .addEdge('refineDocument', 'consistencyVerifier')
    .addConditionalEdges('consistencyVerifier', routeAfterConsistencyVerifier)
    .addEdge('persistOutline', END)
    .addEdge('persistDocument', END)
    .addEdge('failRun', END);

  return graph.compile();
}

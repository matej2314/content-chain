import { END, START, StateGraph } from '@langchain/langgraph';
import { z } from 'zod';
import { canRefine } from '../../domain/refine-policy';
import { createLoadContextNode } from './nodes/load-context.node';
import { createNormalizeBriefNode } from './nodes/normalize-brief.node';
import { createIdeationNode } from './nodes/ideation.node';
import { createContentWriterNode } from './nodes/content-writer.node';
import { createVerifierNode } from './nodes/verifier.node';
import { createRefineIdeasNode } from './nodes/refine-ideas.node';
import { createRefineContentNode } from './nodes/refine-content.node';
import { createPersistIdeasNode } from './nodes/persist-ideas.node';
import { createPersistContentNode } from './nodes/persist-content.node';
import { createFailRunNode } from './nodes/fail-run.node';
import { RunLifecycleService } from '../../../runs/application/run-lifecycle.service';
import type { SocialGraphState } from './state';
import type { CompanyContextRepository } from '../../../company-context/domain/company-context.port';
import type { LlmHopService } from './llm-hop';
import type { SocialResultStore } from '../../domain/social-result.port';

const SocialState = z.object({
  runId: z.custom<SocialGraphState['runId']>(),
  conversationId: z.custom<SocialGraphState['conversationId']>(),
  taskType: z.custom<SocialGraphState['taskType']>(),
  platform: z.custom<SocialGraphState['platform']>(),
  language: z.custom<SocialGraphState['language']>(),
  brief: z.custom<SocialGraphState['brief']>(),
  selectedIdeaIds: z.custom<SocialGraphState['selectedIdeaIds']>(),
  phase: z.custom<SocialGraphState['phase']>(),
  company: z.custom<SocialGraphState['company']>(),
  ideas: z.custom<SocialGraphState['ideas']>(),
  content: z.custom<SocialGraphState['content']>(),
  verdict: z.custom<SocialGraphState['verdict']>(),
  ideasRefineCount: z.number(),
  contentRefineCount: z.number(),
  failedCode: z.custom<SocialGraphState['failedCode']>(),
  failedMessage: z.custom<SocialGraphState['failedMessage']>(),
});

interface CompileSocialGraphOptions {
  context: CompanyContextRepository;
  store: SocialResultStore;
  hop: LlmHopService;
  lifecycle: RunLifecycleService;
}

export type CompiledSocialGraph = {
  invoke(input: SocialGraphState): Promise<SocialGraphState>;
};

function routeAfterNormalizeBrief(
  state: SocialGraphState,
): 'contentWriterAgent' | 'ideationAgent' {
  return state.phase === 'content' ? 'contentWriterAgent' : 'ideationAgent';
}

function routeAfterConsistencyVerifier(
  state: SocialGraphState,
):
  | 'failRun'
  | 'persistContent'
  | 'persistIdeas'
  | 'refineContent'
  | 'refineIdeas' {
  if (state.failedCode) return 'failRun';
  if (state.verdict?.ok) {
    return state.phase === 'content' ? 'persistContent' : 'persistIdeas';
  }
  const attempts =
    state.phase === 'content'
      ? state.contentRefineCount
      : state.ideasRefineCount;
  if (canRefine(attempts)) {
    return state.phase === 'content' ? 'refineContent' : 'refineIdeas';
  }
  return 'failRun';
}

export function compileSocialGraph(
  deps: CompileSocialGraphOptions,
): CompiledSocialGraph {
  const graph = new StateGraph(SocialState)
    .addNode('loadContext', createLoadContextNode(deps.context))
    .addEdge(START, 'loadContext')
    .addNode('normalizeBrief', createNormalizeBriefNode())
    .addEdge('loadContext', 'normalizeBrief')
    .addNode('ideationAgent', createIdeationNode(deps.hop))
    .addNode('contentWriterAgent', createContentWriterNode(deps.hop))
    .addNode(
      'consistencyVerifier',
      createVerifierNode(
        deps.hop,
        deps.lifecycle.appendLog.bind(deps.lifecycle),
      ),
    )
    .addNode('refineIdeas', createRefineIdeasNode(deps.hop))
    .addNode('refineContent', createRefineContentNode(deps.hop))
    .addNode('persistIdeas', createPersistIdeasNode(deps.store))
    .addNode('persistContent', createPersistContentNode(deps.store))
    .addNode('failRun', createFailRunNode())
    .addConditionalEdges('normalizeBrief', routeAfterNormalizeBrief)
    .addEdge('ideationAgent', 'consistencyVerifier')
    .addEdge('contentWriterAgent', 'consistencyVerifier')
    .addEdge('refineIdeas', 'consistencyVerifier')
    .addEdge('refineContent', 'consistencyVerifier')
    .addConditionalEdges('consistencyVerifier', routeAfterConsistencyVerifier)
    .addEdge('persistIdeas', END)
    .addEdge('persistContent', END)
    .addEdge('failRun', END);

  return graph.compile();
}

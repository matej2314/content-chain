import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import {
  RUN_REPOSITORY,
  RunStartedBy,
  type RunRepository,
} from '../domain/run.port';
import {
  RUN_RESULT_READER,
  type RunResultReader,
} from '../domain/run-result-reader.port';
import { parseWithZod } from '../../shared/parse-with-zod';
import { runIdSchema } from './run.schemas';
import type {
  ContentKind,
  ConversationId,
  ContentLanguage,
  RunId,
  RunPlatform,
  RunStatus,
  RunTaskType,
} from '@content-chain/shared';
import type { ContentBrief, SocialBrief } from '../domain/run.types';
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
} from '../../social/domain/social.types';

export interface GetRunOutput {
  runId: RunId;
  taskType: RunTaskType;
  platform: RunPlatform;
  contentKind: ContentKind | null;
  language: ContentLanguage;
  brief: SocialBrief | ContentBrief;
  status: RunStatus;
  conversationId: ConversationId;
  createdAt: string;
  startedBy: RunStartedBy | null;
  result: {
    ideas: SocialIdea[];
    content: SocialContent | null;
    contents: SocialContentItem[];
    reelIdeas: ReelIdea[];
    reelScript: ReelScript | null;
    reelScripts: ReelScriptItem[];
    pageOutline: PageOutline | null;
    pageDocument: PageDocument | null;
  };
  hitl: {
    options: SocialIdea[] | ReelIdea[] | PageOutline[];
  } | null;
}

function orderItemsBySelectedIds<T extends { sourceIdeaId: string }>(
  items: T[],
  selectedIdeaIds: string[] | null,
): T[] {
  if (selectedIdeaIds == null || selectedIdeaIds.length === 0) {
    return items;
  }
  const bySourceId = new Map<string, T>();
  for (const item of items) {
    bySourceId.set(item.sourceIdeaId, item);
  }
  const ordered: T[] = [];
  for (const id of selectedIdeaIds) {
    const item = bySourceId.get(id);
    if (item !== undefined) {
      ordered.push(item);
    }
  }
  return ordered;
}

@Injectable()
export class GetRunUseCase {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    @Inject(RUN_RESULT_READER) private readonly results: RunResultReader,
  ) {}

  async execute(runId: RunId): Promise<GetRunOutput> {
    const parsedRunId = parseWithZod(runIdSchema, runId);
    const run = await this.runs.getById(parsedRunId);
    if (!run) {
      throw new DomainException('RUN_NOT_FOUND', 'Run not found', 404);
    }

    const [
      ideas,
      reelIdeas,
      stored,
      storedReel,
      outline,
      storedPage,
      listedContents,
      listedReelScripts,
    ] = await Promise.all([
      this.results.listIdeas(run.id),
      this.results.listReelIdeas(run.id),
      this.results.getContent(run.id),
      this.results.getReelScript(run.id),
      this.results.getPageOutline(run.id),
      this.results.getPageDocument(run.id),
      this.results.listContents(run.id),
      this.results.listReelScripts(run.id),
    ]);

    const thenContent = run.taskType === 'post_ideas_then_content';
    const thenScripts = run.taskType === 'reel_ideas_then_scripts';

    const hitlOptions =
      run.taskType === 'reel_ideas_then_scripts'
        ? reelIdeas
        : run.taskType === 'page_outline_then_copy'
          ? outline == null
            ? []
            : [outline]
          : ideas;
    const hitl =
      run.status === 'awaiting_hitl' ? { options: hitlOptions } : null;
    return {
      runId: run.id,
      taskType: run.taskType,
      platform: run.platform,
      contentKind: run.contentKind,
      language: run.language,
      brief: run.brief,
      status: run.status,
      conversationId: run.conversationId,
      createdAt: run.createdAt.toISOString(),
      startedBy: run.startedBy,
      result: {
        ideas,
        content: thenContent ? null : (stored?.content ?? null),
        contents: thenContent
          ? orderItemsBySelectedIds(listedContents, run.selectedIdeaIds)
          : [],
        reelIdeas,
        reelScript: thenScripts ? null : (storedReel?.script ?? null),
        reelScripts: thenScripts
          ? orderItemsBySelectedIds(listedReelScripts, run.selectedIdeaIds)
          : [],
        pageOutline: outline,
        pageDocument: storedPage?.document ?? null,
      },
      hitl,
    };
  }
}

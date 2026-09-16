import { Inject, Injectable } from '@nestjs/common';
import type { RunId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import {
  SOCIAL_RESULT_STORE,
  type SocialResultStore,
} from '../../social/domain/social-result.port';
import type {
  SocialContent,
  SocialContentItem,
  SocialIdea,
  ReelIdea,
  ReelScript,
  ReelScriptItem,
  VerifierVerdict,
} from '../../social/domain/social.types';
import {
  CONTENT_RESULT_STORE,
  type ContentResultStore,
} from '../../content/domain/content-result.port';
import type { PageOutline } from '../../content/domain/content.types';
import { assertRunReviewable } from '../domain/assert-run-reviewable';
import {
  OUTPUT_EDITED_WRITER,
  type OutputEditedWrite,
  type OutputEditedWriter,
} from '../domain/output-edited-writer.port';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import {
  RESULT_KEYS_BY_TASK_TYPE,
  contentsArraySchema,
  editedContentSchema,
  editedPageDocumentSchema,
  editedPageOutlineSchema,
  ideasArraySchema,
  outputEditedBodySchema,
  reelIdeasArraySchema,
  reelScriptsArraySchema,
} from './output-edited-result.schemas';
import { reelScriptOutputSchema as reelScriptShape } from '../../social/application/social.schemas';

const EMPTY_VERDICT: VerifierVerdict = {
  ok: true,
  contextIssues: [],
  languageIssues: [],
};

function validationFailed(message: string): never {
  throw new DomainException('VALIDATION_FAILED', message, 400);
}

function assertSameIds(
  stored: readonly string[],
  incoming: readonly string[],
  label: string,
): void {
  if (stored.length !== incoming.length) {
    validationFailed(`${label} cardinality must not change`);
  }
  const storedSet = new Set(stored);
  const incomingSet = new Set(incoming);
  if (
    storedSet.size !== stored.length ||
    incomingSet.size !== incoming.length
  ) {
    validationFailed(`${label} ids must be unique`);
  }
  for (const id of storedSet) {
    if (!incomingSet.has(id)) {
      validationFailed(`${label} ids must match stored result`);
    }
  }
}

function withCharacterCount(content: {
  body: string;
  hashtags: string[];
  cta?: string;
  sourceIdeaId?: string;
}): SocialContent {
  const next: SocialContent = {
    body: content.body,
    hashtags: content.hashtags,
    characterCount: content.body.length,
  };
  if (content.cta !== undefined) next.cta = content.cta;
  if (content.sourceIdeaId !== undefined) {
    next.sourceIdeaId = content.sourceIdeaId;
  }
  return next;
}

@Injectable()
export class SaveOutputEditedUseCase {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    @Inject(SOCIAL_RESULT_STORE) private readonly social: SocialResultStore,
    @Inject(CONTENT_RESULT_STORE) private readonly content: ContentResultStore,
    @Inject(OUTPUT_EDITED_WRITER) private readonly writer: OutputEditedWriter,
  ) {}

  async execute(
    runId: RunId,
    input: unknown,
    actor: AuthUserContext,
  ): Promise<{ runId: RunId; outputEdited: true }> {
    const body = parseWithZod(outputEditedBodySchema, input);
    const keys = Object.keys(body.result);
    if (keys.length === 0) {
      validationFailed('result must not be empty');
    }

    const run = await this.runs.getById(runId);
    assertRunReviewable(run, actor.id);

    const allowed = RESULT_KEYS_BY_TASK_TYPE[run.taskType];
    for (const key of keys) {
      if (!allowed.has(key)) {
        validationFailed(
          `result key "${key}" is not allowed for this taskType`,
        );
      }
    }

    const writes: OutputEditedWrite[] = [];
    for (const key of keys) {
      writes.push(await this.planKey(run.id, key, body.result[key]));
    }

    const updated = await this.writer.commit(run.id, writes);
    if (!updated) {
      throw new DomainException(
        'REVIEW_LOCKED',
        'Review is already finalized',
        409,
      );
    }

    return { runId: run.id, outputEdited: true };
  }

  private async planKey(
    runId: RunId,
    key: string,
    value: unknown,
  ): Promise<OutputEditedWrite> {
    switch (key) {
      case 'ideas': {
        const incoming = parseWithZod(ideasArraySchema, value);
        const stored = await this.social.listIdeas(runId);
        if (stored.length === 0) {
          validationFailed('no stored ideas to edit');
        }
        assertSameIds(
          stored.map((i) => i.id),
          incoming.map((i) => i.id),
          'ideas',
        );
        const byId = new Map<string, (typeof incoming)[number]>();
        for (const item of incoming) {
          byId.set(item.id, item);
        }
        const ordered: SocialIdea[] = stored.map((s) => {
          const next = byId.get(s.id);
          if (!next) validationFailed('ideas ids must match stored result');
          return {
            id: next.id,
            title: next.title,
            angle: next.angle,
            hook: next.hook,
            ...(next.cta !== undefined ? { cta: next.cta } : {}),
          };
        });
        return { kind: 'ideas', ideas: ordered };
      }
      case 'reelIdeas': {
        const incoming = parseWithZod(reelIdeasArraySchema, value);
        const stored = await this.social.listReelIdeas(runId);
        if (stored.length === 0) {
          validationFailed('no stored reelIdeas to edit');
        }
        assertSameIds(
          stored.map((i) => i.id),
          incoming.map((i) => i.id),
          'reelIdeas',
        );
        const byId = new Map<string, (typeof incoming)[number]>();
        for (const item of incoming) {
          byId.set(item.id, item);
        }
        const ordered: ReelIdea[] = stored.map((s) => {
          const next = byId.get(s.id);
          if (!next) validationFailed('reelIdeas ids must match stored result');
          return {
            id: next.id,
            title: next.title,
            description: next.description,
            hook: next.hook,
            durationSeconds: next.durationSeconds,
            ...(next.cta !== undefined ? { cta: next.cta } : {}),
          };
        });
        return { kind: 'reelIdeas', ideas: ordered };
      }
      case 'content': {
        const parsed = parseWithZod(editedContentSchema, value);
        const stored = await this.social.getContent(runId);
        if (!stored) {
          validationFailed('no stored content to edit');
        }
        return {
          kind: 'content',
          content: withCharacterCount(parsed),
          verification: stored.verification ?? EMPTY_VERDICT,
        };
      }
      case 'contents': {
        const incoming = parseWithZod(contentsArraySchema, value);
        const stored = await this.social.listContents(runId);
        if (stored.length === 0) {
          validationFailed('no stored contents to edit');
        }
        assertSameIds(
          stored.map((i) => i.sourceIdeaId),
          incoming.map((i) => i.sourceIdeaId),
          'contents.sourceIdeaId',
        );
        const bySource = new Map<string, (typeof incoming)[number]>();
        for (const item of incoming) {
          bySource.set(item.sourceIdeaId, item);
        }
        const ordered: SocialContentItem[] = stored.map((row) => {
          const next = bySource.get(row.sourceIdeaId);
          if (!next) {
            validationFailed('contents sourceIdeaId must match stored result');
          }
          return {
            ...withCharacterCount({
              body: next.body,
              hashtags: next.hashtags,
              cta: next.cta,
              sourceIdeaId: next.sourceIdeaId,
            }),
            sourceIdeaId: next.sourceIdeaId,
          };
        });
        return {
          kind: 'contents',
          items: ordered,
          verification: EMPTY_VERDICT,
        };
      }
      case 'reelScript': {
        const parsed = parseWithZod(reelScriptShape, value);
        const stored = await this.social.getReelScript(runId);
        if (!stored) {
          validationFailed('no stored reelScript to edit');
        }
        const next: ReelScript = {
          segments: parsed.segments,
          cta: parsed.cta,
          ...(parsed.notes !== undefined ? { notes: parsed.notes } : {}),
        };
        return {
          kind: 'reelScript',
          script: next,
          verification: stored.verification ?? EMPTY_VERDICT,
        };
      }
      case 'reelScripts': {
        const incoming = parseWithZod(reelScriptsArraySchema, value);
        const stored = await this.social.listReelScripts(runId);
        if (stored.length === 0) {
          validationFailed('no stored reelScripts to edit');
        }
        assertSameIds(
          stored.map((i) => i.sourceIdeaId),
          incoming.map((i) => i.sourceIdeaId),
          'reelScripts.sourceIdeaId',
        );
        const bySource = new Map<string, (typeof incoming)[number]>();
        for (const item of incoming) {
          bySource.set(item.sourceIdeaId, item);
        }
        const ordered: ReelScriptItem[] = stored.map((row) => {
          const next = bySource.get(row.sourceIdeaId);
          if (!next) {
            validationFailed(
              'reelScripts sourceIdeaId must match stored result',
            );
          }
          return {
            segments: next.segments,
            cta: next.cta,
            sourceIdeaId: next.sourceIdeaId,
            ...(next.notes !== undefined ? { notes: next.notes } : {}),
          };
        });
        return {
          kind: 'reelScripts',
          items: ordered,
          verification: EMPTY_VERDICT,
        };
      }
      case 'pageOutline': {
        const parsed = parseWithZod(editedPageOutlineSchema, value);
        const stored = await this.content.getOutline(runId);
        if (!stored) {
          validationFailed('no stored pageOutline to edit');
        }
        if (stored.id !== parsed.id) {
          validationFailed('pageOutline.id must not change');
        }
        assertSameIds(
          stored.sections.map((s) => s.id),
          parsed.sections.map((s) => s.id),
          'pageOutline.sections',
        );
        const byId = new Map<string, (typeof parsed.sections)[number]>();
        for (const section of parsed.sections) {
          byId.set(section.id, section);
        }
        const outline: PageOutline = {
          id: stored.id,
          title: parsed.title,
          sections: stored.sections.map((s) => {
            const next = byId.get(s.id);
            if (!next) {
              validationFailed('pageOutline.sections ids must match');
            }
            return {
              id: next.id,
              heading: next.heading,
              summary: next.summary,
              ...(next.role !== undefined ? { role: next.role } : {}),
            };
          }),
        };
        return { kind: 'pageOutline', outline };
      }
      case 'pageDocument': {
        const parsed = parseWithZod(editedPageDocumentSchema, value);
        const stored = await this.content.getDocument(runId);
        if (!stored) {
          validationFailed('no stored pageDocument to edit');
        }
        return {
          kind: 'pageDocument',
          document: {
            title: parsed.title,
            lead: parsed.lead,
            body: parsed.body,
            ...(parsed.metaTitle !== undefined
              ? { metaTitle: parsed.metaTitle }
              : {}),
            ...(parsed.metaDescription !== undefined
              ? { metaDescription: parsed.metaDescription }
              : {}),
          },
          verification: stored.verification ?? EMPTY_VERDICT,
        };
      }
      default:
        validationFailed(`unsupported result key "${key}"`);
    }
  }
}

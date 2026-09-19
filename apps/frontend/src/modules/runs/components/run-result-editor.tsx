'use client';

import { useState } from 'react';
import { NativeSelect } from '@/shared/ui/native-select';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { FormField } from '@/shared/ui/form-field';
import { PAGE_OUTLINE_ROLE_LABELS } from '@/modules/runs/api/run-labels';
import {
  PAGE_OUTLINE_SECTION_ROLES,
  type PageOutlineSectionRole,
  type ReelDurationSeconds,
  type ReelScript,
  type ReelScriptSegment,
  type RunResult,
  type SocialContent,
} from '@/modules/runs/api/runs-result.types';
import type { RunTaskType } from '@content-chain/shared';

type RunResultEditorProps = {
  readonly taskType: RunTaskType;
  readonly result: RunResult;
  readonly disabled: boolean;
  readonly onChange: (result: RunResult) => void;
  readonly idPrefix: string;
};

const DURATIONS: readonly ReelDurationSeconds[] = [15, 30, 90];

function splitHashtags(value: string): readonly string[] {
  return value
    .split(/\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function ContentFields({
  idPrefix,
  content,
  disabled,
  onChange,
}: {
  readonly idPrefix: string;
  readonly content: SocialContent;
  readonly disabled: boolean;
  readonly onChange: (content: SocialContent) => void;
}) {
  const [hashtagsInput, setHashtagsInput] = useState(() => content.hashtags.join(' '));
  return (
    <div className="flex flex-col gap-2">
      <FormField label="Treść" htmlFor={`${idPrefix}-body`}>
        <Textarea
          id={`${idPrefix}-body`}
          value={content.body}
          disabled={disabled}
          onChange={(event) => onChange({ ...content, body: event.target.value })}
        />
      </FormField>
      <FormField label="Hashtagi (oddzielone spacją)" htmlFor={`${idPrefix}-tags`}>
        <Input
          id={`${idPrefix}-tags`}
          value={hashtagsInput}
          disabled={disabled}
          onChange={(event) => {
            const value = event.target.value;
            setHashtagsInput(value);
            onChange({ ...content, hashtags: splitHashtags(value) });
          }}
        />
      </FormField>
      <FormField label="CTA (opcjonalnie)" htmlFor={`${idPrefix}-cta`}>
        <Input
          id={`${idPrefix}-cta`}
          value={content.cta ?? ''}
          disabled={disabled}
          onChange={(event) =>
            onChange({
              ...content,
              ...(event.target.value.trim() ? { cta: event.target.value } : { cta: undefined }),
            })
          }
        />
      </FormField>
    </div>
  );
}

function patchScriptSegment(
  script: ReelScript,
  index: number,
  patch: Partial<ReelScriptSegment>,
): ReelScript {
  return {
    ...script,
    segments: script.segments.map((row, rowIndex) =>
      rowIndex === index ? { ...row, ...patch } : row,
    ),
  };
}

function ReelScriptFields({
  idPrefix,
  script,
  disabled,
  onChange,
}: {
  readonly idPrefix: string;
  readonly script: ReelScript;
  readonly disabled: boolean;
  readonly onChange: (script: ReelScript) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {script.segments.map((segment, index) => (
        <fieldset key={`${idPrefix}-seg-${index}`} className="flex flex-col gap-2">
          <legend className="text-sm font-medium">Segment {index + 1}</legend>
          <FormField label="Start (s)" htmlFor={`${idPrefix}-seg-${index}-start`}>
            <Input
              id={`${idPrefix}-seg-${index}-start`}
              type="number"
              value={String(segment.startSeconds)}
              disabled={disabled}
              onChange={(event) => {
                const startSeconds = Number(event.target.value);
                if (!Number.isFinite(startSeconds)) return;
                onChange(patchScriptSegment(script, index, { startSeconds }));
              }}
            />
          </FormField>
          <FormField label="Koniec (s)" htmlFor={`${idPrefix}-seg-${index}-end`}>
            <Input
              id={`${idPrefix}-seg-${index}-end`}
              type="number"
              value={String(segment.endSeconds)}
              disabled={disabled}
              onChange={(event) => {
                const endSeconds = Number(event.target.value);
                if (!Number.isFinite(endSeconds)) return;
                onChange(patchScriptSegment(script, index, { endSeconds }));
              }}
            />
          </FormField>
          <FormField label="Na ekranie" htmlFor={`${idPrefix}-seg-${index}-on`}>
            <Textarea
              id={`${idPrefix}-seg-${index}-on`}
              value={segment.onScreen}
              disabled={disabled}
              onChange={(event) =>
                onChange(patchScriptSegment(script, index, { onScreen: event.target.value }))
              }
            />
          </FormField>
          <FormField label="Voiceover" htmlFor={`${idPrefix}-seg-${index}-vo`}>
            <Textarea
              id={`${idPrefix}-seg-${index}-vo`}
              value={segment.voiceover}
              disabled={disabled}
              onChange={(event) =>
                onChange(patchScriptSegment(script, index, { voiceover: event.target.value }))
              }
            />
          </FormField>
        </fieldset>
      ))}
      <FormField label="CTA scenariusza" htmlFor={`${idPrefix}-cta`}>
        <Input
          id={`${idPrefix}-cta`}
          value={script.cta}
          disabled={disabled}
          onChange={(event) => onChange({ ...script, cta: event.target.value })}
        />
      </FormField>
      <FormField label="Notatki (opcjonalnie)" htmlFor={`${idPrefix}-notes`}>
        <Textarea
          id={`${idPrefix}-notes`}
          value={script.notes ?? ''}
          disabled={disabled}
          onChange={(event) =>
            onChange({
              ...script,
              ...(event.target.value.trim() ? { notes: event.target.value } : { notes: undefined }),
            })
          }
        />
      </FormField>
    </div>
  );
}

export function RunResultEditor({
  taskType,
  result,
  disabled,
  onChange,
  idPrefix,
}: RunResultEditorProps) {
  return (
    <div className="flex flex-col gap-6">
      {(taskType === 'post_ideas' || taskType === 'post_ideas_then_content') &&
        result.ideas.map((idea, index) => (
          <fieldset key={idea.id} className="flex flex-col gap-2">
            <legend className="text-sm font-medium">Pomysł {index + 1}</legend>
            <FormField label="Tytuł" htmlFor={`${idPrefix}-idea-${idea.id}-title`}>
              <Input
                id={`${idPrefix}-idea-${idea.id}-title`}
                value={idea.title}
                disabled={disabled}
                onChange={(event) =>
                  onChange({
                    ...result,
                    ideas: result.ideas.map((item) =>
                      item.id === idea.id ? { ...item, title: event.target.value } : item,
                    ),
                  })
                }
              />
            </FormField>
            <FormField label="Hook" htmlFor={`${idPrefix}-idea-${idea.id}-hook`}>
              <Textarea
                id={`${idPrefix}-idea-${idea.id}-hook`}
                value={idea.hook}
                disabled={disabled}
                onChange={(event) =>
                  onChange({
                    ...result,
                    ideas: result.ideas.map((item) =>
                      item.id === idea.id ? { ...item, hook: event.target.value } : item,
                    ),
                  })
                }
              />
            </FormField>
            <FormField label="Kąt" htmlFor={`${idPrefix}-idea-${idea.id}-angle`}>
              <Input
                id={`${idPrefix}-idea-${idea.id}-angle`}
                value={idea.angle}
                disabled={disabled}
                onChange={(event) =>
                  onChange({
                    ...result,
                    ideas: result.ideas.map((item) =>
                      item.id === idea.id ? { ...item, angle: event.target.value } : item,
                    ),
                  })
                }
              />
            </FormField>
            <FormField label="CTA (opcjonalnie)" htmlFor={`${idPrefix}-idea-${idea.id}-cta`}>
              <Input
                id={`${idPrefix}-idea-${idea.id}-cta`}
                value={idea.cta ?? ''}
                disabled={disabled}
                onChange={(event) =>
                  onChange({
                    ...result,
                    ideas: result.ideas.map((item) =>
                      item.id === idea.id
                        ? {
                            ...item,
                            ...(event.target.value.trim()
                              ? { cta: event.target.value }
                              : { cta: undefined }),
                          }
                        : item,
                    ),
                  })
                }
              />
            </FormField>
          </fieldset>
        ))}

      {taskType === 'post_content' && result.content ? (
        <ContentFields
          idPrefix={`${idPrefix}-content`}
          content={result.content}
          disabled={disabled}
          onChange={(content) => onChange({ ...result, content })}
        />
      ) : null}

      {taskType === 'post_ideas_then_content'
        ? result.contents.map((item) => (
            <fieldset key={item.sourceIdeaId} className="flex flex-col gap-2">
              <legend className="text-sm font-medium">Treść ({item.sourceIdeaId})</legend>
              <ContentFields
                idPrefix={`${idPrefix}-contents-${item.sourceIdeaId}`}
                content={item}
                disabled={disabled}
                onChange={(content) =>
                  onChange({
                    ...result,
                    contents: result.contents.map((row) =>
                      row.sourceIdeaId === item.sourceIdeaId
                        ? { ...content, sourceIdeaId: item.sourceIdeaId }
                        : row,
                    ),
                  })
                }
              />
            </fieldset>
          ))
        : null}

      {(taskType === 'reel_ideas' || taskType === 'reel_ideas_then_scripts') &&
        result.reelIdeas.map((idea) => (
          <fieldset key={idea.id} className="flex flex-col gap-2">
            <legend className="text-sm font-medium">Pomysł rolki</legend>
            <FormField label="Tytuł" htmlFor={`${idPrefix}-reel-${idea.id}-title`}>
              <Input
                id={`${idPrefix}-reel-${idea.id}-title`}
                value={idea.title}
                disabled={disabled}
                onChange={(event) =>
                  onChange({
                    ...result,
                    reelIdeas: result.reelIdeas.map((item) =>
                      item.id === idea.id ? { ...item, title: event.target.value } : item,
                    ),
                  })
                }
              />
            </FormField>
            <FormField label="Opis" htmlFor={`${idPrefix}-reel-${idea.id}-desc`}>
              <Textarea
                id={`${idPrefix}-reel-${idea.id}-desc`}
                value={idea.description}
                disabled={disabled}
                onChange={(event) =>
                  onChange({
                    ...result,
                    reelIdeas: result.reelIdeas.map((item) =>
                      item.id === idea.id ? { ...item, description: event.target.value } : item,
                    ),
                  })
                }
              />
            </FormField>
            <FormField label="Hook" htmlFor={`${idPrefix}-reel-${idea.id}-hook`}>
              <Textarea
                id={`${idPrefix}-reel-${idea.id}-hook`}
                value={idea.hook}
                disabled={disabled}
                onChange={(event) =>
                  onChange({
                    ...result,
                    reelIdeas: result.reelIdeas.map((item) =>
                      item.id === idea.id ? { ...item, hook: event.target.value } : item,
                    ),
                  })
                }
              />
            </FormField>
            <FormField label="Czas (s)" htmlFor={`${idPrefix}-reel-${idea.id}-dur`}>
              <NativeSelect
                id={`${idPrefix}-reel-${idea.id}-dur`}
                value={String(idea.durationSeconds)}
                disabled={disabled}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  if (value !== 15 && value !== 30 && value !== 90) return;
                  onChange({
                    ...result,
                    reelIdeas: result.reelIdeas.map((item) =>
                      item.id === idea.id ? { ...item, durationSeconds: value } : item,
                    ),
                  });
                }}
              >
                {DURATIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </NativeSelect>
            </FormField>
            <FormField label="CTA (opcjonalnie)" htmlFor={`${idPrefix}-reel-${idea.id}-cta`}>
              <Input
                id={`${idPrefix}-reel-${idea.id}-cta`}
                value={idea.cta ?? ''}
                disabled={disabled}
                onChange={(event) =>
                  onChange({
                    ...result,
                    reelIdeas: result.reelIdeas.map((item) =>
                      item.id === idea.id
                        ? {
                            ...item,
                            ...(event.target.value.trim()
                              ? { cta: event.target.value }
                              : { cta: undefined }),
                          }
                        : item,
                    ),
                  })
                }
              />
            </FormField>
          </fieldset>
        ))}

      {taskType === 'reel_script' && result.reelScript ? (
        <ReelScriptFields
          idPrefix={`${idPrefix}-script`}
          script={result.reelScript}
          disabled={disabled}
          onChange={(script) => onChange({ ...result, reelScript: script })}
        />
      ) : null}

      {taskType === 'reel_ideas_then_scripts'
        ? result.reelScripts.map((item) => (
            <fieldset key={item.sourceIdeaId} className="flex flex-col gap-3">
              <legend className="text-sm font-medium">Scenariusz</legend>
              <p className="text-xs text-muted-foreground">
                Powiązanie z pomysłem zostaje bez zmian (sourceIdeaId nieedytowalne).
              </p>
              <ReelScriptFields
                idPrefix={`${idPrefix}-rs-${item.sourceIdeaId}`}
                script={item}
                disabled={disabled}
                onChange={(script) =>
                  onChange({
                    ...result,
                    reelScripts: result.reelScripts.map((row) =>
                      row.sourceIdeaId === item.sourceIdeaId
                        ? { ...script, sourceIdeaId: item.sourceIdeaId }
                        : row,
                    ),
                  })
                }
              />
            </fieldset>
          ))
        : null}

      {(taskType === 'page_outline_then_copy' || taskType === 'page_copy') && result.pageOutline
        ? result.pageOutline.sections.map((section) => (
            <fieldset key={section.id} className="flex flex-col gap-2">
              <legend className="text-sm font-medium">Sekcja outline</legend>
              <FormField label="Nagłówek" htmlFor={`${idPrefix}-sec-${section.id}-h`}>
                <Input
                  id={`${idPrefix}-sec-${section.id}-h`}
                  value={section.heading}
                  disabled={disabled}
                  onChange={(event) => {
                    const outline = result.pageOutline;
                    if (!outline) return;
                    onChange({
                      ...result,
                      pageOutline: {
                        ...outline,
                        sections: outline.sections.map((row) =>
                          row.id === section.id ? { ...row, heading: event.target.value } : row,
                        ),
                      },
                    });
                  }}
                />
              </FormField>
              <FormField label="Streszczenie" htmlFor={`${idPrefix}-sec-${section.id}-s`}>
                <Textarea
                  id={`${idPrefix}-sec-${section.id}-s`}
                  value={section.summary}
                  disabled={disabled}
                  onChange={(event) => {
                    const outline = result.pageOutline;
                    if (!outline) return;
                    onChange({
                      ...result,
                      pageOutline: {
                        ...outline,
                        sections: outline.sections.map((row) =>
                          row.id === section.id ? { ...row, summary: event.target.value } : row,
                        ),
                      },
                    });
                  }}
                />
              </FormField>
              <FormField label="Rola (opcjonalnie)" htmlFor={`${idPrefix}-sec-${section.id}-r`}>
                <NativeSelect
                  id={`${idPrefix}-sec-${section.id}-r`}
                  value={section.role ?? ''}
                  disabled={disabled}
                  onChange={(event) => {
                    const outline = result.pageOutline;
                    if (!outline) return;
                    const raw = event.target.value;
                    const role: PageOutlineSectionRole | undefined =
                      raw === ''
                        ? undefined
                        : PAGE_OUTLINE_SECTION_ROLES.find((item) => item === raw);
                    if (raw !== '' && role === undefined) return;
                    onChange({
                      ...result,
                      pageOutline: {
                        ...outline,
                        sections: outline.sections.map((row) =>
                          row.id === section.id ? { ...row, role } : row,
                        ),
                      },
                    });
                  }}
                >
                  <option value="">Bez roli</option>
                  {PAGE_OUTLINE_SECTION_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {PAGE_OUTLINE_ROLE_LABELS[role]}
                    </option>
                  ))}
                </NativeSelect>
              </FormField>
            </fieldset>
          ))
        : null}

      {(taskType === 'page_outline_then_copy' || taskType === 'page_copy') && result.pageOutline ? (
        <FormField label="Tytuł outline" htmlFor={`${idPrefix}-outline-title`}>
          <Input
            id={`${idPrefix}-outline-title`}
            value={result.pageOutline.title}
            disabled={disabled}
            onChange={(event) => {
              const outline = result.pageOutline;
              if (!outline) return;
              onChange({ ...result, pageOutline: { ...outline, title: event.target.value } });
            }}
          />
        </FormField>
      ) : null}

      {(taskType === 'page_outline_then_copy' || taskType === 'page_copy') &&
      result.pageDocument ? (
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium">Dokument strony</legend>
          <FormField label="Tytuł" htmlFor={`${idPrefix}-doc-title`}>
            <Input
              id={`${idPrefix}-doc-title`}
              value={result.pageDocument.title}
              disabled={disabled}
              onChange={(event) => {
                const document = result.pageDocument;
                if (!document) return;
                onChange({ ...result, pageDocument: { ...document, title: event.target.value } });
              }}
            />
          </FormField>
          <FormField label="Lead" htmlFor={`${idPrefix}-doc-lead`}>
            <Textarea
              id={`${idPrefix}-doc-lead`}
              value={result.pageDocument.lead}
              disabled={disabled}
              onChange={(event) => {
                const document = result.pageDocument;
                if (!document) return;
                onChange({ ...result, pageDocument: { ...document, lead: event.target.value } });
              }}
            />
          </FormField>
          <FormField label="Treść" htmlFor={`${idPrefix}-doc-body`}>
            <Textarea
              id={`${idPrefix}-doc-body`}
              value={result.pageDocument.body}
              disabled={disabled}
              onChange={(event) => {
                const document = result.pageDocument;
                if (!document) return;
                onChange({ ...result, pageDocument: { ...document, body: event.target.value } });
              }}
            />
          </FormField>
          <FormField label="Meta title (opcjonalnie)" htmlFor={`${idPrefix}-doc-meta-title`}>
            <Input
              id={`${idPrefix}-doc-meta-title`}
              value={result.pageDocument.metaTitle ?? ''}
              disabled={disabled}
              onChange={(event) => {
                const document = result.pageDocument;
                if (!document) return;
                onChange({
                  ...result,
                  pageDocument: {
                    ...document,
                    ...(event.target.value.trim()
                      ? { metaTitle: event.target.value }
                      : { metaTitle: undefined }),
                  },
                });
              }}
            />
          </FormField>
          <FormField label="Meta description (opcjonalnie)" htmlFor={`${idPrefix}-doc-meta-desc`}>
            <Textarea
              id={`${idPrefix}-doc-meta-desc`}
              value={result.pageDocument.metaDescription ?? ''}
              disabled={disabled}
              onChange={(event) => {
                const document = result.pageDocument;
                if (!document) return;
                onChange({
                  ...result,
                  pageDocument: {
                    ...document,
                    ...(event.target.value.trim()
                      ? { metaDescription: event.target.value }
                      : { metaDescription: undefined }),
                  },
                });
              }}
            />
          </FormField>
        </fieldset>
      ) : null}
    </div>
  );
}

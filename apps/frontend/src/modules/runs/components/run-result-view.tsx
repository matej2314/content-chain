import { PAGE_OUTLINE_ROLE_LABELS } from '@/modules/runs/api/run-labels';
import {
  runResultHasArtifacts,
  type PageDocument,
  type PageOutline,
  type ReelIdea,
  type ReelScript,
  type SocialContent,
  type SocialIdea,
} from '@/modules/runs/api/runs-result.types';
import { PageDocumentBody } from '@/modules/runs/components/page-document-body';
import type { ReactNode } from 'react';
import type { RunSnapshot } from '@/modules/runs/api/runs.types';

type RunResultViewProps = {
  readonly snapshot: RunSnapshot;
};

function ideaTitle(ideas: readonly SocialIdea[] | readonly ReelIdea[], id: string): string {
  const match = ideas.find((item) => item.id === id);
  return match === undefined ? id : match.title;
}

function CollapsibleBlock({
  label,
  children,
}: {
  readonly label: string;
  readonly children: ReactNode;
}) {
  return (
    <details className="group flex flex-col gap-2">
      <summary className="cursor-pointer list-none text-sm text-muted-foreground marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="underline-offset-4 hover:underline group-open:no-underline">{label}</span>
        <span className="ml-1 group-open:hidden">(pokaż)</span>
        <span className="ml-1 hidden group-open:inline">(ukryj)</span>
      </summary>
      {children}
    </details>
  );
}

function SelectionBadge({ selection }: { readonly selection: 'selected' | 'unselected' }) {
  if (selection === 'selected') {
    return (
      <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-xs text-primary">
        Wybrany
      </span>
    );
  }
  return (
    <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
      Niewybrany
    </span>
  );
}

function IdeaBlock({
  idea,
  selection,
}: {
  readonly idea: SocialIdea;
  readonly selection?: 'selected' | 'unselected';
}) {
  return (
    <article className="flex flex-col gap-1 py-2">
      <div className="flex flex-wrap items-baseline gap-2">
        <h3 className="text-sm font-medium">{idea.title}</h3>
        {selection !== undefined ? <SelectionBadge selection={selection} /> : null}
      </div>
      <p className="text-sm">{idea.hook}</p>
      <p className="text-xs text-muted-foreground">{idea.angle}</p>
      {idea.cta ? <p className="text-xs">CTA: {idea.cta}</p> : null}
    </article>
  );
}

function ReelIdeaBlock({
  idea,
  selection,
}: {
  readonly idea: ReelIdea;
  readonly selection?: 'selected' | 'unselected';
}) {
  return (
    <article className="flex flex-col gap-1 py-2">
      <div className="flex flex-wrap items-baseline gap-2">
        <h3 className="text-sm font-medium">{idea.title}</h3>
        {selection !== undefined ? <SelectionBadge selection={selection} /> : null}
      </div>
      <p className="text-sm">{idea.hook}</p>
      <p className="text-xs text-muted-foreground">{idea.description}</p>
      <p className="font-mono text-xs tabular-nums">{idea.durationSeconds} s</p>
      {idea.cta ? <p className="text-xs">CTA: {idea.cta}</p> : null}
    </article>
  );
}

function ContentBlock({ content }: { readonly content: SocialContent }) {
  return (
    <article className="flex max-w-[65ch] flex-col gap-1 py-2">
      <p className="whitespace-pre-wrap text-sm">{content.body}</p>
      {content.hashtags.length > 0 ? (
        <p className="text-xs text-muted-foreground">{content.hashtags.join(' ')}</p>
      ) : null}
      {content.cta ? <p className="text-xs">CTA: {content.cta}</p> : null}
      <p className="font-mono text-xs tabular-nums text-muted-foreground">
        {content.characterCount} znaków
      </p>
    </article>
  );
}

function ScriptBlock({ script }: { readonly script: ReelScript }) {
  return (
    <article className="flex flex-col gap-2 py-2">
      <ol className="divide-y divide-border text-sm">
        {script.segments.map((segment) => (
          <li
            key={`${segment.startSeconds}-${segment.endSeconds}-${segment.onScreen}`}
            className="flex flex-col gap-0.5 py-2"
          >
            <p className="font-mono text-xs tabular-nums text-muted-foreground">
              {segment.startSeconds} - {segment.endSeconds} s
            </p>
            <p>{segment.onScreen}</p>
            <p className="text-muted-foreground">{segment.voiceover}</p>
          </li>
        ))}
      </ol>
      <p className="text-xs">CTA: {script.cta}</p>
      {script.notes ? <p className="text-xs text-muted-foreground">{script.notes}</p> : null}
    </article>
  );
}

function OutlineBlock({ outline }: { readonly outline: PageOutline }) {
  return (
    <article className="flex flex-col gap-2 py-2">
      <h3 className="text-sm font-medium">{outline.title}</h3>
      <ol className="divide-y divide-border">
        {outline.sections.map((section) => (
          <li key={section.id} className="flex flex-col gap-0.5 py-2 text-sm">
            <span className="font-medium">{section.heading}</span>
            <span className="text-muted-foreground">{section.summary}</span>
            {section.role ? (
              <span className="text-xs text-muted-foreground">
                Rola: {PAGE_OUTLINE_ROLE_LABELS[section.role]}
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </article>
  );
}

function DocumentBlock({ document }: { readonly document: PageDocument }) {
  const hasMeta =
    (document.metaTitle !== undefined && document.metaTitle.length > 0) ||
    (document.metaDescription !== undefined && document.metaDescription.length > 0);

  return (
    <article className="flex max-w-[65ch] flex-col gap-3 py-2 text-sm">
      <h3 className="text-base font-medium">{document.title}</h3>
      <p className="leading-relaxed text-muted-foreground">{document.lead}</p>
      <PageDocumentBody body={document.body} />
      {hasMeta ? (
        <div className="flex flex-col gap-1 border-t border-border pt-3">
          <p className="text-xs font-medium">Meta SEO</p>
          {document.metaTitle ? (
            <p className="text-xs">
              <span className="text-muted-foreground">Tytuł: </span>
              {document.metaTitle}
            </p>
          ) : null}
          {document.metaDescription ? (
            <p className="text-xs">
              <span className="text-muted-foreground">Opis: </span>
              {document.metaDescription}
            </p>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

function EmptyResult({ failed }: { readonly failed: boolean }) {
  return (
    <p className="text-sm text-muted-foreground">
      {failed ? 'Run nie zapisał artefaktów.' : 'Brak zapisanego wyniku.'}
    </p>
  );
}

export function RunResultView({ snapshot }: RunResultViewProps) {
  if (snapshot.status !== 'completed' && snapshot.status !== 'failed') {
    return null;
  }

  const { result, taskType } = snapshot;
  const failed = snapshot.status === 'failed';
  const selectedIdeaIds = new Set(result.contents.map((item) => item.sourceIdeaId));
  const selectedReelIdeaIds = new Set(result.reelScripts.map((item) => item.sourceIdeaId));

  return (
    <div className="flex flex-col gap-6">
      {!runResultHasArtifacts(result) ? <EmptyResult failed={failed} /> : null}

      {taskType === 'post_ideas' && result.ideas.length > 0 ? (
        <div className="divide-y divide-border">
          {result.ideas.map((idea) => (
            <IdeaBlock key={idea.id} idea={idea} />
          ))}
        </div>
      ) : null}

      {taskType === 'post_content' && result.content ? (
        <ContentBlock content={result.content} />
      ) : null}

      {taskType === 'post_ideas_then_content' ? (
        <>
          {result.contents.length > 0 ? (
            <div className="divide-y divide-border">
              {result.contents.map((item) => (
                <div key={item.sourceIdeaId} className="flex flex-col gap-1 py-2">
                  <p className="text-xs text-muted-foreground">
                    Pomysł: {ideaTitle(result.ideas, item.sourceIdeaId)}
                  </p>
                  <ContentBlock content={item} />
                </div>
              ))}
            </div>
          ) : null}
          {result.ideas.length > 0 ? (
            result.contents.length > 0 ? (
              <CollapsibleBlock label="Pomysły">
                <div className="divide-y divide-border">
                  {result.ideas.map((idea) => (
                    <IdeaBlock
                      key={idea.id}
                      idea={idea}
                      selection={selectedIdeaIds.has(idea.id) ? 'selected' : 'unselected'}
                    />
                  ))}
                </div>
              </CollapsibleBlock>
            ) : (
              <div className="divide-y divide-border">
                {result.ideas.map((idea) => (
                  <IdeaBlock key={idea.id} idea={idea} />
                ))}
              </div>
            )
          ) : null}
        </>
      ) : null}

      {taskType === 'reel_ideas' && result.reelIdeas.length > 0 ? (
        <div className="divide-y divide-border">
          {result.reelIdeas.map((idea) => (
            <ReelIdeaBlock key={idea.id} idea={idea} />
          ))}
        </div>
      ) : null}

      {taskType === 'reel_script' && result.reelScript ? (
        <ScriptBlock script={result.reelScript} />
      ) : null}

      {taskType === 'reel_ideas_then_scripts' ? (
        <>
          {result.reelScripts.length > 0 ? (
            <div className="divide-y divide-border">
              {result.reelScripts.map((item) => (
                <div key={item.sourceIdeaId} className="flex flex-col gap-1 py-2">
                  <p className="text-xs text-muted-foreground">
                    Pomysł: {ideaTitle(result.reelIdeas, item.sourceIdeaId)}
                  </p>
                  <ScriptBlock script={item} />
                </div>
              ))}
            </div>
          ) : null}
          {result.reelIdeas.length > 0 ? (
            result.reelScripts.length > 0 ? (
              <CollapsibleBlock label="Pomysły">
                <div className="divide-y divide-border">
                  {result.reelIdeas.map((idea) => (
                    <ReelIdeaBlock
                      key={idea.id}
                      idea={idea}
                      selection={selectedReelIdeaIds.has(idea.id) ? 'selected' : 'unselected'}
                    />
                  ))}
                </div>
              </CollapsibleBlock>
            ) : (
              <div className="divide-y divide-border">
                {result.reelIdeas.map((idea) => (
                  <ReelIdeaBlock key={idea.id} idea={idea} />
                ))}
              </div>
            )
          ) : null}
        </>
      ) : null}

      {taskType === 'page_copy' && result.pageDocument ? (
        <DocumentBlock document={result.pageDocument} />
      ) : null}

      {taskType === 'page_outline_then_copy' ? (
        <>
          {result.pageDocument ? <DocumentBlock document={result.pageDocument} /> : null}
          {result.pageOutline ? (
            result.pageDocument !== null ? (
              <CollapsibleBlock label="Outline">
                <OutlineBlock outline={result.pageOutline} />
              </CollapsibleBlock>
            ) : (
              <OutlineBlock outline={result.pageOutline} />
            )
          ) : null}
        </>
      ) : null}
    </div>
  );
}

import { PAGE_OUTLINE_ROLE_LABELS } from '@/modules/runs/api/run-labels';
import type { RunSnapshot } from '@/modules/runs/api/runs.types';
import {
  runResultHasArtifacts,
  type PageDocument,
  type PageOutline,
  type ReelIdea,
  type ReelScript,
  type SocialContent,
  type SocialIdea,
} from '@/modules/runs/api/runs-result.types';

type RunResultViewProps = {
  readonly snapshot: RunSnapshot;
};

function ideaTitle(ideas: readonly SocialIdea[] | readonly ReelIdea[], id: string): string {
  const match = ideas.find((item) => item.id === id);
  return match === undefined ? id : match.title;
}

function IdeaBlock({ idea }: { readonly idea: SocialIdea }) {
  return (
    <article className="flex flex-col gap-1 py-2">
      <h3 className="text-sm font-medium">{idea.title}</h3>
      <p className="text-sm">{idea.hook}</p>
      <p className="text-xs text-muted-foreground">{idea.angle}</p>
      {idea.cta ? <p className="text-xs">CTA: {idea.cta}</p> : null}
    </article>
  );
}

function ReelIdeaBlock({ idea }: { readonly idea: ReelIdea }) {
  return (
    <article className="flex flex-col gap-1 py-2">
      <h3 className="text-sm font-medium">{idea.title}</h3>
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
  return (
    <article className="flex max-w-[65ch] flex-col gap-2 py-2 text-sm">
      <h3 className="font-medium">{document.title}</h3>
      <p>{document.lead}</p>
      <p className="whitespace-pre-wrap">{document.body}</p>
      {document.metaTitle ? (
        <p className="text-xs text-muted-foreground">Meta title: {document.metaTitle}</p>
      ) : null}
      {document.metaDescription ? (
        <p className="text-xs text-muted-foreground">Meta: {document.metaDescription}</p>
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

  return (
    <section data-slot="run-result" className="flex flex-col gap-3">
      <h2 className="text-sm font-medium">Wynik</h2>
      {!runResultHasArtifacts(result) ? <EmptyResult failed={failed} /> : null}

      {taskType === 'post_ideas' || taskType === 'post_ideas_then_content' ? (
        result.ideas.length > 0 ? (
          <div className="divide-y divide-border">
            {result.ideas.map((idea) => (
              <IdeaBlock key={idea.id} idea={idea} />
            ))}
          </div>
        ) : null
      ) : null}

      {taskType === 'post_content' && result.content ? (
        <ContentBlock content={result.content} />
      ) : null}

      {taskType === 'post_ideas_then_content' ? (
        result.contents.length > 0 ? (
          <div className="divide-y divide-border">
            {result.contents.map((item) => (
              <div key={item.sourceIdeaId} className="flex flex-col gap-1 py-2">
                <h2 className="text-sm font-medium">
                  Pomysł: {ideaTitle(result.ideas, item.sourceIdeaId)}
                </h2>
                <ContentBlock content={item} />
              </div>
            ))}
          </div>
        ) : null
      ) : null}

      {taskType === 'reel_ideas' || taskType === 'reel_ideas_then_scripts' ? (
        result.reelIdeas.length > 0 ? (
          <div className="divide-y divide-border">
            {result.reelIdeas.map((idea) => (
              <ReelIdeaBlock key={idea.id} idea={idea} />
            ))}
          </div>
        ) : null
      ) : null}

      {taskType === 'reel_script' && result.reelScript ? (
        <ScriptBlock script={result.reelScript} />
      ) : null}

      {taskType === 'reel_ideas_then_scripts' ? (
        result.reelScripts.length > 0 ? (
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
        ) : null
      ) : null}

      {(taskType === 'page_outline_then_copy' || taskType === 'page_copy') && result.pageOutline ? (
        <OutlineBlock outline={result.pageOutline} />
      ) : null}

      {(taskType === 'page_outline_then_copy' || taskType === 'page_copy') &&
        result.pageDocument ? (
        <DocumentBlock document={result.pageDocument} />
      ) : null}
    </section>
  );
}

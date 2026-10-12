'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/shared/ui/button';
import { EnvelopeError } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { submitHitl } from '@/modules/runs/api/runs.api';
import type { RunSnapshot } from '@/modules/runs/api/runs.types';
import type { PageOutline, ReelIdea, SocialIdea } from '@/modules/runs/api/runs-result.types';

type HitlPanelProps = {
  readonly snapshot: RunSnapshot;
  readonly onSubmitted: () => Promise<void>;
  readonly onStaleStatus: () => Promise<void>;
};

type HitlPanelState = {
  readonly selected: readonly string[];
  readonly pending: boolean;
  readonly envelope: { code: string; message: string } | null;
};

const INITIAL_STATE: HitlPanelState = {
  selected: [],
  pending: false,
  envelope: null,
};

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

function toggleId(current: readonly string[], id: string): readonly string[] {
  if (current.includes(id)) return current.filter((item) => item !== id);
  return [...current, id];
}

function SocialOption({
  idea,
  checked,
  onToggle,
}: {
  readonly idea: SocialIdea | ReelIdea;
  readonly checked: boolean;
  readonly onToggle: (id: string) => void;
}) {
  const hint = 'description' in idea ? idea.description : idea.angle;
  return (
    <li className="flex items-start gap-2 py-2">
      <input
        id={`hitl-${idea.id}`}
        name="selectedIdeaIds"
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(idea.id)}
        className="mt-1 size-4 shrink-0 rounded-sm border border-input accent-primary"
      />
      <label htmlFor={`hitl-${idea.id}`} className="flex min-w-0 flex-col gap-0.5 text-sm">
        <span className="font-medium">{idea.title}</span>
        <span className="text-muted-foreground">{idea.hook}</span>
        <span className="text-xs text-muted-foreground">{hint}</span>
        {idea.cta ? <span className="text-xs">CTA: {idea.cta}</span> : null}
      </label>
    </li>
  );
}

function OutlinePreview({ outline }: { readonly outline: PageOutline }) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <p className="font-medium">{outline.title}</p>
      <ol className="divide-y divide-border">
        {outline.sections.map((section) => (
          <li key={section.id} className="flex flex-col gap-0.5 py-2">
            <span className="font-medium">{section.heading}</span>
            <span className="text-muted-foreground">{section.summary}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function HitlPanel({ snapshot, onSubmitted, onStaleStatus }: HitlPanelProps) {
  const [hitlState, setHitlState] = useState<HitlPanelState>(INITIAL_STATE);

  if (snapshot.status !== 'awaiting_hitl' || snapshot.hitl === null) {
    return null;
  }

  async function send(ids: readonly string[]): Promise<void> {
    setHitlState((current) => ({ ...current, pending: true, envelope: null }));
    try {
      await submitHitl(snapshot.runId, ids);
      await onSubmitted();
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        const { envelope } = reason;
        setHitlState((current) => ({ ...current, envelope }));
        if (reason.status === 409) {
          await onStaleStatus();
        }
      } else {
        setHitlState((current) => ({ ...current, envelope: FALLBACK }));
      }
    } finally {
      setHitlState((current) => ({ ...current, pending: false }));
    }
  }

  if (snapshot.hitl.kind === 'page_outline') {
    const outline = snapshot.hitl.options[0];
    if (outline === undefined) {
      return (
        <section data-slot="run-hitl" className="flex flex-col gap-2">
          <h2 className="text-sm font-medium">Wybór w pipeline</h2>
          <p className="text-sm text-muted-foreground">Brak outline do akceptacji.</p>
        </section>
      );
    }
    return (
      <section data-slot="run-hitl" className="flex flex-col gap-3">
        <h2 className="text-sm font-medium">Akceptacja outline</h2>
        <OutlinePreview outline={outline} />
        {hitlState.envelope ? (
          <EnvelopeError code={hitlState.envelope.code} message={hitlState.envelope.message} />
        ) : null}
        <form
          className="flex flex-col gap-2"
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            void send([outline.id]);
          }}
        >
          <Button type="submit" disabled={hitlState.pending}>
            Akceptuj outline
          </Button>
        </form>
      </section>
    );
  }

  const options = snapshot.hitl.options;
  const canSubmit = hitlState.selected.length >= 1;

  return (
    <section data-slot="run-hitl" className="flex flex-col gap-3">
      <h2 className="text-sm font-medium">Wybór w pipeline</h2>
      <p className="text-xs text-muted-foreground">
        Zaznacz co najmniej jeden pomysł. Każdy wybór to osobny artefakt.
      </p>
      <form
        className="flex flex-col gap-3"
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (!canSubmit) return;
          void send(hitlState.selected);
        }}
      >
        <fieldset className="min-w-0">
          <legend className="sr-only">Pomysły do kontynuacji</legend>
          {options.length === 0 ? (
            <p className="text-sm text-muted-foreground">Brak opcji do wyboru.</p>
          ) : (
            <ul className="divide-y divide-border">
              {options.map((idea) => (
                <SocialOption
                  key={idea.id}
                  idea={idea}
                  checked={hitlState.selected.includes(idea.id)}
                  onToggle={(id) =>
                    setHitlState((current) => ({
                      ...current,
                      selected: toggleId(current.selected, id),
                    }))
                  }
                />
              ))}
            </ul>
          )}
        </fieldset>
        {!canSubmit ? (
          <p className="text-xs text-muted-foreground">Wybierz co najmniej jeden pomysł.</p>
        ) : null}
        {hitlState.envelope ? (
          <EnvelopeError code={hitlState.envelope.code} message={hitlState.envelope.message} />
        ) : null}
        <Button type="submit" disabled={hitlState.pending || !canSubmit}>
          Kontynuuj
        </Button>
      </form>
    </section>
  );
}

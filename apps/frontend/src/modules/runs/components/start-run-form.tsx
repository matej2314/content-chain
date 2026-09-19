'use client';

import { useMemo, useState, type FormEvent } from 'react';
import {
  CONTENT_KINDS,
  CONTENT_LANGUAGES,
  RUN_TASK_TYPES,
  SOCIAL_PLATFORMS,
  isContentKind,
  isContentLanguage,
  isContentTaskType,
  isRunTaskType,
  isSocialPlatform,
  type ContentKind,
  type ContentLanguage,
  type RunTaskType,
  type SocialPlatform,
} from '@content-chain/shared';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { NativeSelect } from '@/shared/ui/native-select';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { useCompleteness } from '@/modules/company-context/components/completeness-provider';
import { useOwnRuns } from '@/modules/runs/components/own-runs-provider';
import { startRun } from '@/modules/runs/api/runs.api';
import { notifyProduct } from '@/modules/notifications/notify-product';
import {
  CONTENT_KIND_LABELS,
  LANGUAGE_LABELS,
  RUN_PLATFORM_LABELS,
  RUN_TASK_TYPE_LABELS,
} from '@/modules/runs/api/run-labels';
import type { RunSnapshot, StartRunInput } from '@/modules/runs/api/runs.types';

export type StartRunDraft = {
  readonly taskType: RunTaskType;
  readonly platform: SocialPlatform;
  readonly contentKind: ContentKind;
  readonly language: ContentLanguage;
  readonly topic: string;
  readonly audience: string;
  readonly goal: string;
  readonly ideaCount: string;
  readonly angle: string;
  readonly targetLength: string;
};

export const EMPTY_START_DRAFT: StartRunDraft = {
  taskType: 'post_ideas',
  platform: 'linkedin',
  contentKind: 'blog',
  language: 'pl',
  topic: '',
  audience: '',
  goal: '',
  ideaCount: '',
  angle: '',
  targetLength: '',
};

export function draftFromSnapshot(snapshot: RunSnapshot): StartRunDraft {
  const brief = snapshot.brief;
  return {
    taskType: snapshot.taskType,
    platform: snapshot.platform === 'web' ? 'linkedin' : snapshot.platform,
    contentKind: snapshot.contentKind ?? 'blog',
    language: snapshot.language,
    topic: brief.topic,
    audience: brief.audience ?? '',
    goal: brief.goal ?? '',
    ideaCount: 'ideaCount' in brief && brief.ideaCount !== undefined ? String(brief.ideaCount) : '',
    angle: 'angle' in brief ? (brief.angle ?? '') : '',
    targetLength:
      'targetLength' in brief && brief.targetLength !== undefined ? String(brief.targetLength) : '',
  };
}

function toInput(draft: StartRunDraft): StartRunInput | null {
  if (draft.topic.trim().length === 0) return null;
  if (isContentTaskType(draft.taskType)) {
    const targetLength = draft.targetLength.trim();
    const parsedLength = targetLength.length === 0 ? undefined : Number(targetLength);
    if (parsedLength !== undefined && (!Number.isInteger(parsedLength) || parsedLength < 1)) {
      return null;
    }
    return {
      taskType: draft.taskType,
      contentKind: draft.contentKind,
      language: draft.language,
      brief: {
        topic: draft.topic,
        ...(draft.audience.trim() ? { audience: draft.audience } : {}),
        ...(draft.goal.trim() ? { goal: draft.goal } : {}),
        ...(draft.angle.trim() ? { angle: draft.angle } : {}),
        ...(parsedLength !== undefined ? { targetLength: parsedLength } : {}),
      },
    };
  }
  const ideaCount = draft.ideaCount.trim();
  const parsedCount = ideaCount.length === 0 ? undefined : Number(ideaCount);
  if (parsedCount !== undefined && (!Number.isInteger(parsedCount) || parsedCount < 1)) {
    return null;
  }
  return {
    taskType: draft.taskType,
    platform: draft.platform,
    language: draft.language,
    brief: {
      topic: draft.topic,
      ...(draft.audience.trim() ? { audience: draft.audience } : {}),
      ...(draft.goal.trim() ? { goal: draft.goal } : {}),
      ...(parsedCount !== undefined ? { ideaCount: parsedCount } : {}),
    },
  };
}

type StartRunFormProps = {
  readonly draft: StartRunDraft;
  readonly onDraftChange: (next: StartRunDraft) => void;
};

export function StartRunForm({ draft, onDraftChange }: StartRunFormProps) {
  const { state: completeness } = useCompleteness();
  const { refresh } = useOwnRuns();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);

  const agentsActive = completeness.status === 'ready' && completeness.completeness.complete;
  const pageTask = isContentTaskType(draft.taskType);

  const disableReason = useMemo(() => {
    if (completeness.status === 'loading') return 'Sprawdzanie kompletności kontekstu…';
    if (completeness.status === 'error') return 'Nie można potwierdzić bramki kontekstu.';
    if (!agentsActive) return 'Agenci nieaktywni. Uzupełnij kontekst firmy.';
    return null;
  }, [agentsActive, completeness]);

  const inputReady = useMemo(() => toInput(draft) !== null, [draft]);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const input = toInput(draft);
    if (!input || !agentsActive) return;
    setPending(true);
    setError(null);
    try {
      await startRun(input);
      await refresh();
      notifyProduct({ kind: 'success', title: 'Run wystartował' });
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setError({ code: reason.envelope.code, message: reason.envelope.message });
      } else {
        setError({ code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' });
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="flex max-w-xl flex-col gap-4" onSubmit={(event) => void onSubmit(event)}>
      <h2 className="text-base font-medium">Start runu</h2>
      <FormField label="Typ zadania" htmlFor="start-task-type">
        <NativeSelect
          id="start-task-type"
          value={draft.taskType}
          onChange={(event) => {
            if (!isRunTaskType(event.target.value)) return;
            onDraftChange({ ...draft, taskType: event.target.value });
          }}
        >
          {RUN_TASK_TYPES.map((taskType) => (
            <option key={taskType} value={taskType}>
              {RUN_TASK_TYPE_LABELS[taskType]}
            </option>
          ))}
        </NativeSelect>
      </FormField>
      {pageTask ? (
        <FormField label="Rodzaj strony" htmlFor="start-content-kind">
          <NativeSelect
            id="start-content-kind"
            value={draft.contentKind}
            onChange={(event) => {
              if (!isContentKind(event.target.value)) return;
              onDraftChange({ ...draft, contentKind: event.target.value });
            }}
          >
            {CONTENT_KINDS.map((kind) => (
              <option key={kind} value={kind}>
                {CONTENT_KIND_LABELS[kind]}
              </option>
            ))}
          </NativeSelect>
        </FormField>
      ) : (
        <FormField label="Platforma" htmlFor="start-platform">
          <NativeSelect
            id="start-platform"
            value={draft.platform}
            onChange={(event) => {
              if (!isSocialPlatform(event.target.value)) return;
              onDraftChange({ ...draft, platform: event.target.value });
            }}
          >
            {SOCIAL_PLATFORMS.map((platform) => (
              <option key={platform} value={platform}>
                {RUN_PLATFORM_LABELS[platform]}
              </option>
            ))}
          </NativeSelect>
        </FormField>
      )}
      <FormField label="Język" htmlFor="start-language">
        <NativeSelect
          id="start-language"
          value={draft.language}
          onChange={(event) => {
            if (!isContentLanguage(event.target.value)) return;
            onDraftChange({ ...draft, language: event.target.value });
          }}
        >
          {CONTENT_LANGUAGES.map((language) => (
            <option key={language} value={language}>
              {LANGUAGE_LABELS[language]}
            </option>
          ))}
        </NativeSelect>
      </FormField>
      <FormField label="Temat" htmlFor="start-topic">
        <Input
          id="start-topic"
          value={draft.topic}
          onChange={(event) => onDraftChange({ ...draft, topic: event.target.value })}
          required
        />
      </FormField>
      <FormField label="Grupa (opcjonalnie)" htmlFor="start-audience">
        <Input
          id="start-audience"
          value={draft.audience}
          onChange={(event) => onDraftChange({ ...draft, audience: event.target.value })}
        />
      </FormField>
      <FormField label="Cel (opcjonalnie)" htmlFor="start-goal">
        <Input
          id="start-goal"
          value={draft.goal}
          onChange={(event) => onDraftChange({ ...draft, goal: event.target.value })}
        />
      </FormField>
      {pageTask ? (
        <>
          <FormField label="Kąt (opcjonalnie)" htmlFor="start-angle">
            <Input
              id="start-angle"
              value={draft.angle}
              onChange={(event) => onDraftChange({ ...draft, angle: event.target.value })}
            />
          </FormField>
          <FormField label="Długość w słowach (opcjonalnie)" htmlFor="start-length">
            <Input
              id="start-length"
              inputMode="numeric"
              value={draft.targetLength}
              onChange={(event) => onDraftChange({ ...draft, targetLength: event.target.value })}
            />
          </FormField>
        </>
      ) : (
        <FormField label="Liczba pomysłów (opcjonalnie)" htmlFor="start-idea-count">
          <Input
            id="start-idea-count"
            inputMode="numeric"
            value={draft.ideaCount}
            onChange={(event) => onDraftChange({ ...draft, ideaCount: event.target.value })}
          />
        </FormField>
      )}
      {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
      {disableReason ? <p className="text-xs text-muted-foreground">{disableReason}</p> : null}
      <Button
        type="submit"
        disabled={pending || !agentsActive || !inputReady}
        className="self-start"
      >
        {pending ? 'Uruchamianie…' : 'Uruchom run'}
      </Button>
    </form>
  );
}

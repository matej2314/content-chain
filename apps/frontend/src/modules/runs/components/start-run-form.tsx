'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
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
import { fetchCompanyContext } from '@/modules/company-context/api/company-context.api';
import { useOwnRuns } from '@/modules/runs/components/own-runs-provider';
import { AgentsGateTooltip, useStartRunGate } from '@/modules/runs/components/start-run-gate';
import { GuestLimitModal } from '@/modules/demo/components/guest-limit-modal';
import { isGuestAllowedTaskType, isGuestQuotaCode } from '@/modules/demo/lib/guest-policy';
import { useGuestLocked } from '@/modules/demo/lib/use-guest-locked';
import { startRun } from '@/modules/runs/api/runs.api';
import { notifyProduct } from '@/modules/notifications/notify-product';
import {
  CONTENT_KIND_LABELS,
  LANGUAGE_LABELS,
  RUN_PLATFORM_LABELS,
  RUN_TASK_TYPE_LABELS,
} from '@/modules/runs/api/run-labels';
import {
  AUDIENCE_GROUP_CUSTOM_VALUE,
  AUDIENCE_GROUP_NONE_VALUE,
  audienceGroupFromSelectValue,
  audienceGroupSelectValue,
  audienceGroupToBriefAudience,
  emptyAudienceGroup,
  resolveAudienceGroupMode,
  type AudienceGroupMode,
} from '@/modules/runs/lib/audience-group';
import type { RunSnapshot, StartRunInput } from '@/modules/runs/api/runs.types';

export type StartRunDraft = {
  readonly taskType: RunTaskType;
  readonly platform: SocialPlatform;
  readonly contentKind: ContentKind;
  readonly language: ContentLanguage;
  readonly topic: string;
  readonly audienceGroup: AudienceGroupMode;
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
  audienceGroup: emptyAudienceGroup(),
  goal: '',
  ideaCount: '',
  angle: '',
  targetLength: '',
};

export function draftFromSnapshot(
  snapshot: RunSnapshot,
  profileNames: readonly string[],
): StartRunDraft {
  const brief = snapshot.brief;
  return {
    taskType: snapshot.taskType,
    platform: snapshot.platform === 'web' ? 'linkedin' : snapshot.platform,
    contentKind: snapshot.contentKind ?? 'blog',
    language: snapshot.language,
    topic: brief.topic,
    audienceGroup: resolveAudienceGroupMode(brief.audience, profileNames),
    goal: brief.goal ?? '',
    ideaCount: 'ideaCount' in brief && brief.ideaCount !== undefined ? String(brief.ideaCount) : '',
    angle: 'angle' in brief ? (brief.angle ?? '') : '',
    targetLength:
      'targetLength' in brief && brief.targetLength !== undefined ? String(brief.targetLength) : '',
  };
}

function toInput(draft: StartRunDraft): StartRunInput | null {
  if (draft.topic.trim().length === 0) return null;
  const audience = audienceGroupToBriefAudience(draft.audienceGroup);
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
        ...(audience !== undefined ? { audience } : {}),
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
      ...(audience !== undefined ? { audience } : {}),
      ...(draft.goal.trim() ? { goal: draft.goal } : {}),
      ...(parsedCount !== undefined ? { ideaCount: parsedCount } : {}),
    },
  };
}

type StartRunFormHeading = 'visible' | 'none';

type StartState =
  | { readonly status: 'idle' }
  | { readonly status: 'pending' }
  | { readonly status: 'error'; readonly code: string; readonly message: string }
  | { readonly status: 'quota'; readonly code: string; readonly message: string };

const INITIAL_START_STATE: StartState = { status: 'idle' };

/** Closed-state + option text on dark shell; disabled options stay readable but quieter. */
const START_RUN_SELECT_CLASS = 'text-[#0b1f1a] [&_option:disabled]:opacity-40';

type StartRunFormProps = {
  readonly draft: StartRunDraft;
  readonly onDraftChange: (next: StartRunDraft) => void;
  readonly idPrefix: string;
  readonly heading: StartRunFormHeading;
  readonly onSuccess?: () => void;
};

export function StartRunForm({
  draft,
  onDraftChange,
  idPrefix,
  heading,
  onSuccess,
}: StartRunFormProps) {
  const router = useRouter();
  const { refresh } = useOwnRuns();
  const { agentsActive, disableReason } = useStartRunGate();
  const guestLocked = useGuestLocked();
  const [startState, setStartState] = useState<StartState>(INITIAL_START_STATE);
  const [profileNames, setProfileNames] = useState<readonly string[]>([]);
  const pageTask = isContentTaskType(draft.taskType);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const payload = await fetchCompanyContext();
        if (cancelled) return;
        setProfileNames(
          payload.audience.profiles
            .map((profile) => profile.name.trim())
            .filter((name) => name.length > 0),
        );
      } catch {
        if (cancelled) return;
        setProfileNames([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const inputReady = useMemo(() => toInput(draft) !== null, [draft]);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const input = toInput(draft);
    if (!input || !agentsActive) return;
    if (guestLocked && !isGuestAllowedTaskType(draft.taskType)) return;
    setStartState({ status: 'pending' });
    try {
      const accepted = await startRun(input);
      await refresh();
      notifyProduct({ kind: 'success', title: 'Run wystartował' });
      setStartState({ status: 'idle' });
      onSuccess?.();
      router.push(`/runs/${accepted.runId}`);
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        if (isGuestQuotaCode(reason.envelope.code)) {
          setStartState({
            status: 'quota',
            code: reason.envelope.code,
            message: reason.envelope.message,
          });
          return;
        }
        setStartState({
          status: 'error',
          code: reason.envelope.code,
          message: reason.envelope.message,
        });
        return;
      }
      setStartState({
        status: 'error',
        code: 'INTERNAL_ERROR',
        message: 'Nie udało się odczytać odpowiedzi.',
      });
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={(event) => void onSubmit(event)}>
      {heading === 'visible' ? <h2 className="text-base font-medium">Start runu</h2> : null}
      <FormField label="Typ zadania" htmlFor={`${idPrefix}-task-type`}>
        <NativeSelect
          id={`${idPrefix}-task-type`}
          className={START_RUN_SELECT_CLASS}
          value={draft.taskType}
          onChange={(event) => {
            if (!isRunTaskType(event.target.value)) return;
            onDraftChange({ ...draft, taskType: event.target.value });
          }}
        >
          {RUN_TASK_TYPES.map((taskType) => (
            <option
              key={taskType}
              value={taskType}
              disabled={guestLocked && !isGuestAllowedTaskType(taskType)}
              className={
                guestLocked && !isGuestAllowedTaskType(taskType) ? 'opacity-40' : undefined
              }
            >
              {RUN_TASK_TYPE_LABELS[taskType]}
            </option>
          ))}
        </NativeSelect>
      </FormField>
      {guestLocked ? (
        <p className="text-xs text-muted-foreground">
          Konto demonstracyjne: dostępne typy to pomysły postów oraz copy / outline strony.
        </p>
      ) : null}
      {pageTask ? (
        <FormField label="Rodzaj strony" htmlFor={`${idPrefix}-content-kind`}>
          <NativeSelect
            id={`${idPrefix}-content-kind`}
            className={START_RUN_SELECT_CLASS}
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
        <FormField label="Platforma" htmlFor={`${idPrefix}-platform`}>
          <NativeSelect
            id={`${idPrefix}-platform`}
            className={START_RUN_SELECT_CLASS}
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
      <FormField label="Język" htmlFor={`${idPrefix}-language`}>
        <NativeSelect
          id={`${idPrefix}-language`}
          className={START_RUN_SELECT_CLASS}
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
      <FormField label="Temat" htmlFor={`${idPrefix}-topic`}>
        <Input
          id={`${idPrefix}-topic`}
          value={draft.topic}
          onChange={(event) => onDraftChange({ ...draft, topic: event.target.value })}
          required
        />
      </FormField>
      <FormField label="Grupa (opcjonalnie)" htmlFor={`${idPrefix}-audience`}>
        <NativeSelect
          id={`${idPrefix}-audience`}
          className={START_RUN_SELECT_CLASS}
          value={audienceGroupSelectValue(draft.audienceGroup)}
          onChange={(event) =>
            onDraftChange({
              ...draft,
              audienceGroup: audienceGroupFromSelectValue(
                event.target.value,
                draft.audienceGroup,
                profileNames,
              ),
            })
          }
        >
          <option value={AUDIENCE_GROUP_NONE_VALUE}>Bez wskazania grupy</option>
          {profileNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
          <option value={AUDIENCE_GROUP_CUSTOM_VALUE}>Wpisz własną grupę…</option>
        </NativeSelect>
      </FormField>
      {draft.audienceGroup.kind === 'custom' ? (
        <FormField
          label="Opis grupy"
          htmlFor={`${idPrefix}-audience-custom`}
          hint="Opis odbiorcy w briefie — bez dopasowania do katalogu."
        >
          <Input
            id={`${idPrefix}-audience-custom`}
            value={draft.audienceGroup.description}
            onChange={(event) =>
              onDraftChange({
                ...draft,
                audienceGroup: { kind: 'custom', description: event.target.value },
              })
            }
          />
        </FormField>
      ) : null}
      <FormField label="Cel (opcjonalnie)" htmlFor={`${idPrefix}-goal`}>
        <Input
          id={`${idPrefix}-goal`}
          value={draft.goal}
          onChange={(event) => onDraftChange({ ...draft, goal: event.target.value })}
        />
      </FormField>
      {pageTask ? (
        <>
          <FormField label="Perpsektywa (opcjonalnie)" htmlFor={`${idPrefix}-angle`}>
            <Input
              id={`${idPrefix}-angle`}
              value={draft.angle}
              onChange={(event) => onDraftChange({ ...draft, angle: event.target.value })}
            />
          </FormField>
          <FormField label="Długość w słowach (opcjonalnie)" htmlFor={`${idPrefix}-length`}>
            <Input
              id={`${idPrefix}-length`}
              inputMode="numeric"
              value={draft.targetLength}
              onChange={(event) => onDraftChange({ ...draft, targetLength: event.target.value })}
            />
          </FormField>
        </>
      ) : (
        <FormField label="Liczba pomysłów (opcjonalnie)" htmlFor={`${idPrefix}-idea-count`}>
          <Input
            id={`${idPrefix}-idea-count`}
            inputMode="numeric"
            value={draft.ideaCount}
            onChange={(event) => onDraftChange({ ...draft, ideaCount: event.target.value })}
          />
        </FormField>
      )}
      {startState.status === 'error' ? (
        <EnvelopeError code={startState.code} message={startState.message} />
      ) : null}
      {disableReason ? <p className="text-xs text-muted-foreground">{disableReason}</p> : null}
      <AgentsGateTooltip reason={disableReason}>
        <Button
          type="submit"
          disabled={startState.status === 'pending' || !agentsActive || !inputReady}
          className="self-start"
        >
          {startState.status === 'pending' ? 'Uruchamianie…' : 'Uruchom agenta'}
        </Button>
      </AgentsGateTooltip>
      <GuestLimitModal
        open={startState.status === 'quota'}
        onOpenChange={(next) => {
          if (!next) setStartState({ status: 'idle' });
        }}
        code={startState.status === 'quota' ? startState.code : null}
        message={startState.status === 'quota' ? startState.message : null}
      />
    </form>
  );
}

'use client';

import { useEffect, useState, type FormEvent } from 'react';
import {
  FEEDBACK_AGENT_KEYS,
  FEEDBACK_TARGET_TYPES,
  isFeedbackAgentKey,
  isFeedbackTargetType,
  isRunId,
  createRunId,
  type FeedbackAgentKey,
  type FeedbackTargetType,
  type RunId,
} from '@content-chain/shared';
import { Button } from '@/shared/ui/button';
import { NativeSelect } from '@/shared/ui/native-select';
import { Textarea } from '@/shared/ui/textarea';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import type { UserRunItem } from '@/modules/runs/api/runs.types';
import { RUN_TASK_TYPE_LABELS } from '@/modules/runs/api/run-labels';
import { useOwnRuns } from '@/modules/runs/components/own-runs-provider';
import { createFeedback } from '@/modules/feedback/api/feedback.api';
import { filterFeedbackRunOptions } from '@/modules/feedback/api/feedback-run-eligibility';
import { FEEDBACK_BODY_MAX, type CreateFeedbackInput } from '@/modules/feedback/api/feedback.types';
import {
  FEEDBACK_AGENT_LABELS,
  FEEDBACK_TARGET_LABELS,
} from '@/modules/feedback/api/feedback-labels';

type FeedbackFormProps = {
  readonly idPrefix: string;
};

type FeedbackFormState = {
  readonly targetType: FeedbackTargetType;
  readonly agentKey: FeedbackAgentKey;
  readonly runId: RunId | '';
  readonly body: string;
  readonly pending: boolean;
  readonly saved: boolean;
  readonly envelope: { readonly code: string; readonly message: string } | null;
  readonly runOptions: readonly UserRunItem[];
};

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

const FEEDBACK_SELECT_LIST_CLASS = '[&_option]:bg-popover';

const INITIAL_STATE: FeedbackFormState = {
  targetType: 'application',
  agentKey: 'IdeationAgent',
  runId: '',
  body: '',
  pending: false,
  saved: false,
  envelope: null,
  runOptions: [],
};

function toInput(
  targetType: FeedbackTargetType,
  agentKey: FeedbackAgentKey,
  runId: RunId | '',
  body: string,
): CreateFeedbackInput | null {
  const trimmed = body.trim();
  if (trimmed.length === 0 || trimmed.length > FEEDBACK_BODY_MAX) return null;
  if (targetType === 'application') return { targetType, body: trimmed };
  if (targetType === 'agent') return { targetType, agentKey, body: trimmed };
  if (runId === '') return null;
  return { targetType: 'run', runId, body: trimmed };
}

export function FeedbackForm({ idPrefix }: FeedbackFormProps) {
  const { state } = useOwnRuns();
  const [formState, setFormState] = useState<FeedbackFormState>(INITIAL_STATE);

  useEffect(() => {
    if (formState.targetType !== 'run' || state.status !== 'ready') return;
    let cancelled = false;
    void filterFeedbackRunOptions(state.items).then((options) => {
      if (!cancelled) setFormState((current) => ({ ...current, runOptions: options }));
    });
    return () => {
      cancelled = true;
    };
  }, [state, formState.targetType]);

  const runOptions =
    formState.targetType === 'run' && state.status === 'ready' ? formState.runOptions : [];
  const input = toInput(formState.targetType, formState.agentKey, formState.runId, formState.body);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!input) return;
    setFormState((current) => ({
      ...current,
      pending: true,
      envelope: null,
      saved: false,
    }));
    try {
      await createFeedback(input);
      setFormState((current) => ({ ...current, body: '', saved: true }));
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        const { envelope } = reason;
        setFormState((current) => ({ ...current, envelope }));
      } else {
        setFormState((current) => ({ ...current, envelope: FALLBACK }));
      }
    } finally {
      setFormState((current) => ({ ...current, pending: false }));
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={(event) => void onSubmit(event)}>
      <FormField label="Co oceniasz" htmlFor={`${idPrefix}-target`}>
        <NativeSelect
          id={`${idPrefix}-target`}
          className={FEEDBACK_SELECT_LIST_CLASS}
          value={formState.targetType}
          onChange={(event) => {
            const nextTarget = event.target.value;
            if (!isFeedbackTargetType(nextTarget)) return;
            setFormState((current) => ({
              ...current,
              targetType: nextTarget,
              saved: false,
            }));
          }}
        >
          {FEEDBACK_TARGET_TYPES.map((item) => (
            <option key={item} value={item}>
              {FEEDBACK_TARGET_LABELS[item]}
            </option>
          ))}
        </NativeSelect>
      </FormField>
      {formState.targetType === 'agent' ? (
        <FormField label="Agent" htmlFor={`${idPrefix}-agent`}>
          <NativeSelect
            id={`${idPrefix}-agent`}
            className={FEEDBACK_SELECT_LIST_CLASS}
            value={formState.agentKey}
            onChange={(event) => {
              const nextAgent = event.target.value;
              if (!isFeedbackAgentKey(nextAgent)) return;
              setFormState((current) => ({
                ...current,
                agentKey: nextAgent,
              }));
            }}
          >
            {FEEDBACK_AGENT_KEYS.map((item) => (
              <option key={item} value={item}>
                {FEEDBACK_AGENT_LABELS[item]}
              </option>
            ))}
          </NativeSelect>
        </FormField>
      ) : null}
      {formState.targetType === 'run' ? (
        <FormField
          label="Run"
          htmlFor={`${idPrefix}-run`}
          hint="Tylko Twoje zakończone, nieudane albo anulowane z wynikiem."
        >
          <NativeSelect
            id={`${idPrefix}-run`}
            className={FEEDBACK_SELECT_LIST_CLASS}
            value={formState.runId}
            disabled={state.status !== 'ready'}
            onChange={(event) => {
              if (event.target.value === '') {
                setFormState((current) => ({ ...current, runId: '' }));
                return;
              }
              if (!isRunId(event.target.value)) return;
              setFormState((current) => ({
                ...current,
                runId: createRunId(event.target.value),
              }));
            }}
          >
            <option value="">Wybierz run</option>
            {runOptions.map((item) => (
              <option key={item.runId} value={item.runId}>
                {RUN_TASK_TYPE_LABELS[item.taskType]} ({item.createdAt})
              </option>
            ))}
          </NativeSelect>
        </FormField>
      ) : null}
      <FormField label="Treść opinii" htmlFor={`${idPrefix}-body`}>
        <Textarea
          id={`${idPrefix}-body`}
          value={formState.body}
          maxLength={FEEDBACK_BODY_MAX}
          className="min-h-50"
          onChange={(event) =>
            setFormState((current) => ({ ...current, body: event.target.value }))
          }
          required
        />
      </FormField>
      {state.status === 'error' && formState.targetType === 'run' ? (
        <EnvelopeError code={state.envelope.code} message={state.envelope.message} />
      ) : null}
      {formState.envelope ? (
        <EnvelopeError code={formState.envelope.code} message={formState.envelope.message} />
      ) : null}
      {formState.saved ? <p className="text-xs text-muted-foreground">Zapisano opinię.</p> : null}
      <Button type="submit" disabled={formState.pending || input === null}>
        Zapisz opinię
      </Button>
    </form>
  );
}

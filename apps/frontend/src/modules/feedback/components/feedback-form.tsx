'use client';

import { useMemo, useState, type FormEvent } from 'react';
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
import { isTerminalRunStatus } from '@/modules/runs/api/runs.types';
import { RUN_TASK_TYPE_LABELS } from '@/modules/runs/api/run-labels';
import { useOwnRuns } from '@/modules/runs/components/own-runs-provider';
import { createFeedback } from '@/modules/feedback/api/feedback.api';
import { FEEDBACK_BODY_MAX, type CreateFeedbackInput } from '@/modules/feedback/api/feedback.types';
import {
  FEEDBACK_AGENT_LABELS,
  FEEDBACK_TARGET_LABELS,
} from '@/modules/feedback/api/feedback-labels';

type FeedbackFormProps = {
  readonly idPrefix: string;
};

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

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
  const [targetType, setTargetType] = useState<FeedbackTargetType>('application');
  const [agentKey, setAgentKey] = useState<FeedbackAgentKey>('IdeationAgent');
  const [runId, setRunId] = useState<RunId | ''>('');
  const [body, setBody] = useState('');
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [envelope, setEnvelope] = useState<{ code: string; message: string } | null>(null);

  const reviewableRuns = useMemo(() => {
    if (state.status !== 'ready') return [];
    return state.items.filter((item) => isTerminalRunStatus(item.status));
  }, [state]);

  const input = toInput(targetType, agentKey, runId, body);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!input) return;
    setPending(true);
    setEnvelope(null);
    setSaved(false);
    try {
      await createFeedback(input);
      setBody('');
      setSaved(true);
    } catch (reason: unknown) {
      if (reason instanceof ApiError) setEnvelope(reason.envelope);
      else setEnvelope(FALLBACK);
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={(event) => void onSubmit(event)}>
      <FormField label="Co oceniasz" htmlFor={`${idPrefix}-target`}>
        <NativeSelect
          id={`${idPrefix}-target`}
          value={targetType}
          onChange={(event) => {
            if (!isFeedbackTargetType(event.target.value)) return;
            setTargetType(event.target.value);
            setSaved(false);
          }}
        >
          {FEEDBACK_TARGET_TYPES.map((item) => (
            <option key={item} value={item}>
              {FEEDBACK_TARGET_LABELS[item]}
            </option>
          ))}
        </NativeSelect>
      </FormField>
      {targetType === 'agent' ? (
        <FormField label="Agent" htmlFor={`${idPrefix}-agent`}>
          <NativeSelect
            id={`${idPrefix}-agent`}
            value={agentKey}
            onChange={(event) => {
              if (!isFeedbackAgentKey(event.target.value)) return;
              setAgentKey(event.target.value);
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
      {targetType === 'run' ? (
        <FormField
          label="Run"
          htmlFor={`${idPrefix}-run`}
          hint="Tylko Twoje zakończone albo nieudane runy."
        >
          <NativeSelect
            id={`${idPrefix}-run`}
            value={runId}
            disabled={state.status !== 'ready'}
            onChange={(event) => {
              if (event.target.value === '') {
                setRunId('');
                return;
              }
              if (!isRunId(event.target.value)) return;
              setRunId(createRunId(event.target.value));
            }}
          >
            <option value="">Wybierz run</option>
            {reviewableRuns.map((item) => (
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
          value={body}
          maxLength={FEEDBACK_BODY_MAX}
          onChange={(event) => setBody(event.target.value)}
          required
        />
      </FormField>
      {state.status === 'error' && targetType === 'run' ? (
        <EnvelopeError code={state.envelope.code} message={state.envelope.message} />
      ) : null}
      {envelope ? <EnvelopeError code={envelope.code} message={envelope.message} /> : null}
      {saved ? <p className="text-xs text-muted-foreground">Zapisano opinię.</p> : null}
      <Button type="submit" disabled={pending || input === null}>
        Zapisz opinię
      </Button>
    </form>
  );
}

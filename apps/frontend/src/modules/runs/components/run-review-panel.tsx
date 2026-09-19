'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import type { UserId } from '@content-chain/shared';
import { Button } from '@/shared/ui/button';
import { EnvelopeError } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { finalizeRunReview, patchRunRating, saveOutputEdited } from '@/modules/runs/api/runs.api';
import { buildOutputEditedBody, canEditResult } from '@/modules/runs/api/result-edit-payload';
import type { RunSnapshot } from '@/modules/runs/api/runs.types';
import type { RunResult, UserRating } from '@/modules/runs/api/runs-result.types';
import { canReviewSnapshot } from '@/modules/runs/components/run-review-access';
import { RunResultEditor } from '@/modules/runs/components/run-result-editor';

type RunReviewPanelProps = {
  readonly snapshot: RunSnapshot;
  readonly userId: UserId;
  readonly editing: boolean;
  readonly onEditingChange: (editing: boolean) => void;
  readonly onReload: () => Promise<void>;
};

const STARS: readonly UserRating[] = [1, 2, 3, 4, 5];
const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

export function RunReviewPanel({
  snapshot,
  userId,
  editing,
  onEditingChange,
  onReload,
}: RunReviewPanelProps) {
  const locked = snapshot.reviewFinalizedAt !== null;
  const author = snapshot.startedBy !== null && snapshot.startedBy.id === userId;
  const reviewable = canReviewSnapshot(snapshot, userId);
  const [draft, setDraft] = useState<RunResult>(snapshot.result);
  const [draftSource, setDraftSource] = useState({
    runId: snapshot.runId,
    outputEdited: snapshot.outputEdited,
    result: snapshot.result,
  });
  const [pending, setPending] = useState(false);
  const [envelope, setEnvelope] = useState<{ code: string; message: string } | null>(null);

  if (
    !editing &&
    (draftSource.runId !== snapshot.runId ||
      draftSource.outputEdited !== snapshot.outputEdited ||
      draftSource.result !== snapshot.result)
  ) {
    setDraftSource({
      runId: snapshot.runId,
      outputEdited: snapshot.outputEdited,
      result: snapshot.result,
    });
    setDraft(snapshot.result);
  }

  if (!author || (snapshot.status !== 'completed' && snapshot.status !== 'failed')) {
    return null;
  }

  async function runAction(action: () => Promise<void>): Promise<void> {
    setPending(true);
    setEnvelope(null);
    try {
      await action();
      await onReload();
    } catch (reason: unknown) {
      if (reason instanceof ApiError) setEnvelope(reason.envelope);
      else setEnvelope(FALLBACK);
    } finally {
      setPending(false);
    }
  }

  return (
    <section data-slot="run-review" className="flex flex-col gap-3">
      <h2 className="text-sm font-medium">Przegląd</h2>
      {locked ? (
        <p className="text-sm text-muted-foreground">
          <span>Przegląd zamknięty.</span>
          {snapshot.userRating !== null ? <span> Ocena {snapshot.userRating} z 5.</span> : null}
        </p>
      ) : null}
      <div role="group" aria-label="Ocena gwiazdkowa" className="flex items-center gap-1">
        {STARS.map((value) => {
          const active = snapshot.userRating !== null && snapshot.userRating >= value;
          return (
            <Button
              key={value}
              type="button"
              variant="ghost"
              size="icon-sm"
              disabled={!reviewable || pending}
              aria-label={`Ocena ${value} z 5`}
              aria-pressed={snapshot.userRating === value}
              onClick={() => {
                void runAction(async () => {
                  await patchRunRating(snapshot.runId, value);
                });
              }}
            >
              <Icon
                icon="lucide:star"
                className={active ? 'size-4 text-foreground' : 'size-4 text-muted-foreground'}
              />
            </Button>
          );
        })}
        {reviewable ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={pending || snapshot.userRating === null}
            onClick={() => {
              void runAction(async () => {
                await patchRunRating(snapshot.runId, null);
              });
            }}
          >
            Bez oceny
          </Button>
        ) : null}
      </div>
      {reviewable && canEditResult(snapshot.taskType, snapshot.result) ? (
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={pending}
            onClick={() => {
              setDraft(snapshot.result);
              onEditingChange(!editing);
            }}
          >
            {editing ? 'Anuluj edycję' : 'Edytuj'}
          </Button>
          {editing ? (
            <Button
              type="button"
              disabled={pending}
              onClick={() => {
                void runAction(async () => {
                  await saveOutputEdited(
                    snapshot.runId,
                    buildOutputEditedBody(snapshot.taskType, draft),
                  );
                  onEditingChange(false);
                });
              }}
            >
              Zapisz treść
            </Button>
          ) : null}
        </div>
      ) : null}
      {editing && reviewable ? (
        <RunResultEditor
          taskType={snapshot.taskType}
          result={draft}
          disabled={pending}
          idPrefix="review-edit"
          onChange={setDraft}
        />
      ) : null}
      {reviewable ? (
        <Button
          type="button"
          disabled={pending}
          onClick={() => {
            void runAction(async () => {
              await finalizeRunReview(snapshot.runId);
              onEditingChange(false);
            });
          }}
        >
          Zamknij przegląd
        </Button>
      ) : null}
      {envelope ? <EnvelopeError code={envelope.code} message={envelope.message} /> : null}
    </section>
  );
}

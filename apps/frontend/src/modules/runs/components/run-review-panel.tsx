'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import type { UserId } from '@content-chain/shared';
import { Button } from '@/shared/ui/button';
import { EnvelopeError } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { finalizeRunReview, patchRunRating } from '@/modules/runs/api/runs.api';
import type { RunSnapshot } from '@/modules/runs/api/runs.types';
import type { UserRating } from '@/modules/runs/api/runs-result.types';
import { canReviewSnapshot } from '@/modules/runs/components/run-review-access';

type RunReviewPanelProps = {
  readonly snapshot: RunSnapshot;
  readonly userId: UserId;
  readonly finalizeDisabled: boolean;
  readonly onReload: () => Promise<void>;
};

const STARS: readonly UserRating[] = [1, 2, 3, 4, 5];
const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

export function RunReviewPanel({
  snapshot,
  userId,
  finalizeDisabled,
  onReload,
}: RunReviewPanelProps) {
  const locked = snapshot.reviewFinalizedAt !== null;
  const author = snapshot.startedBy !== null && snapshot.startedBy.id === userId;
  const reviewable = canReviewSnapshot(snapshot, userId);
  const [pending, setPending] = useState(false);
  const [envelope, setEnvelope] = useState<{ code: string; message: string } | null>(null);

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
      {reviewable ? (
        <Button
          type="button"
          disabled={pending || finalizeDisabled}
          title={finalizeDisabled ? 'Najpierw zapisz albo anuluj edycję wyniku.' : undefined}
          onClick={() => {
            void runAction(async () => {
              await finalizeRunReview(snapshot.runId);
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

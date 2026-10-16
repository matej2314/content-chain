'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import type { UserId } from '@content-chain/shared';
import { Button } from '@/shared/ui/button';
import { EnvelopeError } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { finalizeRunReview, patchRunRating } from '@/modules/runs/api/runs.api';
import { canReviewSnapshot } from '@/modules/runs/components/run-review-access';
import { useReviewExpiryTick } from './use-review-expiry-tick';
import { isReviewWindowOpen } from './run-review-window';
import type { RunSnapshot } from '@/modules/runs/api/runs.types';
import type { UserRating } from '@/modules/runs/api/runs-result.types';

type RunReviewPanelProps = {
  readonly snapshot: RunSnapshot;
  readonly userId: UserId;
  readonly finalizeDisabled: boolean;
  readonly guestLocked: boolean;
  readonly onReload: () => Promise<void>;
};

const STARS: readonly UserRating[] = [1, 2, 3, 4, 5];
const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

export function RunReviewPanel({
  snapshot,
  userId,
  finalizeDisabled,
  guestLocked,
  onReload,
}: RunReviewPanelProps) {
  const nowMs = useReviewExpiryTick(snapshot.reviewExpiresAt);
  const locked = !isReviewWindowOpen(snapshot, nowMs);
  const author = snapshot.startedBy !== null && snapshot.startedBy.id === userId;
  const reviewable = canReviewSnapshot(snapshot, userId, nowMs);
  const [pending, setPending] = useState(false);
  const [envelope, setEnvelope] = useState<{ code: string; message: string } | null>(null);
  const [hoverRating, setHoverRating] = useState<UserRating | null>(null);

  if (!author || (snapshot.status !== 'completed' && snapshot.status !== 'failed')) {
    return null;
  }

  const displayRating = hoverRating ?? snapshot.userRating;

  async function runAction(action: () => Promise<void>): Promise<void> {
    setPending(true);
    setEnvelope(null);
    setHoverRating(null);
    try {
      await action();
      await onReload();
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setEnvelope({
          code: reason.envelope.code,
          message: reason.envelope.message,
        });
        return;
      }
      setEnvelope(FALLBACK);
    } finally {
      setPending(false);
    }
  }

  return (
    <section data-slot="run-review" className="flex flex-col gap-3">
      {locked ? (
        <p className="text-sm text-muted-foreground">
          <span>Przegląd zamknięty.</span>
          {snapshot.userRating !== null ? <span> Ocena {snapshot.userRating} na 5.</span> : null}
        </p>
      ) : null}
      <div
        role="group"
        aria-label="Ocena gwiazdkowa"
        className="flex items-center gap-1"
        onMouseLeave={() => setHoverRating(null)}
      >
        {STARS.map((value) => {
          const filled = displayRating !== null && displayRating >= value;
          return (
            <button
              key={value}
              type="button"
              disabled={!reviewable || pending}
              aria-label={`Ocena ${value} na 5`}
              aria-pressed={snapshot.userRating === value}
              className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-transparent outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
              onMouseEnter={() => {
                if (reviewable && !pending) {
                  setHoverRating(value);
                }
              }}
              onClick={() => {
                void runAction(async () => {
                  await patchRunRating(snapshot.runId, value);
                });
              }}
            >
              <Icon
                icon={filled ? 'mdi:star' : 'mdi:star-outline'}
                className={filled ? 'size-4 text-amber-500' : 'size-4 text-muted-foreground'}
                aria-hidden
              />
            </button>
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
      {reviewable && !guestLocked ? (
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

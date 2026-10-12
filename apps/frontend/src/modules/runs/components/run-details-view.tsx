'use client';

import { useState } from 'react';
import { createRunId, isRunId } from '@content-chain/shared';
import { Button } from '@/shared/ui/button';
import { EnvelopeError } from '@/shared/ui/form-field';
import { Skeleton } from '@/shared/ui/skeleton';
import { useSession } from '@/modules/auth/components/session-provider';
import { useGuestLocked } from '@/modules/demo/lib/use-guest-locked';
import {
  CONTENT_KIND_LABELS,
  LANGUAGE_LABELS,
  RUN_PLATFORM_LABELS,
  RUN_TASK_TYPE_LABELS,
} from '@/modules/runs/api/run-labels';
import { CancelRunDialog } from '@/modules/runs/components/cancel-run-dialog';
import { HitlPanel } from '@/modules/runs/components/hitl-panel';
import { RunLogMessage } from '@/modules/runs/components/run-log-message';
import { RunResultSection } from '@/modules/runs/components/run-result-section';
import { RunReviewPanel } from '@/modules/runs/components/run-review-panel';
import { RunStatusView } from '@/modules/runs/components/run-status';
import { runLogKey, useRunDetails } from '@/modules/runs/components/use-run-details';
import { canCancelRunSnapshot } from '@/modules/runs/lib/can-cancel-run-snapshot';
import { IsoDateTime } from '@/shared/datetime/iso-date-time';

export function RunDetailsView({ runIdParam }: { readonly runIdParam: string }) {
  const { state: session } = useSession();
  const guestLocked = useGuestLocked();
  const [resultEditing, setResultEditing] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  const runId = isRunId(runIdParam) ? createRunId(runIdParam) : null;
  const { view, reloadDetails, applySnapshot, patchStatus, refresh } = useRunDetails(runId);

  if (runId === null) {
    return <EnvelopeError code="VALIDATION_FAILED" message="Invalid runId" />;
  }

  const waitingForSnapshot =
    view.status === 'loading' ||
    (view.status === 'ready' && view.snapshot.runId !== runId) ||
    (view.status === 'error' && view.forRunId !== runId);

  if (waitingForSnapshot) {
    return (
      <div className="flex max-w-3xl flex-col gap-3">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }
  if (view.status === 'error') {
    return <EnvelopeError code={view.envelope.code} message={view.envelope.message} />;
  }

  const { snapshot, logs } = view;
  const canCancel =
    session.status === 'authenticated' &&
    canCancelRunSnapshot({
      snapshot,
      sessionUserId: session.user.id,
      sessionRole: session.user.role,
    });

  return (
    <article className="flex max-w-3xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-lg font-medium">{RUN_TASK_TYPE_LABELS[snapshot.taskType]}</h1>
        <p className="text-sm text-muted-foreground">
          {RUN_PLATFORM_LABELS[snapshot.platform]}
          {snapshot.contentKind ? ` · ${CONTENT_KIND_LABELS[snapshot.contentKind]}` : ''}
          {` · ${LANGUAGE_LABELS[snapshot.language]}`}
          {snapshot.startedBy ? ` · ${snapshot.startedBy.email}` : ''}
          <span className="ml-2">
            <IsoDateTime iso={snapshot.createdAt} />
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <RunStatusView status={snapshot.status} />
          {canCancel ? (
            <Button type="button" variant="outline" size="sm" onClick={() => setCancelOpen(true)}>
              Stop
            </Button>
          ) : null}
        </div>
      </header>
      <CancelRunDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        runId={canCancel ? snapshot.runId : null}
        onCancelled={(next) => {
          applySnapshot(next);
          patchStatus(next.runId, next.status);
          void refresh();
        }}
      />
      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-medium">Logi</h2>
        {logs.length === 0 ? (
          <p className="text-sm text-muted-foreground">Brak wpisów logu.</p>
        ) : (
          <ol className="divide-y divide-border text-sm">
            {logs.map((item) => (
              <li key={runLogKey(item)} className="flex flex-col gap-0.5 py-2">
                <p className="text-muted-foreground">
                  <IsoDateTime iso={item.at} kind="log" />
                  {item.step ? ` · ${item.step}` : ''}
                  {` · ${item.level}`}
                </p>
                <RunLogMessage message={item.message} />
              </li>
            ))}
          </ol>
        )}
      </section>
      <HitlPanel
        key={snapshot.runId}
        snapshot={snapshot}
        onSubmitted={async () => {
          await reloadDetails(snapshot.runId);
          patchStatus(snapshot.runId, 'running');
          void refresh();
        }}
        onStaleStatus={async () => {
          const next = await reloadDetails(snapshot.runId);
          if (next !== undefined) {
            patchStatus(next.runId, next.status);
          }
          void refresh();
        }}
      />
      <RunResultSection
        snapshot={snapshot}
        userId={session.status === 'authenticated' ? session.user.id : null}
        onReload={async () => {
          await reloadDetails(snapshot.runId);
        }}
        onEditingChange={setResultEditing}
      />
      {session.status === 'authenticated' ? (
        <RunReviewPanel
          snapshot={snapshot}
          userId={session.user.id}
          finalizeDisabled={resultEditing}
          guestLocked={guestLocked}
          onReload={async () => {
            await reloadDetails(snapshot.runId);
          }}
        />
      ) : null}
    </article>
  );
}

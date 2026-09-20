'use client';

import { useEffect } from 'react';
import type { UserId } from '@content-chain/shared';
import { EnvelopeError } from '@/shared/ui/form-field';
import type { RunSnapshot } from '@/modules/runs/api/runs.types';
import { canEditSnapshot } from '@/modules/runs/components/run-edit-access';
import { RunResultEditActions } from '@/modules/runs/components/run-result-edit-actions';
import { RunResultEditor } from '@/modules/runs/components/run-result-editor';
import { RunResultView } from '@/modules/runs/components/run-result-view';
import { useRunResultEdit } from '@/modules/runs/components/use-run-result-edit';

type RunResultSectionProps = {
  readonly snapshot: RunSnapshot;
  readonly userId: UserId | null;
  readonly onReload: () => Promise<void>;
  readonly onEditingChange: (editing: boolean) => void;
};

export function RunResultSection({
  snapshot,
  userId,
  onReload,
  onEditingChange,
}: RunResultSectionProps) {
  const edit = useRunResultEdit(snapshot, onReload);
  const editing = edit.state.status === 'editing';
  const canEdit = userId !== null && canEditSnapshot(snapshot, userId);

  useEffect(() => {
    onEditingChange(editing);
    return () => onEditingChange(false);
  }, [editing, onEditingChange]);

  if (snapshot.status !== 'completed' && snapshot.status !== 'failed') {
    return null;
  }

  const pending = edit.state.status === 'editing' ? edit.state.pending : false;

  return (
    <section data-slot="run-result" className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-10">
        <h2 className="text-sm font-medium">Wynik</h2>
        {canEdit || editing ? (
          <RunResultEditActions
            editing={editing}
            pending={pending}
            onToggleEditing={() => {
              if (editing) edit.cancel();
              else edit.open();
            }}
            onSave={() => {
              void edit.save();
            }}
          />
        ) : null}
      </div>
      {edit.state.status === 'editing' ? (
        <RunResultEditor
          taskType={snapshot.taskType}
          result={edit.state.draft}
          disabled={pending}
          idPrefix="result-edit"
          onChange={edit.setDraft}
        />
      ) : (
        <RunResultView snapshot={snapshot} />
      )}
      {edit.envelope ? (
        <EnvelopeError code={edit.envelope.code} message={edit.envelope.message} />
      ) : null}
    </section>
  );
}

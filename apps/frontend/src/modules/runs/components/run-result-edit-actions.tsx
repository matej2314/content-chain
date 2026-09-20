'use client';

import { Button } from '@/shared/ui/button';

type RunResultEditActionsProps = {
  readonly editing: boolean;
  readonly pending: boolean;
  readonly onToggleEditing: () => void;
  readonly onSave: () => void;
};

export function RunResultEditActions({
  editing,
  pending,
  onToggleEditing,
  onSave,
}: RunResultEditActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" variant="outline" disabled={pending} onClick={onToggleEditing}>
        {editing ? 'Anuluj edycję' : 'Edytuj'}
      </Button>
      {editing ? (
        <Button type="button" disabled={pending} onClick={onSave}>
          Zapisz treść
        </Button>
      ) : null}
    </div>
  );
}

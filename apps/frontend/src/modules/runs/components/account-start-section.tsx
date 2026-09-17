'use client';

import { useState } from 'react';
import { EMPTY_START_DRAFT, StartRunForm } from '@/modules/runs/components/start-run-form';

export function AccountStartSection() {
  const [draft, setDraft] = useState(EMPTY_START_DRAFT);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex max-w-xl flex-col gap-1">
        <h1 className="text-lg font-medium">Konto</h1>
        <p className="text-sm text-muted-foreground">Start runu z briefem.</p>
      </div>
      <StartRunForm draft={draft} onDraftChange={setDraft} />
    </div>
  );
}

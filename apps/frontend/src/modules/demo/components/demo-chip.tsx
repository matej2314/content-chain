'use client';

import { Icon } from '@iconify/react';
import { useDemoMode } from '@/modules/demo/components/demo-mode-provider';

export function DemoChip() {
  const { state } = useDemoMode();
  if (state.status !== 'ready' || !state.demoMode) return null;

  return (
    <div
      data-slot="demo-chip"
      className="flex items-start gap-2 rounded-md border border-border px-2 py-2 text-xs"
    >
      <Icon icon="lucide:flask-conical" className="mt-0.5 size-3.5 shrink-0" />
      <div className="flex flex-col gap-0.5">
        <p className="font-medium">Tryb demo aktywny</p>
        <p className="text-muted-foreground">Wybrane funkcje ograniczone.</p>
      </div>
    </div>
  );
}

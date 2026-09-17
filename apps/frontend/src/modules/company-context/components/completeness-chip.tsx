'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Skeleton } from '@/shared/ui/skeleton';
import { EnvelopeError } from '@/shared/ui/form-field';
import { useCompleteness } from '@/modules/company-context/components/completeness-provider';
import { GATE_SECTION_LABELS } from '@/modules/company-context/api/company-context.types';

export function CompletenessChip() {
  const { state } = useCompleteness();

  if (state.status === 'loading') {
    return <Skeleton className="h-16 w-full" />;
  }

  if (state.status === 'error') {
    return (
      <EnvelopeError
        code={state.envelope.code}
        message={state.envelope.message}
        className="text-xs"
      />
    );
  }

  if (state.completeness.complete) {
    return (
      <div
        data-slot="completeness-chip"
        className="flex items-start gap-2 rounded-md border border-border px-2 py-2 text-xs"
      >
        <Icon icon="lucide:check" className="mt-0.5 size-3.5 shrink-0" />
        <div className="flex flex-col gap-0.5">
          <p className="font-medium">Agenci aktywni</p>
          <p className="text-muted-foreground">Można uruchamiać runy produktowe.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-slot="completeness-chip"
      className="flex items-start gap-2 rounded-md border border-border px-2 py-2 text-xs"
    >
      <Icon icon="lucide:octagon-pause" className="mt-0.5 size-3.5 shrink-0" />
      <div className="flex min-w-0 flex-col gap-1">
        <p className="font-medium">Agenci nieaktywni</p>
        <p className="text-muted-foreground">
          Brakuje:{' '}
          {state.completeness.missing.map((section) => GATE_SECTION_LABELS[section]).join(', ')}
        </p>
        <Link href="/context" className="text-foreground underline-offset-4 hover:underline">
          Uzupełnij kontekst
        </Link>
      </div>
    </div>
  );
}

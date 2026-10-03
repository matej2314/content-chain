'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Skeleton } from '@/shared/ui/skeleton';
import { EnvelopeError } from '@/shared/ui/form-field';
import { useCompleteness } from '@/modules/company-context/components/completeness-provider';
import { GATE_SECTION_LABELS } from '@/modules/company-context/api/company-context.types';
import { useGatewayAlive } from '@/modules/health/components/gateway-alive-provider';
import {
  AGENTS_INACTIVE_COPY,
  computeAgentsActive,
} from '@/modules/health/lib/agents-active';

export function CompletenessChip() {
  const { state: completeness } = useCompleteness();
  const { state: gateway } = useGatewayAlive();

  if (completeness.status === 'loading' || gateway.status === 'loading') {
    return <Skeleton className="h-16 w-full" />;
  }

  if (completeness.status === 'error') {
    return (
      <EnvelopeError
        code={completeness.envelope.code}
        message={completeness.envelope.message}
        className="text-xs"
      />
    );
  }

  if (gateway.status === 'error') {
    return (
      <EnvelopeError
        code={gateway.envelope.code}
        message={gateway.envelope.message}
        className="text-xs"
      />
    );
  }

  const agentsActive = computeAgentsActive(completeness, gateway);
  const contextComplete = completeness.completeness.complete;

  if (agentsActive) {
    return (
      <div
        data-slot="completeness-chip"
        className="flex items-start gap-2 rounded-md border border-border px-2 py-2 text-xs"
      >
        <Icon icon="lucide:check" className="mt-0.5 size-3.5 shrink-0" />
        <div className="flex flex-col gap-0.5">
          <p className="font-medium">Agenci aktywni</p>
          <p className="text-muted-foreground">Można uruchamiać zadania agentowe.</p>
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
        <p className="text-muted-foreground whitespace-pre-wrap">{AGENTS_INACTIVE_COPY}</p>
        {!contextComplete ? (
          <>
            <p className="text-muted-foreground">
              Brakuje:{' '}
              {completeness.completeness.missing
                .map((section) => GATE_SECTION_LABELS[section])
                .join(', ')}
            </p>
            <Link href="/context" className="text-foreground underline-offset-4 hover:underline">
              Uzupełnij kontekst
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
}

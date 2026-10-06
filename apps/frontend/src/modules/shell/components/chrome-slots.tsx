'use client';

import { usePathname } from 'next/navigation';
import { CompletenessChip } from '@/modules/company-context/components/completeness-chip';
import { DemoChip } from '@/modules/demo/components/demo-chip';
import { FeedbackCta } from '@/modules/feedback/components/feedback-cta';
import { FloatingRunsBox } from '@/modules/runs/components/floating-runs-box';

export function CompletenessChipSlot() {
  return (
    <div className="flex flex-col gap-2">
      <DemoChip />
      <CompletenessChip />
    </div>
  );
}

export function FeedbackCtaSlot() {
  return (
    <div data-slot="feedback-cta">
      <FeedbackCta />
    </div>
  );
}

export function FloatingBoxSlot() {
  const pathname = usePathname();
  if (pathname === '/account') return null;
  return <FloatingRunsBox />;
}

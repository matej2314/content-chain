'use client';

import { usePathname } from 'next/navigation';
import { CompletenessChip } from '@/modules/company-context/components/completeness-chip';
import { FeedbackCta } from '@/modules/feedback/components/feedback-cta';
import { FloatingRunsBox } from '@/modules/runs/components/floating-runs-box';

export function CompletenessChipSlot() {
  return <CompletenessChip />;
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

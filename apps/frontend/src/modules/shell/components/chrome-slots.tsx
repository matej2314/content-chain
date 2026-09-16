'use client';

import { usePathname } from 'next/navigation';

export function CompletenessChipSlot() {
  return <div data-slot="completeness-chip" className="min-h-6" />;
}

export function FeedbackCtaSlot() {
  return <div data-slot="feedback-cta" />;
}

export function FloatingBoxSlot() {
  const pathname = usePathname();
  if (pathname === '/account') return null;
  // Faza 3: zdjąć pointer-events-none gdy box dostanie treść.
  return (
    <div
      data-slot="floating-box"
      className="pointer-events-none fixed right-4 bottom-4 z-[var(--z-overlay)] w-80 max-w-[calc(100%-2rem)]"
    />
  );
}

'use client';

import { useSearchParams } from 'next/navigation';
import type { Metadata } from 'next';
import { AcceptInviteForm } from '@/modules/auth/components/accept-invite-form';

export const metadata: Metadata = {
  title: 'Content Chain - Akceptacja zaproszenia'
}

export default function AcceptInvitePage() {
  const params = useSearchParams();
  const raw = params.get('token');
  const token = typeof raw === 'string' ? raw : Array.isArray(raw) ? (raw[0] ?? '') : '';

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <AcceptInviteForm token={token} />
    </div>
  );
}

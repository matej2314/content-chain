import type { Metadata } from 'next';
import { AcceptInviteForm } from '@/modules/auth/components/accept-invite-form';

export const metadata: Metadata = {
  title: 'Content Chain - Akceptacja zaproszenia',
};

function tokenFromSearchParam(value: string | string[] | undefined): string {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value[0] ?? '';
  return '';
}

export default async function AcceptInvitePage({
  searchParams,
}: {
  readonly searchParams: Promise<{ readonly token?: string | string[] }>;
}) {
  const query = await searchParams;
  const token = tokenFromSearchParam(query.token);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <AcceptInviteForm token={token} />
    </div>
  );
}

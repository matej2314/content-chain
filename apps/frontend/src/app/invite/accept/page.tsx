import { AcceptInviteForm } from '@/modules/auth/components/accept-invite-form';

type AcceptInvitePageProps = {
  searchParams: Promise<{ token?: string | string[] }>;
};

export default async function AcceptInvitePage({ searchParams }: AcceptInvitePageProps) {
  const params = await searchParams;
  const raw = params.token;
  const token = typeof raw === 'string' ? raw : Array.isArray(raw) ? (raw[0] ?? '') : '';

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <AcceptInviteForm token={token} />
    </div>
  );
}

import type { Metadata } from 'next';
import { AccountView } from '@/modules/runs/components/account-view';

export const metadata: Metadata = {
  title: 'Twoje konto'
}

export default function AccountPage() {
  return <AccountView />;
}

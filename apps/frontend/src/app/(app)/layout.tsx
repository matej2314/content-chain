import type { PropsWithChildren } from 'react';
import { DashboardShell } from '@/modules/shell/components/dashboard-shell';

export default function AppGroupLayout({ children }: PropsWithChildren) {
  return <DashboardShell>{children}</DashboardShell>;
}

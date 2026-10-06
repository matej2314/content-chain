'use client';

import { useSession } from '@/modules/auth/components/session-provider';
import { useDemoMode } from '@/modules/demo/components/demo-mode-provider';

export function useGuestLocked(): boolean {
  const { state: session } = useSession();
  const { state: demo } = useDemoMode();
  return (
    session.status === 'authenticated' &&
    session.user.role === 'guest' &&
    demo.status === 'ready' &&
    demo.demoMode
  );
}

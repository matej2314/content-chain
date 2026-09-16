'use client';

import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/shared/ui/sheet';
import { AppSidebar } from '@/modules/shell/components/app-sidebar';
import { FeedbackCtaSlot } from '@/modules/shell/components/chrome-slots';
import { LogoutDialog } from '@/modules/shell/components/logout-dialog';
import type { SessionUser } from '@/modules/auth/api/session.types';

type AppHeaderProps = {
  readonly user: SessionUser;
};

export function AppHeader({ user }: AppHeaderProps) {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const openLogoutRef = useRef(false);

  function handleLogoutOpenChange(open: boolean): void {
    setLogoutOpen(open);
    if (!open) {
      openLogoutRef.current = false;
    }
  }

  return (
    <header className="sticky top-0 z-(--z-chrome) flex h-12 items-center justify-end gap-2 border-b bg-background px-3">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button type="button" variant="outline" size="icon" aria-label="Otwórz nawigację">
              <Icon icon="lucide:menu" className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-56 p-0">
            <SheetTitle className="sr-only">Nawigacja</SheetTitle>
            <AppSidebar role={user.role} />
          </SheetContent>
        </Sheet>
      </div>
      <FeedbackCtaSlot />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" className="max-w-64 truncate font-normal">
            {user.email}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          onCloseAutoFocus={(event) => {
            if (openLogoutRef.current) event.preventDefault();
          }}
        >
          <DropdownMenuItem
            onSelect={() => {
              openLogoutRef.current = true;
              setLogoutOpen(true);
            }}
          >
            Wyloguj się
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutDialog open={logoutOpen} onOpenChange={handleLogoutOpenChange} />
    </header>
  );
}

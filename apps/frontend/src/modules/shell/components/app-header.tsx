'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Separator } from '@/shared/ui/separator';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/shared/ui/sheet';
import { FeedbackCtaSlot } from '@/modules/shell/components/chrome-slots';
import { LogoutDialog } from '@/modules/shell/components/logout-dialog';
import { navItemsForRole } from '@/modules/shell/nav';
import type { SessionUser } from '@/modules/auth/api/session.types';
import { cn } from '@/shared/utils/utils';

type AppHeaderProps = {
  readonly user: SessionUser;
};

export function AppHeader({ user }: AppHeaderProps) {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const openLogoutRef = useRef(false);
  const pathname = usePathname();
  const items = navItemsForRole(user.role);

  function handleLogoutOpenChange(open: boolean): void {
    setLogoutOpen(open);
    if (!open) {
      openLogoutRef.current = false;
    }
  }

  function openLogout(): void {
    openLogoutRef.current = true;
    setMobileMenuOpen(false);
    setLogoutOpen(true);
  }

  return (
    <header className="sticky top-0 z-(--z-chrome) flex h-12 items-center border-b bg-background px-3">
      <span className="text-sm font-medium lg:hidden">Content Chain</span>
      <div className="ml-auto flex items-center gap-2">
        <FeedbackCtaSlot />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="hidden max-w-64 truncate font-normal lg:flex"
            >
              {user.email}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            onCloseAutoFocus={(event) => {
              if (openLogoutRef.current) event.preventDefault();
            }}
          >
            <DropdownMenuItem onSelect={openLogout}>Wyloguj się</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <LogoutDialog open={logoutOpen} onOpenChange={handleLogoutOpenChange} />

        <div className="shrink-0 lg:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button type="button" variant="outline" size="icon" aria-label="Otwórz nawigację">
                <Icon icon="lucide:menu" className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-44 p-0 sm:w-48">
              <SheetTitle className="sr-only">Nawigacja</SheetTitle>

              <aside className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
                <div className="px-3 py-3">
                  <p className="truncate text-sm font-medium">{user.email}</p>
                </div>
                <Separator />

                <nav className="flex flex-1 flex-col gap-0.5 p-2">
                  {items.map((item) => {
                    const active =
                      pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                          active
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                            : 'hover:bg-sidebar-accent/70',
                        )}
                      >
                        <Icon icon={item.icon} className="size-4 shrink-0" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                <Separator />
                <div className="p-2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full justify-start text-sm"
                    onClick={openLogout}
                  >
                    Wyloguj się
                  </Button>
                </div>
              </aside>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { Separator } from '@/shared/ui/separator';
import { CompletenessChipSlot } from '@/modules/shell/components/chrome-slots';
import { navItemsForRole } from '@/modules/shell/nav';
import type { UserRole } from '@content-chain/shared';
import { cn } from '@/shared/utils/utils';

type AppSidebarProps = {
  readonly role: UserRole;
};

export function AppSidebar({ role }: AppSidebarProps) {
  const pathname = usePathname();
  const items = navItemsForRole(role);

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="px-3 py-3">
        <p className="text-sm font-medium">Content Chain</p>
      </div>
      <Separator />
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
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
      <div className="p-2">
        <CompletenessChipSlot />
      </div>
    </aside>
  );
}

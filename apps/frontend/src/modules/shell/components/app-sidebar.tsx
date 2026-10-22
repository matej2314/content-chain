'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { CompletenessChipSlot } from '@/modules/shell/components/chrome-slots';
import { SidebarBrandMark } from '@/modules/shell/components/sidebar-brand-mark';
import { navItemsForRole } from '@/modules/shell/nav';
import { sidebarNavItemClassName } from '@/modules/shell/sidebar-nav-item';
import type { UserRole } from '@content-chain/shared';

type AppSidebarProps = {
  readonly role: UserRole;
};

export function AppSidebar({ role }: AppSidebarProps) {
  const pathname = usePathname();
  const items = navItemsForRole(role);

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center border-b border-sidebar-border px-3">
        <SidebarBrandMark />
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 overflow-visible px-8 py-4">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={active ? 'true' : undefined}
              className={sidebarNavItemClassName()}
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

import { cn } from '@/shared/utils/utils';

/**
 * Klasy pozycji menu sidebara (F-14 / Faza 23).
 * Stany visual: `.sidebar-nav-item` + `data-active` w globals.css.
 */
export function sidebarNavItemClassName(className?: string): string {
  return cn('sidebar-nav-item', className);
}

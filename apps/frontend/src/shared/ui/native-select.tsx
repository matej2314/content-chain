import * as React from 'react';
import { cn } from '@/shared/utils/utils';

function NativeSelect({ className, ...props }: React.ComponentProps<'select'>) {
  return (
    <select
      data-slot="select"
      className={cn(
        'h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 text-base outline-none transition-colors focus-visible:border-[#63b8a3] focus-visible:ring-3 focus-visible:ring-[#63b8a3]/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 md:text-sm dark:bg-input/30 [&_option:last-child]:rounded-b-lg',
        className,
      )}
      {...props}
    />
  );
}

export { NativeSelect };

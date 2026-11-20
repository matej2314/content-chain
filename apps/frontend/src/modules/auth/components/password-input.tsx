'use client';

import { useState, type ComponentProps } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/utils/utils';

type PasswordInputProps = Omit<ComponentProps<typeof Input>, 'type'>;

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        type={visible ? 'text' : 'password'}
        className={cn('pr-9', className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        className="absolute top-1/2 right-1 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        aria-label={visible ? 'Ukryj hasło' : 'Pokaż hasło'}
        aria-pressed={visible}
        onClick={() => setVisible((current) => !current)}
      >
        <Icon
          icon={visible ? 'lucide:eye-off' : 'lucide:eye'}
          className="size-3.5"
          aria-hidden
        />
      </Button>
    </div>
  );
}

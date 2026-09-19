'use client';

import { Toaster as Sonner, type ToasterProps } from 'sonner';

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="light"
      position="top-right"
      richColors={false}
      closeButton={false}
      offset={{ top: '4.5rem', right: '1rem' }}
      style={{ zIndex: 'var(--z-toast)' }}
      className="toaster"
      toastOptions={{
        classNames: {
          toast: 'border-border bg-card text-foreground shadow-none',
          title: 'text-sm font-medium',
          description: 'text-sm text-muted-foreground',
        },
      }}
      {...props}
    />
  );
}

export { Toaster };

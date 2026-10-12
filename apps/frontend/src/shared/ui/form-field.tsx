import type { ReactNode } from 'react';
import { cn } from '@/shared/utils/utils';
import { Label } from '@/shared/ui/label';

type FormFieldProps = {
  readonly label: string;
  readonly htmlFor: string;
  readonly children: ReactNode;
  readonly hint?: string;
  readonly error?: string;
  readonly className?: string;
};

export function FormField({ label, htmlFor, children, hint, error, className }: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-2 mb-2', className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function EnvelopeError({
  code,
  message,
  className,
}: {
  readonly code: string;
  readonly message: string;
  readonly className?: string;
}) {
  return (
    <p className={cn('text-sm text-destructive', className)} role="alert">
      <span className="font-medium font-mono text-xs tabular-nums">{code}</span>
      {': '}
      {message}
    </p>
  );
}

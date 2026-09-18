'use client';

import {
    formatIsoDateTime,
    type DateTimeDisplayKind,
} from './format-iso-datetime';

export type IsoDateTimeProps = {
    readonly iso: string;
    readonly kind?: DateTimeDisplayKind;
    readonly className?: string;
};

export function IsoDateTime({ iso, kind = 'list', className }: IsoDateTimeProps) {
    return (
        <time dateTime={iso} suppressHydrationWarning className={className}>
            {formatIsoDateTime(iso, kind)}
        </time>
    )
}
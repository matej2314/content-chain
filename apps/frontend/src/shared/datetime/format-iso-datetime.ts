export type DateTimeDisplayKind = 'list' | 'log';

const LOCALE = 'pl-PL';

const LIST_FORMAT = new Intl.DateTimeFormat(LOCALE, {
  dateStyle: 'short',
  timeStyle: 'short',
});

const LOG_FORMAT = new Intl.DateTimeFormat(LOCALE, {
  dateStyle: 'short',
  timeStyle: 'medium',
});

export function formatIsoDateTime(iso: string, kind: DateTimeDisplayKind = 'list'): string {
  if (iso.length === 0) return iso;
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return iso;
  return kind === 'log' ? LOG_FORMAT.format(ms) : LIST_FORMAT.format(ms);
}

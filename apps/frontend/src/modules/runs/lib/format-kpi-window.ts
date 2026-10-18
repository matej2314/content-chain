const DATE_FORMAT = new Intl.DateTimeFormat('pl-PL', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

/** np. `15.06.2026–14.07.2026` (docs UX). */
export function formatKpiWindow(windowFrom: string, windowTo: string): string {
  const fromMs = Date.parse(windowFrom);
  const toMs = Date.parse(windowTo);
  if (Number.isNaN(fromMs) || Number.isNaN(toMs)) {
    return `${windowFrom}–${windowTo}`;
  }
  return `${DATE_FORMAT.format(fromMs)}–${DATE_FORMAT.format(toMs)}`;
}

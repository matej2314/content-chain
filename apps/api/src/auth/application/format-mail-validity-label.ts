/**
 * Builds PL validity copy for invite/activation mails from TTL env strings.
 * Units mirror `parseTtlMs` (`d` / `h` / `m` / default seconds).
 * Returns the full sentence with locative after "po" (e.g. 7d → "… po 7 dniach.").
 * Templates must only inject the result — no env / TTL parsing in templates.
 */
export function formatMailValidityLabel(ttl: string): string {
  const unit = ttl.at(-1);
  const rawValue = ttl.slice(0, -1);
  const value = Number.parseInt(rawValue, 10);
  const amount = Number.isFinite(value) ? value : Number.NaN;

  let human: string;
  if (unit === 'd' && Number.isFinite(amount) && amount >= 0) {
    // Locative: 1 → dniu; 2+ → dniach (few/many identical in locative plural).
    human = `${amount} ${polishPlural(amount, 'dniu', 'dniach', 'dniach')}`;
  } else if (unit === 'h' && Number.isFinite(amount) && amount >= 0) {
    human = `${amount} ${polishPlural(amount, 'godzinie', 'godzinach', 'godzinach')}`;
  } else if (unit === 'm' && Number.isFinite(amount) && amount >= 0) {
    human = `${amount} ${polishPlural(amount, 'minucie', 'minutach', 'minutach')}`;
  } else {
    // Bare seconds (whole string), including single-digit TTL like "1".
    const seconds = Number.parseInt(ttl, 10);
    human =
      Number.isFinite(seconds) && seconds >= 0
        ? `${seconds} ${polishPlural(seconds, 'sekundzie', 'sekundach', 'sekundach')}`
        : ttl;
  }

  return `Link jest jednorazowy i wygasa po ${human}.`;
}

function polishPlural(
  amount: number,
  one: string,
  few: string,
  many: string,
): string {
  const abs = Math.abs(amount);
  if (abs === 1) return one;
  const mod10 = abs % 10;
  const mod100 = abs % 100;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return few;
  }

  return many;
}

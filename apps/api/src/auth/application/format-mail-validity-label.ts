/**
 * Builds PL validity copy for invite/activation mails from TTL env strings.
 * Units mirror `parseTtlMs` (`d` / `h` / `m` / default seconds).
 * Templates must only inject the result — no env / TTL parsing in templates.
 */
export function formatMailValidityLabel(ttl: string): string {
  const unit = ttl.at(-1);
  const rawValue = ttl.slice(0, -1);
  const value = Number.parseInt(rawValue, 10);
  const amount = Number.isFinite(value) ? value : Number.NaN;

  let human: string;
  if (!Number.isFinite(amount) || amount < 0) {
    human = ttl;
  } else if (unit === 'd') {
    human = `${amount} ${polishPlural(amount, 'dzień', 'dni', 'dni')}`;
  } else if (unit === 'h') {
    human = `${amount} ${polishPlural(amount, 'godzinę', 'godziny', 'godzin')}`;
  } else if (unit === 'm') {
    human = `${amount} ${polishPlural(amount, 'minutę', 'minuty', 'minut')}`;
  } else {
    // parseTtlMs default: treat whole string as seconds when unit unknown
    const seconds = Number.parseInt(ttl, 10);
    const s = Number.isFinite(seconds) ? seconds : amount;
    human = Number.isFinite(s)
      ? `${s} ${polishPlural(s, 'sekundę', 'sekundy', 'sekund')}`
      : ttl;
  }

  return `Link wygasa po ${human}.`;
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

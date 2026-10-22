import { formatMailValidityLabel } from './format-mail-validity-label';

describe('formatMailValidityLabel', () => {
  it('formats 7d as full sentence with locative days', () => {
    expect(formatMailValidityLabel('7d')).toBe(
      'Link jest jednorazowy i wygasa po 7 dniach.',
    );
  });

  it('formats 1d as singular locative day', () => {
    expect(formatMailValidityLabel('1d')).toBe(
      'Link jest jednorazowy i wygasa po 1 dniu.',
    );
  });

  it('formats hours and minutes with PL locative', () => {
    expect(formatMailValidityLabel('2h')).toBe(
      'Link jest jednorazowy i wygasa po 2 godzinach.',
    );
    expect(formatMailValidityLabel('1h')).toBe(
      'Link jest jednorazowy i wygasa po 1 godzinie.',
    );
    expect(formatMailValidityLabel('5m')).toBe(
      'Link jest jednorazowy i wygasa po 5 minutach.',
    );
    expect(formatMailValidityLabel('1m')).toBe(
      'Link jest jednorazowy i wygasa po 1 minucie.',
    );
  });

  it('formats bare seconds with PL locative', () => {
    expect(formatMailValidityLabel('30')).toBe(
      'Link jest jednorazowy i wygasa po 30 sekundach.',
    );
    expect(formatMailValidityLabel('1')).toBe(
      'Link jest jednorazowy i wygasa po 1 sekundzie.',
    );
  });

  it('does not use "po upływie" workaround', () => {
    expect(formatMailValidityLabel('7d')).not.toContain('upływie');
  });
});

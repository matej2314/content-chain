import { formatMailValidityLabel } from './format-mail-validity-label';

describe('formatMailValidityLabel', () => {
  it('formats 7d as PL days', () => {
    expect(formatMailValidityLabel('7d')).toBe('Link wygasa po 7 dni.');
  });

  it('formats 1d as singular day', () => {
    expect(formatMailValidityLabel('1d')).toBe('Link wygasa po 1 dzień.');
  });

  it('formats hours and minutes with PL inflection', () => {
    expect(formatMailValidityLabel('2h')).toBe('Link wygasa po 2 godziny.');
    expect(formatMailValidityLabel('1h')).toBe('Link wygasa po 1 godzinę.');
    expect(formatMailValidityLabel('5m')).toBe('Link wygasa po 5 minut.');
  });
});

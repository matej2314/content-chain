/**
 * Inline hex for transactional mail shell.
 * Roles mapped from apps/frontend/src/app/globals.css (dark shell / primary / CTA).
 * Clients do not honor CSS variables - values are frozen at render time.
 */
export const MAIL_PALETTE = {
  background: '#10101c',
  foreground: '#e7e7ee',
  mutedForeground: '#a3a3b1',
  panel: '#272735',
  primary: '#8776ff',
  ctaBackground: '#39a185',
  ctaForeground: '#0b1f1a',
} as const;

export type MailPalette = typeof MAIL_PALETTE;

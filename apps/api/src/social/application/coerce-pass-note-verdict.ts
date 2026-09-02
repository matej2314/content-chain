import type { VerifierVerdict } from '../domain/social.types';

const PASS_NOTE =
  /\bpass\b|nie jest błędem|to nie jest błąd|poprawne mapowanie|brak (problemu|zarzut)|w granicach oferty|\bpoprawne\b/i;

const REJECT_PHRASE =
  /odwrócony sens|spoza (json|kontekstu)|nie mapuje|wymyśl|nowa (liczba|usługa|rodzina)|odrzu[ct]|nie występuje|zmienia sens|clickbait|inna akcja|dwie sprzeczne/i;

export function isPassOnlyIssue(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length === 0) return false;
  if (REJECT_PHRASE.test(trimmed)) return false;
  return PASS_NOTE.test(trimmed);
}

export function coercePassNoteVerdict(verdict: VerifierVerdict): {
  verdict: VerifierVerdict;
  coerced: boolean;
} {
  if (verdict.ok) {
    return { verdict, coerced: false };
  }
  const issues = [...verdict.contextIssues, ...verdict.languageIssues];
  if (issues.length === 0) {
    return { verdict, coerced: false };
  }
  if (!issues.every(isPassOnlyIssue)) {
    return { verdict, coerced: false };
  }
  return {
    verdict: { ok: true, contextIssues: [], languageIssues: [] },
    coerced: true,
  };
}

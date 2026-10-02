import { ApiError } from '@/shared/api/envelope';

export type AcceptInviteFormError = {
  readonly code: string;
  readonly message: string;
};

/** Jednolity copy PL dla każdego 401 na accept-invite — bez rozróżniania przyczyn. */
export const ACCEPT_INVITE_UNAUTHORIZED_HINT =
  'Nie można dokończyć zaproszenia. Skontaktuj się z administratorem.';

/**
 * Mapuje błąd accept-invite na envelope karty.
 * Anti-enumeration (Faza 11 / A-7b): bez gałęzi CONFLICT / „email zajęty”.
 * Kolizja email i zły token = ten sam kanał 401 — copy PL nadpisuje KROK 2.
 */
export function toAcceptInviteFormError(reason: unknown): AcceptInviteFormError {
  if (reason instanceof ApiError) {
    // Świadomie: brak branchy na status 409 / code CONFLICT / message „already in use”.
    if (reason.status === 401 || reason.envelope.code === 'UNAUTHORIZED') {
      return {
        code: reason.envelope.code,
        message: ACCEPT_INVITE_UNAUTHORIZED_HINT,
      };
    }
    return {
      code: reason.envelope.code,
      message: reason.envelope.message,
    };
  }
  return {
    code: 'INTERNAL_ERROR',
    message: 'Nie udało się odczytać odpowiedzi.',
  };
}

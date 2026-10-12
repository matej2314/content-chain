import { ApiError } from '@/shared/api/envelope';

export type AcceptInviteFormError = {
  readonly code: string;
  readonly message: string;
};

export const ACCEPT_INVITE_UNAUTHORIZED_HINT =
  'Nie można dokończyć zaproszenia. Skontaktuj się z administratorem.';

export function toAcceptInviteFormError(reason: unknown): AcceptInviteFormError {
  if (reason instanceof ApiError) {
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

import { ApiError } from '@/shared/api/envelope';

export type RegisterFieldErrors = {
  readonly email?: string;
  readonly password?: string;
  readonly form?: { readonly code: string; readonly message: string };
};

/**
 * Mapuje błąd register na pola formularza.
 * Kolizja email (409 CONFLICT) → wyłącznie pole email (F-4b).
 * 400 VALIDATION_FAILED → envelope przy haśle / formie (as-is).
 */
export function toRegisterFieldErrors(reason: unknown): RegisterFieldErrors {
  if (reason instanceof ApiError) {
    if (reason.status === 409 || reason.envelope.code === 'CONFLICT') {
      return { email: reason.envelope.message };
    }
    if (reason.envelope.code === 'VALIDATION_FAILED') {
      return {
        password: reason.envelope.message,
        form: { code: reason.envelope.code, message: reason.envelope.message },
      };
    }
    return {
      form: { code: reason.envelope.code, message: reason.envelope.message },
    };
  }
  return {
    form: {
      code: 'INTERNAL_ERROR',
      message: 'Nie udało się odczytać odpowiedzi.',
    },
  };
}

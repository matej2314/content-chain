import { DomainException } from '../../shared/exceptions/domain.exception';

const MIN_LENGTH = 12;
const MAX_BYTES = 72;
const HAS_DIGIT = /\d/;
const HAS_UPPERCASE = /[A-Z]/;
const HAS_SPECIAL = /[!@#$%^&*()\-_=+[\]{}|;:,.<>?]/;

export function validatePasswordPolicy(plain: string): void {
  if (plain.length < MIN_LENGTH) {
    throw new DomainException(
      'VALIDATION_FAILED',
      `Password must be at least ${MIN_LENGTH} characters long`,
      400,
    );
  }
  if (Buffer.byteLength(plain, 'utf-8') > MAX_BYTES) {
    throw new DomainException(
      'VALIDATION_FAILED',
      `Password must not exceed ${MAX_BYTES} bytes`,
      400,
    );
  }
  if (!HAS_DIGIT.test(plain)) {
    throw new DomainException(
      'VALIDATION_FAILED',
      'Password must contain at least one digit',
      400,
    );
  }
  if (!HAS_UPPERCASE.test(plain)) {
    throw new DomainException(
      'VALIDATION_FAILED',
      'Password must contain at least one uppercase letter',
      400,
    );
  }
  if (!HAS_SPECIAL.test(plain)) {
    throw new DomainException(
      'VALIDATION_FAILED',
      'Password must contain at least one special character',
      400,
    );
  }
}

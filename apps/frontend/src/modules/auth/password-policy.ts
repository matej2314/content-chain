const SPECIAL = /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/;

export function passwordMeetsPolicy(password: string): boolean {
  return (
    password.length >= 12 &&
    /\d/.test(password) &&
    /[A-Z]/.test(password) &&
    SPECIAL.test(password)
  );
}

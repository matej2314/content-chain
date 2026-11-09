/** Envelope `code` for POST /runs when per-user in-flight cap is hit (HTTP 409). */
export const USER_IN_FLIGHT_LIMIT_EXCEEDED = 'USER_IN_FLIGHT_LIMIT_EXCEEDED' as const;

export type UserInFlightLimitCode = typeof USER_IN_FLIGHT_LIMIT_EXCEEDED;

export function isUserInFlightLimitCode(code: string): code is UserInFlightLimitCode {
  return code === USER_IN_FLIGHT_LIMIT_EXCEEDED;
}

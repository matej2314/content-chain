import { toGatewayErrorCodeLabel } from './gateway-error-code';

describe('toGatewayErrorCodeLabel', () => {
  it('passes through an allowlisted gateway code', () => {
    expect(toGatewayErrorCodeLabel('RATE_LIMITED')).toBe('RATE_LIMITED');
  });

  it('maps a free-form message to UNKNOWN', () => {
    expect(toGatewayErrorCodeLabel('Rate limit exceeded for org-x')).toBe(
      'UNKNOWN',
    );
  });

  it('maps undefined and empty string to UNKNOWN', () => {
    expect(toGatewayErrorCodeLabel(undefined)).toBe('UNKNOWN');
    expect(toGatewayErrorCodeLabel('')).toBe('UNKNOWN');
  });
});

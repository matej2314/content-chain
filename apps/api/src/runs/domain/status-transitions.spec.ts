import { assertTransition, canTransition } from './status-transitions';
import { DomainException } from '../../shared/exceptions/domain.exception';

describe('assertTransition', () => {
  it('allows queued => running', () => {
    expect(() => assertTransition('queued', 'running')).not.toThrow();
  });

  it('rejects completed => running with CONFLICT', () => {
    try {
      assertTransition('completed', 'running');
      fail('expected DomainException');
    } catch (error) {
      expect(error).toBeInstanceOf(DomainException);
      expect(error).toMatchObject({
        code: 'CONFLICT',
        httpStatus: 409,
        details: [{ from: 'completed', to: 'running' }],
      });
    }
  });

  it('rejects awaiting_hitl => failed', () => {
    expect(canTransition('awaiting_hitl', 'failed')).toBe(false);
    expect(() => assertTransition('awaiting_hitl', 'failed')).toThrow(
      DomainException,
    );
  });

  it('allows running => awaiting_hitl and running => failed', () => {
    expect(canTransition('running', 'awaiting_hitl')).toBe(true);
    expect(() => assertTransition('running', 'completed')).toBe(true);
    expect(canTransition('running', 'failed')).toBe(true);
  });
});

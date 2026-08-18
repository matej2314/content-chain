import { assertTransition, canTransition } from './status-transitions';
import { isRunStatus, RUN_STATUSES } from '@content-chain/shared';
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

  it('allows running => awaiting_hitl, completed and failed', () => {
    expect(canTransition('running', 'awaiting_hitl')).toBe(true);
    expect(canTransition('running', 'completed')).toBe(true);
    expect(canTransition('running', 'failed')).toBe(true);
    expect(() => assertTransition('running', 'completed')).not.toThrow();
  });

  it('exports interrupted in RUN_STATUSES', () => {
    expect(isRunStatus('interrupted')).toBe(true);
    expect(RUN_STATUSES).toContain('interrupted');
  });

  it('allows running => interrupted and interrupted => running | failed', () => {
    expect(canTransition('running', 'interrupted')).toBe(true);
    expect(canTransition('interrupted', 'running')).toBe(true);
    expect(canTransition('interrupted', 'failed')).toBe(true);
    expect(() => assertTransition('running', 'interrupted')).not.toThrow();
  });

  it('rejects interrupted => queued and awaiting_hitl => interrupted', () => {
    expect(canTransition('interrupted', 'queued')).toBe(false);
    expect(canTransition('awaiting_hitl', 'interrupted')).toBe(false);
    for (const [from, to] of [
      ['interrupted', 'queued'],
      ['awaiting_hitl', 'interrupted'],
    ] as const) {
      try {
        assertTransition(from, to);
        fail('expected DomainException');
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error).toMatchObject({
          code: 'CONFLICT',
          httpStatus: 409,
          details: [{ from, to }],
        });
      }
    }
  });
});

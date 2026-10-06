import { isRecord } from '@/shared/api/envelope';

export type AppConfig = {
  readonly demoMode: boolean;
};

export function parseAppConfig(value: unknown): AppConfig {
  if (!isRecord(value)) {
    throw new Error('Invalid config payload');
  }
  if (typeof value.demoMode !== 'boolean') {
    throw new Error('Invalid demoMode value');
  }
  const keys = Object.keys(value);
  if (keys.length !== 1 || keys[0] !== 'demoMode') {
    throw new Error('Invalid config extra fields.');
  }
  return { demoMode: value.demoMode };
}

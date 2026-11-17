import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { MODULE_METADATA } from '@nestjs/common/constants';
import { AutoFinalizeExpiredReviewsUseCase, RecoverInterruptedRunsUseCase, RunExecutePump } from '@content-chain/runs-kernel';


import { RunsModule } from './runs.module';

function providerToken(provider: unknown): unknown {
  if (typeof provider === 'function') return provider;
  if (typeof provider === 'object' && provider !== null && 'provide' in provider) {
    return (provider as { provide: unknown }).provide;
  }
  return provider;
}

function walkTsFiles(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      walkTsFiles(full, out);
      continue;
    }
    if (name.endsWith('.ts')) out.push(full);
  }
  return out;
}

describe('RunsModule api atomic cut (FAZA 2 / KROK 3)', () => {
  it('does not provide pump / recover / auto-finalize on HTTP RunsModule', () => {
    const providers =
      (Reflect.getMetadata(MODULE_METADATA.PROVIDERS, RunsModule) as
        | unknown[]
        | undefined) ?? [];
    const tokens = new Set(providers.map(providerToken));

    expect(tokens.has(RunExecutePump)).toBe(false);
    expect(tokens.has(RecoverInterruptedRunsUseCase)).toBe(false);
    expect(tokens.has(AutoFinalizeExpiredReviewsUseCase)).toBe(false);
  });

  it('D6: no static import from pg-boss in apps/api or apps/worker src', () => {
    const roots = [
      join(__dirname, '..'),
      join(__dirname, '..', '..', '..', 'worker', 'src'),
    ];
    const staticImport = /\bfrom\s+['"]pg-boss['"]/;
    const offenders: string[] = [];
    for (const root of roots) {
      for (const file of walkTsFiles(root)) {
        const withoutComments = readFileSync(file, 'utf8')
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/^\s*\/\/.*$/gm, '');
        if (staticImport.test(withoutComments)) offenders.push(file);
      }
    }
    expect(offenders).toEqual([]);
  });
});

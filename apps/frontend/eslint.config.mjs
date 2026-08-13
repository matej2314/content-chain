import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

/**
 * Wzorce zsynchronizowane z root `.eslintrc.cjs` (no-restricted-imports).
 * Frontend nie importuje źródeł api/gateway/shared ścieżką względną.
 */
const monorepoRestrictedImportPatterns = [
  {
    group: ['**/packages/shared', '**/packages/shared/**'],
    message:
      'Importuj @content-chain/shared nazwą pakietu, nie ścieżką względną (SPEC-MONOREPO M-4).',
  },
  {
    group: ['**/apps/api', '**/apps/api/**'],
    message: 'Nie importuj źródeł apps/api — komunikacja tylko HTTP (SPEC-MONOREPO M-4).',
  },
  {
    group: ['**/apps/ai-provider-gateway', '**/apps/ai-provider-gateway/**'],
    message:
      'Nie importuj źródeł apps/ai-provider-gateway — komunikacja tylko HTTP (SPEC-MONOREPO M-4).',
  },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-restricted-imports': ['error', { patterns: monorepoRestrictedImportPatterns }],
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'next-env.d.ts',
    'node_modules/**',
  ]),
]);

export default eslintConfig;

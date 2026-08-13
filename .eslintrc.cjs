/** @type {import('@typescript-eslint/utils').TSESLint.Linter.Config} */

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
  {
    group: ['**/apps/frontend', '**/apps/frontend/**'],
    message: 'Nie importuj źródeł apps/frontend z innego pakietu.',
  },
];

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    projectService: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
    'no-restricted-imports': ['error', { patterns: monorepoRestrictedImportPatterns }],
  },
  ignorePatterns: [
    'dist/',
    '.next/',
    'node_modules/',
    'build/',
    'coverage/',
    'coverage-security/',
    'coverage-cli/',
    // Next i gateway mają własne eslint.config.mjs (flat); root nie dubluje ich presetów
    'apps/frontend/',
    'apps/ai-provider-gateway/',
  ],
  overrides: [
    {
      files: ['*.js', '*.cjs', '*.mjs'],
      env: { node: true },
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      rules: {
        '@typescript-eslint/consistent-type-imports': 'off',
      },
    },
    {
      files: ['packages/shared/**/*.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'zod',
                message: 'packages/shared bez runtime walidatorów (SPEC-MONOREPO M-5).',
              },
              {
                name: '@prisma/client',
                message: 'packages/shared bez Prisma (SPEC-MONOREPO M-5).',
              },
              {
                name: 'next',
                message: 'packages/shared bez Next (SPEC-MONOREPO M-5).',
              },
              {
                name: 'react',
                message: 'packages/shared bez React (SPEC-MONOREPO M-5).',
              },
            ],
            patterns: [
              ...monorepoRestrictedImportPatterns,
              {
                group: ['@nestjs/*', 'zod/*', 'next/*'],
                message: 'packages/shared bez Nest/Zod/Next (SPEC-MONOREPO M-5).',
              },
            ],
          },
        ],
      },
    },
    {
      files: ['apps/api/**/*.ts'],
      rules: {
        '@typescript-eslint/unbound-method': 'warn',
      },
    },
    {
      files: ['**/*.spec.ts', '**/*.test.ts', '**/test/**/*.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/unbound-method': 'off',
      },
    },
  ],
};

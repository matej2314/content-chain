#!/usr/bin/env node
'use strict';

import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { isCi } = require('./e2e-env.cjs');

const here = dirname(fileURLToPath(import.meta.url));
const apiRoot = join(here, '..');
const dbScript = join(here, 'e2e-db.mjs');

/**
 * @param {string} command
 * @param {string[]} args
 * @returns {number}
 */
function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: apiRoot,
    stdio: 'inherit',
    env: process.env,
  });
  if (result.error) {
    console.error(result.error.message);
    return 1;
  }
  return result.status ?? 1;
}

const ci = isCi();
let exitCode = 0;

try {
  if (!ci) {
    exitCode = run(process.execPath, [dbScript, 'up']);
    if (exitCode !== 0) {
      throw new Error('e2e db up failed');
    }
  }

  exitCode = run(process.execPath, [dbScript, 'migrate']);
  if (exitCode !== 0) {
    throw new Error('e2e migrate failed');
  }

  exitCode = run(
    join(apiRoot, 'node_modules', '.bin', 'jest'),
    ['--config', './test/jest-e2e.json', ...process.argv.slice(2)],
  );
} catch {
  if (exitCode === 0) {
    exitCode = 1;
  }
} finally {
  // Lokalnie zawsze down -v (także gdy up/migrate/jest padnie).
  // npm pretest/posttest tego nie gwarantuje przy failu pretest.
  if (!ci) {
    const downCode = run(process.execPath, [dbScript, 'down']);
    if (exitCode === 0 && downCode !== 0) {
      exitCode = downCode;
    }
  }
}

process.exit(exitCode);

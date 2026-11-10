#!/usr/bin/env node
'use strict';

import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {
  apiRoot,
  repoRoot,
  e2eEnvPath,
  composeFile,
  composeProject,
  isCi,
  loadDotEnv,
  assertTestDatabaseUrl,
} = require('./e2e-env.cjs');

const action = process.argv[2];

function fail(message) {
  console.error(`[e2e-db] ${message}`);
  process.exit(1);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    ...options,
  });
  if (result.error) {
    fail(result.error.message);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function loadLocalE2eEnv() {
  if (!loadDotEnv(e2eEnvPath, { override: true })) {
    fail(
      `Missing ${e2eEnvPath}. Copy apps/api/.env.test.example → apps/api/.env.test and adjust values.`,
    );
  }
  assertTestDatabaseUrl(process.env.DATABASE_URL, { ci: false });
}

function compose(args) {
  run(
    'docker',
    [
      'compose',
      '-p',
      composeProject,
      '--env-file',
      e2eEnvPath,
      '-f',
      composeFile,
      ...args,
    ],
    { cwd: repoRoot },
  );
}

function migrate() {
  assertTestDatabaseUrl(process.env.DATABASE_URL, { ci: isCi() });
  run(
    process.execPath,
    [require.resolve('prisma/build/index.js'), 'migrate', 'deploy'],
    {
      cwd: apiRoot,
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL,
        CHECKPOINT_DISABLE: '1',
        PRISMA_HIDE_UPDATE_MESSAGE: '1',
      },
    },
  );
}

if (!action || !['up', 'down', 'migrate'].includes(action)) {
  fail('Usage: node test/e2e-db.mjs <up|down|migrate>');
}

if (isCi()) {
  if (action === 'migrate') {
    assertTestDatabaseUrl(process.env.DATABASE_URL, { ci: true });
    migrate();
  } else {
    console.log(`[e2e-db] CI detected — skipping compose ${action}`);
  }
  process.exit(0);
}

if (action === 'up') {
  loadLocalE2eEnv();
  compose(['up', '-d', '--wait']);
  process.exit(0);
}

if (action === 'down') {
  if (!loadDotEnv(e2eEnvPath, { override: true })) {
    console.warn(
      `[e2e-db] ${e2eEnvPath} missing — attempting compose down anyway`,
    );
  }
  compose(['down', '-v', '--remove-orphans']);
  process.exit(0);
}

loadLocalE2eEnv();
migrate();

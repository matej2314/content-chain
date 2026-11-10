'use strict';

const { existsSync, readFileSync } = require('fs');
const { join } = require('path');

const apiRoot = join(__dirname, '..');
const repoRoot = join(__dirname, '..', '..', '..');
const e2eEnvPath = join(apiRoot, '.env.test');
const composeFile = join(repoRoot, 'docker-compose.test.yml');
const composeProject = 'cc-api-e2e';

function isCi() {
  return process.env.CI === 'true' || process.env.CI === '1';
}

/**
 * @param {string} filePath
 * @param {{ override?: boolean }} [options]
 */
function loadDotEnv(filePath, options = {}) {
  const override = options.override === true;
  if (!existsSync(filePath)) {
    return false;
  }
  const text = readFileSync(filePath, 'utf8');
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (line.length === 0 || line.startsWith('#')) {
      continue;
    }
    const eq = line.indexOf('=');
    if (eq <= 0) {
      continue;
    }
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (override || process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
  return true;
}

/**
 * @param {string} databaseUrl
 * @param {{ ci?: boolean }} [options]
 */
function assertTestDatabaseUrl(databaseUrl, options = {}) {
  const ci = options.ci === true;
  if (typeof databaseUrl !== 'string' || databaseUrl.trim().length === 0) {
    throw new Error('DATABASE_URL is required for api e2e');
  }
  let parsed;
  try {
    parsed = new URL(databaseUrl);
  } catch {
    throw new Error(`DATABASE_URL is not a valid URL: ${databaseUrl}`);
  }
  if (parsed.protocol !== 'postgresql:' && parsed.protocol !== 'postgres:') {
    throw new Error(
      `DATABASE_URL must use postgresql:// (got ${parsed.protocol})`,
    );
  }
  const dbName = decodeURIComponent(parsed.pathname.replace(/^\//, '')).split(
    '/',
  )[0];
  if (!dbName.endsWith('_test')) {
    throw new Error(
      `DATABASE_URL database name must end with _test (got "${dbName}")`,
    );
  }
  if (!ci) {
    const port = parsed.port || '5432';
    if (port !== '5433') {
      throw new Error(
        `Local e2e DATABASE_URL must use host port 5433 (got ${port}). Refusing to touch other Postgres instances.`,
      );
    }
  }
}

module.exports = {
  apiRoot,
  repoRoot,
  e2eEnvPath,
  composeFile,
  composeProject,
  isCi,
  loadDotEnv,
  assertTestDatabaseUrl,
};

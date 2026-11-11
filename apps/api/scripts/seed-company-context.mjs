import {spawnSync} from 'node:child_process';
import { existsSync } from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const apiRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const entry = join(apiRoot, 'dist', 'seed', 'seed-company-context.cli.js');

if(!existsSync(entry)) {
    console.error(
        `[seed-company-context] Missing ${entry}, Run pnpm --filter api build`,
    );
    process.exit(1);
}

const result = spawnSync(process.execPath, [entry], {
    cwd: apiRoot,
    stdio: 'inherit',
    env: process.env,
});

process.exit(result.status ?? 1);
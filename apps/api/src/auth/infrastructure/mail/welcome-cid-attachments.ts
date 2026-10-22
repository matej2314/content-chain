import { join } from 'node:path';
import type { MailCidAttachment } from './templates/user-invited.template';

/**
 * Inline CID assets for user_welcome — paths resolved relative to this module
 * (works from src/ and from dist/ when nest-cli copies assets).
 */
const ASSETS_DIR = join(__dirname, 'assets', 'welcome');

export const WELCOME_CID = {
  login: 'welcome-login@content-chain',
  runs: 'welcome-runs@content-chain',
} as const;

export function resolveWelcomeCidAttachments(): readonly MailCidAttachment[] {
  return [
    {
      filename: 'welcome-login.png',
      path: join(ASSETS_DIR, 'welcome-login.png'),
      cid: WELCOME_CID.login,
    },
    {
      filename: 'welcome-runs.png',
      path: join(ASSETS_DIR, 'welcome-runs.png'),
      cid: WELCOME_CID.runs,
    },
  ];
}

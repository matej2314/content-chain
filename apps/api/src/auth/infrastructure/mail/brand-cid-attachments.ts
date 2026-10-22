import { join } from 'node:path';
import type { MailCidAttachment } from './templates/user-invited.template';

/**
 * Inline CID asset for the shared mail shell brand mark — paths relative to
 * this module (src/ and dist/ when nest-cli copies assets).
 */
const ASSETS_DIR = join(__dirname, 'assets', 'brand');

export const BRAND_CID = {
  logo: 'brand-logo@content-chain',
} as const;

export function resolveBrandCidAttachments(): readonly MailCidAttachment[] {
  return [
    {
      filename: 'content-chain-logo-transparent.png',
      path: join(ASSETS_DIR, 'content-chain-logo-transparent.png'),
      cid: BRAND_CID.logo,
    },
  ];
}

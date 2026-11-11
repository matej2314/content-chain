import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { z } from 'zod';
import { companyContextExtrasInputSchema } from '../company-context/application/company-context.schemas';
import { isComplete } from '../company-context/domain/is-complete';
import type { CompanyContext } from '../company-context/domain/company-context.types';

const offerItemSchema = z
  .object({
    name: z.string(),
    benefit: z.array(z.string()),
    description: z.string(),
  })
  .strict();

const ctaItemSchema = z
  .object({
    label: z.string(),
    target: z.string().optional(),
  })
  .strict();

const audienceProfileSchema = z
  .object({
    name: z.string(),
    description: z.string(),
  })
  .strict();

export const companyContextFixtureSchema = z
  .object({
    identity: z
      .object({
        name: z.string(),
        description: z.string(),
      })
      .strict(),
    offer: z.object({ items: z.array(offerItemSchema) }).strict(),
    voice: z
      .object({
        weDo: z.string(),
        weDont: z.string(),
      })
      .strict(),
    cta: z.object({ items: z.array(ctaItemSchema) }).strict(),
    audience: z.object({ profiles: z.array(audienceProfileSchema) }).strict(),
    extras: companyContextExtrasInputSchema,
  })
  .strict();

export type CompanyContextFixture = z.infer<typeof companyContextFixtureSchema>;

export function fixturePath(baseDir: string = __dirname): string {
  return join(baseDir, 'fixtures', 'company-context.json');
}

export function loadCompanyContextFixture(
  baseDir: string = __dirname,
): CompanyContext {
  const raw: unknown = JSON.parse(readFileSync(fixturePath(baseDir), 'utf-8'));
  const parsed = companyContextFixtureSchema.parse(raw);
  if (!isComplete(parsed).complete) {
    throw new Error(
      'Company context fixture is incomplete. Missing fields: ' +
        isComplete(parsed).missing.join(', '),
    );
  }
  return parsed;
}

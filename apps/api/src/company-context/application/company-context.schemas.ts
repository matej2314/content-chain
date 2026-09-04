import { z } from 'zod';

export const companyContextCaseStudySchema = z
  .object({
    title: z.string().min(1),
    summary: z.string().min(1),
    metrics: z.array(z.string()).optional(),
  })
  .strict();

export const companyContextObjectionSchema = z
  .object({
    label: z.string().min(1),
    response: z.string().min(1),
  })
  .strict();

export const companyContextExtrasSchema = z
  .object({
    caseStudies: z.array(companyContextCaseStudySchema).optional(),
    objections: z.array(companyContextObjectionSchema).optional(),
    hashtags: z.array(z.string()).optional(),
    catalogNotes: z.string().optional(),
    performanceNotes: z.string().optional(),
  })
  .strict();

export const companyContextExtrasInputSchema =
  companyContextExtrasSchema.nullable();

export type CompanyContextExtrasParsed = z.infer<
  typeof companyContextExtrasSchema
>;

/** @content-chain/run-pipelines — execute Social+Content + prompt assets. */

export { RunPipelinesModule } from './nest/run-pipelines.module';
export { RunPipelineResultStoresModule } from './nest/run-pipeline-result-stores.module';

export { CompanyContextCoreModule } from './company-context/company-context-core.module';
export {
  COMPANY_CONTEXT_REPOSITORY,
  type CompanyContextRepository,
  type PartialCompanyContext,
} from './company-context/domain/company-context.port';
export {
  COMPANY_CONTEXT_SINGLETON_ID,
  GATE_SECTIONS,
  type GateSection,
} from './company-context/domain/company-context.constants';
export {
  emptyCompanyContext,
  type AudienceProfile,
  type CompanyContext,
  type CompanyContextExtras,
  type CompanyContextWriteDetail,
  type Completeness,
  type CtaItem,
  type OfferItem,
} from './company-context/domain/company-context.types';
export { normalizeAudienceName } from './company-context/domain/normalize-audience-name';
export { withEffectiveAudience } from './company-context/domain/with-effective-audience';
// export { PrismaCompanyContextAdapter } from './company-context/infrastructure/prisma-company-context.adapter';

export {
  SOCIAL_RESULT_STORE,
  type SocialResultStore,
} from './social/domain/social-result.port';
export type {
  ReelIdea,
  ReelScript,
  ReelScriptItem,
  SocialContent,
  SocialContentItem,
  SocialIdea,
  SocialPipelineOutcome,
  VerifierVerdict,
} from './social/domain/social.types';
export { SocialRunExecutor } from './social/application/social-run.executor';
export {
  contentOutputSchema,
  ideasOutputSchema,
  reelIdeaSchema,
  reelIdeasOutputSchema,
  reelScriptOutputSchema,
  socialIdeaSchema,
  verifierOutputSchema as socialVerifierOutputSchema,
} from './social/application/social.schemas';

export {
  CONTENT_RESULT_STORE,
  type ContentResultStore,
} from './content/domain/content-result.port';
export type {
  ContentPipelineOutcome,
  PageDocument,
  PageOutline,
} from './content/domain/content.types';
export { ContentRunExecutor } from './content/application/content-run.executor';
export {
  pageDocumentOutputSchema,
  pageOutlineOutputSchema,
  verifierOutputSchema as contentVerifierOutputSchema,
} from './content/application/content.schemas';

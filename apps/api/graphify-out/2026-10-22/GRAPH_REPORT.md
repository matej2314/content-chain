# Graph Report - api  (2026-10-22)

## Corpus Check
- 242 files · ~37,850 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1573 nodes · 4538 edges · 69 communities (66 shown, 3 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 94 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4c09c015`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- llm-gateway.http.adapter.ts
- app.module.ts
- AuthUser
- GuestQuotaPort
- CurrentUser
- health.service.ts
- renderPrompt
- social.graph.ts
- save-output-edited.use-case.ts
- .constructor
- RunRepository
- TransactionalMailer
- run.types.ts
- resend-activation.use-case.ts
- company-context.controller.ts
- run.port.ts
- auth.module.ts
- social.types.ts
- PrismaRunAdapter
- ContentResultStore
- content.types.ts
- prisma-invitation.adapter.ts
- UsersController
- company-context.types.ts
- prisma-social-result.adapter.ts
- start-run.use-case.ts
- company-context.dto.ts
- DomainException
- .execute
- create-feedback.use-case.ts
- RunAbortRegistry
- runs.module.ts
- user-invited.template.ts
- RunRecord
- guest-purge.module.ts
- HttpExceptionFilter
- company-context.mapper.ts
- invitations.controller.ts
- get-runs-summary.use-case.ts
- UserRepository
- LlmHopService
- content.graph.ts
- AuthController
- llm-hop.ts
- AuthUserContext
- InvitationsController
- PrismaRefreshSessionAdapter
- Env
- ListRunsQueryDto
- CompanyContext
- PublicConfigController
- run-lifecycle.module.ts
- StartRunDto
- feedback.module.ts
- prisma-feedback.adapter.ts
- CompanyContextController
- assert-company-context-writable.ts
- JwtAuthGuard
- PrismaService
- CreateFeedbackUseCase
- prisma.feedback-run-reader.adapter.ts
- RunsModule
- .create
- BootstrapAdminDto
- LoginDto
- guest.guard.ts
- runs.controller.ts
- RolesGuard
- coerce-pass-note-verdict.ts

## God Nodes (most connected - your core abstractions)
1. `DomainException` - 84 edges
2. `AuthUserContext` - 62 edges
3. `Env` - 59 edges
4. `RunRepository` - 57 edges
5. `UserRepository` - 38 edges
6. `RunRecord` - 38 edges
7. `parseWithZod()` - 38 edges
8. `PrismaService` - 33 edges
9. `SocialResultStore` - 32 edges
10. `ENV` - 31 edges

## Surprising Connections (you probably didn't know these)
- `setAuthCookies()` --calls--> `parseTtlMs()`  [EXTRACTED]
  src/auth/infrastructure/session/cookie.helper.ts → src/auth/application/auth.helpers.ts
- `rejectDeadGuestSession()` --calls--> `DomainException`  [EXTRACTED]
  src/auth/application/reject-dead-guest-session.ts → src/shared/exceptions/domain.exception.ts
- `PrismaInvitationAdapter` --implements--> `InvitationRepository`  [EXTRACTED]
  src/auth/infrastructure/persistence/prisma-invitation.adapter.ts → src/auth/domain/invitation-repository.port.ts
- `PrismaRefreshSessionAdapter` --implements--> `RefreshSessionRepository`  [EXTRACTED]
  src/auth/infrastructure/persistence/prisma-refresh-session.adapter.ts → src/auth/domain/refresh-session.repository.port.ts
- `LoggingMailerAdapter` --implements--> `TransactionalMailer`  [EXTRACTED]
  src/auth/infrastructure/mail/logging-mailer.adapter.ts → src/auth/domain/transactional-mailer.port.ts

## Import Cycles
- None detected.

## Communities (69 total, 3 thin omitted)

### Community 0 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (40): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+32 more)

### Community 1 - "app.module.ts"
Cohesion: 0.09
Nodes (26): AuthModule, Module, CompanyContextModule, Module, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Injectable (+18 more)

### Community 2 - "AuthUser"
Cohesion: 0.07
Nodes (17): Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult (+9 more)

### Community 3 - "GuestQuotaPort"
Cohesion: 0.07
Nodes (24): AppModule, Module, bootstrap(), isGuestTaskType(), GUEST_QUOTA, GuestQuotaAdmitResult, GuestQuotaPort, GuestQuotaModule (+16 more)

### Community 4 - "CurrentUser"
Cohesion: 0.21
Nodes (14): RunsController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Param (+6 more)

### Community 5 - "health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 6 - "renderPrompt"
Cohesion: 0.16
Nodes (20): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+12 more)

### Community 7 - "social.graph.ts"
Cohesion: 0.14
Nodes (30): ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE, nextRefineCount(), isTwoStageSocialTask() (+22 more)

### Community 8 - "save-output-edited.use-case.ts"
Cohesion: 0.06
Nodes (40): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+32 more)

### Community 9 - ".constructor"
Cohesion: 0.07
Nodes (19): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsUseCase, Inject, Injectable, GetRunUseCase, Inject (+11 more)

### Community 10 - "RunRepository"
Cohesion: 0.07
Nodes (4): Inject, Inject, Inject, RunRepository

### Community 11 - "TransactionalMailer"
Cohesion: 0.08
Nodes (16): InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase, Inject, Injectable, Inject (+8 more)

### Community 12 - "run.types.ts"
Cohesion: 0.18
Nodes (14): RUN_LIFECYCLE, isSocialRunRecord(), SocialRunRecord, isAbortError(), SocialPipelineFacade, toOutcome(), Injectable, SocialRunExecutor (+6 more)

### Community 13 - "resend-activation.use-case.ts"
Cohesion: 0.09
Nodes (20): ActivateAccountOutput, ActivateAccountInput, activateAccountSchema, BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand (+12 more)

### Community 14 - "company-context.controller.ts"
Cohesion: 0.14
Nodes (18): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+10 more)

### Community 15 - "run.port.ts"
Cohesion: 0.10
Nodes (23): ListRunsOutput, ListRunsUseCase, Inject, Injectable, LightRunItem, ListRunsQuery, ListRunsResult, PAGE_SIZE (+15 more)

### Community 16 - "auth.module.ts"
Cohesion: 0.08
Nodes (33): AcceptInviteUseCase, Injectable, ActivateAccountUseCase, Injectable, hashRefreshToken(), AuthTokenResult, BootstrapAdminUseCase, Inject (+25 more)

### Community 17 - "social.types.ts"
Cohesion: 0.07
Nodes (17): PageOutline, CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, SocialResultStore (+9 more)

### Community 18 - "PrismaRunAdapter"
Cohesion: 0.11
Nodes (5): RunSnapshot, RunLogEntry, assertTransition(), PrismaRunAdapter, Injectable

### Community 19 - "ContentResultStore"
Cohesion: 0.19
Nodes (7): ContentResultStore, ContentPipelineState, PageDocument, VerifierVerdict, PrismaContentResultAdapter, toContentPipelinePhase(), Injectable

### Community 20 - "content.types.ts"
Cohesion: 0.17
Nodes (13): ContentPipelineFacade, toOutcome(), Injectable, Inject, ContentPipelineInput, ContentPipelineOutcome, ContentPipelinePhase, ContentRefineSnapshot (+5 more)

### Community 21 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 22 - "UsersController"
Cohesion: 0.18
Nodes (11): ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode, Param (+3 more)

### Community 23 - "company-context.types.ts"
Cohesion: 0.16
Nodes (20): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CtaItem (+12 more)

### Community 24 - "prisma-social-result.adapter.ts"
Cohesion: 0.10
Nodes (10): toInputJson(), PipelineState, ReelScriptSegment, mapStoredReelScript(), mapStoredReelScriptSegment(), mapStoredSocialContent(), asContentItem(), asReelScriptItem() (+2 more)

### Community 25 - "start-run.use-case.ts"
Cohesion: 0.11
Nodes (23): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+15 more)

### Community 26 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): ApiPropertyOptional, IsObject, AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto (+12 more)

### Community 27 - "DomainException"
Cohesion: 0.11
Nodes (16): comparePassword(), generateRefreshToken(), hashPassword(), isUniqueConstraintViolation(), validatePasswordPolicy(), orderItemsBySelectedIds(), GuestRunPolicyService, isGuestArchiveStatus() (+8 more)

### Community 28 - ".execute"
Cohesion: 0.23
Nodes (4): DeleteUserUseCase, Inject, Injectable, GuestPurgePort

### Community 29 - "create-feedback.use-case.ts"
Cohesion: 0.29
Nodes (6): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FEEDBACK_BODY_MAX, FEEDBACK_REPOSITORY

### Community 30 - "RunAbortRegistry"
Cohesion: 0.25
Nodes (3): Inject, RunAbortRegistry, Injectable

### Community 31 - "runs.module.ts"
Cohesion: 0.13
Nodes (15): AutoFinalizeExpiredReviewsUseCase, Injectable, Inject, RunDispatchExecutor, RunLifecycleService, Injectable, RecoverInterruptedRunsUseCase, Inject (+7 more)

### Community 32 - "user-invited.template.ts"
Cohesion: 0.13
Nodes (28): TransactionalMail, UserActivationMail, UserInvitedMail, UserWelcomeMail, escapeHtml(), LoggingMailerAdapter, Injectable, MAIL_PALETTE (+20 more)

### Community 33 - "RunRecord"
Cohesion: 0.24
Nodes (3): InProcessRunWorker, Injectable, RunRecord

### Community 34 - "guest-purge.module.ts"
Cohesion: 0.21
Nodes (7): GUEST_PURGE, GuestPurgeDeleteStats, LIVE_RUN_STATUSES, GuestPurgeModule, Module, PrismaGuestPurgeAdapter, Injectable

### Community 35 - "HttpExceptionFilter"
Cohesion: 0.31
Nodes (3): Catch, ErrorEnvelope, HttpExceptionFilter

### Community 36 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): Put, toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema (+3 more)

### Community 37 - "invitations.controller.ts"
Cohesion: 0.18
Nodes (10): Equals, IsBoolean, InviteUserDto, ApiProperty, IsEmail, PatchUserDto, ApiProperty, Roles() (+2 more)

### Community 38 - "get-runs-summary.use-case.ts"
Cohesion: 0.19
Nodes (9): CacheEntry, cacheKey(), GetRunsSummaryUseCase, RUNS_SUMMARY_CACHE_TTL_MS, RUNS_SUMMARY_WINDOW_MS, scopeFor(), successRate(), Inject (+1 more)

### Community 39 - "UserRepository"
Cohesion: 0.08
Nodes (20): Inject, DeleteUserResult, ListUsersUseCase, Inject, Injectable, Inject, ReactivateUserUseCase, Inject (+12 more)

### Community 40 - "LlmHopService"
Cohesion: 0.27
Nodes (9): CompanyContextRepository, Inject, CompileContentGraphOptions, RunLifecyclePort, LlmHopService, Inject, Injectable, Inject (+1 more)

### Community 41 - "content.graph.ts"
Cohesion: 0.27
Nodes (11): canRefine(), compileContentGraph(), ContentState, routeAfterConsistencyVerifier(), routeAfterNormalizeBrief(), createFailRunNode(), createNormalizeBriefNode(), createOutlineNode() (+3 more)

### Community 42 - "AuthController"
Cohesion: 0.08
Nodes (30): Req, AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode (+22 more)

### Community 43 - "llm-hop.ts"
Cohesion: 0.22
Nodes (11): isRetryable(), RetryReason, ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid(), repairSuffix() (+3 more)

### Community 44 - "AuthUserContext"
Cohesion: 0.23
Nodes (6): CancelRunUseCase, Injectable, ROLES_KEY, Express, Request, AuthUserContext

### Community 45 - "InvitationsController"
Cohesion: 0.17
Nodes (10): InvitationsController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+2 more)

### Community 46 - "PrismaRefreshSessionAdapter"
Cohesion: 0.31
Nodes (3): RefreshSessionRecord, PrismaRefreshSessionAdapter, Injectable

### Community 47 - "Env"
Cohesion: 0.10
Nodes (30): AcceptInviteResult, acceptInviteSchema, Inject, parseTtlMs(), parseTtlSeconds(), formatMailValidityLabel(), polishPlural(), InviteUserResult (+22 more)

### Community 48 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ArrayUnique, ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min (+2 more)

### Community 49 - "CompanyContext"
Cohesion: 0.26
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 50 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 51 - "run-lifecycle.module.ts"
Cohesion: 0.16
Nodes (8): TransitionExtras, OUTPUT_EDITED_WRITER, RUN_SSE_HUB, RunSseEvent, RunSseHub, InMemoryRunSseHub, Inject, Injectable

### Community 52 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 53 - "feedback.module.ts"
Cohesion: 0.31
Nodes (6): FEEDBACK_PURGE, FeedbackPurgePort, FeedbackModule, Module, PrismaFeedbackPurgeAdapter, Injectable

### Community 54 - "prisma-feedback.adapter.ts"
Cohesion: 0.28
Nodes (4): FeedbackEntry, FeedbackRepository, PrismaFeedbackAdapter, Injectable

### Community 55 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 56 - "assert-company-context-writable.ts"
Cohesion: 0.36
Nodes (5): assertAudienceProfileNamesUnique(), CompanyContextWriteDetail, normalizeAudienceName(), withEffectiveAudience(), createLoadContextNode()

### Community 57 - "JwtAuthGuard"
Cohesion: 0.40
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 58 - "PrismaService"
Cohesion: 0.20
Nodes (5): PrismaModule, Global, Module, PrismaService, Injectable

### Community 59 - "CreateFeedbackUseCase"
Cohesion: 0.22
Nodes (7): CreateFeedbackUseCase, Inject, Injectable, FeedbackController, ApiCookieAuth, ApiTags, Controller

### Community 60 - "prisma.feedback-run-reader.adapter.ts"
Cohesion: 0.31
Nodes (4): FeedbackRunLookup, FeedbackRunReader, PrismaFeedbackRunReaderAdapter, Injectable

### Community 65 - ".create"
Cohesion: 0.20
Nodes (9): MaxLength, Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString (+1 more)

### Community 67 - "BootstrapAdminDto"
Cohesion: 0.33
Nodes (5): BootstrapAdminDto, ApiProperty, IsEmail, IsString, MinLength

### Community 68 - "LoginDto"
Cohesion: 0.33
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 70 - "guest.guard.ts"
Cohesion: 0.29
Nodes (4): ALLOW_GUEST_KEY, GuestGuard, Inject, Injectable

### Community 71 - "runs.controller.ts"
Cohesion: 0.11
Nodes (14): ListRunsUserItem, ListRunsUserOutput, ListRunsUserUseCase, Inject, Injectable, HitlDto, IsArray, IsString (+6 more)

## Knowledge Gaps
- **111 isolated node(s):** `acceptInviteSchema`, `AcceptInviteResult`, `ActivateAccountOutput`, `BootstrapAdminInput`, `LoginInput` (+106 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 432 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DomainException` connect `DomainException` to `llm-gateway.http.adapter.ts`, `app.module.ts`, `AuthUser`, `GuestQuotaPort`, `save-output-edited.use-case.ts`, `.constructor`, `TransactionalMailer`, `run.types.ts`, `resend-activation.use-case.ts`, `company-context.controller.ts`, `run.port.ts`, `auth.module.ts`, `PrismaRunAdapter`, `prisma-invitation.adapter.ts`, `start-run.use-case.ts`, `.execute`, `create-feedback.use-case.ts`, `UserRepository`, `llm-hop.ts`, `AuthUserContext`, `Env`, `prisma-feedback.adapter.ts`, `assert-company-context-writable.ts`, `runs.controller.ts`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `Env` connect `Env` to `llm-gateway.http.adapter.ts`, `GuestQuotaPort`, `health.service.ts`, `save-output-edited.use-case.ts`, `.constructor`, `RunRepository`, `TransactionalMailer`, `resend-activation.use-case.ts`, `auth.module.ts`, `DomainException`, `runs.module.ts`, `user-invited.template.ts`, `UserRepository`, `LlmHopService`, `llm-hop.ts`, `PublicConfigController`, `run-lifecycle.module.ts`, `guest.guard.ts`, `runs.controller.ts`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `AuthUserContext` connect `AuthUserContext` to `GuestQuotaPort`, `CurrentUser`, `save-output-edited.use-case.ts`, `.constructor`, `auth.module.ts`, `UsersController`, `start-run.use-case.ts`, `DomainException`, `.execute`, `create-feedback.use-case.ts`, `invitations.controller.ts`, `get-runs-summary.use-case.ts`, `UserRepository`, `AuthController`, `InvitationsController`, `Env`, `prisma-feedback.adapter.ts`, `.create`, `guest.guard.ts`, `runs.controller.ts`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **What connects `acceptInviteSchema`, `AcceptInviteResult`, `ActivateAccountOutput` to the rest of the system?**
  _111 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `llm-gateway.http.adapter.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05632360471070148 - nodes in this community are weakly interconnected._
- **Should `app.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0873015873015873 - nodes in this community are weakly interconnected._
- **Should `AuthUser` be split into smaller, more focused modules?**
  _Cohesion score 0.07020408163265306 - nodes in this community are weakly interconnected._
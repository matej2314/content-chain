# Graph Report - api  (2026-11-10)

## Corpus Check
- 246 files · ~51,392 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1598 nodes · 4639 edges · 65 communities (61 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 94 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `15e4fbd3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- llm-gateway.http.adapter.ts
- RunsModule
- UserRepository
- GuestQuotaPort
- AllowGuest
- health.service.ts
- content.graph.ts
- content.types.ts
- save-output-edited.use-case.ts
- runs.module.ts
- RunRepository
- Env
- RunRecord
- auth.schemas.ts
- company-context.controller.ts
- prisma-account-activation.adapter.ts
- auth.module.ts
- VerifierVerdict
- prisma-run.adapter.ts
- auth.controller.ts
- app.module.ts
- prisma-invitation.adapter.ts
- UsersController
- company-context.types.ts
- SocialResultStore
- start-run.use-case.ts
- company-context.dto.ts
- output-edited-writer.port.ts
- .execute
- create-feedback.use-case.ts
- run-lifecycle.module.ts
- MeUseCase
- user-invited.template.ts
- RunLifecycleService
- delete-user.use-case.ts
- HttpExceptionFilter
- CompanyContextController
- users.controller.ts
- get-runs-summary.use-case.ts
- BootstrapStatusUseCase
- .constructor
- env.schema.ts
- AuthController
- llm-hop.ts
- AuthUserContext
- InvitationsController
- PrismaRefreshSessionAdapter
- rate-run.use-case.ts
- runs.controller.ts
- CompanyContext
- PublicConfigController
- SocialModule
- StartRunDto
- feedback.module.ts
- DomainException
- assert-company-context-writable.ts
- metrics.service.ts
- PrismaService
- CreateFeedbackUseCase
- prisma.feedback-run-reader.adapter.ts
- company-context.mapper.ts
- user-repository.port.ts
- .create
- GuestGuard
- social.types.ts

## God Nodes (most connected - your core abstractions)
1. `DomainException` - 84 edges
2. `Env` - 63 edges
3. `AuthUserContext` - 62 edges
4. `RunRepository` - 58 edges
5. `UserRepository` - 38 edges
6. `RunRecord` - 38 edges
7. `parseWithZod()` - 38 edges
8. `ENV` - 33 edges
9. `PrismaService` - 33 edges
10. `PrismaRunAdapter` - 32 edges

## Surprising Connections (you probably didn't know these)
- `setAuthCookies()` --calls--> `parseTtlMs()`  [EXTRACTED]
  apps/api/src/auth/infrastructure/session/cookie.helper.ts → apps/api/src/auth/application/auth.helpers.ts
- `rejectDeadGuestSession()` --calls--> `DomainException`  [EXTRACTED]
  apps/api/src/auth/application/reject-dead-guest-session.ts → apps/api/src/shared/exceptions/domain.exception.ts
- `PrismaAccountActivationAdapter` --implements--> `AccountActivationRepository`  [EXTRACTED]
  apps/api/src/auth/infrastructure/persistence/prisma-account-activation.adapter.ts → apps/api/src/auth/domain/account-activation-repository.port.ts
- `PrismaInvitationAdapter` --implements--> `InvitationRepository`  [EXTRACTED]
  apps/api/src/auth/infrastructure/persistence/prisma-invitation.adapter.ts → apps/api/src/auth/domain/invitation-repository.port.ts
- `PrismaRefreshSessionAdapter` --implements--> `RefreshSessionRepository`  [EXTRACTED]
  apps/api/src/auth/infrastructure/persistence/prisma-refresh-session.adapter.ts → apps/api/src/auth/domain/refresh-session.repository.port.ts

## Import Cycles
- None detected.

## Communities (65 total, 4 thin omitted)

### Community 0 - "llm-gateway.http.adapter.ts"
Cohesion: 0.11
Nodes (22): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+14 more)

### Community 2 - "UserRepository"
Cohesion: 0.13
Nodes (7): Inject, Inject, AuthUser, UserRepository, isUniqueConstraintViolation(), PrismaUserAdapter, Injectable

### Community 3 - "GuestQuotaPort"
Cohesion: 0.10
Nodes (16): isGuestTaskType(), GUEST_QUOTA, GuestQuotaAdmitResult, GuestQuotaPort, GuestQuotaModule, Module, createRedis(), IoredisGuestQuotaAdapter (+8 more)

### Community 4 - "AllowGuest"
Cohesion: 0.13
Nodes (18): FinalizeReviewUseCase, Injectable, HitlDto, IsArray, IsString, isTerminalStatus(), RunsController, ApiCookieAuth (+10 more)

### Community 5 - "health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 6 - "content.graph.ts"
Cohesion: 0.06
Nodes (74): CompanyContextRepository, withEffectiveAudience(), coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+66 more)

### Community 7 - "content.types.ts"
Cohesion: 0.13
Nodes (11): ContentPipelineInput, ContentPipelineState, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole, VerifierVerdict (+3 more)

### Community 8 - "save-output-edited.use-case.ts"
Cohesion: 0.08
Nodes (37): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+29 more)

### Community 9 - "runs.module.ts"
Cohesion: 0.12
Nodes (25): parseTtlMs(), parseTtlSeconds(), AutoFinalizeExpiredReviewsUseCase, Injectable, GetRunLogsOutput, GetRunGuestAccess, GetRunUseCase, Injectable (+17 more)

### Community 10 - "RunRepository"
Cohesion: 0.05
Nodes (12): Inject, Inject, Inject, Inject, GuestRunPolicyService, Inject, Injectable, Inject (+4 more)

### Community 11 - "Env"
Cohesion: 0.07
Nodes (33): Inject, ActivateAccountOutput, Inject, generateRefreshToken(), formatMailValidityLabel(), polishPlural(), InviteUserResult, inviteUserSchema (+25 more)

### Community 12 - "RunRecord"
Cohesion: 0.17
Nodes (16): RunDispatchExecutor, RunExecuteOptions, RunExecutorPort, isSocialRunRecord(), RunRecord, SocialRunRecord, SocialPipelineFacade, toOutcome() (+8 more)

### Community 13 - "auth.schemas.ts"
Cohesion: 0.10
Nodes (17): ActivateAccountInput, activateAccountSchema, BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema (+9 more)

### Community 14 - "company-context.controller.ts"
Cohesion: 0.17
Nodes (11): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PutCompanyContextUseCase, Inject (+3 more)

### Community 15 - "prisma-account-activation.adapter.ts"
Cohesion: 0.20
Nodes (7): AccountActivationRecord, CreatePendingUser, RotateActivationTokenInput, ActivationRow, PrismaAccountActivationAdapter, Injectable, UserRow

### Community 16 - "auth.module.ts"
Cohesion: 0.08
Nodes (27): AcceptInviteUseCase, Injectable, ActivateAccountUseCase, Injectable, comparePassword(), hashRefreshToken(), AuthTokenResult, BootstrapAdminUseCase (+19 more)

### Community 17 - "VerifierVerdict"
Cohesion: 0.12
Nodes (6): CompositeRunResultReader, RunResultReader, EmptyRunResultReader, Injectable, ReelScript, VerifierVerdict

### Community 18 - "prisma-run.adapter.ts"
Cohesion: 0.06
Nodes (21): LightRunItem, ListLightRunsResult, ListRunsResult, RunSnapshot, RunSummaryAggregate, RunSummaryScope, RunRecordBase, ALLOWED_RUN_STATES (+13 more)

### Community 19 - "auth.controller.ts"
Cohesion: 0.06
Nodes (32): AcceptInviteDto, ApiProperty, IsString, MinLength, ActivateAccountDto, ApiProperty, IsString, MinLength (+24 more)

### Community 20 - "app.module.ts"
Cohesion: 0.11
Nodes (27): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Inject, Injectable (+19 more)

### Community 21 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 22 - "UsersController"
Cohesion: 0.17
Nodes (12): ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode, Param (+4 more)

### Community 23 - "company-context.types.ts"
Cohesion: 0.16
Nodes (21): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+13 more)

### Community 24 - "SocialResultStore"
Cohesion: 0.09
Nodes (7): toInputJson(), SocialResultStore, PipelineState, ReelIdea, SocialIdea, PrismaSocialResultAdapter, Injectable

### Community 25 - "start-run.use-case.ts"
Cohesion: 0.09
Nodes (25): contentBriefSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema, socialStartRunSchema (+17 more)

### Community 26 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): ApiPropertyOptional, IsObject, AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto (+12 more)

### Community 27 - "output-edited-writer.port.ts"
Cohesion: 0.24
Nodes (7): Inject, OUTPUT_EDITED_WRITER, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable

### Community 28 - ".execute"
Cohesion: 0.23
Nodes (4): DeleteUserUseCase, Inject, Injectable, GuestPurgePort

### Community 29 - "create-feedback.use-case.ts"
Cohesion: 0.18
Nodes (10): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FEEDBACK_BODY_MAX, FEEDBACK_REPOSITORY, FeedbackEntry, FeedbackRepository (+2 more)

### Community 30 - "run-lifecycle.module.ts"
Cohesion: 0.13
Nodes (12): MetricsModule, Module, TransitionExtras, RUN_SSE_HUB, RunSseEvent, RunSseHub, RunLogEntry, InMemoryRunSseHub (+4 more)

### Community 31 - "MeUseCase"
Cohesion: 0.50
Nodes (3): MeUseCase, Inject, Injectable

### Community 32 - "user-invited.template.ts"
Cohesion: 0.12
Nodes (31): TransactionalMail, UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments(), escapeHtml() (+23 more)

### Community 33 - "RunLifecycleService"
Cohesion: 0.09
Nodes (12): Inject, InProcessRunWorker, Inject, Injectable, RunAbortRegistry, Injectable, RunLifecycleService, Inject (+4 more)

### Community 34 - "delete-user.use-case.ts"
Cohesion: 0.18
Nodes (8): DeleteUserResult, GUEST_PURGE, GuestPurgeDeleteStats, LIVE_RUN_STATUSES, GuestPurgeModule, Module, PrismaGuestPurgeAdapter, Injectable

### Community 36 - "CompanyContextController"
Cohesion: 0.14
Nodes (11): Put, toCompanyContext(), toPartialCompanyContext(), CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body (+3 more)

### Community 37 - "users.controller.ts"
Cohesion: 0.13
Nodes (14): Equals, IsBoolean, InviteUserDto, ApiProperty, IsEmail, PatchUserDto, ApiProperty, CurrentUser (+6 more)

### Community 38 - "get-runs-summary.use-case.ts"
Cohesion: 0.18
Nodes (9): CacheEntry, cacheKey(), GetRunsSummaryUseCase, RUNS_SUMMARY_CACHE_TTL_MS, RUNS_SUMMARY_WINDOW_MS, scopeFor(), successRate(), Inject (+1 more)

### Community 39 - "BootstrapStatusUseCase"
Cohesion: 0.50
Nodes (3): BootstrapStatusUseCase, Inject, Injectable

### Community 40 - ".constructor"
Cohesion: 0.13
Nodes (11): ListRunsUseCase, Injectable, ListRunsUserItem, ListRunsUserOutput, ListRunsUserUseCase, Injectable, StartRunUseCase, Injectable (+3 more)

### Community 41 - "env.schema.ts"
Cohesion: 0.17
Nodes (11): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+3 more)

### Community 42 - "AuthController"
Cohesion: 0.21
Nodes (13): Req, AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode (+5 more)

### Community 43 - "llm-hop.ts"
Cohesion: 0.18
Nodes (10): LlmGatewayError, LLM_GATEWAY_PORT, isRetryable(), RetryReason, isAbortError(), ChatJsonInput, hopUserContent(), isHopRetryable() (+2 more)

### Community 44 - "AuthUserContext"
Cohesion: 0.15
Nodes (10): CancelRunUseCase, Injectable, GetRunLogsUseCase, Injectable, orderItemsBySelectedIds(), isGuestArchiveStatus(), Get, Express (+2 more)

### Community 45 - "InvitationsController"
Cohesion: 0.10
Nodes (16): ListInvitationsUseCase, Inject, Injectable, RevokeInvitationUseCase, Inject, Injectable, InvitationsController, ApiCookieAuth (+8 more)

### Community 46 - "PrismaRefreshSessionAdapter"
Cohesion: 0.31
Nodes (3): RefreshSessionRecord, PrismaRefreshSessionAdapter, Injectable

### Community 47 - "rate-run.use-case.ts"
Cohesion: 0.23
Nodes (8): RateRunUseCase, ratingSchema, Inject, Injectable, assertRunReviewable(), ReviewWindowParams, computeReviewExpiresAt(), isReviewWindowOpen()

### Community 48 - "runs.controller.ts"
Cohesion: 0.10
Nodes (18): ArrayUnique, ListRunsQueryDto, IsArray, IsIn, IsOptional, IsString, PatchRunRatingDto, IsIn (+10 more)

### Community 49 - "CompanyContext"
Cohesion: 0.29
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 50 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 52 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 53 - "feedback.module.ts"
Cohesion: 0.21
Nodes (9): FEEDBACK_PURGE, FeedbackPurgePort, FeedbackModule, Module, PrismaFeedbackPurgeAdapter, Injectable, PrismaModule, Global (+1 more)

### Community 54 - "DomainException"
Cohesion: 0.18
Nodes (10): AcceptInviteResult, acceptInviteSchema, hashPassword(), isUniqueConstraintViolation(), validatePasswordPolicy(), DomainException, newUserId(), extractJsonText() (+2 more)

### Community 56 - "assert-company-context-writable.ts"
Cohesion: 0.48
Nodes (4): assertAudienceProfileNamesUnique(), assertCompanyContextWritable(), CompanyContextWriteDetail, normalizeAudienceName()

### Community 57 - "metrics.service.ts"
Cohesion: 0.08
Nodes (22): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+14 more)

### Community 59 - "CreateFeedbackUseCase"
Cohesion: 0.22
Nodes (7): CreateFeedbackUseCase, Inject, Injectable, FeedbackController, ApiCookieAuth, ApiTags, Controller

### Community 60 - "prisma.feedback-run-reader.adapter.ts"
Cohesion: 0.31
Nodes (4): FeedbackRunLookup, FeedbackRunReader, PrismaFeedbackRunReaderAdapter, Injectable

### Community 62 - "company-context.mapper.ts"
Cohesion: 0.18
Nodes (11): toPublicCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, PatchCompanyContextUseCase, Inject (+3 more)

### Community 64 - "user-repository.port.ts"
Cohesion: 0.13
Nodes (18): ListUsersUseCase, Injectable, ReactivateUserUseCase, Injectable, JwtPayload, UserListItem, CreateAdminIfNoneData, CreateAdminIfNoneResult (+10 more)

### Community 65 - ".create"
Cohesion: 0.20
Nodes (9): MaxLength, Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString (+1 more)

### Community 70 - "GuestGuard"
Cohesion: 0.40
Nodes (3): GuestGuard, Inject, Injectable

### Community 71 - "social.types.ts"
Cohesion: 0.11
Nodes (14): GetRunOutput, ContentBrief, SocialBrief, ReelDurationSeconds, ReelScriptItem, ReelScriptSegment, SocialContent, SocialContentItem (+6 more)

## Knowledge Gaps
- **114 isolated node(s):** `acceptInviteSchema`, `AcceptInviteResult`, `ActivateAccountOutput`, `BootstrapAdminInput`, `LoginInput` (+109 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 439 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DomainException` connect `DomainException` to `UserRepository`, `GuestQuotaPort`, `AllowGuest`, `save-output-edited.use-case.ts`, `runs.module.ts`, `Env`, `RunRecord`, `auth.schemas.ts`, `prisma-account-activation.adapter.ts`, `auth.module.ts`, `prisma-run.adapter.ts`, `auth.controller.ts`, `app.module.ts`, `prisma-invitation.adapter.ts`, `start-run.use-case.ts`, `.execute`, `create-feedback.use-case.ts`, `delete-user.use-case.ts`, `.constructor`, `llm-hop.ts`, `AuthUserContext`, `InvitationsController`, `rate-run.use-case.ts`, `assert-company-context-writable.ts`, `metrics.service.ts`, `user-repository.port.ts`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Why does `Env` connect `Env` to `llm-gateway.http.adapter.ts`, `GuestQuotaPort`, `health.service.ts`, `save-output-edited.use-case.ts`, `runs.module.ts`, `RunRepository`, `auth.module.ts`, `auth.controller.ts`, `start-run.use-case.ts`, `output-edited-writer.port.ts`, `run-lifecycle.module.ts`, `user-invited.template.ts`, `RunLifecycleService`, `.constructor`, `env.schema.ts`, `llm-hop.ts`, `rate-run.use-case.ts`, `runs.controller.ts`, `PublicConfigController`, `DomainException`, `GuestGuard`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `AuthUserContext` connect `AuthUserContext` to `GuestQuotaPort`, `AllowGuest`, `save-output-edited.use-case.ts`, `runs.module.ts`, `Env`, `auth.schemas.ts`, `auth.controller.ts`, `UsersController`, `start-run.use-case.ts`, `.execute`, `create-feedback.use-case.ts`, `delete-user.use-case.ts`, `users.controller.ts`, `get-runs-summary.use-case.ts`, `.constructor`, `AuthController`, `InvitationsController`, `rate-run.use-case.ts`, `runs.controller.ts`, `DomainException`, `user-repository.port.ts`, `.create`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **What connects `acceptInviteSchema`, `AcceptInviteResult`, `ActivateAccountOutput` to the rest of the system?**
  _114 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `llm-gateway.http.adapter.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10756302521008404 - nodes in this community are weakly interconnected._
- **Should `UserRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.12535612535612536 - nodes in this community are weakly interconnected._
- **Should `GuestQuotaPort` be split into smaller, more focused modules?**
  _Cohesion score 0.10158730158730159 - nodes in this community are weakly interconnected._
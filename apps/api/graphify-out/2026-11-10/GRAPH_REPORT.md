# Graph Report - api  (2026-10-22)

## Corpus Check
- 242 files · ~37,941 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1573 nodes · 4546 edges · 76 communities (75 shown, 1 thin omitted)
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
- AuthUserContext
- health.service.ts
- content.graph.ts
- social.graph.ts
- save-output-edited.use-case.ts
- runs.module.ts
- RunRepository
- register-user.use-case.ts
- social-pipeline.facade.ts
- resend-activation.use-case.ts
- company-context.module.ts
- prisma-run.adapter.ts
- auth.module.ts
- PageOutline
- PrismaRunAdapter
- Env
- content-run.executor.ts
- prisma-invitation.adapter.ts
- users.controller.ts
- company-context.types.ts
- social.types.ts
- start-run.use-case.ts
- company-context.dto.ts
- TransactionalMailer
- .execute
- create-feedback.use-case.ts
- in-process-run.worker.ts
- RunRecord
- user-invited.template.ts
- InProcessRunWorker
- guest-purge.module.ts
- HttpExceptionFilter
- company-context.mapper.ts
- company-context.controller.ts
- get-runs-summary.use-case.ts
- UserRepository
- .constructor
- env.schema.ts
- Public
- llm-hop.ts
- express.d.ts
- InvitationsController
- PrismaRefreshSessionAdapter
- DomainException
- ListRunsQueryDto
- CompanyContext
- PublicConfigController
- InMemoryRunSseHub
- StartRunDto
- feedback.module.ts
- prisma-feedback.adapter.ts
- CompanyContextController
- assert-company-context-writable.ts
- public.decorator.ts
- PrismaService
- CreateFeedbackUseCase
- prisma.feedback-run-reader.adapter.ts
- AuthController
- patch-company-context.use-case.ts
- is-complete.ts
- ListUsersUseCase
- .create
- RegisterUserDto
- BootstrapAdminDto
- LoginDto
- AcceptInviteDto
- GuestGuard
- runs.controller.ts
- ActivateAccountDto
- AutoFinalizeExpiredReviewsUseCase
- FinalizeReviewUseCase
- ResendActivationDto

## God Nodes (most connected - your core abstractions)
1. `DomainException` - 84 edges
2. `AuthUserContext` - 62 edges
3. `Env` - 61 edges
4. `RunRepository` - 57 edges
5. `UserRepository` - 38 edges
6. `RunRecord` - 38 edges
7. `parseWithZod()` - 38 edges
8. `PrismaService` - 33 edges
9. `ENV` - 32 edges
10. `SocialResultStore` - 32 edges

## Surprising Connections (you probably didn't know these)
- `Request` --references--> `AuthUserContext`  [EXTRACTED]
  src/shared/http/express.d.ts → src/shared/types/auth-user-context.ts
- `setAuthCookies()` --calls--> `parseTtlMs()`  [EXTRACTED]
  src/auth/infrastructure/session/cookie.helper.ts → src/auth/application/auth.helpers.ts
- `PrismaAccountActivationAdapter` --implements--> `AccountActivationRepository`  [EXTRACTED]
  src/auth/infrastructure/persistence/prisma-account-activation.adapter.ts → src/auth/domain/account-activation-repository.port.ts
- `PrismaInvitationAdapter` --implements--> `InvitationRepository`  [EXTRACTED]
  src/auth/infrastructure/persistence/prisma-invitation.adapter.ts → src/auth/domain/invitation-repository.port.ts
- `PrismaRefreshSessionAdapter` --implements--> `RefreshSessionRepository`  [EXTRACTED]
  src/auth/infrastructure/persistence/prisma-refresh-session.adapter.ts → src/auth/domain/refresh-session.repository.port.ts

## Import Cycles
- None detected.

## Communities (76 total, 1 thin omitted)

### Community 0 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (40): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+32 more)

### Community 1 - "app.module.ts"
Cohesion: 0.07
Nodes (24): AuthModule, Module, CompanyContextModule, Module, ContentModule, Module, LlmModule, Module (+16 more)

### Community 2 - "AuthUser"
Cohesion: 0.09
Nodes (15): AccountActivationRecord, CreatePendingUser, RotateActivationTokenInput, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult, UserForAuth, ActivationRow (+7 more)

### Community 3 - "GuestQuotaPort"
Cohesion: 0.10
Nodes (16): isGuestTaskType(), GUEST_QUOTA, GuestQuotaAdmitResult, GuestQuotaPort, GuestQuotaModule, Module, createRedis(), IoredisGuestQuotaAdapter (+8 more)

### Community 4 - "AuthUserContext"
Cohesion: 0.14
Nodes (16): orderItemsBySelectedIds(), isGuestArchiveStatus(), isTerminalStatus(), RunsController, ApiCookieAuth, ApiTags, Body, Controller (+8 more)

### Community 5 - "health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 6 - "content.graph.ts"
Cohesion: 0.08
Nodes (43): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+35 more)

### Community 7 - "social.graph.ts"
Cohesion: 0.13
Nodes (32): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 8 - "save-output-edited.use-case.ts"
Cohesion: 0.07
Nodes (41): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+33 more)

### Community 9 - "runs.module.ts"
Cohesion: 0.13
Nodes (18): GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable, GUEST_ARCHIVE_STATUSES, GUEST_TASK_TYPES, GuestRunAdmit, GuestRunPolicyService (+10 more)

### Community 10 - "RunRepository"
Cohesion: 0.08
Nodes (3): Inject, Inject, RunRepository

### Community 11 - "register-user.use-case.ts"
Cohesion: 0.08
Nodes (30): generateRefreshToken(), parseTtlMs(), formatMailValidityLabel(), polishPlural(), InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject (+22 more)

### Community 12 - "social-pipeline.facade.ts"
Cohesion: 0.12
Nodes (23): CompanyContextRepository, Inject, CompileContentGraphOptions, RUN_LIFECYCLE, RunLifecyclePort, isSocialRunRecord(), SocialRunRecord, isAbortError() (+15 more)

### Community 13 - "resend-activation.use-case.ts"
Cohesion: 0.06
Nodes (25): ActivateAccountOutput, ActivateAccountInput, activateAccountSchema, BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand (+17 more)

### Community 14 - "company-context.module.ts"
Cohesion: 0.16
Nodes (11): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PutCompanyContextUseCase, Inject (+3 more)

### Community 15 - "prisma-run.adapter.ts"
Cohesion: 0.16
Nodes (13): LightRunItem, RunRecordBase, ALLOWED_RUN_STATES, CANCELABLE_RUN_STATUSES, RunLogRow, RunReviewFields, RunRow, LightRunRow (+5 more)

### Community 16 - "auth.module.ts"
Cohesion: 0.14
Nodes (9): hashRefreshToken(), parseTtlSeconds(), Inject, LogoutUseCase, Inject, Injectable, REFRESH_SESSION_REPOSITORY, RefreshSessionRepository (+1 more)

### Community 17 - "PageOutline"
Cohesion: 0.07
Nodes (9): PageOutline, CompositeRunResultReader, RunResultReader, EmptyRunResultReader, Injectable, ReelIdea, ReelScriptItem, SocialContentItem (+1 more)

### Community 18 - "PrismaRunAdapter"
Cohesion: 0.12
Nodes (5): ListRunsResult, RunSnapshot, assertTransition(), PrismaRunAdapter, Injectable

### Community 19 - "Env"
Cohesion: 0.12
Nodes (18): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, readSmtpConfig(), SmtpConfig, Inject (+10 more)

### Community 20 - "content-run.executor.ts"
Cohesion: 0.20
Nodes (14): ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject, Injectable (+6 more)

### Community 21 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 22 - "users.controller.ts"
Cohesion: 0.11
Nodes (17): Equals, IsBoolean, PatchUserDto, ApiProperty, ApiCookieAuth, ApiTags, Body, Controller (+9 more)

### Community 23 - "company-context.types.ts"
Cohesion: 0.19
Nodes (14): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CtaItem (+6 more)

### Community 24 - "social.types.ts"
Cohesion: 0.09
Nodes (16): toInputJson(), SocialResultStore, PipelineState, ReelDurationSeconds, ReelScript, ReelScriptSegment, SocialContent, SocialPipelineInput (+8 more)

### Community 25 - "start-run.use-case.ts"
Cohesion: 0.12
Nodes (22): contentBriefSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema, socialStartRunSchema (+14 more)

### Community 26 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): ApiPropertyOptional, IsObject, AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto (+12 more)

### Community 27 - "TransactionalMailer"
Cohesion: 0.14
Nodes (10): ActivateAccountUseCase, Inject, Injectable, Inject, TransactionalMail, TransactionalMailer, LoggingMailerAdapter, Injectable (+2 more)

### Community 28 - ".execute"
Cohesion: 0.21
Nodes (4): DeleteUserUseCase, Inject, Injectable, GuestPurgePort

### Community 29 - "create-feedback.use-case.ts"
Cohesion: 0.29
Nodes (6): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FEEDBACK_BODY_MAX, FEEDBACK_REPOSITORY

### Community 30 - "in-process-run.worker.ts"
Cohesion: 0.12
Nodes (11): Inject, RunLifecycleService, TransitionExtras, Inject, Injectable, RecoverInterruptedRunsUseCase, Inject, Injectable (+3 more)

### Community 31 - "RunRecord"
Cohesion: 0.26
Nodes (6): RunDispatchExecutor, RunExecuteOptions, RunExecutorPort, RunRecord, StubRunExecutor, Injectable

### Community 32 - "user-invited.template.ts"
Cohesion: 0.22
Nodes (20): UserActivationMail, UserInvitedMail, UserWelcomeMail, escapeHtml(), MAIL_PALETTE, MailPalette, MailShellContent, MailShellTextContent (+12 more)

### Community 33 - "InProcessRunWorker"
Cohesion: 0.16
Nodes (6): Inject, InProcessRunWorker, Injectable, RunAbortRegistry, Injectable, Inject

### Community 34 - "guest-purge.module.ts"
Cohesion: 0.21
Nodes (7): GUEST_PURGE, GuestPurgeDeleteStats, LIVE_RUN_STATUSES, GuestPurgeModule, Module, PrismaGuestPurgeAdapter, Injectable

### Community 35 - "HttpExceptionFilter"
Cohesion: 0.31
Nodes (3): Catch, ErrorEnvelope, HttpExceptionFilter

### Community 36 - "company-context.mapper.ts"
Cohesion: 0.14
Nodes (11): Put, toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema (+3 more)

### Community 37 - "company-context.controller.ts"
Cohesion: 0.18
Nodes (8): InviteUserDto, ApiProperty, IsEmail, Query, ALLOW_GUEST_KEY, AllowGuest(), ACCESS_COOKIE_NAME, COOKIE_AUTH_NAME

### Community 38 - "get-runs-summary.use-case.ts"
Cohesion: 0.15
Nodes (11): CacheEntry, cacheKey(), GetRunsSummaryUseCase, RUNS_SUMMARY_CACHE_TTL_MS, RUNS_SUMMARY_WINDOW_MS, scopeFor(), successRate(), Inject (+3 more)

### Community 39 - "UserRepository"
Cohesion: 0.08
Nodes (18): BootstrapStatusUseCase, Inject, Injectable, LoginUseCase, Inject, Injectable, MeUseCase, Inject (+10 more)

### Community 40 - ".constructor"
Cohesion: 0.13
Nodes (10): ListRunsUseCase, Inject, Injectable, ListRunsUserUseCase, Inject, Injectable, SaveOutputEditedUseCase, Inject (+2 more)

### Community 41 - "env.schema.ts"
Cohesion: 0.24
Nodes (8): AppModule, Module, bootstrap(), envSchema, parseCorsOrigins(), validateEnv(), configureHttpApp(), buildSwaggerConfig()

### Community 42 - "Public"
Cohesion: 0.42
Nodes (6): Body, HttpCode, Post, Res, setAuthCookies(), Public()

### Community 43 - "llm-hop.ts"
Cohesion: 0.22
Nodes (11): isRetryable(), RetryReason, ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid(), repairSuffix() (+3 more)

### Community 45 - "InvitationsController"
Cohesion: 0.17
Nodes (10): InvitationsController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+2 more)

### Community 46 - "PrismaRefreshSessionAdapter"
Cohesion: 0.31
Nodes (3): RefreshSessionRecord, PrismaRefreshSessionAdapter, Injectable

### Community 47 - "DomainException"
Cohesion: 0.12
Nodes (22): comparePassword(), hashPassword(), AuthTokenResult, BootstrapAdminUseCase, Injectable, DeleteUserResult, ReactivateUserUseCase, Injectable (+14 more)

### Community 48 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ArrayUnique, ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min (+2 more)

### Community 49 - "CompanyContext"
Cohesion: 0.26
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 50 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 51 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

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
Cohesion: 0.29
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 56 - "assert-company-context-writable.ts"
Cohesion: 0.33
Nodes (6): assertAudienceProfileNamesUnique(), assertCompanyContextWritable(), CompanyContextWriteDetail, normalizeAudienceName(), withEffectiveAudience(), createLoadContextNode()

### Community 57 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 58 - "PrismaService"
Cohesion: 0.18
Nodes (5): PrismaModule, Global, Module, PrismaService, Injectable

### Community 59 - "CreateFeedbackUseCase"
Cohesion: 0.22
Nodes (7): CreateFeedbackUseCase, Inject, Injectable, FeedbackController, ApiCookieAuth, ApiTags, Controller

### Community 60 - "prisma.feedback-run-reader.adapter.ts"
Cohesion: 0.31
Nodes (4): FeedbackRunLookup, FeedbackRunReader, PrismaFeedbackRunReaderAdapter, Injectable

### Community 61 - "AuthController"
Cohesion: 0.20
Nodes (7): Req, AuthController, ApiCookieAuth, ApiTags, Controller, Get, Patch

### Community 62 - "patch-company-context.use-case.ts"
Cohesion: 0.31
Nodes (6): toPublicCompanyContext(), PatchCompanyContextUseCase, Inject, Injectable, PartialCompanyContext, mergeCompanyContext()

### Community 63 - "is-complete.ts"
Cohesion: 0.62
Nodes (6): collectGateItemPaths(), isCompleteAudienceProfile(), isCompleteCtaItem(), isCompleteOfferItem(), nonEmpty(), sectionFilled

### Community 64 - "ListUsersUseCase"
Cohesion: 0.33
Nodes (3): ListUsersUseCase, Inject, Injectable

### Community 65 - ".create"
Cohesion: 0.20
Nodes (9): MaxLength, Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString (+1 more)

### Community 66 - "RegisterUserDto"
Cohesion: 0.33
Nodes (5): RegisterUserDto, ApiProperty, IsEmail, IsString, MinLength

### Community 67 - "BootstrapAdminDto"
Cohesion: 0.33
Nodes (5): BootstrapAdminDto, ApiProperty, IsEmail, IsString, MinLength

### Community 68 - "LoginDto"
Cohesion: 0.33
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 69 - "AcceptInviteDto"
Cohesion: 0.40
Nodes (4): AcceptInviteDto, ApiProperty, IsString, MinLength

### Community 70 - "GuestGuard"
Cohesion: 0.40
Nodes (3): GuestGuard, Inject, Injectable

### Community 71 - "runs.controller.ts"
Cohesion: 0.11
Nodes (22): CancelRunUseCase, Injectable, GetRunGuestAccess, GetRunOutput, GetRunUseCase, Injectable, ListRunsOutput, ListRunsUserItem (+14 more)

### Community 72 - "ActivateAccountDto"
Cohesion: 0.40
Nodes (4): ActivateAccountDto, ApiProperty, IsString, MinLength

### Community 73 - "AutoFinalizeExpiredReviewsUseCase"
Cohesion: 0.40
Nodes (3): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable

### Community 74 - "FinalizeReviewUseCase"
Cohesion: 0.40
Nodes (3): FinalizeReviewUseCase, Inject, Injectable

### Community 75 - "ResendActivationDto"
Cohesion: 0.50
Nodes (3): ResendActivationDto, ApiProperty, IsEmail

## Knowledge Gaps
- **111 isolated node(s):** `acceptInviteSchema`, `AcceptInviteResult`, `ActivateAccountOutput`, `BootstrapAdminInput`, `LoginInput` (+106 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 432 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DomainException` connect `DomainException` to `llm-gateway.http.adapter.ts`, `AuthUser`, `GuestQuotaPort`, `AuthUserContext`, `save-output-edited.use-case.ts`, `runs.module.ts`, `register-user.use-case.ts`, `social-pipeline.facade.ts`, `resend-activation.use-case.ts`, `prisma-run.adapter.ts`, `PrismaRunAdapter`, `Env`, `content-run.executor.ts`, `prisma-invitation.adapter.ts`, `start-run.use-case.ts`, `TransactionalMailer`, `.execute`, `create-feedback.use-case.ts`, `llm-hop.ts`, `prisma-feedback.adapter.ts`, `assert-company-context-writable.ts`, `runs.controller.ts`, `FinalizeReviewUseCase`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `Env` connect `Env` to `llm-gateway.http.adapter.ts`, `GuestQuotaPort`, `health.service.ts`, `save-output-edited.use-case.ts`, `runs.module.ts`, `RunRepository`, `register-user.use-case.ts`, `social-pipeline.facade.ts`, `resend-activation.use-case.ts`, `auth.module.ts`, `TransactionalMailer`, `in-process-run.worker.ts`, `company-context.controller.ts`, `UserRepository`, `.constructor`, `env.schema.ts`, `llm-hop.ts`, `DomainException`, `PublicConfigController`, `InMemoryRunSseHub`, `GuestGuard`, `runs.controller.ts`, `AutoFinalizeExpiredReviewsUseCase`, `FinalizeReviewUseCase`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `AuthUserContext` connect `AuthUserContext` to `.create`, `GuestQuotaPort`, `company-context.controller.ts`, `get-runs-summary.use-case.ts`, `runs.controller.ts`, `save-output-edited.use-case.ts`, `runs.module.ts`, `FinalizeReviewUseCase`, `express.d.ts`, `InvitationsController`, `DomainException`, `create-feedback.use-case.ts`, `Env`, `users.controller.ts`, `prisma-feedback.adapter.ts`, `start-run.use-case.ts`, `.execute`, `AuthController`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **What connects `acceptInviteSchema`, `AcceptInviteResult`, `ActivateAccountOutput` to the rest of the system?**
  _111 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `llm-gateway.http.adapter.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05632360471070148 - nodes in this community are weakly interconnected._
- **Should `app.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06854838709677419 - nodes in this community are weakly interconnected._
- **Should `AuthUser` be split into smaller, more focused modules?**
  _Cohesion score 0.09024390243902439 - nodes in this community are weakly interconnected._
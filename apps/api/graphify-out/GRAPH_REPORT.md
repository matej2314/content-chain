# Graph Report - api  (2026-10-21)

## Corpus Check
- 240 files · ~37,330 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1565 nodes · 4507 edges · 76 communities (69 shown, 7 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 94 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bc7c8162`
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
- runs.controller.ts
- RunRepository
- invite-user.use-case.ts
- Env
- DomainException
- CompanyContextRepository
- prisma-run.adapter.ts
- parseTtlMs
- get-run.use-case.ts
- RunRecord
- content.types.ts
- auth.module.ts
- prisma-invitation.adapter.ts
- UsersController
- company-context.types.ts
- prisma-social-result.adapter.ts
- start-run.use-case.ts
- company-context.dto.ts
- register-user.use-case.ts
- delete-user.use-case.ts
- feedback.module.ts
- in-process-run.worker.ts
- RunLifecycleService
- user-activation.template.ts
- InProcessRunWorker
- guest-purge.module.ts
- HttpExceptionFilter
- company-context.mapper.ts
- auth-user-context.ts
- get-runs-summary.use-case.ts
- UserRepository
- LlmHopService
- VerifierVerdict
- AuthController
- llm-hop.ts
- SocialResultStore
- InvitationsController
- prisma.service.ts
- rate-run.use-case.ts
- ListRunsQueryDto
- CompanyContext
- PublicConfigController
- InMemoryRunSseHub
- StartRunDto
- transactional-mailer.port.ts
- output-edited-writer.port.ts
- CompanyContextController
- assert-company-context-writable.ts
- Public
- PrismaService
- CreateFeedbackUseCase
- prisma.feedback-run-reader.adapter.ts
- CompositeRunResultReader
- RunExecutorPort
- EmptyRunResultReader
- .postRegister
- CreateFeedbackDto
- .postActivate
- BootstrapAdminDto
- LoginDto
- AcceptInviteDto
- GuestGuard
- HitlDto
- PatchRunRatingDto
- ParseRunIdPipe
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
- `Request` --references--> `AuthUserContext`  [EXTRACTED]
  src/shared/http/express.d.ts → src/shared/types/auth-user-context.ts
- `setAuthCookies()` --calls--> `parseTtlMs()`  [EXTRACTED]
  src/auth/infrastructure/session/cookie.helper.ts → src/auth/application/auth.helpers.ts
- `rejectDeadGuestSession()` --calls--> `DomainException`  [EXTRACTED]
  src/auth/application/reject-dead-guest-session.ts → src/shared/exceptions/domain.exception.ts
- `PrismaInvitationAdapter` --implements--> `InvitationRepository`  [EXTRACTED]
  src/auth/infrastructure/persistence/prisma-invitation.adapter.ts → src/auth/domain/invitation-repository.port.ts
- `validatePasswordPolicy()` --calls--> `DomainException`  [EXTRACTED]
  src/auth/domain/password.policy.ts → src/shared/exceptions/domain.exception.ts

## Import Cycles
- None detected.

## Communities (76 total, 7 thin omitted)

### Community 0 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (39): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+31 more)

### Community 1 - "app.module.ts"
Cohesion: 0.08
Nodes (39): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor (+31 more)

### Community 2 - "AuthUser"
Cohesion: 0.07
Nodes (18): Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult (+10 more)

### Community 3 - "GuestQuotaPort"
Cohesion: 0.07
Nodes (26): AppModule, Module, bootstrap(), GUEST_QUOTA, GuestQuotaAdmitResult, GuestQuotaPort, GuestQuotaModule, Module (+18 more)

### Community 4 - "AuthUserContext"
Cohesion: 0.11
Nodes (21): ApiCookieAuth, Patch, Body, Body, HttpCode, Post, RunsController, ApiCookieAuth (+13 more)

### Community 5 - "health.service.ts"
Cohesion: 0.07
Nodes (31): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+23 more)

### Community 6 - "content.graph.ts"
Cohesion: 0.13
Nodes (31): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+23 more)

### Community 7 - "social.graph.ts"
Cohesion: 0.14
Nodes (30): ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE, nextRefineCount(), isTwoStageSocialTask() (+22 more)

### Community 8 - "save-output-edited.use-case.ts"
Cohesion: 0.08
Nodes (37): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+29 more)

### Community 9 - "runs.controller.ts"
Cohesion: 0.10
Nodes (30): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Injectable, GetRunLogsOutput, GetRunLogsUseCase, Injectable (+22 more)

### Community 10 - "RunRepository"
Cohesion: 0.06
Nodes (11): Inject, Inject, Inject, GuestRunPolicyService, Inject, Injectable, Inject, Inject (+3 more)

### Community 11 - "invite-user.use-case.ts"
Cohesion: 0.09
Nodes (24): formatMailValidityLabel(), polishPlural(), InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem (+16 more)

### Community 12 - "Env"
Cohesion: 0.10
Nodes (22): BootstrapAdminUseCase, Inject, Injectable, LoginUseCase, Inject, Injectable, RefreshUseCase, Inject (+14 more)

### Community 13 - "DomainException"
Cohesion: 0.10
Nodes (24): ActivateAccountOutput, ActivateAccountUseCase, Injectable, ActivateAccountInput, activateAccountSchema, BootstrapAdminInput, bootstrapAdminSchema, LoginInput (+16 more)

### Community 14 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (19): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+11 more)

### Community 15 - "prisma-run.adapter.ts"
Cohesion: 0.11
Nodes (22): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+14 more)

### Community 16 - "parseTtlMs"
Cohesion: 0.16
Nodes (12): comparePassword(), generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), AuthTokenResult, LogoutUseCase, Inject (+4 more)

### Community 17 - "get-run.use-case.ts"
Cohesion: 0.17
Nodes (14): GetRunGuestAccess, GetRunOutput, orderItemsBySelectedIds(), ListRunsOutput, RunStartedBy, RUN_RESULT_READER, RunResultReader, SocialBrief (+6 more)

### Community 18 - "RunRecord"
Cohesion: 0.12
Nodes (5): ListRunsResult, RunLogEntry, RunRecord, PrismaRunAdapter, Injectable

### Community 19 - "content.types.ts"
Cohesion: 0.13
Nodes (12): ContentResultStore, ContentPipelineInput, ContentPipelineState, ContentRefineSnapshot, PageOutline, PageOutlineSection, PageOutlineSectionRole, VerifierVerdict (+4 more)

### Community 20 - "auth.module.ts"
Cohesion: 0.15
Nodes (14): BootstrapStatusUseCase, Injectable, MeUseCase, Injectable, RESEND_ACTIVATION_RATE_LIMITER, ResendActivationOutput, ResendActivationUseCase, SUCCESS (+6 more)

### Community 21 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 22 - "UsersController"
Cohesion: 0.09
Nodes (18): Equals, IsBoolean, ListUsersUseCase, Inject, Injectable, PatchUserDto, ApiProperty, ApiCookieAuth (+10 more)

### Community 23 - "company-context.types.ts"
Cohesion: 0.16
Nodes (20): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CtaItem (+12 more)

### Community 24 - "prisma-social-result.adapter.ts"
Cohesion: 0.12
Nodes (9): PipelineState, ReelScriptSegment, mapStoredReelScript(), mapStoredReelScriptSegment(), mapStoredSocialContent(), asContentItem(), asReelScriptItem(), PrismaSocialResultAdapter (+1 more)

### Community 25 - "start-run.use-case.ts"
Cohesion: 0.13
Nodes (16): GUEST_ARCHIVE_STATUSES, GUEST_TASK_TYPES, GuestRunAdmit, isGuestArchiveStatus(), isGuestTaskType(), isContentStartCommand(), isPlainRecord(), omitUndefinedDeep() (+8 more)

### Community 26 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): ApiPropertyOptional, IsObject, AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto (+12 more)

### Community 27 - "register-user.use-case.ts"
Cohesion: 0.17
Nodes (13): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, hashPassword(), isUniqueConstraintViolation(), RegisterUserOutput (+5 more)

### Community 28 - "delete-user.use-case.ts"
Cohesion: 0.15
Nodes (9): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, FEEDBACK_PURGE, FeedbackPurgePort, PrismaFeedbackPurgeAdapter, Injectable (+1 more)

### Community 29 - "feedback.module.ts"
Cohesion: 0.17
Nodes (12): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FEEDBACK_BODY_MAX, FEEDBACK_REPOSITORY, FeedbackEntry, FeedbackRepository (+4 more)

### Community 30 - "in-process-run.worker.ts"
Cohesion: 0.15
Nodes (10): RunAbortRegistry, Injectable, TransitionExtras, OUTPUT_EDITED_WRITER, RUN_EXECUTOR, RUN_SSE_HUB, RunSseHub, ALLOWED_RUN_STATES (+2 more)

### Community 31 - "RunLifecycleService"
Cohesion: 0.14
Nodes (10): RunLifecycleService, Inject, Injectable, RecoverInterruptedRunsUseCase, Inject, Injectable, isRetryable(), RetryReason (+2 more)

### Community 32 - "user-activation.template.ts"
Cohesion: 0.28
Nodes (14): UserActivationMail, UserInvitedMail, escapeHtml(), MAIL_PALETTE, MailPalette, MailShellContent, MailShellTextContent, wrapMailHtml() (+6 more)

### Community 33 - "InProcessRunWorker"
Cohesion: 0.15
Nodes (6): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, InProcessRunWorker, Inject, Injectable

### Community 34 - "guest-purge.module.ts"
Cohesion: 0.16
Nodes (10): GUEST_PURGE, GuestPurgeDeleteStats, LIVE_RUN_STATUSES, GuestPurgeModule, Module, PrismaGuestPurgeAdapter, Injectable, PrismaModule (+2 more)

### Community 35 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): Catch, ErrorEnvelope, HttpExceptionFilter, newRequestId(), RequestIdMiddleware, Injectable

### Community 36 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (12): Put, toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema (+4 more)

### Community 37 - "auth-user-context.ts"
Cohesion: 0.19
Nodes (6): ALLOW_GUEST_KEY, ROLES_KEY, ACCESS_COOKIE_NAME, COOKIE_AUTH_NAME, Express, Request

### Community 38 - "get-runs-summary.use-case.ts"
Cohesion: 0.15
Nodes (11): CacheEntry, cacheKey(), GetRunsSummaryUseCase, RUNS_SUMMARY_CACHE_TTL_MS, RUNS_SUMMARY_WINDOW_MS, scopeFor(), successRate(), Inject (+3 more)

### Community 39 - "UserRepository"
Cohesion: 0.13
Nodes (6): Inject, Inject, Inject, Inject, Inject, UserRepository

### Community 40 - "LlmHopService"
Cohesion: 0.17
Nodes (10): Inject, Inject, CompileContentGraphOptions, RunLifecyclePort, LlmHopService, Inject, Injectable, Inject (+2 more)

### Community 41 - "VerifierVerdict"
Cohesion: 0.23
Nodes (4): PageDocument, toInputJson(), SocialContent, VerifierVerdict

### Community 42 - "AuthController"
Cohesion: 0.32
Nodes (9): Req, AuthController, ApiTags, Body, Controller, HttpCode, Post, Res (+1 more)

### Community 43 - "llm-hop.ts"
Cohesion: 0.25
Nodes (10): LLM_GATEWAY_PORT, ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid(), repairSuffix(), throwIfAborted() (+2 more)

### Community 45 - "InvitationsController"
Cohesion: 0.18
Nodes (9): InvitationsController, ApiCookieAuth, ApiTags, Controller, Delete, Get, HttpCode, Param (+1 more)

### Community 46 - "prisma.service.ts"
Cohesion: 0.24
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 47 - "rate-run.use-case.ts"
Cohesion: 0.24
Nodes (8): RateRunUseCase, ratingSchema, Inject, Injectable, assertRunReviewable(), ReviewWindowParams, computeReviewExpiresAt(), isReviewWindowOpen()

### Community 48 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ArrayUnique, ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min (+2 more)

### Community 49 - "CompanyContext"
Cohesion: 0.26
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 50 - "PublicConfigController"
Cohesion: 0.17
Nodes (9): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject, PublicConfigModule (+1 more)

### Community 51 - "InMemoryRunSseHub"
Cohesion: 0.27
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 52 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 53 - "transactional-mailer.port.ts"
Cohesion: 0.27
Nodes (6): TransactionalMail, TransactionalMailer, LoggingMailerAdapter, Injectable, NodemailerSmtpMailerAdapter, Injectable

### Community 54 - "output-edited-writer.port.ts"
Cohesion: 0.27
Nodes (6): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable

### Community 55 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 56 - "assert-company-context-writable.ts"
Cohesion: 0.36
Nodes (5): assertAudienceProfileNamesUnique(), CompanyContextWriteDetail, normalizeAudienceName(), withEffectiveAudience(), createLoadContextNode()

### Community 57 - "Public"
Cohesion: 0.22
Nodes (5): Get, ResendActivationDto, ApiProperty, IsEmail, Public()

### Community 59 - "CreateFeedbackUseCase"
Cohesion: 0.22
Nodes (7): CreateFeedbackUseCase, Inject, Injectable, FeedbackController, ApiCookieAuth, ApiTags, Controller

### Community 60 - "prisma.feedback-run-reader.adapter.ts"
Cohesion: 0.36
Nodes (4): FeedbackRunLookup, FeedbackRunReader, PrismaFeedbackRunReaderAdapter, Injectable

### Community 62 - "RunExecutorPort"
Cohesion: 0.46
Nodes (3): RunDispatchExecutor, RunExecuteOptions, RunExecutorPort

### Community 64 - ".postRegister"
Cohesion: 0.29
Nodes (5): RegisterUserDto, ApiProperty, IsEmail, IsString, MinLength

### Community 65 - "CreateFeedbackDto"
Cohesion: 0.33
Nodes (6): MaxLength, CreateFeedbackDto, IsIn, IsOptional, IsString, MinLength

### Community 66 - ".postActivate"
Cohesion: 0.33
Nodes (4): ActivateAccountDto, ApiProperty, IsString, MinLength

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

### Community 71 - "HitlDto"
Cohesion: 0.50
Nodes (3): HitlDto, IsArray, IsString

### Community 72 - "PatchRunRatingDto"
Cohesion: 0.50
Nodes (3): PatchRunRatingDto, IsIn, ValidateIf

## Knowledge Gaps
- **110 isolated node(s):** `acceptInviteSchema`, `AcceptInviteResult`, `ActivateAccountOutput`, `BootstrapAdminInput`, `LoginInput` (+105 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 431 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DomainException` connect `DomainException` to `llm-gateway.http.adapter.ts`, `app.module.ts`, `AuthUser`, `AuthUserContext`, `save-output-edited.use-case.ts`, `runs.controller.ts`, `invite-user.use-case.ts`, `Env`, `CompanyContextRepository`, `parseTtlMs`, `get-run.use-case.ts`, `auth.module.ts`, `prisma-invitation.adapter.ts`, `start-run.use-case.ts`, `register-user.use-case.ts`, `delete-user.use-case.ts`, `feedback.module.ts`, `in-process-run.worker.ts`, `HttpExceptionFilter`, `llm-hop.ts`, `rate-run.use-case.ts`, `assert-company-context-writable.ts`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Why does `Env` connect `Env` to `llm-gateway.http.adapter.ts`, `GuestQuotaPort`, `health.service.ts`, `save-output-edited.use-case.ts`, `runs.controller.ts`, `RunRepository`, `invite-user.use-case.ts`, `parseTtlMs`, `get-run.use-case.ts`, `auth.module.ts`, `start-run.use-case.ts`, `register-user.use-case.ts`, `in-process-run.worker.ts`, `InProcessRunWorker`, `auth-user-context.ts`, `UserRepository`, `LlmHopService`, `llm-hop.ts`, `rate-run.use-case.ts`, `PublicConfigController`, `InMemoryRunSseHub`, `output-edited-writer.port.ts`, `GuestGuard`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `AuthUserContext` connect `AuthUserContext` to `auth-user-context.ts`, `get-runs-summary.use-case.ts`, `save-output-edited.use-case.ts`, `runs.controller.ts`, `invite-user.use-case.ts`, `Env`, `DomainException`, `rate-run.use-case.ts`, `get-run.use-case.ts`, `auth.module.ts`, `UsersController`, `start-run.use-case.ts`, `delete-user.use-case.ts`, `feedback.module.ts`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `acceptInviteSchema`, `AcceptInviteResult`, `ActivateAccountOutput` to the rest of the system?**
  _110 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `llm-gateway.http.adapter.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05737704918032787 - nodes in this community are weakly interconnected._
- **Should `app.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0822746521476104 - nodes in this community are weakly interconnected._
- **Should `AuthUser` be split into smaller, more focused modules?**
  _Cohesion score 0.06711915535444947 - nodes in this community are weakly interconnected._
# Graph Report - api  (2026-09-28)

## Corpus Check
- 194 files · ~29,533 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1271 nodes · 3580 edges · 56 communities (53 shown, 3 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 67 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6a8837cb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- content.graph.ts
- app.module.ts
- content-writer.node.ts
- auth.module.ts
- HealthController
- RefreshSessionRepository
- auth.controller.ts
- runs.controller.ts
- bootstrap-admin.use-case.ts
- prisma-run.adapter.ts
- llm-gateway.http.adapter.ts
- in-process-run.worker.ts
- prisma-user.adapter.ts
- RunsController
- prisma-invitation.adapter.ts
- company-context.types.ts
- save-output-edited.use-case.ts
- run-record.test-helpers.ts
- company-context.controller.ts
- ReelIdea
- RunRepository
- AuthController
- company-context.dto.ts
- social.types.ts
- InvitationsController
- DomainException
- InProcessRunWorker
- users.controller.ts
- create-feedback.use-case.ts
- AuthUserContext
- company-context.port.ts
- SocialResultStore
- .create
- Env
- CompanyContextRepository
- feedback.types.ts
- social.graph.ts
- start-run.use-case.ts
- PrismaService
- RunLifecycleService
- ListRunsQueryDto
- StartRunDto
- PrismaRefreshSessionAdapter
- CompanyContextController
- http-metrics.interceptor.ts
- metrics.module.ts
- llm-hop.ts
- LlmGatewayHttpAdapter
- .constructor
- feedback.controller.ts
- llm-gateway-chat.log.ts
- llm-gateway.port.ts
- FeedbackRepository
- PatchRunRatingDto
- ParseRunIdPipe
- RolesGuard

## God Nodes (most connected - your core abstractions)
1. `DomainException` - 68 edges
2. `RunRepository` - 45 edges
3. `RunRecord` - 36 edges
4. `AuthUserContext` - 35 edges
5. `parseWithZod()` - 32 edges
6. `SocialResultStore` - 32 edges
7. `UserRepository` - 31 edges
8. `Env` - 31 edges
9. `VerifierVerdict` - 31 edges
10. `PrismaService` - 27 edges

## Surprising Connections (you probably didn't know these)
- `setAuthCookies()` --calls--> `parseTtlMs()`  [EXTRACTED]
  src/auth/infrastructure/cookie.helper.ts → src/auth/application/auth.helpers.ts
- `PrismaInvitationAdapter` --implements--> `InvitationRepository`  [EXTRACTED]
  src/auth/infrastructure/prisma-invitation.adapter.ts → src/auth/domain/invitation-repository.port.ts
- `validatePasswordPolicy()` --calls--> `DomainException`  [EXTRACTED]
  src/auth/domain/password.policy.ts → src/shared/exceptions/domain.exception.ts
- `PrismaRefreshSessionAdapter` --implements--> `RefreshSessionRepository`  [EXTRACTED]
  src/auth/infrastructure/prisma-refresh-session.adapter.ts → src/auth/domain/refresh-session.repository.port.ts
- `PrismaUserAdapter` --implements--> `UserRepository`  [EXTRACTED]
  src/auth/infrastructure/prisma-user.adapter.ts → src/auth/domain/user-repository.port.ts

## Import Cycles
- None detected.

## Communities (56 total, 3 thin omitted)

### Community 0 - "content.graph.ts"
Cohesion: 0.06
Nodes (64): ContentPipelineFacade, toOutcome(), Inject, Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject (+56 more)

### Community 1 - "app.module.ts"
Cohesion: 0.14
Nodes (14): AuthModule, Module, ContentModule, Module, RunDispatchExecutor, RunExecuteOptions, RunExecutorPort, RUN_LIFECYCLE (+6 more)

### Community 2 - "content-writer.node.ts"
Cohesion: 0.18
Nodes (21): loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType (+13 more)

### Community 3 - "auth.module.ts"
Cohesion: 0.10
Nodes (25): InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase, Inject (+17 more)

### Community 4 - "HealthController"
Cohesion: 0.12
Nodes (14): ApiOperation, HealthController, ApiOkResponse, ApiTags, Controller, Get, HealthModule, Module (+6 more)

### Community 5 - "RefreshSessionRepository"
Cohesion: 0.11
Nodes (8): Inject, Inject, LogoutUseCase, Inject, Injectable, Inject, REFRESH_SESSION_REPOSITORY, RefreshSessionRepository

### Community 6 - "auth.controller.ts"
Cohesion: 0.07
Nodes (25): BootstrapStatusUseCase, Inject, Injectable, ListUsersUseCase, Inject, Injectable, MeUseCase, Inject (+17 more)

### Community 7 - "runs.controller.ts"
Cohesion: 0.13
Nodes (25): GetRunLogsOutput, GetRunLogsUseCase, Injectable, GetRunUseCase, Injectable, ListRunsOutput, ListRunsUseCase, Injectable (+17 more)

### Community 8 - "bootstrap-admin.use-case.ts"
Cohesion: 0.13
Nodes (21): AcceptInviteResult, acceptInviteSchema, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds() (+13 more)

### Community 9 - "prisma-run.adapter.ts"
Cohesion: 0.09
Nodes (14): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, ALLOWED_RUN_STATES, assertTransition(), CANCELABLE_RUN_STATUSES, PrismaRunAdapter (+6 more)

### Community 10 - "llm-gateway.http.adapter.ts"
Cohesion: 0.19
Nodes (10): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), redactGatewaySecret(), LlmGatewayError, GatewayChatResponse, GatewayErrorBody, RETRYABLE_CODES (+2 more)

### Community 11 - "in-process-run.worker.ts"
Cohesion: 0.16
Nodes (8): TransitionExtras, RUN_EXECUTOR, RUN_SSE_HUB, RunSseEvent, RunSseHub, InMemoryRunSseHub, Inject, Injectable

### Community 12 - "prisma-user.adapter.ts"
Cohesion: 0.15
Nodes (9): AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult, UserForAuth, CreateUserData, isUniqueConstraintViolation(), PrismaUserAdapter, Injectable (+1 more)

### Community 13 - "RunsController"
Cohesion: 0.10
Nodes (19): Query, FinalizeReviewUseCase, Injectable, orderItemsBySelectedIds(), HitlDto, IsArray, IsString, isTerminalStatus() (+11 more)

### Community 14 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 15 - "company-context.types.ts"
Cohesion: 0.17
Nodes (19): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+11 more)

### Community 16 - "save-output-edited.use-case.ts"
Cohesion: 0.07
Nodes (41): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+33 more)

### Community 17 - "run-record.test-helpers.ts"
Cohesion: 0.15
Nodes (12): Catch, makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, ErrorEnvelope, HttpExceptionFilter, newConversationId() (+4 more)

### Community 18 - "company-context.controller.ts"
Cohesion: 0.23
Nodes (11): GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase, Injectable (+3 more)

### Community 19 - "ReelIdea"
Cohesion: 0.07
Nodes (7): CompositeRunResultReader, RunResultReader, EmptyRunResultReader, Injectable, ReelIdea, ReelScriptItem, SocialContentItem

### Community 20 - "RunRepository"
Cohesion: 0.07
Nodes (9): Inject, Inject, Inject, Inject, Inject, Inject, Inject, RunRepository (+1 more)

### Community 21 - "AuthController"
Cohesion: 0.17
Nodes (16): Req, AuthController, ApiTags, Body, Controller, Get, HttpCode, Post (+8 more)

### Community 22 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): ApiPropertyOptional, IsObject, AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto (+12 more)

### Community 23 - "social.types.ts"
Cohesion: 0.17
Nodes (17): isSocialRunRecord(), RunRecordBase, SocialBrief, SocialRunRecord, SocialPipelineFacade, toOutcome(), Injectable, SocialRunExecutor (+9 more)

### Community 24 - "InvitationsController"
Cohesion: 0.12
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 25 - "DomainException"
Cohesion: 0.17
Nodes (10): ReactivateUserUseCase, Inject, Injectable, UserListItem, ratingSchema, assertRunReviewable(), DomainException, extractJsonText() (+2 more)

### Community 26 - "InProcessRunWorker"
Cohesion: 0.15
Nodes (6): InProcessRunWorker, Inject, Injectable, RunAbortRegistry, Injectable, Inject

### Community 27 - "users.controller.ts"
Cohesion: 0.08
Nodes (24): Equals, IsBoolean, AppModule, Module, SoftDeleteUserUseCase, Injectable, PatchUserDto, ApiProperty (+16 more)

### Community 28 - "create-feedback.use-case.ts"
Cohesion: 0.24
Nodes (8): FEEDBACK_RUN_READER, FeedbackRunLookup, FeedbackRunReader, FEEDBACK_REPOSITORY, FeedbackModule, Module, PrismaFeedbackRunReaderAdapter, Injectable

### Community 29 - "AuthUserContext"
Cohesion: 0.13
Nodes (12): ApiCookieAuth, Patch, isRecord(), ListRunsUserItem, ListRunsUserOutput, ListRunsUserUseCase, Injectable, CurrentUser (+4 more)

### Community 30 - "company-context.port.ts"
Cohesion: 0.23
Nodes (10): toPublicCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, assertCompanyContextWritable(), PartialCompanyContext (+2 more)

### Community 31 - "SocialResultStore"
Cohesion: 0.08
Nodes (15): toInputJson(), SocialResultStore, PipelineState, ReelScript, ReelScriptSegment, SocialContent, SocialIdea, VerifierVerdict (+7 more)

### Community 32 - ".create"
Cohesion: 0.20
Nodes (9): MaxLength, Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString (+1 more)

### Community 33 - "Env"
Cohesion: 0.15
Nodes (15): clearAuthCookies(), readCookie(), JwtCookieStrategy, Inject, Injectable, readSmtpConfig(), SmtpConfig, Inject (+7 more)

### Community 34 - "CompanyContextRepository"
Cohesion: 0.13
Nodes (10): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, jsonArray(), jsonRecord() (+2 more)

### Community 35 - "feedback.types.ts"
Cohesion: 0.38
Nodes (4): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_BODY_MAX

### Community 36 - "social.graph.ts"
Cohesion: 0.21
Nodes (13): Inject, canRefine(), createFailRunNode(), createLoadContextNode(), createNormalizeBriefNode(), createPersistContentNode(), sourceIdeaIdFromState(), createPersistIdeasNode() (+5 more)

### Community 37 - "start-run.use-case.ts"
Cohesion: 0.14
Nodes (15): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+7 more)

### Community 38 - "PrismaService"
Cohesion: 0.15
Nodes (8): FeedbackEntry, PrismaFeedbackAdapter, Injectable, PrismaModule, Global, Module, PrismaService, Injectable

### Community 39 - "RunLifecycleService"
Cohesion: 0.14
Nodes (9): RecoverInterruptedRunsUseCase, Inject, Injectable, Inject, RunLifecycleService, Inject, Injectable, StubRunExecutor (+1 more)

### Community 40 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ArrayUnique, ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min (+2 more)

### Community 41 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 42 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 43 - "CompanyContextController"
Cohesion: 0.13
Nodes (12): Put, toCompanyContext(), toPartialCompanyContext(), CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body (+4 more)

### Community 44 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 45 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 46 - "llm-hop.ts"
Cohesion: 0.26
Nodes (10): isRetryable(), RetryReason, isAbortError(), ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid() (+2 more)

### Community 47 - "LlmGatewayHttpAdapter"
Cohesion: 0.20
Nodes (6): LlmGatewayHttpAdapter, Inject, Injectable, LlmModule, Module, LLM_GATEWAY_PORT

### Community 48 - ".constructor"
Cohesion: 0.20
Nodes (7): AcceptInviteUseCase, Inject, Injectable, RefreshUseCase, Inject, Injectable, Inject

### Community 49 - "feedback.controller.ts"
Cohesion: 0.29
Nodes (6): CreateFeedbackUseCase, Injectable, FeedbackController, ApiCookieAuth, ApiTags, Controller

### Community 50 - "llm-gateway-chat.log.ts"
Cohesion: 0.36
Nodes (6): GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, LlmChatMessage, LlmChatParams, LlmUsage

### Community 51 - "llm-gateway.port.ts"
Cohesion: 0.38
Nodes (4): LlmGatewayPort, LlmChatCommand, LlmChatResult, Inject

### Community 53 - "PatchRunRatingDto"
Cohesion: 0.50
Nodes (3): PatchRunRatingDto, IsIn, ValidateIf

## Knowledge Gaps
- **84 isolated node(s):** `acceptInviteSchema`, `AcceptInviteResult`, `BootstrapAdminInput`, `LoginInput`, `PatchUserCommand` (+79 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 345 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DomainException` connect `DomainException` to `content.graph.ts`, `auth.module.ts`, `RefreshSessionRepository`, `auth.controller.ts`, `runs.controller.ts`, `bootstrap-admin.use-case.ts`, `prisma-run.adapter.ts`, `prisma-user.adapter.ts`, `RunsController`, `prisma-invitation.adapter.ts`, `save-output-edited.use-case.ts`, `run-record.test-helpers.ts`, `social.types.ts`, `InvitationsController`, `users.controller.ts`, `create-feedback.use-case.ts`, `AuthUserContext`, `company-context.port.ts`, `Env`, `start-run.use-case.ts`, `http-metrics.interceptor.ts`, `llm-hop.ts`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Why does `RunRepository` connect `RunRepository` to `start-run.use-case.ts`, `runs.controller.ts`, `RunLifecycleService`, `prisma-run.adapter.ts`, `in-process-run.worker.ts`, `save-output-edited.use-case.ts`, `DomainException`, `InProcessRunWorker`, `AuthUserContext`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Why does `Env` connect `Env` to `auth.module.ts`, `RefreshSessionRepository`, `auth.controller.ts`, `runs.controller.ts`, `bootstrap-admin.use-case.ts`, `llm-gateway.http.adapter.ts`, `in-process-run.worker.ts`, `llm-hop.ts`, `LlmGatewayHttpAdapter`, `.constructor`, `llm-gateway.port.ts`, `InProcessRunWorker`, `users.controller.ts`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `acceptInviteSchema`, `AcceptInviteResult`, `BootstrapAdminInput` to the rest of the system?**
  _84 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `content.graph.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.055525606469002696 - nodes in this community are weakly interconnected._
- **Should `app.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13768115942028986 - nodes in this community are weakly interconnected._
- **Should `auth.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1048780487804878 - nodes in this community are weakly interconnected._
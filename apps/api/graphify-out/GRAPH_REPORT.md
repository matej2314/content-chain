# Graph Report - api  (2026-10-01)

## Corpus Check
- 202 files · ~30,610 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1304 nodes · 3731 edges · 54 communities (51 shown, 3 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 73 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `554d9752`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- content.graph.ts
- app.module.ts
- social.graph.ts
- invite-user.use-case.ts
- AuthController
- RefreshSessionRepository
- domain.exception.ts
- runs.controller.ts
- DomainException
- PrismaRunAdapter
- llm-gateway.http.adapter.ts
- InMemoryRunSseHub
- run.types.ts
- RunsController
- prisma-invitation.adapter.ts
- CompanyContextRepository
- save-output-edited.use-case.ts
- HttpExceptionFilter
- content.types.ts
- get-run.use-case.ts
- RunRepository
- content-run.executor.ts
- company-context.dto.ts
- social-pipeline.facade.ts
- InvitationsController
- runs.module.ts
- InProcessRunWorker
- UsersController
- create-feedback.use-case.ts
- start-run.use-case.ts
- VerifierVerdict
- prisma-social-result.adapter.ts
- .create
- Env
- SocialResultStore
- feedback.types.ts
- LlmHopService
- resume-hitl.use-case.ts
- PrismaService
- RunLifecycleService
- content.schemas.ts
- PageOutline
- PrismaRefreshSessionAdapter
- output-edited-writer.port.ts
- run-lifecycle.service.ts
- configure-swagger.ts
- llm-hop.ts
- llm.module.ts
- auth.module.ts
- feedback.controller.ts
- auth.schemas.ts
- newRequestId
- RunsModule
- roles.decorator.ts

## God Nodes (most connected - your core abstractions)
1. `DomainException` - 70 edges
2. `RunRepository` - 51 edges
3. `Env` - 41 edges
4. `RunRecord` - 37 edges
5. `AuthUserContext` - 36 edges
6. `parseWithZod()` - 32 edges
7. `SocialResultStore` - 32 edges
8. `UserRepository` - 31 edges
9. `VerifierVerdict` - 31 edges
10. `PrismaRunAdapter` - 27 edges

## Surprising Connections (you probably didn't know these)
- `Request` --references--> `AuthUserContext`  [EXTRACTED]
  src/shared/http/express.d.ts → src/shared/types/auth-user-context.ts
- `setAuthCookies()` --calls--> `parseTtlMs()`  [EXTRACTED]
  src/auth/infrastructure/cookie.helper.ts → src/auth/application/auth.helpers.ts
- `PrismaInvitationAdapter` --implements--> `InvitationRepository`  [EXTRACTED]
  src/auth/infrastructure/prisma-invitation.adapter.ts → src/auth/domain/invitation-repository.port.ts
- `PrismaRefreshSessionAdapter` --implements--> `RefreshSessionRepository`  [EXTRACTED]
  src/auth/infrastructure/prisma-refresh-session.adapter.ts → src/auth/domain/refresh-session.repository.port.ts
- `NodemailerSmtpMailerAdapter` --implements--> `TransactionalMailer`  [EXTRACTED]
  src/auth/infrastructure/nodemailer-smtp-mailer.adapter.ts → src/auth/domain/transactional-mailer.port.ts

## Import Cycles
- None detected.

## Communities (54 total, 3 thin omitted)

### Community 0 - "content.graph.ts"
Cohesion: 0.19
Nodes (18): canRefine(), MAX_REFINE, nextRefineCount(), compileContentGraph(), ContentState, routeAfterConsistencyVerifier(), routeAfterNormalizeBrief(), createFailRunNode() (+10 more)

### Community 1 - "app.module.ts"
Cohesion: 0.14
Nodes (15): AuthModule, Module, CompanyContextModule, Module, ContentModule, Module, RunLifecycleModule, Module (+7 more)

### Community 2 - "social.graph.ts"
Cohesion: 0.09
Nodes (48): loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput, IdeasOutput, ideasOutputSchema (+40 more)

### Community 3 - "invite-user.use-case.ts"
Cohesion: 0.08
Nodes (25): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+17 more)

### Community 4 - "AuthController"
Cohesion: 0.05
Nodes (41): ApiOperation, Req, AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get (+33 more)

### Community 5 - "RefreshSessionRepository"
Cohesion: 0.13
Nodes (5): Inject, Inject, Inject, Inject, RefreshSessionRepository

### Community 6 - "domain.exception.ts"
Cohesion: 0.09
Nodes (16): Inject, ListUsersUseCase, Inject, Injectable, Inject, ReactivateUserUseCase, Inject, Injectable (+8 more)

### Community 7 - "runs.controller.ts"
Cohesion: 0.10
Nodes (25): CancelRunUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase, Injectable, GetRunUseCase, Injectable (+17 more)

### Community 8 - "DomainException"
Cohesion: 0.12
Nodes (19): AcceptInviteResult, acceptInviteSchema, comparePassword(), hashPassword(), parseTtlMs(), validatePasswordPolicy(), FinalizeReviewUseCase, Injectable (+11 more)

### Community 9 - "PrismaRunAdapter"
Cohesion: 0.13
Nodes (3): RunLogEntry, PrismaRunAdapter, Injectable

### Community 10 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (39): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+31 more)

### Community 11 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 12 - "run.types.ts"
Cohesion: 0.12
Nodes (16): LightRunItem, ListRunsResult, RunSnapshot, RunRecordBase, ALLOWED_RUN_STATES, assertTransition(), CANCELABLE_RUN_STATUSES, RunLogRow (+8 more)

### Community 13 - "RunsController"
Cohesion: 0.05
Nodes (41): ArrayUnique, Query, HitlDto, IsArray, IsString, ListRunsQueryDto, IsArray, IsIn (+33 more)

### Community 14 - "prisma-invitation.adapter.ts"
Cohesion: 0.08
Nodes (24): AuthUser, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord (+16 more)

### Community 15 - "CompanyContextRepository"
Cohesion: 0.05
Nodes (60): Put, toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema (+52 more)

### Community 16 - "save-output-edited.use-case.ts"
Cohesion: 0.14
Nodes (21): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+13 more)

### Community 17 - "HttpExceptionFilter"
Cohesion: 0.31
Nodes (3): Catch, ErrorEnvelope, HttpExceptionFilter

### Community 18 - "content.types.ts"
Cohesion: 0.15
Nodes (11): ContentResultStore, ContentPipelineInput, ContentPipelineState, ContentRefineSnapshot, PageDocument, PageOutlineSection, PageOutlineSectionRole, VerifierVerdict (+3 more)

### Community 19 - "get-run.use-case.ts"
Cohesion: 0.19
Nodes (13): GetRunOutput, orderItemsBySelectedIds(), RUN_RESULT_READER, RunResultReader, ContentBrief, SocialBrief, ReelDurationSeconds, ReelIdea (+5 more)

### Community 20 - "RunRepository"
Cohesion: 0.08
Nodes (6): Inject, Inject, Inject, Inject, RunRepository, RunRecord

### Community 21 - "content-run.executor.ts"
Cohesion: 0.18
Nodes (15): ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject, Injectable (+7 more)

### Community 22 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): ApiPropertyOptional, IsObject, AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto (+12 more)

### Community 23 - "social-pipeline.facade.ts"
Cohesion: 0.22
Nodes (12): isSocialRunRecord(), SocialRunRecord, SocialPipelineFacade, toOutcome(), Injectable, SocialRunExecutor, Inject, Injectable (+4 more)

### Community 24 - "InvitationsController"
Cohesion: 0.13
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 25 - "runs.module.ts"
Cohesion: 0.18
Nodes (12): AutoFinalizeExpiredReviewsUseCase, Injectable, Inject, RecoverInterruptedRunsUseCase, Injectable, RunAbortRegistry, Injectable, RunDispatchExecutor (+4 more)

### Community 26 - "InProcessRunWorker"
Cohesion: 0.19
Nodes (3): InProcessRunWorker, Injectable, Inject

### Community 27 - "UsersController"
Cohesion: 0.12
Nodes (14): Equals, IsBoolean, PatchUserDto, ApiProperty, ApiCookieAuth, ApiTags, Body, Controller (+6 more)

### Community 28 - "create-feedback.use-case.ts"
Cohesion: 0.23
Nodes (8): FEEDBACK_RUN_READER, FeedbackRunLookup, FeedbackRunReader, FEEDBACK_REPOSITORY, FeedbackModule, Module, PrismaFeedbackRunReaderAdapter, Injectable

### Community 29 - "start-run.use-case.ts"
Cohesion: 0.23
Nodes (13): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, StartRunUseCase, Injectable, makeContentRun() (+5 more)

### Community 30 - "VerifierVerdict"
Cohesion: 0.19
Nodes (4): EmptyRunResultReader, Injectable, ReelScript, VerifierVerdict

### Community 31 - "prisma-social-result.adapter.ts"
Cohesion: 0.12
Nodes (9): toInputJson(), ReelScriptSegment, mapStoredReelScript(), mapStoredReelScriptSegment(), mapStoredSocialContent(), asContentItem(), asReelScriptItem(), PrismaSocialResultAdapter (+1 more)

### Community 32 - ".create"
Cohesion: 0.20
Nodes (9): MaxLength, Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString (+1 more)

### Community 33 - "Env"
Cohesion: 0.11
Nodes (14): clearAuthCookies(), readCookie(), isRecord(), JwtCookieStrategy, Inject, Injectable, NodemailerSmtpMailerAdapter, readSmtpConfig() (+6 more)

### Community 35 - "feedback.types.ts"
Cohesion: 0.19
Nodes (8): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_BODY_MAX, FeedbackEntry, FeedbackRepository, PrismaFeedbackAdapter, Injectable

### Community 36 - "LlmHopService"
Cohesion: 0.25
Nodes (8): Inject, CompileContentGraphOptions, RunLifecyclePort, LlmHopService, Inject, Injectable, Inject, CompileSocialGraphOptions

### Community 37 - "resume-hitl.use-case.ts"
Cohesion: 0.18
Nodes (11): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, runIdSchema (+3 more)

### Community 38 - "PrismaService"
Cohesion: 0.17
Nodes (5): PrismaModule, Global, Module, PrismaService, Injectable

### Community 39 - "RunLifecycleService"
Cohesion: 0.14
Nodes (8): Inject, ResumeHitlUseCase, Inject, Injectable, RunLifecycleService, Injectable, StubRunExecutor, Injectable

### Community 40 - "content.schemas.ts"
Cohesion: 0.19
Nodes (12): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+4 more)

### Community 42 - "PrismaRefreshSessionAdapter"
Cohesion: 0.31
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 43 - "output-edited-writer.port.ts"
Cohesion: 0.22
Nodes (7): Inject, OUTPUT_EDITED_WRITER, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable

### Community 44 - "run-lifecycle.service.ts"
Cohesion: 0.26
Nodes (4): TransitionExtras, Inject, RUN_SSE_HUB, RunSseHub

### Community 45 - "configure-swagger.ts"
Cohesion: 0.27
Nodes (7): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), ACCESS_COOKIE_NAME, buildSwaggerConfig()

### Community 46 - "llm-hop.ts"
Cohesion: 0.18
Nodes (13): LlmGatewayError, isRetryable(), RetryReason, isAbortError(), ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable() (+5 more)

### Community 47 - "llm.module.ts"
Cohesion: 0.50
Nodes (3): LlmModule, Module, LLM_GATEWAY_PORT

### Community 48 - "auth.module.ts"
Cohesion: 0.15
Nodes (24): AcceptInviteUseCase, Injectable, generateRefreshToken(), hashRefreshToken(), parseTtlSeconds(), AuthTokenResult, BootstrapAdminUseCase, Injectable (+16 more)

### Community 49 - "feedback.controller.ts"
Cohesion: 0.15
Nodes (9): CreateFeedbackUseCase, Inject, Injectable, FeedbackController, ApiCookieAuth, ApiTags, Controller, Express (+1 more)

### Community 50 - "auth.schemas.ts"
Cohesion: 0.22
Nodes (8): BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema, UpdateMeEmailInput, updateMeEmailSchema

### Community 51 - "newRequestId"
Cohesion: 0.50
Nodes (3): newRequestId(), RequestIdMiddleware, Injectable

### Community 55 - "roles.decorator.ts"
Cohesion: 0.33
Nodes (3): ROLES_KEY, RolesGuard, Injectable

## Knowledge Gaps
- **83 isolated node(s):** `acceptInviteSchema`, `AcceptInviteResult`, `BootstrapAdminInput`, `LoginInput`, `UpdateMeEmailInput` (+78 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 352 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DomainException` connect `DomainException` to `invite-user.use-case.ts`, `domain.exception.ts`, `runs.controller.ts`, `llm-gateway.http.adapter.ts`, `run.types.ts`, `prisma-invitation.adapter.ts`, `CompanyContextRepository`, `save-output-edited.use-case.ts`, `HttpExceptionFilter`, `get-run.use-case.ts`, `content-run.executor.ts`, `social-pipeline.facade.ts`, `create-feedback.use-case.ts`, `start-run.use-case.ts`, `Env`, `resume-hitl.use-case.ts`, `RunLifecycleService`, `llm-hop.ts`, `auth.module.ts`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `Env` connect `Env` to `app.module.ts`, `invite-user.use-case.ts`, `LlmHopService`, `RefreshSessionRepository`, `runs.controller.ts`, `DomainException`, `llm-gateway.http.adapter.ts`, `output-edited-writer.port.ts`, `run-lifecycle.service.ts`, `InMemoryRunSseHub`, `configure-swagger.ts`, `llm-hop.ts`, `auth.module.ts`, `save-output-edited.use-case.ts`, `get-run.use-case.ts`, `RunRepository`, `runs.module.ts`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Why does `AuthUserContext` connect `DomainException` to `.create`, `Env`, `invite-user.use-case.ts`, `AuthController`, `domain.exception.ts`, `runs.controller.ts`, `RunsController`, `auth.module.ts`, `feedback.controller.ts`, `save-output-edited.use-case.ts`, `roles.decorator.ts`, `InvitationsController`, `create-feedback.use-case.ts`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **What connects `acceptInviteSchema`, `AcceptInviteResult`, `BootstrapAdminInput` to the rest of the system?**
  _83 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `app.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13725490196078433 - nodes in this community are weakly interconnected._
- **Should `social.graph.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08764568764568764 - nodes in this community are weakly interconnected._
- **Should `invite-user.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08084163898117387 - nodes in this community are weakly interconnected._
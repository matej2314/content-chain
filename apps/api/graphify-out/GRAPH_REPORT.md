# Graph Report - api  (2026-09-28)

## Corpus Check
- 192 files · ~29,034 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1254 nodes · 3533 edges · 46 communities (44 shown, 2 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 64 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2a8f3049`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- llm-hop.ts
- app.module.ts
- social.graph.ts
- auth.module.ts
- http-metrics.interceptor.ts
- login.use-case.ts
- auth.controller.ts
- runs.controller.ts
- DomainException
- prisma-run.adapter.ts
- llm-gateway.http.adapter.ts
- in-process-run.worker.ts
- UserRepository
- RunsController
- prisma-invitation.adapter.ts
- company-context.types.ts
- save-output-edited.use-case.ts
- run-record.test-helpers.ts
- CompanyContextRepository
- VerifierVerdict
- RunRepository
- AuthController
- company-context.dto.ts
- social.types.ts
- InvitationsController
- run.port.ts
- InProcessRunWorker
- UsersController
- create-feedback.use-case.ts
- AuthUserContext
- is-complete.ts
- PrismaSocialResultAdapter
- .create
- company-context.mapper.ts
- users.controller.ts
- feedback.types.ts
- SocialResultStore
- start-run.use-case.ts
- PrismaService
- output-edited-writer.port.ts
- ListRunsQueryDto
- StartRunDto
- PrismaRefreshSessionAdapter
- CompanyContextController
- SocialIdea
- ReelScriptItem

## God Nodes (most connected - your core abstractions)
1. `DomainException` - 68 edges
2. `RunRepository` - 42 edges
3. `AuthUserContext` - 35 edges
4. `RunRecord` - 34 edges
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
- `PrismaRefreshSessionAdapter` --implements--> `RefreshSessionRepository`  [EXTRACTED]
  src/auth/infrastructure/prisma-refresh-session.adapter.ts → src/auth/domain/refresh-session.repository.port.ts
- `InvitationsController` --references--> `Roles()`  [EXTRACTED]
  src/auth/invitations.controller.ts → src/shared/decorators/roles.decorator.ts
- `UsersController` --references--> `Roles()`  [EXTRACTED]
  src/auth/users.controller.ts → src/shared/decorators/roles.decorator.ts

## Import Cycles
- None detected.

## Communities (46 total, 2 thin omitted)

### Community 0 - "llm-hop.ts"
Cohesion: 0.06
Nodes (64): ContentPipelineFacade, toOutcome(), Inject, Injectable, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput (+56 more)

### Community 1 - "app.module.ts"
Cohesion: 0.05
Nodes (55): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, ContentRunExecutor, isCanonicalOutlineSelection() (+47 more)

### Community 2 - "social.graph.ts"
Cohesion: 0.08
Nodes (47): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput, IdeasOutput, ideasOutputSchema, isPlainRecord() (+39 more)

### Community 3 - "auth.module.ts"
Cohesion: 0.08
Nodes (34): InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase, Inject (+26 more)

### Community 4 - "http-metrics.interceptor.ts"
Cohesion: 0.06
Nodes (32): ApiOperation, HealthController, ApiOkResponse, ApiTags, Controller, Get, HealthModule, Module (+24 more)

### Community 5 - "login.use-case.ts"
Cohesion: 0.09
Nodes (20): comparePassword(), generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), AuthTokenResult, Inject, LoginUseCase (+12 more)

### Community 6 - "auth.controller.ts"
Cohesion: 0.06
Nodes (29): AcceptInviteUseCase, Inject, Injectable, BootstrapStatusUseCase, Inject, Injectable, MeUseCase, Inject (+21 more)

### Community 7 - "runs.controller.ts"
Cohesion: 0.09
Nodes (28): GetRunLogsOutput, GetRunLogsUseCase, Injectable, GetRunUseCase, Injectable, ListRunsUseCase, Injectable, ListRunsUserItem (+20 more)

### Community 8 - "DomainException"
Cohesion: 0.11
Nodes (20): AcceptInviteResult, acceptInviteSchema, hashPassword(), BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand (+12 more)

### Community 9 - "prisma-run.adapter.ts"
Cohesion: 0.08
Nodes (16): contentBriefSchema, LightRunItem, ListRunsQuery, ListRunsResult, RunSnapshot, RunLogEntry, ALLOWED_RUN_STATES, assertTransition() (+8 more)

### Community 10 - "llm-gateway.http.adapter.ts"
Cohesion: 0.10
Nodes (23): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+15 more)

### Community 11 - "in-process-run.worker.ts"
Cohesion: 0.11
Nodes (15): Inject, RecoverInterruptedRunsUseCase, Inject, Injectable, RunLifecycleService, TransitionExtras, Inject, Injectable (+7 more)

### Community 12 - "UserRepository"
Cohesion: 0.13
Nodes (10): AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult, UserForAuth, UserRepository, CreateUserData, isUniqueConstraintViolation(), PrismaUserAdapter (+2 more)

### Community 13 - "RunsController"
Cohesion: 0.15
Nodes (15): Query, orderItemsBySelectedIds(), isTerminalStatus(), RunsController, ApiCookieAuth, ApiTags, Body, Controller (+7 more)

### Community 14 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 15 - "company-context.types.ts"
Cohesion: 0.13
Nodes (17): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection (+9 more)

### Community 16 - "save-output-edited.use-case.ts"
Cohesion: 0.13
Nodes (23): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+15 more)

### Community 17 - "run-record.test-helpers.ts"
Cohesion: 0.14
Nodes (13): Catch, isContentStartCommand(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, ErrorEnvelope, HttpExceptionFilter (+5 more)

### Community 18 - "CompanyContextRepository"
Cohesion: 0.17
Nodes (14): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+6 more)

### Community 19 - "VerifierVerdict"
Cohesion: 0.13
Nodes (6): CompositeRunResultReader, RunResultReader, EmptyRunResultReader, Injectable, SocialContent, VerifierVerdict

### Community 20 - "RunRepository"
Cohesion: 0.08
Nodes (6): Inject, Inject, Inject, Inject, Inject, RunRepository

### Community 21 - "AuthController"
Cohesion: 0.19
Nodes (14): Req, AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode (+6 more)

### Community 22 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): ApiPropertyOptional, IsObject, AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto (+12 more)

### Community 23 - "social.types.ts"
Cohesion: 0.15
Nodes (9): ReelDurationSeconds, ReelScriptSegment, SocialContentItem, SocialPipelineInput, mapStoredReelScript(), mapStoredReelScriptSegment(), mapStoredSocialContent(), asContentItem() (+1 more)

### Community 24 - "InvitationsController"
Cohesion: 0.13
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 25 - "run.port.ts"
Cohesion: 0.18
Nodes (11): FinalizeReviewUseCase, Inject, Injectable, ListRunsOutput, RateRunUseCase, ratingSchema, Injectable, assertRunReviewable() (+3 more)

### Community 26 - "InProcessRunWorker"
Cohesion: 0.18
Nodes (4): InProcessRunWorker, Injectable, Inject, Inject

### Community 27 - "UsersController"
Cohesion: 0.13
Nodes (14): Equals, IsBoolean, PatchUserDto, ApiProperty, ApiCookieAuth, ApiTags, Body, Controller (+6 more)

### Community 28 - "create-feedback.use-case.ts"
Cohesion: 0.20
Nodes (11): CreateFeedbackUseCase, Inject, Injectable, FEEDBACK_RUN_READER, FeedbackRunLookup, FeedbackRunReader, FEEDBACK_REPOSITORY, FeedbackModule (+3 more)

### Community 29 - "AuthUserContext"
Cohesion: 0.18
Nodes (6): ROLES_KEY, RolesGuard, Injectable, Express, Request, AuthUserContext

### Community 30 - "is-complete.ts"
Cohesion: 0.28
Nodes (11): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, collectGateItemPaths(), isComplete(), isCompleteAudienceProfile(), isCompleteCtaItem(), isCompleteOfferItem() (+3 more)

### Community 31 - "PrismaSocialResultAdapter"
Cohesion: 0.16
Nodes (4): toInputJson(), PipelineState, PrismaSocialResultAdapter, Injectable

### Community 32 - ".create"
Cohesion: 0.12
Nodes (13): MaxLength, FeedbackController, ApiCookieAuth, ApiTags, Body, Controller, HttpCode, Post (+5 more)

### Community 33 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (12): Put, toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema (+4 more)

### Community 34 - "users.controller.ts"
Cohesion: 0.16
Nodes (8): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Injectable

### Community 35 - "feedback.types.ts"
Cohesion: 0.19
Nodes (8): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_BODY_MAX, FeedbackEntry, FeedbackRepository, PrismaFeedbackAdapter, Injectable

### Community 36 - "SocialResultStore"
Cohesion: 0.17
Nodes (6): GetRunOutput, SocialBrief, SocialResultStore, ReelIdea, ReelScript, CompileSocialGraphOptions

### Community 37 - "start-run.use-case.ts"
Cohesion: 0.17
Nodes (13): hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema, socialStartRunSchema (+5 more)

### Community 38 - "PrismaService"
Cohesion: 0.17
Nodes (5): PrismaModule, Global, Module, PrismaService, Injectable

### Community 39 - "output-edited-writer.port.ts"
Cohesion: 0.22
Nodes (7): Inject, OUTPUT_EDITED_WRITER, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable

### Community 40 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ArrayUnique, ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min (+2 more)

### Community 41 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 42 - "PrismaRefreshSessionAdapter"
Cohesion: 0.31
Nodes (3): RefreshSessionRecord, PrismaRefreshSessionAdapter, Injectable

### Community 43 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

## Knowledge Gaps
- **85 isolated node(s):** `acceptInviteSchema`, `AcceptInviteResult`, `BootstrapAdminInput`, `LoginInput`, `PatchUserCommand` (+80 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 340 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DomainException` connect `DomainException` to `llm-hop.ts`, `app.module.ts`, `auth.module.ts`, `http-metrics.interceptor.ts`, `login.use-case.ts`, `runs.controller.ts`, `prisma-run.adapter.ts`, `UserRepository`, `RunsController`, `prisma-invitation.adapter.ts`, `save-output-edited.use-case.ts`, `run-record.test-helpers.ts`, `run.port.ts`, `InProcessRunWorker`, `create-feedback.use-case.ts`, `AuthUserContext`, `is-complete.ts`, `.create`, `users.controller.ts`, `start-run.use-case.ts`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `RunRepository` connect `RunRepository` to `start-run.use-case.ts`, `runs.controller.ts`, `output-edited-writer.port.ts`, `prisma-run.adapter.ts`, `in-process-run.worker.ts`, `save-output-edited.use-case.ts`, `run.port.ts`, `InProcessRunWorker`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `PrismaService` connect `PrismaService` to `llm-hop.ts`, `feedback.types.ts`, `http-metrics.interceptor.ts`, `login.use-case.ts`, `output-edited-writer.port.ts`, `prisma-run.adapter.ts`, `PrismaRefreshSessionAdapter`, `UserRepository`, `prisma-invitation.adapter.ts`, `company-context.types.ts`, `social.types.ts`, `create-feedback.use-case.ts`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **What connects `acceptInviteSchema`, `AcceptInviteResult`, `BootstrapAdminInput` to the rest of the system?**
  _85 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `llm-hop.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05653912050256996 - nodes in this community are weakly interconnected._
- **Should `app.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05198537095088819 - nodes in this community are weakly interconnected._
- **Should `social.graph.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08461538461538462 - nodes in this community are weakly interconnected._
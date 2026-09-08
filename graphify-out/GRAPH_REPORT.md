# Graph Report - content-chain  (2026-09-08)

## Corpus Check
- 519 files · ~145,235 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3956 nodes · 10673 edges · 431 communities (145 shown, 286 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 71 edges (avg confidence: 0.72)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `470c83d6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Prisma Company Context Adapter
- chat.service.ts
- RunRepository
- AsProviderInstanceId()
- Chat Service
- Social Graph
- Redis Vector Store Adapter
- Dokumentacja komunikacji
- GatewayKey
- Logging Module
- resilient-executor.ts
- Cli Module
- App Module
- Llm Gateway Http Adapter
- GatewayConfig
- Responses Adapter
- agent-answers.schema.ts
- chat-response.dto.ts
- Semantic Cache Service
- Gateway Config Schema
- response-cache.service.ts
- Social Types
- sentry-ai-metrics.adapter.ts
- Anthropic Module
- Model Manager Service
- Cli Apply Types
- ModelAlias
- llm-gateway.http.adapter.ts
- ids.ts
- App Module
- anthropic-response.mapper.ts
- anthropic/anthropic-tools.mapper.ts
- Metrics
- provider-error.mapper.ts
- RunRecord
- .getOne
- config-generator.service.ts
- RunsController
- WizardState
- App Metrics Backend Interface
- openai-params-provider.mapper.ts
- provider-instances.bootstrap.ts
- Openai Chat Completions Controller
- App Metrics Service
- chat-completions.adapter.ts
- RunsController
- Prisma Run Adapter
- Configuration
- Agent Answers Schema
- AppMetricsService
- PrometheusAppMetricsAdapter
- AnthropicMessagesRequestDto
- openai-stream.mapper.ts
- OpenAiChatCompletionRequestDto
- Configuration Validation Service
- swagger.setup.ts
- ProviderRegistryService
- AppMetricsBackend
- Execute()
- ai-provider-gateway/src/main.ts
- Branded Types
- runs.module.ts
- responses.adapter.ts
- HealthService
- .getOne
- HealthService
- .getOne
- runs.controller.ts
- ConsistencyVerifier
- Runs Bounded Context
- SPEC Area Map
- Feedback
- API DoD Cases D 1–D 14
- RedisConnectionService
- Shared
- prisma-run.adapter.ts
- Health Readiness Response Dto
- ChatParamsDto
- company-context.mapper.ts
- StartRunDto
- Cookie Only Session Model
- LangGraph Pipeline
- Should Include Redis Stack
- configuration.ts
- EnvironmentVariables
- openai-chat-completions.controller.ts
- V1 Public API
- ConfigInitCommand
- ProviderAddCommand
- llm-hop.ts
- ChatMessageDto
- Completeness Gate
- KeyGenerateCommand
- HealthService
- company-context.dto.ts
- getAppConfigOrThrow
- OpenAiChatMessageDto
- Fail Fast Env Validation
- ClientAddCommand
- ClientEditCommand
- ModelAddCommand
- chat-params.dto.ts
- PrismaService
- RedisConnectionService
- AnthropicMessageDto
- Bramka kontekstu
- ResponseFormatDto
- AnthropicMessagesController
- ClientId
- Run Log Append Only
- openai-chat-message.dto.ts
- layout.tsx
- button.tsx
- Przepływy danych — Content Chain
- Health Controller
- ParseRunIdPipe
- Jest
- Express D
- Content Chain
- PersistIdeasDraft
- Docker Compose
- HITL
- Przegląd runu
- Klej procesu
- Metrics
- Chat
- Feedback
- Bootstrap admin
- Rola admin
- Iconify
- Domena CC w gateway
- Fat controller
- Logika SM w frontend
- Polling statusu runu
- Unnamed Community
- Synchroniczny HTTP = cały pipeline LLM
- Token SSE w query string
- X Gateway Key w NEXT PUBLIC *
- Shared
- Układ warstw BC
- Pnpm workspaces
- Prisma
- Prompts
- Porty i adaptery
- FeedbackId
- GatewayModelAlias
- RunStatus
- RunTaskType
- UserId
- PersistContent
- Fail Fast env
- Środowisko local
- MAX CONCURRENT RUNS
- DB kanoniczna
- Envelope błędu CC
- MVP
- Port lifecycle runu
- Port LlmGateway
- SSE runu
- V1 — rozbudowa
- Worker in Process
- Envelope błędu
- Health
- Docs
- Kolejność budowy
- Content Chain
- Polityka haseł bcrypt
- Fake portu LLM
- Ocena gwiazdkowa
- Widok Runy SM
- Health
- Helmet Security Headers
- Root ESLint and Prettier
- Turborepo in MVP
- SPEC — Frontend
- SPEC — Monorepo
- Observability — Content Chain
- Bezpieczeństwo — Content Chain
- Anty-patterny — Content Chain
- Brand types — Content Chain
- Testy — Content Chain
- chat-params.dto.ts
- openai-auth.decorator.ts
- configuration.ts
- SmartRateLimitGuard
- ModelEditCommand
- env.schema.ts
- ChatResponseDto
- StartRunDto
- VectorStore
- Anty-patterny
- EventSource po completed/failed
- forwardRef Runs ↔ Social
- Mapa Subject SSE bez complete
- Zod w packages/shared
- apps/ai-provider-gateway
- apps/api
- apps/frontend
- BC Auth
- BC Company Context
- BC Feedback
- BC Runs / Logs
- BC Social
- Architektura
- JWT cc_access / cc_refresh
- Architektura katalogów i plików
- apps/api/src/health
- apps/api/src/llm
- apps/api/src/metrics
- social/infrastructure/graph
- LangGraph Social pipeline
- packages/shared
- Prisma / SQLite MVP
- RUN_EXECUTOR
- Brand<K, Name>
- ConversationId
- Brand types
- FeedbackAgentKey
- Przepływ korelacji ID
- RequestId
- RunId
- Bramka kompletności kontekstu
- ConsistencyVerifier
- ContentWriterAgent
- Przepływy danych
- IdeationAgent
- LoadContext
- MAX_CONCURRENT_RUNS
- NormalizeBrief
- PersistIdeas
- post_content
- post_ideas
- post_ideas_then_content
- Recovery po restarcie api
- RefineContent
- RefineIdeas
- run.log
- Deployment
- Środowisko production
- Volume SQLite
- Bramka kontekstu
- Słownik
- interrupted
- isComplete
- Kontekst firmy
- Limit współbieżności
- Port RunExecutor
- POST /auth/bootstrap-admin
- Dokumentacja komunikacji
- HTTP API apps/api
- POST /runs/:runId/hitl
- POST /api/v1/runs
- Graf statusów runu
- SSE GET /runs/:runId/events
- X-Gateway-Key
- Content Chain
- Dokumentacja koncepcyjna
- Full-auto
- HITL
- Zakres MVP
- Self-host MIT
- Observability
- Korelacja ops
- Logi runu
- Metryki Prometheus
- Pino / nestjs-pino
- apps/ai-provider-gateway
- apps/api
- apps/frontend
- Run SM
- SQLite
- cc_access
- cc_refresh
- Bezpieczeństwo
- Jeden admin
- Rola user
- Testy
- Jest
- Piramida testów MVP
- supertest
- Wskaźnik agenci aktywni
- UX Dashboard
- Edytuj
- First-run bootstrap
- Widok Run szczegóły
- SSE close po terminalu
- Zostaw opinię
- Auth Bounded Context
- GET bootstrap-status
- cc_refresh Cookie
- Cookie-only Session Model
- GET /auth/me
- JwtAuthGuard
- Password Policy (bcrypt 12)
- Refresh Token Rotation
- RolesGuard
- Single Admin MVP
- User Soft-Delete
- Secure Cookies in Production
- CORS with Credentials
- .env.example Placeholders
- Fail-Fast Env Validation
- GET /metrics
- @nestjs/config
- Pino Process Logs
- Secret Leakage Ban
- Feedback Body Limit
- Feedback Bounded Context
- Feedback Without LangGraph
- Own-Run Feedback Authz
- POST /api/v1/feedback
- FeedbackTargetType
- Next.js App Router
- fetch credentials include
- First-Run Screen
- Frontend App
- Zostaw opinię CTA
- modules/ UI Layout
- Session Probe Flow
- shadcn
- FE Shared Contract Types
- Gateway POST /api/v1/chat
- class-validator ValidationPipe
- ConversationId
- HTTP Error Envelope (K-1)
- Domain Exception Filter
- InMemoryRunSseHub
- LlmGatewayPort
- POST /runs 202 Async
- RequestId
- SSE Run Events
- SSE Heartbeat (K-3b)
- RUN_SSE_SUBJECT_TTL_MS
- Swagger UI /docs
- X-Gateway-Key
- Zod Application Validation
- Admin-Only Context Write
- Canonical Company Context in DB
- Company Context Bounded Context
- GET company-context/completeness
- Completeness Gate
- CONTEXT_INCOMPLETE
- Gate Sections (identity offer voice cta audience)
- PUT and PATCH company-context
- apps/ai-provider-gateway
- apps/api
- apps/frontend
- Modular Monolith
- Package-Name Imports
- @content-chain/shared
- pnpm Workspaces
- Branded String IDs
- Canonical DB Store
- SQLite to PostgreSQL Cutover
- No ORM in Domain
- PostgreSQL V1 Engine
- Prisma ORM
- Shared PrismaClient
- Prisma Migrate
- SQLite MVP Engine
- MVP Phase
- SPEC Area Map
- V1 — rozbudowa
- GET /api/v1/runs
- GET /runs/user/:userId
- In-Process Worker
- interrupted Status
- Run Lifecycle Port
- MAX_CONCURRENT_RUNS
- No Runs↔Social Nest Cycle
- outputEdited
- Run Recovery (R-9)
- Run Review (R-10)
- reviewFinalizedAt
- RunExecutorPort
- run.log Append-Only
- Runs Bounded Context
- Runs SSE Hub (R-4a)
- startedBy
- Run Status Graph
- userRating
- Social Application Facade
- ConsistencyVerifier
- ContentWriterAgent
- HITL Model B
- IdeationAgent
- LangGraph Pipeline
- No LangGraph Checkpointer MVP
- post_content
- post_ideas
- post_ideas_then_content
- Prompt Template Files
- Refine max N=2
- Social Bounded Context
- SocialRunExecutor
- Structured LLM Output
- CI PR Unit+Integration
- Cookie Auth in API Tests
- API DoD Cases D-1–D-14
- E2E API Suite
- Fake LLM Ports in Tests
- Jest
- No Automatic FE Tests in MVP
- Test Pyramid MVP
- supertest
- .createMessage
- anthropic-stream.mapper.ts
- NoopAppMetricsAdapter
- ClientRemoveCommand
- SPEC — Content (BC)
- HttpMethod
- ConfigValidateCommand
- ListRunsQueryDto
- ClientListCommand
- resolve-provider-call-options.ts
- ProviderEditCommand
- ConfigSecretsStatusCommand
- ConfigShowCommand
- ModelListCommand
- ProviderListCommand
- RunsModule
- SoftDeleteUserUseCase
- anthropic-stream.mapper.ts
- openai-chat-completion-response.dto.ts
- InMemoryRunSseHub
- ClientAddCommand
- ClientRemoveCommand
- RunsModule

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `ProviderInstanceId` - 81 edges
3. `LoggingService` - 74 edges
4. `asProviderInstanceId()` - 67 edges
5. `GatewayConfig` - 65 edges
6. `GatewayKey` - 59 edges
7. `ClientId` - 54 edges
8. `ChatRequestDto` - 48 edges
9. `AppMetricsService` - 46 edges
10. `exitWithAgentReport()` - 43 edges

## Surprising Connections (you probably didn't know these)
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `AnthropicAuth()` --indirect_call--> `SmartRateLimitGuard`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/decorators/anthropic-auth.decorator.ts → apps/ai-provider-gateway/src/guards/smart-rate-limit-guard.ts
- `OpenAiAuth()` --indirect_call--> `OpenAiExceptionFilter`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/decorators/openai-auth.decorator.ts → apps/ai-provider-gateway/src/integrations/openai/filters/openai-exception.filter.ts
- `bootstrap()` --indirect_call--> `LoggingService`  [INFERRED]
  apps/ai-provider-gateway/src/main.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `bootstrap()` --indirect_call--> `AppModule`  [INFERRED]
  apps/ai-provider-gateway/src/main.ts → apps/ai-provider-gateway/src/app.module.ts

## Import Cycles
- 4-file cycle: `apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts -> apps/ai-provider-gateway/src/config/typed-config.ts -> apps/ai-provider-gateway/src/config/app-configuration.types.ts -> apps/ai-provider-gateway/src/config/configuration.ts -> apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts`

## Communities (431 total, 286 thin omitted)

### Community 0 - "Prisma Company Context Adapter"
Cohesion: 0.12
Nodes (15): OpenAiChatCompletionsController, ApiBody, ApiOpenAiErrorResponses, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, ApiSecurity (+7 more)

### Community 1 - "chat.service.ts"
Cohesion: 0.10
Nodes (44): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+36 more)

### Community 2 - "RunRepository"
Cohesion: 0.10
Nodes (28): CompanyContextModule, Module, ContentModule, Module, LlmModule, Module, RunDispatchExecutor, RunExecutorPort (+20 more)

### Community 3 - "AsProviderInstanceId()"
Cohesion: 0.10
Nodes (34): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient(), convertModel() (+26 more)

### Community 4 - "Chat Service"
Cohesion: 0.06
Nodes (48): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+40 more)

### Community 5 - "Social Graph"
Cohesion: 0.08
Nodes (48): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput, contentOutputSchema, IdeasOutput, ideasOutputSchema (+40 more)

### Community 6 - "Redis Vector Store Adapter"
Cohesion: 0.15
Nodes (19): isUnservableCachedReply(), CachedChatResponseSchema, parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits (+11 more)

### Community 8 - "GatewayKey"
Cohesion: 0.09
Nodes (23): GatewayKeyAndSmartRateLimit(), StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), requireClientGatewayKey(), resolveClientIdFromKey(), ResolvedGatewayClient (+15 more)

### Community 9 - "Logging Module"
Cohesion: 0.07
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 10 - "resilient-executor.ts"
Cohesion: 0.12
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiTags, Body, Controller, Delete (+5 more)

### Community 11 - "Cli Module"
Cohesion: 0.09
Nodes (26): ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic(), resolveAnthropicOutputConfig(), ContentBlockParam (+18 more)

### Community 12 - "App Module"
Cohesion: 0.13
Nodes (26): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable (+18 more)

### Community 13 - "Llm Gateway Http Adapter"
Cohesion: 0.20
Nodes (15): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+7 more)

### Community 14 - "GatewayConfig"
Cohesion: 0.09
Nodes (21): ChatModule, Module, AnthropicModule, Module, AnthropicMessagesController, AnthropicAuth, ApiSecurity, ApiTags (+13 more)

### Community 15 - "Responses Adapter"
Cohesion: 0.19
Nodes (11): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, MetricsModule, Module, gatewayErrorsTotal, httpRequestDurationSeconds (+3 more)

### Community 16 - "agent-answers.schema.ts"
Cohesion: 0.06
Nodes (19): Inject, Inject, ChatErrorHandlerService, Injectable, ChatProviderCallService, Injectable, ChatProviderCooldownService, Injectable (+11 more)

### Community 17 - "chat-response.dto.ts"
Cohesion: 0.14
Nodes (31): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, SseMetaPayload, mapStopReasonToFinishReason(), StreamOnceParams (+23 more)

### Community 18 - "Semantic Cache Service"
Cohesion: 0.14
Nodes (16): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs() (+8 more)

### Community 19 - "Gateway Config Schema"
Cohesion: 0.06
Nodes (48): PendingSecretsItem, collectPendingSecrets(), ProviderTestCommand, Command, Option, DEFAULT_MODELS, InitAnswers, convertProvider() (+40 more)

### Community 20 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (20): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, CacheModule, CacheModuleOptions (+12 more)

### Community 21 - "Social Types"
Cohesion: 0.06
Nodes (27): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore (+19 more)

### Community 22 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (27): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+19 more)

### Community 23 - "Anthropic Module"
Cohesion: 0.09
Nodes (19): GetRunUseCase, orderItemsBySelectedIds(), Inject, Injectable, ListRunsUseCase, Inject, Injectable, isTerminalStatus() (+11 more)

### Community 24 - "Model Manager Service"
Cohesion: 0.07
Nodes (21): isRedisRequired(), WizardState, ConfigGeneratorService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, FileManagerService (+13 more)

### Community 25 - "Cli Apply Types"
Cohesion: 0.12
Nodes (33): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+25 more)

### Community 26 - "ModelAlias"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 27 - "llm-gateway.http.adapter.ts"
Cohesion: 0.17
Nodes (21): ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus() (+13 more)

### Community 28 - "ids.ts"
Cohesion: 0.05
Nodes (34): Brand, UnBrand, ContentKind, ContentLanguage, ContentTaskType, RunPlatform, RunStatus, RunTaskType (+26 more)

### Community 29 - "App Module"
Cohesion: 0.06
Nodes (29): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable, HealthModule (+21 more)

### Community 30 - "anthropic-response.mapper.ts"
Cohesion: 0.15
Nodes (20): SseDoneEvent, fromGatewayToolCallDto(), AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto, AnthropicThinkingContentBlockDto (+12 more)

### Community 31 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.18
Nodes (15): ListRunsOutput, RecoverInterruptedRunsUseCase, Inject, Injectable, RunLifecycleService, TransitionExtras, Injectable, isRetryable() (+7 more)

### Community 32 - "Metrics"
Cohesion: 0.26
Nodes (10): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 33 - "provider-error.mapper.ts"
Cohesion: 0.09
Nodes (31): isRedisSearchTagSafeId(), assertInteractiveAllowed(), CliModule, Module, GatewayCommand, Command, KeyGeneratorService, Injectable (+23 more)

### Community 34 - "RunRecord"
Cohesion: 0.10
Nodes (14): contentBriefSchema, socialBriefSchema, ListRunsQuery, ListRunsResult, RunSnapshot, RunLogEntry, ALLOWED, assertTransition() (+6 more)

### Community 35 - ".getOne"
Cohesion: 0.11
Nodes (24): ApiOpenAiErrorResponses(), ApiRequestIdHeader(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOpenAiErrorResponses, ApiOperation, ApiParam (+16 more)

### Community 36 - "config-generator.service.ts"
Cohesion: 0.09
Nodes (10): GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable, Inject, Inject, runIdSchema, Inject (+2 more)

### Community 37 - "RunsController"
Cohesion: 0.08
Nodes (40): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+32 more)

### Community 38 - "WizardState"
Cohesion: 0.08
Nodes (31): ContentPipelineFacade, toOutcome(), Inject, Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject (+23 more)

### Community 39 - "App Metrics Backend Interface"
Cohesion: 0.19
Nodes (13): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, AppTokenUsage, HealthComponent, HealthMetricsSnapshot, HealthStatus (+5 more)

### Community 40 - "openai-params-provider.mapper.ts"
Cohesion: 0.13
Nodes (23): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+15 more)

### Community 41 - "provider-instances.bootstrap.ts"
Cohesion: 0.20
Nodes (11): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, createChatCompletionsAdapter() (+3 more)

### Community 42 - "Openai Chat Completions Controller"
Cohesion: 0.11
Nodes (16): ChatController, ApiBody, ApiGatewayChatErrorResponses, ApiOperation, ApiRequestIdHeader, ApiResponse, ApiSecurity, ApiTags (+8 more)

### Community 43 - "App Metrics Service"
Cohesion: 0.10
Nodes (12): Inject, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get (+4 more)

### Community 44 - "chat-completions.adapter.ts"
Cohesion: 0.10
Nodes (16): BootstrapStatusUseCase, Inject, Injectable, UserListItem, AuthUser, JwtPayload, CreateAdminIfNoneData, CreateAdminIfNoneResult (+8 more)

### Community 45 - "RunsController"
Cohesion: 0.14
Nodes (19): hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialStartRunSchema, startRunCommandSchema (+11 more)

### Community 46 - "Prisma Run Adapter"
Cohesion: 0.14
Nodes (21): AcceptInviteResult, acceptInviteSchema, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds() (+13 more)

### Community 47 - "Configuration"
Cohesion: 0.15
Nodes (7): InProcessRunWorker, Injectable, ResumeHitlUseCase, Inject, Injectable, StubRunExecutor, Injectable

### Community 48 - "Agent Answers Schema"
Cohesion: 0.11
Nodes (17): Architektura — Content Chain, Async run i HITL, Auth, Bounded contexty w `apps/api`, Decyzje architektoniczne (skrót), Dziedziczenie i wyjątki, Frontend (`apps/frontend`), Gateway (`apps/ai-provider-gateway`) (+9 more)

### Community 49 - "AppMetricsService"
Cohesion: 0.11
Nodes (18): `apps/ai-provider-gateway`, `apps/api` — bounded contexty (~1 poziom w głąb), `apps/api/src/health/`, `metrics/`, `llm/`, `apps/api/src/shared/`, `apps/frontend`, Architektura katalogów i plików — Content Chain, Auth i Company Context, Content (wyjątek orchestracji — analogicznie do Social) (+10 more)

### Community 50 - "PrometheusAppMetricsAdapter"
Cohesion: 0.11
Nodes (4): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppProviderStreamScope

### Community 51 - "AnthropicMessagesRequestDto"
Cohesion: 0.05
Nodes (44): ApiHeader, ApiAnthropicErrorResponses, ApiBody, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, Body (+36 more)

### Community 52 - "openai-stream.mapper.ts"
Cohesion: 0.06
Nodes (58): mapProviderResponseToAiObservation(), toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), buildGenerationConfig(), createGoogleProvider() (+50 more)

### Community 53 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (19): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 54 - "Configuration Validation Service"
Cohesion: 0.16
Nodes (8): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 55 - "swagger.setup.ts"
Cohesion: 0.11
Nodes (13): AcceptInviteUseCase, Inject, Injectable, BootstrapAdminUseCase, Inject, Injectable, LogoutUseCase, Inject (+5 more)

### Community 56 - "ProviderRegistryService"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 57 - "AppMetricsBackend"
Cohesion: 0.10
Nodes (27): AuthController, ApiTags, Body, Controller, Get, HttpCode, Post, Public (+19 more)

### Community 58 - "Execute()"
Cohesion: 0.08
Nodes (21): ChatStreamController, ApiBody, ApiGatewayChatErrorResponses, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, ApiSecurity (+13 more)

### Community 59 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.05
Nodes (64): ChatWarningSchema, FinishReasonSchema, CliGatewayValidatorService, CliValidateOptions, Injectable, asCacheKey(), asCacheTtlSeconds(), asConversationId() (+56 more)

### Community 61 - "runs.module.ts"
Cohesion: 0.15
Nodes (14): AppModule, Module, SseDeltaPayloadDto, ApiProperty, bootstrap(), PORT, setupApp(), exportOpenApi() (+6 more)

### Community 62 - "responses.adapter.ts"
Cohesion: 0.17
Nodes (14): GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness, CtaItem (+6 more)

### Community 63 - "HealthService"
Cohesion: 0.13
Nodes (13): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Public, HealthModule (+5 more)

### Community 64 - ".getOne"
Cohesion: 0.16
Nodes (21): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional (+13 more)

### Community 65 - "HealthService"
Cohesion: 0.10
Nodes (13): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiRequestIdHeader (+5 more)

### Community 66 - ".getOne"
Cohesion: 0.11
Nodes (23): ApiAnthropicErrorResponses(), AnthropicModelsController, AnthropicAuth, ApiAnthropicErrorResponses, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam (+15 more)

### Community 67 - "runs.controller.ts"
Cohesion: 0.14
Nodes (12): HitlDto, IsArray, IsString, ListRunsQueryDto, IsIn, IsInt, IsOptional, IsString (+4 more)

### Community 70 - "SPEC Area Map"
Cohesion: 0.29
Nodes (6): Docs vs SPEC, Jak czytać, Mapa obszar → plik, SPEC — README, Terminologia faz (skrót), Źródła

### Community 73 - "RedisConnectionService"
Cohesion: 0.22
Nodes (5): RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 75 - "prisma-run.adapter.ts"
Cohesion: 0.11
Nodes (17): 1. Bootstrap / auth, 2. Kontekst firmy i bramka, 3. Run jednoetapowy — `post_ideas` (full-auto), 4. Run dwuetapowy — `post_ideas_then_content` (HITL), 4b. Run jednoetapowy — `reel_ideas` (full-auto), 4c. Run dwuetapowy — `reel_ideas_then_scripts` (HITL), 4d. Run jednoetapowy — `page_copy` (full-auto), 4e. Run dwuetapowy — `page_outline_then_copy` (HITL) (+9 more)

### Community 76 - "Health Readiness Response Dto"
Cohesion: 0.21
Nodes (12): toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase (+4 more)

### Community 77 - "ChatParamsDto"
Cohesion: 0.17
Nodes (12): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, IsStringOrArrayOfStrings, Max (+4 more)

### Community 78 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 79 - "StartRunDto"
Cohesion: 0.16
Nodes (7): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), SEMANTIC_SCHEMA_TAG_FIELDS, semanticSchemaFtCreateArgs()

### Community 82 - "Should Include Redis Stack"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 83 - "configuration.ts"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs, Poza zakresem, Role i uprawnienia (norma), Sesja (cookie-only) (+5 more)

### Community 84 - "EnvironmentVariables"
Cohesion: 0.20
Nodes (7): MetricsController, Controller, Get, Public, Res, MetricsService, Injectable

### Community 85 - "openai-chat-completions.controller.ts"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Korelacja ID (norma kodu), Kryteria akceptacji, Nie wolno, Norma implementacji, Powierzchnie (skrót), Powiązanie ze stylem z docs, Poza zakresem (+5 more)

### Community 87 - "ConfigInitCommand"
Cohesion: 0.13
Nodes (11): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), ErrorEnvelope, HttpExceptionFilter, Catch (+3 more)

### Community 88 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 89 - "llm-hop.ts"
Cohesion: 0.19
Nodes (10): LlmGatewayError, LLM_GATEWAY_PORT, ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid(), repairSuffix() (+2 more)

### Community 90 - "ChatMessageDto"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Fazy invoke (model B), Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs / wyjątek, Poza zakresem, SPEC — Social (+5 more)

### Community 92 - "KeyGenerateCommand"
Cohesion: 0.39
Nodes (3): KeyGenerateCommand, Command, Option

### Community 93 - "HealthService"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 94 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 95 - "getAppConfigOrThrow"
Cohesion: 0.21
Nodes (6): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, getAppConfigOrThrow(), Inject, Optional

### Community 96 - "OpenAiChatMessageDto"
Cohesion: 0.16
Nodes (12): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+4 more)

### Community 98 - "ClientAddCommand"
Cohesion: 0.08
Nodes (34): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+26 more)

### Community 99 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 100 - "ModelAddCommand"
Cohesion: 0.33
Nodes (3): ModelAddCommand, Command, Option

### Community 101 - "chat-params.dto.ts"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Obowiązkowe przypadki DoD (api), Piramida (MVP), Powiązanie ze stylem z docs, Poza zakresem (+5 more)

### Community 102 - "PrismaService"
Cohesion: 0.15
Nodes (5): PrismaModule, Global, Module, PrismaService, Injectable

### Community 103 - "RedisConnectionService"
Cohesion: 0.27
Nodes (4): LlmGatewayHttpAdapter, RETRYABLE_CODES, Inject, Injectable

### Community 104 - "AnthropicMessageDto"
Cohesion: 0.15
Nodes (12): Anty-patterny deploy (skrót), Checklist operatora (`production`), Dane i backup (SQLite), Deployment — Content Chain, DX — pnpm (`local`), Kolejność wdrożenia vs produkt, Konfiguracja i sekrety, Observability (+4 more)

### Community 106 - "ResponseFormatDto"
Cohesion: 0.15
Nodes (12): Formularz: Zostaw opinię (zapis MVP), Globalny wskaźnik: czy agenci są aktywni, Nawigacja (sidebar), Poza zakresem UX MVP, Stany puste i błędy, UX Dashboard — Content Chain, Wejście: first-run, logowanie, sesja, Widok: Kontekst firmy (+4 more)

### Community 107 - "AnthropicMessagesController"
Cohesion: 0.15
Nodes (12): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs / wyjątek, Poza zakresem, SPEC — Feedback (opinie tekstowe), Targety i katalog agentów (MVP) (+4 more)

### Community 108 - "ClientId"
Cohesion: 0.15
Nodes (12): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs, Poza zakresem, Sekcje bramki (MVP), SPEC — Kontekst firmy (+4 more)

### Community 110 - "openai-chat-message.dto.ts"
Cohesion: 0.15
Nodes (12): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs, Poza zakresem, SPEC — Persistence, Twarde założenie silników (norma) (+4 more)

### Community 111 - "layout.tsx"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 112 - "button.tsx"
Cohesion: 0.70
Nodes (3): Button(), buttonVariants, cn()

### Community 113 - "Przepływy danych — Content Chain"
Cohesion: 0.15
Nodes (12): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs, Poza zakresem, SPEC — Runy / logi, Statusy (norma) (+4 more)

### Community 114 - "Health Controller"
Cohesion: 0.17
Nodes (11): Architektura i runtime, Identyfikatory i korelacja, Kody błędów — Content Chain API, Kody błędów — gateway (istotne dla integracji), Komunikacja, Model korelacji logów (norma), Poza zakresem słownika, Produkt i domena (+3 more)

### Community 115 - "ParseRunIdPipe"
Cohesion: 0.17
Nodes (11): Bramka kompletności kontekstu firmy, Cel produktu, Dla kogo jest system, Dokumentacja koncepcyjna — Content Chain, Główne założenia, HITL vs full-auto, Kolejność budowy (order of attack), Kryteria sukcesu MVP (+3 more)

### Community 117 - "Express D"
Cohesion: 0.15
Nodes (9): MeUseCase, Inject, Injectable, CurrentUser, RolesGuard, Injectable, Express, Request (+1 more)

### Community 162 - "Envelope błędu"
Cohesion: 0.17
Nodes (11): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs, Poza zakresem, SPEC — Bezpieczeństwo i self-host ops, Wolno (+3 more)

### Community 163 - "Health"
Cohesion: 0.05
Nodes (42): Auth, Błędy gateway → run Content Chain, Company context, Dokumentacja komunikacji — Content Chain, Envelope błędu, Feedback (opinie tekstowe), `GET /api/v1/auth/bootstrap-status`, `GET /api/v1/auth/me` (+34 more)

### Community 166 - "Content Chain"
Cohesion: 0.40
Nodes (4): Aplikacje, Applications, Content Chain, Content Chain

### Community 175 - "SPEC — Frontend"
Cohesion: 0.17
Nodes (11): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs / wyjątek, Poza zakresem, SPEC — Frontend, Wolno (+3 more)

### Community 176 - "SPEC — Monorepo"
Cohesion: 0.17
Nodes (11): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs, Poza zakresem, SPEC — Monorepo, Wolno (+3 more)

### Community 177 - "Observability — Content Chain"
Cohesion: 0.17
Nodes (11): DoD obserwowalności (MVP), Dump hopu gateway (tylko `development`), Korelacja (ops), Logi runu (domena), Metryki `apps/api` (MVP), Observability — Content Chain, Podział sygnałów, Pola normy (+3 more)

### Community 178 - "Bezpieczeństwo — Content Chain"
Cohesion: 0.18
Nodes (10): Bezpieczeństwo — Content Chain, Bootstrap i konta admin, Checklist operatora (`production`), Do / Don’t, Hasła (bcrypt), Poza zakresem MVP, Role i uprawnienia, Sekrety i powierzchnie (+2 more)

### Community 179 - "Anty-patterny — Content Chain"
Cohesion: 0.20
Nodes (9): Anty-patterny — Content Chain, `apps/api` i grafy (Social / Content), Auth i tenancy, Frontend (`apps/frontend`), Gateway i korelacja, Granice monorepo, Legacy / workflow „tylko IDE”, Persistence (+1 more)

### Community 180 - "Brand types — Content Chain"
Cohesion: 0.20
Nodes (9): Brand types — Content Chain, Do / Don’t, Enumy / unie kontraktu (brand lub string union), Identyfikatory (string brands), Infrastruktura (wzorzec), Katalog typów (MVP), Poza zakresem MVP tego dokumentu, Przepływ korelacji (norma) (+1 more)

### Community 181 - "Testy — Content Chain"
Cohesion: 0.20
Nodes (9): Anty-patterny testowe (skrót), CI (MVP), Co mockować / nie mockować, Narzędzia (norma), Piramida (MVP), Poza zakresem MVP, Priorytety przypadków (DoD jakości api), Testy — Content Chain (+1 more)

### Community 182 - "chat-params.dto.ts"
Cohesion: 0.21
Nodes (8): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsStringOrArrayOfStrings(), IsThinkingBudget()

### Community 183 - "openai-auth.decorator.ts"
Cohesion: 0.08
Nodes (26): ApiGatewayModelsErrorResponses, ApiGatewayChatErrorResponses(), ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse (+18 more)

### Community 184 - "configuration.ts"
Cohesion: 0.19
Nodes (12): ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDonePayloadDto, SseDoneUsageDto, ApiPropertyOptional (+4 more)

### Community 185 - "SmartRateLimitGuard"
Cohesion: 0.18
Nodes (11): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+3 more)

### Community 186 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 187 - "env.schema.ts"
Cohesion: 0.07
Nodes (39): InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase, Inject (+31 more)

### Community 188 - "ChatResponseDto"
Cohesion: 0.17
Nodes (10): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+2 more)

### Community 189 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 190 - "VectorStore"
Cohesion: 0.22
Nodes (3): VectorStore, Inject, Optional

### Community 408 - ".createMessage"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 409 - "anthropic-stream.mapper.ts"
Cohesion: 0.39
Nodes (8): asMessageId(), MessageId, AnthropicStreamState, createAnthropicStreamState(), emitThinkingBlock(), eventLine(), mapSseEventToAnthropic(), nextToolBlockIndex()

### Community 410 - "NoopAppMetricsAdapter"
Cohesion: 0.07
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 411 - "ClientRemoveCommand"
Cohesion: 0.33
Nodes (5): CompanyContextController, ApiOkResponse, ApiTags, Controller, Get

### Community 412 - "SPEC — Content (BC)"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Fazy invoke (model B), Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs / wyjątek, Poza zakresem, SPEC — Content (BC) (+5 more)

### Community 413 - "HttpMethod"
Cohesion: 0.14
Nodes (4): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable

### Community 414 - "ConfigValidateCommand"
Cohesion: 0.40
Nodes (3): ConfigValidateCommand, Command, Option

### Community 415 - "ListRunsQueryDto"
Cohesion: 0.13
Nodes (6): Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 416 - "ClientListCommand"
Cohesion: 0.40
Nodes (3): ClientListCommand, Command, Option

### Community 417 - "resolve-provider-call-options.ts"
Cohesion: 0.19
Nodes (14): clamp(), isOverrideKey(), resolveProviderCallOptions(), CompleteOnceResult, OVERRIDE_KEYS, OverrideKey, ModelId, GatewayCapabilitiesConfig (+6 more)

### Community 418 - "ProviderEditCommand"
Cohesion: 0.16
Nodes (6): ProviderEditCommand, Command, Option, ProviderRemoveCommand, Command, Option

### Community 419 - "ConfigSecretsStatusCommand"
Cohesion: 0.40
Nodes (3): ConfigSecretsStatusCommand, Command, Option

### Community 420 - "ConfigShowCommand"
Cohesion: 0.40
Nodes (3): ConfigShowCommand, Command, Option

### Community 421 - "ModelListCommand"
Cohesion: 0.40
Nodes (3): ModelListCommand, Command, Option

### Community 422 - "ProviderListCommand"
Cohesion: 0.40
Nodes (3): ProviderListCommand, Command, Option

### Community 425 - "SoftDeleteUserUseCase"
Cohesion: 0.10
Nodes (15): ListUsersUseCase, Inject, Injectable, SoftDeleteUserUseCase, Inject, Injectable, ApiTags, Controller (+7 more)

### Community 426 - "anthropic-stream.mapper.ts"
Cohesion: 0.14
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 428 - "InMemoryRunSseHub"
Cohesion: 0.18
Nodes (5): RunSseEvent, RunSseHub, InMemoryRunSseHub, Inject, Injectable

### Community 429 - "ClientAddCommand"
Cohesion: 0.33
Nodes (3): ClientAddCommand, Command, Option

### Community 430 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

## Knowledge Gaps
- **708 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `SemanticIndexNameOptions`, `ParsedKnnHits` (+703 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **286 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `RunRecord` connect `WizardState` to `RunRepository`, `RunRecord`, `config-generator.service.ts`, `RunsController`, `Configuration`, `anthropic/anthropic-tools.mapper.ts`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **Why does `parseWithZod()` connect `Prisma Run Adapter` to `config-generator.service.ts`, `RunsController`, `company-context.mapper.ts`, `Configuration`, `Social Types`, `Anthropic Module`, `env.schema.ts`, `anthropic/anthropic-tools.mapper.ts`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `NoopAppMetricsAdapter` to `resolve-provider-call-options.ts`, `chat.service.ts`, `AsProviderInstanceId()`, `Chat Service`, `RunsController`, `App Metrics Backend Interface`, `Logging Module`, `App Module`, `agent-answers.schema.ts`, `chat-response.dto.ts`, `PrometheusAppMetricsAdapter`, `Gateway Config Schema`, `sentry-ai-metrics.adapter.ts`, `openai-auth.decorator.ts`, `Model Manager Service`, `ai-provider-gateway/src/main.ts`, `HttpMethod`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _769 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Prisma Company Context Adapter` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `chat.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09596713965646005 - nodes in this community are weakly interconnected._
- **Should `RunRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.09565217391304348 - nodes in this community are weakly interconnected._
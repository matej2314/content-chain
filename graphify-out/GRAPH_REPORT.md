# Graph Report - content-chain  (2026-08-31)

## Corpus Check
- 448 files · ~117,229 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3414 nodes · 9079 edges · 408 communities (122 shown, 286 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 66 edges (avg confidence: 0.74)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9f079728`
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
- anthropic-messages.controller.ts
- ConsistencyVerifier
- Runs Bounded Context
- SPEC Area Map
- Feedback
- API DoD Cases D 1–D 14
- PrometheusService
- Shared
- prisma-run.adapter.ts
- Health Readiness Response Dto
- ChatParamsDto
- social.types.ts
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
- HealthController
- ChatMessageDto
- Completeness Gate
- KeyGenerateCommand
- HealthService
- SPEC — Auth
- Config Validator
- OpenAiChatMessageDto
- Fail Fast Env Validation
- ClientAddCommand
- ClientEditCommand
- ModelAddCommand
- chat-params.dto.ts
- SPEC — Social
- Provider Base Url Validation
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
- anthropic-auth.decorator.ts
- openai-auth.decorator.ts
- openai-chat-completion-response.dto.ts
- ClientRemoveCommand
- ModelEditCommand
- ProviderEditCommand
- GatewayModelsCatalogService
- Dokumentacja Content Chain
- rate-limit.module.ts
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

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 90 edges
2. `ProviderInstanceId` - 81 edges
3. `LoggingService` - 74 edges
4. `asProviderInstanceId()` - 67 edges
5. `GatewayConfig` - 65 edges
6. `GatewayKey` - 59 edges
7. `ClientId` - 56 edges
8. `ChatRequestDto` - 48 edges
9. `AppMetricsService` - 46 edges
10. `exitWithAgentReport()` - 43 edges

## Surprising Connections (you probably didn't know these)
- `GatewayKeyAndSmartRateLimit()` --indirect_call--> `SmartRateLimitGuard`  [INFERRED]
  apps/ai-provider-gateway/src/common/decorators/gateway-key-and-smart-rate-limit.decorator.ts → apps/ai-provider-gateway/src/guards/smart-rate-limit-guard.ts
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `AnthropicAuth()` --indirect_call--> `SmartRateLimitGuard`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/decorators/anthropic-auth.decorator.ts → apps/ai-provider-gateway/src/guards/smart-rate-limit-guard.ts
- `OpenAiAuth()` --indirect_call--> `SmartRateLimitGuard`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/decorators/openai-auth.decorator.ts → apps/ai-provider-gateway/src/guards/smart-rate-limit-guard.ts
- `bootstrap()` --indirect_call--> `LoggingService`  [INFERRED]
  apps/ai-provider-gateway/src/main.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- 4-file cycle: `apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts -> apps/ai-provider-gateway/src/config/typed-config.ts -> apps/ai-provider-gateway/src/config/app-configuration.types.ts -> apps/ai-provider-gateway/src/config/configuration.ts -> apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts`

## Communities (408 total, 286 thin omitted)

### Community 0 - "Prisma Company Context Adapter"
Cohesion: 0.05
Nodes (62): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject (+54 more)

### Community 1 - "chat.service.ts"
Cohesion: 0.13
Nodes (29): exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), resolveCliMode(), ClientAddAnswers (+21 more)

### Community 2 - "RunRepository"
Cohesion: 0.08
Nodes (33): GetRunLogsUseCase, Injectable, GetRunUseCase, Injectable, ListRunsUseCase, Injectable, parseWithZod(), ResumeHitlUseCase (+25 more)

### Community 3 - "AsProviderInstanceId()"
Cohesion: 0.07
Nodes (58): assertInteractiveAllowed(), DEFAULT_MODELS, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema (+50 more)

### Community 4 - "Chat Service"
Cohesion: 0.05
Nodes (63): SemanticStoreEmbedState, CacheIdentityMessage, ChatCacheSource, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional (+55 more)

### Community 5 - "Social Graph"
Cohesion: 0.09
Nodes (41): isRetryable(), RetryReason, RunLifecyclePort, extractJsonText(), parseLlmJson(), Inject, coerceVerifierIssue(), ContentOutput (+33 more)

### Community 6 - "Redis Vector Store Adapter"
Cohesion: 0.12
Nodes (23): RedisCacheAdapter, Injectable, isUnservableCachedReply(), CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, parseCachedChatResponse(), RedisVectorStoreAdapter (+15 more)

### Community 8 - "GatewayKey"
Cohesion: 0.11
Nodes (13): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), GatewayKey, ResolvedGatewayClient, _badRuntimeConfig (+5 more)

### Community 9 - "Logging Module"
Cohesion: 0.09
Nodes (16): NoopErrorReportingAdapter, Injectable, LEVEL_RANK, SentryErrorReportingAdapter, Injectable, parseLogLevel(), ErrorReportingBackend, LoggerBackend (+8 more)

### Community 10 - "resilient-executor.ts"
Cohesion: 0.08
Nodes (43): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+35 more)

### Community 11 - "Cli Module"
Cohesion: 0.04
Nodes (53): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), PendingSecretsItem, collectPendingSecrets(), CliModule, Module (+45 more)

### Community 12 - "App Module"
Cohesion: 0.08
Nodes (25): AppModule, Module, AuthController, Controller, AuthModule, Module, CompanyContextModule, Module (+17 more)

### Community 13 - "Llm Gateway Http Adapter"
Cohesion: 0.06
Nodes (38): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+30 more)

### Community 14 - "GatewayConfig"
Cohesion: 0.08
Nodes (16): ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable, ProviderManagerService (+8 more)

### Community 15 - "Responses Adapter"
Cohesion: 0.08
Nodes (42): buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns(), clamp() (+34 more)

### Community 16 - "agent-answers.schema.ts"
Cohesion: 0.14
Nodes (8): CacheRegistryService, Injectable, Inject, LoggingService, Injectable, createGoogleProvider(), Inject, Optional

### Community 17 - "chat-response.dto.ts"
Cohesion: 0.15
Nodes (29): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, mapStopReasonToFinishReason(), StreamOnceResult, ChatResponseBuilderService, ProviderResponse (+21 more)

### Community 18 - "Semantic Cache Service"
Cohesion: 0.10
Nodes (18): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), isSingleTurnUserRequest(), lastUserMessageText(), EMBED_NOT_ATTEMPTED, SemanticCacheService, SemanticLookupResult (+10 more)

### Community 19 - "Gateway Config Schema"
Cohesion: 0.09
Nodes (37): isRedisSearchTagSafeId(), DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertClient(), convertRateLimit(), CliRateLimit (+29 more)

### Community 20 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (20): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheModule, Module, CacheModule, CacheModuleOptions (+12 more)

### Community 21 - "Social Types"
Cohesion: 0.09
Nodes (24): LlmGatewayError, RunResultReader, RunBrief, RunLogLevel, EmptyRunResultReader, Injectable, SocialPipelineFacade, toOutcome() (+16 more)

### Community 22 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.09
Nodes (26): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+18 more)

### Community 23 - "Anthropic Module"
Cohesion: 0.11
Nodes (18): ChatModule, Module, AnthropicModule, Module, AnthropicMessagesController, AnthropicAuth, ApiSecurity, ApiTags (+10 more)

### Community 24 - "Model Manager Service"
Cohesion: 0.16
Nodes (14): defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable, AddModelInput, EditModelInput, RemoveModelInput, syncPolicySamplingForModel() (+6 more)

### Community 25 - "Cli Apply Types"
Cohesion: 0.22
Nodes (3): ProviderTestCommand, Command, Option

### Community 26 - "ModelAlias"
Cohesion: 0.06
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 27 - "llm-gateway.http.adapter.ts"
Cohesion: 0.19
Nodes (16): asSystemFingerprint(), ProviderToolDefinition, ChatCompletionsAdapterOptions, accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText(), finalizeOpenAiStreamToolCalls(), OpenAiStreamToolCallAccumulator, ChatCompletionMessageToolCall (+8 more)

### Community 28 - "ids.ts"
Cohesion: 0.08
Nodes (26): Brand, UnBrand, ContentLanguage, RunStatus, RunTaskType, SocialPlatform, UserRole, CONV_ID_RE (+18 more)

### Community 29 - "App Module"
Cohesion: 0.12
Nodes (17): HealthModule, Module, IntegrationsModule, Module, LoggingModule, Global, Module, ObservabilityModule (+9 more)

### Community 30 - "anthropic-response.mapper.ts"
Cohesion: 0.09
Nodes (34): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDeltaEvent, SseDoneEvent (+26 more)

### Community 31 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.05
Nodes (54): toHttpException(), asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort() (+46 more)

### Community 32 - "Metrics"
Cohesion: 0.09
Nodes (22): Inject, RecoverInterruptedRunsUseCase, Inject, Injectable, RunLifecycleService, TransitionExtras, Inject, Injectable (+14 more)

### Community 33 - "provider-error.mapper.ts"
Cohesion: 0.20
Nodes (19): ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus() (+11 more)

### Community 34 - "RunRecord"
Cohesion: 0.09
Nodes (9): Inject, Inject, InProcessRunWorker, Injectable, Inject, Inject, Inject, RunRepository (+1 more)

### Community 35 - ".getOne"
Cohesion: 0.17
Nodes (13): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOpenAiErrorResponses, ApiOperation, ApiParam, ApiRequestIdHeader, ApiSecurity (+5 more)

### Community 36 - "config-generator.service.ts"
Cohesion: 0.09
Nodes (17): WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable, Injectable, WizardOrchestratorService, WizardRunResult (+9 more)

### Community 37 - "RunsController"
Cohesion: 0.09
Nodes (22): HitlDto, ArrayMinSize, IsArray, IsString, ListRunsQueryDto, IsIn, IsInt, IsOptional (+14 more)

### Community 38 - "WizardState"
Cohesion: 0.14
Nodes (6): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, PinoLoggerAdapter, Injectable, LogContext

### Community 39 - "App Metrics Backend Interface"
Cohesion: 0.22
Nodes (12): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+4 more)

### Community 40 - "openai-params-provider.mapper.ts"
Cohesion: 0.09
Nodes (32): ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDonePayloadDto, SseDoneUsageDto, ApiPropertyOptional (+24 more)

### Community 41 - "provider-instances.bootstrap.ts"
Cohesion: 0.20
Nodes (14): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryContext (+6 more)

### Community 42 - "Openai Chat Completions Controller"
Cohesion: 0.04
Nodes (59): ApiHeader, ChatController, ApiBody, ApiGatewayChatErrorResponses, ApiOperation, ApiRequestIdHeader, ApiResponse, ApiSecurity (+51 more)

### Community 43 - "App Metrics Service"
Cohesion: 0.07
Nodes (19): HttpMetricsMiddleware, Injectable, AppMetricsModule, Global, Module, AppMetricsService, Inject, Injectable (+11 more)

### Community 44 - "chat-completions.adapter.ts"
Cohesion: 0.11
Nodes (16): ChatStreamController, ApiBody, ApiGatewayChatErrorResponses, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, ApiSecurity (+8 more)

### Community 45 - "RunsController"
Cohesion: 0.21
Nodes (11): ApiGatewayChatErrorResponses(), ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty (+3 more)

### Community 46 - "Prisma Run Adapter"
Cohesion: 0.08
Nodes (16): ListRunsResult, RunSnapshot, RunLogEntry, ALLOWED, assertTransition(), PrismaRunAdapter, RunLogRow, RunRow (+8 more)

### Community 47 - "Configuration"
Cohesion: 0.15
Nodes (19): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration(), BuildEffectiveGatewayConfigOptions (+11 more)

### Community 48 - "Agent Answers Schema"
Cohesion: 0.11
Nodes (17): Architektura — Content Chain, Async run i HITL, Auth, Bounded contexty w `apps/api`, Decyzje architektoniczne (skrót), Dziedziczenie i wyjątki, Frontend (`apps/frontend`), Gateway (`apps/ai-provider-gateway`) (+9 more)

### Community 49 - "AppMetricsService"
Cohesion: 0.11
Nodes (17): `apps/ai-provider-gateway`, `apps/api` — bounded contexty (~1 poziom w głąb), `apps/api/src/health/`, `metrics/`, `llm/`, `apps/api/src/shared/`, `apps/frontend`, Architektura katalogów i plików — Content Chain, Auth i Company Context, Drzewo docelowe (szkielet) (+9 more)

### Community 50 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (5): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 51 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 52 - "openai-stream.mapper.ts"
Cohesion: 0.11
Nodes (24): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+16 more)

### Community 53 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (19): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 54 - "Configuration Validation Service"
Cohesion: 0.16
Nodes (8): CACHE_BACKEND_TYPE, assertEnabledProviderSecretsPresent(), configurationValidation, ConfigurationValidationService, CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment, RawGatewayConfig

### Community 55 - "swagger.setup.ts"
Cohesion: 0.26
Nodes (8): GatewayKeyAndSmartRateLimit(), getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), readAnthropicApiKey(), readAuthorizationHeader(), readBearerToken()

### Community 56 - "ProviderRegistryService"
Cohesion: 0.12
Nodes (14): CompleteOnceResult, ChatValidationService, Injectable, ModelId, GatewayCapabilitiesConfig, GatewayModelConfig, GatewayParamsConfig, AIProvider (+6 more)

### Community 57 - "AppMetricsBackend"
Cohesion: 0.19
Nodes (5): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, embeddingProbeTimeoutMs(), getAppConfigOrThrow()

### Community 59 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.19
Nodes (10): AppModule, Module, bootstrap(), PORT, setupApp(), exportOpenApi(), buildSwaggerConfig(), createOpenApiDocument() (+2 more)

### Community 60 - "Branded Types"
Cohesion: 0.28
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 61 - "runs.module.ts"
Cohesion: 0.10
Nodes (23): ChatOutputTextDto, ApiProperty, ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional (+15 more)

### Community 62 - "responses.adapter.ts"
Cohesion: 0.29
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 63 - "HealthService"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 64 - ".getOne"
Cohesion: 0.17
Nodes (13): ApiGatewayModelsErrorResponses, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiRequestIdHeader, ApiSecurity (+5 more)

### Community 65 - "HealthService"
Cohesion: 0.17
Nodes (5): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthService, Injectable

### Community 66 - ".getOne"
Cohesion: 0.17
Nodes (13): AnthropicModelsController, AnthropicAuth, ApiAnthropicErrorResponses, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiRequestIdHeader (+5 more)

### Community 67 - "anthropic-messages.controller.ts"
Cohesion: 0.18
Nodes (6): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), SEMANTIC_SCHEMA_TAG_FIELDS

### Community 70 - "SPEC Area Map"
Cohesion: 0.29
Nodes (6): Docs vs SPEC, Jak czytać, Mapa obszar → plik, SPEC — README, Terminologia faz (skrót), Źródła

### Community 73 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 75 - "prisma-run.adapter.ts"
Cohesion: 0.14
Nodes (13): 1. Bootstrap / auth, 2. Kontekst firmy i bramka, 3. Run jednoetapowy — `post_ideas` (full-auto), 4. Run dwuetapowy — `post_ideas_then_content` (HITL), 5. Korelacja ID (run agentowy), 6. Recovery po restarcie api, 7. Ścieżki błędu (skrót), 8. Przegląd runu i opinie (po pipeline) (+5 more)

### Community 76 - "Health Readiness Response Dto"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 77 - "ChatParamsDto"
Cohesion: 0.10
Nodes (19): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, IsStringOrArrayOfStrings, Max (+11 more)

### Community 78 - "social.types.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 79 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 82 - "Should Include Redis Stack"
Cohesion: 0.35
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 83 - "configuration.ts"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs, Poza zakresem, Role i uprawnienia (norma), Sesja (cookie-only) (+5 more)

### Community 84 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 85 - "openai-chat-completions.controller.ts"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Korelacja ID (norma kodu), Kryteria akceptacji, Nie wolno, Norma implementacji, Powierzchnie (skrót), Powiązanie ze stylem z docs, Poza zakresem (+5 more)

### Community 87 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 88 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 89 - "HealthController"
Cohesion: 0.29
Nodes (7): HealthController, ApiOkResponse, ApiOperation, ApiRequestIdHeader, ApiTags, Controller, Get

### Community 90 - "ChatMessageDto"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Fazy invoke (model B), Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs / wyjątek, Poza zakresem, SPEC — Social (+5 more)

### Community 92 - "KeyGenerateCommand"
Cohesion: 0.39
Nodes (3): KeyGenerateCommand, Command, Option

### Community 93 - "HealthService"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 94 - "SPEC — Auth"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 95 - "Config Validator"
Cohesion: 0.48
Nodes (6): collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, buildEffectiveGatewayConfig(), assertMasterKeyPresent()

### Community 96 - "OpenAiChatMessageDto"
Cohesion: 0.15
Nodes (13): IsStringOrArrayOfStrings(), OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString (+5 more)

### Community 98 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 99 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 100 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 101 - "chat-params.dto.ts"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Obowiązkowe przypadki DoD (api), Piramida (MVP), Powiązanie ze stylem z docs, Poza zakresem (+5 more)

### Community 102 - "SPEC — Social"
Cohesion: 0.27
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 103 - "Provider Base Url Validation"
Cohesion: 0.43
Nodes (6): assertEnabledProviderBaseUrlPresent(), collectMissingBaseUrlErrors(), formatMissingBaseUrlError(), MissingProviderBaseUrl, RawGatewayConfig, resolveBaseUrlFromEnv()

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

### Community 162 - "Envelope błędu"
Cohesion: 0.17
Nodes (11): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs, Poza zakresem, SPEC — Bezpieczeństwo i self-host ops, Wolno (+3 more)

### Community 163 - "Health"
Cohesion: 0.05
Nodes (40): Auth, Błędy gateway → run Content Chain, Company context, Dokumentacja komunikacji — Content Chain, Envelope błędu, Feedback (opinie tekstowe), `GET /api/v1/auth/bootstrap-status`, `GET /api/v1/auth/me` (+32 more)

### Community 175 - "SPEC — Frontend"
Cohesion: 0.17
Nodes (11): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs / wyjątek, Poza zakresem, SPEC — Frontend, Wolno (+3 more)

### Community 176 - "SPEC — Monorepo"
Cohesion: 0.17
Nodes (11): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs, Poza zakresem, SPEC — Monorepo, Wolno (+3 more)

### Community 177 - "Observability — Content Chain"
Cohesion: 0.18
Nodes (10): DoD obserwowalności (MVP), Korelacja (ops), Logi runu (domena), Metryki `apps/api` (MVP), Observability — Content Chain, Podział sygnałów, Pola normy, Poza zakresem MVP (+2 more)

### Community 178 - "Bezpieczeństwo — Content Chain"
Cohesion: 0.18
Nodes (10): Bezpieczeństwo — Content Chain, Bootstrap i konta admin, Checklist operatora (`production`), Do / Don’t, Hasła (bcrypt), Poza zakresem MVP, Role i uprawnienia, Sekrety i powierzchnie (+2 more)

### Community 179 - "Anty-patterny — Content Chain"
Cohesion: 0.20
Nodes (9): Anty-patterny — Content Chain, `apps/api` i graf Social, Auth i tenancy, Frontend (`apps/frontend`), Gateway i korelacja, Granice monorepo, Legacy / workflow „tylko IDE”, Persistence (+1 more)

### Community 180 - "Brand types — Content Chain"
Cohesion: 0.20
Nodes (9): Brand types — Content Chain, Do / Don’t, Enumy / unie kontraktu (brand lub string union), Identyfikatory (string brands), Infrastruktura (wzorzec), Katalog typów (MVP), Poza zakresem MVP tego dokumentu, Przepływ korelacji (norma) (+1 more)

### Community 181 - "Testy — Content Chain"
Cohesion: 0.20
Nodes (9): Anty-patterny testowe (skrót), CI (MVP), Co mockować / nie mockować, Narzędzia (norma), Piramida (MVP), Poza zakresem MVP, Priorytety przypadków (DoD jakości api), Testy — Content Chain (+1 more)

### Community 182 - "anthropic-auth.decorator.ts"
Cohesion: 0.31
Nodes (5): AnthropicAuth(), AnthropicExceptionFilter, Catch, AnthropicApiKeyGuard, Injectable

### Community 183 - "openai-auth.decorator.ts"
Cohesion: 0.31
Nodes (5): OpenAiAuth(), OpenAiExceptionFilter, Catch, OpenAiBearerAuthGuard, Injectable

### Community 184 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 185 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 186 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 187 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 189 - "Dokumentacja Content Chain"
Cohesion: 0.29
Nodes (6): Dokumentacja Content Chain, Jak czytać (kolejność), Mapa: temat → plik, Run SM (uproszczenie), Schematy (skrót), System

### Community 190 - "rate-limit.module.ts"
Cohesion: 0.33
Nodes (4): RATE_LIMIT_MODULE_OPTIONS, RateLimitModule, RateLimitModuleOptions, Module

## Knowledge Gaps
- **654 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `SemanticIndexNameOptions`, `ParsedKnnHits` (+649 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **286 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `RunRecord` connect `RunRecord` to `Metrics`, `RunRepository`, `Social Types`, `Prisma Run Adapter`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Why does `asClientId()` connect `Gateway Config Schema` to `chat.service.ts`, `AsProviderInstanceId()`, `Chat Service`, `config-generator.service.ts`, `GatewayKey`, `Openai Chat Completions Controller`, `Cli Module`, `chat-completions.adapter.ts`, `App Metrics Service`, `GatewayConfig`, `Responses Adapter`, `chat-response.dto.ts`, `KeyGenerateCommand`, `anthropic-response.mapper.ts`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `AsProviderInstanceId()`, `Chat Service`, `GatewayKey`, `Logging Module`, `resilient-executor.ts`, `Cli Module`, `GatewayConfig`, `Responses Adapter`, `chat-response.dto.ts`, `Gateway Config Schema`, `sentry-ai-metrics.adapter.ts`, `Model Manager Service`, `Cli Apply Types`, `config-generator.service.ts`, `WizardState`, `App Metrics Backend Interface`, `App Metrics Service`, `RunsController`, `Configuration`, `PrometheusAppMetricsAdapter`, `ProviderRegistryService`, `GatewayModelsCatalogService`, `Provider Base Url Validation`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _715 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Prisma Company Context Adapter` be split into smaller, more focused modules?**
  _Cohesion score 0.05283505154639175 - nodes in this community are weakly interconnected._
- **Should `chat.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13432835820895522 - nodes in this community are weakly interconnected._
- **Should `RunRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.07894736842105263 - nodes in this community are weakly interconnected._
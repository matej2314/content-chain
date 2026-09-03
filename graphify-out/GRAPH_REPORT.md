# Graph Report - content-chain  (2026-09-03)

## Corpus Check
- 472 files · ~128,559 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3565 nodes · 9532 edges · 407 communities (121 shown, 286 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 70 edges (avg confidence: 0.72)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d2599fc9`
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
- OpenAiChatMessageDto
- Fail Fast Env Validation
- ClientAddCommand
- ClientEditCommand
- ModelAddCommand
- chat-params.dto.ts
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
- openai-auth.decorator.ts
- ModelEditCommand
- Dokumentacja Content Chain
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
- NoopAppMetricsAdapter
- SPEC — Content (BC)
- HttpMethod
- openai-messages-provider.mapper.ts
- ListRunsQueryDto
- chat-params.dto.ts
- resolve-provider-call-options.ts
- auth.module.ts

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
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `GatewayKeyAndSmartRateLimit()` --indirect_call--> `SmartRateLimitGuard`  [INFERRED]
  apps/ai-provider-gateway/src/common/decorators/gateway-key-and-smart-rate-limit.decorator.ts → apps/ai-provider-gateway/src/guards/smart-rate-limit-guard.ts
- `AnthropicAuth()` --indirect_call--> `SmartRateLimitGuard`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/decorators/anthropic-auth.decorator.ts → apps/ai-provider-gateway/src/guards/smart-rate-limit-guard.ts
- `OpenAiAuth()` --indirect_call--> `SmartRateLimitGuard`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/decorators/openai-auth.decorator.ts → apps/ai-provider-gateway/src/guards/smart-rate-limit-guard.ts
- `AnthropicAuth()` --indirect_call--> `AnthropicApiKeyGuard`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/decorators/anthropic-auth.decorator.ts → apps/ai-provider-gateway/src/integrations/anthropic/guards/anthropic-api-key.guard.ts

## Import Cycles
- 4-file cycle: `apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts -> apps/ai-provider-gateway/src/config/typed-config.ts -> apps/ai-provider-gateway/src/config/app-configuration.types.ts -> apps/ai-provider-gateway/src/config/configuration.ts -> apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts`

## Communities (407 total, 286 thin omitted)

### Community 0 - "Prisma Company Context Adapter"
Cohesion: 0.05
Nodes (62): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject (+54 more)

### Community 1 - "chat.service.ts"
Cohesion: 0.07
Nodes (58): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), PendingSecretsItem, loadAnswers(), collectPendingSecrets() (+50 more)

### Community 2 - "RunRepository"
Cohesion: 0.12
Nodes (18): GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable, parseWithZod(), hitlSelectedIdeaIdsSchema, ParsedHitlSelectedIdeaIds, ParsedRunId (+10 more)

### Community 3 - "AsProviderInstanceId()"
Cohesion: 0.10
Nodes (39): assertInteractiveAllowed(), DEFAULT_MODELS, CliAiProvider, KeyPromptService, Injectable, ModelPromptResult, ModelPromptService, Injectable (+31 more)

### Community 4 - "Chat Service"
Cohesion: 0.06
Nodes (58): SemanticStoreEmbedState, CacheIdentityMessage, ChatCacheSource, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional (+50 more)

### Community 5 - "Social Graph"
Cohesion: 0.09
Nodes (46): SocialBrief, loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput, contentOutputSchema, IdeasOutput (+38 more)

### Community 6 - "Redis Vector Store Adapter"
Cohesion: 0.15
Nodes (19): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+11 more)

### Community 8 - "GatewayKey"
Cohesion: 0.12
Nodes (14): ChatProviderCooldownService, Injectable, resolveClientIdFromKey(), GatewayKey, ResolvedGatewayClient, SmartRateLimitGuard, Injectable, RATE_LIMIT_MODULE_OPTIONS (+6 more)

### Community 9 - "Logging Module"
Cohesion: 0.07
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 10 - "resilient-executor.ts"
Cohesion: 0.15
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 11 - "Cli Module"
Cohesion: 0.07
Nodes (24): ConfigValidateCommand, Command, Option, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, CliGatewayValidatorService, Injectable (+16 more)

### Community 12 - "App Module"
Cohesion: 0.27
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 13 - "Llm Gateway Http Adapter"
Cohesion: 0.06
Nodes (39): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+31 more)

### Community 14 - "GatewayConfig"
Cohesion: 0.09
Nodes (14): ConfigSecretsStatusCommand, Command, Option, ClientManagerService, Injectable, EnvPatchService, Injectable, KeyGeneratorService (+6 more)

### Community 15 - "Responses Adapter"
Cohesion: 0.14
Nodes (9): ChatProviderCallService, Injectable, ChatValidationService, Injectable, GatewayModelConfig, ActiveStreamsTracker, Injectable, ProviderRegistryService (+1 more)

### Community 16 - "agent-answers.schema.ts"
Cohesion: 0.07
Nodes (14): RedisConnectionService, Injectable, Inject, Inject, VectorStore, isRedisRequiredFromConfig(), StreamCacheReplayService, Injectable (+6 more)

### Community 17 - "chat-response.dto.ts"
Cohesion: 0.08
Nodes (49): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatOutputTextDto, ApiProperty, ChatResponseData, ChatResponseDto, ChatUsageDetailsDto (+41 more)

### Community 18 - "Semantic Cache Service"
Cohesion: 0.10
Nodes (20): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend (+12 more)

### Community 19 - "Gateway Config Schema"
Cohesion: 0.09
Nodes (52): isRedisSearchTagSafeId(), InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient(), convertProvider(), convertRateLimit() (+44 more)

### Community 20 - "response-cache.service.ts"
Cohesion: 0.08
Nodes (23): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+15 more)

### Community 21 - "Social Types"
Cohesion: 0.07
Nodes (20): GetRunOutput, ListRunsOutput, RunStartedBy, RUN_RESULT_READER, RunResultReader, EmptyRunResultReader, Injectable, PrismaService (+12 more)

### Community 22 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (33): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+25 more)

### Community 23 - "Anthropic Module"
Cohesion: 0.10
Nodes (15): toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand, Command, Option, ProviderManagerService (+7 more)

### Community 24 - "Model Manager Service"
Cohesion: 0.08
Nodes (32): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable (+24 more)

### Community 25 - "Cli Apply Types"
Cohesion: 0.07
Nodes (48): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionSchema, readNonEmptyString() (+40 more)

### Community 26 - "ModelAlias"
Cohesion: 0.23
Nodes (14): isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId(), isFiniteNumber(), isMaxAttempts(), isMaxConcurrentStreams(), isPort() (+6 more)

### Community 27 - "llm-gateway.http.adapter.ts"
Cohesion: 0.07
Nodes (53): mapProviderResponseToAiObservation(), toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), buildGenerationConfig() (+45 more)

### Community 28 - "ids.ts"
Cohesion: 0.06
Nodes (30): Brand, UnBrand, ContentKind, ContentLanguage, ContentTaskType, RunPlatform, RunStatus, RunTaskType (+22 more)

### Community 29 - "App Module"
Cohesion: 0.13
Nodes (17): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+9 more)

### Community 30 - "anthropic-response.mapper.ts"
Cohesion: 0.08
Nodes (44): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+36 more)

### Community 31 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.06
Nodes (38): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+30 more)

### Community 32 - "Metrics"
Cohesion: 0.06
Nodes (38): GetRunUseCase, Inject, Injectable, Inject, ListRunsUseCase, Inject, Injectable, RecoverInterruptedRunsUseCase (+30 more)

### Community 33 - "provider-error.mapper.ts"
Cohesion: 0.22
Nodes (18): ChatErrorHandlerService, Injectable, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus() (+10 more)

### Community 34 - "RunRecord"
Cohesion: 0.08
Nodes (12): InProcessRunWorker, Injectable, ListRunsResult, RunSnapshot, RunRecord, ALLOWED, assertTransition(), PrismaRunAdapter (+4 more)

### Community 35 - ".getOne"
Cohesion: 0.17
Nodes (13): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOpenAiErrorResponses, ApiOperation, ApiParam, ApiRequestIdHeader, ApiSecurity (+5 more)

### Community 36 - "config-generator.service.ts"
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 37 - "RunsController"
Cohesion: 0.08
Nodes (22): HitlDto, ArrayMinSize, IsArray, IsString, ListRunsQueryDto, IsIn, IsInt, IsOptional (+14 more)

### Community 38 - "WizardState"
Cohesion: 0.06
Nodes (42): AppModule, Module, CompanyContextModule, Module, ContentModule, Module, LlmGatewayError, LlmModule (+34 more)

### Community 39 - "App Metrics Backend Interface"
Cohesion: 0.18
Nodes (12): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+4 more)

### Community 40 - "openai-params-provider.mapper.ts"
Cohesion: 0.13
Nodes (23): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+15 more)

### Community 41 - "provider-instances.bootstrap.ts"
Cohesion: 0.12
Nodes (19): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createAnthropicProvider(), createGoogleProvider(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider() (+11 more)

### Community 42 - "Openai Chat Completions Controller"
Cohesion: 0.06
Nodes (32): ChatController, ApiBody, ApiGatewayChatErrorResponses, ApiOperation, ApiRequestIdHeader, ApiResponse, ApiSecurity, ApiTags (+24 more)

### Community 43 - "App Metrics Service"
Cohesion: 0.09
Nodes (16): HealthModule, Module, HealthCheckResult, HealthRedisCheckResult, Inject, APP_METRICS_BACKEND, MetricsController, ApiOperation (+8 more)

### Community 44 - "chat-completions.adapter.ts"
Cohesion: 0.11
Nodes (16): ChatStreamController, ApiBody, ApiGatewayChatErrorResponses, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, ApiSecurity (+8 more)

### Community 45 - "RunsController"
Cohesion: 0.21
Nodes (11): ApiGatewayChatErrorResponses(), ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty (+3 more)

### Community 47 - "Configuration"
Cohesion: 0.13
Nodes (16): AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, BuildEffectiveGatewayConfigOptions, readRequiredPrompt(), stripHtmlComments() (+8 more)

### Community 48 - "Agent Answers Schema"
Cohesion: 0.11
Nodes (17): Architektura — Content Chain, Async run i HITL, Auth, Bounded contexty w `apps/api`, Decyzje architektoniczne (skrót), Dziedziczenie i wyjątki, Frontend (`apps/frontend`), Gateway (`apps/ai-provider-gateway`) (+9 more)

### Community 49 - "AppMetricsService"
Cohesion: 0.11
Nodes (18): `apps/ai-provider-gateway`, `apps/api` — bounded contexty (~1 poziom w głąb), `apps/api/src/health/`, `metrics/`, `llm/`, `apps/api/src/shared/`, `apps/frontend`, Architektura katalogów i plików — Content Chain, Auth i Company Context, Content (wyjątek orchestracji — analogicznie do Social) (+10 more)

### Community 50 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (4): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppTokenUsage

### Community 51 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 52 - "openai-stream.mapper.ts"
Cohesion: 0.09
Nodes (35): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+27 more)

### Community 53 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (19): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 54 - "Configuration Validation Service"
Cohesion: 0.23
Nodes (8): assertEnabledProviderSecretsPresent(), configurationValidation, ConfigurationValidationService, validate(), ValidatedEnvironment, assertEnabledProviderApiKeysPresent(), formatMissingProviderApiKeyError(), RawGatewayConfig

### Community 55 - "swagger.setup.ts"
Cohesion: 0.30
Nodes (7): getAppConfig(), enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable, readAuthorizationHeader(), readBearerToken()

### Community 56 - "ProviderRegistryService"
Cohesion: 0.17
Nodes (12): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, UnsupportedProviderException, PayloadTooLargeError, RequestWithId, mapOpenAiMessagesToGateway(), mapOpenAiToolCalls() (+4 more)

### Community 57 - "AppMetricsBackend"
Cohesion: 0.40
Nodes (4): AuthController, Controller, AuthModule, Module

### Community 58 - "Execute()"
Cohesion: 0.13
Nodes (12): ContentRunRecord, SocialRunRecord, makeContentRun(), makeSocialRun(), ErrorEnvelope, HttpExceptionFilter, Catch, newConversationId() (+4 more)

### Community 59 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.19
Nodes (10): AppModule, Module, bootstrap(), PORT, setupApp(), exportOpenApi(), buildSwaggerConfig(), createOpenApiDocument() (+2 more)

### Community 60 - "Branded Types"
Cohesion: 0.28
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 61 - "runs.module.ts"
Cohesion: 0.11
Nodes (21): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+13 more)

### Community 62 - "responses.adapter.ts"
Cohesion: 0.16
Nodes (15): ApiAnthropicErrorResponses(), ApiRequestIdHeader(), AnthropicAuth(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto (+7 more)

### Community 63 - "HealthService"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 64 - ".getOne"
Cohesion: 0.17
Nodes (13): ApiGatewayModelsErrorResponses, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiRequestIdHeader, ApiSecurity (+5 more)

### Community 65 - "HealthService"
Cohesion: 0.21
Nodes (3): HealthReadinessResponseDto, HealthService, Injectable

### Community 66 - ".getOne"
Cohesion: 0.17
Nodes (13): AnthropicModelsController, AnthropicAuth, ApiAnthropicErrorResponses, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiRequestIdHeader (+5 more)

### Community 67 - "anthropic-messages.controller.ts"
Cohesion: 0.16
Nodes (7): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), SEMANTIC_SCHEMA_TAG_FIELDS, semanticSchemaFtCreateArgs()

### Community 70 - "SPEC Area Map"
Cohesion: 0.29
Nodes (6): Docs vs SPEC, Jak czytać, Mapa obszar → plik, SPEC — README, Terminologia faz (skrót), Źródła

### Community 73 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 75 - "prisma-run.adapter.ts"
Cohesion: 0.11
Nodes (17): 1. Bootstrap / auth, 2. Kontekst firmy i bramka, 3. Run jednoetapowy — `post_ideas` (full-auto), 4. Run dwuetapowy — `post_ideas_then_content` (HITL), 4b. Run jednoetapowy — `reel_ideas` (full-auto), 4c. Run dwuetapowy — `reel_ideas_then_scripts` (HITL), 4d. Run jednoetapowy — `page_copy` (full-auto), 4e. Run dwuetapowy — `page_outline_then_copy` (HITL) (+9 more)

### Community 76 - "Health Readiness Response Dto"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 77 - "ChatParamsDto"
Cohesion: 0.17
Nodes (12): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, IsStringOrArrayOfStrings, Max (+4 more)

### Community 79 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 82 - "Should Include Redis Stack"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

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
Cohesion: 0.08
Nodes (12): ClientRemoveCommand, Command, Option, ConfigInitCommand, Command, Option, ProviderEditCommand, Command (+4 more)

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

### Community 96 - "OpenAiChatMessageDto"
Cohesion: 0.16
Nodes (12): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+4 more)

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

### Community 183 - "openai-auth.decorator.ts"
Cohesion: 0.20
Nodes (7): CHAT_STREAM_API_DESCRIPTION, SseSerializer, StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), requireClientGatewayKey()

### Community 186 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 189 - "Dokumentacja Content Chain"
Cohesion: 0.29
Nodes (6): Dokumentacja Content Chain, Jak czytać (kolejność), Mapa: temat → plik, Run produktowy (uproszczenie), Schematy (skrót), System

### Community 408 - ".createMessage"
Cohesion: 0.11
Nodes (16): ApiHeader, AnthropicMessagesController, AnthropicAuth, ApiAnthropicErrorResponses, ApiBody, ApiOperation, ApiProduces, ApiRequestIdHeader (+8 more)

### Community 410 - "NoopAppMetricsAdapter"
Cohesion: 0.07
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 412 - "SPEC — Content (BC)"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Fazy invoke (model B), Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs / wyjątek, Poza zakresem, SPEC — Content (BC) (+5 more)

### Community 413 - "HttpMethod"
Cohesion: 0.12
Nodes (4): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable

### Community 414 - "openai-messages-provider.mapper.ts"
Cohesion: 0.14
Nodes (12): OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiAuth, OpenAiAuth(), OpenAiExceptionFilter, Catch (+4 more)

### Community 415 - "ListRunsQueryDto"
Cohesion: 0.25
Nodes (11): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, buildEffectiveGatewayConfig(), loadGatewayConfigFromFile() (+3 more)

### Community 416 - "chat-params.dto.ts"
Cohesion: 0.21
Nodes (8): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsStringOrArrayOfStrings(), IsThinkingBudget()

### Community 417 - "resolve-provider-call-options.ts"
Cohesion: 0.39
Nodes (6): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, GatewayParamsConfig

### Community 420 - "auth.module.ts"
Cohesion: 0.43
Nodes (6): assertEnabledProviderBaseUrlPresent(), collectMissingBaseUrlErrors(), formatMissingBaseUrlError(), MissingProviderBaseUrl, RawGatewayConfig, resolveBaseUrlFromEnv()

## Knowledge Gaps
- **690 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `SemanticIndexNameOptions`, `ParsedKnnHits` (+685 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **286 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SocialRunRecord` connect `Execute()` to `Metrics`, `RunRepository`, `RunRecord`, `WizardState`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `NoopAppMetricsAdapter` to `chat.service.ts`, `AsProviderInstanceId()`, `Chat Service`, `GatewayKey`, `Logging Module`, `Cli Module`, `GatewayConfig`, `chat-response.dto.ts`, `Gateway Config Schema`, `sentry-ai-metrics.adapter.ts`, `Anthropic Module`, `Model Manager Service`, `HttpMethod`, `auth.module.ts`, `App Metrics Backend Interface`, `provider-instances.bootstrap.ts`, `RunsController`, `Prisma Run Adapter`, `Configuration`, `PrometheusAppMetricsAdapter`, `openai-stream.mapper.ts`, `ProviderRegistryService`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Why does `StartRunUseCase` connect `Metrics` to `RunRepository`, `Execute()`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _751 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Prisma Company Context Adapter` be split into smaller, more focused modules?**
  _Cohesion score 0.05283505154639175 - nodes in this community are weakly interconnected._
- **Should `chat.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07256235827664399 - nodes in this community are weakly interconnected._
- **Should `RunRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.12169312169312169 - nodes in this community are weakly interconnected._
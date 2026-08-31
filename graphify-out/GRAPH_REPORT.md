# Graph Report - C:\Users\matej\Desktop\projekt JS\content-chain  (2026-08-31)

## Corpus Check
- 447 files · ~116,467 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3056 nodes · 9059 edges · 175 communities (116 shown, 59 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 86 edges (avg confidence: 0.78)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `856c75a3`
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
- `Append-Only Opinions` --semantically_similar_to--> `run.log Append-Only`  [INFERRED] [semantically similar]
  spec/SPEC-FEEDBACK.md → spec/SPEC-RUNY.md
- `@content-chain/shared` --semantically_similar_to--> `Frontend App`  [INFERRED] [semantically similar]
  spec/SPEC-MONOREPO.md → spec/SPEC-FRONTEND.md
- `ApiGatewayChatErrorResponses()` --indirect_call--> `ErrorEnvelopeDto`  [INFERRED]
  apps/ai-provider-gateway/src/common/decorators/api-gateway-error-responses.decorator.ts → apps/ai-provider-gateway/src/common/dtos/error-envelope.dto.ts
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `AnthropicAuth()` --indirect_call--> `SmartRateLimitGuard`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/decorators/anthropic-auth.decorator.ts → apps/ai-provider-gateway/src/guards/smart-rate-limit-guard.ts

## Import Cycles
- 4-file cycle: `apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts -> apps/ai-provider-gateway/src/config/typed-config.ts -> apps/ai-provider-gateway/src/config/app-configuration.types.ts -> apps/ai-provider-gateway/src/config/configuration.ts -> apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts`

## Hyperedges (group relationships)
- **Pipeline post_ideas** — docs_data_flow_loadcontext, docs_data_flow_normalizebrief, docs_data_flow_ideationagent, docs_data_flow_consistencyverifier, docs_data_flow_refineideas, docs_data_flow_persistideas [EXTRACTED 1.00]
- **Oś korelacji runu agentowego** — docs_brand_types_runid, docs_brand_types_conversationid, docs_brand_types_requestid [EXTRACTED 1.00]
- **Trzy procesy runtime monorepo** — docs_architektura_apps_api, docs_architektura_apps_frontend, docs_architektura_apps_ai_provider_gateway, docs_architektura_packages_shared [EXTRACTED 1.00]
- **Cookie-only MVP session transport** — spec_spec_auth_cc_access, spec_spec_auth_cc_refresh, spec_spec_auth_cookie_only_session, spec_spec_auth_jwt_auth_guard, spec_spec_frontend_fetch_credentials, spec_spec_komunikacja_sse_events [EXTRACTED 1.00]
- **SSE live-run lifecycle with heartbeat and subject TTL** — spec_spec_komunikacja_sse_events, spec_spec_komunikacja_in_memory_run_sse_hub, spec_spec_komunikacja_sse_heartbeat, spec_spec_komunikacja_subject_ttl, spec_spec_runy_sse_hub, spec_spec_frontend_eventsource_lifecycle [EXTRACTED 1.00]
- **Runs/Social port split without Nest cycle** — spec_spec_runy_runs, spec_spec_social_social, spec_spec_runy_run_executor_port, spec_spec_runy_lifecycle_port, spec_spec_social_social_run_executor, spec_spec_runy_no_nest_cycle [EXTRACTED 1.00]

## Communities (175 total, 59 thin omitted)

### Community 0 - "Prisma Company Context Adapter"
Cohesion: 0.05
Nodes (62): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject (+54 more)

### Community 1 - "chat.service.ts"
Cohesion: 0.12
Nodes (30): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+22 more)

### Community 2 - "RunRepository"
Cohesion: 0.05
Nodes (49): GetRunLogsUseCase, Inject, Injectable, GetRunUseCase, Injectable, Inject, ListRunsUseCase, Inject (+41 more)

### Community 3 - "AsProviderInstanceId()"
Cohesion: 0.07
Nodes (53): isRedisSearchTagSafeId(), assertInteractiveAllowed(), collectPendingSecrets(), DEFAULT_MODELS, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema (+45 more)

### Community 4 - "Chat Service"
Cohesion: 0.07
Nodes (48): SemanticStoreEmbedState, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize (+40 more)

### Community 5 - "Social Graph"
Cohesion: 0.09
Nodes (44): LlmGatewayError, RUN_LIFECYCLE, RunLifecyclePort, extractJsonText(), parseLlmJson(), SocialPipelineFacade, Inject, Injectable (+36 more)

### Community 6 - "Redis Vector Store Adapter"
Cohesion: 0.07
Nodes (28): RedisCacheAdapter, Injectable, isUnservableCachedReply(), CachedChatResponseSchema, parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, EmbeddingCircuitBreaker (+20 more)

### Community 7 - "Dokumentacja komunikacji"
Cohesion: 0.06
Nodes (63): Burst execute recovery, Anty-patterny, EventSource po completed/failed, forwardRef Runs ↔ Social, Mapa Subject SSE bez complete, Zod w packages/shared, apps/ai-provider-gateway, apps/api (+55 more)

### Community 8 - "GatewayKey"
Cohesion: 0.08
Nodes (24): CHAT_STREAM_API_DESCRIPTION, ChatErrorHandlerService, Injectable, SseSerializer, ApiGatewayChatErrorResponses(), GatewayKeyAndSmartRateLimit(), isProviderRateLimitError(), StreamCleanupInterceptor (+16 more)

### Community 9 - "Logging Module"
Cohesion: 0.06
Nodes (21): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+13 more)

### Community 10 - "resilient-executor.ts"
Cohesion: 0.08
Nodes (42): getClientConversationId(), getOrCreateConversationIdForResponse(), buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError() (+34 more)

### Community 11 - "Cli Module"
Cohesion: 0.04
Nodes (28): CliModule, Module, ClientListCommand, Command, Option, ClientRemoveCommand, Command, Option (+20 more)

### Community 12 - "App Module"
Cohesion: 0.06
Nodes (33): AppModule, Module, AuthController, Controller, AuthModule, Module, CompanyContextModule, Module (+25 more)

### Community 13 - "Llm Gateway Http Adapter"
Cohesion: 0.07
Nodes (31): GatewayChatResponse, GatewayErrorBody, LlmGatewayHttpAdapter, RETRYABLE_CODES, Inject, Injectable, LlmGatewayPort, LlmChatCommand (+23 more)

### Community 14 - "GatewayConfig"
Cohesion: 0.10
Nodes (14): PendingSecretsItem, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable, ProviderManagerService, Injectable (+6 more)

### Community 15 - "Responses Adapter"
Cohesion: 0.09
Nodes (38): ChatWarningSchema, FinishReasonSchema, mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId() (+30 more)

### Community 16 - "agent-answers.schema.ts"
Cohesion: 0.08
Nodes (16): RedisConnectionService, Injectable, Inject, Inject, isRedisRequiredFromConfig(), ChatProviderCooldownService, Injectable, StreamCacheReplayService (+8 more)

### Community 17 - "chat-response.dto.ts"
Cohesion: 0.13
Nodes (34): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, toChatResponseDto(), SseMetaPayload, SseMetaPayloadDto (+26 more)

### Community 18 - "Semantic Cache Service"
Cohesion: 0.09
Nodes (22): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend (+14 more)

### Community 19 - "Gateway Config Schema"
Cohesion: 0.12
Nodes (24): convertClient(), convertRateLimit(), ClientManagerService, Injectable, KeyGeneratorService, Injectable, ClientBasicAnswers, ClientPromptResult (+16 more)

### Community 20 - "response-cache.service.ts"
Cohesion: 0.10
Nodes (17): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheModule, Module, CacheModule, CacheModuleOptions (+9 more)

### Community 21 - "Social Types"
Cohesion: 0.08
Nodes (14): Inject, RunResultReader, EmptyRunResultReader, Injectable, PrismaService, Injectable, toInputJson(), PipelineState (+6 more)

### Community 22 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (23): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+15 more)

### Community 23 - "Anthropic Module"
Cohesion: 0.08
Nodes (26): ChatModule, Module, AnthropicModule, Module, AnthropicAuth(), AnthropicExceptionFilter, Catch, AnthropicApiKeyGuard (+18 more)

### Community 24 - "Model Manager Service"
Cohesion: 0.14
Nodes (24): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable (+16 more)

### Community 25 - "Cli Apply Types"
Cohesion: 0.14
Nodes (23): CliAiModel, CliAiProvider, CliRateLimit, GatewayClient, EnvPatchValue, ProviderTestService, Injectable, ClientCli (+15 more)

### Community 26 - "ModelAlias"
Cohesion: 0.10
Nodes (7): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppTokenUsage, TokenDirection

### Community 27 - "llm-gateway.http.adapter.ts"
Cohesion: 0.10
Nodes (28): toHttpException(), buildGenerationConfig(), createGoogleProvider(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields(), extractFromThoughtParts(), extractGeminiThinkingContent() (+20 more)

### Community 28 - "ids.ts"
Cohesion: 0.08
Nodes (26): Brand, UnBrand, ContentLanguage, RunStatus, RunTaskType, SocialPlatform, UserRole, CONV_ID_RE (+18 more)

### Community 29 - "App Module"
Cohesion: 0.08
Nodes (27): HealthModule, Module, IntegrationsModule, Module, LoggingModule, Global, Module, AiMetricsModule (+19 more)

### Community 30 - "anthropic-response.mapper.ts"
Cohesion: 0.12
Nodes (27): toChatResponseDtoFromCache(), SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto (+19 more)

### Community 31 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (28): asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic() (+20 more)

### Community 32 - "Metrics"
Cohesion: 0.11
Nodes (28): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+20 more)

### Community 33 - "provider-error.mapper.ts"
Cohesion: 0.20
Nodes (18): ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError() (+10 more)

### Community 34 - "RunRecord"
Cohesion: 0.10
Nodes (11): InProcessRunWorker, Injectable, Inject, RunExecutorPort, RunRecord, StubRunExecutor, Injectable, toOutcome() (+3 more)

### Community 35 - ".getOne"
Cohesion: 0.11
Nodes (23): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOpenAiErrorResponses, ApiOperation, ApiParam, ApiRequestIdHeader (+15 more)

### Community 36 - "config-generator.service.ts"
Cohesion: 0.15
Nodes (10): ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, EnvTemplateInput, generateEnvTemplate(), isEnvInputRedisRequired() (+2 more)

### Community 37 - "RunsController"
Cohesion: 0.09
Nodes (22): HitlDto, ArrayMinSize, IsArray, IsString, ListRunsQueryDto, IsIn, IsInt, IsOptional (+14 more)

### Community 38 - "WizardState"
Cohesion: 0.13
Nodes (13): ConfigValidateCommand, Command, Option, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, CliGatewayValidatorService, Injectable (+5 more)

### Community 39 - "App Metrics Backend Interface"
Cohesion: 0.13
Nodes (10): healthStatusToGaugeValue(), AppProviderCallContext, AppProviderStreamScope, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+2 more)

### Community 40 - "openai-params-provider.mapper.ts"
Cohesion: 0.13
Nodes (23): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+15 more)

### Community 41 - "provider-instances.bootstrap.ts"
Cohesion: 0.14
Nodes (16): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+8 more)

### Community 42 - "Openai Chat Completions Controller"
Cohesion: 0.16
Nodes (21): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional (+13 more)

### Community 43 - "App Metrics Service"
Cohesion: 0.12
Nodes (13): HealthCheckResult, HealthRedisCheckResult, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller (+5 more)

### Community 44 - "chat-completions.adapter.ts"
Cohesion: 0.10
Nodes (17): ChatStreamController, ApiBody, ApiGatewayChatErrorResponses, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, ApiSecurity (+9 more)

### Community 45 - "RunsController"
Cohesion: 0.16
Nodes (12): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional (+4 more)

### Community 46 - "Prisma Run Adapter"
Cohesion: 0.14
Nodes (9): ListRunsResult, RunSnapshot, ALLOWED, assertTransition(), PrismaRunAdapter, RunLogRow, RunRow, toPipelinePhase() (+1 more)

### Community 47 - "Configuration"
Cohesion: 0.15
Nodes (19): asCacheTtlSeconds(), asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration() (+11 more)

### Community 48 - "Agent Answers Schema"
Cohesion: 0.10
Nodes (19): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+11 more)

### Community 49 - "AppMetricsService"
Cohesion: 0.12
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable, HttpMethod

### Community 50 - "PrometheusAppMetricsAdapter"
Cohesion: 0.14
Nodes (3): PrometheusAppMetricsAdapter, Injectable, AppRequestLabels

### Community 51 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 52 - "openai-stream.mapper.ts"
Cohesion: 0.21
Nodes (13): mapAnthropicRequestToGateway(), AnthropicTool, mapAnthropicContentBlockToGateway(), mapAnthropicToolChoice(), mapAnthropicToolsToGateway(), mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway() (+5 more)

### Community 53 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (19): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 54 - "Configuration Validation Service"
Cohesion: 0.16
Nodes (8): CACHE_BACKEND_TYPE, assertEnabledProviderSecretsPresent(), configurationValidation, ConfigurationValidationService, CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment, RawGatewayConfig

### Community 55 - "swagger.setup.ts"
Cohesion: 0.14
Nodes (14): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+6 more)

### Community 56 - "ProviderRegistryService"
Cohesion: 0.15
Nodes (8): buildAppProviderMetricsContext(), ChatProviderCallService, Injectable, ChatValidationService, Injectable, GatewayModelConfig, ProviderRegistryService, Injectable

### Community 58 - "Execute()"
Cohesion: 0.18
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newConversationId(), newRequestId(), newRunId()

### Community 59 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.19
Nodes (10): AppModule, Module, bootstrap(), PORT, setupApp(), exportOpenApi(), buildSwaggerConfig(), createOpenApiDocument() (+2 more)

### Community 60 - "Branded Types"
Cohesion: 0.16
Nodes (11): VectorStoreUpsertInput, CostUsd, JsonSchemaName, PromptCacheCreationTokens, PromptCacheHitTokens, SemanticCacheTtlSeconds, ThinkingBudgetTokens, ToolCallId (+3 more)

### Community 61 - "runs.module.ts"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 62 - "responses.adapter.ts"
Cohesion: 0.24
Nodes (11): ApiAnthropicErrorResponses(), ApiRequestIdHeader(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty (+3 more)

### Community 63 - "HealthService"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 64 - ".getOne"
Cohesion: 0.17
Nodes (13): ApiGatewayModelsErrorResponses, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiRequestIdHeader, ApiSecurity (+5 more)

### Community 65 - "HealthService"
Cohesion: 0.23
Nodes (3): HealthReadinessResponseDto, HealthService, Injectable

### Community 66 - ".getOne"
Cohesion: 0.17
Nodes (13): AnthropicModelsController, AnthropicAuth, ApiAnthropicErrorResponses, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiRequestIdHeader (+5 more)

### Community 67 - "anthropic-messages.controller.ts"
Cohesion: 0.13
Nodes (13): ChatController, ApiBody, ApiGatewayChatErrorResponses, ApiOperation, ApiRequestIdHeader, ApiResponse, ApiSecurity, ApiTags (+5 more)

### Community 68 - "ConsistencyVerifier"
Cohesion: 0.13
Nodes (15): Pomijanie ConsistencyVerifier, FeedbackAgentKey, ConsistencyVerifier, ContentWriterAgent, IdeationAgent, LoadContext, NormalizeBrief, PersistIdeas (+7 more)

### Community 69 - "Runs Bounded Context"
Cohesion: 0.16
Nodes (15): Interrupted Status UI, Gateway POST /api/v1/chat, ConversationId, LlmGatewayPort, POST /runs 202 Async, X-Gateway-Key, interrupted Status, Run Lifecycle Port (+7 more)

### Community 70 - "SPEC Area Map"
Cohesion: 0.15
Nodes (14): Auth Bounded Context, Password Policy (bcrypt 12), User Soft-Delete, Next.js App Router, Frontend App, modules/ UI Layout, Docs vs SPEC, SPEC Area Map (+6 more)

### Community 71 - "Feedback"
Cohesion: 0.19
Nodes (14): Append-Only Opinions, Feedback Bounded Context, Own-Run Feedback Authz, POST /api/v1/feedback, Zostaw opinię CTA, Canonical Company Context in DB, Canonical DB Store, GET /api/v1/runs (+6 more)

### Community 72 - "API DoD Cases D 1–D 14"
Cohesion: 0.18
Nodes (13): EventSource Lifecycle, InMemoryRunSseHub, SSE Run Events, SSE Heartbeat (K-3b), RUN_SSE_SUBJECT_TTL_MS, In-Process Worker, MAX_CONCURRENT_RUNS, Run Recovery (R-9) (+5 more)

### Community 73 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 74 - "Shared"
Cohesion: 0.19
Nodes (13): FeedbackId, FE Shared Contract Types, class-validator ValidationPipe, Zod Application Validation, apps/ai-provider-gateway, apps/api, apps/frontend, Modular Monolith (+5 more)

### Community 75 - "prisma-run.adapter.ts"
Cohesion: 0.17
Nodes (11): ApiHeader, ApiAnthropicErrorResponses, ApiBody, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, Body (+3 more)

### Community 76 - "Health Readiness Response Dto"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 77 - "ChatParamsDto"
Cohesion: 0.17
Nodes (12): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, IsStringOrArrayOfStrings, Max (+4 more)

### Community 78 - "social.types.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 79 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 80 - "Cookie Only Session Model"
Cohesion: 0.20
Nodes (12): cc_access Cookie, cc_refresh Cookie, Cookie-only Session Model, JwtAuthGuard, Refresh Token Rotation, RolesGuard, Secure Cookies in Production, CORS with Credentials (+4 more)

### Community 81 - "LangGraph Pipeline"
Cohesion: 0.21
Nodes (12): FeedbackAgentKey, Feedback Without LangGraph, FeedbackTargetType, Social Application Facade, ConsistencyVerifier, ContentWriterAgent, IdeationAgent, LangGraph Pipeline (+4 more)

### Community 82 - "Should Include Redis Stack"
Cohesion: 0.35
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 83 - "configuration.ts"
Cohesion: 0.24
Nodes (9): ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDonePayloadDto, SseDoneUsageDto, ApiPropertyOptional (+1 more)

### Community 84 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 85 - "openai-chat-completions.controller.ts"
Cohesion: 0.18
Nodes (10): ApiBody, ApiOpenAiErrorResponses, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, Body, Post (+2 more)

### Community 86 - "V1 Public API"
Cohesion: 0.20
Nodes (11): /api/v1 Public API, Swagger UI /docs, SQLite to PostgreSQL Cutover, No ORM in Domain, PostgreSQL V1 Engine, Prisma ORM, Shared PrismaClient, Prisma Migrate (+3 more)

### Community 87 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 88 - "ProviderAddCommand"
Cohesion: 0.31
Nodes (3): ProviderAddCommand, Command, Option

### Community 89 - "HealthController"
Cohesion: 0.29
Nodes (7): HealthController, ApiOkResponse, ApiOperation, ApiRequestIdHeader, ApiTags, Controller, Get

### Community 90 - "ChatMessageDto"
Cohesion: 0.22
Nodes (7): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength

### Community 91 - "Completeness Gate"
Cohesion: 0.24
Nodes (10): Agenci Aktywni UX Gate, HTTP Error Envelope (K-1), Domain Exception Filter, RequestId, Company Context Bounded Context, GET company-context/completeness, Completeness Gate, CONTEXT_INCOMPLETE (+2 more)

### Community 92 - "KeyGenerateCommand"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 93 - "HealthService"
Cohesion: 0.33
Nodes (3): ModelRemoveCommand, Command, Option

### Community 94 - "SPEC — Auth"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 95 - "Config Validator"
Cohesion: 0.39
Nodes (8): collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, buildEffectiveGatewayConfig(), loadGatewayConfigFromFile(), assertMasterKeyPresent(), GatewayConfigSchema

### Community 96 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 97 - "Fail Fast Env Validation"
Cohesion: 0.22
Nodes (9): POST bootstrap-admin, GET bootstrap-status, GET /auth/me, Single Admin MVP, .env.example Placeholders, Fail-Fast Env Validation, @nestjs/config, First-Run Screen (+1 more)

### Community 98 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 99 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 100 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 102 - "SPEC — Social"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 103 - "Provider Base Url Validation"
Cohesion: 0.43
Nodes (6): assertEnabledProviderBaseUrlPresent(), collectMissingBaseUrlErrors(), formatMissingBaseUrlError(), MissingProviderBaseUrl, RawGatewayConfig, resolveBaseUrlFromEnv()

### Community 104 - "AnthropicMessageDto"
Cohesion: 0.29
Nodes (7): AnthropicMessageDto, ApiProperty, ArrayMinSize, IsArray, IsIn, Type, ValidateNested

### Community 105 - "Bramka kontekstu"
Cohesion: 0.29
Nodes (7): Agenci aktywni, Bramka kontekstu, isComplete, Kontekst firmy, Bramka kompletności kontekstu firmy, Zakres MVP, Wskaźnik agenci aktywni

### Community 106 - "ResponseFormatDto"
Cohesion: 0.33
Nodes (6): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional

### Community 107 - "AnthropicMessagesController"
Cohesion: 0.33
Nodes (5): AnthropicMessagesController, AnthropicAuth, ApiSecurity, ApiTags, Controller

### Community 109 - "Run Log Append Only"
Cohesion: 0.40
Nodes (6): Gateway Internal-Only in Production, GET /metrics, Pino Process Logs, Secret Leakage Ban, Feedback Body Limit, run.log Append-Only

### Community 110 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 111 - "layout.tsx"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 112 - "button.tsx"
Cohesion: 0.70
Nodes (3): Button(), buttonVariants, cn()

### Community 116 - "Jest"
Cohesion: 0.50
Nodes (4): CI PR, Jest, Piramida testów MVP, supertest

### Community 118 - "Content Chain"
Cohesion: 0.67
Nodes (3): Modularny monolit, Content Chain, Self-host MIT

### Community 119 - "PersistIdeasDraft"
Cohesion: 0.67
Nodes (3): PersistIdeasDraft, post_ideas_then_content, POST /runs/:runId/hitl

### Community 120 - "Docker Compose"
Cohesion: 0.67
Nodes (3): Docker Compose, Środowisko production, Volume SQLite

### Community 121 - "HITL"
Cohesion: 0.67
Nodes (3): HITL model B, Full-auto, HITL

## Knowledge Gaps
- **274 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `SemanticIndexNameOptions`, `ParsedKnnHits` (+269 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **59 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `RunRecord` connect `RunRecord` to `RunRepository`, `Execute()`, `Social Graph`, `Prisma Run Adapter`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `asClientId()` connect `Gateway Config Schema` to `Metrics`, `chat.service.ts`, `anthropic-messages.controller.ts`, `Chat Service`, `AsProviderInstanceId()`, `GatewayKey`, `Openai Chat Completions Controller`, `prisma-run.adapter.ts`, `chat-completions.adapter.ts`, `App Metrics Service`, `GatewayConfig`, `Branded Types`, `ClientId`, `openai-chat-completions.controller.ts`, `ProviderRegistryService`, `KeyGenerateCommand`, `anthropic-response.mapper.ts`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `AsProviderInstanceId()` to `Metrics`, `chat.service.ts`, `Chat Service`, `Provider Base Url Validation`, `GatewayKey`, `provider-instances.bootstrap.ts`, `resilient-executor.ts`, `RunsController`, `GatewayConfig`, `Responses Adapter`, `Configuration`, `chat-response.dto.ts`, `Gateway Config Schema`, `ProviderRegistryService`, `Model Manager Service`, `Branded Types`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _307 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Prisma Company Context Adapter` be split into smaller, more focused modules?**
  _Cohesion score 0.05283505154639175 - nodes in this community are weakly interconnected._
- **Should `chat.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11562350692785475 - nodes in this community are weakly interconnected._
- **Should `RunRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.05303392259913999 - nodes in this community are weakly interconnected._
# Graph Report - content-chain  (2026-08-30)

## Corpus Check
- 444 files · ~115,820 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3097 nodes · 8962 edges · 140 communities (135 shown, 5 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 64 edges (avg confidence: 0.74)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1d59ba28`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cli.module.ts
- EnvRef
- configuration-validation.service.ts
- GatewayConfig
- .info
- chat.service.ts
- anthropic-response.mapper.ts
- sentry-ai-metrics.adapter.ts
- ProviderInstanceId
- chat-response.dto.ts
- HealthService
- wizard-orchestrator.service.ts
- response-cache.service.ts
- ids.ts
- app-metrics-backend.interface.ts
- ChatRequestDto
- anthropic/anthropic-tools.mapper.ts
- HttpMethod
- types/index.ts
- ai-provider.interface.ts
- LoggingService
- api/src/app.module.ts
- config-generator.service.ts
- api-error.code.ts
- resilient-executor.ts
- provider-error.mapper.ts
- GatewayKey
- PrometheusAppMetricsAdapter
- agent-answers.schema.ts
- ModelAddCommand
- RunsController
- LogContext
- chat.module.ts
- company-context.module.ts
- configuration.ts
- swagger.setup.ts
- llm-gateway.http.adapter.ts
- provider-instances.bootstrap.ts
- company-context.dto.ts
- AnthropicMessagesRequestDto
- OpenAiChatCompletionRequestDto
- chat-completions.adapter.ts
- Runs / Social
- ai-provider-gateway/src/main.ts
- runs.module.ts
- ChatMessageDto
- google-tools.mapper.ts
- .getOne
- .getOne
- .getOne
- ChatToolingDto
- responses.adapter.ts
- asProviderInstanceId
- ClientId
- openai-params-provider.mapper.ts
- chat-provider-call.service.ts
- RunRepository
- chat-params.dto.ts
- CompanyContext
- KeyGenerateCommand
- PrometheusService
- models.controller.ts
- prisma-run.adapter.ts
- ChatParamsDto
- anthropic-models.controller.ts
- openai-chat-completions.controller.ts
- openai-models.controller.ts
- prisma-company-context.adapter.ts
- ai-provider-gateway/src/app.module.ts
- anthropic-messages.controller.ts
- ConfigInitCommand
- ProviderAddCommand
- HttpExceptionFilter
- app-metrics.service.ts
- Architektura katalogów i plików — Content Chain
- ClientRemoveCommand
- ModelEditCommand
- HealthService
- Architektura — Content Chain
- SPEC — Auth
- OpenAiChatMessageDto
- openai-stream.mapper.ts
- health-readiness-response.dto.ts
- SPEC — Komunikacja (HTTP / SSE / gateway)
- ClientAddCommand
- ClientEditCommand
- social.types.ts
- StartRunDto
- AppMetricsBackend
- SPEC — Social
- SPEC — Testy
- Przepływy danych — Content Chain
- openai-chat-message.dto.ts
- layout.tsx
- button.tsx
- Deployment — Content Chain
- UX Dashboard — Content Chain
- SPEC — Feedback (opinie tekstowe)
- SPEC — Kontekst firmy
- SPEC — Persistence
- SPEC — Runy / logi
- GatewayModelsCatalogService
- Słownik — Content Chain
- Dokumentacja koncepcyjna — Content Chain
- SPEC — Bezpieczeństwo i self-host ops
- SPEC — Frontend
- SPEC — Monorepo
- Observability — Content Chain
- Bezpieczeństwo — Content Chain
- Anty-patterny — Content Chain
- Brand types — Content Chain
- Testy — Content Chain
- runs.controller.ts
- Dokumentacja Content Chain
- SPEC — README
- NoopAppMetricsAdapter
- HealthController
- .createMessage
- http/express.d.ts
- should-include-redis-stack.ts
- ConsoleLoggerAdapter
- server-prompt.service.ts
- start-run.use-case.ts
- ModelRemoveCommand
- EnvironmentVariables
- PinoLoggerAdapter
- ConfigShowCommand
- ModelListCommand
- config-validator.ts
- GlobalExceptionFilter
- config-validator.ts
- GatewayCommand
- provider-base-url.validation.ts
- ConfigSecretsStatusCommand
- rate-limit.module.ts
- gateway-key.guard.branded-types.test-d.ts
- AppProviderStreamScope
- HitlDto
- health.controller.ts

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
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `AnthropicAuth()` --indirect_call--> `AnthropicExceptionFilter`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/decorators/anthropic-auth.decorator.ts → apps/ai-provider-gateway/src/integrations/anthropic/filters/anthropic-exception.filter.ts
- `OpenAiAuth()` --indirect_call--> `OpenAiExceptionFilter`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/decorators/openai-auth.decorator.ts → apps/ai-provider-gateway/src/integrations/openai/filters/openai-exception.filter.ts
- `bootstrap()` --indirect_call--> `LoggingService`  [INFERRED]
  apps/ai-provider-gateway/src/main.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- 4-file cycle: `apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts -> apps/ai-provider-gateway/src/config/typed-config.ts -> apps/ai-provider-gateway/src/config/app-configuration.types.ts -> apps/ai-provider-gateway/src/config/configuration.ts -> apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts`

## Communities (140 total, 5 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.04
Nodes (59): CliModule, Module, ClientListCommand, ClientListOptions, toSafeClientList(), Command, Option, ConfigShowCommand (+51 more)

### Community 1 - "EnvRef"
Cohesion: 0.18
Nodes (5): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, getAppConfigOrThrow()

### Community 2 - "configuration-validation.service.ts"
Cohesion: 0.14
Nodes (19): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration(), BuildEffectiveGatewayConfigOptions (+11 more)

### Community 3 - "GatewayConfig"
Cohesion: 0.08
Nodes (15): ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable, ProviderManagerService (+7 more)

### Community 4 - ".info"
Cohesion: 0.17
Nodes (16): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+8 more)

### Community 5 - "chat.service.ts"
Cohesion: 0.12
Nodes (4): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppTokenUsage

### Community 6 - "anthropic-response.mapper.ts"
Cohesion: 0.08
Nodes (38): toChatResponseDto(), toChatResponseDtoFromCache(), SseDoneEvent, fromGatewayToolCallDto(), toGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock (+30 more)

### Community 7 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (27): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+19 more)

### Community 8 - "ProviderInstanceId"
Cohesion: 0.11
Nodes (17): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, MetricsController, Controller, Get, Res (+9 more)

### Community 9 - "chat-response.dto.ts"
Cohesion: 0.10
Nodes (44): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, SseMetaPayload, SseMetaPayloadDto, ApiProperty (+36 more)

### Community 10 - "HealthService"
Cohesion: 0.23
Nodes (3): HealthReadinessResponseDto, HealthService, Injectable

### Community 11 - "wizard-orchestrator.service.ts"
Cohesion: 0.12
Nodes (34): InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient(), convertModel(), convertProvider(), convertRateLimit() (+26 more)

### Community 12 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (20): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+12 more)

### Community 13 - "ids.ts"
Cohesion: 0.08
Nodes (26): Brand, UnBrand, ContentLanguage, RunStatus, RunTaskType, SocialPlatform, UserRole, CONV_ID_RE (+18 more)

### Community 14 - "app-metrics-backend.interface.ts"
Cohesion: 0.18
Nodes (12): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+4 more)

### Community 15 - "ChatRequestDto"
Cohesion: 0.23
Nodes (13): SemanticStoreEmbedState, isCachedChatAllowedForModelAlias(), shouldStoreChatResponse(), toChatCacheIdentity(), isToolingRequest(), ChatCacheLookupResult, ChatCachePipelineService, Injectable (+5 more)

### Community 16 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.08
Nodes (30): ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel() (+22 more)

### Community 17 - "HttpMethod"
Cohesion: 0.13
Nodes (4): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable

### Community 18 - "types/index.ts"
Cohesion: 0.13
Nodes (13): ChatController, ApiBody, ApiGatewayChatErrorResponses, ApiOperation, ApiRequestIdHeader, ApiResponse, ApiSecurity, ApiTags (+5 more)

### Community 19 - "ai-provider.interface.ts"
Cohesion: 0.25
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 20 - "LoggingService"
Cohesion: 0.10
Nodes (12): Inject, Inject, Optional, PinoLoggerAdapter, Injectable, LogContext, LoggingService, Injectable (+4 more)

### Community 21 - "api/src/app.module.ts"
Cohesion: 0.08
Nodes (26): AppModule, Module, AuthController, Controller, AuthModule, Module, CompanyContextModule, Module (+18 more)

### Community 22 - "config-generator.service.ts"
Cohesion: 0.15
Nodes (11): ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, ClientCli, EnvTemplateInput, generateEnvTemplate() (+3 more)

### Community 23 - "api-error.code.ts"
Cohesion: 0.15
Nodes (14): readGatewayKeyHeader(), getAppConfig(), enrichRequestWithClientId(), SmartRateLimitGuard, Injectable, AnthropicAuth(), AnthropicApiKeyGuard, readAnthropicApiKey() (+6 more)

### Community 24 - "resilient-executor.ts"
Cohesion: 0.08
Nodes (43): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+35 more)

### Community 25 - "provider-error.mapper.ts"
Cohesion: 0.19
Nodes (20): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 26 - "GatewayKey"
Cohesion: 0.11
Nodes (16): ChatService, Injectable, ChatIngressProfile, GatewayKey, AnthropicMessagesController, AnthropicAuth, ApiSecurity, ApiTags (+8 more)

### Community 27 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (5): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable

### Community 28 - "agent-answers.schema.ts"
Cohesion: 0.14
Nodes (15): CachedChatResponseWithConversation, getClientConversationId(), getOrCreateConversationIdForResponse(), createInProcessSingleflight(), getResolvedSystemPrompts(), ChatExecutionPrep, StreamCacheDecision, StreamCacheHit (+7 more)

### Community 29 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 30 - "RunsController"
Cohesion: 0.07
Nodes (25): GetRunLogsUseCase, Inject, Injectable, GetRunUseCase, Inject, Injectable, ListRunsQueryDto, IsIn (+17 more)

### Community 31 - "LogContext"
Cohesion: 0.09
Nodes (16): NoopErrorReportingAdapter, Injectable, LEVEL_RANK, SentryErrorReportingAdapter, Injectable, parseLogLevel(), ErrorReportingBackend, LoggerBackend (+8 more)

### Community 32 - "chat.module.ts"
Cohesion: 0.17
Nodes (11): ApiBody, ApiGatewayChatErrorResponses, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, Body, Post (+3 more)

### Community 33 - "company-context.module.ts"
Cohesion: 0.05
Nodes (62): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject (+54 more)

### Community 34 - "configuration.ts"
Cohesion: 0.21
Nodes (17): ContentOutput, contentOutputSchema, IdeasOutput, ideasOutputSchema, socialIdeaSchema, VerifierOutput, verifierOutputSchema, nextRefineCount() (+9 more)

### Community 35 - "swagger.setup.ts"
Cohesion: 0.24
Nodes (9): ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDonePayloadDto, SseDoneUsageDto, ApiPropertyOptional (+1 more)

### Community 36 - "llm-gateway.http.adapter.ts"
Cohesion: 0.12
Nodes (16): LlmGatewayError, GatewayChatResponse, GatewayErrorBody, LlmGatewayHttpAdapter, RETRYABLE_CODES, Inject, Injectable, LlmGatewayPort (+8 more)

### Community 37 - "provider-instances.bootstrap.ts"
Cohesion: 0.22
Nodes (12): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, createChatCompletionsAdapter() (+4 more)

### Community 38 - "company-context.dto.ts"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 39 - "AnthropicMessagesRequestDto"
Cohesion: 0.05
Nodes (44): ApiHeader, ApiAnthropicErrorResponses, ApiBody, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, Body (+36 more)

### Community 40 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (19): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 41 - "chat-completions.adapter.ts"
Cohesion: 0.12
Nodes (32): toCachedChatResponse(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), parseGeminiResponseWithTools(), ChatCompletionsAdapterOptions, buildResponsesCreateParams() (+24 more)

### Community 42 - "Runs / Social"
Cohesion: 0.05
Nodes (40): Auth, Błędy gateway → run Content Chain, Company context, Dokumentacja komunikacji — Content Chain, Envelope błędu, Feedback (opinie tekstowe), `GET /api/v1/auth/bootstrap-status`, `GET /api/v1/auth/me` (+32 more)

### Community 43 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.19
Nodes (10): AppModule, Module, bootstrap(), PORT, setupApp(), exportOpenApi(), buildSwaggerConfig(), createOpenApiDocument() (+2 more)

### Community 44 - "runs.module.ts"
Cohesion: 0.12
Nodes (23): Inject, ListRunsUseCase, Injectable, RecoverInterruptedRunsUseCase, Inject, Injectable, ResumeHitlUseCase, Inject (+15 more)

### Community 45 - "ChatMessageDto"
Cohesion: 0.09
Nodes (31): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+23 more)

### Community 46 - "google-tools.mapper.ts"
Cohesion: 0.17
Nodes (17): toHttpException(), buildGenerationConfig(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields(), extractFromThoughtParts(), extractGeminiThinkingContent(), GeminiLegacyThoughtFields (+9 more)

### Community 47 - ".getOne"
Cohesion: 0.09
Nodes (20): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+12 more)

### Community 48 - ".getOne"
Cohesion: 0.11
Nodes (23): ApiAnthropicErrorResponses(), AnthropicModelsController, AnthropicAuth, ApiAnthropicErrorResponses, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam (+15 more)

### Community 49 - ".getOne"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 50 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 51 - "responses.adapter.ts"
Cohesion: 0.14
Nodes (14): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+6 more)

### Community 52 - "asProviderInstanceId"
Cohesion: 0.12
Nodes (28): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable (+20 more)

### Community 53 - "ClientId"
Cohesion: 0.10
Nodes (25): isUnservableCachedReply(), CachedChatResponseSchema, parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), normalizeEmbeddingModelForIndex(), semanticIndexName() (+17 more)

### Community 54 - "openai-params-provider.mapper.ts"
Cohesion: 0.13
Nodes (23): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+15 more)

### Community 55 - "chat-provider-call.service.ts"
Cohesion: 0.13
Nodes (16): ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsObject, IsOptional (+8 more)

### Community 56 - "RunRepository"
Cohesion: 0.07
Nodes (15): InProcessRunWorker, Injectable, Inject, ListRunsResult, RunRepository, RunSnapshot, RunLogEntry, RunRecord (+7 more)

### Community 57 - "chat-params.dto.ts"
Cohesion: 0.11
Nodes (16): CHAT_STREAM_API_DESCRIPTION, SseSerializer, ApiRequestIdHeader(), GatewayKeyAndSmartRateLimit(), ApiErrorCode, ApiErrorPayload, UnsupportedProviderException, StreamCleanupInterceptor (+8 more)

### Community 58 - "CompanyContext"
Cohesion: 0.09
Nodes (20): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, EmbeddingCircuitBreaker, isSingleTurnUserRequest(), lastUserMessageText() (+12 more)

### Community 60 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 61 - "models.controller.ts"
Cohesion: 0.09
Nodes (26): ApiGatewayModelsErrorResponses, ApiGatewayChatErrorResponses(), ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse (+18 more)

### Community 62 - "prisma-run.adapter.ts"
Cohesion: 0.27
Nodes (11): canRefine(), createFailRunNode(), createLoadContextNode(), createNormalizeBriefNode(), createPersistContentNode(), createPersistIdeasNode(), compileSocialGraph(), routeAfterConsistencyVerifier() (+3 more)

### Community 63 - "ChatParamsDto"
Cohesion: 0.17
Nodes (12): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, IsStringOrArrayOfStrings, Max (+4 more)

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.21
Nodes (8): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsStringOrArrayOfStrings(), IsThinkingBudget()

### Community 65 - "openai-chat-completions.controller.ts"
Cohesion: 0.29
Nodes (7): HealthController, ApiOkResponse, ApiOperation, ApiRequestIdHeader, ApiTags, Controller, Get

### Community 66 - "openai-models.controller.ts"
Cohesion: 0.11
Nodes (23): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOpenAiErrorResponses, ApiOperation, ApiParam, ApiRequestIdHeader (+15 more)

### Community 67 - "prisma-company-context.adapter.ts"
Cohesion: 0.11
Nodes (18): RunBrief, SocialPipelineFacade, toOutcome(), Injectable, SOCIAL_RESULT_STORE, SocialResultStore, PipelinePhase, PipelineState (+10 more)

### Community 68 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.11
Nodes (19): ChatModule, Module, HealthModule, Module, AnthropicModule, Module, IntegrationsModule, Module (+11 more)

### Community 69 - "anthropic-messages.controller.ts"
Cohesion: 0.26
Nodes (13): OPENAI_STREAM_API_DESCRIPTION, mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields(), buildToolCallsDelta() (+5 more)

### Community 70 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 71 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 72 - "HttpExceptionFilter"
Cohesion: 0.26
Nodes (4): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId()

### Community 73 - "app-metrics.service.ts"
Cohesion: 0.12
Nodes (13): HealthCheckResult, HealthRedisCheckResult, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller (+5 more)

### Community 74 - "Architektura katalogów i plików — Content Chain"
Cohesion: 0.11
Nodes (17): `apps/ai-provider-gateway`, `apps/api` — bounded contexty (~1 poziom w głąb), `apps/api/src/health/`, `metrics/`, `llm/`, `apps/api/src/shared/`, `apps/frontend`, Architektura katalogów i plików — Content Chain, Auth i Company Context, Drzewo docelowe (szkielet) (+9 more)

### Community 75 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 76 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 77 - "HealthService"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 78 - "Architektura — Content Chain"
Cohesion: 0.11
Nodes (17): Architektura — Content Chain, Async run i HITL, Auth, Bounded contexty w `apps/api`, Decyzje architektoniczne (skrót), Dziedziczenie i wyjątki, Frontend (`apps/frontend`), Gateway (`apps/ai-provider-gateway`) (+9 more)

### Community 79 - "SPEC — Auth"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs, Poza zakresem, Role i uprawnienia (norma), Sesja (cookie-only) (+5 more)

### Community 80 - "OpenAiChatMessageDto"
Cohesion: 0.16
Nodes (12): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+4 more)

### Community 81 - "openai-stream.mapper.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 82 - "health-readiness-response.dto.ts"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 83 - "SPEC — Komunikacja (HTTP / SSE / gateway)"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Korelacja ID (norma kodu), Kryteria akceptacji, Nie wolno, Norma implementacji, Powierzchnie (skrót), Powiązanie ze stylem z docs, Poza zakresem (+5 more)

### Community 84 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 85 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 86 - "social.types.ts"
Cohesion: 0.18
Nodes (5): PrismaModule, Global, Module, PrismaService, Injectable

### Community 87 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 88 - "AppMetricsBackend"
Cohesion: 0.52
Nodes (5): mapOpenAiMessagesToGateway(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 89 - "SPEC — Social"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Fazy invoke (model B), Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs / wyjątek, Poza zakresem, SPEC — Social (+5 more)

### Community 90 - "SPEC — Testy"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Obowiązkowe przypadki DoD (api), Piramida (MVP), Powiązanie ze stylem z docs, Poza zakresem (+5 more)

### Community 91 - "Przepływy danych — Content Chain"
Cohesion: 0.14
Nodes (13): 1. Bootstrap / auth, 2. Kontekst firmy i bramka, 3. Run jednoetapowy — `post_ideas` (full-auto), 4. Run dwuetapowy — `post_ideas_then_content` (HITL), 5. Korelacja ID (run agentowy), 6. Recovery po restarcie api, 7. Ścieżki błędu (skrót), 8. Przegląd runu i opinie (po pipeline) (+5 more)

### Community 92 - "openai-chat-message.dto.ts"
Cohesion: 0.18
Nodes (10): ApiBody, ApiOpenAiErrorResponses, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, Body, Post (+2 more)

### Community 93 - "layout.tsx"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 94 - "button.tsx"
Cohesion: 0.70
Nodes (3): Button(), buttonVariants, cn()

### Community 95 - "Deployment — Content Chain"
Cohesion: 0.15
Nodes (12): Anty-patterny deploy (skrót), Checklist operatora (`production`), Dane i backup (SQLite), Deployment — Content Chain, DX — pnpm (`local`), Kolejność wdrożenia vs produkt, Konfiguracja i sekrety, Observability (+4 more)

### Community 97 - "UX Dashboard — Content Chain"
Cohesion: 0.15
Nodes (12): Formularz: Zostaw opinię (zapis MVP), Globalny wskaźnik: czy agenci są aktywni, Nawigacja (sidebar), Poza zakresem UX MVP, Stany puste i błędy, UX Dashboard — Content Chain, Wejście: first-run, logowanie, sesja, Widok: Kontekst firmy (+4 more)

### Community 98 - "SPEC — Feedback (opinie tekstowe)"
Cohesion: 0.15
Nodes (12): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs / wyjątek, Poza zakresem, SPEC — Feedback (opinie tekstowe), Targety i katalog agentów (MVP) (+4 more)

### Community 99 - "SPEC — Kontekst firmy"
Cohesion: 0.15
Nodes (12): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs, Poza zakresem, Sekcje bramki (MVP), SPEC — Kontekst firmy (+4 more)

### Community 100 - "SPEC — Persistence"
Cohesion: 0.15
Nodes (12): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs, Poza zakresem, SPEC — Persistence, Twarde założenie silników (norma) (+4 more)

### Community 101 - "SPEC — Runy / logi"
Cohesion: 0.15
Nodes (12): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs, Poza zakresem, SPEC — Runy / logi, Statusy (norma) (+4 more)

### Community 102 - "GatewayModelsCatalogService"
Cohesion: 0.18
Nodes (9): ChatValidationService, Injectable, GatewayCapabilitiesConfig, GatewayModelConfig, GatewayParamsConfig, OpenAiApiSurface, ProviderRegistryService, ResolvedProviderConfig (+1 more)

### Community 103 - "Słownik — Content Chain"
Cohesion: 0.17
Nodes (11): Architektura i runtime, Identyfikatory i korelacja, Kody błędów — Content Chain API, Kody błędów — gateway (istotne dla integracji), Komunikacja, Model korelacji logów (norma), Poza zakresem słownika, Produkt i domena (+3 more)

### Community 104 - "Dokumentacja koncepcyjna — Content Chain"
Cohesion: 0.17
Nodes (11): Bramka kompletności kontekstu firmy, Cel produktu, Dla kogo jest system, Dokumentacja koncepcyjna — Content Chain, Główne założenia, HITL vs full-auto, Kolejność budowy (order of attack), Kryteria sukcesu MVP (+3 more)

### Community 105 - "SPEC — Bezpieczeństwo i self-host ops"
Cohesion: 0.17
Nodes (11): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs, Poza zakresem, SPEC — Bezpieczeństwo i self-host ops, Wolno (+3 more)

### Community 106 - "SPEC — Frontend"
Cohesion: 0.17
Nodes (11): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs / wyjątek, Poza zakresem, SPEC — Frontend, Wolno (+3 more)

### Community 107 - "SPEC — Monorepo"
Cohesion: 0.17
Nodes (11): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs, Poza zakresem, SPEC — Monorepo, Wolno (+3 more)

### Community 108 - "Observability — Content Chain"
Cohesion: 0.18
Nodes (10): DoD obserwowalności (MVP), Korelacja (ops), Logi runu (domena), Metryki `apps/api` (MVP), Observability — Content Chain, Podział sygnałów, Pola normy, Poza zakresem MVP (+2 more)

### Community 109 - "Bezpieczeństwo — Content Chain"
Cohesion: 0.18
Nodes (10): Bezpieczeństwo — Content Chain, Bootstrap i konta admin, Checklist operatora (`production`), Do / Don’t, Hasła (bcrypt), Poza zakresem MVP, Role i uprawnienia, Sekrety i powierzchnie (+2 more)

### Community 110 - "Anty-patterny — Content Chain"
Cohesion: 0.20
Nodes (9): Anty-patterny — Content Chain, `apps/api` i graf Social, Auth i tenancy, Frontend (`apps/frontend`), Gateway i korelacja, Granice monorepo, Legacy / workflow „tylko IDE”, Persistence (+1 more)

### Community 111 - "Brand types — Content Chain"
Cohesion: 0.20
Nodes (9): Brand types — Content Chain, Do / Don’t, Enumy / unie kontraktu (brand lub string union), Identyfikatory (string brands), Infrastruktura (wzorzec), Katalog typów (MVP), Poza zakresem MVP tego dokumentu, Przepływ korelacji (norma) (+1 more)

### Community 112 - "Testy — Content Chain"
Cohesion: 0.20
Nodes (9): Anty-patterny testowe (skrót), CI (MVP), Co mockować / nie mockować, Narzędzia (norma), Piramida (MVP), Poza zakresem MVP, Priorytety przypadków (DoD jakości api), Testy — Content Chain (+1 more)

### Community 113 - "runs.controller.ts"
Cohesion: 0.16
Nodes (6): Inject, RunSseEvent, RunSseHub, InMemoryRunSseHub, Inject, Injectable

### Community 114 - "Dokumentacja Content Chain"
Cohesion: 0.29
Nodes (6): Dokumentacja Content Chain, Jak czytać (kolejność), Mapa: temat → plik, Run SM (uproszczenie), Schematy (skrót), System

### Community 115 - "SPEC — README"
Cohesion: 0.29
Nodes (6): Docs vs SPEC, Jak czytać, Mapa obszar → plik, SPEC — README, Terminologia faz (skrót), Źródła

### Community 116 - "NoopAppMetricsAdapter"
Cohesion: 0.16
Nodes (8): CACHE_BACKEND_TYPE, assertEnabledProviderSecretsPresent(), configurationValidation, ConfigurationValidationService, CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment, RawGatewayConfig

### Community 117 - "HealthController"
Cohesion: 0.67
Nodes (3): LoggingModule, Global, Module

### Community 118 - ".createMessage"
Cohesion: 0.25
Nodes (8): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapTurnsToOpenAiMessages(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 120 - "should-include-redis-stack.ts"
Cohesion: 0.35
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 121 - "ConsoleLoggerAdapter"
Cohesion: 0.33
Nodes (3): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable

### Community 122 - "server-prompt.service.ts"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 123 - "start-run.use-case.ts"
Cohesion: 0.11
Nodes (17): parseWithZod(), hitlSelectedIdeaIdsSchema, ParsedHitlSelectedIdeaIds, ParsedRunBrief, ParsedRunId, ParsedStartRunCommand, runBriefSchema, runIdSchema (+9 more)

### Community 124 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 125 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 126 - "PinoLoggerAdapter"
Cohesion: 0.33
Nodes (5): ChatStreamController, ApiSecurity, ApiTags, Controller, GatewayKeyAndSmartRateLimit

### Community 127 - "ConfigShowCommand"
Cohesion: 0.14
Nodes (8): ChatErrorHandlerService, Injectable, ChatProviderCooldownService, Injectable, StreamCacheReplayService, Injectable, ActiveStreamsTracker, Injectable

### Community 128 - "ModelListCommand"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 129 - "config-validator.ts"
Cohesion: 0.08
Nodes (39): isRedisSearchTagSafeId(), PendingSecretsItem, assertInteractiveAllowed(), collectPendingSecrets(), ProviderTestCommand, Command, Option, DEFAULT_MODELS (+31 more)

### Community 130 - "GlobalExceptionFilter"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 131 - "config-validator.ts"
Cohesion: 0.39
Nodes (8): collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, buildEffectiveGatewayConfig(), loadGatewayConfigFromFile(), assertMasterKeyPresent(), GatewayConfigSchema

### Community 132 - "GatewayCommand"
Cohesion: 0.20
Nodes (9): isRetryable(), RetryReason, RUN_LIFECYCLE, RunLifecyclePort, extractJsonText(), parseLlmJson(), Inject, ChatJsonInput (+1 more)

### Community 133 - "provider-base-url.validation.ts"
Cohesion: 0.43
Nodes (6): assertEnabledProviderBaseUrlPresent(), collectMissingBaseUrlErrors(), formatMissingBaseUrlError(), MissingProviderBaseUrl, RawGatewayConfig, resolveBaseUrlFromEnv()

### Community 134 - "ConfigSecretsStatusCommand"
Cohesion: 0.40
Nodes (3): ConfigSecretsStatusCommand, Command, Option

### Community 135 - "rate-limit.module.ts"
Cohesion: 0.13
Nodes (13): AiMetricsModule, Global, Module, AppMetricsModule, Global, Module, ObservabilityModule, Global (+5 more)

### Community 138 - "HitlDto"
Cohesion: 0.40
Nodes (4): HitlDto, ArrayMinSize, IsArray, IsString

## Knowledge Gaps
- **429 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `SemanticIndexNameOptions`, `ParsedKnnHits` (+424 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `RunRecord` connect `RunRepository` to `prisma-company-context.adapter.ts`, `start-run.use-case.ts`, `runs.module.ts`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `StartRunUseCase` connect `start-run.use-case.ts` to `runs.module.ts`, `RunsController`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `asClientId()` connect `wizard-orchestrator.service.ts` to `chat.module.ts`, `cli.module.ts`, `GatewayConfig`, `.info`, `GatewayKey`, `anthropic-response.mapper.ts`, `AnthropicMessagesRequestDto`, `anthropic-messages.controller.ts`, `chat-response.dto.ts`, `app-metrics.service.ts`, `ChatMessageDto`, `ChatRequestDto`, `openai-chat-message.dto.ts`, `types/index.ts`, `chat-params.dto.ts`, `server-prompt.service.ts`, `agent-answers.schema.ts`, `ConfigShowCommand`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _429 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03640776699029126 - nodes in this community are weakly interconnected._
- **Should `configuration-validation.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `GatewayConfig` be split into smaller, more focused modules?**
  _Cohesion score 0.08082706766917293 - nodes in this community are weakly interconnected._
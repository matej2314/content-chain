# Graph Report - content-chain  (2026-08-30)

## Corpus Check
- 443 files · ~114,664 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3093 nodes · 8954 edges · 135 communities (131 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 64 edges (avg confidence: 0.74)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5e8e52a9`
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
- rate-limit.module.ts

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
- `AnthropicAuth()` --indirect_call--> `SmartRateLimitGuard`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/decorators/anthropic-auth.decorator.ts → apps/ai-provider-gateway/src/guards/smart-rate-limit-guard.ts
- `OpenAiAuth()` --indirect_call--> `SmartRateLimitGuard`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/decorators/openai-auth.decorator.ts → apps/ai-provider-gateway/src/guards/smart-rate-limit-guard.ts
- `bootstrap()` --indirect_call--> `LoggingService`  [INFERRED]
  apps/ai-provider-gateway/src/main.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- 4-file cycle: `apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts -> apps/ai-provider-gateway/src/config/typed-config.ts -> apps/ai-provider-gateway/src/config/app-configuration.types.ts -> apps/ai-provider-gateway/src/config/configuration.ts -> apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts`

## Communities (135 total, 4 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.07
Nodes (55): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers() (+47 more)

### Community 1 - "EnvRef"
Cohesion: 0.24
Nodes (3): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend

### Community 2 - "configuration-validation.service.ts"
Cohesion: 0.13
Nodes (21): CACHE_BACKEND_TYPE, asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration() (+13 more)

### Community 3 - "GatewayConfig"
Cohesion: 0.13
Nodes (11): ConfigSecretsStatusCommand, Command, Option, KeyGenerateCommand, Command, Option, EnvPatchService, Injectable (+3 more)

### Community 4 - ".info"
Cohesion: 0.12
Nodes (11): toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand, Command, Option, ProviderTestService (+3 more)

### Community 5 - "chat.service.ts"
Cohesion: 0.11
Nodes (5): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 6 - "anthropic-response.mapper.ts"
Cohesion: 0.13
Nodes (26): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+18 more)

### Community 7 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (23): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+15 more)

### Community 8 - "ProviderInstanceId"
Cohesion: 0.11
Nodes (17): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, MetricsController, Controller, Get, Res (+9 more)

### Community 9 - "chat-response.dto.ts"
Cohesion: 0.13
Nodes (37): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, mapStopReasonToFinishReason(), buildLlmMetricsContext(), mapProviderResponseToUsage(), CompleteOnceResult (+29 more)

### Community 10 - "HealthService"
Cohesion: 0.23
Nodes (4): HealthReadinessResponseDto, ApiProperty, HealthService, Injectable

### Community 11 - "wizard-orchestrator.service.ts"
Cohesion: 0.08
Nodes (43): PendingSecretsItem, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema (+35 more)

### Community 12 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (20): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+12 more)

### Community 13 - "ids.ts"
Cohesion: 0.08
Nodes (26): Brand, UnBrand, ContentLanguage, RunStatus, RunTaskType, SocialPlatform, UserRole, CONV_ID_RE (+18 more)

### Community 14 - "app-metrics-backend.interface.ts"
Cohesion: 0.17
Nodes (11): healthStatusToGaugeValue(), AppRequestLabels, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod, HttpRequestLabels (+3 more)

### Community 15 - "ChatRequestDto"
Cohesion: 0.14
Nodes (21): SemanticStoreEmbedState, CachedChatResponseWithConversation, isCachedChatAllowedForModelAlias(), shouldStoreChatResponse(), createInProcessSingleflight(), getResolvedSystemPrompts(), toChatCacheIdentity(), isToolingRequest() (+13 more)

### Community 16 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.08
Nodes (35): ChatWarningSchema, FinishReasonSchema, mapProviderResponseToAiObservation(), toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens() (+27 more)

### Community 17 - "HttpMethod"
Cohesion: 0.12
Nodes (4): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable

### Community 18 - "types/index.ts"
Cohesion: 0.13
Nodes (13): ChatController, ApiBody, ApiGatewayChatErrorResponses, ApiOperation, ApiRequestIdHeader, ApiResponse, ApiSecurity, ApiTags (+5 more)

### Community 19 - "ai-provider.interface.ts"
Cohesion: 0.28
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 20 - "LoggingService"
Cohesion: 0.13
Nodes (11): Inject, Inject, Inject, Optional, LogContext, LoggingService, Injectable, createAnthropicProvider() (+3 more)

### Community 21 - "api/src/app.module.ts"
Cohesion: 0.09
Nodes (24): AppModule, Module, AuthController, Controller, AuthModule, Module, CompanyContextModule, Module (+16 more)

### Community 22 - "config-generator.service.ts"
Cohesion: 0.11
Nodes (15): WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable, Injectable, WizardOrchestratorService, WizardRunResult (+7 more)

### Community 23 - "api-error.code.ts"
Cohesion: 0.21
Nodes (11): GatewayKeyAndSmartRateLimit(), readClientGatewayKey(), readGatewayKeyHeader(), asGatewayKey(), getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId() (+3 more)

### Community 24 - "resilient-executor.ts"
Cohesion: 0.07
Nodes (48): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+40 more)

### Community 25 - "provider-error.mapper.ts"
Cohesion: 0.23
Nodes (17): ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError() (+9 more)

### Community 26 - "GatewayKey"
Cohesion: 0.13
Nodes (14): ChatService, Injectable, ChatExecutionContext, GatewayKey, RequestId, Express, Request, OpenAiChatCompletionsController (+6 more)

### Community 27 - "PrometheusAppMetricsAdapter"
Cohesion: 0.11
Nodes (6): ProviderTestOptions, CliAiModel, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable

### Community 28 - "agent-answers.schema.ts"
Cohesion: 0.32
Nodes (5): OpenAiAuth(), OpenAiExceptionFilter, Catch, OpenAiBearerAuthGuard, Injectable

### Community 29 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 30 - "RunsController"
Cohesion: 0.05
Nodes (36): GetRunLogsUseCase, Inject, Injectable, GetRunUseCase, Injectable, ListRunsUseCase, Injectable, StartRunUseCase (+28 more)

### Community 31 - "LogContext"
Cohesion: 0.09
Nodes (16): NoopErrorReportingAdapter, Injectable, LEVEL_RANK, SentryErrorReportingAdapter, Injectable, parseLogLevel(), ErrorReportingBackend, LoggerBackend (+8 more)

### Community 32 - "chat.module.ts"
Cohesion: 0.11
Nodes (16): ChatStreamController, ApiBody, ApiGatewayChatErrorResponses, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, ApiSecurity (+8 more)

### Community 33 - "company-context.module.ts"
Cohesion: 0.05
Nodes (62): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject (+54 more)

### Community 34 - "configuration.ts"
Cohesion: 0.13
Nodes (31): isRetryable(), RetryReason, ContentOutput, contentOutputSchema, IdeasOutput, ideasOutputSchema, socialIdeaSchema, VerifierOutput (+23 more)

### Community 35 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (24): ChatCacheSource, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, ChatWarningDto (+16 more)

### Community 36 - "llm-gateway.http.adapter.ts"
Cohesion: 0.12
Nodes (16): LlmGatewayError, GatewayChatResponse, GatewayErrorBody, LlmGatewayHttpAdapter, RETRYABLE_CODES, Inject, Injectable, LlmGatewayPort (+8 more)

### Community 37 - "provider-instances.bootstrap.ts"
Cohesion: 0.26
Nodes (11): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryContext, ProviderFactoryFn (+3 more)

### Community 38 - "company-context.dto.ts"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 39 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 40 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (19): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 41 - "chat-completions.adapter.ts"
Cohesion: 0.08
Nodes (37): asSystemFingerprint(), asToolCallId(), ProviderAssistantTurn, ProviderChatTurn, ProviderToolDefinition, ProviderToolResultTurn, ChatCompletionsAdapterOptions, buildResponsesCreateParams() (+29 more)

### Community 42 - "Runs / Social"
Cohesion: 0.05
Nodes (40): Auth, Błędy gateway → run Content Chain, Company context, Dokumentacja komunikacji — Content Chain, Envelope błędu, Feedback (opinie tekstowe), `GET /api/v1/auth/bootstrap-status`, `GET /api/v1/auth/me` (+32 more)

### Community 43 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.12
Nodes (18): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+10 more)

### Community 44 - "runs.module.ts"
Cohesion: 0.15
Nodes (15): Inject, RecoverInterruptedRunsUseCase, Inject, Injectable, RunLifecycleService, TransitionExtras, Inject, Injectable (+7 more)

### Community 45 - "ChatMessageDto"
Cohesion: 0.10
Nodes (30): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+22 more)

### Community 46 - "google-tools.mapper.ts"
Cohesion: 0.13
Nodes (18): buildGenerationConfig(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields(), extractFromThoughtParts(), extractGeminiThinkingContent(), GeminiLegacyThoughtFields, GeminiResponseWithTools (+10 more)

### Community 47 - ".getOne"
Cohesion: 0.17
Nodes (13): ApiGatewayModelsErrorResponses, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiRequestIdHeader, ApiSecurity (+5 more)

### Community 48 - ".getOne"
Cohesion: 0.17
Nodes (13): AnthropicModelsController, AnthropicAuth, ApiAnthropicErrorResponses, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiRequestIdHeader (+5 more)

### Community 49 - ".getOne"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 50 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 51 - "responses.adapter.ts"
Cohesion: 0.32
Nodes (5): AnthropicAuth(), AnthropicExceptionFilter, Catch, AnthropicApiKeyGuard, Injectable

### Community 52 - "asProviderInstanceId"
Cohesion: 0.06
Nodes (37): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable (+29 more)

### Community 53 - "ClientId"
Cohesion: 0.10
Nodes (25): isUnservableCachedReply(), CachedChatResponseSchema, parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), normalizeEmbeddingModelForIndex(), semanticIndexName() (+17 more)

### Community 54 - "openai-params-provider.mapper.ts"
Cohesion: 0.13
Nodes (23): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+15 more)

### Community 55 - "chat-provider-call.service.ts"
Cohesion: 0.09
Nodes (24): ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsObject, IsOptional (+16 more)

### Community 56 - "RunRepository"
Cohesion: 0.09
Nodes (9): Inject, InProcessRunWorker, Injectable, Inject, ResumeHitlUseCase, Inject, Injectable, RunRepository (+1 more)

### Community 57 - "chat-params.dto.ts"
Cohesion: 0.15
Nodes (10): resolveClientIdFromKey(), ClientId, GatewayKeyRuntimeConfig, ResolvedGatewayClient, _badRuntimeConfig, SmartRateLimitGuard, Injectable, ActiveStreamsTracker (+2 more)

### Community 58 - "CompanyContext"
Cohesion: 0.09
Nodes (20): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, EmbeddingCircuitBreaker, isSingleTurnUserRequest(), lastUserMessageText() (+12 more)

### Community 60 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 61 - "models.controller.ts"
Cohesion: 0.15
Nodes (13): ApiGatewayChatErrorResponses(), ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty (+5 more)

### Community 62 - "prisma-run.adapter.ts"
Cohesion: 0.14
Nodes (10): ListRunsResult, RunSnapshot, RunLogEntry, ALLOWED, assertTransition(), PrismaRunAdapter, RunLogRow, RunRow (+2 more)

### Community 63 - "ChatParamsDto"
Cohesion: 0.10
Nodes (19): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, IsStringOrArrayOfStrings, Max (+11 more)

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.29
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 65 - "openai-chat-completions.controller.ts"
Cohesion: 0.16
Nodes (11): HealthLivenessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiRequestIdHeader, ApiTags, Controller (+3 more)

### Community 66 - "openai-models.controller.ts"
Cohesion: 0.11
Nodes (23): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOpenAiErrorResponses, ApiOperation, ApiParam, ApiRequestIdHeader (+15 more)

### Community 67 - "prisma-company-context.adapter.ts"
Cohesion: 0.10
Nodes (20): toInputJson(), SocialPipelineFacade, toOutcome(), Inject, Injectable, SOCIAL_RESULT_STORE, SocialResultStore, PipelinePhase (+12 more)

### Community 68 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.14
Nodes (15): ChatModule, Module, AnthropicModule, Module, AnthropicMessagesController, AnthropicAuth, ApiSecurity, ApiTags (+7 more)

### Community 69 - "anthropic-messages.controller.ts"
Cohesion: 0.06
Nodes (44): ApiHeader, toChatResponseDto(), toChatResponseDtoFromCache(), CHAT_STREAM_API_DESCRIPTION, SseEvent, SseSerializer, ApiRequestIdHeader(), toGatewayToolCallDto() (+36 more)

### Community 70 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 71 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 72 - "HttpExceptionFilter"
Cohesion: 0.15
Nodes (8): ErrorEnvelope, HttpExceptionFilter, Catch, newConversationId(), newRequestId(), newRunId(), RequestIdMiddleware, Injectable

### Community 73 - "app-metrics.service.ts"
Cohesion: 0.13
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

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
Cohesion: 0.12
Nodes (16): Architektura — Content Chain, Async run i HITL, Auth, Bounded contexty w `apps/api`, Decyzje architektoniczne (skrót), Dziedziczenie i wyjątki, Frontend (`apps/frontend`), Gateway (`apps/ai-provider-gateway`) (+8 more)

### Community 79 - "SPEC — Auth"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs, Poza zakresem, Role i uprawnienia (norma), Sesja (cookie-only) (+5 more)

### Community 80 - "OpenAiChatMessageDto"
Cohesion: 0.15
Nodes (13): IsStringOrArrayOfStrings(), OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString (+5 more)

### Community 81 - "openai-stream.mapper.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 82 - "health-readiness-response.dto.ts"
Cohesion: 0.26
Nodes (10): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional (+2 more)

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
Cohesion: 0.17
Nodes (5): PrismaModule, Global, Module, PrismaService, Injectable

### Community 87 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 88 - "AppMetricsBackend"
Cohesion: 0.32
Nodes (8): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool, GatewayToolChoice, GatewayToolDefinition

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
Cohesion: 0.40
Nodes (3): ClientListCommand, Command, Option

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
Cohesion: 0.29
Nodes (3): GatewayModelConfig, ProviderRegistryService, Injectable

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
Cohesion: 0.27
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 114 - "Dokumentacja Content Chain"
Cohesion: 0.29
Nodes (6): Dokumentacja Content Chain, Jak czytać (kolejność), Mapa: temat → plik, Run SM (uproszczenie), Schematy (skrót), System

### Community 115 - "SPEC — README"
Cohesion: 0.29
Nodes (6): Docs vs SPEC, Jak czytać, Mapa obszar → plik, SPEC — README, Terminologia faz (skrót), Źródła

### Community 116 - "NoopAppMetricsAdapter"
Cohesion: 0.17
Nodes (7): assertEnabledProviderSecretsPresent(), configurationValidation, ConfigurationValidationService, CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment, RawGatewayConfig

### Community 117 - "HealthController"
Cohesion: 0.19
Nodes (10): LoggingModule, Global, Module, ProviderInstancesBootstrap, Injectable, ProviderRegistryModule, Global, Module (+2 more)

### Community 118 - ".createMessage"
Cohesion: 0.50
Nodes (3): ConfigValidateCommand, Command, Option

### Community 120 - "should-include-redis-stack.ts"
Cohesion: 0.35
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 121 - "ConsoleLoggerAdapter"
Cohesion: 0.33
Nodes (3): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable

### Community 122 - "server-prompt.service.ts"
Cohesion: 0.40
Nodes (3): ModelListCommand, Command, Option

### Community 123 - "start-run.use-case.ts"
Cohesion: 0.20
Nodes (14): parseWithZod(), hitlSelectedIdeaIdsSchema, ParsedHitlSelectedIdeaIds, ParsedRunBrief, ParsedRunId, ParsedStartRunCommand, runBriefSchema, runIdSchema (+6 more)

### Community 124 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 125 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 127 - "ConfigShowCommand"
Cohesion: 0.12
Nodes (11): ChatErrorHandlerService, Injectable, ChatProviderCallService, Injectable, ChatProviderCooldownService, Injectable, StreamCacheReplayService, Injectable (+3 more)

### Community 128 - "ModelListCommand"
Cohesion: 0.29
Nodes (7): buildAppProviderMetricsContext(), clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, GatewayParamsConfig

### Community 129 - "config-validator.ts"
Cohesion: 0.09
Nodes (45): isRedisSearchTagSafeId(), assertInteractiveAllowed(), DEFAULT_MODELS, convertProvider(), CliAiProvider, ClientPromptService, Injectable, KeyPromptService (+37 more)

### Community 130 - "GlobalExceptionFilter"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 131 - "config-validator.ts"
Cohesion: 0.48
Nodes (6): collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, buildEffectiveGatewayConfig(), assertMasterKeyPresent()

### Community 133 - "provider-base-url.validation.ts"
Cohesion: 0.43
Nodes (6): assertEnabledProviderBaseUrlPresent(), collectMissingBaseUrlErrors(), formatMissingBaseUrlError(), MissingProviderBaseUrl, RawGatewayConfig, resolveBaseUrlFromEnv()

### Community 135 - "rate-limit.module.ts"
Cohesion: 0.13
Nodes (13): AiMetricsModule, Global, Module, AppMetricsModule, Global, Module, ObservabilityModule, Global (+5 more)

## Knowledge Gaps
- **429 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `SemanticIndexNameOptions`, `ParsedKnnHits` (+424 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `RunRecord` connect `RunRepository` to `prisma-company-context.adapter.ts`, `HttpExceptionFilter`, `runs.module.ts`, `start-run.use-case.ts`, `prisma-run.adapter.ts`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `asClientId()` connect `wizard-orchestrator.service.ts` to `chat.module.ts`, `ModelListCommand`, `cli.module.ts`, `GatewayConfig`, `.info`, `anthropic-messages.controller.ts`, `config-validator.ts`, `chat-response.dto.ts`, `app-metrics.service.ts`, `ChatRequestDto`, `types/index.ts`, `chat-params.dto.ts`, `GatewayKey`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `config-validator.ts` to `ModelListCommand`, `cli.module.ts`, `configuration-validation.service.ts`, `.info`, `provider-base-url.validation.ts`, `provider-instances.bootstrap.ts`, `chat-response.dto.ts`, `wizard-orchestrator.service.ts`, `ChatRequestDto`, `anthropic/anthropic-tools.mapper.ts`, `asProviderInstanceId`, `resilient-executor.ts`, `GatewayKey`, `models.controller.ts`, `ConfigShowCommand`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _429 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07474226804123711 - nodes in this community are weakly interconnected._
- **Should `configuration-validation.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13043478260869565 - nodes in this community are weakly interconnected._
- **Should `GatewayConfig` be split into smaller, more focused modules?**
  _Cohesion score 0.12923076923076923 - nodes in this community are weakly interconnected._
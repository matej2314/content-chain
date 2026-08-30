# Graph Report - content-chain  (2026-08-30)

## Corpus Check
- 442 files · ~114,326 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3082 nodes · 8914 edges · 139 communities (132 shown, 7 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 64 edges (avg confidence: 0.74)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `848d302f`
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
- openai-chat-completion-request.dto.ts
- rate-limit.module.ts
- .constructor
- .execute
- ParseRunIdPipe

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
- `GatewayKeyAndSmartRateLimit()` --indirect_call--> `GatewayKeyGuard`  [INFERRED]
  apps/ai-provider-gateway/src/common/decorators/gateway-key-and-smart-rate-limit.decorator.ts → apps/ai-provider-gateway/src/guards/gateway-key.guard.ts
- `GatewayKeyAndSmartRateLimit()` --indirect_call--> `SmartRateLimitGuard`  [INFERRED]
  apps/ai-provider-gateway/src/common/decorators/gateway-key-and-smart-rate-limit.decorator.ts → apps/ai-provider-gateway/src/guards/smart-rate-limit-guard.ts
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `OpenAiAuth()` --indirect_call--> `SmartRateLimitGuard`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/decorators/openai-auth.decorator.ts → apps/ai-provider-gateway/src/guards/smart-rate-limit-guard.ts
- `bootstrap()` --indirect_call--> `LoggingService`  [INFERRED]
  apps/ai-provider-gateway/src/main.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- 4-file cycle: `apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts -> apps/ai-provider-gateway/src/config/typed-config.ts -> apps/ai-provider-gateway/src/config/app-configuration.types.ts -> apps/ai-provider-gateway/src/config/configuration.ts -> apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts`

## Communities (139 total, 7 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.05
Nodes (67): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags (+59 more)

### Community 1 - "EnvRef"
Cohesion: 0.09
Nodes (18): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, embeddingProbeTimeoutMs(), EMBED_NOT_ATTEMPTED, SemanticCacheService, SemanticLookupResult, Inject (+10 more)

### Community 2 - "configuration-validation.service.ts"
Cohesion: 0.13
Nodes (21): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration(), BuildEffectiveGatewayConfigOptions (+13 more)

### Community 3 - "GatewayConfig"
Cohesion: 0.12
Nodes (10): EnvPatchService, Injectable, ProviderManagerService, Injectable, ClientCli, EditProviderInput, RemoveProviderInput, countActiveModelsAfterProviderChange() (+2 more)

### Community 5 - "chat.service.ts"
Cohesion: 0.24
Nodes (6): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, UnsupportedProviderException, PayloadTooLargeError, RequestWithId

### Community 6 - "anthropic-response.mapper.ts"
Cohesion: 0.13
Nodes (25): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+17 more)

### Community 7 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.09
Nodes (29): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+21 more)

### Community 8 - "ProviderInstanceId"
Cohesion: 0.11
Nodes (17): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, MetricsController, Controller, Get, Res (+9 more)

### Community 9 - "chat-response.dto.ts"
Cohesion: 0.16
Nodes (28): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, SseMetaPayload, mapStopReasonToFinishReason(), CompleteOnceResult, StreamOnceParams (+20 more)

### Community 10 - "HealthService"
Cohesion: 0.09
Nodes (19): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto (+11 more)

### Community 11 - "wizard-orchestrator.service.ts"
Cohesion: 0.10
Nodes (37): assertInteractiveAllowed(), CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient(), convertRateLimit(), GatewayClientSchema, CliAiModel (+29 more)

### Community 12 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (20): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+12 more)

### Community 13 - "ids.ts"
Cohesion: 0.08
Nodes (26): Brand, UnBrand, ContentLanguage, RunStatus, RunTaskType, SocialPlatform, UserRole, CONV_ID_RE (+18 more)

### Community 14 - "app-metrics-backend.interface.ts"
Cohesion: 0.19
Nodes (12): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+4 more)

### Community 15 - "ChatRequestDto"
Cohesion: 0.07
Nodes (40): SemanticStoreEmbedState, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize (+32 more)

### Community 16 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.10
Nodes (24): ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic(), resolveAnthropicOutputConfig(), ContentBlockParam (+16 more)

### Community 17 - "HttpMethod"
Cohesion: 0.07
Nodes (11): toChatCacheIdentity(), ChatCachePipelineService, Injectable, Optional, HttpMetricsMiddleware, Injectable, ClientId, ActiveStreamsTracker (+3 more)

### Community 18 - "types/index.ts"
Cohesion: 0.13
Nodes (13): ChatController, ApiBody, ApiGatewayChatErrorResponses, ApiOperation, ApiRequestIdHeader, ApiResponse, ApiSecurity, ApiTags (+5 more)

### Community 19 - "ai-provider.interface.ts"
Cohesion: 0.30
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 20 - "LoggingService"
Cohesion: 0.12
Nodes (12): Inject, ChatProviderCooldownService, Injectable, StreamCacheReplayService, Injectable, LogContext, LoggingService, Injectable (+4 more)

### Community 21 - "api/src/app.module.ts"
Cohesion: 0.07
Nodes (27): AppModule, Module, AuthController, Controller, AuthModule, Module, CompanyContextModule, Module (+19 more)

### Community 22 - "config-generator.service.ts"
Cohesion: 0.09
Nodes (15): ConfigGeneratorService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, FileManagerService, Injectable, WizardRunResult (+7 more)

### Community 23 - "api-error.code.ts"
Cohesion: 0.30
Nodes (7): getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), readAnthropicApiKey(), readAuthorizationHeader(), readBearerToken()

### Community 24 - "resilient-executor.ts"
Cohesion: 0.07
Nodes (45): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+37 more)

### Community 25 - "provider-error.mapper.ts"
Cohesion: 0.31
Nodes (15): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+7 more)

### Community 26 - "GatewayKey"
Cohesion: 0.13
Nodes (12): ChatErrorHandlerService, Injectable, isProviderRateLimitError(), resolveClientIdFromKey(), GatewayKey, Express, Request, ResolvedGatewayClient (+4 more)

### Community 27 - "PrometheusAppMetricsAdapter"
Cohesion: 0.06
Nodes (10): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, PrometheusAppMetricsAdapter, Injectable, AppMetricsBackend (+2 more)

### Community 28 - "agent-answers.schema.ts"
Cohesion: 0.31
Nodes (5): OpenAiAuth(), OpenAiExceptionFilter, Catch, OpenAiBearerAuthGuard, Injectable

### Community 29 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 30 - "RunsController"
Cohesion: 0.08
Nodes (22): HitlDto, ArrayMinSize, IsArray, IsString, ListRunsQueryDto, IsIn, IsInt, IsOptional (+14 more)

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
Cohesion: 0.15
Nodes (28): ContentOutput, contentOutputSchema, IdeasOutput, ideasOutputSchema, socialIdeaSchema, VerifierOutput, verifierOutputSchema, canRefine() (+20 more)

### Community 35 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (28): ChatCacheSource, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, toChatResponseDto(), ApiProperty, ApiPropertyOptional (+20 more)

### Community 36 - "llm-gateway.http.adapter.ts"
Cohesion: 0.11
Nodes (19): LlmGatewayError, GatewayChatResponse, GatewayErrorBody, LlmGatewayHttpAdapter, RETRYABLE_CODES, Inject, Injectable, LlmGatewayPort (+11 more)

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
Nodes (41): ChatWarningSchema, FinishReasonSchema, mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens(), asPromptCacheHitTokens() (+33 more)

### Community 42 - "Runs / Social"
Cohesion: 0.05
Nodes (40): Auth, Błędy gateway → run Content Chain, Company context, Dokumentacja komunikacji — Content Chain, Envelope błędu, Feedback (opinie tekstowe), `GET /api/v1/auth/bootstrap-status`, `GET /api/v1/auth/me` (+32 more)

### Community 43 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (16): AppModule, Module, SseDeltaPayloadDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, bootstrap(), PORT (+8 more)

### Community 44 - "runs.module.ts"
Cohesion: 0.09
Nodes (30): GetRunLogsUseCase, Injectable, GetRunUseCase, Injectable, Inject, ListRunsUseCase, Injectable, RecoverInterruptedRunsUseCase (+22 more)

### Community 45 - "ChatMessageDto"
Cohesion: 0.10
Nodes (26): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+18 more)

### Community 46 - "google-tools.mapper.ts"
Cohesion: 0.08
Nodes (34): toHttpException(), ModelId, PromptCacheCreationTokens, PromptCacheHitTokens, buildGenerationConfig(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+26 more)

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
Cohesion: 0.19
Nodes (7): SmartRateLimitGuard, Injectable, AnthropicAuth(), AnthropicExceptionFilter, Catch, AnthropicApiKeyGuard, Injectable

### Community 52 - "asProviderInstanceId"
Cohesion: 0.12
Nodes (26): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable (+18 more)

### Community 53 - "ClientId"
Cohesion: 0.17
Nodes (14): RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), isRedisSearchIndexAlreadyExistsError(), isRedisSearchMissingIndexError(), isRedisSearchModuleMissingError(), redisSearchErrorMessage(), semanticSchemaFtCreateArgs() (+6 more)

### Community 54 - "openai-params-provider.mapper.ts"
Cohesion: 0.13
Nodes (23): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+15 more)

### Community 55 - "chat-provider-call.service.ts"
Cohesion: 0.17
Nodes (18): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns() (+10 more)

### Community 56 - "RunRepository"
Cohesion: 0.09
Nodes (9): Inject, Inject, InProcessRunWorker, Injectable, Inject, Inject, Inject, RunRepository (+1 more)

### Community 57 - "chat-params.dto.ts"
Cohesion: 0.33
Nodes (6): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional

### Community 58 - "CompanyContext"
Cohesion: 0.13
Nodes (16): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), isUnservableCachedReply(), ResponseCacheService, Injectable, CachedChatResponseSchema, parseCachedChatResponse() (+8 more)

### Community 59 - "KeyGenerateCommand"
Cohesion: 0.39
Nodes (3): KeyGenerateCommand, Command, Option

### Community 60 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 61 - "models.controller.ts"
Cohesion: 0.22
Nodes (8): GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto, ApiProperty, GatewayModelsCatalogService, Injectable

### Community 62 - "prisma-run.adapter.ts"
Cohesion: 0.08
Nodes (15): ListRunsResult, RunSnapshot, RunLogEntry, ALLOWED, assertTransition(), PrismaRunAdapter, RunLogRow, RunRow (+7 more)

### Community 63 - "ChatParamsDto"
Cohesion: 0.17
Nodes (12): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, IsStringOrArrayOfStrings, Max (+4 more)

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.29
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 65 - "openai-chat-completions.controller.ts"
Cohesion: 0.18
Nodes (10): ApiBody, ApiOpenAiErrorResponses, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, Body, Post (+2 more)

### Community 66 - "openai-models.controller.ts"
Cohesion: 0.17
Nodes (13): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOpenAiErrorResponses, ApiOperation, ApiParam, ApiRequestIdHeader, ApiSecurity (+5 more)

### Community 67 - "prisma-company-context.adapter.ts"
Cohesion: 0.17
Nodes (12): RunBrief, toOutcome(), SOCIAL_RESULT_STORE, SocialResultStore, PipelinePhase, PipelineState, SocialContent, SocialIdea (+4 more)

### Community 68 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.09
Nodes (20): ChatModule, Module, AnthropicModule, Module, AnthropicMessagesController, AnthropicAuth, ApiSecurity, ApiTags (+12 more)

### Community 69 - "anthropic-messages.controller.ts"
Cohesion: 0.14
Nodes (13): toChatResponseDtoFromCache(), CHAT_STREAM_API_DESCRIPTION, SseSerializer, ApiGatewayChatErrorResponses(), ApiGatewayModelsErrorResponses(), ApiRequestIdHeader(), GatewayKeyAndSmartRateLimit(), ErrorEnvelopeDto (+5 more)

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
Cohesion: 0.09
Nodes (15): AppMetricsModule, Global, Module, Inject, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse (+7 more)

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
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 81 - "openai-stream.mapper.ts"
Cohesion: 0.17
Nodes (21): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional (+13 more)

### Community 82 - "health-readiness-response.dto.ts"
Cohesion: 0.24
Nodes (8): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, WizardState, Injectable, WizardOrchestratorService, Injectable, WizardStateManager

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
Cohesion: 0.28
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 87 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 88 - "AppMetricsBackend"
Cohesion: 0.18
Nodes (6): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), SEMANTIC_SCHEMA_TAG_FIELDS

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
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

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
Cohesion: 0.21
Nodes (5): ChatProviderCallService, Injectable, GatewayModelConfig, ProviderRegistryService, Injectable

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
Cohesion: 0.23
Nodes (8): assertEnabledProviderSecretsPresent(), configurationValidation, ConfigurationValidationService, validate(), ValidatedEnvironment, assertEnabledProviderApiKeysPresent(), formatMissingProviderApiKeyError(), RawGatewayConfig

### Community 117 - "HealthController"
Cohesion: 0.13
Nodes (15): HealthModule, Module, LoggingModule, Global, Module, ObservabilityModule, Global, Module (+7 more)

### Community 118 - ".createMessage"
Cohesion: 0.17
Nodes (11): ApiHeader, ApiAnthropicErrorResponses, ApiBody, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, Body (+3 more)

### Community 120 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

### Community 121 - "ConsoleLoggerAdapter"
Cohesion: 0.33
Nodes (3): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable

### Community 122 - "server-prompt.service.ts"
Cohesion: 0.20
Nodes (10): BasicServerAnswers, CacheAnswers, MetricsAnswers, RateLimitAnswers, RedisAnswers, SentryAnswers, ServerConfigPromptResult, ServerPromptService (+2 more)

### Community 123 - "start-run.use-case.ts"
Cohesion: 0.17
Nodes (13): parseWithZod(), hitlSelectedIdeaIdsSchema, ParsedHitlSelectedIdeaIds, ParsedRunBrief, ParsedRunId, ParsedStartRunCommand, runBriefSchema, runIdSchema (+5 more)

### Community 124 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 125 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 127 - "ConfigShowCommand"
Cohesion: 0.33
Nodes (4): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader()

### Community 128 - "ModelListCommand"
Cohesion: 0.39
Nodes (6): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, GatewayParamsConfig

### Community 129 - "config-validator.ts"
Cohesion: 0.07
Nodes (48): isRedisSearchTagSafeId(), PendingSecretsItem, collectPendingSecrets(), ProviderTestCommand, Command, Option, DEFAULT_MODELS, InitAnswers (+40 more)

### Community 130 - "GlobalExceptionFilter"
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 131 - "config-validator.ts"
Cohesion: 0.48
Nodes (6): collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, buildEffectiveGatewayConfig(), assertMasterKeyPresent()

### Community 133 - "provider-base-url.validation.ts"
Cohesion: 0.43
Nodes (6): assertEnabledProviderBaseUrlPresent(), collectMissingBaseUrlErrors(), formatMissingBaseUrlError(), MissingProviderBaseUrl, RawGatewayConfig, resolveBaseUrlFromEnv()

### Community 135 - "rate-limit.module.ts"
Cohesion: 0.33
Nodes (4): RATE_LIMIT_MODULE_OPTIONS, RateLimitModule, RateLimitModuleOptions, Module

### Community 136 - ".constructor"
Cohesion: 0.40
Nodes (4): SocialPipelineFacade, Inject, Injectable, CompiledSocialGraph

## Knowledge Gaps
- **429 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `SemanticIndexNameOptions`, `ParsedKnnHits` (+424 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `RunRecord` connect `RunRepository` to `prisma-company-context.adapter.ts`, `start-run.use-case.ts`, `runs.module.ts`, `prisma-run.adapter.ts`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Why does `asClientId()` connect `wizard-orchestrator.service.ts` to `chat.module.ts`, `cli.module.ts`, `config-validator.ts`, `openai-chat-completions.controller.ts`, `.info`, `anthropic-messages.controller.ts`, `chat-completions.adapter.ts`, `ChatRequestDto`, `openai-stream.mapper.ts`, `types/index.ts`, `HttpMethod`, `.createMessage`, `chat-provider-call.service.ts`, `GatewayKey`, `KeyGenerateCommand`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `StartRunUseCase` connect `runs.module.ts` to `RunRepository`, `start-run.use-case.ts`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _429 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05054211843202669 - nodes in this community are weakly interconnected._
- **Should `EnvRef` be split into smaller, more focused modules?**
  _Cohesion score 0.08943089430894309 - nodes in this community are weakly interconnected._
- **Should `configuration-validation.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13405797101449277 - nodes in this community are weakly interconnected._
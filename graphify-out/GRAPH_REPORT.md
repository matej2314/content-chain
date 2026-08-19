# Graph Report - content-chain  (2026-08-19)

## Corpus Check
- 403 files · ~105,259 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2894 nodes · 8149 edges · 135 communities (129 shown, 6 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 285 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e4e986b7`
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
- CompanyContextController
- http/express.d.ts
- should-include-redis-stack.ts
- MetricsController
- filters/http-exception.filter.ts
- start-run.use-case.ts
- ModelRemoveCommand
- branded.types.ts
- social.schemas.ts
- ConfigShowCommand
- ModelListCommand
- config-validator.ts
- EnvironmentVariables
- conversation-id.ts
- GatewayCommand
- refine-policy.ts
- openai-chat-completion-request.dto.ts

## God Nodes (most connected - your core abstractions)
1. `ProviderInstanceId` - 79 edges
2. `ModelAlias` - 77 edges
3. `asProviderInstanceId()` - 69 edges
4. `GatewayConfig` - 65 edges
5. `LoggingService` - 60 edges
6. `GatewayKey` - 53 edges
7. `ChatRequestDto` - 49 edges
8. `exitWithAgentReport()` - 43 edges
9. `CliLogger` - 43 edges
10. `ClientId` - 43 edges

## Surprising Connections (you probably didn't know these)
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `ResponseCacheService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/response-cache.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `HealthRedisCheckResult` --references--> `RedisConsumer`  [EXTRACTED]
  apps/ai-provider-gateway/src/health/health.service.ts → apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts

## Import Cycles
- 4-file cycle: `apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts -> apps/ai-provider-gateway/src/config/typed-config.ts -> apps/ai-provider-gateway/src/config/app-configuration.types.ts -> apps/ai-provider-gateway/src/config/configuration.ts -> apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts`

## Communities (135 total, 6 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.13
Nodes (31): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+23 more)

### Community 1 - "EnvRef"
Cohesion: 0.12
Nodes (19): collectPendingSecrets(), ConfigSecretsStatusCommand, Command, Option, EnvPatchService, EnvPatchValue, Injectable, validateProviderApiKey() (+11 more)

### Community 2 - "configuration-validation.service.ts"
Cohesion: 0.15
Nodes (9): assertEnabledProviderSecretsPresent(), configurationValidation, ConfigurationValidationService, CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment, RawGatewayConfig, assertEnabledProviderBaseUrlPresent() (+1 more)

### Community 3 - "GatewayConfig"
Cohesion: 0.08
Nodes (16): ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, ProviderManagerService, Injectable, AddProviderInput (+8 more)

### Community 4 - ".info"
Cohesion: 0.10
Nodes (15): toSafeConfigSnapshot(), toSafeModelList(), ProviderTestCommand, Command, Option, CliAiProvider, ProviderTestService, Injectable (+7 more)

### Community 5 - "chat.service.ts"
Cohesion: 0.10
Nodes (22): clamp(), isOverrideKey(), resolveProviderCallOptions(), getResolvedSystemPrompts(), SYSTEM_PROMPT_SECTION_JOINER, isToolingRequest(), ChatValidationService, Injectable (+14 more)

### Community 6 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 7 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (27): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+19 more)

### Community 8 - "ProviderInstanceId"
Cohesion: 0.13
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, AppMetricsService, Injectable, AppTokenUsage

### Community 9 - "chat-response.dto.ts"
Cohesion: 0.12
Nodes (33): CachedChatResponseSchema, ChatWarningSchema, parseCachedChatResponse(), CachedChatResponse, CachedChatResponseWithConversation, ChatResponseData, toChatResponseDto(), ChatWarningDto (+25 more)

### Community 10 - "HealthService"
Cohesion: 0.17
Nodes (6): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, ApiProperty, HealthService, Injectable

### Community 11 - "wizard-orchestrator.service.ts"
Cohesion: 0.07
Nodes (54): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+46 more)

### Community 12 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (19): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+11 more)

### Community 13 - "ids.ts"
Cohesion: 0.06
Nodes (31): Brand, UnBrand, CONTENT_LANGUAGES, ContentLanguage, RUN_STATUSES, RUN_TASK_TYPES, RunStatus, RunTaskType (+23 more)

### Community 14 - "app-metrics-backend.interface.ts"
Cohesion: 0.19
Nodes (10): healthStatusToGaugeValue(), AppProviderCallContext, AppProviderStreamScope, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+2 more)

### Community 15 - "ChatRequestDto"
Cohesion: 0.12
Nodes (21): ResponseCacheService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+13 more)

### Community 16 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (38): toHttpException(), asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort() (+30 more)

### Community 17 - "HttpMethod"
Cohesion: 0.22
Nodes (3): HttpMetricsMiddleware, Injectable, HttpMethod

### Community 18 - "types/index.ts"
Cohesion: 0.17
Nodes (23): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+15 more)

### Community 19 - "ai-provider.interface.ts"
Cohesion: 0.13
Nodes (16): CompleteOnceResult, ModelId, PromptCacheCreationTokens, PromptCacheHitTokens, AIProvider, AssistantChatMessage, ProviderAssistantTurn, ProviderChatTurn (+8 more)

### Community 20 - "LoggingService"
Cohesion: 0.07
Nodes (21): RedisConnectionService, Injectable, Inject, isRedisRequiredFromConfig(), isCachedChatAllowedForModelAlias(), ChatCacheGuardService, Injectable, ChatErrorHandlerService (+13 more)

### Community 21 - "api/src/app.module.ts"
Cohesion: 0.09
Nodes (22): AppModule, Module, AuthController, Controller, AuthModule, Module, CompanyContextModule, Module (+14 more)

### Community 22 - "config-generator.service.ts"
Cohesion: 0.14
Nodes (12): ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, ClientCli, EnvTemplateInput, generateEnvTemplate() (+4 more)

### Community 23 - "api-error.code.ts"
Cohesion: 0.11
Nodes (21): ChatModule, Module, ApiErrorCode, resolveClientIdFromKey(), getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId() (+13 more)

### Community 24 - "resilient-executor.ts"
Cohesion: 0.16
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 25 - "provider-error.mapper.ts"
Cohesion: 0.19
Nodes (20): ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 26 - "GatewayKey"
Cohesion: 0.13
Nodes (10): isProviderRateLimitError(), readClientGatewayKey(), readGatewayKeyHeader(), requireClientGatewayKey(), GatewayKey, ResolvedGatewayClient, SmartRateLimitGuard, Injectable (+2 more)

### Community 27 - "PrometheusAppMetricsAdapter"
Cohesion: 0.14
Nodes (3): PrometheusAppMetricsAdapter, Injectable, AppRequestLabels

### Community 28 - "agent-answers.schema.ts"
Cohesion: 0.12
Nodes (20): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+12 more)

### Community 29 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 30 - "RunsController"
Cohesion: 0.12
Nodes (14): GetRunUseCase, Inject, Injectable, isTerminalStatus(), RunsController, ApiTags, Body, Controller (+6 more)

### Community 31 - "LogContext"
Cohesion: 0.06
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 32 - "chat.module.ts"
Cohesion: 0.06
Nodes (33): ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body, Controller (+25 more)

### Community 33 - "company-context.module.ts"
Cohesion: 0.17
Nodes (15): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Injectable (+7 more)

### Community 34 - "configuration.ts"
Cohesion: 0.11
Nodes (17): CACHE_BACKEND_TYPE, AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, BuildEffectiveGatewayConfigOptions, readRequiredPrompt(), stripHtmlComments() (+9 more)

### Community 35 - "swagger.setup.ts"
Cohesion: 0.12
Nodes (17): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+9 more)

### Community 36 - "llm-gateway.http.adapter.ts"
Cohesion: 0.05
Nodes (36): LlmGatewayError, GatewayChatResponse, GatewayErrorBody, LlmGatewayHttpAdapter, RETRYABLE_CODES, Inject, Injectable, LlmGatewayPort (+28 more)

### Community 37 - "provider-instances.bootstrap.ts"
Cohesion: 0.21
Nodes (13): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryContext, ProviderFactoryFn (+5 more)

### Community 38 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 39 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 40 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 41 - "chat-completions.adapter.ts"
Cohesion: 0.19
Nodes (16): asSystemFingerprint(), ChatCompletionsAdapterOptions, textStream(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText(), finalizeOpenAiStreamToolCalls(), OpenAiStreamToolCallAccumulator, ChatCompletionMessageToolCall (+8 more)

### Community 42 - "Runs / Social"
Cohesion: 0.05
Nodes (40): Auth, Błędy gateway → run Content Chain, Company context, Dokumentacja komunikacji — Content Chain, Envelope błędu, Feedback (opinie tekstowe), `GET /api/v1/auth/bootstrap-status`, `GET /api/v1/auth/me` (+32 more)

### Community 43 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 44 - "runs.module.ts"
Cohesion: 0.14
Nodes (20): Inject, ListRunsUseCase, Injectable, RecoverInterruptedRunsUseCase, Inject, Injectable, RunLifecycleService, TransitionExtras (+12 more)

### Community 45 - "ChatMessageDto"
Cohesion: 0.09
Nodes (27): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+19 more)

### Community 46 - "google-tools.mapper.ts"
Cohesion: 0.13
Nodes (24): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+16 more)

### Community 47 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 48 - ".getOne"
Cohesion: 0.19
Nodes (10): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 49 - ".getOne"
Cohesion: 0.19
Nodes (10): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 50 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 51 - "responses.adapter.ts"
Cohesion: 0.23
Nodes (14): asToolCallId(), buildResponsesCreateParams(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse(), extractResponsesOutputItemToolCall() (+6 more)

### Community 52 - "asProviderInstanceId"
Cohesion: 0.08
Nodes (52): PendingSecretsItem, assertInteractiveAllowed(), DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel() (+44 more)

### Community 53 - "ClientId"
Cohesion: 0.27
Nodes (7): StreamOnceParams, SseEvent, ClientId, Express, Request, ActiveStreamsTracker, Injectable

### Community 54 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 55 - "chat-provider-call.service.ts"
Cohesion: 0.19
Nodes (19): buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns(), composeSystemPrompt() (+11 more)

### Community 56 - "RunRepository"
Cohesion: 0.08
Nodes (10): InProcessRunWorker, Injectable, Inject, Inject, Inject, Inject, isRetryable(), RetryReason (+2 more)

### Community 57 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 58 - "CompanyContext"
Cohesion: 0.19
Nodes (7): Inject, Inject, Inject, CompanyContextRepository, CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 59 - "KeyGenerateCommand"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 60 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 61 - "models.controller.ts"
Cohesion: 0.24
Nodes (9): ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto (+1 more)

### Community 62 - "prisma-run.adapter.ts"
Cohesion: 0.08
Nodes (14): ListRunsResult, RunSnapshot, ALLOWED, assertTransition(), PrismaRunAdapter, RunLogRow, RunRow, Injectable (+6 more)

### Community 63 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.28
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 65 - "openai-chat-completions.controller.ts"
Cohesion: 0.11
Nodes (20): asRequestId(), OpenAiChatCompletionsController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags (+12 more)

### Community 66 - "openai-models.controller.ts"
Cohesion: 0.27
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 67 - "prisma-company-context.adapter.ts"
Cohesion: 0.19
Nodes (13): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextExtras, Completeness, CtaItem, emptyCompanyContext() (+5 more)

### Community 68 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.08
Nodes (25): HealthModule, Module, IntegrationsModule, Module, LoggingModule, Global, Module, AiMetricsModule (+17 more)

### Community 69 - "anthropic-messages.controller.ts"
Cohesion: 0.10
Nodes (17): ApiHeader, AnthropicMessagesController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags (+9 more)

### Community 70 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 71 - "ProviderAddCommand"
Cohesion: 0.10
Nodes (9): ProviderAddCommand, Command, Option, ProviderEditCommand, Command, Option, ProviderRemoveCommand, Command (+1 more)

### Community 72 - "HttpExceptionFilter"
Cohesion: 0.15
Nodes (8): ErrorEnvelope, HttpExceptionFilter, Catch, newConversationId(), newRequestId(), newRunId(), RequestIdMiddleware, Injectable

### Community 73 - "app-metrics.service.ts"
Cohesion: 0.25
Nodes (6): HealthCheckResult, HealthRedisCheckResult, APP_METRICS_BACKEND, PreMetricsScrapeHook, PreMetricsScrapeRegistry, Injectable

### Community 74 - "Architektura katalogów i plików — Content Chain"
Cohesion: 0.11
Nodes (17): `apps/ai-provider-gateway`, `apps/api` — bounded contexty (~1 poziom w głąb), `apps/api/src/health/`, `metrics/`, `llm/`, `apps/api/src/shared/`, `apps/frontend`, Architektura katalogów i plików — Content Chain, Auth i Company Context, Drzewo docelowe (szkielet) (+9 more)

### Community 75 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 76 - "ModelEditCommand"
Cohesion: 0.33
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
Cohesion: 0.18
Nodes (20): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+12 more)

### Community 82 - "health-readiness-response.dto.ts"
Cohesion: 0.33
Nodes (8): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional

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
Cohesion: 0.21
Nodes (9): SOCIAL_RESULT_STORE, SocialResultStore, PipelinePhase, PipelineState, SocialContent, SocialIdea, SocialPipelineInput, SocialPipelineOutcome (+1 more)

### Community 87 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

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
Cohesion: 0.06
Nodes (28): GetRunLogsUseCase, Inject, Injectable, ResumeHitlUseCase, Injectable, StartRunUseCase, Injectable, RunSseEvent (+20 more)

### Community 114 - "Dokumentacja Content Chain"
Cohesion: 0.29
Nodes (6): Dokumentacja Content Chain, Jak czytać (kolejność), Mapa: temat → plik, Run SM (uproszczenie), Schematy (skrót), System

### Community 115 - "SPEC — README"
Cohesion: 0.29
Nodes (6): Docs vs SPEC, Jak czytać, Mapa obszar → plik, SPEC — README, Terminologia faz (skrót), Źródła

### Community 117 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 118 - "CompanyContextController"
Cohesion: 0.20
Nodes (8): CompanyContextController, ApiOkResponse, ApiTags, Body, Controller, Get, Patch, Put

### Community 120 - "should-include-redis-stack.ts"
Cohesion: 0.38
Nodes (9): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis(), shouldIncludeRedisStack() (+1 more)

### Community 121 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 122 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 123 - "start-run.use-case.ts"
Cohesion: 0.18
Nodes (14): parseWithZod(), hitlSelectedIdeaIdsSchema, ParsedHitlSelectedIdeaIds, ParsedRunBrief, ParsedRunId, ParsedStartRunCommand, runBriefSchema, runIdSchema (+6 more)

### Community 124 - "ModelRemoveCommand"
Cohesion: 0.33
Nodes (3): ModelRemoveCommand, Command, Option

### Community 125 - "branded.types.ts"
Cohesion: 0.20
Nodes (6): asConversationId(), asSchemaVersion(), Brand, JsonSchemaName, ThinkingBudgetTokens, WarningCode

### Community 126 - "social.schemas.ts"
Cohesion: 0.25
Nodes (7): ContentOutput, contentOutputSchema, IdeasOutput, ideasOutputSchema, socialIdeaSchema, VerifierOutput, verifierOutputSchema

### Community 127 - "ConfigShowCommand"
Cohesion: 0.40
Nodes (3): ConfigShowCommand, Command, Option

### Community 128 - "ModelListCommand"
Cohesion: 0.40
Nodes (3): ModelListCommand, Command, Option

### Community 129 - "config-validator.ts"
Cohesion: 0.23
Nodes (11): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, buildEffectiveGatewayConfig(), loadGatewayConfigFromFile() (+3 more)

### Community 130 - "EnvironmentVariables"
Cohesion: 0.20
Nodes (10): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Min (+2 more)

### Community 131 - "conversation-id.ts"
Cohesion: 1.00
Nodes (3): getClientConversationId(), getOrCreateConversationIdForResponse(), createConversationId()

### Community 133 - "refine-policy.ts"
Cohesion: 0.67
Nodes (3): canRefine(), MAX_REFINE, nextRefineCount()

## Knowledge Gaps
- **446 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `CachedChatResponseSchema`, `RedisRequirementSnapshot`, `CachedChatResponseWithConversation` (+441 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `asClientId()` connect `wizard-orchestrator.service.ts` to `chat.module.ts`, `cli.module.ts`, `openai-chat-completions.controller.ts`, `GatewayConfig`, `.info`, `anthropic-messages.controller.ts`, `app-metrics.service.ts`, `api-error.code.ts`, `ClientId`, `chat-provider-call.service.ts`, `GatewayKey`, `KeyGenerateCommand`, `branded.types.ts`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `swagger.setup.ts`, `chat.service.ts`, `filters/http-exception.filter.ts`, `provider-instances.bootstrap.ts`, `app-metrics.service.ts`, `HealthService`, `ai-provider-gateway/src/main.ts`, `response-cache.service.ts`, `chat-completions.adapter.ts`, `google-tools.mapper.ts`, `ChatRequestDto`, `anthropic/anthropic-tools.mapper.ts`, `responses.adapter.ts`, `resilient-executor.ts`, `GatewayKey`, `LogContext`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `asProviderInstanceId` to `cli.module.ts`, `EnvRef`, `GatewayConfig`, `.info`, `chat.service.ts`, `chat-response.dto.ts`, `wizard-orchestrator.service.ts`, `response-cache.service.ts`, `ChatRequestDto`, `types/index.ts`, `LoggingService`, `GatewayKey`, `chat.module.ts`, `configuration.ts`, `provider-instances.bootstrap.ts`, `ClientId`, `chat-provider-call.service.ts`, `models.controller.ts`, `GatewayModelsCatalogService`, `branded.types.ts`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `CachedChatResponseSchema` to the rest of the system?**
  _446 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12884483937115515 - nodes in this community are weakly interconnected._
- **Should `EnvRef` be split into smaller, more focused modules?**
  _Cohesion score 0.11904761904761904 - nodes in this community are weakly interconnected._
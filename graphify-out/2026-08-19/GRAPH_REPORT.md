# Graph Report - content-chain  (2026-08-18)

## Corpus Check
- 398 files · ~103,309 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2844 nodes · 8027 edges · 139 communities (134 shown, 5 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 61 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d44e11aa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 63
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74
- Community 75
- Community 76
- Community 77
- Community 78
- Community 79
- Community 80
- Community 81
- Community 82
- Community 83
- Community 84
- Community 85
- Community 86
- Community 87
- Community 88
- Community 89
- Community 90
- Community 91
- Community 92
- Community 93
- Community 94
- Community 95
- UX Dashboard — Content Chain
- SPEC — Feedback (opinie tekstowe)
- SPEC — Kontekst firmy
- SPEC — Persistence
- SPEC — Runy / logi
- models.controller.ts
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
- InMemoryRunSseHub
- Dokumentacja Content Chain
- SPEC — README
- ResponseFormatDto
- .getLiveness
- SseMetaPayloadDto
- express.d.ts
- should-include-redis-stack.ts
- SmartRateLimitGuard
- api-error.code.ts
- run.schemas.ts
- ModelRemoveCommand
- ProviderEditCommand
- ProviderRemoveCommand
- ConsoleLoggerAdapter
- ProviderRegistryService
- config-validator.ts
- EnvironmentVariables
- PinoLoggerAdapter
- provider-base-url.validation.ts
- rate-limit.module.ts
- auth.module.ts
- InMemoryRunSseHub
- social.module.ts
- gateway-key.guard.branded-types.test-d.ts
- llm.module.ts

## God Nodes (most connected - your core abstractions)
1. `ProviderInstanceId` - 79 edges
2. `ModelAlias` - 77 edges
3. `asProviderInstanceId()` - 69 edges
4. `GatewayConfig` - 65 edges
5. `LoggingService` - 61 edges
6. `GatewayKey` - 53 edges
7. `ChatRequestDto` - 49 edges
8. `exitWithAgentReport()` - 43 edges
9. `CliLogger` - 43 edges
10. `ClientId` - 43 edges

## Surprising Connections (you probably didn't know these)
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `AnthropicAuth()` --indirect_call--> `SmartRateLimitGuard`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/decorators/anthropic-auth.decorator.ts → apps/ai-provider-gateway/src/guards/smart-rate-limit-guard.ts
- `OpenAiAuth()` --indirect_call--> `SmartRateLimitGuard`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/decorators/openai-auth.decorator.ts → apps/ai-provider-gateway/src/guards/smart-rate-limit-guard.ts
- `bootstrap()` --indirect_call--> `LoggingService`  [INFERRED]
  apps/ai-provider-gateway/src/main.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `bootstrap()` --indirect_call--> `AppModule`  [INFERRED]
  apps/ai-provider-gateway/src/main.ts → apps/ai-provider-gateway/src/app.module.ts

## Import Cycles
- 4-file cycle: `apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts -> apps/ai-provider-gateway/src/config/typed-config.ts -> apps/ai-provider-gateway/src/config/app-configuration.types.ts -> apps/ai-provider-gateway/src/config/configuration.ts -> apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts`

## Communities (139 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (54): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), CliModule (+46 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (38): collectPendingSecrets(), InitAnswers, convertProvider(), ClientPromptService, Injectable, KeyPromptService, Injectable, ProviderPromptResult (+30 more)

### Community 2 - "Community 2"
Cohesion: 0.16
Nodes (8): assertEnabledProviderSecretsPresent(), configurationValidation, ConfigurationValidationService, validateEnvironment(), CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment, RawGatewayConfig

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (23): ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, EnvPatchValue, Injectable (+15 more)

### Community 4 - "Community 4"
Cohesion: 0.22
Nodes (8): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList()

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (13): ConfigValidateCommand, Command, Option, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, CliGatewayValidatorService, Injectable (+5 more)

### Community 6 - "Community 6"
Cohesion: 0.13
Nodes (25): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+17 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (20): applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext(), clearRequestMetadataContext(), SentryAiMetricsAdapter (+12 more)

### Community 8 - "Community 8"
Cohesion: 0.10
Nodes (16): SseMetaPayload, ChatExecutionContext, ProviderCallContext, RateLimitCheckResult, ProviderTestOptions, CliAiModel, CostUsd, ModelAlias (+8 more)

### Community 9 - "Community 9"
Cohesion: 0.14
Nodes (30): CachedChatResponse, CachedChatResponseWithConversation, ChatResponseData, mapStopReasonToFinishReason(), StreamOnceResult, ChatResponseBuilderService, ProviderResponse, Injectable (+22 more)

### Community 10 - "Community 10"
Cohesion: 0.15
Nodes (8): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthController, ApiTags, Controller, HealthService, Injectable

### Community 11 - "Community 11"
Cohesion: 0.09
Nodes (44): CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient(), convertRateLimit(), GatewayClientSchema, parseWizardState(), WizardStateSchema (+36 more)

### Community 12 - "Community 12"
Cohesion: 0.10
Nodes (17): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+9 more)

### Community 13 - "Community 13"
Cohesion: 0.08
Nodes (26): Brand, UnBrand, ContentLanguage, RunStatus, RunTaskType, SocialPlatform, UserRole, CONV_ID_RE (+18 more)

### Community 14 - "Community 14"
Cohesion: 0.12
Nodes (12): NoopAppMetricsAdapter, Injectable, healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot (+4 more)

### Community 15 - "Community 15"
Cohesion: 0.07
Nodes (38): ResponseCacheService, Injectable, CachedChatResponseSchema, ChatWarningSchema, parseCachedChatResponse(), ChatService, Injectable, ChatRequestDto (+30 more)

### Community 16 - "Community 16"
Cohesion: 0.09
Nodes (27): asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic() (+19 more)

### Community 17 - "Community 17"
Cohesion: 0.13
Nodes (6): HttpMetricsMiddleware, Injectable, Inject, Optional, AppMetricsService, Injectable

### Community 18 - "Community 18"
Cohesion: 0.40
Nodes (3): ConfigSecretsStatusCommand, Command, Option

### Community 19 - "Community 19"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 20 - "Community 20"
Cohesion: 0.12
Nodes (10): RedisConnectionService, Injectable, Inject, LogContext, LoggingService, Injectable, createAnthropicProvider(), createGoogleProvider() (+2 more)

### Community 21 - "Community 21"
Cohesion: 0.11
Nodes (19): AppModule, Module, CompanyContextModule, Module, Inject, bootstrap(), RunsModule, Module (+11 more)

### Community 22 - "Community 22"
Cohesion: 0.15
Nodes (10): ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, EnvTemplateInput, generateEnvTemplate(), isEnvInputRedisRequired() (+2 more)

### Community 23 - "Community 23"
Cohesion: 0.15
Nodes (13): ChatModule, Module, AnthropicModule, Module, AnthropicAuth(), AnthropicExceptionFilter, Catch, AnthropicApiKeyGuard (+5 more)

### Community 24 - "Community 24"
Cohesion: 0.10
Nodes (28): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+20 more)

### Community 25 - "Community 25"
Cohesion: 0.23
Nodes (18): ChatErrorHandlerService, Injectable, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus() (+10 more)

### Community 26 - "Community 26"
Cohesion: 0.11
Nodes (15): StreamCleanupInterceptor, Injectable, GatewayKey, AnthropicMessagesController, AnthropicAuth, ApiSecurity, ApiTags, Controller (+7 more)

### Community 27 - "Community 27"
Cohesion: 0.12
Nodes (5): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 28 - "Community 28"
Cohesion: 0.08
Nodes (12): GetRunLogsUseCase, Inject, Injectable, GetRunUseCase, Inject, Injectable, Inject, StartRunUseCase (+4 more)

### Community 29 - "Community 29"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 30 - "Community 30"
Cohesion: 0.17
Nodes (10): RunsController, ApiTags, Body, Controller, Get, Param, Post, HttpCode (+2 more)

### Community 31 - "Community 31"
Cohesion: 0.09
Nodes (16): NoopErrorReportingAdapter, Injectable, LEVEL_RANK, SentryErrorReportingAdapter, Injectable, parseLogLevel(), ErrorReportingBackend, LoggerBackend (+8 more)

### Community 32 - "Community 32"
Cohesion: 0.09
Nodes (22): ChatController, ApiBody, ApiGatewayChatErrorResponses, ApiOperation, ApiRequestIdHeader, ApiResponse, ApiSecurity, ApiTags (+14 more)

### Community 33 - "Community 33"
Cohesion: 0.05
Nodes (62): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject (+54 more)

### Community 34 - "Community 34"
Cohesion: 0.14
Nodes (18): CACHE_BACKEND_TYPE, AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, BuildEffectiveGatewayConfigOptions, readRequiredPrompt(), stripHtmlComments() (+10 more)

### Community 35 - "Community 35"
Cohesion: 0.13
Nodes (18): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, ChatWarningDto, ApiProperty (+10 more)

### Community 36 - "Community 36"
Cohesion: 0.11
Nodes (17): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, MetricsController, Controller, Get, Res (+9 more)

### Community 37 - "Community 37"
Cohesion: 0.22
Nodes (12): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, createChatCompletionsAdapter() (+4 more)

### Community 38 - "Community 38"
Cohesion: 0.23
Nodes (11): readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), asGatewayKey(), ResolvedGatewayClient, getAppConfig(), enrichRequestWithClientId(), readAnthropicApiKey() (+3 more)

### Community 39 - "Community 39"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 40 - "Community 40"
Cohesion: 0.12
Nodes (19): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 41 - "Community 41"
Cohesion: 0.11
Nodes (16): ChatStreamController, ApiBody, ApiGatewayChatErrorResponses, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, ApiSecurity (+8 more)

### Community 42 - "Community 42"
Cohesion: 0.05
Nodes (40): Auth, Błędy gateway → run Content Chain, Company context, Dokumentacja komunikacji — Content Chain, Envelope błędu, Feedback (opinie tekstowe), `GET /api/v1/auth/bootstrap-status`, `GET /api/v1/auth/me` (+32 more)

### Community 43 - "Community 43"
Cohesion: 0.10
Nodes (21): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+13 more)

### Community 44 - "Community 44"
Cohesion: 0.14
Nodes (17): Inject, RecoverInterruptedRunsUseCase, Inject, Injectable, RunLifecycleService, TransitionExtras, Inject, Injectable (+9 more)

### Community 45 - "Community 45"
Cohesion: 0.12
Nodes (20): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+12 more)

### Community 46 - "Community 46"
Cohesion: 0.06
Nodes (59): mapProviderResponseToAiObservation(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), buildGenerationConfig(), mapStopSequences() (+51 more)

### Community 47 - "Community 47"
Cohesion: 0.17
Nodes (13): ApiGatewayModelsErrorResponses, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiRequestIdHeader, ApiSecurity (+5 more)

### Community 48 - "Community 48"
Cohesion: 0.17
Nodes (13): AnthropicModelsController, AnthropicAuth, ApiAnthropicErrorResponses, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiRequestIdHeader (+5 more)

### Community 49 - "Community 49"
Cohesion: 0.17
Nodes (13): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOpenAiErrorResponses, ApiOperation, ApiParam, ApiRequestIdHeader, ApiSecurity (+5 more)

### Community 50 - "Community 50"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 51 - "Community 51"
Cohesion: 0.14
Nodes (14): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+6 more)

### Community 52 - "Community 52"
Cohesion: 0.11
Nodes (30): PendingSecretsItem, assertInteractiveAllowed(), DEFAULT_MODELS, convertModel(), CliAiProvider, defaultModelPolicy(), ModelEditField, ModelManagerService (+22 more)

### Community 53 - "Community 53"
Cohesion: 0.16
Nodes (6): ClientId, Express, Request, ActiveStreamsTracker, Injectable, RateLimitReason

### Community 54 - "Community 54"
Cohesion: 0.13
Nodes (23): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+15 more)

### Community 55 - "Community 55"
Cohesion: 0.14
Nodes (23): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns() (+15 more)

### Community 56 - "Community 56"
Cohesion: 0.15
Nodes (7): InProcessRunWorker, Injectable, ResumeHitlUseCase, Inject, Injectable, isRetryable(), RetryReason

### Community 57 - "Community 57"
Cohesion: 0.21
Nodes (8): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsStringOrArrayOfStrings(), IsThinkingBudget()

### Community 58 - "Community 58"
Cohesion: 0.15
Nodes (14): LlmGatewayError, GatewayChatResponse, GatewayErrorBody, LlmGatewayHttpAdapter, RETRYABLE_CODES, Injectable, LlmGatewayPort, LlmChatCommand (+6 more)

### Community 59 - "Community 59"
Cohesion: 0.39
Nodes (3): KeyGenerateCommand, Command, Option

### Community 60 - "Community 60"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 61 - "Community 61"
Cohesion: 0.21
Nodes (11): ApiGatewayChatErrorResponses(), ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty (+3 more)

### Community 62 - "Community 62"
Cohesion: 0.09
Nodes (12): ListRunsResult, RunSnapshot, RunLogEntry, ALLOWED, assertTransition(), PrismaRunAdapter, RunLogRow, RunRow (+4 more)

### Community 63 - "Community 63"
Cohesion: 0.17
Nodes (12): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, IsStringOrArrayOfStrings, Max (+4 more)

### Community 64 - "Community 64"
Cohesion: 0.29
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 65 - "Community 65"
Cohesion: 0.18
Nodes (10): ApiBody, ApiOpenAiErrorResponses, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, Body, Post (+2 more)

### Community 66 - "Community 66"
Cohesion: 0.28
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 67 - "Community 67"
Cohesion: 0.20
Nodes (9): AiMetricsModule, Global, Module, AppMetricsModule, Global, Module, ObservabilityModule, Global (+1 more)

### Community 68 - "Community 68"
Cohesion: 0.09
Nodes (20): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable, RequestIdMiddleware, Injectable, HealthModule, Module (+12 more)

### Community 69 - "Community 69"
Cohesion: 0.17
Nodes (11): ApiHeader, ApiAnthropicErrorResponses, ApiBody, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, Body (+3 more)

### Community 70 - "Community 70"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 71 - "Community 71"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 72 - "Community 72"
Cohesion: 0.18
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 73 - "Community 73"
Cohesion: 0.13
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

### Community 74 - "Community 74"
Cohesion: 0.11
Nodes (17): `apps/ai-provider-gateway`, `apps/api` — bounded contexty (~1 poziom w głąb), `apps/api/src/health/`, `metrics/`, `llm/`, `apps/api/src/shared/`, `apps/frontend`, Architektura katalogów i plików — Content Chain, Auth i Company Context, Drzewo docelowe (szkielet) (+9 more)

### Community 75 - "Community 75"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 76 - "Community 76"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 77 - "Community 77"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 78 - "Community 78"
Cohesion: 0.12
Nodes (16): Architektura — Content Chain, Async run i HITL, Auth, Bounded contexty w `apps/api`, Decyzje architektoniczne (skrót), Dziedziczenie i wyjątki, Frontend (`apps/frontend`), Gateway (`apps/ai-provider-gateway`) (+8 more)

### Community 79 - "Community 79"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs, Poza zakresem, Role i uprawnienia (norma), Sesja (cookie-only) (+5 more)

### Community 80 - "Community 80"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 81 - "Community 81"
Cohesion: 0.17
Nodes (20): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional (+12 more)

### Community 82 - "Community 82"
Cohesion: 0.24
Nodes (11): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+3 more)

### Community 83 - "Community 83"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Korelacja ID (norma kodu), Kryteria akceptacji, Nie wolno, Norma implementacji, Powierzchnie (skrót), Powiązanie ze stylem z docs, Poza zakresem (+5 more)

### Community 84 - "Community 84"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 85 - "Community 85"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 86 - "Community 86"
Cohesion: 0.24
Nodes (13): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, buildDefaultModelCapabilities(), buildDefaultModelPolicy(), getMaxOutputTokensBound(), SAMPLING_OVERRIDE_KEYS (+5 more)

### Community 87 - "Community 87"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 89 - "Community 89"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Fazy invoke (model B), Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs / wyjątek, Poza zakresem, SPEC — Social (+5 more)

### Community 90 - "Community 90"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Obowiązkowe przypadki DoD (api), Piramida (MVP), Powiązanie ze stylem z docs, Poza zakresem (+5 more)

### Community 91 - "Community 91"
Cohesion: 0.14
Nodes (13): 1. Bootstrap / auth, 2. Kontekst firmy i bramka, 3. Run jednoetapowy — `post_ideas` (full-auto), 4. Run dwuetapowy — `post_ideas_then_content` (HITL), 5. Korelacja ID (run agentowy), 6. Recovery po restarcie api, 7. Ścieżki błędu (skrót), 8. Przegląd runu i opinie (po pipeline) (+5 more)

### Community 92 - "Community 92"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 93 - "Community 93"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 94 - "Community 94"
Cohesion: 0.70
Nodes (3): Button(), buttonVariants, cn()

### Community 95 - "Community 95"
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

### Community 113 - "InMemoryRunSseHub"
Cohesion: 0.11
Nodes (17): ListRunsUseCase, Injectable, ListRunsQuery, RunStartedBy, HitlDto, ArrayMinSize, IsArray, IsString (+9 more)

### Community 114 - "Dokumentacja Content Chain"
Cohesion: 0.29
Nodes (6): Dokumentacja Content Chain, Jak czytać (kolejność), Mapa: temat → plik, Run SM (uproszczenie), Schematy (skrót), System

### Community 115 - "SPEC — README"
Cohesion: 0.29
Nodes (6): Docs vs SPEC, Jak czytać, Mapa obszar → plik, SPEC — README, Terminologia faz (skrót), Źródła

### Community 116 - "ResponseFormatDto"
Cohesion: 0.29
Nodes (5): OpenAiAuth(), OpenAiExceptionFilter, Catch, OpenAiBearerAuthGuard, Injectable

### Community 117 - ".getLiveness"
Cohesion: 0.53
Nodes (4): ApiOkResponse, ApiOperation, ApiRequestIdHeader, Get

### Community 118 - "SseMetaPayloadDto"
Cohesion: 0.20
Nodes (5): ProviderTestCommand, Command, Option, ProviderTestService, Injectable

### Community 120 - "should-include-redis-stack.ts"
Cohesion: 0.32
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromConfig(), isRedisRequiredFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 121 - "SmartRateLimitGuard"
Cohesion: 0.24
Nodes (5): GatewayKeyAndSmartRateLimit(), GatewayKeyGuard, Injectable, SmartRateLimitGuard, Injectable

### Community 122 - "api-error.code.ts"
Cohesion: 0.27
Nodes (6): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, UnsupportedProviderException, PayloadTooLargeError, RequestWithId

### Community 123 - "run.schemas.ts"
Cohesion: 0.19
Nodes (14): parseWithZod(), hitlSelectedIdeaIdsSchema, ParsedHitlSelectedIdeaIds, ParsedRunBrief, ParsedRunId, ParsedStartRunCommand, runBriefSchema, runIdSchema (+6 more)

### Community 124 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 125 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 126 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 127 - "ConsoleLoggerAdapter"
Cohesion: 0.33
Nodes (3): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable

### Community 128 - "ProviderRegistryService"
Cohesion: 0.25
Nodes (3): GatewayModelConfig, ProviderRegistryService, Injectable

### Community 129 - "config-validator.ts"
Cohesion: 0.33
Nodes (9): collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, buildEffectiveGatewayConfig(), buildGatewayKeyRuntime(), loadGatewayConfigFromFile(), assertMasterKeyPresent() (+1 more)

### Community 130 - "EnvironmentVariables"
Cohesion: 0.20
Nodes (10): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Min (+2 more)

### Community 132 - "provider-base-url.validation.ts"
Cohesion: 0.43
Nodes (6): assertEnabledProviderBaseUrlPresent(), collectMissingBaseUrlErrors(), formatMissingBaseUrlError(), MissingProviderBaseUrl, RawGatewayConfig, resolveBaseUrlFromEnv()

### Community 133 - "rate-limit.module.ts"
Cohesion: 0.33
Nodes (4): RATE_LIMIT_MODULE_OPTIONS, RateLimitModule, RateLimitModuleOptions, Module

### Community 134 - "auth.module.ts"
Cohesion: 0.40
Nodes (4): AuthController, Controller, AuthModule, Module

### Community 135 - "InMemoryRunSseHub"
Cohesion: 0.60
Nodes (3): RunSseEvent, InMemoryRunSseHub, Injectable

### Community 136 - "social.module.ts"
Cohesion: 0.40
Nodes (4): SocialController, Controller, SocialModule, Module

### Community 138 - "llm.module.ts"
Cohesion: 0.50
Nodes (3): LlmModule, Module, LLM_GATEWAY_PORT

## Knowledge Gaps
- **413 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `RedisRequirementSnapshot`, `CachedChatResponseWithConversation`, `OPENAI_RESPONSES_UNSUPPORTED_PARAMS` (+408 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `StartRunUseCase` connect `Community 28` to `InMemoryRunSseHub`, `run.schemas.ts`, `Community 44`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `RunRecord` connect `Community 44` to `InMemoryRunSseHub`, `Community 56`, `run.schemas.ts`, `Community 28`, `Community 62`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `Community 8` to `Community 0`, `Community 1`, `Community 3`, `Community 4`, `provider-base-url.validation.ts`, `Community 9`, `Community 11`, `Community 14`, `Community 17`, `Community 20`, `Community 22`, `Community 24`, `Community 27`, `Community 31`, `Community 34`, `Community 52`, `Community 55`, `Community 61`, `Community 73`, `Community 88`, `models.controller.ts`, `SseMetaPayloadDto`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `RedisRequirementSnapshot` to the rest of the system?**
  _413 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06427771556550951 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09154437456324249 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.059940059940059943 - nodes in this community are weakly interconnected._
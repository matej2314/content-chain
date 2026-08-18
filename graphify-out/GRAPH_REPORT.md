# Graph Report - content-chain  (2026-08-18)

## Corpus Check
- 391 files · ~101,097 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2769 nodes · 7862 edges · 122 communities (120 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 61 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6ebe4ee8`
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

## Communities (122 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (56): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+48 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (57): assertInteractiveAllowed(), DEFAULT_MODELS, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema (+49 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (54): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromConfig(), isRedisRequiredFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+46 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (27): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, defaultModelPolicy() (+19 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (32): collectPendingSecrets(), ProviderTestCommand, Command, Option, EnvPatchService, EnvPatchValue, Injectable, ProviderManagerService (+24 more)

### Community 5 - "Community 5"
Cohesion: 0.16
Nodes (8): toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), Injectable, WizardOrchestratorService, Injectable, WizardStateManager

### Community 6 - "Community 6"
Cohesion: 0.14
Nodes (25): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+17 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (26): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+18 more)

### Community 8 - "Community 8"
Cohesion: 0.08
Nodes (8): SseMetaPayload, ProviderTestOptions, AddModelInput, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (33): CachedChatResponse, CachedChatResponseWithConversation, ChatResponseData, toChatResponseDto(), ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional (+25 more)

### Community 10 - "Community 10"
Cohesion: 0.09
Nodes (19): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty (+11 more)

### Community 11 - "Community 11"
Cohesion: 0.12
Nodes (30): CliRateLimit, RequestIdMiddleware, Injectable, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+22 more)

### Community 12 - "Community 12"
Cohesion: 0.10
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 13 - "Community 13"
Cohesion: 0.08
Nodes (26): Brand, UnBrand, ContentLanguage, RunStatus, RunTaskType, SocialPlatform, UserRole, CONV_ID_RE (+18 more)

### Community 14 - "Community 14"
Cohesion: 0.17
Nodes (10): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+2 more)

### Community 15 - "Community 15"
Cohesion: 0.11
Nodes (24): ResponseCacheService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+16 more)

### Community 16 - "Community 16"
Cohesion: 0.09
Nodes (27): asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic() (+19 more)

### Community 17 - "Community 17"
Cohesion: 0.12
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable, HttpMethod

### Community 18 - "Community 18"
Cohesion: 0.33
Nodes (5): OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiAuth

### Community 19 - "Community 19"
Cohesion: 0.12
Nodes (18): ChatService, Injectable, getClientConversationId(), getOrCreateConversationIdForResponse(), ChatErrorHandlerService, Injectable, ChatResponseBuilderService, Injectable (+10 more)

### Community 20 - "Community 20"
Cohesion: 0.12
Nodes (14): CompleteOnceResult, ChatValidationService, Injectable, ModelId, GatewayCapabilitiesConfig, GatewayModelConfig, GatewayParamsConfig, AIProvider (+6 more)

### Community 21 - "Community 21"
Cohesion: 0.07
Nodes (28): AppModule, Module, AuthController, Controller, AuthModule, Module, CompanyContextModule, Module (+20 more)

### Community 22 - "Community 22"
Cohesion: 0.16
Nodes (10): ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, EnvTemplateInput, generateEnvTemplate(), isEnvInputRedisRequired() (+2 more)

### Community 23 - "Community 23"
Cohesion: 0.15
Nodes (13): ChatModule, Module, AnthropicModule, Module, AnthropicMessagesController, AnthropicAuth, ApiSecurity, ApiTags (+5 more)

### Community 24 - "Community 24"
Cohesion: 0.17
Nodes (17): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+9 more)

### Community 25 - "Community 25"
Cohesion: 0.27
Nodes (16): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+8 more)

### Community 26 - "Community 26"
Cohesion: 0.24
Nodes (5): GatewayKeyAndSmartRateLimit(), GatewayKeyGuard, Injectable, SmartRateLimitGuard, Injectable

### Community 27 - "Community 27"
Cohesion: 0.11
Nodes (5): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 28 - "Community 28"
Cohesion: 0.12
Nodes (9): RedisConnectionService, Injectable, Inject, Inject, Optional, LoggingService, Injectable, Inject (+1 more)

### Community 29 - "Community 29"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 30 - "Community 30"
Cohesion: 0.27
Nodes (6): GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, GatewayModelsCatalogService, Injectable

### Community 31 - "Community 31"
Cohesion: 0.09
Nodes (14): NoopErrorReportingAdapter, Injectable, LEVEL_RANK, SentryErrorReportingAdapter, Injectable, parseLogLevel(), ErrorReportingBackend, LoggerBackend (+6 more)

### Community 32 - "Community 32"
Cohesion: 0.13
Nodes (11): resolveClientIdFromKey(), GatewayKey, ResolvedGatewayClient, _badRuntimeConfig, RATE_LIMIT_MODULE_OPTIONS, RateLimitModule, RateLimitModuleOptions, Module (+3 more)

### Community 33 - "Community 33"
Cohesion: 0.05
Nodes (62): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject (+54 more)

### Community 34 - "Community 34"
Cohesion: 0.11
Nodes (25): PendingSecretsItem, convertClient(), convertRateLimit(), GatewayClient, ClientManagerService, Injectable, KeyGeneratorService, Injectable (+17 more)

### Community 35 - "Community 35"
Cohesion: 0.05
Nodes (47): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+39 more)

### Community 36 - "Community 36"
Cohesion: 0.17
Nodes (17): toHttpException(), buildGenerationConfig(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields(), extractFromThoughtParts(), extractGeminiThinkingContent(), GeminiLegacyThoughtFields (+9 more)

### Community 37 - "Community 37"
Cohesion: 0.21
Nodes (14): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createAnthropicProvider(), createGoogleProvider(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn (+6 more)

### Community 38 - "Community 38"
Cohesion: 0.22
Nodes (10): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), asGatewayKey(), getAppConfig(), enrichRequestWithClientId(), readAnthropicApiKey() (+2 more)

### Community 39 - "Community 39"
Cohesion: 0.05
Nodes (44): ApiHeader, ApiAnthropicErrorResponses, ApiBody, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, Body (+36 more)

### Community 40 - "Community 40"
Cohesion: 0.12
Nodes (19): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 41 - "Community 41"
Cohesion: 0.09
Nodes (18): ChatStreamController, ApiBody, ApiGatewayChatErrorResponses, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, ApiSecurity (+10 more)

### Community 42 - "Community 42"
Cohesion: 0.05
Nodes (40): Auth, Błędy gateway → run Content Chain, Company context, Dokumentacja komunikacji — Content Chain, Envelope błędu, Feedback (opinie tekstowe), `GET /api/v1/auth/bootstrap-status`, `GET /api/v1/auth/me` (+32 more)

### Community 43 - "Community 43"
Cohesion: 0.18
Nodes (10): AppModule, Module, bootstrap(), PORT, setupApp(), exportOpenApi(), buildSwaggerConfig(), createOpenApiDocument() (+2 more)

### Community 44 - "Community 44"
Cohesion: 0.12
Nodes (21): Inject, RecoverInterruptedRunsUseCase, Inject, Injectable, RunLifecycleService, TransitionExtras, Inject, Injectable (+13 more)

### Community 45 - "Community 45"
Cohesion: 0.08
Nodes (21): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, MetricsController, Controller, Get, Res (+13 more)

### Community 46 - "Community 46"
Cohesion: 0.10
Nodes (36): CachedChatResponseSchema, ChatWarningSchema, parseCachedChatResponse(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), parseGeminiResponseWithTools() (+28 more)

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
Cohesion: 0.40
Nodes (3): ConfigSecretsStatusCommand, Command, Option

### Community 51 - "Community 51"
Cohesion: 0.29
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 52 - "Community 52"
Cohesion: 0.28
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 53 - "Community 53"
Cohesion: 0.36
Nodes (3): ClientId, ActiveStreamsTracker, Injectable

### Community 54 - "Community 54"
Cohesion: 0.13
Nodes (23): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+15 more)

### Community 55 - "Community 55"
Cohesion: 0.15
Nodes (22): buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns(), composeSystemPrompt() (+14 more)

### Community 56 - "Community 56"
Cohesion: 0.11
Nodes (8): InProcessRunWorker, Injectable, ResumeHitlUseCase, Inject, Injectable, Inject, RunRepository, RunRecord

### Community 58 - "Community 58"
Cohesion: 0.17
Nodes (11): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload (+3 more)

### Community 59 - "Community 59"
Cohesion: 0.39
Nodes (3): KeyGenerateCommand, Command, Option

### Community 60 - "Community 60"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 61 - "Community 61"
Cohesion: 0.13
Nodes (16): LlmGatewayError, GatewayChatResponse, GatewayErrorBody, LlmGatewayHttpAdapter, RETRYABLE_CODES, Injectable, LlmGatewayPort, LlmChatCommand (+8 more)

### Community 62 - "Community 62"
Cohesion: 0.12
Nodes (11): ListRunsQuery, ListRunsResult, RunSnapshot, RunLogEntry, ALLOWED, assertTransition(), PrismaRunAdapter, RunLogRow (+3 more)

### Community 63 - "Community 63"
Cohesion: 0.17
Nodes (12): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, IsStringOrArrayOfStrings, Max (+4 more)

### Community 64 - "Community 64"
Cohesion: 0.16
Nodes (22): SseEvent, OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+14 more)

### Community 65 - "Community 65"
Cohesion: 0.18
Nodes (10): ApiBody, ApiOpenAiErrorResponses, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, Body, Post (+2 more)

### Community 66 - "Community 66"
Cohesion: 0.14
Nodes (8): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, PinoLoggerAdapter, Injectable, LogContext, LoggerOptions, LogLevel

### Community 67 - "Community 67"
Cohesion: 0.25
Nodes (8): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapTurnsToOpenAiMessages(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 68 - "Community 68"
Cohesion: 0.09
Nodes (23): HealthModule, Module, IntegrationsModule, Module, LoggingModule, Global, Module, AiMetricsModule (+15 more)

### Community 69 - "Community 69"
Cohesion: 0.13
Nodes (13): ChatController, ApiBody, ApiGatewayChatErrorResponses, ApiOperation, ApiRequestIdHeader, ApiResponse, ApiSecurity, ApiTags (+5 more)

### Community 70 - "Community 70"
Cohesion: 0.11
Nodes (11): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, CliValidateOptions (+3 more)

### Community 71 - "Community 71"
Cohesion: 0.31
Nodes (3): ProviderAddCommand, Command, Option

### Community 72 - "Community 72"
Cohesion: 0.13
Nodes (11): StartRunCommand, StartRunUseCase, Injectable, RunBrief, DomainException, ErrorEnvelope, HttpExceptionFilter, Catch (+3 more)

### Community 73 - "Community 73"
Cohesion: 0.12
Nodes (12): Inject, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get (+4 more)

### Community 74 - "Community 74"
Cohesion: 0.11
Nodes (17): `apps/ai-provider-gateway`, `apps/api` — bounded contexty (~1 poziom w głąb), `apps/api/src/health/`, `metrics/`, `llm/`, `apps/api/src/shared/`, `apps/frontend`, Architektura katalogów i plików — Content Chain, Auth i Company Context, Drzewo docelowe (szkielet) (+9 more)

### Community 75 - "Community 75"
Cohesion: 0.10
Nodes (9): ClientRemoveCommand, Command, Option, ProviderEditCommand, Command, Option, ProviderRemoveCommand, Command (+1 more)

### Community 76 - "Community 76"
Cohesion: 0.16
Nodes (6): ModelEditCommand, Command, Option, ModelRemoveCommand, Command, Option

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
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 82 - "Community 82"
Cohesion: 0.21
Nodes (9): toChatResponseDtoFromCache(), ApiRequestIdHeader(), requireClientGatewayKey(), ANTHROPIC_STREAM_API_DESCRIPTION, mapAnthropicRequestToGateway(), AnthropicTool, mapAnthropicContentBlockToGateway(), mapAnthropicToolChoice() (+1 more)

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
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 87 - "Community 87"
Cohesion: 0.32
Nodes (5): AnthropicAuth(), AnthropicExceptionFilter, Catch, AnthropicApiKeyGuard, Injectable

### Community 88 - "Community 88"
Cohesion: 0.31
Nodes (5): OpenAiAuth(), OpenAiExceptionFilter, Catch, OpenAiBearerAuthGuard, Injectable

### Community 89 - "Community 89"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Fazy invoke (model B), Kryteria akceptacji, Nie wolno, Norma implementacji, Powiązanie ze stylem z docs / wyjątek, Poza zakresem, SPEC — Social (+5 more)

### Community 90 - "Community 90"
Cohesion: 0.14
Nodes (13): Cel / zakres względem dokumentacji, Kryteria akceptacji, Nie wolno, Norma implementacji, Obowiązkowe przypadki DoD (api), Piramida (MVP), Powiązanie ze stylem z docs, Poza zakresem (+5 more)

### Community 91 - "Community 91"
Cohesion: 0.15
Nodes (12): 1. Bootstrap / auth, 2. Kontekst firmy i bramka, 3. Run jednoetapowy — `post_ideas` (full-auto), 4. Run dwuetapowy — `post_ideas_then_content` (HITL), 5. Korelacja ID (run agentowy), 6. Ścieżki błędu (skrót), 7. Przegląd runu i opinie (po pipeline), ConsistencyVerifier — checklista (norma) (+4 more)

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

### Community 102 - "models.controller.ts"
Cohesion: 0.29
Nodes (7): ApiGatewayChatErrorResponses(), ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto, ApiProperty

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
Cohesion: 0.52
Nodes (3): RunSseEvent, InMemoryRunSseHub, Injectable

### Community 114 - "Dokumentacja Content Chain"
Cohesion: 0.29
Nodes (6): Dokumentacja Content Chain, Jak czytać (kolejność), Mapa: temat → plik, Run SM (uproszczenie), Schematy (skrót), System

### Community 115 - "SPEC — README"
Cohesion: 0.29
Nodes (6): Docs vs SPEC, Jak czytać, Mapa obszar → plik, SPEC — README, Terminologia faz (skrót), Źródła

### Community 116 - "ResponseFormatDto"
Cohesion: 0.33
Nodes (6): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional

### Community 117 - ".getLiveness"
Cohesion: 0.53
Nodes (4): ApiOkResponse, ApiOperation, ApiRequestIdHeader, Get

### Community 118 - "SseMetaPayloadDto"
Cohesion: 0.67
Nodes (3): SseMetaPayloadDto, ApiProperty, ApiPropertyOptional

## Knowledge Gaps
- **407 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `RedisRequirementSnapshot`, `CachedChatResponseWithConversation`, `OPENAI_RESPONSES_UNSUPPORTED_PARAMS` (+402 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `RunRecord` connect `Community 56` to `Community 72`, `Community 44`, `Community 62`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `Community 8` to `Community 1`, `Community 2`, `Community 3`, `Community 4`, `Community 7`, `Community 9`, `Community 11`, `Community 14`, `Community 17`, `Community 20`, `Community 22`, `Community 27`, `Community 30`, `Community 31`, `Community 32`, `Community 34`, `Community 55`, `Community 66`, `Community 73`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `asClientId()` connect `Community 34` to `Community 0`, `Community 1`, `Community 32`, `Community 64`, `Community 65`, `Community 69`, `Community 5`, `Community 39`, `Community 41`, `Community 11`, `Community 82`, `Community 53`, `Community 55`, `Community 59`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `RedisRequirementSnapshot` to the rest of the system?**
  _407 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07083333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06812585499316005 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.053923541247484906 - nodes in this community are weakly interconnected._
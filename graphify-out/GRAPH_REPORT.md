# Graph Report - .  (2026-08-13)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 2090 nodes · 6783 edges · 97 communities (95 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 59 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `978d5a0e`
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
- `ApiGatewayChatErrorResponses()` --indirect_call--> `ErrorEnvelopeDto`  [INFERRED]
  apps/ai-provider-gateway/src/common/decorators/api-gateway-error-responses.decorator.ts → apps/ai-provider-gateway/src/common/dtos/error-envelope.dto.ts
- `GatewayKeyAndSmartRateLimit()` --indirect_call--> `SmartRateLimitGuard`  [INFERRED]
  apps/ai-provider-gateway/src/common/decorators/gateway-key-and-smart-rate-limit.decorator.ts → apps/ai-provider-gateway/src/guards/smart-rate-limit-guard.ts
- `AnthropicAuth()` --indirect_call--> `SmartRateLimitGuard`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/decorators/anthropic-auth.decorator.ts → apps/ai-provider-gateway/src/guards/smart-rate-limit-guard.ts
- `OpenAiAuth()` --indirect_call--> `SmartRateLimitGuard`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/decorators/openai-auth.decorator.ts → apps/ai-provider-gateway/src/guards/smart-rate-limit-guard.ts
- `bootstrap()` --indirect_call--> `LoggingService`  [INFERRED]
  apps/ai-provider-gateway/src/main.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- 4-file cycle: `apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts -> apps/ai-provider-gateway/src/config/typed-config.ts -> apps/ai-provider-gateway/src/config/app-configuration.types.ts -> apps/ai-provider-gateway/src/config/configuration.ts -> apps/ai-provider-gateway/src/cache/should-include-redis-stack.ts`

## Communities (97 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (55): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), CliModule (+47 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (56): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+48 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (56): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis(), shouldIncludeRedisStack() (+48 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (27): PendingSecretsItem, assertInteractiveAllowed(), convertModel(), ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable (+19 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (35): collectPendingSecrets(), DEFAULT_MODELS, CliAiProvider, EnvPatchValue, ModelPromptResult, ProviderPromptResult, ProviderPromptService, Injectable (+27 more)

### Community 5 - "Community 5"
Cohesion: 0.16
Nodes (13): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+5 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (45): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+37 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (27): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+19 more)

### Community 8 - "Community 8"
Cohesion: 0.07
Nodes (10): ProviderTestOptions, CliAiModel, AddModelInput, EditModelInput, ModelAlias, ModelId, ProviderInstanceId, NoopAppMetricsAdapter (+2 more)

### Community 9 - "Community 9"
Cohesion: 0.14
Nodes (32): CachedChatResponseWithConversation, ChatResponseData, toChatResponseDto(), mapStopReasonToFinishReason(), CompleteOnceResult, StreamOnceResult, ChatResponseBuilderService, ProviderResponse (+24 more)

### Community 10 - "Community 10"
Cohesion: 0.09
Nodes (21): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty (+13 more)

### Community 11 - "Community 11"
Cohesion: 0.11
Nodes (30): RequestIdMiddleware, Injectable, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId(), isFiniteNumber() (+22 more)

### Community 12 - "Community 12"
Cohesion: 0.10
Nodes (17): NoOpCacheBackend, Injectable, NoopCacheModule, Module, CacheModule, CacheModuleOptions, Module, CacheRegistryService (+9 more)

### Community 13 - "Community 13"
Cohesion: 0.08
Nodes (26): Brand, UnBrand, ContentLanguage, RunStatus, RunTaskType, SocialPlatform, UserRole, CONV_ID_RE (+18 more)

### Community 14 - "Community 14"
Cohesion: 0.14
Nodes (15): HealthCheckResult, HealthRedisCheckResult, APP_METRICS_BACKEND, AppProviderStreamScope, AppRequestLabels, AppRequestStatus, HealthComponent, HealthMetricsSnapshot (+7 more)

### Community 15 - "Community 15"
Cohesion: 0.11
Nodes (22): ResponseCacheService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+14 more)

### Community 16 - "Community 16"
Cohesion: 0.09
Nodes (27): asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic() (+19 more)

### Community 17 - "Community 17"
Cohesion: 0.07
Nodes (12): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable, MetricsController, ApiOperation, ApiResponse (+4 more)

### Community 18 - "Community 18"
Cohesion: 0.09
Nodes (20): ChatController, ApiSecurity, ApiTags, Controller, GatewayKeyAndSmartRateLimit, ChatService, Injectable, ApiRequestIdHeader() (+12 more)

### Community 19 - "Community 19"
Cohesion: 0.15
Nodes (15): isCachedChatAllowedForModelAlias(), getClientConversationId(), getOrCreateConversationIdForResponse(), buildRetryPolicyFromResolved(), resolveMaxAttempts(), resolveTimeoutMs(), getResolvedSystemPrompts(), isToolingRequest() (+7 more)

### Community 20 - "Community 20"
Cohesion: 0.11
Nodes (14): ChatErrorHandlerService, Injectable, ChatValidationService, Injectable, GatewayCapabilitiesConfig, GatewayModelConfig, GatewayParamsConfig, AIProvider (+6 more)

### Community 21 - "Community 21"
Cohesion: 0.09
Nodes (19): AppModule, Module, AuthController, Controller, AuthModule, Module, CompanyContextController, Controller (+11 more)

### Community 22 - "Community 22"
Cohesion: 0.16
Nodes (10): ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, EnvTemplateInput, generateEnvTemplate(), isEnvInputRedisRequired() (+2 more)

### Community 23 - "Community 23"
Cohesion: 0.11
Nodes (19): ChatModule, Module, HealthModule, Module, AnthropicModule, Module, IntegrationsModule, Module (+11 more)

### Community 24 - "Community 24"
Cohesion: 0.19
Nodes (15): ModelRetrySource, assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions, ResilientExecutionResult, RetryPolicy, ResilientExecutor (+7 more)

### Community 25 - "Community 25"
Cohesion: 0.26
Nodes (16): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+8 more)

### Community 26 - "Community 26"
Cohesion: 0.14
Nodes (11): CHAT_STREAM_API_DESCRIPTION, SseSerializer, ApiGatewayChatErrorResponses(), GatewayKeyAndSmartRateLimit(), StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader() (+3 more)

### Community 27 - "Community 27"
Cohesion: 0.15
Nodes (5): healthStatusToGaugeValue(), PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppTokenUsage

### Community 28 - "Community 28"
Cohesion: 0.15
Nodes (10): Inject, Inject, Optional, LogContext, LoggingService, Injectable, createAnthropicProvider(), createGoogleProvider() (+2 more)

### Community 29 - "Community 29"
Cohesion: 0.15
Nodes (15): ModelAddCommand, Command, Option, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, buildDefaultModelCapabilities() (+7 more)

### Community 30 - "Community 30"
Cohesion: 0.16
Nodes (12): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional (+4 more)

### Community 31 - "Community 31"
Cohesion: 0.17
Nodes (10): LEVEL_RANK, parseLogLevel(), LoggerBackend, LoggerOptions, LogLevel, isSentryEnabled(), resolveErrorReportingBackend(), ERROR_REPORTING_BACKEND (+2 more)

### Community 32 - "Community 32"
Cohesion: 0.17
Nodes (7): GatewayKey, Express, Request, SmartRateLimitGuard, Injectable, SmartRateLimiterService, Injectable

### Community 33 - "Community 33"
Cohesion: 0.14
Nodes (8): RedisCacheAdapter, Injectable, RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig(), asCacheTtlSeconds()

### Community 34 - "Community 34"
Cohesion: 0.15
Nodes (16): CachedChatResponseSchema, ChatWarningSchema, parseCachedChatResponse(), CachedChatResponse, ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional (+8 more)

### Community 35 - "Community 35"
Cohesion: 0.12
Nodes (17): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+9 more)

### Community 36 - "Community 36"
Cohesion: 0.16
Nodes (18): toHttpException(), buildGenerationConfig(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields(), extractFromThoughtParts(), extractGeminiThinkingContent(), GeminiLegacyThoughtFields (+10 more)

### Community 37 - "Community 37"
Cohesion: 0.19
Nodes (14): ProviderInstanceRuntime, GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn (+6 more)

### Community 38 - "Community 38"
Cohesion: 0.29
Nodes (8): resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), enrichRequestWithClientId(), readAnthropicApiKey(), readAuthorizationHeader(), readBearerToken(), RateLimitResult

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
Cohesion: 0.12
Nodes (6): NoopErrorReportingAdapter, Injectable, SentryErrorReportingAdapter, Injectable, ErrorReportingBackend, Inject

### Community 43 - "Community 43"
Cohesion: 0.19
Nodes (10): AppModule, Module, bootstrap(), PORT, setupApp(), exportOpenApi(), buildSwaggerConfig(), createOpenApiDocument() (+2 more)

### Community 44 - "Community 44"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 45 - "Community 45"
Cohesion: 0.14
Nodes (14): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+6 more)

### Community 46 - "Community 46"
Cohesion: 0.21
Nodes (14): ChatCompletionsAdapterOptions, accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText(), finalizeOpenAiStreamToolCalls(), OpenAiStreamToolCallAccumulator, ChatCompletionMessageToolCall, ChatCompletionTool, mapOpenAiFinishReason() (+6 more)

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
Cohesion: 0.22
Nodes (5): ConfigSecretsStatusCommand, Command, Option, EnvPatchService, Injectable

### Community 51 - "Community 51"
Cohesion: 0.29
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 52 - "Community 52"
Cohesion: 0.28
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 53 - "Community 53"
Cohesion: 0.22
Nodes (4): ClientId, ActiveStreamsTracker, Injectable, RateLimitReason

### Community 54 - "Community 54"
Cohesion: 0.26
Nodes (12): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), isOpenAiEffortLevel(), isOpenAiReasoningRequested(), mapThinkingBudgetToEffort(), mapThinkingToChatCompletion(), mapThinkingToResponsesReasoning() (+4 more)

### Community 55 - "Community 55"
Cohesion: 0.26
Nodes (11): toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns(), composeSystemPrompt(), ChatAssistantMessage, ChatMessage, ChatToolMessage, ChatUserMessage (+3 more)

### Community 56 - "Community 56"
Cohesion: 0.27
Nodes (10): asToolCallId(), buildResponsesCreateParams(), mapGatewayMetadataToOpenAi(), extractResponsesOutputItemToolCall(), extractResponsesStreamToolCallDone(), registerResponsesFunctionCallItemId(), accumulateResponsesReasoningDelta(), extractResponsesReasoningSummaryText() (+2 more)

### Community 57 - "Community 57"
Cohesion: 0.21
Nodes (8): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsStringOrArrayOfStrings(), IsThinkingBudget()

### Community 58 - "Community 58"
Cohesion: 0.26
Nodes (6): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, UnsupportedProviderException, PayloadTooLargeError, RequestWithId

### Community 59 - "Community 59"
Cohesion: 0.19
Nodes (5): KeyGenerateCommand, Command, Option, GatewayCommand, Command

### Community 60 - "Community 60"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 61 - "Community 61"
Cohesion: 0.24
Nodes (11): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+3 more)

### Community 62 - "Community 62"
Cohesion: 0.17
Nodes (11): ApiHeader, ApiAnthropicErrorResponses, ApiBody, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, Body (+3 more)

### Community 63 - "Community 63"
Cohesion: 0.17
Nodes (12): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, IsStringOrArrayOfStrings, Max (+4 more)

### Community 64 - "Community 64"
Cohesion: 0.18
Nodes (11): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+3 more)

### Community 65 - "Community 65"
Cohesion: 0.18
Nodes (10): ApiBody, ApiOpenAiErrorResponses, ApiOperation, ApiProduces, ApiRequestIdHeader, ApiResponse, Body, Post (+2 more)

### Community 66 - "Community 66"
Cohesion: 0.38
Nodes (3): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable

### Community 67 - "Community 67"
Cohesion: 0.25
Nodes (8): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapTurnsToOpenAiMessages(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 68 - "Community 68"
Cohesion: 0.24
Nodes (7): ProviderInstancesBootstrap, Injectable, ProviderRegistryModule, Global, Module, ProvidersModule, Module

### Community 69 - "Community 69"
Cohesion: 0.20
Nodes (9): ApiBody, ApiGatewayChatErrorResponses, ApiOperation, ApiRequestIdHeader, ApiResponse, Body, Post, Req (+1 more)

### Community 70 - "Community 70"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 71 - "Community 71"
Cohesion: 0.31
Nodes (3): ProviderAddCommand, Command, Option

### Community 73 - "Community 73"
Cohesion: 0.39
Nodes (6): SseMetaPayload, StreamOnceParams, ChatExecutionPrep, ConversationId, ResponseId, ResolvedSystemPrompts

### Community 74 - "Community 74"
Cohesion: 0.28
Nodes (5): buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToUsage(), ChatProviderCallService, Injectable

### Community 75 - "Community 75"
Cohesion: 0.33
Nodes (3): ClientRemoveCommand, Command, Option

### Community 76 - "Community 76"
Cohesion: 0.33
Nodes (3): ModelEditCommand, Command, Option

### Community 77 - "Community 77"
Cohesion: 0.33
Nodes (3): ModelRemoveCommand, Command, Option

### Community 78 - "Community 78"
Cohesion: 0.33
Nodes (3): ProviderEditCommand, Command, Option

### Community 79 - "Community 79"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 80 - "Community 80"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 81 - "Community 81"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 82 - "Community 82"
Cohesion: 0.50
Nodes (5): mapAnthropicRequestToGateway(), AnthropicTool, mapAnthropicContentBlockToGateway(), mapAnthropicToolChoice(), mapAnthropicToolsToGateway()

### Community 83 - "Community 83"
Cohesion: 0.46
Nodes (7): mapProviderResponseToAiObservation(), asInputTokens(), asOutputTokens(), parseGeminiResponseWithTools(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse()

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
Cohesion: 0.32
Nodes (5): OpenAiAuth(), OpenAiExceptionFilter, Catch, OpenAiBearerAuthGuard, Injectable

### Community 89 - "Community 89"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 90 - "Community 90"
Cohesion: 0.29
Nodes (6): AiMetricsModule, Global, Module, AppMetricsModule, Global, Module

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
Cohesion: 0.67
Nodes (3): LoggingModule, Global, Module

## Knowledge Gaps
- **120 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `RedisRequirementSnapshot`, `CachedChatResponseWithConversation`, `OPENAI_RESPONSES_UNSUPPORTED_PARAMS` (+115 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `Community 28` to `Community 10`, `Community 12`, `Community 14`, `Community 15`, `Community 16`, `Community 19`, `Community 20`, `Community 24`, `Community 25`, `Community 31`, `Community 32`, `Community 33`, `Community 34`, `Community 35`, `Community 36`, `Community 37`, `Community 38`, `Community 42`, `Community 43`, `Community 46`, `Community 56`, `Community 58`, `Community 68`, `Community 86`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `Community 8` to `Community 1`, `Community 2`, `Community 3`, `Community 4`, `Community 5`, `Community 7`, `Community 9`, `Community 11`, `Community 12`, `Community 14`, `Community 17`, `Community 20`, `Community 22`, `Community 27`, `Community 28`, `Community 30`, `Community 31`, `Community 34`, `Community 73`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `Community 3` to `Community 32`, `Community 0`, `Community 34`, `Community 1`, `Community 4`, `Community 5`, `Community 2`, `Community 7`, `Community 37`, `Community 9`, `Community 74`, `Community 11`, `Community 15`, `Community 19`, `Community 20`, `Community 25`, `Community 30`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `RedisRequirementSnapshot` to the rest of the system?**
  _120 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06359649122807018 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06602512697139802 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05213089802130898 - nodes in this community are weakly interconnected._
# Graph Report - content-chain  (2026-09-15)

## Corpus Check
- 560 files · ~156,710 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 6, .css 1)

## Summary
- 3611 nodes · 11090 edges · 131 communities (108 shown, 18 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 362 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3182dee7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cli.module.ts
- social.types.ts
- llm-hop.ts
- chat-provider-call.service.ts
- prisma-run.adapter.ts
- chat.service.ts
- openai-params-provider.mapper.ts
- logging.service.ts
- runs.controller.ts
- exitWithAgentReport
- configuration-validation.service.ts
- asProviderInstanceId
- social.graph.ts
- branded.types.ts
- anthropic-messages.controller.ts
- models.controller.ts
- anthropic-response.mapper.ts
- auth.controller.ts
- InvitationsController
- LoggingService
- sentry-ai-metrics.adapter.ts
- .streamChat
- PrismaService
- anthropic/anthropic-tools.mapper.ts
- model-manager.service.ts
- typed-config.ts
- GatewayKey
- ChatWarningDto
- .completions
- redis-vector-store.adapter.ts
- feedback.module.ts
- provider-error.mapper.ts
- swagger.setup.ts
- configuration.ts
- AnthropicMessagesRequestDto
- response-cache.service.ts
- ChatMessageDto
- enums.ts
- resilient-executor.ts
- ApiRequestIdHeader
- api/src/app.module.ts
- config-generator.service.ts
- openai-models.controller.ts
- ids.ts
- app-metrics.service.ts
- ConsoleLoggerAdapter
- UserRepository
- PrometheusAppMetricsAdapter
- GatewayConfig
- should-include-redis-stack.ts
- in-process-run.worker.ts
- responses.adapter.ts
- ai-provider-gateway/src/app.module.ts
- anthropic-models.controller.ts
- app-metrics-backend.interface.ts
- CompanyContextRepository
- env.validation.ts
- ModelAlias
- ai-provider-gateway/src/health/health.service.ts
- HealthController
- ChatParamsDto
- company-context.dto.ts
- semantic-cache.service.ts
- api-error.code.ts
- prisma-feedback.adapter.ts
- feedback.types.ts
- ConfigInitCommand
- types/index.ts
- OpenAiChatCompletionRequestDto
- configure-swagger.ts
- RedisConnectionService
- ChatToolingDto
- provider-instances.bootstrap.ts
- auth.module.ts
- OpenAiChatMessageDto
- http-metrics.interceptor.ts
- DomainException
- metrics.module.ts
- RolesGuard
- llm-gateway.http.adapter.ts
- PrometheusService
- public.decorator.ts
- openai-chat-completions.controller.ts
- SPEC — README
- filters/http-exception.filter.ts
- PrismaRefreshSessionAdapter
- RunsController
- StartRunDto
- api-fetch.ts
- wizard-orchestrator.service.ts
- EnvironmentVariables
- auth.api.ts
- chat-params.dto.ts
- .create
- HttpExceptionFilter
- acceptInvite
- route.ts
- openai-chat-message.dto.ts
- ProviderAddCommand
- openai-chat-completion-request.dto.ts
- ProviderInstancesBootstrap
- ClientAddCommand
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- ModelRemoveCommand
- ProviderEditCommand
- AppMetricsService
- session-provider.tsx
- dialog.tsx
- Architektura
- brand.ts
- home-entry.tsx
- login-card.tsx
- event-source-registry.ts
- Anty-patterny
- Brand types
- Przepływy danych
- Deployment
- Słownik
- Dokumentacja koncepcyjna
- Observability
- Bezpieczeństwo
- Testy
- UX Dashboard — Content Chain

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `ProviderInstanceId` - 81 edges
3. `LoggingService` - 73 edges
4. `asProviderInstanceId()` - 67 edges
5. `GatewayConfig` - 65 edges
6. `DomainException` - 62 edges
7. `GatewayKey` - 59 edges
8. `ClientId` - 54 edges
9. `ChatRequestDto` - 48 edges
10. `AppMetricsService` - 46 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `logoutSession()` --calls--> `apiFetch()`  [EXTRACTED]
  apps/frontend/src/modules/auth/api/auth.api.ts → apps/frontend/src/shared/api/api-fetch.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (131 total, 18 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.06
Nodes (58): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), resolveCliMode() (+50 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (37): PageDocument, PageOutline, VerifierVerdict, PrismaContentResultAdapter, toContentPipelinePhase(), Injectable, CompositeRunResultReader, GetRunOutput (+29 more)

### Community 2 - "llm-hop.ts"
Cohesion: 0.08
Nodes (50): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+42 more)

### Community 3 - "chat-provider-call.service.ts"
Cohesion: 0.09
Nodes (29): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns() (+21 more)

### Community 4 - "prisma-run.adapter.ts"
Cohesion: 0.07
Nodes (23): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+15 more)

### Community 5 - "chat.service.ts"
Cohesion: 0.05
Nodes (65): SemanticStoreEmbedState, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize (+57 more)

### Community 6 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.07
Nodes (22): LEVEL_ORDER, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable, SentryErrorReportingAdapter, Injectable (+14 more)

### Community 8 - "runs.controller.ts"
Cohesion: 0.04
Nodes (51): CreateFeedbackUseCase, Injectable, FinalizeReviewUseCase, Inject, Injectable, FlagOutputEditedUseCase, Inject, Injectable (+43 more)

### Community 9 - "exitWithAgentReport"
Cohesion: 0.13
Nodes (12): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand (+4 more)

### Community 10 - "configuration-validation.service.ts"
Cohesion: 0.17
Nodes (14): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, assertMasterKeyPresent(), configurationValidation (+6 more)

### Community 11 - "asProviderInstanceId"
Cohesion: 0.09
Nodes (43): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, collectPendingSecrets(), DEFAULT_MODELS, CliAiProvider, EnvPatchValue (+35 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.08
Nodes (49): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput, contentOutputSchema, IdeasOutput, ideasOutputSchema (+41 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.09
Nodes (40): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, SseMetaPayload, mapStopReasonToFinishReason(), CompleteOnceResult (+32 more)

### Community 14 - "anthropic-messages.controller.ts"
Cohesion: 0.08
Nodes (29): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+21 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.11
Nodes (30): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDoneEvent, asMessageId() (+22 more)

### Community 17 - "auth.controller.ts"
Cohesion: 0.04
Nodes (65): comparePassword(), generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), BootstrapAdminInput, bootstrapAdminSchema, LoginInput (+57 more)

### Community 18 - "InvitationsController"
Cohesion: 0.12
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 19 - "LoggingService"
Cohesion: 0.11
Nodes (11): CacheModule, Module, CacheRegistryService, Injectable, Inject, Inject, LogContext, LoggingService (+3 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (33): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+25 more)

### Community 21 - ".streamChat"
Cohesion: 0.13
Nodes (13): ChatStreamController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags, Body (+5 more)

### Community 22 - "PrismaService"
Cohesion: 0.14
Nodes (5): PrismaModule, Global, Module, PrismaService, Injectable

### Community 23 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.06
Nodes (67): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens() (+59 more)

### Community 24 - "model-manager.service.ts"
Cohesion: 0.12
Nodes (26): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable (+18 more)

### Community 25 - "typed-config.ts"
Cohesion: 0.11
Nodes (12): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+4 more)

### Community 26 - "GatewayKey"
Cohesion: 0.11
Nodes (13): isProviderRateLimitError(), StreamCleanupInterceptor, Injectable, readClientGatewayKey(), resolveClientIdFromKey(), GatewayKey, ResolvedGatewayClient, _badRuntimeConfig (+5 more)

### Community 27 - "ChatWarningDto"
Cohesion: 0.19
Nodes (12): ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDonePayloadDto, SseDoneUsageDto, ApiPropertyOptional (+4 more)

### Community 28 - ".completions"
Cohesion: 0.14
Nodes (12): OpenAiChatCompletionsController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags, Body (+4 more)

### Community 29 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 30 - "feedback.module.ts"
Cohesion: 0.27
Nodes (7): FEEDBACK_RUN_READER, FeedbackRunLookup, FeedbackRunReader, FeedbackModule, Module, PrismaFeedbackRunReaderAdapter, Injectable

### Community 31 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 32 - "swagger.setup.ts"
Cohesion: 0.08
Nodes (26): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+18 more)

### Community 33 - "configuration.ts"
Cohesion: 0.14
Nodes (19): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildEffectiveGatewayConfig(), BuildEffectiveGatewayConfigOptions (+11 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "response-cache.service.ts"
Cohesion: 0.14
Nodes (15): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), CACHE_BACKEND, ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText() (+7 more)

### Community 36 - "ChatMessageDto"
Cohesion: 0.10
Nodes (26): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+18 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 39 - "ApiRequestIdHeader"
Cohesion: 0.15
Nodes (14): ApiRequestIdHeader(), ApiOkResponse, ApiOperation, Get, AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+6 more)

### Community 40 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (52): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome() (+44 more)

### Community 41 - "config-generator.service.ts"
Cohesion: 0.10
Nodes (18): ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable, ConfigGeneratorService, Injectable, FileManagerService (+10 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.12
Nodes (21): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.service.ts"
Cohesion: 0.12
Nodes (13): Inject, Optional, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller (+5 more)

### Community 46 - "UserRepository"
Cohesion: 0.04
Nodes (42): Inject, ListUsersUseCase, Inject, Injectable, MeUseCase, Inject, Injectable, ReactivateUserUseCase (+34 more)

### Community 47 - "PrometheusAppMetricsAdapter"
Cohesion: 0.10
Nodes (7): healthStatusToGaugeValue(), PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 48 - "GatewayConfig"
Cohesion: 0.07
Nodes (26): PendingSecretsItem, assertInteractiveAllowed(), CliRateLimit, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable (+18 more)

### Community 49 - "should-include-redis-stack.ts"
Cohesion: 0.35
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 50 - "in-process-run.worker.ts"
Cohesion: 0.07
Nodes (20): InProcessRunWorker, Inject, Injectable, RecoverInterruptedRunsUseCase, Inject, Injectable, Inject, RunLifecycleService (+12 more)

### Community 51 - "responses.adapter.ts"
Cohesion: 0.12
Nodes (36): toHttpException(), asSystemFingerprint(), asToolCallId(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), buildResponsesCreateParams(), createResponsesAdapter() (+28 more)

### Community 52 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.07
Nodes (28): ChatModule, Module, HealthModule, Module, AnthropicModule, Module, AnthropicMessagesController, ApiSecurity (+20 more)

### Community 53 - "anthropic-models.controller.ts"
Cohesion: 0.22
Nodes (12): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+4 more)

### Community 54 - "app-metrics-backend.interface.ts"
Cohesion: 0.18
Nodes (10): AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels, RateLimitReason (+2 more)

### Community 55 - "CompanyContextRepository"
Cohesion: 0.06
Nodes (49): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema (+41 more)

### Community 56 - "env.validation.ts"
Cohesion: 0.22
Nodes (4): CACHE_BACKEND_TYPE, CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment

### Community 57 - "ModelAlias"
Cohesion: 0.07
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 58 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.09
Nodes (19): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty (+11 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.18
Nodes (23): Body, Patch, AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto (+15 more)

### Community 62 - "semantic-cache.service.ts"
Cohesion: 0.07
Nodes (25): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema() (+17 more)

### Community 63 - "api-error.code.ts"
Cohesion: 0.17
Nodes (12): ApiErrorCode, ApiErrorPayload, readGatewayKeyHeader(), getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), readAnthropicApiKey() (+4 more)

### Community 64 - "prisma-feedback.adapter.ts"
Cohesion: 0.24
Nodes (5): Inject, FeedbackEntry, FeedbackRepository, PrismaFeedbackAdapter, Injectable

### Community 65 - "feedback.types.ts"
Cohesion: 0.16
Nodes (11): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_BODY_MAX, FEEDBACK_REPOSITORY, CreateFeedbackDto, IsIn, IsOptional (+3 more)

### Community 66 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 67 - "types/index.ts"
Cohesion: 0.14
Nodes (26): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+18 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "configure-swagger.ts"
Cohesion: 0.43
Nodes (5): bootstrap(), parseCorsOrigins(), configureHttpApp(), ACCESS_COOKIE_NAME, buildSwaggerConfig()

### Community 70 - "RedisConnectionService"
Cohesion: 0.30
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 71 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 72 - "provider-instances.bootstrap.ts"
Cohesion: 0.25
Nodes (10): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, openAiCompatibleApiSurface (+2 more)

### Community 73 - "auth.module.ts"
Cohesion: 0.06
Nodes (45): InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase, Inject (+37 more)

### Community 74 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 75 - "http-metrics.interceptor.ts"
Cohesion: 0.23
Nodes (9): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, httpRequestDurationSeconds, httpRequestsTotal, metricsRegistry (+1 more)

### Community 76 - "DomainException"
Cohesion: 0.10
Nodes (20): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, hashPassword(), validatePasswordPolicy(), isContentStartCommand() (+12 more)

### Community 77 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.10
Nodes (24): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+16 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 82 - "openai-chat-completions.controller.ts"
Cohesion: 0.16
Nodes (22): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+14 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 85 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 86 - "RunsController"
Cohesion: 0.08
Nodes (27): HitlDto, IsArray, IsString, ListRunsQueryDto, IsIn, IsInt, IsOptional, IsString (+19 more)

### Community 88 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 89 - "api-fetch.ts"
Cohesion: 0.27
Nodes (9): apiFetch(), ApiFetchOptions, parseBody(), refreshSession(), toApiError(), UnauthorizedHandler, ApiError, ApiErrorEnvelope (+1 more)

### Community 90 - "wizard-orchestrator.service.ts"
Cohesion: 0.06
Nodes (59): KeyGenerateCommand, Command, Option, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema (+51 more)

### Community 91 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 92 - "auth.api.ts"
Cohesion: 0.33
Nodes (11): bootstrapAdmin(), Credentials, fetchBootstrapStatus(), loginWithPassword(), logoutSession(), parseAuthUserWrapper(), parseSessionUser(), SessionUser (+3 more)

### Community 93 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 94 - ".create"
Cohesion: 0.22
Nodes (7): FeedbackController, ApiCookieAuth, ApiTags, Body, Controller, HttpCode, Post

### Community 96 - "acceptInvite"
Cohesion: 0.32
Nodes (5): AcceptInvitePageProps, acceptInvite(), AcceptInviteForm(), onSubmit(), passwordMeetsPolicy()

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 103 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 104 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 105 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 106 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 107 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 108 - "ModelRemoveCommand"
Cohesion: 0.18
Nodes (6): ModelRemoveCommand, Command, Option, ProviderRemoveCommand, Command, Option

### Community 109 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 116 - "AppMetricsService"
Cohesion: 0.09
Nodes (6): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable, HttpMethod

### Community 119 - "session-provider.tsx"
Cohesion: 0.21
Nodes (9): geistMono, geistSans, metadata, fetchUserSession(), SessionContext, SessionContextValue, SessionProvider(), SessionState (+1 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 126 - "home-entry.tsx"
Cohesion: 0.43
Nodes (3): HomeEntry(), useSession(), Skeleton()

### Community 128 - "login-card.tsx"
Cohesion: 0.20
Nodes (10): AcceptInviteFormProps, Card(), CardContent(), CardHeader(), CardTitle(), EnvelopeError(), FormField(), FormFieldProps (+2 more)

## Knowledge Gaps
- **292 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+287 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1001 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DomainException` connect `DomainException` to `social.types.ts`, `llm-hop.ts`, `prisma-run.adapter.ts`, `api/src/app.module.ts`, `auth.module.ts`, `runs.controller.ts`, `http-metrics.interceptor.ts`, `UserRepository`, `auth.controller.ts`, `InvitationsController`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `swagger.setup.ts`, `response-cache.service.ts`, `ai-provider-gateway/src/health/health.service.ts`, `chat.service.ts`, `RedisConnectionService`, `resilient-executor.ts`, `logging.service.ts`, `provider-instances.bootstrap.ts`, `ProviderInstancesBootstrap`, `app-metrics.service.ts`, `branded.types.ts`, `responses.adapter.ts`, `filters/http-exception.filter.ts`, `anthropic/anthropic-tools.mapper.ts`, `typed-config.ts`, `GatewayKey`, `redis-vector-store.adapter.ts`, `semantic-cache.service.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `prisma-run.adapter.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _292 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06472892187177902 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.045800341561869275 - nodes in this community are weakly interconnected._
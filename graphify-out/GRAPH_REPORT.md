# Graph Report - content-chain  (2026-09-16)

## Corpus Check
- 564 files · ~158,786 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 6, .css 1)

## Summary
- 3655 nodes · 11248 edges · 129 communities (108 shown, 16 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 363 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1ef7cf87`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cli.module.ts
- social.types.ts
- content.types.ts
- resolve-provider-call-options.ts
- PrismaService
- DomainException
- app-metrics.service.ts
- LogContext
- PrometheusAppMetricsAdapter
- provider-error.mapper.ts
- content.graph.ts
- wizard-orchestrator.service.ts
- social.graph.ts
- branded.types.ts
- chat.service.ts
- models.controller.ts
- anthropic-response.mapper.ts
- configuration-validation.service.ts
- model-manager.service.ts
- configuration.ts
- sentry-ai-metrics.adapter.ts
- ProviderApiKey
- anthropic-messages.controller.ts
- anthropic/anthropic-tools.mapper.ts
- asProviderInstanceId
- redis-cache.adapter.ts
- getAppConfig
- AuthController
- save-output-edited.use-case.ts
- redis-vector-store.adapter.ts
- cache.module.ts
- openai-stream.mapper.ts
- swagger.setup.ts
- RunRepository
- AnthropicMessagesRequestDto
- semantic-cache.service.ts
- api-error.code.ts
- enums.ts
- types/index.ts
- feedback.types.ts
- api/src/app.module.ts
- config-generator.service.ts
- openai-models.controller.ts
- ids.ts
- MetricsController
- users.controller.ts
- .create
- responses.adapter.ts
- GatewayConfig
- HealthController
- auth.module.ts
- ai-provider-gateway/src/app.module.ts
- anthropic-models.controller.ts
- ChatToolingDto
- company-context.controller.ts
- InvitationsController
- ModelAlias
- HealthService
- HealthController
- ChatParamsDto
- company-context.dto.ts
- LoggingService
- RedisConnectionService
- exitWithAgentReport
- create-feedback.use-case.ts
- CompanyContextRepository
- OpenAiChatCompletionRequestDto
- should-include-redis-stack.ts
- ai-provider-gateway/src/health/health.service.ts
- metrics.ts
- prisma-invitation.adapter.ts
- OpenAiChatMessageDto
- prisma-company-context.adapter.ts
- AuthUserContext
- UserRepository
- company-context.schemas.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- SPEC — README
- runs.controller.ts
- http-metrics.interceptor.ts
- StartRunDto
- api-fetch.ts
- EnvironmentVariables
- auth.api.ts
- start-run.use-case.ts
- openai-params-provider.mapper.ts
- HttpExceptionFilter
- acceptInvite
- route.ts
- ProviderAddCommand
- ChatResponseDto
- ClientAddCommand
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- ProviderEditCommand
- RefreshSessionRepository
- openai-chat-completion-response.dto.ts
- ModelRemoveCommand
- ProviderRemoveCommand
- CompanyContextController
- HttpMetricsMiddleware
- ConfigInitCommand
- session-provider.tsx
- dialog.tsx
- RolesGuard
- Architektura
- brand.ts
- home-entry.tsx
- login-card.tsx
- InMemoryRunSseHub
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
5. `DomainException` - 66 edges
6. `GatewayConfig` - 65 edges
7. `GatewayKey` - 59 edges
8. `ClientId` - 54 edges
9. `ChatRequestDto` - 48 edges
10. `AppMetricsService` - 46 edges

## Surprising Connections (you probably didn't know these)
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `logoutSession()` --calls--> `apiFetch()`  [EXTRACTED]
  apps/frontend/src/modules/auth/api/auth.api.ts → apps/frontend/src/shared/api/api-fetch.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (129 total, 16 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.06
Nodes (58): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), resolveCliMode() (+50 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (36): CompositeRunResultReader, GetRunOutput, orderItemsBySelectedIds(), Inject, OutputEditedWrite, OutputEditedWriter, RUN_RESULT_READER, RunResultReader (+28 more)

### Community 2 - "content.types.ts"
Cohesion: 0.09
Nodes (28): ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject, Injectable (+20 more)

### Community 3 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 4 - "PrismaService"
Cohesion: 0.14
Nodes (5): PrismaModule, Global, Module, PrismaService, Injectable

### Community 5 - "DomainException"
Cohesion: 0.09
Nodes (26): AcceptInviteResult, acceptInviteSchema, hashPassword(), BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand (+18 more)

### Community 6 - "app-metrics.service.ts"
Cohesion: 0.14
Nodes (15): healthStatusToGaugeValue(), APP_METRICS_BACKEND, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+7 more)

### Community 7 - "LogContext"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 8 - "PrometheusAppMetricsAdapter"
Cohesion: 0.09
Nodes (7): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope, AppRequestLabels, AppTokenUsage

### Community 9 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 10 - "content.graph.ts"
Cohesion: 0.11
Nodes (36): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+28 more)

### Community 11 - "wizard-orchestrator.service.ts"
Cohesion: 0.05
Nodes (64): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), KeyGenerateCommand, Command, Option (+56 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (29): coercePassNoteVerdict(), isPassOnlyIssue(), verifierOutputSchema, canRefine(), MAX_REFINE, nextRefineCount(), isTwoStageSocialTask(), createContentWriterNode() (+21 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.09
Nodes (43): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, SseMetaPayload, SseMetaPayloadDto, ApiProperty (+35 more)

### Community 14 - "chat.service.ts"
Cohesion: 0.06
Nodes (48): SemanticStoreEmbedState, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize (+40 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.13
Nodes (25): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+17 more)

### Community 17 - "configuration-validation.service.ts"
Cohesion: 0.12
Nodes (17): CACHE_BACKEND_TYPE, CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, buildEffectiveGatewayConfig() (+9 more)

### Community 18 - "model-manager.service.ts"
Cohesion: 0.11
Nodes (28): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), defaultModelPolicy(), ModelEditField, ModelManagerService (+20 more)

### Community 19 - "configuration.ts"
Cohesion: 0.12
Nodes (21): asCacheTtlSeconds(), asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration() (+13 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (33): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+25 more)

### Community 21 - "ProviderApiKey"
Cohesion: 0.18
Nodes (9): ProviderTestCommand, Command, Option, CliAiProvider, ProviderTestService, Injectable, ProviderCli, BaseUrl (+1 more)

### Community 22 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (62): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+54 more)

### Community 23 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.10
Nodes (37): asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic() (+29 more)

### Community 24 - "asProviderInstanceId"
Cohesion: 0.12
Nodes (31): collectPendingSecrets(), EnvPatchValue, ProviderPromptResult, ProviderPromptService, Injectable, validateProviderApiKey(), defaultBaseUrlForOpenAiProviderType(), normalizeCliProviderBaseUrl() (+23 more)

### Community 25 - "redis-cache.adapter.ts"
Cohesion: 0.14
Nodes (9): NoOpCacheBackend, Injectable, RedisCacheAdapter, Injectable, CacheRegistryService, Injectable, CacheBackend, CacheKey (+1 more)

### Community 26 - "getAppConfig"
Cohesion: 0.16
Nodes (12): readGatewayKeyHeader(), getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable (+4 more)

### Community 27 - "AuthController"
Cohesion: 0.09
Nodes (27): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+19 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.08
Nodes (34): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+26 more)

### Community 29 - "redis-vector-store.adapter.ts"
Cohesion: 0.07
Nodes (35): isUnservableCachedReply(), CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, EmbeddingCircuitBreaker (+27 more)

### Community 30 - "cache.module.ts"
Cohesion: 0.16
Nodes (10): NoopCacheModule, Module, RedisCacheModule, Module, CacheModule, CacheModuleOptions, Module, CACHE_BACKEND (+2 more)

### Community 31 - "openai-stream.mapper.ts"
Cohesion: 0.31
Nodes (12): fromGatewayToolCallDto(), mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields(), buildToolCallsDelta() (+4 more)

### Community 32 - "swagger.setup.ts"
Cohesion: 0.10
Nodes (21): AppModule, Module, ChatOutputTextDto, ApiProperty, SseDeltaPayloadDto, ApiProperty, bootstrap(), API_GLOBAL_PREFIX (+13 more)

### Community 33 - "RunRepository"
Cohesion: 0.04
Nodes (43): GetRunLogsOutput, InProcessRunWorker, Inject, Injectable, ListRunsOutput, RecoverInterruptedRunsUseCase, Inject, Injectable (+35 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "semantic-cache.service.ts"
Cohesion: 0.12
Nodes (17): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, EmbeddingBackend, isSingleTurnUserRequest(), lastUserMessageText() (+9 more)

### Community 36 - "api-error.code.ts"
Cohesion: 0.17
Nodes (9): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch (+1 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "types/index.ts"
Cohesion: 0.08
Nodes (44): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+36 more)

### Community 39 - "feedback.types.ts"
Cohesion: 0.19
Nodes (8): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_BODY_MAX, FeedbackEntry, FeedbackRepository, PrismaFeedbackAdapter, Injectable

### Community 40 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (45): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, LlmModule, Module (+37 more)

### Community 41 - "config-generator.service.ts"
Cohesion: 0.14
Nodes (13): ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, ClientCli, EnvTemplateInput, generateEnvTemplate() (+5 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.12
Nodes (21): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 45 - "users.controller.ts"
Cohesion: 0.07
Nodes (28): ListUsersUseCase, Inject, Injectable, SoftDeleteUserUseCase, Inject, Injectable, PatchUserDto, ApiProperty (+20 more)

### Community 46 - ".create"
Cohesion: 0.20
Nodes (9): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 47 - "responses.adapter.ts"
Cohesion: 0.07
Nodes (66): toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), buildGenerationConfig(), createGoogleProvider() (+58 more)

### Community 48 - "GatewayConfig"
Cohesion: 0.07
Nodes (26): PendingSecretsItem, CliRateLimit, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService (+18 more)

### Community 49 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 51 - "auth.module.ts"
Cohesion: 0.05
Nodes (65): AcceptInviteUseCase, Inject, Injectable, comparePassword(), generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds() (+57 more)

### Community 52 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.07
Nodes (27): ChatModule, Module, HealthModule, Module, AnthropicModule, Module, IntegrationsModule, Module (+19 more)

### Community 53 - "anthropic-models.controller.ts"
Cohesion: 0.11
Nodes (22): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+14 more)

### Community 54 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 55 - "company-context.controller.ts"
Cohesion: 0.21
Nodes (14): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase (+6 more)

### Community 56 - "InvitationsController"
Cohesion: 0.13
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 57 - "ModelAlias"
Cohesion: 0.06
Nodes (9): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsService, Inject, Injectable (+1 more)

### Community 58 - "HealthService"
Cohesion: 0.15
Nodes (6): HealthReadinessResponseDto, ApiProperty, HealthService, Inject, Injectable, Optional

### Community 59 - "HealthController"
Cohesion: 0.11
Nodes (14): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+6 more)

### Community 60 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "LoggingService"
Cohesion: 0.04
Nodes (48): Inject, OllamaEmbeddingAdapter, Injectable, Inject, ChatErrorHandlerService, Injectable, ChatProviderCallService, Injectable (+40 more)

### Community 63 - "RedisConnectionService"
Cohesion: 0.30
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 64 - "exitWithAgentReport"
Cohesion: 0.17
Nodes (8): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), RemoveProviderInput

### Community 65 - "create-feedback.use-case.ts"
Cohesion: 0.13
Nodes (15): CreateFeedbackUseCase, Inject, Injectable, FEEDBACK_RUN_READER, FeedbackRunLookup, FeedbackRunReader, FEEDBACK_REPOSITORY, FeedbackController (+7 more)

### Community 67 - "CompanyContextRepository"
Cohesion: 0.16
Nodes (8): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (19): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+11 more)

### Community 69 - "should-include-redis-stack.ts"
Cohesion: 0.35
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 70 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.13
Nodes (17): EMBEDDING_BACKEND, VECTOR_STORE, RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto (+9 more)

### Community 71 - "metrics.ts"
Cohesion: 0.07
Nodes (42): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+34 more)

### Community 73 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 74 - "OpenAiChatMessageDto"
Cohesion: 0.16
Nodes (12): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+4 more)

### Community 75 - "prisma-company-context.adapter.ts"
Cohesion: 0.16
Nodes (15): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+7 more)

### Community 76 - "AuthUserContext"
Cohesion: 0.11
Nodes (20): isRecord(), ListRunsUserItem, ListRunsUserOutput, isTerminalStatus(), RunsController, ApiCookieAuth, ApiTags, Body (+12 more)

### Community 77 - "UserRepository"
Cohesion: 0.09
Nodes (14): Inject, Inject, Inject, Inject, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult, UserForAuth (+6 more)

### Community 78 - "company-context.schemas.ts"
Cohesion: 0.33
Nodes (5): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.11
Nodes (22): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+14 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "runs.controller.ts"
Cohesion: 0.05
Nodes (39): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsUseCase, Inject, Injectable, GetRunUseCase, Inject (+31 more)

### Community 85 - "http-metrics.interceptor.ts"
Cohesion: 0.11
Nodes (18): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+10 more)

### Community 88 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 89 - "api-fetch.ts"
Cohesion: 0.27
Nodes (9): apiFetch(), ApiFetchOptions, parseBody(), refreshSession(), toApiError(), UnauthorizedHandler, ApiError, ApiErrorEnvelope (+1 more)

### Community 91 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 92 - "auth.api.ts"
Cohesion: 0.33
Nodes (11): bootstrapAdmin(), Credentials, fetchBootstrapStatus(), loginWithPassword(), logoutSession(), parseAuthUserWrapper(), parseSessionUser(), SessionUser (+3 more)

### Community 93 - "start-run.use-case.ts"
Cohesion: 0.10
Nodes (23): hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialStartRunSchema, startRunCommandSchema (+15 more)

### Community 94 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 96 - "acceptInvite"
Cohesion: 0.32
Nodes (5): AcceptInvitePageProps, acceptInvite(), AcceptInviteForm(), onSubmit(), passwordMeetsPolicy()

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "ChatResponseDto"
Cohesion: 0.11
Nodes (20): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, ChatUsageDto, ApiPropertyOptional (+12 more)

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

### Community 109 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 110 - "RefreshSessionRepository"
Cohesion: 0.10
Nodes (9): Inject, Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter (+1 more)

### Community 111 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 115 - "CompanyContextController"
Cohesion: 0.15
Nodes (9): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller, Get, Patch (+1 more)

### Community 117 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

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

### Community 129 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

## Knowledge Gaps
- **298 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+293 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1012 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `swagger.setup.ts`, `semantic-cache.service.ts`, `api-error.code.ts`, `types/index.ts`, `ai-provider-gateway/src/health/health.service.ts`, `LogContext`, `branded.types.ts`, `chat.service.ts`, `responses.adapter.ts`, `anthropic/anthropic-tools.mapper.ts`, `redis-cache.adapter.ts`, `HealthService`, `redis-vector-store.adapter.ts`, `RedisConnectionService`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `cli.module.ts`, `exitWithAgentReport`, `wizard-orchestrator.service.ts`, `chat.service.ts`, `models.controller.ts`, `configuration-validation.service.ts`, `model-manager.service.ts`, `configuration.ts`, `ProviderApiKey`, `asProviderInstanceId`, `LoggingService`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `DomainException` connect `DomainException` to `create-feedback.use-case.ts`, `content.types.ts`, `RunRepository`, `social.types.ts`, `api/src/app.module.ts`, `prisma-invitation.adapter.ts`, `AuthUserContext`, `UserRepository`, `users.controller.ts`, `auth.module.ts`, `http-metrics.interceptor.ts`, `save-output-edited.use-case.ts`, `start-run.use-case.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _298 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06472892187177902 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04706082229018009 - nodes in this community are weakly interconnected._
# Graph Report - content-chain  (2026-09-16)

## Corpus Check
- 564 files · ~158,881 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 6, .css 1)

## Summary
- 3659 nodes · 11252 edges · 141 communities (117 shown, 19 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 363 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `103ce247`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cli.module.ts
- social.types.ts
- content.types.ts
- api-error.code.ts
- PrismaService
- DomainException
- app-metrics-backend.interface.ts
- logging.service.ts
- PrometheusAppMetricsAdapter
- provider-error.mapper.ts
- llm-hop.ts
- wizard-orchestrator.service.ts
- social.graph.ts
- branded.types.ts
- GatewayKey
- ApiRequestIdHeader
- anthropic-messages.controller.ts
- configuration-validation.service.ts
- model-manager.service.ts
- configuration.ts
- sentry-ai-metrics.adapter.ts
- ProviderApiKey
- chat-stream.controller.ts
- anthropic/anthropic-tools.mapper.ts
- asProviderInstanceId
- response-cache.service.ts
- getAppConfig
- auth.controller.ts
- save-output-edited.use-case.ts
- redis-vector-store.adapter.ts
- semantic-cache.service.ts
- openai-chat-completions.controller.ts
- ai-provider-gateway/src/main.ts
- RunRepository
- AnthropicMessagesRequestDto
- ChatCacheIdentity
- filters/http-exception.filter.ts
- enums.ts
- types/index.ts
- create-feedback.use-case.ts
- api/src/app.module.ts
- config-generator.service.ts
- openai-models.controller.ts
- ids.ts
- app-metrics.service.ts
- users.controller.ts
- .create
- responses.adapter.ts
- GatewayConfig
- ai-provider-gateway/src/health/health.controller.ts
- prisma-run.adapter.ts
- auth.module.ts
- ai-provider-gateway/src/app.module.ts
- anthropic-models.controller.ts
- swagger.setup.ts
- company-context.controller.ts
- InvitationsController
- ModelAlias
- HealthService
- HealthController
- ChatParamsDto
- company-context.dto.ts
- chat.service.ts
- LoggingService
- exitWithAgentReport
- CreateFeedbackUseCase
- google-tools.mapper.ts
- CompanyContext
- OpenAiChatCompletionRequestDto
- should-include-redis-stack.ts
- health-readiness-response.dto.ts
- metrics.ts
- AppMetricsBackend
- prisma-invitation.adapter.ts
- OpenAiChatMessageDto
- prisma-company-context.adapter.ts
- RunsController
- UserRepository
- company-context.mapper.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- AnthropicContentBlockDto
- provider-instances.bootstrap.ts
- SPEC — README
- ListRunsQueryDto
- http-metrics.interceptor.ts
- .completions
- StartRunDto
- api-fetch.ts
- anthropic.module.ts
- EnvironmentVariables
- auth.api.ts
- start-run.use-case.ts
- openai-params-provider.mapper.ts
- HttpExceptionFilter
- acceptInvite
- route.ts
- .createMessage
- ProviderAddCommand
- ChatWarningDto
- config-validator.ts
- prisma.feedback-run-reader.adapter.ts
- ClientAddCommand
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- ActiveStreamsTracker
- ProviderEditCommand
- RefreshSessionRepository
- gateway-key.guard.branded-types.test-d.ts
- ModelRemoveCommand
- ProviderRemoveCommand
- CompanyContextController
- AppMetricsService
- ConfigInitCommand
- AppProviderStreamScope
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
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `logoutSession()` --calls--> `apiFetch()`  [EXTRACTED]
  apps/frontend/src/modules/auth/api/auth.api.ts → apps/frontend/src/shared/api/api-fetch.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (141 total, 19 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.06
Nodes (58): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), resolveCliMode() (+50 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (26): CompositeRunResultReader, GetRunOutput, RunResultReader, ContentBrief, SocialBrief, EmptyRunResultReader, Injectable, SocialResultStore (+18 more)

### Community 2 - "content.types.ts"
Cohesion: 0.08
Nodes (20): toOutcome(), ContentPipelineInput, ContentPipelineOutcome, ContentPipelineState, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection (+12 more)

### Community 3 - "api-error.code.ts"
Cohesion: 0.14
Nodes (18): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, ApiErrorCode, ApiErrorPayload, mapAnthropicRequestToGateway() (+10 more)

### Community 4 - "PrismaService"
Cohesion: 0.11
Nodes (9): FeedbackModule, Module, PrismaFeedbackAdapter, Injectable, PrismaModule, Global, Module, PrismaService (+1 more)

### Community 5 - "DomainException"
Cohesion: 0.06
Nodes (49): Injectable, updateEmailSchema, UpdateMeEmailUseCase, JwtPayload, UserListItem, FinalizeReviewUseCase, Injectable, GetRunLogsOutput (+41 more)

### Community 6 - "app-metrics-backend.interface.ts"
Cohesion: 0.13
Nodes (10): healthStatusToGaugeValue(), AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod, HttpRequestLabels (+2 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.06
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (6): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppRequestLabels, AppTokenUsage

### Community 9 - "provider-error.mapper.ts"
Cohesion: 0.19
Nodes (20): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 10 - "llm-hop.ts"
Cohesion: 0.07
Nodes (54): CompanyContextRepository, ContentPipelineFacade, Inject, Injectable, Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput (+46 more)

### Community 11 - "wizard-orchestrator.service.ts"
Cohesion: 0.05
Nodes (64): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), KeyGenerateCommand, Command, Option (+56 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (34): loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType (+26 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.11
Nodes (37): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, SseMetaPayload, mapStopReasonToFinishReason(), CompleteOnceResult (+29 more)

### Community 14 - "GatewayKey"
Cohesion: 0.07
Nodes (45): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+37 more)

### Community 15 - "ApiRequestIdHeader"
Cohesion: 0.10
Nodes (23): ApiGatewayModelsErrorResponses(), ApiRequestIdHeader(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse (+15 more)

### Community 16 - "anthropic-messages.controller.ts"
Cohesion: 0.08
Nodes (37): GATEWAY_CACHE_HEADER, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDoneEvent (+29 more)

### Community 17 - "configuration-validation.service.ts"
Cohesion: 0.19
Nodes (6): CACHE_BACKEND_TYPE, configurationValidation, ConfigurationValidationService, CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment

### Community 18 - "model-manager.service.ts"
Cohesion: 0.11
Nodes (28): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), defaultModelPolicy(), ModelEditField, ModelManagerService (+20 more)

### Community 19 - "configuration.ts"
Cohesion: 0.14
Nodes (22): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration(), buildEffectiveGatewayConfig() (+14 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (33): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+25 more)

### Community 21 - "ProviderApiKey"
Cohesion: 0.18
Nodes (9): ProviderTestCommand, Command, Option, CliAiProvider, ProviderTestService, Injectable, ProviderCli, BaseUrl (+1 more)

### Community 22 - "chat-stream.controller.ts"
Cohesion: 0.06
Nodes (35): ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body, Controller (+27 more)

### Community 23 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (43): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS (+35 more)

### Community 24 - "asProviderInstanceId"
Cohesion: 0.12
Nodes (31): collectPendingSecrets(), EnvPatchValue, ProviderPromptResult, ProviderPromptService, Injectable, validateProviderApiKey(), defaultBaseUrlForOpenAiProviderType(), normalizeCliProviderBaseUrl() (+23 more)

### Community 25 - "response-cache.service.ts"
Cohesion: 0.10
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 26 - "getAppConfig"
Cohesion: 0.17
Nodes (11): getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable, OpenAiBearerAuthGuard (+3 more)

### Community 27 - "auth.controller.ts"
Cohesion: 0.05
Nodes (61): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken() (+53 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (33): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+25 more)

### Community 29 - "redis-vector-store.adapter.ts"
Cohesion: 0.14
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 30 - "semantic-cache.service.ts"
Cohesion: 0.08
Nodes (22): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema() (+14 more)

### Community 31 - "openai-chat-completions.controller.ts"
Cohesion: 0.16
Nodes (22): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+14 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "RunRepository"
Cohesion: 0.04
Nodes (23): Inject, Inject, Inject, InProcessRunWorker, Inject, Injectable, Inject, Inject (+15 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 35 - "ChatCacheIdentity"
Cohesion: 0.22
Nodes (9): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), ChatCacheIdentity (+1 more)

### Community 36 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "types/index.ts"
Cohesion: 0.08
Nodes (44): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+36 more)

### Community 39 - "create-feedback.use-case.ts"
Cohesion: 0.22
Nodes (8): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FEEDBACK_BODY_MAX, FEEDBACK_REPOSITORY, FeedbackEntry, FeedbackRepository

### Community 40 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (45): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, ContentRunExecutor, isCanonicalOutlineSelection() (+37 more)

### Community 41 - "config-generator.service.ts"
Cohesion: 0.14
Nodes (13): ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, ClientCli, EnvTemplateInput, generateEnvTemplate() (+5 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.service.ts"
Cohesion: 0.13
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

### Community 45 - "users.controller.ts"
Cohesion: 0.06
Nodes (31): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Inject (+23 more)

### Community 46 - ".create"
Cohesion: 0.20
Nodes (9): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 47 - "responses.adapter.ts"
Cohesion: 0.09
Nodes (42): toHttpException(), asSystemFingerprint(), asToolCallId(), ProviderAssistantTurn, ProviderChatTurn, ProviderToolDefinition, ProviderToolResultTurn, ChatCompletionsAdapterOptions (+34 more)

### Community 48 - "GatewayConfig"
Cohesion: 0.07
Nodes (26): PendingSecretsItem, CliRateLimit, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService (+18 more)

### Community 49 - "ai-provider-gateway/src/health/health.controller.ts"
Cohesion: 0.17
Nodes (10): HealthLivenessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get (+2 more)

### Community 50 - "prisma-run.adapter.ts"
Cohesion: 0.11
Nodes (12): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, assertTransition(), PrismaRunAdapter, RunLogRow, RunReviewFields (+4 more)

### Community 51 - "auth.module.ts"
Cohesion: 0.07
Nodes (39): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+31 more)

### Community 52 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.10
Nodes (17): LoggingModule, Global, Module, AppMetricsModule, Global, Module, ProviderInstancesBootstrap, Injectable (+9 more)

### Community 53 - "anthropic-models.controller.ts"
Cohesion: 0.11
Nodes (22): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+14 more)

### Community 54 - "swagger.setup.ts"
Cohesion: 0.08
Nodes (26): ChatOutputTextDto, ApiProperty, ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional (+18 more)

### Community 55 - "company-context.controller.ts"
Cohesion: 0.14
Nodes (16): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+8 more)

### Community 56 - "InvitationsController"
Cohesion: 0.11
Nodes (14): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+6 more)

### Community 57 - "ModelAlias"
Cohesion: 0.13
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, TokenDirection

### Community 58 - "HealthService"
Cohesion: 0.21
Nodes (4): HealthReadinessResponseDto, ApiProperty, HealthService, Injectable

### Community 59 - "HealthController"
Cohesion: 0.11
Nodes (14): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+6 more)

### Community 60 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "chat.service.ts"
Cohesion: 0.06
Nodes (35): CachedChatResponseWithConversation, createInProcessSingleflight(), getResolvedSystemPrompts(), SYSTEM_PROMPT_SECTION_JOINER, ChatErrorHandlerService, Injectable, ChatProviderCallService, Injectable (+27 more)

### Community 63 - "LoggingService"
Cohesion: 0.07
Nodes (17): RedisConnectionService, Injectable, Inject, SemanticCacheService, Inject, Injectable, VectorStore, isRedisRequiredFromConfig() (+9 more)

### Community 64 - "exitWithAgentReport"
Cohesion: 0.17
Nodes (8): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), RemoveProviderInput

### Community 65 - "CreateFeedbackUseCase"
Cohesion: 0.22
Nodes (7): CreateFeedbackUseCase, Inject, Injectable, FeedbackController, ApiCookieAuth, ApiTags, Controller

### Community 66 - "google-tools.mapper.ts"
Cohesion: 0.15
Nodes (23): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+15 more)

### Community 67 - "CompanyContext"
Cohesion: 0.35
Nodes (3): CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (19): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+11 more)

### Community 69 - "should-include-redis-stack.ts"
Cohesion: 0.35
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 70 - "health-readiness-response.dto.ts"
Cohesion: 0.33
Nodes (8): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional

### Community 71 - "metrics.ts"
Cohesion: 0.10
Nodes (32): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+24 more)

### Community 73 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 74 - "OpenAiChatMessageDto"
Cohesion: 0.16
Nodes (12): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+4 more)

### Community 75 - "prisma-company-context.adapter.ts"
Cohesion: 0.16
Nodes (15): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+7 more)

### Community 76 - "RunsController"
Cohesion: 0.11
Nodes (20): HitlDto, IsArray, IsString, PatchRunRatingDto, IsIn, ValidateIf, isTerminalStatus(), RunsController (+12 more)

### Community 77 - "UserRepository"
Cohesion: 0.10
Nodes (15): Inject, MeUseCase, Inject, Injectable, Inject, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult (+7 more)

### Community 78 - "company-context.mapper.ts"
Cohesion: 0.33
Nodes (5): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.12
Nodes (21): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+13 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "AnthropicContentBlockDto"
Cohesion: 0.14
Nodes (14): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+6 more)

### Community 82 - "provider-instances.bootstrap.ts"
Cohesion: 0.27
Nodes (10): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+2 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 85 - "http-metrics.interceptor.ts"
Cohesion: 0.11
Nodes (18): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+10 more)

### Community 86 - ".completions"
Cohesion: 0.13
Nodes (13): OpenAiChatCompletionsController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags, Body (+5 more)

### Community 88 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 89 - "api-fetch.ts"
Cohesion: 0.27
Nodes (9): apiFetch(), ApiFetchOptions, parseBody(), refreshSession(), toApiError(), UnauthorizedHandler, ApiError, ApiErrorEnvelope (+1 more)

### Community 90 - "anthropic.module.ts"
Cohesion: 0.21
Nodes (10): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+2 more)

### Community 91 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 92 - "auth.api.ts"
Cohesion: 0.33
Nodes (11): bootstrapAdmin(), Credentials, fetchBootstrapStatus(), loginWithPassword(), logoutSession(), parseAuthUserWrapper(), parseSessionUser(), SessionUser (+3 more)

### Community 93 - "start-run.use-case.ts"
Cohesion: 0.09
Nodes (25): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+17 more)

### Community 94 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 96 - "acceptInvite"
Cohesion: 0.32
Nodes (5): AcceptInvitePageProps, acceptInvite(), AcceptInviteForm(), onSubmit(), passwordMeetsPolicy()

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - ".createMessage"
Cohesion: 0.20
Nodes (9): ApiHeader, ApiBody, ApiOperation, ApiProduces, ApiResponse, Body, Post, Req (+1 more)

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "ChatWarningDto"
Cohesion: 0.24
Nodes (9): ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDonePayloadDto, SseDoneUsageDto, ApiPropertyOptional (+1 more)

### Community 101 - "config-validator.ts"
Cohesion: 0.33
Nodes (7): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, EXPECTED_SCHEMA_VERSION

### Community 102 - "prisma.feedback-run-reader.adapter.ts"
Cohesion: 0.33
Nodes (4): FeedbackRunLookup, FeedbackRunReader, PrismaFeedbackRunReaderAdapter, Injectable

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

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 115 - "CompanyContextController"
Cohesion: 0.14
Nodes (11): toCompanyContext(), toPartialCompanyContext(), CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller (+3 more)

### Community 116 - "AppMetricsService"
Cohesion: 0.14
Nodes (4): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable

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
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1016 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `logging.service.ts`, `provider-error.mapper.ts`, `branded.types.ts`, `GatewayKey`, `anthropic/anthropic-tools.mapper.ts`, `response-cache.service.ts`, `redis-vector-store.adapter.ts`, `semantic-cache.service.ts`, `ai-provider-gateway/src/main.ts`, `ChatCacheIdentity`, `filters/http-exception.filter.ts`, `types/index.ts`, `responses.adapter.ts`, `ai-provider-gateway/src/app.module.ts`, `swagger.setup.ts`, `HealthService`, `chat.service.ts`, `google-tools.mapper.ts`, `provider-instances.bootstrap.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `cli.module.ts`, `exitWithAgentReport`, `config-validator.ts`, `wizard-orchestrator.service.ts`, `GatewayKey`, `ApiRequestIdHeader`, `configuration-validation.service.ts`, `model-manager.service.ts`, `configuration.ts`, `ProviderApiKey`, `asProviderInstanceId`, `chat.service.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `asProviderInstanceId` to `cli.module.ts`, `exitWithAgentReport`, `types/index.ts`, `metrics.ts`, `provider-error.mapper.ts`, `wizard-orchestrator.service.ts`, `branded.types.ts`, `GatewayKey`, `ApiRequestIdHeader`, `GatewayConfig`, `model-manager.service.ts`, `configuration.ts`, `provider-instances.bootstrap.ts`, `ProviderApiKey`, `anthropic/anthropic-tools.mapper.ts`, `chat.service.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _298 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06472892187177902 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05696636925188744 - nodes in this community are weakly interconnected._
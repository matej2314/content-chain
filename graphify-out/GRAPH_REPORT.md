# Graph Report - content-chain  (2026-09-11)

## Corpus Check
- 537 files · ~148,791 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3485 nodes · 10827 edges · 135 communities (118 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 362 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `32d7b264`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- social.types.ts
- cli.module.ts
- wizard-orchestrator.service.ts
- DomainException
- social.graph.ts
- .info
- chat.service.ts
- branded.types.ts
- api/src/app.module.ts
- auth.module.ts
- asProviderInstanceId
- responses.adapter.ts
- ModelManagerService
- LogContext
- sentry-ai-metrics.adapter.ts
- getAppConfig
- anthropic-messages.controller.ts
- AppMetricsBackend
- llm-hop.ts
- RedisVectorStoreAdapter
- ProviderInstanceId
- PrismaService
- SemanticCacheService
- resolve-provider-call-options.ts
- prisma-invitation.adapter.ts
- social-pipeline.facade.ts
- anthropic/anthropic-tools.mapper.ts
- AnthropicMessagesRequestDto
- HealthService
- ai-provider-gateway/src/health/health.service.ts
- runs.module.ts
- users.controller.ts
- RunRepository
- provider-error.mapper.ts
- start-run.use-case.ts
- cache.module.ts
- types/index.ts
- UserRepository
- StartRunDto
- models.controller.ts
- LoggingService
- AuthController
- enums.ts
- GatewayModelsCatalogService
- openai-models.controller.ts
- auth.schemas.ts
- openai-params-provider.mapper.ts
- ai-provider-gateway/src/app.module.ts
- in-process-run.worker.ts
- ids.ts
- RunRecord
- PrometheusAppMetricsAdapter
- ChatParamsDto
- swagger.setup.ts
- company-context.controller.ts
- AuthUserContext
- provider-registry.service.ts
- NoopAppMetricsAdapter
- anthropic-models.controller.ts
- configuration-validation.service.ts
- app-metrics.service.ts
- anthropic-response.mapper.ts
- InvitationsController
- redis-vector-store.adapter.ts
- getAppConfigOrThrow
- anthropic.module.ts
- company-context.dto.ts
- llm-gateway.http.adapter.ts
- app-metrics-backend.interface.ts
- chat-params.dto.ts
- provider-instances.bootstrap.ts
- CompanyContextRepository
- prisma-company-context.adapter.ts
- ai-provider-gateway/src/health/health.controller.ts
- OpenAiChatCompletionRequestDto
- ChatToolingDto
- HealthController
- EnvPatchService
- semantic-cache.service.ts
- prisma-run.adapter.ts
- http-metrics.interceptor.ts
- SmartRateLimiterService
- CompanyContextController
- AppMetricsService
- RedisConnectionService
- PrometheusService
- SPEC — README
- metrics.module.ts
- runs.controller.ts
- filters/http-exception.filter.ts
- LlmGatewayHttpAdapter
- openai-chat-message.dto.ts
- env.validation.ts
- run.port.ts
- ConfigInitCommand
- anthropic-exception.filter.ts
- ProviderAddCommand
- api-error.code.ts
- readClientGatewayKey.ts
- openai-chat-completion-request.dto.ts
- OpenAiChatMessageDto
- metrics.ts
- ClientAddCommand
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- ModelRemoveCommand
- ProviderEditCommand
- ProviderRemoveCommand
- configure-swagger.ts
- InMemoryRunSseHub
- HttpExceptionFilter
- openai-auth.decorator.ts
- company-context.mapper.ts
- public.decorator.ts
- openai-messages.mapper.ts
- ErrorReportingBackend
- ActiveStreamsTracker
- layout.tsx
- button.tsx
- Architektura
- brand.ts
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
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `ResponseCacheService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/response-cache.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `OllamaEmbeddingAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/semantic/adapters/ollama-embedding.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (135 total, 15 thin omitted)

### Community 0 - "social.types.ts"
Cohesion: 0.06
Nodes (26): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore (+18 more)

### Community 1 - "cli.module.ts"
Cohesion: 0.07
Nodes (59): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+51 more)

### Community 2 - "wizard-orchestrator.service.ts"
Cohesion: 0.06
Nodes (67): PendingSecretsItem, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema (+59 more)

### Community 3 - "DomainException"
Cohesion: 0.12
Nodes (17): AcceptInviteResult, acceptInviteSchema, hashPassword(), ReactivateUserUseCase, Injectable, validatePasswordPolicy(), orderItemsBySelectedIds(), RateRunUseCase (+9 more)

### Community 4 - "social.graph.ts"
Cohesion: 0.08
Nodes (50): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), Inject, coerceVerifierIssue(), ContentOutput, contentOutputSchema, IdeasOutput (+42 more)

### Community 5 - ".info"
Cohesion: 0.10
Nodes (13): toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), WizardState, ConfigGeneratorService, Injectable, FileManagerService (+5 more)

### Community 6 - "chat.service.ts"
Cohesion: 0.05
Nodes (60): SemanticStoreEmbedState, ChatService, Injectable, ChatStreamController, ApiBody, ApiOperation, ApiProduces, ApiResponse (+52 more)

### Community 7 - "branded.types.ts"
Cohesion: 0.09
Nodes (47): serializeCallParamsForCache(), CachedChatResponse, CachedChatWarning, CachedFinishReason, CacheIdentityMessage, ChatCacheSource, ChatResponseData, SseMetaPayload (+39 more)

### Community 8 - "api/src/app.module.ts"
Cohesion: 0.08
Nodes (34): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind() (+26 more)

### Community 9 - "auth.module.ts"
Cohesion: 0.07
Nodes (48): AcceptInviteUseCase, Injectable, comparePassword(), generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), AuthTokenResult (+40 more)

### Community 10 - "asProviderInstanceId"
Cohesion: 0.05
Nodes (65): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, collectPendingSecrets(), DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens() (+57 more)

### Community 11 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (66): toCachedChatResponse(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls() (+58 more)

### Community 12 - "ModelManagerService"
Cohesion: 0.11
Nodes (9): ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, ModelManagerService, Injectable, RemoveModelInput, isLastModelInConfig(), ValidationFormatter (+1 more)

### Community 13 - "LogContext"
Cohesion: 0.09
Nodes (16): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable, parseLogLevel(), LogContext (+8 more)

### Community 14 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.11
Nodes (27): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+19 more)

### Community 15 - "getAppConfig"
Cohesion: 0.25
Nodes (8): resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), enrichRequestWithClientId(), readAnthropicApiKey(), readAuthorizationHeader(), readBearerToken(), RateLimitResult

### Community 16 - "anthropic-messages.controller.ts"
Cohesion: 0.06
Nodes (42): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+34 more)

### Community 18 - "llm-hop.ts"
Cohesion: 0.09
Nodes (45): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+37 more)

### Community 19 - "RedisVectorStoreAdapter"
Cohesion: 0.22
Nodes (7): RedisVectorStoreAdapter, Injectable, isRedisSearchIndexAlreadyExistsError(), isRedisSearchMissingIndexError(), isRedisSearchModuleMissingError(), redisSearchErrorMessage(), semanticSchemaFtCreateArgs()

### Community 20 - "ProviderInstanceId"
Cohesion: 0.08
Nodes (33): assertInteractiveAllowed(), ProviderTestCommand, ProviderTestOptions, Command, Option, ProviderPromptResult, ProviderPromptService, Injectable (+25 more)

### Community 21 - "PrismaService"
Cohesion: 0.05
Nodes (32): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+24 more)

### Community 22 - "SemanticCacheService"
Cohesion: 0.17
Nodes (10): computeSystemSignature(), hashCallParams(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), SemanticCacheService, Injectable (+2 more)

### Community 23 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 24 - "prisma-invitation.adapter.ts"
Cohesion: 0.10
Nodes (22): Inject, InvitationListItem, RevokeInvitationUseCase, Inject, Injectable, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput (+14 more)

### Community 25 - "social-pipeline.facade.ts"
Cohesion: 0.18
Nodes (13): isSocialRunRecord(), SocialPipelineFacade, toOutcome(), Injectable, SocialRunExecutor, Inject, Injectable, SOCIAL_RESULT_STORE (+5 more)

### Community 26 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.08
Nodes (41): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, toHttpException(), asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel (+33 more)

### Community 27 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 28 - "HealthService"
Cohesion: 0.18
Nodes (5): HealthReadinessResponseDto, HealthService, Inject, Injectable, Optional

### Community 29 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.24
Nodes (11): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+3 more)

### Community 30 - "runs.module.ts"
Cohesion: 0.11
Nodes (19): GetRunLogsOutput, GetRunLogsUseCase, Injectable, GetRunUseCase, Injectable, RunDispatchExecutor, runIdSchema, RUN_EXECUTOR (+11 more)

### Community 31 - "users.controller.ts"
Cohesion: 0.10
Nodes (19): ListUsersUseCase, Inject, Injectable, SoftDeleteUserUseCase, Injectable, PatchUserDto, ApiProperty, IsBoolean (+11 more)

### Community 32 - "RunRepository"
Cohesion: 0.06
Nodes (16): FinalizeReviewUseCase, Inject, Injectable, FlagOutputEditedUseCase, Inject, Injectable, Inject, Inject (+8 more)

### Community 33 - "provider-error.mapper.ts"
Cohesion: 0.29
Nodes (15): MappedProviderError, isAuthError(), isClientError(), isProviderRateLimitError(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+7 more)

### Community 34 - "start-run.use-case.ts"
Cohesion: 0.12
Nodes (22): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+14 more)

### Community 35 - "cache.module.ts"
Cohesion: 0.10
Nodes (16): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+8 more)

### Community 36 - "types/index.ts"
Cohesion: 0.07
Nodes (46): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+38 more)

### Community 37 - "UserRepository"
Cohesion: 0.05
Nodes (23): Inject, Inject, Inject, Inject, MeUseCase, Inject, Injectable, Inject (+15 more)

### Community 38 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 39 - "models.controller.ts"
Cohesion: 0.12
Nodes (20): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+12 more)

### Community 40 - "LoggingService"
Cohesion: 0.11
Nodes (11): CacheRegistryService, Injectable, Inject, LoggingService, Injectable, ProviderInstancesBootstrap, Injectable, ProviderRegistryService (+3 more)

### Community 41 - "AuthController"
Cohesion: 0.09
Nodes (26): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Post (+18 more)

### Community 42 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 43 - "GatewayModelsCatalogService"
Cohesion: 0.14
Nodes (12): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+4 more)

### Community 44 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 45 - "auth.schemas.ts"
Cohesion: 0.29
Nodes (6): BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema

### Community 46 - "openai-params-provider.mapper.ts"
Cohesion: 0.08
Nodes (33): ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDonePayloadDto, SseDoneUsageDto, ApiPropertyOptional (+25 more)

### Community 47 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.06
Nodes (37): CacheModule, Module, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot (+29 more)

### Community 48 - "in-process-run.worker.ts"
Cohesion: 0.15
Nodes (13): Inject, RecoverInterruptedRunsUseCase, Inject, Injectable, RunLifecycleService, TransitionExtras, Inject, Injectable (+5 more)

### Community 49 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 50 - "RunRecord"
Cohesion: 0.18
Nodes (3): InProcessRunWorker, Injectable, RunRecord

### Community 51 - "PrometheusAppMetricsAdapter"
Cohesion: 0.10
Nodes (6): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 52 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 53 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (23): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+15 more)

### Community 54 - "company-context.controller.ts"
Cohesion: 0.21
Nodes (12): toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase (+4 more)

### Community 55 - "AuthUserContext"
Cohesion: 0.06
Nodes (34): InviteUserDto, ApiProperty, IsEmail, isRecord(), Body, HttpCode, Post, CreateFeedbackDto (+26 more)

### Community 56 - "provider-registry.service.ts"
Cohesion: 0.18
Nodes (12): CompleteOnceResult, ChatValidationService, Injectable, ModelId, GatewayCapabilitiesConfig, GatewayParamsConfig, AIProvider, ProviderToolCall (+4 more)

### Community 58 - "anthropic-models.controller.ts"
Cohesion: 0.22
Nodes (12): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+4 more)

### Community 59 - "configuration-validation.service.ts"
Cohesion: 0.11
Nodes (21): ConfigValidateCommand, Command, Option, CliGatewayValidatorService, CliValidateOptions, Injectable, collectInactiveProviderWarnings(), formatZodIssues() (+13 more)

### Community 60 - "app-metrics.service.ts"
Cohesion: 0.14
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

### Community 61 - "anthropic-response.mapper.ts"
Cohesion: 0.07
Nodes (50): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDoneEvent, fromGatewayToolCallDto() (+42 more)

### Community 62 - "InvitationsController"
Cohesion: 0.13
Nodes (13): ListInvitationsUseCase, Inject, Injectable, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 63 - "redis-vector-store.adapter.ts"
Cohesion: 0.28
Nodes (13): isUnservableCachedReply(), parseCachedChatResponse(), escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits(), VectorSearchHit, VectorStoreKnnInput (+5 more)

### Community 64 - "getAppConfigOrThrow"
Cohesion: 0.12
Nodes (6): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, VectorStore, getAppConfigOrThrow()

### Community 65 - "anthropic.module.ts"
Cohesion: 0.19
Nodes (10): ChatModule, Module, GatewayKeyGuard, Injectable, AnthropicModule, Module, OpenAiModule, Module (+2 more)

### Community 66 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 67 - "llm-gateway.http.adapter.ts"
Cohesion: 0.16
Nodes (18): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+10 more)

### Community 68 - "app-metrics-backend.interface.ts"
Cohesion: 0.21
Nodes (11): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+3 more)

### Community 69 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 70 - "provider-instances.bootstrap.ts"
Cohesion: 0.22
Nodes (13): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryContext (+5 more)

### Community 71 - "CompanyContextRepository"
Cohesion: 0.16
Nodes (8): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 72 - "prisma-company-context.adapter.ts"
Cohesion: 0.16
Nodes (15): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+7 more)

### Community 73 - "ai-provider-gateway/src/health/health.controller.ts"
Cohesion: 0.20
Nodes (8): HealthLivenessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 74 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 75 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 76 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 77 - "EnvPatchService"
Cohesion: 0.14
Nodes (8): ConfigSecretsStatusCommand, Command, Option, KeyGenerateCommand, Command, Option, EnvPatchService, Injectable

### Community 78 - "semantic-cache.service.ts"
Cohesion: 0.12
Nodes (16): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+8 more)

### Community 79 - "prisma-run.adapter.ts"
Cohesion: 0.09
Nodes (14): LightRunItem, ListRunsResult, RunSnapshot, ContentRunRecord, RunLogEntry, ALLOWED, assertTransition(), PrismaRunAdapter (+6 more)

### Community 80 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 81 - "SmartRateLimiterService"
Cohesion: 0.10
Nodes (14): SmartRateLimitGuard, Injectable, AnthropicMessagesController, ApiSecurity, ApiTags, Controller, AnthropicAuth(), OpenAiChatCompletionsController (+6 more)

### Community 82 - "CompanyContextController"
Cohesion: 0.29
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 83 - "AppMetricsService"
Cohesion: 0.11
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable, HttpMethod

### Community 84 - "RedisConnectionService"
Cohesion: 0.27
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 85 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 86 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 87 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 88 - "runs.controller.ts"
Cohesion: 0.10
Nodes (19): ListRunsUserItem, ListRunsUserOutput, ListRunsUserUseCase, Injectable, HitlDto, IsArray, IsString, ListRunsQueryDto (+11 more)

### Community 89 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 90 - "LlmGatewayHttpAdapter"
Cohesion: 0.27
Nodes (4): LlmGatewayError, LlmGatewayHttpAdapter, Inject, Injectable

### Community 91 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 92 - "env.validation.ts"
Cohesion: 0.10
Nodes (15): CACHE_BACKEND_TYPE, CACHE_BACKEND_VALUES, EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional (+7 more)

### Community 93 - "run.port.ts"
Cohesion: 0.27
Nodes (7): ListRunsOutput, ListRunsUseCase, Inject, Injectable, ListRunsQuery, PAGE_SIZE, RunStartedBy

### Community 94 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 95 - "anthropic-exception.filter.ts"
Cohesion: 0.27
Nodes (5): isInvalidRequestStatus(), AnthropicExceptionFilter, Catch, AnthropicApiKeyGuard, Injectable

### Community 96 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 97 - "api-error.code.ts"
Cohesion: 0.39
Nodes (3): ApiErrorCode, ApiErrorPayload, UnsupportedProviderException

### Community 98 - "readClientGatewayKey.ts"
Cohesion: 0.33
Nodes (4): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader()

### Community 100 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 101 - "metrics.ts"
Cohesion: 0.08
Nodes (40): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+32 more)

### Community 102 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 103 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 104 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 105 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 106 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 107 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 108 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 109 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 110 - "configure-swagger.ts"
Cohesion: 0.16
Nodes (12): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+4 more)

### Community 111 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 112 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 113 - "openai-auth.decorator.ts"
Cohesion: 0.28
Nodes (4): OpenAiExceptionFilter, Catch, OpenAiBearerAuthGuard, Injectable

### Community 114 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 115 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 116 - "openai-messages.mapper.ts"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 117 - "ErrorReportingBackend"
Cohesion: 0.12
Nodes (6): NoopErrorReportingAdapter, Injectable, SentryErrorReportingAdapter, Injectable, ErrorReportingBackend, Inject

### Community 120 - "layout.tsx"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 121 - "button.tsx"
Cohesion: 0.70
Nodes (3): Button(), buttonVariants, cn()

### Community 126 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

## Knowledge Gaps
- **270 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+265 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 935 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DomainException` connect `DomainException` to `RunRepository`, `start-run.use-case.ts`, `UserRepository`, `api/src/app.module.ts`, `auth.module.ts`, `prisma-run.adapter.ts`, `http-metrics.interceptor.ts`, `in-process-run.worker.ts`, `HttpExceptionFilter`, `llm-hop.ts`, `PrismaService`, `AuthUserContext`, `prisma-invitation.adapter.ts`, `social-pipeline.facade.ts`, `runs.controller.ts`, `runs.module.ts`, `users.controller.ts`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `chat.service.ts`, `branded.types.ts`, `responses.adapter.ts`, `LogContext`, `getAppConfig`, `RedisVectorStoreAdapter`, `SemanticCacheService`, `anthropic/anthropic-tools.mapper.ts`, `HealthService`, `ai-provider-gateway/src/health/health.service.ts`, `provider-error.mapper.ts`, `cache.module.ts`, `types/index.ts`, `swagger.setup.ts`, `provider-registry.service.ts`, `redis-vector-store.adapter.ts`, `getAppConfigOrThrow`, `provider-instances.bootstrap.ts`, `semantic-cache.service.ts`, `SmartRateLimiterService`, `RedisConnectionService`, `filters/http-exception.filter.ts`, `ErrorReportingBackend`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ProviderInstanceId` to `cli.module.ts`, `wizard-orchestrator.service.ts`, `.info`, `chat.service.ts`, `branded.types.ts`, `asProviderInstanceId`, `LogContext`, `sentry-ai-metrics.adapter.ts`, `AppMetricsBackend`, `types/index.ts`, `models.controller.ts`, `GatewayModelsCatalogService`, `PrometheusAppMetricsAdapter`, `provider-registry.service.ts`, `NoopAppMetricsAdapter`, `app-metrics.service.ts`, `app-metrics-backend.interface.ts`, `AppMetricsService`, `metrics.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _270 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05542283803153368 - nodes in this community are weakly interconnected._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0694949494949495 - nodes in this community are weakly interconnected._
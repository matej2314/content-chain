# Graph Report - content-chain  (2026-09-15)

## Corpus Check
- 539 files · ~153,000 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 8, .css 1)

## Summary
- 3495 nodes · 10886 edges · 133 communities (117 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 362 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `39446631`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cli.module.ts
- social.types.ts
- content.graph.ts
- UserRepository
- RunRepository
- chat.service.ts
- wizard-orchestrator.service.ts
- logging.module.ts
- runs.controller.ts
- exitWithAgentReport
- llm-hop.ts
- GatewayConfig
- social.graph.ts
- branded.types.ts
- anthropic-messages.controller.ts
- api-error.code.ts
- anthropic-response.mapper.ts
- DomainException
- EnvRef
- LoggingService
- sentry-ai-metrics.adapter.ts
- agent-answers.schema.ts
- ModelAlias
- anthropic/anthropic-tools.mapper.ts
- asProviderInstanceId
- response-cache.service.ts
- configuration.types.ts
- resolve-provider-call-options.ts
- openai-params-provider.mapper.ts
- redis-vector-store.adapter.ts
- models.controller.ts
- provider-error.mapper.ts
- swagger.setup.ts
- configuration.ts
- AnthropicMessagesRequestDto
- semantic-cache.service.ts
- openai-messages.mapper.ts
- enums.ts
- types/index.ts
- AuthController
- api/src/app.module.ts
- config-generator.service.ts
- openai-models.controller.ts
- ids.ts
- app-metrics.module.ts
- prisma-invitation.adapter.ts
- users.controller.ts
- PrometheusAppMetricsAdapter
- ProviderApiKey
- ai-provider-gateway/src/app.module.ts
- configuration-validation.service.ts
- responses.adapter.ts
- anthropic.module.ts
- anthropic-models.controller.ts
- app-metrics.service.ts
- company-context.controller.ts
- llm-gateway.http.adapter.ts
- AppMetricsService
- ai-provider-gateway/src/health/health.service.ts
- HealthController
- prisma-company-context.adapter.ts
- company-context.dto.ts
- semantic-cache.constants.ts
- getAppConfig
- CompanyContextRepository
- PrismaService
- ConfigInitCommand
- invitations.controller.ts
- OpenAiChatCompletionRequestDto
- env.schema.ts
- RedisConnectionService
- ChatToolingDto
- provider-instances.bootstrap.ts
- auth.module.ts
- provider-input.ts
- http-metrics.interceptor.ts
- start-run.use-case.ts
- metrics.module.ts
- company-context.schemas.ts
- OllamaEmbeddingAdapter
- PrometheusService
- create-feedback.use-case.ts
- openai-chat-completion-response.dto.ts
- SPEC — README
- GlobalExceptionFilter
- PrismaRefreshSessionAdapter
- LlmGatewayHttpAdapter
- prisma-feedback.adapter.ts
- StartRunDto
- session.types.ts
- gateway-config.schema.ts
- EnvironmentVariables
- InMemoryRunSseHub
- chat-params.dto.ts
- ChatParamsDto
- config-validator.ts
- feedback.controller.ts
- should-include-redis-stack.ts
- CompanyContextController
- ProviderAddCommand
- HealthController
- OpenAiChatMessageDto
- feedback.types.ts
- ClientAddCommand
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- ModelRemoveCommand
- ProviderEditCommand
- ProviderRemoveCommand
- VectorStore
- JwtCookieStrategy
- gateway-key.guard.branded-types.test-d.ts
- openai-chat-message.dto.ts
- layout.tsx
- button.tsx
- public.decorator.ts
- openai-chat-completion-request.dto.ts
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
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `ResponseCacheService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/response-cache.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (133 total, 14 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.06
Nodes (47): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), PendingSecretsItem, collectPendingSecrets(), CliMode, CliModeFlags (+39 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (27): CompositeRunResultReader, GetRunOutput, RunResultReader, ContentBrief, SocialBrief, EmptyRunResultReader, Injectable, toInputJson() (+19 more)

### Community 2 - "content.graph.ts"
Cohesion: 0.07
Nodes (46): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+38 more)

### Community 3 - "UserRepository"
Cohesion: 0.08
Nodes (17): Inject, MeUseCase, Inject, Injectable, Inject, AuthUser, JwtPayload, UserListItem (+9 more)

### Community 4 - "RunRepository"
Cohesion: 0.03
Nodes (59): GetRunUseCase, Inject, Injectable, InProcessRunWorker, Inject, Injectable, ListRunsOutput, RecoverInterruptedRunsUseCase (+51 more)

### Community 5 - "chat.service.ts"
Cohesion: 0.05
Nodes (65): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+57 more)

### Community 6 - "wizard-orchestrator.service.ts"
Cohesion: 0.10
Nodes (29): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertModel() (+21 more)

### Community 7 - "logging.module.ts"
Cohesion: 0.07
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, SentryErrorReportingAdapter, Injectable (+14 more)

### Community 8 - "runs.controller.ts"
Cohesion: 0.04
Nodes (52): FinalizeReviewUseCase, Inject, Injectable, FlagOutputEditedUseCase, Inject, Injectable, ListRunsUseCase, Inject (+44 more)

### Community 9 - "exitWithAgentReport"
Cohesion: 0.26
Nodes (5): exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), markAgentRuntime(), resolveCliMode()

### Community 10 - "llm-hop.ts"
Cohesion: 0.27
Nodes (8): isRetryable(), RetryReason, ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid(), repairSuffix()

### Community 11 - "GatewayConfig"
Cohesion: 0.05
Nodes (44): REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS (+36 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.08
Nodes (53): LlmHopService, Injectable, renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), Inject, coerceVerifierIssue(), ContentOutput (+45 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.10
Nodes (41): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, mapStopReasonToFinishReason(), buildAppProviderMetricsContext(), mapProviderResponseToUsage(), CompleteOnceResult (+33 more)

### Community 14 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (62): ApiHeader, ChatCacheSource, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity (+54 more)

### Community 15 - "api-error.code.ts"
Cohesion: 0.24
Nodes (6): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, UnsupportedProviderException, PayloadTooLargeError, RequestWithId

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.08
Nodes (43): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDoneEvent, fromGatewayToolCallDto() (+35 more)

### Community 17 - "DomainException"
Cohesion: 0.09
Nodes (25): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, hashPassword(), BootstrapAdminInput, bootstrapAdminSchema, LoginInput (+17 more)

### Community 18 - "EnvRef"
Cohesion: 0.16
Nodes (8): KeyGenerateCommand, Command, Option, EnvPatchService, Injectable, EnvRef, MissingProviderApiKey, ProviderFactoryContext

### Community 19 - "LoggingService"
Cohesion: 0.09
Nodes (13): Inject, Inject, PinoLoggerAdapter, Injectable, LogContext, LoggingService, Injectable, ProviderInstancesBootstrap (+5 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (29): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+21 more)

### Community 21 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 22 - "ModelAlias"
Cohesion: 0.06
Nodes (7): ProviderTestOptions, CliAiModel, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 23 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.11
Nodes (36): asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic() (+28 more)

### Community 24 - "asProviderInstanceId"
Cohesion: 0.12
Nodes (34): assertInteractiveAllowed(), convertProvider(), ProviderPromptResult, ProviderPromptService, Injectable, AddProviderInput, RemoveProviderInput, validateProviderApiKey() (+26 more)

### Community 25 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 26 - "configuration.types.ts"
Cohesion: 0.14
Nodes (11): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), ResolvedGatewayClient, SmartRateLimitGuard, Injectable (+3 more)

### Community 27 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 28 - "openai-params-provider.mapper.ts"
Cohesion: 0.14
Nodes (22): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapStopSequences(), OpenAiSharedChatCompletionParams (+14 more)

### Community 29 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (24): isUnservableCachedReply(), CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag() (+16 more)

### Community 30 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 31 - "provider-error.mapper.ts"
Cohesion: 0.19
Nodes (20): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 32 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (23): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+15 more)

### Community 33 - "configuration.ts"
Cohesion: 0.16
Nodes (15): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, BuildEffectiveGatewayConfigOptions, readRequiredPrompt() (+7 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "semantic-cache.service.ts"
Cohesion: 0.12
Nodes (19): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs() (+11 more)

### Community 36 - "openai-messages.mapper.ts"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "types/index.ts"
Cohesion: 0.08
Nodes (46): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+38 more)

### Community 39 - "AuthController"
Cohesion: 0.09
Nodes (27): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Post (+19 more)

### Community 40 - "api/src/app.module.ts"
Cohesion: 0.08
Nodes (41): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind() (+33 more)

### Community 41 - "config-generator.service.ts"
Cohesion: 0.13
Nodes (14): isRedisRequired(), ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, ClientCli, EnvTemplateInput (+6 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.module.ts"
Cohesion: 0.09
Nodes (15): Inject, Optional, resolveAppMetricsBackend(), Inject, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse (+7 more)

### Community 45 - "prisma-invitation.adapter.ts"
Cohesion: 0.13
Nodes (19): Inject, InvitationListItem, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, INVITATION_REPOSITORY, InvitationListRecord (+11 more)

### Community 46 - "users.controller.ts"
Cohesion: 0.08
Nodes (22): ListUsersUseCase, Inject, Injectable, SoftDeleteUserUseCase, Inject, Injectable, PatchUserDto, ApiProperty (+14 more)

### Community 47 - "PrometheusAppMetricsAdapter"
Cohesion: 0.13
Nodes (4): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppTokenUsage

### Community 48 - "ProviderApiKey"
Cohesion: 0.21
Nodes (6): ProviderTestCommand, Command, Option, ProviderTestService, Injectable, ProviderApiKey

### Community 49 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.13
Nodes (13): HealthModule, Module, IntegrationsModule, Module, ProviderRegistryModule, Global, Module, ProvidersModule (+5 more)

### Community 50 - "configuration-validation.service.ts"
Cohesion: 0.19
Nodes (6): assertEnabledProviderSecretsPresent(), configurationValidation, ConfigurationValidationService, CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment

### Community 51 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (73): mapProviderResponseToAiObservation(), toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), getUsageMetadata() (+65 more)

### Community 52 - "anthropic.module.ts"
Cohesion: 0.12
Nodes (16): ChatModule, Module, AnthropicModule, Module, AnthropicMessagesController, ApiSecurity, ApiTags, Controller (+8 more)

### Community 53 - "anthropic-models.controller.ts"
Cohesion: 0.11
Nodes (23): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+15 more)

### Community 54 - "app-metrics.service.ts"
Cohesion: 0.18
Nodes (13): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus (+5 more)

### Community 55 - "company-context.controller.ts"
Cohesion: 0.21
Nodes (14): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase (+6 more)

### Community 56 - "llm-gateway.http.adapter.ts"
Cohesion: 0.16
Nodes (18): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+10 more)

### Community 57 - "AppMetricsService"
Cohesion: 0.10
Nodes (6): HttpMetricsMiddleware, Injectable, ActiveStreamsTracker, Injectable, AppMetricsService, Injectable

### Community 58 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.10
Nodes (19): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty (+11 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "prisma-company-context.adapter.ts"
Cohesion: 0.16
Nodes (15): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+7 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "semantic-cache.constants.ts"
Cohesion: 0.14
Nodes (11): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+3 more)

### Community 63 - "getAppConfig"
Cohesion: 0.17
Nodes (11): getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable, OpenAiBearerAuthGuard (+3 more)

### Community 64 - "CompanyContextRepository"
Cohesion: 0.16
Nodes (8): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 65 - "PrismaService"
Cohesion: 0.16
Nodes (5): PrismaModule, Global, Module, PrismaService, Injectable

### Community 66 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 67 - "invitations.controller.ts"
Cohesion: 0.06
Nodes (27): InviteUserUseCase, Inject, Injectable, ListInvitationsUseCase, Inject, Injectable, RevokeInvitationUseCase, Inject (+19 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "env.schema.ts"
Cohesion: 0.17
Nodes (11): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+3 more)

### Community 70 - "RedisConnectionService"
Cohesion: 0.30
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 71 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 72 - "provider-instances.bootstrap.ts"
Cohesion: 0.27
Nodes (10): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+2 more)

### Community 73 - "auth.module.ts"
Cohesion: 0.07
Nodes (44): comparePassword(), generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), AuthTokenResult, BootstrapAdminUseCase, Inject (+36 more)

### Community 74 - "provider-input.ts"
Cohesion: 0.07
Nodes (40): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+32 more)

### Community 75 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 76 - "start-run.use-case.ts"
Cohesion: 0.12
Nodes (17): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, StartRunUseCase, Injectable, makeContentRun() (+9 more)

### Community 77 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 78 - "company-context.schemas.ts"
Cohesion: 0.33
Nodes (5): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema

### Community 79 - "OllamaEmbeddingAdapter"
Cohesion: 0.24
Nodes (3): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "create-feedback.use-case.ts"
Cohesion: 0.24
Nodes (8): FEEDBACK_RUN_READER, FeedbackRunLookup, FeedbackRunReader, FEEDBACK_REPOSITORY, FeedbackModule, Module, PrismaFeedbackRunReaderAdapter, Injectable

### Community 82 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "GlobalExceptionFilter"
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 85 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 86 - "LlmGatewayHttpAdapter"
Cohesion: 0.27
Nodes (4): LlmGatewayError, LlmGatewayHttpAdapter, Inject, Injectable

### Community 87 - "prisma-feedback.adapter.ts"
Cohesion: 0.24
Nodes (5): Inject, FeedbackEntry, FeedbackRepository, PrismaFeedbackAdapter, Injectable

### Community 88 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 89 - "session.types.ts"
Cohesion: 0.31
Nodes (7): parseAuthUserWrapper(), parseSessionUser(), SessionUser, ApiError, ApiErrorEnvelope, isRecord(), parseApiErrorEnvelope()

### Community 90 - "gateway-config.schema.ts"
Cohesion: 0.09
Nodes (37): isRedisSearchTagSafeId(), convertClient(), convertRateLimit(), CliRateLimit, ClientManagerService, Injectable, KeyGeneratorService, Injectable (+29 more)

### Community 91 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 92 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 93 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 94 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 95 - "config-validator.ts"
Cohesion: 0.25
Nodes (11): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, buildEffectiveGatewayConfig(), loadGatewayConfigFromFile() (+3 more)

### Community 96 - "feedback.controller.ts"
Cohesion: 0.12
Nodes (15): CreateFeedbackUseCase, Injectable, FeedbackController, ApiCookieAuth, ApiTags, Body, Controller, HttpCode (+7 more)

### Community 97 - "should-include-redis-stack.ts"
Cohesion: 0.31
Nodes (10): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 98 - "CompanyContextController"
Cohesion: 0.15
Nodes (9): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller, Get, Patch (+1 more)

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 101 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 102 - "feedback.types.ts"
Cohesion: 0.38
Nodes (4): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_BODY_MAX

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
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 109 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 110 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 112 - "JwtCookieStrategy"
Cohesion: 0.33
Nodes (4): isRecord(), JwtCookieStrategy, Inject, Injectable

### Community 117 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 119 - "layout.tsx"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 120 - "button.tsx"
Cohesion: 0.70
Nodes (3): Button(), buttonVariants, cn()

### Community 122 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

## Knowledge Gaps
- **272 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+267 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 938 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DomainException` connect `DomainException` to `feedback.controller.ts`, `social.types.ts`, `UserRepository`, `invitations.controller.ts`, `RunRepository`, `api/src/app.module.ts`, `auth.module.ts`, `runs.controller.ts`, `http-metrics.interceptor.ts`, `start-run.use-case.ts`, `prisma-invitation.adapter.ts`, `users.controller.ts`, `llm-hop.ts`, `JwtCookieStrategy`, `create-feedback.use-case.ts`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `chat.service.ts`, `logging.module.ts`, `branded.types.ts`, `anthropic-messages.controller.ts`, `api-error.code.ts`, `anthropic/anthropic-tools.mapper.ts`, `response-cache.service.ts`, `configuration.types.ts`, `redis-vector-store.adapter.ts`, `provider-error.mapper.ts`, `swagger.setup.ts`, `semantic-cache.service.ts`, `types/index.ts`, `app-metrics.module.ts`, `responses.adapter.ts`, `ai-provider-gateway/src/health/health.service.ts`, `RedisConnectionService`, `provider-instances.bootstrap.ts`, `OllamaEmbeddingAdapter`, `GlobalExceptionFilter`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `cli.module.ts`, `chat.service.ts`, `wizard-orchestrator.service.ts`, `logging.module.ts`, `exitWithAgentReport`, `GatewayConfig`, `branded.types.ts`, `anthropic-messages.controller.ts`, `EnvRef`, `LoggingService`, `asProviderInstanceId`, `configuration.types.ts`, `models.controller.ts`, `configuration.ts`, `types/index.ts`, `config-generator.service.ts`, `PrometheusAppMetricsAdapter`, `ProviderApiKey`, `app-metrics.service.ts`, `AppMetricsService`, `gateway-config.schema.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _272 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05903866248693835 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.058050645007166744 - nodes in this community are weakly interconnected._
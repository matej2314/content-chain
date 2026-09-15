# Graph Report - content-chain  (2026-09-15)

## Corpus Check
- 557 files · ~156,239 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 6, .css 1)

## Summary
- 3602 nodes · 11055 edges · 137 communities (117 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 362 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bd67cae4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cli.module.ts
- social.types.ts
- content.graph.ts
- prisma-user.adapter.ts
- prisma-run.adapter.ts
- chat.service.ts
- openai-params-provider.mapper.ts
- logging.module.ts
- DomainException
- exitWithAgentReport
- llm-hop.ts
- asProviderInstanceId
- social.graph.ts
- branded.types.ts
- chat-stream.controller.ts
- types/index.ts
- anthropic-response.mapper.ts
- auth.module.ts
- KeyGenerateCommand
- LoggingService
- sentry-ai-metrics.adapter.ts
- RunRepository
- AppMetricsBackend
- anthropic/anthropic-tools.mapper.ts
- gateway-config.schema.ts
- response-cache.service.ts
- GatewayKey
- chat-provider-call.service.ts
- RunRecord
- redis-vector-store.adapter.ts
- models.controller.ts
- provider-error.mapper.ts
- ai-provider-gateway/src/main.ts
- configuration.ts
- AnthropicMessagesRequestDto
- SemanticCacheService
- anthropic-messages.controller.ts
- enums.ts
- resilient-executor.ts
- AuthController
- api/src/app.module.ts
- config-generator.service.ts
- openai-models.controller.ts
- ids.ts
- app-metrics.module.ts
- prisma-invitation.adapter.ts
- users.controller.ts
- PrometheusAppMetricsAdapter
- EnvRef
- should-include-redis-stack.ts
- start-run.use-case.ts
- responses.adapter.ts
- ai-provider-gateway/src/app.module.ts
- anthropic-models.controller.ts
- app-metrics-backend.interface.ts
- company-context.controller.ts
- llm-gateway.http.adapter.ts
- ModelAlias
- HealthService
- HealthController
- prisma-company-context.adapter.ts
- company-context.dto.ts
- semantic-cache.service.ts
- getAppConfig
- CompanyContextRepository
- PrismaService
- ConfigInitCommand
- configuration.types.ts
- OpenAiChatCompletionRequestDto
- configure-swagger.ts
- RedisConnectionService
- swagger.setup.ts
- provider-instances.bootstrap.ts
- invite-user.use-case.ts
- ChatResponseDto
- http-metrics.interceptor.ts
- HttpExceptionFilter
- metrics.module.ts
- company-context.mapper.ts
- llm-gateway-chat.log.ts
- prometheus-app-metrics.adapter.ts
- feedback.module.ts
- openai-chat-completions.controller.ts
- SPEC — README
- filters/http-exception.filter.ts
- PrismaRefreshSessionAdapter
- AuthUserContext
- StartRunDto
- api-fetch.ts
- wizard-orchestrator.service.ts
- EnvironmentVariables
- auth.api.ts
- ChatParamsDto
- VectorStore
- openai-chat-completion-response.dto.ts
- ListRunsQueryDto
- route.ts
- CompanyContextController
- ProviderAddCommand
- ai-provider-gateway/src/health/health.controller.ts
- OpenAiChatMessageDto
- ActiveStreamsTracker
- ClientAddCommand
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- ModelRemoveCommand
- ProviderEditCommand
- ProviderRemoveCommand
- app-metrics.service.ts
- health-readiness-response.dto.ts
- HttpMethod
- AnthropicMessagesController
- session-provider.tsx
- dialog.tsx
- .completions
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
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (137 total, 15 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.07
Nodes (57): AgentReport, AgentReportStatus, PendingSecretsItem, loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers(), CliMode, CliModeFlags (+49 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (25): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson(), PipelineState (+17 more)

### Community 2 - "content.graph.ts"
Cohesion: 0.06
Nodes (51): ContentPipelineFacade, toOutcome(), Injectable, Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema (+43 more)

### Community 3 - "prisma-user.adapter.ts"
Cohesion: 0.16
Nodes (9): AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult, UserForAuth, CreateUserData, isUniqueConstraintViolation(), PrismaUserAdapter, Injectable (+1 more)

### Community 4 - "prisma-run.adapter.ts"
Cohesion: 0.10
Nodes (12): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, assertTransition(), PrismaRunAdapter, RunLogRow, RunReviewFields (+4 more)

### Community 5 - "chat.service.ts"
Cohesion: 0.06
Nodes (59): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+51 more)

### Community 6 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 7 - "logging.module.ts"
Cohesion: 0.07
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, SentryErrorReportingAdapter, Injectable (+14 more)

### Community 8 - "DomainException"
Cohesion: 0.06
Nodes (49): AcceptInviteResult, acceptInviteSchema, validatePasswordPolicy(), FinalizeReviewUseCase, Injectable, FlagOutputEditedUseCase, Injectable, GetRunLogsOutput (+41 more)

### Community 9 - "exitWithAgentReport"
Cohesion: 0.14
Nodes (9): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), Injectable (+1 more)

### Community 10 - "llm-hop.ts"
Cohesion: 0.22
Nodes (11): LLM_GATEWAY_PORT, isRetryable(), RetryReason, ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid() (+3 more)

### Community 11 - "asProviderInstanceId"
Cohesion: 0.09
Nodes (37): convertProvider(), ProviderPromptResult, ProviderPromptService, Injectable, ProviderManagerService, Injectable, AddProviderInput, EditProviderInput (+29 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.09
Nodes (49): renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput, contentOutputSchema, IdeasOutput, ideasOutputSchema (+41 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.12
Nodes (33): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, SseMetaPayload, SseMetaPayloadDto, ApiProperty (+25 more)

### Community 14 - "chat-stream.controller.ts"
Cohesion: 0.05
Nodes (41): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+33 more)

### Community 15 - "types/index.ts"
Cohesion: 0.16
Nodes (24): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+16 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 17 - "auth.module.ts"
Cohesion: 0.06
Nodes (51): AcceptInviteUseCase, Injectable, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds() (+43 more)

### Community 18 - "KeyGenerateCommand"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 19 - "LoggingService"
Cohesion: 0.08
Nodes (13): Inject, Inject, PinoLoggerAdapter, Injectable, LogContext, LoggingService, Injectable, ProviderInstancesBootstrap (+5 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (33): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+25 more)

### Community 21 - "RunRepository"
Cohesion: 0.04
Nodes (26): Inject, Inject, Inject, Inject, InProcessRunWorker, Inject, Injectable, Inject (+18 more)

### Community 23 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.06
Nodes (68): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens() (+60 more)

### Community 24 - "gateway-config.schema.ts"
Cohesion: 0.07
Nodes (43): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel() (+35 more)

### Community 25 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 26 - "GatewayKey"
Cohesion: 0.13
Nodes (12): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), GatewayKey, ResolvedGatewayClient, SmartRateLimitGuard (+4 more)

### Community 27 - "chat-provider-call.service.ts"
Cohesion: 0.08
Nodes (35): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns() (+27 more)

### Community 28 - "RunRecord"
Cohesion: 0.13
Nodes (14): ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Injectable, ContentPipelinePhase, RunDispatchExecutor, RUN_EXECUTOR, RunExecutorPort (+6 more)

### Community 29 - "redis-vector-store.adapter.ts"
Cohesion: 0.14
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 30 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 31 - "provider-error.mapper.ts"
Cohesion: 0.15
Nodes (22): ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError() (+14 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "configuration.ts"
Cohesion: 0.14
Nodes (22): asSemanticCacheTtlSeconds(), collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, buildAppConfiguration(), buildEffectiveGatewayConfig(), BuildEffectiveGatewayConfigOptions (+14 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "SemanticCacheService"
Cohesion: 0.16
Nodes (12): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), SemanticCacheService (+4 more)

### Community 36 - "anthropic-messages.controller.ts"
Cohesion: 0.10
Nodes (25): GATEWAY_CACHE_HEADER, ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength (+17 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 39 - "AuthController"
Cohesion: 0.09
Nodes (26): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Post (+18 more)

### Community 40 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (41): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, Inject, ContentModule (+33 more)

### Community 41 - "config-generator.service.ts"
Cohesion: 0.09
Nodes (12): ConfigGeneratorService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, FileManagerService, Injectable, generateEnvTemplate() (+4 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.11
Nodes (23): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam (+15 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.module.ts"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 45 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 46 - "users.controller.ts"
Cohesion: 0.08
Nodes (23): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Inject (+15 more)

### Community 47 - "PrometheusAppMetricsAdapter"
Cohesion: 0.16
Nodes (3): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend()

### Community 48 - "EnvRef"
Cohesion: 0.10
Nodes (18): ConfigSecretsStatusCommand, Command, Option, ProviderTestCommand, Command, Option, CliAiProvider, EnvPatchService (+10 more)

### Community 49 - "should-include-redis-stack.ts"
Cohesion: 0.15
Nodes (14): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+6 more)

### Community 50 - "start-run.use-case.ts"
Cohesion: 0.14
Nodes (19): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+11 more)

### Community 51 - "responses.adapter.ts"
Cohesion: 0.09
Nodes (43): toHttpException(), asSystemFingerprint(), asToolCallId(), ProviderAssistantTurn, ProviderChatInput, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionsAdapterOptions (+35 more)

### Community 52 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.10
Nodes (21): ChatModule, Module, HealthModule, Module, AnthropicModule, Module, IntegrationsModule, Module (+13 more)

### Community 53 - "anthropic-models.controller.ts"
Cohesion: 0.12
Nodes (21): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 54 - "app-metrics-backend.interface.ts"
Cohesion: 0.14
Nodes (7): AppProviderCallContext, AppProviderStreamScope, AppRequestMethod, AppRequestStatus, AppTokenUsage, RateLimitReason, SemanticCacheLookupResult

### Community 55 - "company-context.controller.ts"
Cohesion: 0.21
Nodes (12): toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase (+4 more)

### Community 56 - "llm-gateway.http.adapter.ts"
Cohesion: 0.14
Nodes (12): LlmGatewayError, GatewayChatResponse, GatewayErrorBody, LlmGatewayHttpAdapter, RETRYABLE_CODES, Inject, Injectable, LlmGatewayPort (+4 more)

### Community 57 - "ModelAlias"
Cohesion: 0.09
Nodes (9): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsService, Injectable, AppRequestLabels (+1 more)

### Community 58 - "HealthService"
Cohesion: 0.21
Nodes (3): HealthReadinessResponseDto, HealthService, Injectable

### Community 59 - "HealthController"
Cohesion: 0.11
Nodes (14): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+6 more)

### Community 60 - "prisma-company-context.adapter.ts"
Cohesion: 0.16
Nodes (15): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+7 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "semantic-cache.service.ts"
Cohesion: 0.08
Nodes (25): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema() (+17 more)

### Community 63 - "getAppConfig"
Cohesion: 0.18
Nodes (11): getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable, OpenAiBearerAuthGuard (+3 more)

### Community 64 - "CompanyContextRepository"
Cohesion: 0.16
Nodes (8): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 65 - "PrismaService"
Cohesion: 0.12
Nodes (6): Inject, FeedbackRepository, PrismaFeedbackAdapter, Injectable, PrismaService, Injectable

### Community 66 - "ConfigInitCommand"
Cohesion: 0.12
Nodes (10): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, CliValidateOptions (+2 more)

### Community 67 - "configuration.types.ts"
Cohesion: 0.17
Nodes (11): MaxConcurrentStreams, RateLimitBurst, RateLimitRps, AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig (+3 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (19): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+11 more)

### Community 69 - "configure-swagger.ts"
Cohesion: 0.18
Nodes (11): bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins(), validateEnv(), configureHttpApp() (+3 more)

### Community 70 - "RedisConnectionService"
Cohesion: 0.24
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 71 - "swagger.setup.ts"
Cohesion: 0.10
Nodes (23): ChatOutputTextDto, ApiProperty, ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional (+15 more)

### Community 72 - "provider-instances.bootstrap.ts"
Cohesion: 0.33
Nodes (8): GatewayProviderInstanceConfig, adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, FACTORIES

### Community 73 - "invite-user.use-case.ts"
Cohesion: 0.05
Nodes (39): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+31 more)

### Community 74 - "ChatResponseDto"
Cohesion: 0.12
Nodes (18): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, ChatWarningDto, ApiProperty (+10 more)

### Community 75 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 76 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 77 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 78 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 79 - "llm-gateway-chat.log.ts"
Cohesion: 0.26
Nodes (10): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmChatMessage (+2 more)

### Community 80 - "prometheus-app-metrics.adapter.ts"
Cohesion: 0.16
Nodes (6): healthStatusToGaugeValue(), HealthComponent, HealthStatus, PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "feedback.module.ts"
Cohesion: 0.19
Nodes (10): FEEDBACK_RUN_READER, FeedbackRunLookup, FeedbackRunReader, FeedbackModule, Module, PrismaFeedbackRunReaderAdapter, Injectable, PrismaModule (+2 more)

### Community 82 - "openai-chat-completions.controller.ts"
Cohesion: 0.23
Nodes (15): SseEvent, fromGatewayToolCallDto(), OPENAI_STREAM_API_DESCRIPTION, mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId() (+7 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 85 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 86 - "AuthUserContext"
Cohesion: 0.06
Nodes (39): CreateFeedbackUseCase, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_BODY_MAX, FEEDBACK_REPOSITORY, FeedbackEntry (+31 more)

### Community 88 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 89 - "api-fetch.ts"
Cohesion: 0.24
Nodes (10): logoutSession(), apiFetch(), ApiFetchOptions, parseBody(), refreshSession(), toApiError(), UnauthorizedHandler, ApiError (+2 more)

### Community 90 - "wizard-orchestrator.service.ts"
Cohesion: 0.06
Nodes (61): assertInteractiveAllowed(), WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema (+53 more)

### Community 91 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 92 - "auth.api.ts"
Cohesion: 0.42
Nodes (8): acceptInvite(), bootstrapAdmin(), Credentials, fetchBootstrapStatus(), parseAuthUserWrapper(), parseSessionUser(), SessionUser, isRecord()

### Community 93 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 94 - "VectorStore"
Cohesion: 0.22
Nodes (3): VectorStore, Inject, Optional

### Community 95 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 96 - "ListRunsQueryDto"
Cohesion: 0.25
Nodes (7): ListRunsQueryDto, IsIn, IsInt, IsOptional, IsString, Min, Type

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "CompanyContextController"
Cohesion: 0.29
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "ai-provider-gateway/src/health/health.controller.ts"
Cohesion: 0.21
Nodes (8): HealthLivenessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 101 - "OpenAiChatMessageDto"
Cohesion: 0.16
Nodes (12): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+4 more)

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

### Community 111 - "app-metrics.service.ts"
Cohesion: 0.21
Nodes (7): HealthCheckResult, HealthRedisCheckResult, APP_METRICS_BACKEND, HealthMetricsSnapshot, PreMetricsScrapeHook, PreMetricsScrapeRegistry, Injectable

### Community 115 - "health-readiness-response.dto.ts"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 116 - "HttpMethod"
Cohesion: 0.16
Nodes (4): HttpMetricsMiddleware, Injectable, HttpMethod, HttpRequestLabels

### Community 118 - "AnthropicMessagesController"
Cohesion: 0.40
Nodes (4): AnthropicMessagesController, ApiSecurity, ApiTags, Controller

### Community 119 - "session-provider.tsx"
Cohesion: 0.21
Nodes (9): geistMono, geistSans, metadata, fetchUserSession(), SessionContext, SessionContextValue, SessionProvider(), SessionState (+1 more)

### Community 121 - ".completions"
Cohesion: 0.14
Nodes (12): OpenAiChatCompletionsController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags, Body (+4 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 126 - "home-entry.tsx"
Cohesion: 0.31
Nodes (6): loginWithPassword(), HomeEntry(), LoginCard(), onSubmit(), useSession(), Skeleton()

### Community 128 - "login-card.tsx"
Cohesion: 0.18
Nodes (9): Card(), CardContent(), CardHeader(), CardTitle(), EnvelopeError(), FormField(), FormFieldProps, Input() (+1 more)

## Knowledge Gaps
- **290 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+285 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 998 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DomainException` connect `DomainException` to `prisma-user.adapter.ts`, `prisma-run.adapter.ts`, `api/src/app.module.ts`, `invite-user.use-case.ts`, `llm-hop.ts`, `http-metrics.interceptor.ts`, `HttpExceptionFilter`, `prisma-invitation.adapter.ts`, `users.controller.ts`, `auth.module.ts`, `start-run.use-case.ts`, `AuthUserContext`, `RunRecord`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `chat.service.ts`, `logging.module.ts`, `anthropic/anthropic-tools.mapper.ts`, `response-cache.service.ts`, `GatewayKey`, `chat-provider-call.service.ts`, `redis-vector-store.adapter.ts`, `provider-error.mapper.ts`, `ai-provider-gateway/src/main.ts`, `SemanticCacheService`, `resilient-executor.ts`, `responses.adapter.ts`, `HealthService`, `semantic-cache.service.ts`, `RedisConnectionService`, `swagger.setup.ts`, `provider-instances.bootstrap.ts`, `filters/http-exception.filter.ts`, `VectorStore`, `app-metrics.service.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `start-run.use-case.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _290 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.070271407532085 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.060240963855421686 - nodes in this community are weakly interconnected._
# Graph Report - content-chain  (2026-09-18)

## Corpus Check
- 601 files · ~171,580 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 3883 nodes · 11969 edges · 130 communities (117 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 373 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2d682b71`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- auth.module.ts
- social.types.ts
- api/company-context.types.ts
- cli.module.ts
- runs.types.ts
- start-run-form.tsx
- app-metrics-backend.interface.ts
- logging.service.ts
- anthropic/anthropic-tools.mapper.ts
- provider-error.mapper.ts
- llm-hop.ts
- asClientId
- social.graph.ts
- ai-provider.interface.ts
- semantic-cache.service.ts
- models.controller.ts
- anthropic-messages.controller.ts
- RedisVectorStoreAdapter
- model-manager.service.ts
- gateway-config.schema.ts
- sentry-ai-metrics.adapter.ts
- asProviderInstanceId
- chat-stream.controller.ts
- responses.adapter.ts
- login-card.tsx
- api/src/app.module.ts
- stream-cache-replay.service.ts
- auth.controller.ts
- save-output-edited.use-case.ts
- chat.service.ts
- PrismaService
- HealthService
- ai-provider-gateway/src/main.ts
- branded.types.ts
- AnthropicMessagesRequestDto
- LoggingService
- AppMetricsService
- enums.ts
- resilient-executor.ts
- provider-registry.service.ts
- RunRepository
- new-ids.ts
- openai-models.controller.ts
- ids.ts
- app-metrics.service.ts
- google-tools.mapper.ts
- ai-provider-gateway/src/health/health.service.ts
- anthropic-models.controller.ts
- config-generator.service.ts
- chat-params.dto.ts
- StartRunDto
- types/index.ts
- exitWithAgentReport
- redis-vector-store.adapter.ts
- swagger.setup.ts
- CompanyContextRepository
- GatewayKey
- ModelAlias
- ai-provider-gateway/src/app.module.ts
- HealthController
- SemanticCacheService
- company-context.dto.ts
- api-error.code.ts
- response-cache.service.ts
- LlmGatewayHttpAdapter
- metrics.ts
- UserRepository
- ConfigInitCommand
- OpenAiChatCompletionRequestDto
- DomainException
- openai-messages-provider.mapper.ts
- openai-chat-completions.controller.ts
- ClientAddCommand
- prisma-invitation.adapter.ts
- OpenAiChatMessageDto
- iso-date-time.tsx
- index-name.ts
- configuration.ts
- MeUseCase
- llm-gateway.http.adapter.ts
- PrometheusService
- chat-completions.adapter.ts
- AppMetricsModule
- SPEC — README
- ListRunsQueryDto
- runs.controller.ts
- public.decorator.ts
- GatewayConfig
- ConfigValidateCommand
- session-provider.tsx
- provider-instances.bootstrap.ts
- RefreshSessionRepository
- openai-params-provider.mapper.ts
- PrometheusAppMetricsAdapter
- EnvironmentVariables
- route.ts
- http-metrics.interceptor.ts
- ProviderAddCommand
- resolve-provider-call-options.ts
- create-feedback.use-case.ts
- metrics.module.ts
- api/src/main.ts
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- ProviderEditCommand
- InvitationsController
- ModelRemoveCommand
- ProviderRemoveCommand
- cn
- ChatParamsDto
- GlobalExceptionFilter
- openai-chat-message.dto.ts
- Architektura
- brand.ts
- openai-chat-completion-request.dto.ts
- InMemoryRunSseHub
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
- dashboard-shell.tsx

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `ProviderInstanceId` - 81 edges
3. `LoggingService` - 73 edges
4. `asProviderInstanceId()` - 67 edges
5. `DomainException` - 66 edges
6. `GatewayConfig` - 65 edges
7. `cn()` - 60 edges
8. `GatewayKey` - 59 edges
9. `ClientId` - 54 edges
10. `ChatRequestDto` - 48 edges

## Surprising Connections (you probably didn't know these)
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (130 total, 12 thin omitted)

### Community 0 - "auth.module.ts"
Cohesion: 0.08
Nodes (33): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+25 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (29): PageOutline, CompositeRunResultReader, GetRunOutput, RUN_RESULT_READER, RunResultReader, ContentBrief, SocialBrief, EmptyRunResultReader (+21 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (55): fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+47 more)

### Community 3 - "cli.module.ts"
Cohesion: 0.06
Nodes (61): AgentReport, AgentReportStatus, PendingSecretsItem, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime() (+53 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.07
Nodes (54): ArchiveRunsQuery, fetchRunLogs(), fetchUserRuns(), InitiatorOption, ArchiveRunItem, ArchiveRunsPage, ContentBrief, isLiveRunStatus() (+46 more)

### Community 5 - "start-run-form.tsx"
Cohesion: 0.10
Nodes (33): CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, fetchArchiveRuns(), fetchInitiatorOptions() (+25 more)

### Community 6 - "app-metrics-backend.interface.ts"
Cohesion: 0.15
Nodes (12): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+4 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.07
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (39): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+31 more)

### Community 9 - "provider-error.mapper.ts"
Cohesion: 0.19
Nodes (20): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 10 - "llm-hop.ts"
Cohesion: 0.06
Nodes (65): ContentPipelineFacade, toOutcome(), Inject, Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject (+57 more)

### Community 11 - "asClientId"
Cohesion: 0.08
Nodes (32): KeyGenerateCommand, Command, Option, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient(), convertRateLimit() (+24 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (32): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 13 - "ai-provider.interface.ts"
Cohesion: 0.21
Nodes (25): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, mapStopReasonToFinishReason(), CompleteOnceResult, StreamOnceParams, StreamOnceResult (+17 more)

### Community 14 - "semantic-cache.service.ts"
Cohesion: 0.15
Nodes (11): EmbeddingCircuitBreaker, EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS, embeddingProbeTimeoutMs(), GATEWAY_HEALTHCHECK_TIMEOUT_MS, SEMANTIC_SCHEMA_TAG_FIELDS, EMBED_NOT_ATTEMPTED (+3 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 16 - "anthropic-messages.controller.ts"
Cohesion: 0.09
Nodes (34): SseDeltaEvent, SseDoneEvent, SseFinishReason, SseMetaEvent, fromGatewayToolCallDto(), asMessageId(), asRequestId(), MessageId (+26 more)

### Community 17 - "RedisVectorStoreAdapter"
Cohesion: 0.19
Nodes (10): RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), isRedisSearchIndexAlreadyExistsError(), isRedisSearchMissingIndexError(), isRedisSearchModuleMissingError(), redisSearchErrorMessage(), semanticSchemaFtCreateArgs() (+2 more)

### Community 18 - "model-manager.service.ts"
Cohesion: 0.08
Nodes (35): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel() (+27 more)

### Community 19 - "gateway-config.schema.ts"
Cohesion: 0.10
Nodes (32): collectPendingSecrets(), CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, buildEffectiveGatewayConfig() (+24 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+20 more)

### Community 21 - "asProviderInstanceId"
Cohesion: 0.11
Nodes (32): assertInteractiveAllowed(), InitAnswers, convertProvider(), ClientPromptService, Injectable, KeyPromptService, Injectable, ProviderPromptResult (+24 more)

### Community 22 - "chat-stream.controller.ts"
Cohesion: 0.05
Nodes (49): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+41 more)

### Community 23 - "responses.adapter.ts"
Cohesion: 0.26
Nodes (15): asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse() (+7 more)

### Community 24 - "login-card.tsx"
Cohesion: 0.17
Nodes (15): AcceptInvitePageProps, acceptInvite(), AcceptInviteForm(), onSubmit(), AcceptInviteFormProps, passwordMeetsPolicy(), Card(), CardAction() (+7 more)

### Community 25 - "api/src/app.module.ts"
Cohesion: 0.08
Nodes (33): CompanyContextModule, Module, ContentModule, Module, LlmModule, Module, LLM_GATEWAY_PORT, GetRunUseCase (+25 more)

### Community 26 - "stream-cache-replay.service.ts"
Cohesion: 0.25
Nodes (7): ChatCacheSource, SseMetaPayload, SseMetaPayloadDto, ApiProperty, ApiPropertyOptional, STREAM_CACHE_REPLAY_CHUNK_SIZE, StreamCacheReplayInput

### Community 27 - "auth.controller.ts"
Cohesion: 0.06
Nodes (40): BootstrapStatusUseCase, Inject, Injectable, AuthController, ApiCookieAuth, ApiTags, Body, Controller (+32 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.06
Nodes (42): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+34 more)

### Community 29 - "chat.service.ts"
Cohesion: 0.06
Nodes (54): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+46 more)

### Community 30 - "PrismaService"
Cohesion: 0.12
Nodes (8): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable, PrismaService, Injectable

### Community 31 - "HealthService"
Cohesion: 0.10
Nodes (12): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags (+4 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "branded.types.ts"
Cohesion: 0.11
Nodes (33): CliAiModel, CliAiProvider, CliRateLimit, GatewayClient, WizardRunResult, ClientCli, EnvTemplateInput, ProviderCli (+25 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "LoggingService"
Cohesion: 0.07
Nodes (14): RedisConnectionService, Injectable, Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, isRedisRequiredFromConfig() (+6 more)

### Community 36 - "AppMetricsService"
Cohesion: 0.11
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (19): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+11 more)

### Community 39 - "provider-registry.service.ts"
Cohesion: 0.18
Nodes (8): UnsupportedProviderException, GatewayCapabilitiesConfig, GatewayModelConfig, GatewayParamsConfig, OpenAiApiSurface, ProviderRegistryService, ResolvedProviderConfig, Injectable

### Community 40 - "RunRepository"
Cohesion: 0.03
Nodes (68): GetRunLogsOutput, InProcessRunWorker, Inject, Injectable, ListRunsOutput, ListRunsUseCase, Inject, Injectable (+60 more)

### Community 41 - "new-ids.ts"
Cohesion: 0.18
Nodes (7): ErrorEnvelope, HttpExceptionFilter, Catch, newInvitationId(), newRequestId(), RequestIdMiddleware, Injectable

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.11
Nodes (22): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam (+14 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.service.ts"
Cohesion: 0.14
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

### Community 45 - "google-tools.mapper.ts"
Cohesion: 0.15
Nodes (26): toCachedChatResponse(), asInputTokens(), asOutputTokens(), getUsageMetadata(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason() (+18 more)

### Community 46 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.26
Nodes (10): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 48 - "config-generator.service.ts"
Cohesion: 0.10
Nodes (16): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable (+8 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 51 - "types/index.ts"
Cohesion: 0.19
Nodes (20): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+12 more)

### Community 52 - "exitWithAgentReport"
Cohesion: 0.15
Nodes (13): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+5 more)

### Community 53 - "redis-vector-store.adapter.ts"
Cohesion: 0.19
Nodes (11): isUnservableCachedReply(), parseCachedChatResponse(), asString(), ParsedKnnHits, parseKnnHits(), VectorStore, VectorStorePartition, VectorStoreProbeResult (+3 more)

### Community 54 - "swagger.setup.ts"
Cohesion: 0.06
Nodes (38): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+30 more)

### Community 55 - "CompanyContextRepository"
Cohesion: 0.05
Nodes (57): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema (+49 more)

### Community 56 - "GatewayKey"
Cohesion: 0.07
Nodes (27): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), GatewayKey, Express, Request (+19 more)

### Community 57 - "ModelAlias"
Cohesion: 0.06
Nodes (7): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppMetricsBackend

### Community 58 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.09
Nodes (22): ChatModule, Module, HealthModule, Module, AnthropicModule, Module, IntegrationsModule, Module (+14 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "SemanticCacheService"
Cohesion: 0.17
Nodes (11): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), SemanticCacheService (+3 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "api-error.code.ts"
Cohesion: 0.14
Nodes (19): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, PayloadTooLargeError, RequestWithId, mapAnthropicRequestToGateway(), AnthropicTool, mapAnthropicContentBlockToGateway() (+11 more)

### Community 63 - "response-cache.service.ts"
Cohesion: 0.08
Nodes (21): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+13 more)

### Community 64 - "LlmGatewayHttpAdapter"
Cohesion: 0.21
Nodes (5): LlmGatewayHttpAdapter, Inject, Injectable, GATEWAY_ERROR_CODE_LABELS, toGatewayErrorCodeLabel()

### Community 65 - "metrics.ts"
Cohesion: 0.07
Nodes (38): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+30 more)

### Community 66 - "UserRepository"
Cohesion: 0.05
Nodes (37): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Inject (+29 more)

### Community 67 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "DomainException"
Cohesion: 0.09
Nodes (34): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken() (+26 more)

### Community 70 - "openai-messages-provider.mapper.ts"
Cohesion: 0.27
Nodes (7): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 71 - "openai-chat-completions.controller.ts"
Cohesion: 0.11
Nodes (26): GATEWAY_CACHE_HEADER, OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto (+18 more)

### Community 72 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 73 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 74 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 75 - "iso-date-time.tsx"
Cohesion: 0.36
Nodes (6): DateTimeDisplayKind, formatIsoDateTime(), LIST_FORMAT, LOG_FORMAT, IsoDateTime(), IsoDateTimeProps

### Community 76 - "index-name.ts"
Cohesion: 0.47
Nodes (5): normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), SEMANTIC_CACHE_PROJECT_ID

### Community 77 - "configuration.ts"
Cohesion: 0.07
Nodes (31): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+23 more)

### Community 78 - "MeUseCase"
Cohesion: 0.40
Nodes (3): MeUseCase, Inject, Injectable

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.19
Nodes (16): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+8 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "chat-completions.adapter.ts"
Cohesion: 0.19
Nodes (20): toHttpException(), asSystemFingerprint(), ProviderToolDefinition, ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas() (+12 more)

### Community 82 - "AppMetricsModule"
Cohesion: 0.12
Nodes (13): AiMetricsModule, Global, Module, AppMetricsModule, Global, Module, ObservabilityModule, Global (+5 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 85 - "runs.controller.ts"
Cohesion: 0.05
Nodes (49): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsUseCase, Inject, Injectable, ListRunsUserItem, ListRunsUserOutput (+41 more)

### Community 86 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 87 - "GatewayConfig"
Cohesion: 0.08
Nodes (12): ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable, ProviderManagerService, Injectable, ApplyMutationResult (+4 more)

### Community 88 - "ConfigValidateCommand"
Cohesion: 0.50
Nodes (3): ConfigValidateCommand, Command, Option

### Community 89 - "session-provider.tsx"
Cohesion: 0.09
Nodes (32): UsersPage(), geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession() (+24 more)

### Community 90 - "provider-instances.bootstrap.ts"
Cohesion: 0.25
Nodes (10): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, openAiCompatibleApiSurface (+2 more)

### Community 91 - "RefreshSessionRepository"
Cohesion: 0.09
Nodes (12): Inject, Inject, LogoutUseCase, Inject, Injectable, Inject, REFRESH_SESSION_REPOSITORY, RefreshSessionRecord (+4 more)

### Community 93 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 95 - "PrometheusAppMetricsAdapter"
Cohesion: 0.13
Nodes (5): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 96 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 101 - "create-feedback.use-case.ts"
Cohesion: 0.06
Nodes (35): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+27 more)

### Community 102 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 103 - "api/src/main.ts"
Cohesion: 0.33
Nodes (6): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig()

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

### Community 110 - "InvitationsController"
Cohesion: 0.08
Nodes (17): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+9 more)

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.06
Nodes (40): AppHeader(), AppHeaderProps, FeedbackCtaSlot(), LogoutDialogProps, Dialog(), DialogContent(), DialogDescription(), DialogFooter() (+32 more)

### Community 116 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 118 - "GlobalExceptionFilter"
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 123 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 129 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 145 - "dashboard-shell.tsx"
Cohesion: 0.12
Nodes (17): GATE_SECTION_LABELS, CompletenessChip(), useCompleteness(), AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FloatingBoxSlot(), DashboardShell() (+9 more)

## Knowledge Gaps
- **343 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+338 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1038 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `logging.service.ts`, `anthropic/anthropic-tools.mapper.ts`, `provider-error.mapper.ts`, `semantic-cache.service.ts`, `RedisVectorStoreAdapter`, `responses.adapter.ts`, `stream-cache-replay.service.ts`, `chat.service.ts`, `HealthService`, `ai-provider-gateway/src/main.ts`, `resilient-executor.ts`, `provider-registry.service.ts`, `google-tools.mapper.ts`, `ai-provider-gateway/src/health/health.service.ts`, `redis-vector-store.adapter.ts`, `swagger.setup.ts`, `GatewayKey`, `ai-provider-gateway/src/app.module.ts`, `SemanticCacheService`, `api-error.code.ts`, `response-cache.service.ts`, `chat-completions.adapter.ts`, `provider-instances.bootstrap.ts`, `GlobalExceptionFilter`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `branded.types.ts`, `cli.module.ts`, `provider-registry.service.ts`, `asClientId`, `configuration.ts`, `models.controller.ts`, `model-manager.service.ts`, `gateway-config.schema.ts`, `exitWithAgentReport`, `asProviderInstanceId`, `chat.service.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `asProviderInstanceId` to `metrics.ts`, `branded.types.ts`, `cli.module.ts`, `provider-registry.service.ts`, `anthropic/anthropic-tools.mapper.ts`, `provider-error.mapper.ts`, `asClientId`, `google-tools.mapper.ts`, `ai-provider.interface.ts`, `configuration.ts`, `models.controller.ts`, `model-manager.service.ts`, `gateway-config.schema.ts`, `exitWithAgentReport`, `types/index.ts`, `GatewayConfig`, `provider-instances.bootstrap.ts`, `chat.service.ts`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _343 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `auth.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.053737373737373736 - nodes in this community are weakly interconnected._
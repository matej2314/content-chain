# Graph Report - content-chain  (2026-09-18)

## Corpus Check
- 597 files · ~168,987 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 3863 nodes · 11890 edges · 141 communities (123 shown, 16 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 373 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1630a764`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cli.module.ts
- social.types.ts
- api/company-context.types.ts
- exitWithAgentReport
- runs.types.ts
- run-details-view.tsx
- app-metrics-backend.interface.ts
- logging.service.ts
- anthropic/anthropic-tools.mapper.ts
- provider-error.mapper.ts
- llm-hop.ts
- asClientId
- social.graph.ts
- branded.types.ts
- semantic-cache.constants.ts
- models.controller.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- GatewayConfig
- configuration.ts
- ai-metrics-backend.interface.ts
- asProviderInstanceId
- anthropic-messages.controller.ts
- responses.adapter.ts
- login-card.tsx
- api/src/app.module.ts
- ai-provider-gateway/src/app.module.ts
- auth.controller.ts
- save-output-edited.use-case.ts
- chat.service.ts
- provider-registry.service.ts
- HealthService
- ai-provider-gateway/src/main.ts
- prisma-run.adapter.ts
- AnthropicMessagesRequestDto
- RedisConnectionService
- AppMetricsService
- enums.ts
- types/index.ts
- LoggingService
- RunRepository
- agent-answers.schema.ts
- openai-models.controller.ts
- ids.ts
- app-metrics.service.ts
- ConfigInitCommand
- swagger.setup.ts
- anthropic-models.controller.ts
- FileManagerService
- chat-params.dto.ts
- StartRunDto
- getAppConfig
- WizardState
- anthropic.module.ts
- ChatToolingDto
- company-context.controller.ts
- provider-instances.bootstrap.ts
- ModelAlias
- should-include-redis-stack.ts
- HealthController
- semantic-cache.service.ts
- company-context.dto.ts
- metrics.ts
- response-cache.service.ts
- AppMetricsModule
- ProviderApiKey
- UserRepository
- CompanyContextRepository
- OpenAiChatCompletionRequestDto
- auth.module.ts
- InvitationsController
- openai-stream.mapper.ts
- ClientAddCommand
- prisma-invitation.adapter.ts
- OpenAiChatMessageDto
- prisma-company-context.adapter.ts
- AuthUserContext
- sentry-ai-metrics.adapter.ts
- company-context.mapper.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- PrismaService
- HttpExceptionFilter
- SPEC — README
- ListRunsQueryDto
- runs.controller.ts
- EnvironmentVariables
- EnvPatchService
- openai-chat-completion-response.dto.ts
- session-provider.tsx
- GatewayKey
- RefreshSessionRepository
- create-feedback.use-case.ts
- ClientId
- openai-params-provider.mapper.ts
- PrometheusAppMetricsAdapter
- feedback.types.ts
- route.ts
- http-metrics.interceptor.ts
- ProviderAddCommand
- anthropic-auth.decorator.ts
- .create
- metrics.module.ts
- configure-swagger.ts
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- OllamaEmbeddingAdapter
- ProviderEditCommand
- DomainException
- ConsoleLoggerAdapter
- ModelRemoveCommand
- ProviderRemoveCommand
- cn
- CompanyContextController
- ChatParamsDto
- readClientGatewayKey.ts
- GlobalExceptionFilter
- SmartRateLimitGuard
- openai-messages.mapper.ts
- AnthropicMessagesController
- openai-chat-message.dto.ts
- Architektura
- brand.ts
- gateway-key.guard.branded-types.test-d.ts
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
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (141 total, 16 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.05
Nodes (40): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), PendingSecretsItem, collectPendingSecrets(), CliModule, Module (+32 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (30): PageDocument, CompositeRunResultReader, GetRunOutput, RUN_RESULT_READER, RunResultReader, ContentBrief, SocialBrief, EmptyRunResultReader (+22 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.07
Nodes (49): fetchCompanyContext(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+41 more)

### Community 3 - "exitWithAgentReport"
Cohesion: 0.20
Nodes (13): exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), resolveCliMode(), KeyGenerateOptions (+5 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.06
Nodes (55): ArchiveRunsQuery, fetchArchiveRuns(), fetchInitiatorOptions(), fetchRunLogs(), fetchUserRuns(), InitiatorOption, startRun(), ArchiveRunItem (+47 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.11
Nodes (28): CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, fetchRunSnapshot(), RunSnapshot (+20 more)

### Community 6 - "app-metrics-backend.interface.ts"
Cohesion: 0.12
Nodes (11): healthStatusToGaugeValue(), AppProviderCallContext, AppProviderStreamScope, AppRequestLabels, AppRequestMethod, AppRequestStatus, AppTokenUsage, HealthComponent (+3 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.09
Nodes (17): LEVEL_ORDER, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, SentryErrorReportingAdapter, Injectable, parseLogLevel(), ErrorReportingBackend (+9 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (40): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+32 more)

### Community 9 - "provider-error.mapper.ts"
Cohesion: 0.25
Nodes (17): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+9 more)

### Community 10 - "llm-hop.ts"
Cohesion: 0.06
Nodes (54): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+46 more)

### Community 11 - "asClientId"
Cohesion: 0.08
Nodes (43): isRedisSearchTagSafeId(), assertInteractiveAllowed(), CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient(), convertModel(), convertRateLimit() (+35 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (32): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), verifierOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.13
Nodes (33): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, mapStopReasonToFinishReason(), CompleteOnceResult, StreamOnceResult, ProviderResponse (+25 more)

### Community 14 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.15
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 18 - "GatewayConfig"
Cohesion: 0.13
Nodes (27): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable (+19 more)

### Community 19 - "configuration.ts"
Cohesion: 0.08
Nodes (40): REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, CliValidateOptions, asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig (+32 more)

### Community 20 - "ai-metrics-backend.interface.ts"
Cohesion: 0.14
Nodes (14): CostUsd, NoopAiMetricsAdapter, Injectable, resolveAiMetricsBackend(), AiMetricsService, Inject, Injectable, AI_METRICS_BACKEND (+6 more)

### Community 21 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (60): isRedisRequired(), DEFAULT_MODELS, InitAnswers, convertProvider(), CliAiModel, CliAiProvider, ModelPromptResult, ModelPromptService (+52 more)

### Community 22 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (59): ApiHeader, ChatCacheSource, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity (+51 more)

### Community 23 - "responses.adapter.ts"
Cohesion: 0.07
Nodes (67): toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls() (+59 more)

### Community 24 - "login-card.tsx"
Cohesion: 0.17
Nodes (15): AcceptInvitePageProps, acceptInvite(), AcceptInviteForm(), onSubmit(), AcceptInviteFormProps, passwordMeetsPolicy(), Card(), CardAction() (+7 more)

### Community 25 - "api/src/app.module.ts"
Cohesion: 0.07
Nodes (49): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind() (+41 more)

### Community 26 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.16
Nodes (12): HealthModule, Module, IntegrationsModule, Module, LoggingModule, Global, Module, ProviderRegistryModule (+4 more)

### Community 27 - "auth.controller.ts"
Cohesion: 0.05
Nodes (52): AcceptInviteUseCase, Inject, Injectable, BootstrapStatusUseCase, Injectable, LogoutUseCase, Injectable, MeUseCase (+44 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.06
Nodes (40): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+32 more)

### Community 29 - "chat.service.ts"
Cohesion: 0.06
Nodes (60): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+52 more)

### Community 30 - "provider-registry.service.ts"
Cohesion: 0.07
Nodes (25): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload (+17 more)

### Community 31 - "HealthService"
Cohesion: 0.11
Nodes (12): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags (+4 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "prisma-run.adapter.ts"
Cohesion: 0.09
Nodes (13): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, ALLOWED, assertTransition(), PrismaRunAdapter, RunLogRow (+5 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "RedisConnectionService"
Cohesion: 0.14
Nodes (6): RedisConnectionService, Injectable, VectorStore, isRedisRequiredFromConfig(), Inject, Optional

### Community 36 - "AppMetricsService"
Cohesion: 0.11
Nodes (6): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable, HttpMethod

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "types/index.ts"
Cohesion: 0.08
Nodes (44): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+36 more)

### Community 39 - "LoggingService"
Cohesion: 0.11
Nodes (9): Inject, Inject, PinoLoggerAdapter, Injectable, LogContext, LoggingService, Injectable, Inject (+1 more)

### Community 40 - "RunRepository"
Cohesion: 0.06
Nodes (18): Inject, InProcessRunWorker, Inject, Injectable, RecoverInterruptedRunsUseCase, Inject, Injectable, Inject (+10 more)

### Community 41 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.service.ts"
Cohesion: 0.11
Nodes (15): HealthCheckResult, HealthRedisCheckResult, resolveAppMetricsBackend(), APP_METRICS_BACKEND, HealthMetricsSnapshot, MetricsController, ApiOperation, ApiResponse (+7 more)

### Community 45 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 46 - "swagger.setup.ts"
Cohesion: 0.14
Nodes (16): RedisConsumer, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty, HealthCheckItemDto (+8 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 48 - "FileManagerService"
Cohesion: 0.11
Nodes (8): ConfigGeneratorService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, FileManagerService, Injectable, ValidationFormatter

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 51 - "getAppConfig"
Cohesion: 0.20
Nodes (9): getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), readAnthropicApiKey(), OpenAiBearerAuthGuard, readAuthorizationHeader(), readBearerToken() (+1 more)

### Community 52 - "WizardState"
Cohesion: 0.23
Nodes (8): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, WizardState, Injectable, WizardOrchestratorService, Injectable, WizardStateManager

### Community 53 - "anthropic.module.ts"
Cohesion: 0.16
Nodes (12): ChatModule, Module, AnthropicModule, Module, OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller (+4 more)

### Community 54 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 55 - "company-context.controller.ts"
Cohesion: 0.21
Nodes (12): toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase (+4 more)

### Community 56 - "provider-instances.bootstrap.ts"
Cohesion: 0.22
Nodes (11): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, OpenAiProviderConfig (+3 more)

### Community 57 - "ModelAlias"
Cohesion: 0.08
Nodes (7): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend, TokenDirection

### Community 58 - "should-include-redis-stack.ts"
Cohesion: 0.15
Nodes (13): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+5 more)

### Community 59 - "HealthController"
Cohesion: 0.11
Nodes (14): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+6 more)

### Community 60 - "semantic-cache.service.ts"
Cohesion: 0.12
Nodes (19): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs() (+11 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "metrics.ts"
Cohesion: 0.06
Nodes (50): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+42 more)

### Community 63 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 64 - "AppMetricsModule"
Cohesion: 0.12
Nodes (13): AiMetricsModule, Global, Module, AppMetricsModule, Global, Module, ObservabilityModule, Global (+5 more)

### Community 65 - "ProviderApiKey"
Cohesion: 0.20
Nodes (6): ProviderTestCommand, Command, Option, ProviderTestService, Injectable, ProviderApiKey

### Community 66 - "UserRepository"
Cohesion: 0.05
Nodes (39): Inject, ListUsersUseCase, Inject, Injectable, Inject, ReactivateUserUseCase, Inject, Injectable (+31 more)

### Community 67 - "CompanyContextRepository"
Cohesion: 0.16
Nodes (8): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "auth.module.ts"
Cohesion: 0.07
Nodes (41): generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject (+33 more)

### Community 70 - "InvitationsController"
Cohesion: 0.16
Nodes (9): InvitationsController, ApiCookieAuth, ApiTags, Controller, Delete, Get, HttpCode, Param (+1 more)

### Community 71 - "openai-stream.mapper.ts"
Cohesion: 0.28
Nodes (13): fromGatewayToolCallDto(), mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields(), buildToolCallsDelta() (+5 more)

### Community 72 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 73 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 74 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 75 - "prisma-company-context.adapter.ts"
Cohesion: 0.16
Nodes (15): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+7 more)

### Community 76 - "AuthUserContext"
Cohesion: 0.09
Nodes (21): Body, isTerminalStatus(), RunsController, ApiCookieAuth, ApiTags, Body, Controller, Get (+13 more)

### Community 77 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.28
Nodes (13): applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext(), clearRequestMetadataContext(), SentryAiMetricsAdapter (+5 more)

### Community 78 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.11
Nodes (22): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+14 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "PrismaService"
Cohesion: 0.13
Nodes (5): PrismaModule, Global, Module, PrismaService, Injectable

### Community 82 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 85 - "runs.controller.ts"
Cohesion: 0.04
Nodes (58): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable, GetRunUseCase (+50 more)

### Community 86 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 87 - "EnvPatchService"
Cohesion: 0.10
Nodes (10): KeyGenerateCommand, Command, Option, EnvPatchService, Injectable, ProviderManagerService, Injectable, EditProviderInput (+2 more)

### Community 88 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 89 - "session-provider.tsx"
Cohesion: 0.10
Nodes (28): UsersPage(), geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession() (+20 more)

### Community 90 - "GatewayKey"
Cohesion: 0.18
Nodes (9): isProviderRateLimitError(), resolveClientIdFromKey(), GatewayKey, Express, Request, ResolvedGatewayClient, RateLimitResult, SmartRateLimiterService (+1 more)

### Community 91 - "RefreshSessionRepository"
Cohesion: 0.10
Nodes (8): Inject, Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, PrismaRefreshSessionAdapter, Injectable

### Community 92 - "create-feedback.use-case.ts"
Cohesion: 0.24
Nodes (8): FEEDBACK_RUN_READER, FeedbackRunLookup, FeedbackRunReader, FEEDBACK_REPOSITORY, FeedbackModule, Module, PrismaFeedbackRunReaderAdapter, Injectable

### Community 93 - "ClientId"
Cohesion: 0.18
Nodes (4): ClientId, ActiveStreamsTracker, Injectable, RateLimitReason

### Community 94 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 96 - "feedback.types.ts"
Cohesion: 0.19
Nodes (8): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_BODY_MAX, FeedbackEntry, FeedbackRepository, PrismaFeedbackAdapter, Injectable

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "anthropic-auth.decorator.ts"
Cohesion: 0.29
Nodes (4): AnthropicExceptionFilter, Catch, AnthropicApiKeyGuard, Injectable

### Community 101 - ".create"
Cohesion: 0.11
Nodes (16): CreateFeedbackUseCase, Inject, Injectable, FeedbackController, ApiCookieAuth, ApiTags, Body, Controller (+8 more)

### Community 102 - "metrics.module.ts"
Cohesion: 0.21
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 103 - "configure-swagger.ts"
Cohesion: 0.24
Nodes (8): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), ACCESS_COOKIE_NAME, buildSwaggerConfig(), COOKIE_AUTH_NAME

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

### Community 108 - "OllamaEmbeddingAdapter"
Cohesion: 0.24
Nodes (3): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend

### Community 109 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 110 - "DomainException"
Cohesion: 0.08
Nodes (33): AcceptInviteResult, acceptInviteSchema, comparePassword(), hashPassword(), BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema (+25 more)

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.06
Nodes (48): logoutSession(), AppHeaderProps, AppSidebar(), AppSidebarProps, LogoutDialog(), confirm(), LogoutDialogProps, APP_NAV (+40 more)

### Community 115 - "CompanyContextController"
Cohesion: 0.29
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 116 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 117 - "readClientGatewayKey.ts"
Cohesion: 0.33
Nodes (4): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader()

### Community 118 - "GlobalExceptionFilter"
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 120 - "openai-messages.mapper.ts"
Cohesion: 0.52
Nodes (5): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway()

### Community 121 - "AnthropicMessagesController"
Cohesion: 0.40
Nodes (4): AnthropicMessagesController, ApiSecurity, ApiTags, Controller

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
Cohesion: 0.10
Nodes (19): fetchCompleteness(), CompletenessState, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE, useCompleteness() (+11 more)

## Knowledge Gaps
- **339 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+334 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1035 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `logging.service.ts`, `anthropic/anthropic-tools.mapper.ts`, `redis-vector-store.adapter.ts`, `responses.adapter.ts`, `chat.service.ts`, `provider-registry.service.ts`, `HealthService`, `ai-provider-gateway/src/main.ts`, `RedisConnectionService`, `types/index.ts`, `app-metrics.service.ts`, `swagger.setup.ts`, `getAppConfig`, `provider-instances.bootstrap.ts`, `semantic-cache.service.ts`, `response-cache.service.ts`, `GatewayKey`, `OllamaEmbeddingAdapter`, `GlobalExceptionFilter`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `cli.module.ts`, `ProviderApiKey`, `exitWithAgentReport`, `asClientId`, `models.controller.ts`, `FileManagerService`, `configuration.ts`, `asProviderInstanceId`, `EnvPatchService`, `chat.service.ts`, `provider-registry.service.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `asProviderInstanceId` to `cli.module.ts`, `ProviderApiKey`, `exitWithAgentReport`, `types/index.ts`, `anthropic/anthropic-tools.mapper.ts`, `asClientId`, `branded.types.ts`, `models.controller.ts`, `GatewayConfig`, `configuration.ts`, `EnvPatchService`, `provider-instances.bootstrap.ts`, `GatewayKey`, `chat.service.ts`, `metrics.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _339 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0454728370221328 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05745614035087719 - nodes in this community are weakly interconnected._
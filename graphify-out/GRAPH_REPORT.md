# Graph Report - content-chain  (2026-09-17)

## Corpus Check
- 586 files · ~165,258 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 3, .css 1)

## Summary
- 3806 nodes · 11673 edges · 139 communities (119 shown, 17 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 372 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `50446c54`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cli.module.ts
- social.types.ts
- api/company-context.types.ts
- ProviderApiKey
- runs.types.ts
- StartRunDto
- app-metrics.service.ts
- LogContext
- types/index.ts
- provider-error.mapper.ts
- content.graph.ts
- wizard-orchestrator.service.ts
- social.graph.ts
- branded.types.ts
- chat.service.ts
- models.controller.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- GatewayConfig
- configuration.ts
- sentry-ai-metrics.adapter.ts
- asProviderInstanceId
- anthropic-messages.controller.ts
- anthropic/anthropic-tools.mapper.ts
- prisma-run.adapter.ts
- openai-stream.mapper.ts
- ai-provider-gateway/src/app.module.ts
- auth.module.ts
- save-output-edited.use-case.ts
- ProviderRegistryService
- semantic-cache.constants.ts
- getAppConfig
- ai-provider-gateway/src/main.ts
- prisma.service.ts
- AnthropicMessagesRequestDto
- semantic-cache.service.ts
- AppMetricsService
- enums.ts
- anthropic.module.ts
- agent-answers.schema.ts
- api/src/app.module.ts
- PrismaContentResultAdapter
- openai-models.controller.ts
- ids.ts
- app-metrics.module.ts
- create-feedback.use-case.ts
- should-include-redis-stack.ts
- .getOne
- config-generator.service.ts
- chat-params.dto.ts
- runs.controller.ts
- llm-hop.ts
- InProcessRunWorker
- anthropic-models.controller.ts
- swagger.setup.ts
- company-context.controller.ts
- prisma-output-edited.adapter.ts
- ModelAlias
- ai-provider-gateway/src/health/health.service.ts
- HealthController
- OllamaEmbeddingAdapter
- company-context.dto.ts
- metrics.ts
- LoggingService
- exitWithAgentReport
- .getOne
- PrismaService
- CompanyContext
- OpenAiChatCompletionRequestDto
- invitations.controller.ts
- company-context-form.tsx
- GlobalExceptionFilter
- env.schema.ts
- prisma-invitation.adapter.ts
- .getOne
- prisma-company-context.adapter.ts
- RunsController
- UserRepository
- company-context.mapper.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- CreateFeedbackUseCase
- responses.adapter.ts
- SPEC — README
- ListRunsQueryDto
- start-run.use-case.ts
- EnvironmentVariables
- EnvRef
- ChatParamsDto
- session-provider.tsx
- smart-rate-limiter.service.ts
- RefreshSessionRepository
- .create
- HttpExceptionFilter
- openai-params-provider.mapper.ts
- PrometheusAppMetricsAdapter
- HealthController
- route.ts
- OpenAiChatMessageDto
- ProviderAddCommand
- logging.service.ts
- prisma.feedback-run-reader.adapter.ts
- GatewayModelsCatalogService
- ClientAddCommand
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- auth.schemas.ts
- ProviderEditCommand
- DomainException
- run-labels.ts
- ModelRemoveCommand
- ProviderRemoveCommand
- cn
- CompanyContextController
- VectorStore
- BootstrapAdminDto
- LoginDto
- openai-chat-message.dto.ts
- openai-chat-completion-request.dto.ts
- Architektura
- brand.ts
- login-card.tsx
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
7. `GatewayKey` - 59 edges
8. `ClientId` - 54 edges
9. `cn()` - 49 edges
10. `ChatRequestDto` - 48 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `ResponseCacheService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/response-cache.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (139 total, 17 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.04
Nodes (49): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), CliModule, Module, ClientListCommand, ClientListOptions (+41 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (35): ContentPipelineInput, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole, CompositeRunResultReader, GetRunOutput (+27 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.08
Nodes (41): fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, companyContextForPut(), CompanyContextObjection (+33 more)

### Community 3 - "ProviderApiKey"
Cohesion: 0.24
Nodes (6): ProviderTestService, Injectable, ProviderApiKey, OpenAiApiSurface, openAiCompatibleApiSurface, OpenAiProviderConfig

### Community 4 - "runs.types.ts"
Cohesion: 0.09
Nodes (44): ArchiveRunsQuery, fetchArchiveRuns(), fetchInitiatorOptions(), fetchRunLogs(), fetchRunSnapshot(), fetchUserRuns(), InitiatorOption, startRun() (+36 more)

### Community 5 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 6 - "app-metrics.service.ts"
Cohesion: 0.20
Nodes (13): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus (+5 more)

### Community 7 - "LogContext"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 8 - "types/index.ts"
Cohesion: 0.08
Nodes (42): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+34 more)

### Community 9 - "provider-error.mapper.ts"
Cohesion: 0.14
Nodes (22): ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError() (+14 more)

### Community 10 - "content.graph.ts"
Cohesion: 0.08
Nodes (46): CompanyContextRepository, ContentPipelineFacade, Inject, Injectable, Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput (+38 more)

### Community 11 - "wizard-orchestrator.service.ts"
Cohesion: 0.08
Nodes (51): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+43 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (32): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.10
Nodes (42): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, SseMetaPayload, shouldStoreChatResponse(), mapStopReasonToFinishReason() (+34 more)

### Community 14 - "chat.service.ts"
Cohesion: 0.06
Nodes (53): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+45 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.23
Nodes (10): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.14
Nodes (21): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+13 more)

### Community 18 - "GatewayConfig"
Cohesion: 0.06
Nodes (37): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite() (+29 more)

### Community 19 - "configuration.ts"
Cohesion: 0.05
Nodes (67): PendingSecretsItem, collectPendingSecrets(), asCacheTtlSeconds(), asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig (+59 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (33): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+25 more)

### Community 21 - "asProviderInstanceId"
Cohesion: 0.09
Nodes (33): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), DEFAULT_MODELS, CliAiProvider, ModelPromptResult (+25 more)

### Community 22 - "anthropic-messages.controller.ts"
Cohesion: 0.05
Nodes (54): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+46 more)

### Community 23 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.06
Nodes (65): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens(), asPromptCacheHitTokens() (+57 more)

### Community 24 - "prisma-run.adapter.ts"
Cohesion: 0.09
Nodes (15): contentBriefSchema, socialBriefSchema, LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, ALLOWED, assertTransition() (+7 more)

### Community 25 - "openai-stream.mapper.ts"
Cohesion: 0.17
Nodes (21): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+13 more)

### Community 26 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.13
Nodes (13): HealthModule, Module, IntegrationsModule, Module, ProviderRegistryModule, Global, Module, ProvidersModule (+5 more)

### Community 27 - "auth.module.ts"
Cohesion: 0.05
Nodes (73): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, comparePassword(), generateRefreshToken(), hashPassword() (+65 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (33): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+25 more)

### Community 29 - "ProviderRegistryService"
Cohesion: 0.21
Nodes (4): ProviderInstancesBootstrap, Injectable, ProviderRegistryService, Injectable

### Community 30 - "semantic-cache.constants.ts"
Cohesion: 0.14
Nodes (11): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+3 more)

### Community 31 - "getAppConfig"
Cohesion: 0.17
Nodes (11): getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable, OpenAiBearerAuthGuard (+3 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "prisma.service.ts"
Cohesion: 0.11
Nodes (18): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+10 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "semantic-cache.service.ts"
Cohesion: 0.09
Nodes (27): NoopCacheModule, Module, RedisCacheModule, Module, computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), CacheModule (+19 more)

### Community 36 - "AppMetricsService"
Cohesion: 0.10
Nodes (6): HttpMetricsMiddleware, Injectable, ActiveStreamsTracker, Injectable, AppMetricsService, Injectable

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "anthropic.module.ts"
Cohesion: 0.12
Nodes (16): ChatModule, Module, AnthropicModule, Module, AnthropicMessagesController, ApiSecurity, ApiTags, Controller (+8 more)

### Community 39 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 40 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (45): AuthModule, Module, CompanyContextModule, Module, toOutcome(), ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind() (+37 more)

### Community 41 - "PrismaContentResultAdapter"
Cohesion: 0.14
Nodes (5): ContentPipelineState, VerifierVerdict, PrismaContentResultAdapter, toContentPipelinePhase(), Injectable

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.27
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.module.ts"
Cohesion: 0.09
Nodes (16): AppMetricsModule, resolveAppMetricsBackend(), Global, Module, Inject, APP_METRICS_BACKEND, MetricsController, ApiOperation (+8 more)

### Community 45 - "create-feedback.use-case.ts"
Cohesion: 0.14
Nodes (15): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FEEDBACK_BODY_MAX, FEEDBACK_REPOSITORY, FeedbackEntry, FeedbackRepository (+7 more)

### Community 46 - "should-include-redis-stack.ts"
Cohesion: 0.17
Nodes (11): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+3 more)

### Community 47 - ".getOne"
Cohesion: 0.18
Nodes (11): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+3 more)

### Community 48 - "config-generator.service.ts"
Cohesion: 0.10
Nodes (20): isRedisRequired(), ConfigGeneratorService, Injectable, FileManagerService, Injectable, BasicServerAnswers, CacheAnswers, MetricsAnswers (+12 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "runs.controller.ts"
Cohesion: 0.05
Nodes (50): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable, GetRunUseCase (+42 more)

### Community 51 - "llm-hop.ts"
Cohesion: 0.23
Nodes (9): LLM_GATEWAY_PORT, isRetryable(), RetryReason, ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid() (+1 more)

### Community 53 - "anthropic-models.controller.ts"
Cohesion: 0.28
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 54 - "swagger.setup.ts"
Cohesion: 0.04
Nodes (63): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+55 more)

### Community 55 - "company-context.controller.ts"
Cohesion: 0.13
Nodes (15): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+7 more)

### Community 56 - "prisma-output-edited.adapter.ts"
Cohesion: 0.24
Nodes (6): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable

### Community 57 - "ModelAlias"
Cohesion: 0.06
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 58 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.10
Nodes (16): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty (+8 more)

### Community 59 - "HealthController"
Cohesion: 0.11
Nodes (14): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+6 more)

### Community 60 - "OllamaEmbeddingAdapter"
Cohesion: 0.27
Nodes (3): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "metrics.ts"
Cohesion: 0.16
Nodes (20): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias() (+12 more)

### Community 63 - "LoggingService"
Cohesion: 0.06
Nodes (20): NoOpCacheBackend, Injectable, RedisCacheAdapter, Injectable, RedisConnectionService, Injectable, CacheRegistryService, Injectable (+12 more)

### Community 64 - "exitWithAgentReport"
Cohesion: 0.19
Nodes (12): exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), resolveCliMode(), ProviderTestCommand (+4 more)

### Community 65 - ".getOne"
Cohesion: 0.19
Nodes (10): ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 67 - "CompanyContext"
Cohesion: 0.35
Nodes (3): CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "invitations.controller.ts"
Cohesion: 0.04
Nodes (48): InviteUserUseCase, Injectable, ListInvitationsUseCase, Inject, Injectable, ListUsersUseCase, Inject, Injectable (+40 more)

### Community 70 - "company-context-form.tsx"
Cohesion: 0.22
Nodes (9): CompanyContextExtras, GateSection, commaToList(), CompanyContextForm(), CompanyContextFormProps, extrasOrEmpty(), linesToList(), listToLines() (+1 more)

### Community 71 - "GlobalExceptionFilter"
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 72 - "env.schema.ts"
Cohesion: 0.17
Nodes (11): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+3 more)

### Community 73 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 74 - ".getOne"
Cohesion: 0.18
Nodes (11): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+3 more)

### Community 75 - "prisma-company-context.adapter.ts"
Cohesion: 0.16
Nodes (15): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+7 more)

### Community 76 - "RunsController"
Cohesion: 0.11
Nodes (21): ListRunsUserOutput, HitlDto, IsArray, IsString, PatchRunRatingDto, IsIn, ValidateIf, isTerminalStatus() (+13 more)

### Community 77 - "UserRepository"
Cohesion: 0.10
Nodes (13): Inject, Inject, Inject, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult, UserForAuth, UserRepository (+5 more)

### Community 78 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.11
Nodes (22): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+14 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "CreateFeedbackUseCase"
Cohesion: 0.22
Nodes (7): CreateFeedbackUseCase, Inject, Injectable, FeedbackController, ApiCookieAuth, ApiTags, Controller

### Community 82 - "responses.adapter.ts"
Cohesion: 0.09
Nodes (44): toHttpException(), asSystemFingerprint(), asToolCallId(), ProviderAssistantTurn, ProviderChatTurn, ProviderToolDefinition, ProviderToolResultTurn, ChatCompletionsAdapterOptions (+36 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 85 - "start-run.use-case.ts"
Cohesion: 0.10
Nodes (24): hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialStartRunSchema, startRunCommandSchema (+16 more)

### Community 86 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 87 - "EnvRef"
Cohesion: 0.19
Nodes (6): KeyGenerateCommand, Command, Option, EnvPatchService, Injectable, EnvRef

### Community 88 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 89 - "session-provider.tsx"
Cohesion: 0.11
Nodes (25): geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession(), loginWithPassword() (+17 more)

### Community 90 - "smart-rate-limiter.service.ts"
Cohesion: 0.14
Nodes (11): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), ResolvedGatewayClient, SmartRateLimitGuard, Injectable (+3 more)

### Community 91 - "RefreshSessionRepository"
Cohesion: 0.11
Nodes (8): Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 92 - ".create"
Cohesion: 0.20
Nodes (9): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 94 - "openai-params-provider.mapper.ts"
Cohesion: 0.14
Nodes (22): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapStopSequences(), OpenAiSharedChatCompletionParams (+14 more)

### Community 95 - "PrometheusAppMetricsAdapter"
Cohesion: 0.15
Nodes (4): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppTokenUsage

### Community 96 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "logging.service.ts"
Cohesion: 0.14
Nodes (15): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, PayloadTooLargeError (+7 more)

### Community 101 - "prisma.feedback-run-reader.adapter.ts"
Cohesion: 0.33
Nodes (4): FeedbackRunLookup, FeedbackRunReader, PrismaFeedbackRunReaderAdapter, Injectable

### Community 103 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 104 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 105 - "ClientRemoveCommand"
Cohesion: 0.33
Nodes (3): ClientRemoveCommand, Command, Option

### Community 106 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 107 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 108 - "auth.schemas.ts"
Cohesion: 0.29
Nodes (6): BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema

### Community 109 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 110 - "DomainException"
Cohesion: 0.09
Nodes (19): updateEmailSchema, ApiCookieAuth, Patch, JwtPayload, UserListItem, isRecord(), ListRunsUserItem, ratingSchema (+11 more)

### Community 111 - "run-labels.ts"
Cohesion: 0.29
Nodes (6): CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.08
Nodes (36): logoutSession(), AppHeaderProps, LogoutDialog(), confirm(), LogoutDialogProps, Button(), buttonVariants, CardDescription() (+28 more)

### Community 115 - "CompanyContextController"
Cohesion: 0.29
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 117 - "BootstrapAdminDto"
Cohesion: 0.33
Nodes (5): BootstrapAdminDto, ApiProperty, IsEmail, IsString, MinLength

### Community 119 - "LoginDto"
Cohesion: 0.33
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 120 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 128 - "login-card.tsx"
Cohesion: 0.16
Nodes (16): AcceptInvitePageProps, acceptInvite(), AcceptInviteForm(), onSubmit(), AcceptInviteFormProps, passwordMeetsPolicy(), Card(), CardAction() (+8 more)

### Community 129 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 145 - "dashboard-shell.tsx"
Cohesion: 0.09
Nodes (19): UsersPage(), HomeEntry(), useSession(), AppHeader(), AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot() (+11 more)

## Knowledge Gaps
- **332 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+327 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1029 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `LogContext`, `types/index.ts`, `provider-error.mapper.ts`, `branded.types.ts`, `chat.service.ts`, `redis-vector-store.adapter.ts`, `configuration.ts`, `anthropic/anthropic-tools.mapper.ts`, `ProviderRegistryService`, `ai-provider-gateway/src/main.ts`, `semantic-cache.service.ts`, `should-include-redis-stack.ts`, `swagger.setup.ts`, `ai-provider-gateway/src/health/health.service.ts`, `OllamaEmbeddingAdapter`, `GlobalExceptionFilter`, `responses.adapter.ts`, `smart-rate-limiter.service.ts`, `logging.service.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `cli.module.ts`, `exitWithAgentReport`, `ProviderApiKey`, `GatewayModelsCatalogService`, `wizard-orchestrator.service.ts`, `branded.types.ts`, `configuration.ts`, `asProviderInstanceId`, `ProviderRegistryService`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `asProviderInstanceId` to `exitWithAgentReport`, `cli.module.ts`, `logging.service.ts`, `GatewayModelsCatalogService`, `types/index.ts`, `provider-error.mapper.ts`, `wizard-orchestrator.service.ts`, `branded.types.ts`, `chat.service.ts`, `GatewayConfig`, `configuration.ts`, `anthropic/anthropic-tools.mapper.ts`, `metrics.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _332 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04249084249084249 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.053296703296703295 - nodes in this community are weakly interconnected._
# Graph Report - content-chain  (2026-09-18)

## Corpus Check
- 604 files · ~172,172 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 3896 nodes · 12030 edges · 143 communities (123 shown, 18 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 374 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9a19669d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- prisma-invitation.adapter.ts
- social.types.ts
- api/company-context.types.ts
- cli.module.ts
- runs.types.ts
- run-details-view.tsx
- app-metrics.service.ts
- logging.service.ts
- anthropic/anthropic-tools.mapper.ts
- provider-error.mapper.ts
- content.graph.ts
- in-process-run.worker.ts
- social.graph.ts
- ai-provider.interface.ts
- semantic-cache.service.ts
- models.controller.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- chat.service.ts
- model-manager.service.ts
- sentry-ai-metrics.adapter.ts
- branded.types.ts
- anthropic-messages.controller.ts
- responses.adapter.ts
- start-run-form.tsx
- api/src/app.module.ts
- run.port.ts
- AuthController
- save-output-edited.use-case.ts
- ClientId
- asProviderInstanceId
- HealthService
- swagger.setup.ts
- GatewayKey
- AnthropicMessagesRequestDto
- LoggingService
- RunRecord
- enums.ts
- resilient-executor.ts
- ProviderRegistryService
- DomainException
- HttpExceptionFilter
- openai-models.controller.ts
- ids.ts
- app-metrics.module.ts
- google-tools.mapper.ts
- ai-provider-gateway/src/health/health.service.ts
- anthropic-models.controller.ts
- config-generator.service.ts
- chat-params.dto.ts
- StartRunDto
- types/index.ts
- start-run.use-case.ts
- patch-company-context.use-case.ts
- api-error.code.ts
- CompanyContext
- anthropic-stream.mapper.ts
- ModelAlias
- ai-provider-gateway/src/app.module.ts
- Public
- HttpMetricsMiddleware
- company-context.dto.ts
- gateway-tool-call.dto.ts
- cache.module.ts
- configuration.ts
- provider-input.ts
- auth.module.ts
- ConfigInitCommand
- OpenAiChatCompletionRequestDto
- llm-hop.ts
- openai-messages-provider.mapper.ts
- openai-stream.mapper.ts
- asGatewayKey
- ClientRemoveCommand
- OpenAiChatMessageDto
- ModelRemoveCommand
- content.types.ts
- EnvironmentVariables
- company-context.controller.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- chat-completions.adapter.ts
- AppMetricsBackend
- SPEC — README
- ListRunsQueryDto
- runs.controller.ts
- configure-swagger.ts
- UserRepository
- company-context.mapper.ts
- session-provider.tsx
- exitWithAgentReport
- PrismaRefreshSessionAdapter
- RunRepository
- ChatToolingDto
- openai-params-provider.mapper.ts
- metrics.ts
- http-metrics.interceptor.ts
- route.ts
- .getOne
- ProviderAddCommand
- .getOne
- PrismaService
- .getOne
- run.schemas.ts
- RedisConnectionService
- GatewayConfig
- ModelAddCommand
- ModelEditCommand
- ChatResponseDto
- ProviderEditCommand
- invitations.controller.ts
- LlmGatewayHttpAdapter
- RunLogEntry
- ProviderRemoveCommand
- cn
- ChatMessageDto
- ChatParamsDto
- domain/company-context.types.ts
- filters/http-exception.filter.ts
- CompanyContextController
- MetricsService
- GatewayModelsCatalogService
- sse-meta-payload.dto.ts
- openai-chat-message.dto.ts
- Architektura
- brand.ts
- VectorStore
- openai-chat-completion-request.dto.ts
- JwtAuthGuard
- run-lifecycle.module.ts
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
4. `DomainException` - 68 edges
5. `asProviderInstanceId()` - 67 edges
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
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (143 total, 18 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.13
Nodes (19): Inject, InvitationListItem, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, INVITATION_REPOSITORY, InvitationListRecord (+11 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (35): PageOutline, CompositeRunResultReader, GetRunOutput, Inject, OutputEditedWrite, OutputEditedWriter, RUN_RESULT_READER, RunResultReader (+27 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.07
Nodes (57): fetchCompanyContext(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+49 more)

### Community 3 - "cli.module.ts"
Cohesion: 0.05
Nodes (67): AgentReport, AgentReportStatus, PendingSecretsItem, loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers(), CliMode, CliModeFlags (+59 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.08
Nodes (52): ArchiveRunsQuery, fetchInitiatorOptions(), fetchRunLogs(), fetchUserRuns(), startRun(), ArchiveRunItem, ArchiveRunsPage, ContentBrief (+44 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.10
Nodes (29): CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, fetchArchiveRuns(), InitiatorOption (+21 more)

### Community 6 - "app-metrics.service.ts"
Cohesion: 0.18
Nodes (12): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+4 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (39): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+31 more)

### Community 9 - "provider-error.mapper.ts"
Cohesion: 0.19
Nodes (20): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 10 - "content.graph.ts"
Cohesion: 0.10
Nodes (40): CompanyContextRepository, Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+32 more)

### Community 11 - "in-process-run.worker.ts"
Cohesion: 0.18
Nodes (11): Inject, RecoverInterruptedRunsUseCase, Inject, Injectable, RunLifecycleService, TransitionExtras, Injectable, RUN_EXECUTOR (+3 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.14
Nodes (30): coercePassNoteVerdict(), isPassOnlyIssue(), isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE, nextRefineCount(), isTwoStageSocialTask() (+22 more)

### Community 13 - "ai-provider.interface.ts"
Cohesion: 0.13
Nodes (35): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, mapStopReasonToFinishReason(), CompleteOnceResult, StreamOnceResult, ProviderResponse (+27 more)

### Community 14 - "semantic-cache.service.ts"
Cohesion: 0.07
Nodes (32): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), CACHE_BACKEND, ResponseCacheService, Injectable, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex() (+24 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.24
Nodes (9): ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto (+1 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.20
Nodes (15): SseDoneEvent, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto, AnthropicThinkingContentBlockDto, AnthropicToolUseContentBlockDto (+7 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.15
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 18 - "chat.service.ts"
Cohesion: 0.08
Nodes (27): SemanticStoreEmbedState, CachedChatResponseWithConversation, isCachedChatAllowedForModelAlias(), shouldStoreChatResponse(), createInProcessSingleflight(), ChatCacheLookupResult, ChatCachePipelineService, Injectable (+19 more)

### Community 19 - "model-manager.service.ts"
Cohesion: 0.12
Nodes (26): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable (+18 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.09
Nodes (31): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+23 more)

### Community 21 - "branded.types.ts"
Cohesion: 0.06
Nodes (67): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep (+59 more)

### Community 22 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (66): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+58 more)

### Community 23 - "responses.adapter.ts"
Cohesion: 0.17
Nodes (23): buildAppProviderMetricsContext(), mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), asToolCallId(), getUsageMetadata(), getUsageMetadata() (+15 more)

### Community 24 - "start-run-form.tsx"
Cohesion: 0.15
Nodes (20): AcceptInviteFormProps, fetchRunSnapshot(), AccountView(), onPrefill(), draftFromSnapshot(), EMPTY_START_DRAFT, StartRunDraft, StartRunForm() (+12 more)

### Community 25 - "api/src/app.module.ts"
Cohesion: 0.08
Nodes (42): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind() (+34 more)

### Community 26 - "run.port.ts"
Cohesion: 0.09
Nodes (18): ListRunsOutput, contentBriefSchema, socialBriefSchema, LightRunItem, ListRunsQuery, ListRunsResult, PAGE_SIZE, RunSnapshot (+10 more)

### Community 27 - "AuthController"
Cohesion: 0.08
Nodes (27): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+19 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.08
Nodes (35): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+27 more)

### Community 29 - "ClientId"
Cohesion: 0.09
Nodes (36): CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize (+28 more)

### Community 30 - "asProviderInstanceId"
Cohesion: 0.10
Nodes (38): DEFAULT_MODELS, convertProvider(), CliAiProvider, ProviderPromptResult, ProviderCli, AddProviderInput, validateProviderApiKey(), defaultBaseUrlForOpenAiProviderType() (+30 more)

### Community 31 - "HealthService"
Cohesion: 0.10
Nodes (12): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags (+4 more)

### Community 32 - "swagger.setup.ts"
Cohesion: 0.14
Nodes (19): AppModule, Module, SseDeltaPayloadDto, ApiProperty, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp() (+11 more)

### Community 33 - "GatewayKey"
Cohesion: 0.09
Nodes (21): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), GatewayKey, ResolvedGatewayClient, getAppConfig() (+13 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "LoggingService"
Cohesion: 0.11
Nodes (9): Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, LoggingService, Injectable, Inject (+1 more)

### Community 36 - "RunRecord"
Cohesion: 0.25
Nodes (3): InProcessRunWorker, Injectable, RunRecord

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 39 - "ProviderRegistryService"
Cohesion: 0.15
Nodes (6): ChatValidationService, Injectable, UnsupportedProviderException, GatewayModelConfig, ProviderRegistryService, Injectable

### Community 40 - "DomainException"
Cohesion: 0.11
Nodes (19): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, hashPassword(), validatePasswordPolicy(), GetRunLogsOutput, orderItemsBySelectedIds() (+11 more)

### Community 41 - "HttpExceptionFilter"
Cohesion: 0.31
Nodes (3): ErrorEnvelope, HttpExceptionFilter, Catch

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.27
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.module.ts"
Cohesion: 0.09
Nodes (14): Inject, Optional, resolveAppMetricsBackend(), APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags (+6 more)

### Community 45 - "google-tools.mapper.ts"
Cohesion: 0.16
Nodes (22): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+14 more)

### Community 46 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.26
Nodes (10): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.28
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 48 - "config-generator.service.ts"
Cohesion: 0.10
Nodes (17): WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable, Injectable, WizardOrchestratorService, WizardRunResult (+9 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 51 - "types/index.ts"
Cohesion: 0.19
Nodes (20): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+12 more)

### Community 52 - "start-run.use-case.ts"
Cohesion: 0.17
Nodes (15): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, makeContentRun(), makeSocialRun(), makeSocialSnapshot() (+7 more)

### Community 53 - "patch-company-context.use-case.ts"
Cohesion: 0.38
Nodes (6): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, CompanyContextWriteDetail, isComplete(), mergeCompanyContext()

### Community 54 - "api-error.code.ts"
Cohesion: 0.14
Nodes (18): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, ApiErrorCode, ApiErrorPayload, mapAnthropicRequestToGateway() (+10 more)

### Community 55 - "CompanyContext"
Cohesion: 0.26
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 56 - "anthropic-stream.mapper.ts"
Cohesion: 0.36
Nodes (9): asMessageId(), MessageId, AnthropicStreamState, createAnthropicStreamState(), emitThinkingBlock(), eventLine(), mapSseEventToAnthropic(), nextToolBlockIndex() (+1 more)

### Community 57 - "ModelAlias"
Cohesion: 0.08
Nodes (10): ProviderTestOptions, CliAiModel, ModelAlias, ProviderInstanceId, MissingProviderApiKey, MissingProviderBaseUrl, NoopAppMetricsAdapter, Injectable (+2 more)

### Community 58 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.07
Nodes (29): ChatModule, Module, GatewayKeyGuard, Injectable, HealthModule, Module, AnthropicModule, Module (+21 more)

### Community 59 - "Public"
Cohesion: 0.13
Nodes (13): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+5 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "gateway-tool-call.dto.ts"
Cohesion: 0.13
Nodes (17): ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDonePayloadDto, SseDoneUsageDto, ApiPropertyOptional (+9 more)

### Community 63 - "cache.module.ts"
Cohesion: 0.10
Nodes (17): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+9 more)

### Community 64 - "configuration.ts"
Cohesion: 0.05
Nodes (57): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+49 more)

### Community 65 - "provider-input.ts"
Cohesion: 0.22
Nodes (13): getClientConversationId(), getOrCreateConversationIdForResponse(), buildLlmMetricsContext(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns(), composeSystemPrompt(), getResolvedSystemPrompts() (+5 more)

### Community 66 - "auth.module.ts"
Cohesion: 0.05
Nodes (58): comparePassword(), generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), AuthTokenResult, BootstrapAdminUseCase, Inject (+50 more)

### Community 67 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "llm-hop.ts"
Cohesion: 0.26
Nodes (9): LLM_GATEWAY_PORT, isRetryable(), RetryReason, ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid() (+1 more)

### Community 70 - "openai-messages-provider.mapper.ts"
Cohesion: 0.27
Nodes (7): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 71 - "openai-stream.mapper.ts"
Cohesion: 0.18
Nodes (20): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+12 more)

### Community 72 - "asGatewayKey"
Cohesion: 0.09
Nodes (12): ClientAddCommand, Command, Option, ClientEditCommand, Command, Option, KeyGenerateCommand, Command (+4 more)

### Community 73 - "ClientRemoveCommand"
Cohesion: 0.33
Nodes (3): ClientRemoveCommand, Command, Option

### Community 74 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 75 - "ModelRemoveCommand"
Cohesion: 0.33
Nodes (3): ModelRemoveCommand, Command, Option

### Community 76 - "content.types.ts"
Cohesion: 0.13
Nodes (10): ContentPipelineInput, ContentPipelineState, ContentRefineSnapshot, PageDocument, PageOutlineSection, PageOutlineSectionRole, VerifierVerdict, PrismaContentResultAdapter (+2 more)

### Community 77 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 78 - "company-context.controller.ts"
Cohesion: 0.15
Nodes (13): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+5 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.16
Nodes (17): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+9 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "chat-completions.adapter.ts"
Cohesion: 0.21
Nodes (19): toHttpException(), asSystemFingerprint(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText() (+11 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 85 - "runs.controller.ts"
Cohesion: 0.05
Nodes (50): FinalizeReviewUseCase, Injectable, GetRunLogsUseCase, Injectable, GetRunUseCase, Injectable, ListRunsUseCase, Injectable (+42 more)

### Community 86 - "configure-swagger.ts"
Cohesion: 0.27
Nodes (7): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), ACCESS_COOKIE_NAME, buildSwaggerConfig()

### Community 87 - "UserRepository"
Cohesion: 0.04
Nodes (45): BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema, Inject, ListUsersUseCase (+37 more)

### Community 88 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 89 - "session-provider.tsx"
Cohesion: 0.08
Nodes (33): UsersPage(), AcceptInvitePageProps, geistMono, geistSans, metadata, acceptInvite(), bootstrapAdmin(), Credentials (+25 more)

### Community 90 - "exitWithAgentReport"
Cohesion: 0.14
Nodes (13): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+5 more)

### Community 91 - "PrismaRefreshSessionAdapter"
Cohesion: 0.31
Nodes (3): RefreshSessionRecord, PrismaRefreshSessionAdapter, Injectable

### Community 92 - "RunRepository"
Cohesion: 0.07
Nodes (9): Inject, Inject, Inject, Inject, Inject, Inject, Inject, Inject (+1 more)

### Community 93 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 94 - "openai-params-provider.mapper.ts"
Cohesion: 0.13
Nodes (23): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+15 more)

### Community 95 - "metrics.ts"
Cohesion: 0.12
Nodes (5): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppRequestMethod, AppTokenUsage

### Community 96 - "http-metrics.interceptor.ts"
Cohesion: 0.18
Nodes (12): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsModule, Module, gatewayErrorsTotal (+4 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 99 - "ProviderAddCommand"
Cohesion: 0.31
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - ".getOne"
Cohesion: 0.19
Nodes (10): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 101 - "PrismaService"
Cohesion: 0.05
Nodes (37): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+29 more)

### Community 102 - ".getOne"
Cohesion: 0.19
Nodes (10): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 103 - "run.schemas.ts"
Cohesion: 0.20
Nodes (9): hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, runIdSchema, socialStartRunSchema (+1 more)

### Community 104 - "RedisConnectionService"
Cohesion: 0.30
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 105 - "GatewayConfig"
Cohesion: 0.09
Nodes (15): ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable, ProviderManagerService (+7 more)

### Community 106 - "ModelAddCommand"
Cohesion: 0.33
Nodes (3): ModelAddCommand, Command, Option

### Community 107 - "ModelEditCommand"
Cohesion: 0.33
Nodes (3): ModelEditCommand, Command, Option

### Community 108 - "ChatResponseDto"
Cohesion: 0.17
Nodes (10): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+2 more)

### Community 109 - "ProviderEditCommand"
Cohesion: 0.33
Nodes (3): ProviderEditCommand, Command, Option

### Community 110 - "invitations.controller.ts"
Cohesion: 0.06
Nodes (26): InviteUserUseCase, Inject, Injectable, ListInvitationsUseCase, Inject, Injectable, RevokeInvitationUseCase, Inject (+18 more)

### Community 111 - "LlmGatewayHttpAdapter"
Cohesion: 0.21
Nodes (5): LlmGatewayHttpAdapter, Inject, Injectable, GATEWAY_ERROR_CODE_LABELS, toGatewayErrorCodeLabel()

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.05
Nodes (52): logoutSession(), AppHeaderProps, AppSidebar(), AppSidebarProps, FeedbackCtaSlot(), LogoutDialog(), confirm(), LogoutDialogProps (+44 more)

### Community 115 - "ChatMessageDto"
Cohesion: 0.18
Nodes (11): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+3 more)

### Community 116 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.20
Nodes (17): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CtaItem (+9 more)

### Community 118 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 120 - "MetricsService"
Cohesion: 0.22
Nodes (6): MetricsController, Controller, Get, Res, MetricsService, Injectable

### Community 122 - "sse-meta-payload.dto.ts"
Cohesion: 0.38
Nodes (5): ChatCacheSource, SseMetaPayload, SseMetaPayloadDto, ApiProperty, ApiPropertyOptional

### Community 123 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 129 - "run-lifecycle.module.ts"
Cohesion: 0.16
Nodes (7): Inject, RUN_SSE_HUB, RunSseEvent, RunSseHub, InMemoryRunSseHub, Inject, Injectable

### Community 145 - "dashboard-shell.tsx"
Cohesion: 0.10
Nodes (19): fetchCompleteness(), CompletenessState, GATE_SECTION_LABELS, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE (+11 more)

## Knowledge Gaps
- **340 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+335 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1035 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `logging.service.ts`, `anthropic/anthropic-tools.mapper.ts`, `provider-error.mapper.ts`, `ai-provider.interface.ts`, `semantic-cache.service.ts`, `redis-vector-store.adapter.ts`, `chat.service.ts`, `responses.adapter.ts`, `ClientId`, `asProviderInstanceId`, `HealthService`, `swagger.setup.ts`, `GatewayKey`, `resilient-executor.ts`, `ProviderRegistryService`, `app-metrics.module.ts`, `google-tools.mapper.ts`, `ai-provider-gateway/src/health/health.service.ts`, `cache.module.ts`, `chat-completions.adapter.ts`, `RedisConnectionService`, `filters/http-exception.filter.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `configuration.ts`, `cli.module.ts`, `ProviderRegistryService`, `ai-provider.interface.ts`, `models.controller.ts`, `chat.service.ts`, `model-manager.service.ts`, `branded.types.ts`, `GatewayModelsCatalogService`, `exitWithAgentReport`, `asProviderInstanceId`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `asProviderInstanceId` to `configuration.ts`, `cli.module.ts`, `ProviderRegistryService`, `anthropic/anthropic-tools.mapper.ts`, `provider-error.mapper.ts`, `GatewayConfig`, `ai-provider.interface.ts`, `models.controller.ts`, `chat.service.ts`, `model-manager.service.ts`, `types/index.ts`, `branded.types.ts`, `responses.adapter.ts`, `GatewayModelsCatalogService`, `exitWithAgentReport`, `ClientId`, `metrics.ts`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _340 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `prisma-invitation.adapter.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1265597147950089 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04955034385469935 - nodes in this community are weakly interconnected._
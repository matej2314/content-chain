# Graph Report - content-chain  (2026-09-18)

## Corpus Check
- 603 files · ~171,691 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 3885 nodes · 11987 edges · 137 communities (124 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 373 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `65c5a657`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- auth.module.ts
- social.types.ts
- api/company-context.types.ts
- exitWithAgentReport
- runs.types.ts
- start-run-form.tsx
- app-metrics-backend.interface.ts
- logging.service.ts
- anthropic/anthropic-tools.mapper.ts
- api-error.code.ts
- content.graph.ts
- runs.module.ts
- social.graph.ts
- branded.types.ts
- semantic-cache.service.ts
- models.controller.ts
- anthropic-messages.controller.ts
- redis-vector-store.adapter.ts
- model-manager.service.ts
- asProviderInstanceId
- sentry-ai-metrics.adapter.ts
- cli.module.ts
- asClientId
- responses.adapter.ts
- login-card.tsx
- api/src/app.module.ts
- prisma-run.adapter.ts
- auth.controller.ts
- save-output-edited.use-case.ts
- chat.service.ts
- parseWithZod
- HealthService
- ai-provider-gateway/src/main.ts
- getAppConfig
- AnthropicMessagesRequestDto
- LoggingService
- AppMetricsService
- enums.ts
- resilient-executor.ts
- provider-registry.service.ts
- runs.controller.ts
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
- start-run.use-case.ts
- .constructor
- swagger.setup.ts
- CompanyContext
- GatewayKey
- ModelAlias
- ai-provider-gateway/src/app.module.ts
- HealthController
- SemanticCacheService
- company-context.dto.ts
- agent-answers.schema.ts
- response-cache.service.ts
- config-validator.ts
- chat-request.dto.ts
- DomainException
- ConfigInitCommand
- OpenAiChatCompletionRequestDto
- .create
- openai-messages-provider.mapper.ts
- openai-chat-completions.controller.ts
- ClientAddCommand
- prisma-invitation.adapter.ts
- OpenAiChatMessageDto
- iso-date-time.tsx
- content.types.ts
- should-include-redis-stack.ts
- CompanyContextRepository
- llm-gateway.http.adapter.ts
- PrometheusService
- chat-completions.adapter.ts
- users.controller.ts
- SPEC — README
- ListRunsQueryDto
- AuthUserContext
- env.schema.ts
- UserRepository
- company-context.mapper.ts
- session-provider.tsx
- EnvRef
- RefreshSessionRepository
- RunRepository
- openai-thinking-provider.mapper.ts
- openai-params-provider.mapper.ts
- PrometheusAppMetricsAdapter
- anthropic.module.ts
- route.ts
- .getOne
- ProviderAddCommand
- metrics.ts
- PrismaService
- ProviderListCommand
- ClientEditCommand
- GatewayConfig
- ModelAddCommand
- ModelEditCommand
- RedisConnectionService
- ProviderEditCommand
- InvitationsController
- ModelRemoveCommand
- ProviderRemoveCommand
- cn
- ChatParamsDto
- domain/company-context.types.ts
- filters/http-exception.filter.ts
- CompanyContextController
- ClientListCommand
- openai-chat-message.dto.ts
- Architektura
- brand.ts
- ConfigShowCommand
- openai-chat-completion-request.dto.ts
- ModelListCommand
- RunSseHub
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
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (137 total, 12 thin omitted)

### Community 0 - "auth.module.ts"
Cohesion: 0.07
Nodes (39): InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase, Inject (+31 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (30): PageOutline, CompositeRunResultReader, GetRunOutput, orderItemsBySelectedIds(), RUN_RESULT_READER, RunResultReader, ContentBrief, SocialBrief (+22 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (55): fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+47 more)

### Community 3 - "exitWithAgentReport"
Cohesion: 0.14
Nodes (25): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+17 more)

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
Nodes (19): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, SentryErrorReportingAdapter, Injectable (+11 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (39): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+31 more)

### Community 9 - "api-error.code.ts"
Cohesion: 0.16
Nodes (22): ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus() (+14 more)

### Community 10 - "content.graph.ts"
Cohesion: 0.10
Nodes (37): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+29 more)

### Community 11 - "runs.module.ts"
Cohesion: 0.13
Nodes (20): ListRunsOutput, ratingSchema, ResumeHitlUseCase, Inject, Injectable, RunLifecycleService, TransitionExtras, Injectable (+12 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (32): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.13
Nodes (34): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, mapStopReasonToFinishReason(), StreamOnceParams, StreamOnceResult, ProviderResponse (+26 more)

### Community 14 - "semantic-cache.service.ts"
Cohesion: 0.08
Nodes (22): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema() (+14 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.17
Nodes (11): ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto (+3 more)

### Community 16 - "anthropic-messages.controller.ts"
Cohesion: 0.13
Nodes (26): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+18 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.11
Nodes (21): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+13 more)

### Community 18 - "model-manager.service.ts"
Cohesion: 0.13
Nodes (26): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable (+18 more)

### Community 19 - "asProviderInstanceId"
Cohesion: 0.05
Nodes (83): collectPendingSecrets(), DEFAULT_MODELS, convertProvider(), convertRateLimit(), ProviderPromptResult, generateGatewayConfigTemplate(), PromptAddClientResult, validateProviderApiKey() (+75 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.11
Nodes (27): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+19 more)

### Community 21 - "cli.module.ts"
Cohesion: 0.05
Nodes (58): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), CliModule, Module, KeyGenerateCommand (+50 more)

### Community 22 - "asClientId"
Cohesion: 0.04
Nodes (51): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+43 more)

### Community 23 - "responses.adapter.ts"
Cohesion: 0.26
Nodes (15): asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse() (+7 more)

### Community 24 - "login-card.tsx"
Cohesion: 0.17
Nodes (15): AcceptInvitePageProps, acceptInvite(), AcceptInviteForm(), onSubmit(), AcceptInviteFormProps, passwordMeetsPolicy(), Card(), CardAction() (+7 more)

### Community 25 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (50): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind() (+42 more)

### Community 26 - "prisma-run.adapter.ts"
Cohesion: 0.10
Nodes (14): LightRunItem, ListRunsQuery, ListRunsResult, RunSnapshot, RunLogEntry, ALLOWED, assertTransition(), PrismaRunAdapter (+6 more)

### Community 27 - "auth.controller.ts"
Cohesion: 0.07
Nodes (31): BootstrapStatusUseCase, Injectable, AuthController, ApiTags, Body, Controller, Get, HttpCode (+23 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (33): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+25 more)

### Community 29 - "chat.service.ts"
Cohesion: 0.07
Nodes (55): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+47 more)

### Community 30 - "parseWithZod"
Cohesion: 0.29
Nodes (7): assertSameIds(), SaveOutputEditedUseCase, Inject, Injectable, validationFailed(), withCharacterCount(), parseWithZod()

### Community 31 - "HealthService"
Cohesion: 0.11
Nodes (11): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+3 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "getAppConfig"
Cohesion: 0.16
Nodes (14): readClientGatewayKey(), readGatewayKeyHeader(), asGatewayKey(), getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard (+6 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "LoggingService"
Cohesion: 0.11
Nodes (11): Inject, Inject, Inject, Optional, PinoLoggerAdapter, Injectable, LogContext, LoggingService (+3 more)

### Community 36 - "AppMetricsService"
Cohesion: 0.11
Nodes (4): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 39 - "provider-registry.service.ts"
Cohesion: 0.13
Nodes (13): CompleteOnceResult, UnsupportedProviderException, ModelId, GatewayCapabilitiesConfig, GatewayModelConfig, GatewayParamsConfig, AIProvider, OpenAiApiSurface (+5 more)

### Community 40 - "runs.controller.ts"
Cohesion: 0.07
Nodes (23): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsUseCase, Inject, Injectable, GetRunUseCase, Inject (+15 more)

### Community 41 - "new-ids.ts"
Cohesion: 0.18
Nodes (7): ErrorEnvelope, HttpExceptionFilter, Catch, newInvitationId(), newRequestId(), RequestIdMiddleware, Injectable

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.service.ts"
Cohesion: 0.12
Nodes (13): resolveAppMetricsBackend(), Inject, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller (+5 more)

### Community 45 - "google-tools.mapper.ts"
Cohesion: 0.16
Nodes (25): asInputTokens(), asOutputTokens(), getUsageMetadata(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), getUsageMetadata() (+17 more)

### Community 46 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.24
Nodes (11): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+3 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 48 - "config-generator.service.ts"
Cohesion: 0.14
Nodes (11): ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, EnvTemplateInput, generateEnvTemplate(), isEnvInputRedisRequired() (+3 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 51 - "types/index.ts"
Cohesion: 0.12
Nodes (25): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+17 more)

### Community 52 - "start-run.use-case.ts"
Cohesion: 0.10
Nodes (26): GetRunLogsOutput, contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand (+18 more)

### Community 53 - ".constructor"
Cohesion: 0.07
Nodes (19): AcceptInviteUseCase, Inject, Injectable, BootstrapAdminUseCase, Inject, Injectable, LoginUseCase, Inject (+11 more)

### Community 54 - "swagger.setup.ts"
Cohesion: 0.05
Nodes (49): ChatCacheSource, GATEWAY_CACHE_HEADER, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional (+41 more)

### Community 55 - "CompanyContext"
Cohesion: 0.23
Nodes (6): CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 56 - "GatewayKey"
Cohesion: 0.11
Nodes (15): StreamCleanupInterceptor, Injectable, resolveClientIdFromKey(), asRequestId(), GatewayKey, ResolvedGatewayClient, SmartRateLimitGuard, Injectable (+7 more)

### Community 57 - "ModelAlias"
Cohesion: 0.06
Nodes (7): ProviderTestOptions, CliAiModel, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 58 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.07
Nodes (25): HealthModule, Module, LoggingModule, Global, Module, AiMetricsModule, Global, Module (+17 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "SemanticCacheService"
Cohesion: 0.16
Nodes (12): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), SemanticCacheService (+4 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 63 - "response-cache.service.ts"
Cohesion: 0.10
Nodes (16): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, CacheModule, CacheModuleOptions (+8 more)

### Community 64 - "config-validator.ts"
Cohesion: 0.17
Nodes (11): ConfigValidateCommand, Command, Option, CliGatewayValidatorService, CliValidateOptions, Injectable, collectInactiveProviderWarnings(), formatZodIssues() (+3 more)

### Community 65 - "chat-request.dto.ts"
Cohesion: 0.09
Nodes (25): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+17 more)

### Community 66 - "DomainException"
Cohesion: 0.12
Nodes (23): AcceptInviteResult, acceptInviteSchema, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds() (+15 more)

### Community 67 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - ".create"
Cohesion: 0.13
Nodes (13): FeedbackController, ApiCookieAuth, ApiTags, Body, Controller, HttpCode, Post, CreateFeedbackDto (+5 more)

### Community 70 - "openai-messages-provider.mapper.ts"
Cohesion: 0.28
Nodes (6): ProviderAssistantTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 71 - "openai-chat-completions.controller.ts"
Cohesion: 0.10
Nodes (29): fromGatewayToolCallDto(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiAuth() (+21 more)

### Community 72 - "ClientAddCommand"
Cohesion: 0.33
Nodes (3): ClientAddCommand, Command, Option

### Community 73 - "prisma-invitation.adapter.ts"
Cohesion: 0.16
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 74 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 75 - "iso-date-time.tsx"
Cohesion: 0.36
Nodes (6): DateTimeDisplayKind, formatIsoDateTime(), LIST_FORMAT, LOG_FORMAT, IsoDateTime(), IsoDateTimeProps

### Community 76 - "content.types.ts"
Cohesion: 0.09
Nodes (17): ContentResultStore, ContentPipelineInput, ContentPipelineState, ContentRefineSnapshot, PageDocument, PageOutlineSection, PageOutlineSectionRole, VerifierVerdict (+9 more)

### Community 77 - "should-include-redis-stack.ts"
Cohesion: 0.10
Nodes (23): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+15 more)

### Community 78 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (19): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+11 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (40): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+32 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "chat-completions.adapter.ts"
Cohesion: 0.21
Nodes (19): toHttpException(), asSystemFingerprint(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText() (+11 more)

### Community 82 - "users.controller.ts"
Cohesion: 0.07
Nodes (26): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Inject (+18 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ListRunsQueryDto"
Cohesion: 0.11
Nodes (14): ListRunsUseCase, Inject, Injectable, ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional (+6 more)

### Community 85 - "AuthUserContext"
Cohesion: 0.08
Nodes (24): ApiCookieAuth, Patch, Body, ListRunsUserItem, ListRunsUserOutput, ListRunsUserUseCase, Injectable, RunsController (+16 more)

### Community 86 - "env.schema.ts"
Cohesion: 0.17
Nodes (11): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+3 more)

### Community 87 - "UserRepository"
Cohesion: 0.11
Nodes (13): Inject, AuthUser, JwtPayload, UserListItem, CreateAdminIfNoneData, CreateAdminIfNoneResult, UserForAuth, UserRepository (+5 more)

### Community 88 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 89 - "session-provider.tsx"
Cohesion: 0.09
Nodes (32): UsersPage(), geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession() (+24 more)

### Community 90 - "EnvRef"
Cohesion: 0.09
Nodes (19): ConfigSecretsStatusCommand, Command, Option, ProviderTestCommand, Command, Option, CliAiProvider, EnvPatchService (+11 more)

### Community 91 - "RefreshSessionRepository"
Cohesion: 0.12
Nodes (8): RefreshUseCase, Inject, Injectable, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 92 - "RunRepository"
Cohesion: 0.07
Nodes (10): InProcessRunWorker, Inject, Injectable, Inject, RecoverInterruptedRunsUseCase, Inject, Injectable, Inject (+2 more)

### Community 93 - "openai-thinking-provider.mapper.ts"
Cohesion: 0.25
Nodes (12): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), isOpenAiEffortLevel(), isOpenAiReasoningRequested(), mapThinkingBudgetToEffort(), mapThinkingToResponsesReasoning(), OPENAI_EFFORT_LEVELS (+4 more)

### Community 94 - "openai-params-provider.mapper.ts"
Cohesion: 0.22
Nodes (12): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+4 more)

### Community 95 - "PrometheusAppMetricsAdapter"
Cohesion: 0.13
Nodes (5): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 96 - "anthropic.module.ts"
Cohesion: 0.21
Nodes (10): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+2 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 99 - "ProviderAddCommand"
Cohesion: 0.31
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "metrics.ts"
Cohesion: 0.10
Nodes (27): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias() (+19 more)

### Community 101 - "PrismaService"
Cohesion: 0.08
Nodes (24): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+16 more)

### Community 102 - "ProviderListCommand"
Cohesion: 0.40
Nodes (3): ProviderListCommand, Command, Option

### Community 104 - "ClientEditCommand"
Cohesion: 0.33
Nodes (3): ClientEditCommand, Command, Option

### Community 105 - "GatewayConfig"
Cohesion: 0.07
Nodes (21): PendingSecretsItem, ClientRemoveCommand, Command, Option, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite() (+13 more)

### Community 106 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 107 - "ModelEditCommand"
Cohesion: 0.33
Nodes (3): ModelEditCommand, Command, Option

### Community 108 - "RedisConnectionService"
Cohesion: 0.18
Nodes (5): RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 109 - "ProviderEditCommand"
Cohesion: 0.33
Nodes (3): ProviderEditCommand, Command, Option

### Community 110 - "InvitationsController"
Cohesion: 0.16
Nodes (9): InvitationsController, ApiCookieAuth, ApiTags, Controller, Delete, Get, HttpCode, Param (+1 more)

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.33
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.06
Nodes (40): AppHeader(), AppHeaderProps, FeedbackCtaSlot(), LogoutDialogProps, Dialog(), DialogContent(), DialogDescription(), DialogFooter() (+32 more)

### Community 116 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.19
Nodes (17): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+9 more)

### Community 118 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 121 - "ClientListCommand"
Cohesion: 0.40
Nodes (3): ClientListCommand, Command, Option

### Community 123 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 126 - "ConfigShowCommand"
Cohesion: 0.40
Nodes (3): ConfigShowCommand, Command, Option

### Community 128 - "ModelListCommand"
Cohesion: 0.40
Nodes (3): ModelListCommand, Command, Option

### Community 129 - "RunSseHub"
Cohesion: 0.16
Nodes (6): Inject, RunSseEvent, RunSseHub, InMemoryRunSseHub, Inject, Injectable

### Community 145 - "dashboard-shell.tsx"
Cohesion: 0.12
Nodes (17): GATE_SECTION_LABELS, CompletenessChip(), useCompleteness(), AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FloatingBoxSlot(), DashboardShell() (+9 more)

## Knowledge Gaps
- **342 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+337 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1037 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `logging.service.ts`, `anthropic/anthropic-tools.mapper.ts`, `api-error.code.ts`, `branded.types.ts`, `semantic-cache.service.ts`, `redis-vector-store.adapter.ts`, `asProviderInstanceId`, `responses.adapter.ts`, `chat.service.ts`, `HealthService`, `ai-provider-gateway/src/main.ts`, `resilient-executor.ts`, `provider-registry.service.ts`, `google-tools.mapper.ts`, `ai-provider-gateway/src/health/health.service.ts`, `swagger.setup.ts`, `GatewayKey`, `ai-provider-gateway/src/app.module.ts`, `SemanticCacheService`, `response-cache.service.ts`, `chat-completions.adapter.ts`, `RedisConnectionService`, `filters/http-exception.filter.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `config-validator.ts`, `exitWithAgentReport`, `provider-registry.service.ts`, `models.controller.ts`, `model-manager.service.ts`, `asProviderInstanceId`, `EnvRef`, `chat.service.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `asProviderInstanceId` to `exitWithAgentReport`, `metrics.ts`, `provider-registry.service.ts`, `anthropic/anthropic-tools.mapper.ts`, `api-error.code.ts`, `GatewayConfig`, `branded.types.ts`, `models.controller.ts`, `model-manager.service.ts`, `types/index.ts`, `cli.module.ts`, `EnvRef`, `chat.service.ts`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _342 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `auth.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07117255504352278 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.055482456140350876 - nodes in this community are weakly interconnected._
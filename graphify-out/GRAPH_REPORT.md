# Graph Report - content-chain  (2026-09-19)

## Corpus Check
- 621 files · ~180,634 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 4028 nodes · 12423 edges · 137 communities (118 shown, 18 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 385 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f26c9c16`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- prisma-invitation.adapter.ts
- social.types.ts
- isRecord
- cli.module.ts
- runs.types.ts
- run-details-view.tsx
- ModelAlias
- logging.service.ts
- anthropic/anthropic-tools.mapper.ts
- ChatMessageDto
- content.graph.ts
- users.controller.ts
- social.graph.ts
- ai-provider.interface.ts
- http-metrics.interceptor.ts
- models.controller.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- runs.controller.ts
- GatewayConfig
- sentry-ai-metrics.adapter.ts
- branded.types.ts
- chat-stream.controller.ts
- chat.service.ts
- PrismaRefreshSessionAdapter
- api/src/app.module.ts
- RunRepository
- AuthController
- save-output-edited.use-case.ts
- semantic-cache.service.ts
- types/index.ts
- HealthService
- swagger.setup.ts
- openai-stream.mapper.ts
- AnthropicMessagesRequestDto
- runs-result.types.ts
- exitWithAgentReport
- enums.ts
- feedback-form.tsx
- provider-instances.bootstrap.ts
- start-run.use-case.ts
- HttpExceptionFilter
- openai-models.controller.ts
- ids.ts
- MetricsController
- auth.module.ts
- openai-chat-completions.controller.ts
- anthropic-messages.controller.ts
- config-generator.service.ts
- chat-params.dto.ts
- ListRunsQueryDto
- content.types.ts
- own-runs-provider.tsx
- chat-provider-call.service.ts
- RedisConnectionService
- CompanyContext
- sse-event.type.ts
- GatewayKey
- should-include-redis-stack.ts
- HealthController
- .streamChat
- company-context.dto.ts
- ai-provider-gateway/src/app.module.ts
- response-cache.service.ts
- configuration.ts
- api-error.code.ts
- InvitationsController
- ModelRemoveCommand
- OpenAiChatCompletionRequestDto
- domain/feedback.types.ts
- chat-completions.adapter.ts
- responses.adapter.ts
- ClientAddCommand
- ClientRemoveCommand
- OpenAiChatMessageDto
- EnvPatchService
- asProviderInstanceId
- HealthController
- CompanyContextRepository
- llm-gateway.http.adapter.ts
- PrometheusService
- google-tools.mapper.ts
- openai-thinking-provider.mapper.ts
- SPEC — README
- PrismaService
- health-readiness-response.dto.ts
- AppModule
- auth.controller.ts
- company-context.mapper.ts
- apiFetch
- filters/http-exception.filter.ts
- StartRunDto
- OllamaEmbeddingAdapter
- ChatResponseDto
- EnvironmentVariables
- getAppConfig
- DomainException
- route.ts
- ConsoleLoggerAdapter
- ProviderAddCommand
- openai-messages-provider.mapper.ts
- create-feedback.use-case.ts
- ActiveStreamsTracker
- LoggingService
- semantic-cache.constants.ts
- KeyGeneratorService
- openai-params-provider.mapper.ts
- ModelEditCommand
- .create
- ProviderEditCommand
- VectorStore
- ConfigInitCommand
- ConfigValidateCommand
- ProviderRemoveCommand
- cn
- RunsModule
- ChatParamsDto
- domain/company-context.types.ts
- RolesGuard
- CompanyContextController
- ClientEditCommand
- openai-chat-message.dto.ts
- Architektura
- brand.ts
- openai-chat-completion-request.dto.ts
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
10. `isRecord()` - 52 edges

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

## Communities (137 total, 18 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.11
Nodes (21): Inject, InvitationListItem, Inject, Inject, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult (+13 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (27): CompositeRunResultReader, GetRunOutput, orderItemsBySelectedIds(), ContentBrief, SocialBrief, EmptyRunResultReader, Injectable, SocialResultStore (+19 more)

### Community 2 - "isRecord"
Cohesion: 0.05
Nodes (73): fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+65 more)

### Community 3 - "cli.module.ts"
Cohesion: 0.06
Nodes (64): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags (+56 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.06
Nodes (49): ArchiveRunsQuery, fetchArchiveRuns(), fetchInitiatorOptions(), fetchRunLogs(), finalizeRunReview(), InitiatorOption, isUserRating(), patchRunRating() (+41 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.08
Nodes (40): CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, fetchRunSnapshot(), startRun() (+32 more)

### Community 6 - "ModelAlias"
Cohesion: 0.04
Nodes (36): ProviderTestOptions, CliAiModel, HttpMetricsMiddleware, Injectable, ClientId, ModelAlias, ProviderInstanceId, HealthCheckResult (+28 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.08
Nodes (20): LEVEL_ORDER, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, SentryErrorReportingAdapter, Injectable, parseLogLevel(), ErrorReportingBackend (+12 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.10
Nodes (38): asInputTokens(), asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort() (+30 more)

### Community 9 - "ChatMessageDto"
Cohesion: 0.10
Nodes (23): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+15 more)

### Community 10 - "content.graph.ts"
Cohesion: 0.10
Nodes (39): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+31 more)

### Community 11 - "users.controller.ts"
Cohesion: 0.07
Nodes (25): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Inject (+17 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (32): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 13 - "ai-provider.interface.ts"
Cohesion: 0.12
Nodes (36): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional (+28 more)

### Community 14 - "http-metrics.interceptor.ts"
Cohesion: 0.11
Nodes (18): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+10 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.13
Nodes (25): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+17 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (24): isUnservableCachedReply(), CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag() (+16 more)

### Community 18 - "runs.controller.ts"
Cohesion: 0.05
Nodes (52): FinalizeReviewUseCase, Injectable, GetRunLogsUseCase, Injectable, GetRunUseCase, Injectable, ListRunsUseCase, Injectable (+44 more)

### Community 19 - "GatewayConfig"
Cohesion: 0.07
Nodes (39): assertInteractiveAllowed(), DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), ClientManagerService, Injectable (+31 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (33): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+25 more)

### Community 21 - "branded.types.ts"
Cohesion: 0.10
Nodes (41): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, CliAiModelSchema (+33 more)

### Community 22 - "chat-stream.controller.ts"
Cohesion: 0.06
Nodes (39): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+31 more)

### Community 23 - "chat.service.ts"
Cohesion: 0.06
Nodes (57): SemanticStoreEmbedState, CacheIdentityMessage, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+49 more)

### Community 24 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 25 - "api/src/app.module.ts"
Cohesion: 0.05
Nodes (58): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor (+50 more)

### Community 26 - "RunRepository"
Cohesion: 0.03
Nodes (58): Inject, GetRunLogsOutput, Inject, Inject, InProcessRunWorker, Inject, Injectable, ListRunsOutput (+50 more)

### Community 27 - "AuthController"
Cohesion: 0.20
Nodes (14): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+6 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (32): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+24 more)

### Community 29 - "semantic-cache.service.ts"
Cohesion: 0.11
Nodes (22): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs() (+14 more)

### Community 30 - "types/index.ts"
Cohesion: 0.07
Nodes (44): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+36 more)

### Community 31 - "HealthService"
Cohesion: 0.17
Nodes (5): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthService, Injectable

### Community 32 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (23): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+15 more)

### Community 33 - "openai-stream.mapper.ts"
Cohesion: 0.18
Nodes (20): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+12 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (38): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+30 more)

### Community 35 - "runs-result.types.ts"
Cohesion: 0.05
Nodes (61): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+53 more)

### Community 36 - "exitWithAgentReport"
Cohesion: 0.12
Nodes (10): exitWithAgentReport(), WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable, Injectable, WizardOrchestratorService (+2 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.20
Nodes (14): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+6 more)

### Community 39 - "provider-instances.bootstrap.ts"
Cohesion: 0.23
Nodes (11): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+3 more)

### Community 40 - "start-run.use-case.ts"
Cohesion: 0.12
Nodes (19): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, StartRunUseCase, Inject, Injectable (+11 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "MetricsController"
Cohesion: 0.17
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 45 - "auth.module.ts"
Cohesion: 0.07
Nodes (41): InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, ListInvitationsUseCase, Injectable, ResendInvitationUseCase (+33 more)

### Community 46 - "openai-chat-completions.controller.ts"
Cohesion: 0.18
Nodes (13): OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiAuth(), OPENAI_STREAM_API_DESCRIPTION, mapOpenAiMessagesToGateway(), mapOpenAiToolCalls() (+5 more)

### Community 47 - "anthropic-messages.controller.ts"
Cohesion: 0.08
Nodes (29): GATEWAY_CACHE_HEADER, ApiAnthropicErrorResponses(), AnthropicMessagesController, ApiSecurity, ApiTags, Controller, AnthropicModelsController, ApiNotFoundResponse (+21 more)

### Community 48 - "config-generator.service.ts"
Cohesion: 0.14
Nodes (17): isRedisRequired(), BasicServerAnswers, CacheAnswers, MetricsAnswers, RateLimitAnswers, RedisAnswers, SentryAnswers, ServerPromptService (+9 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "content.types.ts"
Cohesion: 0.07
Nodes (19): ContentPipelineInput, ContentPipelineState, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole, VerifierVerdict (+11 more)

### Community 52 - "own-runs-provider.tsx"
Cohesion: 0.08
Nodes (32): assertNever(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome, runTerminalToastId(), viewingRunIdFromPathname() (+24 more)

### Community 53 - "chat-provider-call.service.ts"
Cohesion: 0.12
Nodes (23): buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns(), clamp(), isOverrideKey() (+15 more)

### Community 54 - "RedisConnectionService"
Cohesion: 0.22
Nodes (5): RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 55 - "CompanyContext"
Cohesion: 0.23
Nodes (6): CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 56 - "sse-event.type.ts"
Cohesion: 0.19
Nodes (10): ChatCacheSource, SseMetaPayload, SseMetaPayloadDto, ApiProperty, ApiPropertyOptional, STREAM_CACHE_REPLAY_CHUNK_SIZE, StreamCacheReplayInput, SseDeltaEvent (+2 more)

### Community 57 - "GatewayKey"
Cohesion: 0.10
Nodes (18): ChatService, Injectable, ChatErrorHandlerService, Injectable, ChatProviderCooldownService, Injectable, ClientCli, resolveClientIdFromKey() (+10 more)

### Community 58 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (11): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+3 more)

### Community 59 - "HealthController"
Cohesion: 0.11
Nodes (14): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+6 more)

### Community 60 - ".streamChat"
Cohesion: 0.13
Nodes (13): ChatStreamController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags, Body (+5 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.09
Nodes (23): ChatModule, Module, HealthModule, Module, AnthropicModule, Module, IntegrationsModule, Module (+15 more)

### Community 63 - "response-cache.service.ts"
Cohesion: 0.10
Nodes (16): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, CacheModule, CacheModuleOptions (+8 more)

### Community 64 - "configuration.ts"
Cohesion: 0.06
Nodes (51): CliGatewayValidatorService, CliValidateOptions, Injectable, normalizeGatewayConfigForWrite(), ValidationFormatter, asPort(), asSemanticCacheTtlSeconds(), AppConfiguration (+43 more)

### Community 65 - "api-error.code.ts"
Cohesion: 0.15
Nodes (23): ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus() (+15 more)

### Community 66 - "InvitationsController"
Cohesion: 0.16
Nodes (10): InvitationsController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+2 more)

### Community 67 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "domain/feedback.types.ts"
Cohesion: 0.19
Nodes (8): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_BODY_MAX, FeedbackEntry, FeedbackRepository, PrismaFeedbackAdapter, Injectable

### Community 70 - "chat-completions.adapter.ts"
Cohesion: 0.22
Nodes (17): asSystemFingerprint(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText(), finalizeOpenAiStreamToolCalls(), OpenAiStreamToolCallAccumulator (+9 more)

### Community 71 - "responses.adapter.ts"
Cohesion: 0.25
Nodes (16): toHttpException(), asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason() (+8 more)

### Community 72 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 73 - "ClientRemoveCommand"
Cohesion: 0.33
Nodes (3): ClientRemoveCommand, Command, Option

### Community 74 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 75 - "EnvPatchService"
Cohesion: 0.13
Nodes (7): ModelAddCommand, Command, Option, ConfigPersistenceService, Injectable, EnvPatchService, Injectable

### Community 76 - "asProviderInstanceId"
Cohesion: 0.09
Nodes (40): PendingSecretsItem, collectPendingSecrets(), ProviderTestCommand, Command, Option, DEFAULT_MODELS, InitAnswers, convertProvider() (+32 more)

### Community 77 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 78 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (19): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+11 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.12
Nodes (21): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+13 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "google-tools.mapper.ts"
Cohesion: 0.15
Nodes (24): mapProviderResponseToAiObservation(), asOutputTokens(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), getUsageMetadata(), textStream() (+16 more)

### Community 82 - "openai-thinking-provider.mapper.ts"
Cohesion: 0.15
Nodes (18): ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode() (+10 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "PrismaService"
Cohesion: 0.17
Nodes (5): PrismaModule, Global, Module, PrismaService, Injectable

### Community 85 - "health-readiness-response.dto.ts"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 87 - "auth.controller.ts"
Cohesion: 0.05
Nodes (41): patchUserSchema, BootstrapStatusUseCase, Inject, Injectable, MeUseCase, Inject, Injectable, RefreshUseCase (+33 more)

### Community 88 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 89 - "apiFetch"
Cohesion: 0.07
Nodes (40): UsersPage(), AcceptInvitePageProps, geistMono, geistSans, metadata, acceptInvite(), bootstrapAdmin(), Credentials (+32 more)

### Community 90 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 91 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 92 - "OllamaEmbeddingAdapter"
Cohesion: 0.24
Nodes (3): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend

### Community 93 - "ChatResponseDto"
Cohesion: 0.14
Nodes (12): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, GatewayToolDefinitionDto, ApiProperty (+4 more)

### Community 94 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 95 - "getAppConfig"
Cohesion: 0.18
Nodes (11): getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable, OpenAiBearerAuthGuard (+3 more)

### Community 96 - "DomainException"
Cohesion: 0.07
Nodes (32): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken() (+24 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "openai-messages-provider.mapper.ts"
Cohesion: 0.25
Nodes (8): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapTurnsToOpenAiMessages(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 101 - "create-feedback.use-case.ts"
Cohesion: 0.13
Nodes (15): CreateFeedbackUseCase, Inject, Injectable, FEEDBACK_RUN_READER, FeedbackRunLookup, FeedbackRunReader, FEEDBACK_REPOSITORY, FeedbackController (+7 more)

### Community 103 - "LoggingService"
Cohesion: 0.11
Nodes (9): Inject, Inject, PinoLoggerAdapter, Injectable, LogContext, LoggingService, Injectable, Inject (+1 more)

### Community 104 - "semantic-cache.constants.ts"
Cohesion: 0.14
Nodes (11): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+3 more)

### Community 105 - "KeyGeneratorService"
Cohesion: 0.11
Nodes (11): KeyGenerateCommand, Command, Option, KeyGeneratorService, Injectable, ClientPromptService, Injectable, KeyPromptService (+3 more)

### Community 106 - "openai-params-provider.mapper.ts"
Cohesion: 0.24
Nodes (11): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+3 more)

### Community 107 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 108 - ".create"
Cohesion: 0.20
Nodes (9): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 109 - "ProviderEditCommand"
Cohesion: 0.33
Nodes (3): ProviderEditCommand, Command, Option

### Community 110 - "VectorStore"
Cohesion: 0.22
Nodes (3): VectorStore, Inject, Optional

### Community 111 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 112 - "ConfigValidateCommand"
Cohesion: 0.40
Nodes (3): ConfigValidateCommand, Command, Option

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.07
Nodes (44): AcceptInviteFormProps, AppHeaderProps, LogoutDialogProps, Button(), buttonVariants, Card(), CardAction(), CardContent() (+36 more)

### Community 116 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.19
Nodes (17): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+9 more)

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 121 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 123 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 145 - "dashboard-shell.tsx"
Cohesion: 0.13
Nodes (14): CompletenessChip(), CompletenessProvider(), FeedbackCta(), AppHeader(), AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot() (+6 more)

## Knowledge Gaps
- **357 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+352 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1062 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `ModelAlias`, `logging.service.ts`, `anthropic/anthropic-tools.mapper.ts`, `redis-vector-store.adapter.ts`, `chat.service.ts`, `semantic-cache.service.ts`, `types/index.ts`, `HealthService`, `swagger.setup.ts`, `provider-instances.bootstrap.ts`, `RedisConnectionService`, `sse-event.type.ts`, `GatewayKey`, `ai-provider-gateway/src/app.module.ts`, `response-cache.service.ts`, `api-error.code.ts`, `chat-completions.adapter.ts`, `responses.adapter.ts`, `google-tools.mapper.ts`, `filters/http-exception.filter.ts`, `OllamaEmbeddingAdapter`, `VectorStore`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `configuration.ts`, `cli.module.ts`, `exitWithAgentReport`, `asProviderInstanceId`, `models.controller.ts`, `branded.types.ts`, `chat.service.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `DomainException` connect `DomainException` to `prisma-invitation.adapter.ts`, `social.types.ts`, `InvitationsController`, `create-feedback.use-case.ts`, `start-run.use-case.ts`, `users.controller.ts`, `auth.module.ts`, `CompanyContextRepository`, `http-metrics.interceptor.ts`, `runs.controller.ts`, `domain/company-context.types.ts`, `auth.controller.ts`, `api/src/app.module.ts`, `RunRepository`, `save-output-edited.use-case.ts`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _357 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `prisma-invitation.adapter.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10668563300142248 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06110154905335628 - nodes in this community are weakly interconnected._
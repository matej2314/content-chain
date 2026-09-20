# Graph Report - content-chain  (2026-09-20)

## Corpus Check
- 627 files · ~181,975 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4061 nodes · 12529 edges · 132 communities (113 shown, 17 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 387 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `61faa7c8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- prisma-invitation.adapter.ts
- social.types.ts
- api/company-context.types.ts
- cli.module.ts
- isRecord
- run-details-view.tsx
- ModelAlias
- LogContext
- anthropic/anthropic-tools.mapper.ts
- metrics.ts
- content.types.ts
- UserRepository
- social.graph.ts
- branded.types.ts
- config-generator.service.ts
- models.controller.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- runs.controller.ts
- model-manager.service.ts
- sentry-ai-metrics.adapter.ts
- asProviderInstanceId
- anthropic-messages.controller.ts
- chat.service.ts
- RunRepository
- api/src/app.module.ts
- prisma-run.adapter.ts
- auth.controller.ts
- save-output-edited.use-case.ts
- SemanticCacheService
- types/index.ts
- HealthService
- swagger.setup.ts
- openai-stream.mapper.ts
- AnthropicMessagesRequestDto
- run-review-panel.tsx
- .info
- enums.ts
- feedback-form.tsx
- AuthUserContext
- start-run.use-case.ts
- own-runs-provider.tsx
- openai-models.controller.ts
- ids.ts
- MetricsController
- auth.module.ts
- agent-answers.schema.ts
- anthropic-models.controller.ts
- llm-hop.ts
- chat-params.dto.ts
- ListRunsQueryDto
- cli-apply.types.ts
- provider-error.mapper.ts
- LoggingService
- users-view.tsx
- CompanyContext
- PrometheusAppMetricsAdapter
- patch-company-context.use-case.ts
- should-include-redis-stack.ts
- HealthController
- app-metrics.service.ts
- company-context.dto.ts
- ai-provider-gateway/src/app.module.ts
- response-cache.service.ts
- configuration.ts
- InvitationsController
- AppMetricsService
- ModelRemoveCommand
- OpenAiChatCompletionRequestDto
- ChatResponseDto
- openai-chat-completion-response.dto.ts
- KeyGeneratorService
- ClientAddCommand
- ClientRemoveCommand
- OpenAiChatMessageDto
- GatewayConfig
- anthropic-auth.decorator.ts
- .getOne
- CompanyContextRepository
- llm-gateway.http.adapter.ts
- PrometheusService
- responses.adapter.ts
- ActiveStreamsTracker
- SPEC — README
- ModelAddCommand
- VectorStore
- OpenAiExceptionFilter
- company-context.mapper.ts
- envelope.ts
- app-metrics-backend.interface.ts
- StartRunDto
- ChatToolingDto
- getAppConfig
- DomainException
- route.ts
- health-readiness-response.dto.ts
- ProviderAddCommand
- .getOne
- PrismaService
- .getOne
- RedisConnectionService
- semantic-cache.constants.ts
- GatewayCommand
- PrismaRefreshSessionAdapter
- ModelEditCommand
- EnvironmentVariables
- ProviderEditCommand
- semantic-cache.service.ts
- ChatParamsDto
- ProviderRemoveCommand
- cn
- GatewayModelsCatalogService
- resolve-provider-call-options.ts
- domain/company-context.types.ts
- CompanyContextController
- ClientEditCommand
- openai-chat-message.dto.ts
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
4. `DomainException` - 68 edges
5. `asProviderInstanceId()` - 67 edges
6. `GatewayConfig` - 65 edges
7. `isRecord()` - 60 edges
8. `cn()` - 60 edges
9. `GatewayKey` - 59 edges
10. `ClientId` - 54 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (132 total, 17 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.11
Nodes (21): Inject, InvitationListItem, Inject, Inject, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult (+13 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (27): PageDocument, CompositeRunResultReader, GetRunOutput, RunResultReader, ContentBrief, SocialBrief, EmptyRunResultReader, Injectable (+19 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (67): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+59 more)

### Community 3 - "cli.module.ts"
Cohesion: 0.09
Nodes (42): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+34 more)

### Community 4 - "isRecord"
Cohesion: 0.07
Nodes (64): ArchiveRunsQuery, InitiatorOption, isUserRating(), patchRunRating(), HitlAccepted, isPageOutlineSectionRole(), isReelDuration(), PageOutlineSection (+56 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.08
Nodes (43): metadata, metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS (+35 more)

### Community 6 - "ModelAlias"
Cohesion: 0.08
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 7 - "LogContext"
Cohesion: 0.05
Nodes (29): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable, ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter (+21 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.06
Nodes (73): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, mapProviderResponseToAiObservation(), toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens() (+65 more)

### Community 9 - "metrics.ts"
Cohesion: 0.05
Nodes (57): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+49 more)

### Community 10 - "content.types.ts"
Cohesion: 0.08
Nodes (29): ContentPipelineFacade, toOutcome(), Inject, Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject (+21 more)

### Community 11 - "UserRepository"
Cohesion: 0.04
Nodes (43): ListUsersUseCase, Inject, Injectable, MeUseCase, Inject, Injectable, ReactivateUserUseCase, Inject (+35 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.12
Nodes (35): LlmHopService, Injectable, coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType (+27 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.08
Nodes (52): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional (+44 more)

### Community 14 - "config-generator.service.ts"
Cohesion: 0.10
Nodes (20): isRedisRequired(), ConfigGeneratorService, Injectable, FileManagerService, Injectable, BasicServerAnswers, CacheAnswers, MetricsAnswers (+12 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.24
Nodes (9): ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto (+1 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (25): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+17 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.14
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 18 - "runs.controller.ts"
Cohesion: 0.05
Nodes (51): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable, GetRunUseCase (+43 more)

### Community 19 - "model-manager.service.ts"
Cohesion: 0.11
Nodes (26): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable (+18 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.09
Nodes (27): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+19 more)

### Community 21 - "asProviderInstanceId"
Cohesion: 0.10
Nodes (39): PendingSecretsItem, assertInteractiveAllowed(), collectPendingSecrets(), DEFAULT_MODELS, InitAnswers, convertModel(), KeyPromptService, Injectable (+31 more)

### Community 22 - "anthropic-messages.controller.ts"
Cohesion: 0.03
Nodes (74): ApiHeader, ChatCacheSource, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity (+66 more)

### Community 23 - "chat.service.ts"
Cohesion: 0.06
Nodes (58): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+50 more)

### Community 24 - "RunRepository"
Cohesion: 0.05
Nodes (20): Inject, InProcessRunWorker, Inject, Injectable, RecoverInterruptedRunsUseCase, Inject, Injectable, Inject (+12 more)

### Community 25 - "api/src/app.module.ts"
Cohesion: 0.08
Nodes (31): CompanyContextModule, Module, LlmModule, Module, RunDispatchExecutor, RunExecutorPort, RUN_LIFECYCLE, RunLifecyclePort (+23 more)

### Community 26 - "prisma-run.adapter.ts"
Cohesion: 0.09
Nodes (15): contentBriefSchema, socialBriefSchema, LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, ALLOWED, assertTransition() (+7 more)

### Community 27 - "auth.controller.ts"
Cohesion: 0.07
Nodes (33): BootstrapStatusUseCase, Inject, Injectable, AuthController, ApiTags, Body, Controller, Get (+25 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.07
Nodes (39): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+31 more)

### Community 29 - "SemanticCacheService"
Cohesion: 0.19
Nodes (11): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), SemanticCacheService (+3 more)

### Community 30 - "types/index.ts"
Cohesion: 0.07
Nodes (45): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+37 more)

### Community 31 - "HealthService"
Cohesion: 0.13
Nodes (8): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthController, ApiTags, Controller, HealthService, Injectable

### Community 32 - "swagger.setup.ts"
Cohesion: 0.12
Nodes (21): AppModule, Module, ChatOutputTextDto, ApiProperty, SseDeltaPayloadDto, ApiProperty, bootstrap(), API_GLOBAL_PREFIX (+13 more)

### Community 33 - "openai-stream.mapper.ts"
Cohesion: 0.33
Nodes (11): mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields(), buildToolCallsDelta(), chunkLine() (+3 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "run-review-panel.tsx"
Cohesion: 0.05
Nodes (48): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+40 more)

### Community 36 - ".info"
Cohesion: 0.09
Nodes (16): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, WIZARD_INIT_STEPS, WIZARD_STEPS (+8 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.23
Nodes (13): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+5 more)

### Community 39 - "AuthUserContext"
Cohesion: 0.06
Nodes (31): ApiCookieAuth, Patch, Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional (+23 more)

### Community 40 - "start-run.use-case.ts"
Cohesion: 0.08
Nodes (26): hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialStartRunSchema, startRunCommandSchema (+18 more)

### Community 41 - "own-runs-provider.tsx"
Cohesion: 0.08
Nodes (33): assertNever(), notifyProduct(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome, runTerminalToastId() (+25 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.27
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 45 - "auth.module.ts"
Cohesion: 0.05
Nodes (47): AppModule, Module, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, ListInvitationsUseCase (+39 more)

### Community 46 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.28
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 48 - "llm-hop.ts"
Cohesion: 0.08
Nodes (42): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+34 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "cli-apply.types.ts"
Cohesion: 0.12
Nodes (22): ProviderTestCommand, Command, Option, CliAiModel, CliAiProvider, CliRateLimit, GatewayClient, EnvPatchValue (+14 more)

### Community 52 - "provider-error.mapper.ts"
Cohesion: 0.31
Nodes (15): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+7 more)

### Community 53 - "LoggingService"
Cohesion: 0.05
Nodes (36): Inject, Inject, ChatProviderCallService, Injectable, ChatValidationService, Injectable, STREAM_CACHE_REPLAY_CHUNK_SIZE, StreamCacheReplayInput (+28 more)

### Community 54 - "users-view.tsx"
Cohesion: 0.11
Nodes (28): metadata, metadata, fetchArchiveRuns(), fetchInitiatorOptions(), ArchiveRunsView(), load(), createInvitation(), fetchInvitations() (+20 more)

### Community 55 - "CompanyContext"
Cohesion: 0.23
Nodes (6): CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 56 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (4): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppRequestLabels

### Community 57 - "patch-company-context.use-case.ts"
Cohesion: 0.27
Nodes (8): toPublicCompanyContext(), PatchCompanyContextUseCase, Inject, Injectable, assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 58 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (11): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+3 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "app-metrics.service.ts"
Cohesion: 0.17
Nodes (10): HealthCheckResult, HealthRedisCheckResult, AppMetricsModule, Global, Module, APP_METRICS_BACKEND, HealthMetricsSnapshot, PreMetricsScrapeHook (+2 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.10
Nodes (21): ChatModule, Module, HealthModule, Module, AnthropicModule, Module, IntegrationsModule, Module (+13 more)

### Community 63 - "response-cache.service.ts"
Cohesion: 0.11
Nodes (14): NoOpCacheBackend, Injectable, NoopCacheModule, Module, CacheModule, CacheModuleOptions, Module, CacheRegistryService (+6 more)

### Community 64 - "configuration.ts"
Cohesion: 0.05
Nodes (75): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+67 more)

### Community 65 - "InvitationsController"
Cohesion: 0.16
Nodes (10): InvitationsController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+2 more)

### Community 66 - "AppMetricsService"
Cohesion: 0.09
Nodes (8): HttpMetricsMiddleware, Injectable, Inject, Optional, AppMetricsService, Inject, Injectable, HttpMethod

### Community 67 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "ChatResponseDto"
Cohesion: 0.22
Nodes (8): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, ChatUsageDto, ApiPropertyOptional

### Community 70 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 71 - "KeyGeneratorService"
Cohesion: 0.19
Nodes (5): KeyGenerateCommand, Command, Option, KeyGeneratorService, Injectable

### Community 72 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 73 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 74 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 75 - "GatewayConfig"
Cohesion: 0.08
Nodes (13): ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable, ProviderManagerService (+5 more)

### Community 76 - "anthropic-auth.decorator.ts"
Cohesion: 0.29
Nodes (4): AnthropicExceptionFilter, Catch, AnthropicApiKeyGuard, Injectable

### Community 77 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 78 - "CompanyContextRepository"
Cohesion: 0.21
Nodes (11): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PutCompanyContextUseCase, Inject (+3 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (39): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+31 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "responses.adapter.ts"
Cohesion: 0.07
Nodes (49): asSystemFingerprint(), ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), buildResponsesCreateParams() (+41 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 88 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 89 - "envelope.ts"
Cohesion: 0.07
Nodes (45): metadata, geistMono, geistSans, metadata, acceptInvite(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+37 more)

### Community 90 - "app-metrics-backend.interface.ts"
Cohesion: 0.13
Nodes (12): healthStatusToGaugeValue(), AppProviderCallContext, AppProviderStreamScope, AppRequestMethod, AppRequestStatus, AppTokenUsage, HealthComponent, HealthStatus (+4 more)

### Community 91 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 93 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 95 - "getAppConfig"
Cohesion: 0.14
Nodes (14): readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), SmartRateLimitGuard (+6 more)

### Community 96 - "DomainException"
Cohesion: 0.06
Nodes (39): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken() (+31 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "health-readiness-response.dto.ts"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - ".getOne"
Cohesion: 0.19
Nodes (10): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 101 - "PrismaService"
Cohesion: 0.06
Nodes (28): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+20 more)

### Community 102 - ".getOne"
Cohesion: 0.19
Nodes (10): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 103 - "RedisConnectionService"
Cohesion: 0.15
Nodes (8): RedisCacheAdapter, Injectable, RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig(), asCacheTtlSeconds()

### Community 104 - "semantic-cache.constants.ts"
Cohesion: 0.14
Nodes (11): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+3 more)

### Community 106 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 107 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 108 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 109 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 111 - "semantic-cache.service.ts"
Cohesion: 0.16
Nodes (11): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, embeddingProbeTimeoutMs(), SemanticCacheModule, Module, EMBED_NOT_ATTEMPTED, SemanticLookupResult (+3 more)

### Community 112 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.05
Nodes (51): logoutSession(), CompletenessProvider(), FeedbackCta(), AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot() (+43 more)

### Community 116 - "resolve-provider-call-options.ts"
Cohesion: 0.39
Nodes (6): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, GatewayParamsConfig

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 121 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 122 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

## Knowledge Gaps
- **363 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+358 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1070 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `swagger.setup.ts`, `AppMetricsService`, `RedisConnectionService`, `LogContext`, `metrics.ts`, `anthropic/anthropic-tools.mapper.ts`, `HealthService`, `semantic-cache.service.ts`, `redis-vector-store.adapter.ts`, `responses.adapter.ts`, `chat.service.ts`, `app-metrics.service.ts`, `SemanticCacheService`, `types/index.ts`, `response-cache.service.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `configuration.ts`, `cli.module.ts`, `models.controller.ts`, `cli-apply.types.ts`, `model-manager.service.ts`, `asProviderInstanceId`, `GatewayModelsCatalogService`, `chat.service.ts`, `LoggingService`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `DomainException` connect `DomainException` to `prisma-invitation.adapter.ts`, `InvitationsController`, `social.types.ts`, `PrismaService`, `AuthUserContext`, `start-run.use-case.ts`, `content.types.ts`, `UserRepository`, `auth.module.ts`, `llm-gateway.http.adapter.ts`, `llm-hop.ts`, `runs.controller.ts`, `patch-company-context.use-case.ts`, `prisma-run.adapter.ts`, `save-output-edited.use-case.ts`, `api/src/app.module.ts`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _363 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `prisma-invitation.adapter.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10668563300142248 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06165099268547544 - nodes in this community are weakly interconnected._
# Graph Report - content-chain  (2026-09-20)

## Corpus Check
- 631 files · ~182,464 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4079 nodes · 12572 edges · 122 communities (107 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 391 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f39c3514`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- prisma-invitation.adapter.ts
- SocialResultStore
- api/company-context.types.ts
- cli.module.ts
- isRecord
- run-details-view.tsx
- ModelAlias
- LogContext
- anthropic/anthropic-tools.mapper.ts
- metrics.ts
- exitWithAgentReport
- auth.controller.ts
- social.graph.ts
- branded.types.ts
- config-generator.service.ts
- models.controller.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- runs.controller.ts
- GatewayConfig
- sentry-ai-metrics.adapter.ts
- asProviderInstanceId
- GatewayKey
- chat.service.ts
- start-run.use-case.ts
- api/src/app.module.ts
- prisma-run.adapter.ts
- AuthController
- save-output-edited.use-case.ts
- users.controller.ts
- types/index.ts
- HealthService
- ai-provider-gateway/src/main.ts
- openai-stream.mapper.ts
- AnthropicMessagesRequestDto
- run-result-editor.tsx
- ConfigInitCommand
- enums.ts
- feedback-form.tsx
- DomainException
- new-ids.ts
- own-runs-provider.tsx
- .completions
- ids.ts
- MetricsController
- auth.module.ts
- resilient-executor.ts
- anthropic-models.controller.ts
- content.graph.ts
- chat-params.dto.ts
- ListRunsQueryDto
- provider-types.ts
- provider-error.mapper.ts
- LoggingService
- users-view.tsx
- CompanyContext
- configure-swagger.ts
- patch-company-context.use-case.ts
- should-include-redis-stack.ts
- HealthController
- .create
- company-context.dto.ts
- ai-provider-gateway/src/app.module.ts
- cache.module.ts
- configuration.ts
- InvitationsController
- .createMessage
- ModelRemoveCommand
- OpenAiChatCompletionRequestDto
- swagger.setup.ts
- openai-chat-completion-response.dto.ts
- asGatewayKey
- ClientAddCommand
- ClientRemoveCommand
- OpenAiChatMessageDto
- auth.schemas.ts
- fetchArchiveRuns
- ApiRequestIdHeader
- company-context.controller.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- openai-params-provider.mapper.ts
- event-source-registry-provider.tsx
- SPEC — README
- ModelAddCommand
- gateway-key.guard.branded-types.test-d.ts
- anthropic.module.ts
- company-context.mapper.ts
- apiFetch
- StartRunDto
- ChatToolingDto
- getAppConfig
- RefreshSessionRepository
- route.ts
- health-readiness-response.dto.ts
- ProviderAddCommand
- PrismaService
- isRedisRequiredFromConfig
- ModelEditCommand
- EnvironmentVariables
- ProviderEditCommand
- ChatParamsDto
- ProviderRemoveCommand
- cn
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
- `ProviderTestOptions` --references--> `ProviderInstanceId`  [EXTRACTED]
  apps/ai-provider-gateway/src/cli/commands/provider/provider-test.command.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `LiveItemSubscription()` --calls--> `useRunEventSource()`  [EXTRACTED]
  apps/frontend/src/modules/runs/components/own-runs-provider.tsx → apps/frontend/src/modules/runs/components/use-run-event-source.ts

## Import Cycles
- None detected.

## Communities (122 total, 14 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 1 - "SocialResultStore"
Cohesion: 0.04
Nodes (38): ContentPipelineState, PageDocument, PageOutline, VerifierVerdict, PrismaContentResultAdapter, toContentPipelinePhase(), Injectable, CompositeRunResultReader (+30 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.05
Nodes (72): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+64 more)

### Community 3 - "cli.module.ts"
Cohesion: 0.06
Nodes (59): AgentReport, AgentReportStatus, PendingSecretsItem, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime() (+51 more)

### Community 4 - "isRecord"
Cohesion: 0.06
Nodes (75): ArchiveRunsQuery, fetchRunLogs(), fetchUserRuns(), finalizeRunReview(), InitiatorOption, isUserRating(), patchRunRating(), HitlAccepted (+67 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.06
Nodes (52): metadata, metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS (+44 more)

### Community 6 - "ModelAlias"
Cohesion: 0.04
Nodes (34): HttpMetricsMiddleware, Injectable, ClientId, ModelAlias, ProviderInstanceId, ActiveStreamsTracker, Injectable, NoopAppMetricsAdapter (+26 more)

### Community 7 - "LogContext"
Cohesion: 0.05
Nodes (29): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable, ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter (+21 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.04
Nodes (108): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, mapProviderResponseToAiObservation(), toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens() (+100 more)

### Community 9 - "metrics.ts"
Cohesion: 0.06
Nodes (45): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+37 more)

### Community 10 - "exitWithAgentReport"
Cohesion: 0.18
Nodes (10): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+2 more)

### Community 11 - "auth.controller.ts"
Cohesion: 0.05
Nodes (39): AcceptInviteUseCase, Inject, Injectable, BootstrapAdminUseCase, Inject, Injectable, BootstrapStatusUseCase, Inject (+31 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.11
Nodes (40): coercePassNoteVerdict(), isPassOnlyIssue(), toOutcome(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine() (+32 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.08
Nodes (55): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, ChatWarningDto, ApiProperty, ApiPropertyOptional (+47 more)

### Community 14 - "config-generator.service.ts"
Cohesion: 0.14
Nodes (14): isRedisRequired(), WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, ClientCli (+6 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.16
Nodes (12): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional (+4 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.15
Nodes (23): asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto, AnthropicThinkingContentBlockDto (+15 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.09
Nodes (28): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, EmbeddingCircuitBreaker, escapeRedisSearchTag(), normalizeEmbeddingModelForIndex(), semanticIndexName() (+20 more)

### Community 18 - "runs.controller.ts"
Cohesion: 0.03
Nodes (63): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable, GetRunUseCase (+55 more)

### Community 19 - "GatewayConfig"
Cohesion: 0.06
Nodes (36): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ClientManagerService, Injectable, ConfigPersistenceService, Injectable (+28 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.09
Nodes (27): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+19 more)

### Community 21 - "asProviderInstanceId"
Cohesion: 0.06
Nodes (74): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), DEFAULT_MODELS, WIZARD_INIT_STEPS, WIZARD_STEPS (+66 more)

### Community 22 - "GatewayKey"
Cohesion: 0.04
Nodes (67): GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+59 more)

### Community 23 - "chat.service.ts"
Cohesion: 0.06
Nodes (48): SemanticStoreEmbedState, CacheIdentityMessage, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+40 more)

### Community 24 - "start-run.use-case.ts"
Cohesion: 0.10
Nodes (18): InProcessRunWorker, Injectable, ParsedStartRunCommand, startRunCommandSchema, isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput (+10 more)

### Community 25 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (49): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind() (+41 more)

### Community 26 - "prisma-run.adapter.ts"
Cohesion: 0.08
Nodes (19): contentBriefSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, socialBriefSchema, socialStartRunSchema, LightRunItem (+11 more)

### Community 27 - "AuthController"
Cohesion: 0.10
Nodes (22): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+14 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (33): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+25 more)

### Community 29 - "users.controller.ts"
Cohesion: 0.06
Nodes (27): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Inject (+19 more)

### Community 30 - "types/index.ts"
Cohesion: 0.14
Nodes (27): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+19 more)

### Community 31 - "HealthService"
Cohesion: 0.11
Nodes (11): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, ApiProperty, HealthController, ApiTags, Controller, HealthModule (+3 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "openai-stream.mapper.ts"
Cohesion: 0.28
Nodes (13): SseDoneEvent, fromGatewayToolCallDto(), mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields() (+5 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "run-result-editor.tsx"
Cohesion: 0.05
Nodes (41): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+33 more)

### Community 36 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.23
Nodes (13): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+5 more)

### Community 39 - "DomainException"
Cohesion: 0.07
Nodes (34): AcceptInviteResult, acceptInviteSchema, hashPassword(), validatePasswordPolicy(), isRecord(), CreateFeedbackUseCase, Injectable, FeedbackEntry (+26 more)

### Community 40 - "new-ids.ts"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 41 - "own-runs-provider.tsx"
Cohesion: 0.11
Nodes (22): assertNever(), notifyProduct(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome, runTerminalToastId() (+14 more)

### Community 42 - ".completions"
Cohesion: 0.08
Nodes (30): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, ApiBody, ApiOperation, ApiProduces, ApiResponse, Body (+22 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 45 - "auth.module.ts"
Cohesion: 0.07
Nodes (47): comparePassword(), generateRefreshToken(), parseTtlMs(), parseTtlSeconds(), AuthTokenResult, InviteUserResult, inviteUserSchema, InviteUserUseCase (+39 more)

### Community 46 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (17): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+9 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.12
Nodes (21): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 48 - "content.graph.ts"
Cohesion: 0.08
Nodes (46): CompanyContextRepository, Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+38 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "provider-types.ts"
Cohesion: 0.07
Nodes (37): collectPendingSecrets(), ProviderTestCommand, ProviderTestOptions, Command, Option, CliAiProvider, EnvPatchService, EnvPatchValue (+29 more)

### Community 52 - "provider-error.mapper.ts"
Cohesion: 0.22
Nodes (18): ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+10 more)

### Community 53 - "LoggingService"
Cohesion: 0.04
Nodes (41): RedisConnectionService, Injectable, computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Inject, Injectable (+33 more)

### Community 54 - "users-view.tsx"
Cohesion: 0.09
Nodes (30): metadata, LogoutDialogProps, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated (+22 more)

### Community 55 - "CompanyContext"
Cohesion: 0.29
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 56 - "configure-swagger.ts"
Cohesion: 0.15
Nodes (13): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+5 more)

### Community 57 - "patch-company-context.use-case.ts"
Cohesion: 0.44
Nodes (5): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 58 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (11): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+3 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - ".create"
Cohesion: 0.13
Nodes (13): FeedbackController, ApiCookieAuth, ApiTags, Body, Controller, HttpCode, Post, CreateFeedbackDto (+5 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.12
Nodes (14): CacheModule, Module, AppMetricsModule, Global, Module, ProviderRegistryModule, Global, Module (+6 more)

### Community 63 - "cache.module.ts"
Cohesion: 0.09
Nodes (19): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+11 more)

### Community 64 - "configuration.ts"
Cohesion: 0.06
Nodes (49): CliValidateOptions, normalizeGatewayConfigForWrite(), ValidationFormatter, asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig (+41 more)

### Community 65 - "InvitationsController"
Cohesion: 0.12
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 66 - ".createMessage"
Cohesion: 0.14
Nodes (13): ApiHeader, AnthropicMessagesController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags (+5 more)

### Community 67 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "swagger.setup.ts"
Cohesion: 0.13
Nodes (16): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+8 more)

### Community 70 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 71 - "asGatewayKey"
Cohesion: 0.14
Nodes (8): KeyGenerateCommand, Command, Option, KeyGeneratorService, Injectable, KeyPromptService, Injectable, asGatewayKey()

### Community 72 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 73 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 74 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 75 - "auth.schemas.ts"
Cohesion: 0.29
Nodes (6): BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema

### Community 76 - "fetchArchiveRuns"
Cohesion: 0.33
Nodes (5): metadata, fetchArchiveRuns(), fetchInitiatorOptions(), ArchiveRunsView(), load()

### Community 77 - "ApiRequestIdHeader"
Cohesion: 0.15
Nodes (14): ApiRequestIdHeader(), ApiOkResponse, ApiOperation, Get, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+6 more)

### Community 78 - "company-context.controller.ts"
Cohesion: 0.16
Nodes (13): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+5 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (39): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+31 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 82 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 86 - "anthropic.module.ts"
Cohesion: 0.12
Nodes (17): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiChatCompletionsController, ApiSecurity (+9 more)

### Community 88 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 89 - "apiFetch"
Cohesion: 0.07
Nodes (50): metadata, geistMono, geistSans, metadata, acceptInvite(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+42 more)

### Community 91 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 93 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 95 - "getAppConfig"
Cohesion: 0.17
Nodes (12): readGatewayKeyHeader(), getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable (+4 more)

### Community 96 - "RefreshSessionRepository"
Cohesion: 0.09
Nodes (11): hashRefreshToken(), Inject, LogoutUseCase, Inject, Injectable, Inject, RefreshSessionRecord, RefreshSessionRepository (+3 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "health-readiness-response.dto.ts"
Cohesion: 0.26
Nodes (10): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 101 - "PrismaService"
Cohesion: 0.07
Nodes (21): Inject, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup, FeedbackRunReader, FEEDBACK_BODY_MAX (+13 more)

### Community 107 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 108 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 109 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 112 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.06
Nodes (38): CompletenessProvider(), FeedbackCta(), AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot() (+30 more)

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
- **369 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+364 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1079 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `ai-provider-gateway/src/main.ts`, `swagger.setup.ts`, `LogContext`, `anthropic/anthropic-tools.mapper.ts`, `branded.types.ts`, `resilient-executor.ts`, `redis-vector-store.adapter.ts`, `provider-types.ts`, `GatewayKey`, `chat.service.ts`, `HealthService`, `cache.module.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `configuration.ts`, `cli.module.ts`, `exitWithAgentReport`, `models.controller.ts`, `provider-types.ts`, `asProviderInstanceId`, `LoggingService`, `chat.service.ts`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `DomainException` connect `DomainException` to `prisma-invitation.adapter.ts`, `InvitationsController`, `SocialResultStore`, `new-ids.ts`, `auth.controller.ts`, `auth.module.ts`, `llm-gateway.http.adapter.ts`, `runs.controller.ts`, `start-run.use-case.ts`, `patch-company-context.use-case.ts`, `prisma-run.adapter.ts`, `save-output-edited.use-case.ts`, `users.controller.ts`, `api/src/app.module.ts`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _369 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `SocialResultStore` be split into smaller, more focused modules?**
  _Cohesion score 0.03705234159779614 - nodes in this community are weakly interconnected._
- **Should `api/company-context.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.051590483827853514 - nodes in this community are weakly interconnected._
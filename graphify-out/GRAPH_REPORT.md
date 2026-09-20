# Graph Report - content-chain  (2026-09-20)

## Corpus Check
- 633 files · ~183,004 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4096 nodes · 12597 edges · 123 communities (110 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 391 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `26bed77c`
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
- LogContext
- anthropic/anthropic-tools.mapper.ts
- chat-provider-call.service.ts
- exitWithAgentReport
- domain.exception.ts
- social.graph.ts
- branded.types.ts
- asClientId
- models.controller.ts
- anthropic-stream.mapper.ts
- redis-vector-store.adapter.ts
- DomainException
- GatewayConfig
- sentry-ai-metrics.adapter.ts
- asProviderInstanceId
- openai-chat-completions.controller.ts
- GatewayKey
- RunRecord
- runs.module.ts
- prisma-run.adapter.ts
- auth.controller.ts
- save-output-edited.use-case.ts
- users.controller.ts
- chat.service.ts
- ai-provider-gateway/src/health/health.service.ts
- swagger.setup.ts
- openai-stream.mapper.ts
- AnthropicMessagesRequestDto
- runs-result.types.ts
- ConfigInitCommand
- enums.ts
- feedback-form.tsx
- bootstrap-admin.use-case.ts
- HttpExceptionFilter
- own-runs-provider.tsx
- openai-models.controller.ts
- ids.ts
- MetricsController
- auth.module.ts
- types/index.ts
- anthropic-models.controller.ts
- api/src/app.module.ts
- chat-params.dto.ts
- ListRunsQueryDto
- provider-manager.service.ts
- provider-error.mapper.ts
- semantic-cache.service.ts
- invitations.api.ts
- CompanyContext
- llm-hop.ts
- RunRepository
- RedisConnectionService
- HealthController
- runs.controller.ts
- company-context.dto.ts
- ai-provider-gateway/src/app.module.ts
- response-cache.service.ts
- configuration.ts
- InvitationsController
- anthropic-messages.controller.ts
- ModelRemoveCommand
- OpenAiChatCompletionRequestDto
- result-edit-payload.ts
- config-generator.service.ts
- KeyGenerateCommand
- ClientAddCommand
- ClientRemoveCommand
- OpenAiChatMessageDto
- parse-verifier-log-message.ts
- social-pipeline.facade.ts
- InMemoryRunSseHub
- CompanyContextRepository
- llm-gateway.http.adapter.ts
- PrometheusService
- responses.adapter.ts
- dashboard-shell.tsx
- SPEC — README
- ModelAddCommand
- run.types.ts
- getAppConfig
- semantic-cache.constants.ts
- company-context.mapper.ts
- apiFetch
- ApiRequestIdHeader
- StartRunDto
- public.decorator.ts
- get-run.use-case.ts
- ChatToolingDto
- ChatParamsDto
- PrismaRefreshSessionAdapter
- route.ts
- openai-chat-message.dto.ts
- ProviderAddCommand
- openai-chat-completion-request.dto.ts
- PrismaService
- ModelEditCommand
- EnvironmentVariables
- ProviderEditCommand
- ProviderRemoveCommand
- cn
- domain/company-context.types.ts
- CompanyContextController
- ClientEditCommand
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
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `LiveItemSubscription()` --calls--> `useRunEventSource()`  [EXTRACTED]
  apps/frontend/src/modules/runs/components/own-runs-provider.tsx → apps/frontend/src/modules/runs/components/use-run-event-source.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (123 total, 12 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (27): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore (+19 more)

### Community 2 - "isRecord"
Cohesion: 0.05
Nodes (74): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+66 more)

### Community 3 - "cli.module.ts"
Cohesion: 0.06
Nodes (59): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), resolveCliMode() (+51 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.05
Nodes (62): metadata, ArchiveRunsQuery, fetchArchiveRuns(), fetchInitiatorOptions(), fetchRunLogs(), finalizeRunReview(), InitiatorOption, isUserRating() (+54 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.07
Nodes (44): metadata, metadata, notifyProduct(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS (+36 more)

### Community 6 - "ModelAlias"
Cohesion: 0.04
Nodes (29): ProviderTestOptions, CliAiModel, HttpMetricsMiddleware, Injectable, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable (+21 more)

### Community 7 - "LogContext"
Cohesion: 0.05
Nodes (28): GlobalExceptionFilter, Catch, Injectable, ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable (+20 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.06
Nodes (68): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens(), asPromptCacheHitTokens() (+60 more)

### Community 9 - "chat-provider-call.service.ts"
Cohesion: 0.07
Nodes (42): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias() (+34 more)

### Community 10 - "exitWithAgentReport"
Cohesion: 0.14
Nodes (12): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand (+4 more)

### Community 11 - "domain.exception.ts"
Cohesion: 0.08
Nodes (20): MeUseCase, Inject, Injectable, Inject, Injectable, updateEmailSchema, UpdateMeEmailUseCase, AuthUser (+12 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.12
Nodes (33): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine() (+25 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.06
Nodes (64): CachedChatResponse, CachedChatWarning, CachedFinishReason, CacheIdentityMessage, ChatCacheSource, ChatResponseData, ChatResponseDto, ChatUsageDetailsDto (+56 more)

### Community 14 - "asClientId"
Cohesion: 0.11
Nodes (31): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, convertRateLimit(), CliRateLimit, GatewayClient, ClientManagerService (+23 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 16 - "anthropic-stream.mapper.ts"
Cohesion: 0.14
Nodes (21): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+13 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.15
Nodes (19): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+11 more)

### Community 18 - "DomainException"
Cohesion: 0.07
Nodes (31): ApiCookieAuth, Patch, Body, HttpCode, Post, orderItemsBySelectedIds(), assertSameIds(), validationFailed() (+23 more)

### Community 19 - "GatewayConfig"
Cohesion: 0.07
Nodes (35): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ConfigPersistenceService, Injectable, EnvPatchService, Injectable (+27 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (24): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+16 more)

### Community 21 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (44): isRedisRequired(), WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema (+36 more)

### Community 22 - "openai-chat-completions.controller.ts"
Cohesion: 0.04
Nodes (54): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+46 more)

### Community 23 - "GatewayKey"
Cohesion: 0.06
Nodes (42): SemanticStoreEmbedState, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize (+34 more)

### Community 24 - "RunRecord"
Cohesion: 0.18
Nodes (3): InProcessRunWorker, Injectable, RunRecord

### Community 25 - "runs.module.ts"
Cohesion: 0.09
Nodes (20): Inject, RecoverInterruptedRunsUseCase, Inject, Injectable, RunDispatchExecutor, RunLifecycleService, TransitionExtras, Inject (+12 more)

### Community 26 - "prisma-run.adapter.ts"
Cohesion: 0.10
Nodes (11): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, PrismaRunAdapter, RunLogRow, RunReviewFields, RunRow (+3 more)

### Community 27 - "auth.controller.ts"
Cohesion: 0.06
Nodes (39): BootstrapStatusUseCase, Inject, Injectable, AuthController, ApiTags, Body, Controller, Get (+31 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.07
Nodes (38): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+30 more)

### Community 29 - "users.controller.ts"
Cohesion: 0.04
Nodes (40): AppModule, Module, ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable (+32 more)

### Community 30 - "chat.service.ts"
Cohesion: 0.06
Nodes (30): Inject, Inject, CachedChatResponseWithConversation, createInProcessSingleflight(), ChatCachePipelineService, Injectable, Optional, ChatErrorHandlerService (+22 more)

### Community 31 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.06
Nodes (27): VectorStore, RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto (+19 more)

### Community 32 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (25): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+17 more)

### Community 33 - "openai-stream.mapper.ts"
Cohesion: 0.19
Nodes (19): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional (+11 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "runs-result.types.ts"
Cohesion: 0.06
Nodes (51): PAGE_OUTLINE_ROLE_LABELS, submitHitl(), isPageOutlineSectionRole(), isReelDuration(), PAGE_OUTLINE_SECTION_ROLES, PageDocument, PageOutline, PageOutlineSection (+43 more)

### Community 36 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.20
Nodes (14): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+6 more)

### Community 39 - "bootstrap-admin.use-case.ts"
Cohesion: 0.06
Nodes (36): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken() (+28 more)

### Community 40 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 41 - "own-runs-provider.tsx"
Cohesion: 0.13
Nodes (17): assertNever(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome, runTerminalToastId(), viewingRunIdFromPathname() (+9 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.11
Nodes (22): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam (+14 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 45 - "auth.module.ts"
Cohesion: 0.08
Nodes (30): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+22 more)

### Community 46 - "types/index.ts"
Cohesion: 0.07
Nodes (46): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+38 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.28
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 48 - "api/src/app.module.ts"
Cohesion: 0.08
Nodes (34): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind() (+26 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "provider-manager.service.ts"
Cohesion: 0.10
Nodes (39): PendingSecretsItem, assertInteractiveAllowed(), collectPendingSecrets(), DEFAULT_MODELS, CliAiProvider, ModelPromptResult, ProviderPromptResult, ProviderPromptService (+31 more)

### Community 52 - "provider-error.mapper.ts"
Cohesion: 0.19
Nodes (20): ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 53 - "semantic-cache.service.ts"
Cohesion: 0.10
Nodes (21): computeSystemSignature(), hashCallParams(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, isSingleTurnUserRequest() (+13 more)

### Community 54 - "invitations.api.ts"
Cohesion: 0.23
Nodes (14): createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired(), parseInvitationList() (+6 more)

### Community 55 - "CompanyContext"
Cohesion: 0.23
Nodes (6): CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 56 - "llm-hop.ts"
Cohesion: 0.09
Nodes (43): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+35 more)

### Community 57 - "RunRepository"
Cohesion: 0.05
Nodes (25): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsUseCase, Inject, Injectable, GetRunUseCase, Inject (+17 more)

### Community 58 - "RedisConnectionService"
Cohesion: 0.27
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "runs.controller.ts"
Cohesion: 0.11
Nodes (18): ListRunsOutput, ListRunsUseCase, Injectable, ListRunsUserItem, ListRunsUserOutput, ratingSchema, ListRunsQuery, PAGE_SIZE (+10 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.07
Nodes (27): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+19 more)

### Community 63 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (19): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+11 more)

### Community 64 - "configuration.ts"
Cohesion: 0.06
Nodes (47): CliValidateOptions, normalizeGatewayConfigForWrite(), ValidationFormatter, asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig (+39 more)

### Community 65 - "InvitationsController"
Cohesion: 0.16
Nodes (10): InvitationsController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+2 more)

### Community 66 - "anthropic-messages.controller.ts"
Cohesion: 0.06
Nodes (38): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+30 more)

### Community 67 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "result-edit-payload.ts"
Cohesion: 0.11
Nodes (23): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+15 more)

### Community 70 - "config-generator.service.ts"
Cohesion: 0.15
Nodes (11): ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, EnvTemplateInput, generateEnvTemplate(), isEnvInputRedisRequired() (+3 more)

### Community 71 - "KeyGenerateCommand"
Cohesion: 0.27
Nodes (3): KeyGenerateCommand, Command, Option

### Community 72 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 73 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 74 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "social-pipeline.facade.ts"
Cohesion: 0.14
Nodes (17): LlmGatewayError, RUN_LIFECYCLE, RunLifecyclePort, isSocialRunRecord(), SocialPipelineFacade, toOutcome(), Inject, Injectable (+9 more)

### Community 77 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 78 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (19): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+11 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.05
Nodes (40): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+32 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "responses.adapter.ts"
Cohesion: 0.05
Nodes (67): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, toHttpException(), asSystemFingerprint(), asToolCallId(), asWarningCode(), ProviderAssistantTurn, ProviderChatTurn (+59 more)

### Community 82 - "dashboard-shell.tsx"
Cohesion: 0.10
Nodes (18): FeedbackCta(), AppHeader(), AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot(), FloatingBoxSlot(), DashboardShell() (+10 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 85 - "run.types.ts"
Cohesion: 0.18
Nodes (17): startRunCommandSchema, isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, StartRunUseCase, Injectable (+9 more)

### Community 86 - "getAppConfig"
Cohesion: 0.10
Nodes (22): ChatModule, Module, readGatewayKeyHeader(), getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicModule (+14 more)

### Community 87 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 88 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 89 - "apiFetch"
Cohesion: 0.09
Nodes (34): geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession(), loginWithPassword() (+26 more)

### Community 90 - "ApiRequestIdHeader"
Cohesion: 0.15
Nodes (14): ApiRequestIdHeader(), ApiOkResponse, ApiOperation, Get, AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+6 more)

### Community 91 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 92 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 93 - "get-run.use-case.ts"
Cohesion: 0.15
Nodes (14): GetRunLogsOutput, contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand (+6 more)

### Community 94 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 95 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 96 - "PrismaRefreshSessionAdapter"
Cohesion: 0.31
Nodes (3): RefreshSessionRecord, PrismaRefreshSessionAdapter, Injectable

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 101 - "PrismaService"
Cohesion: 0.06
Nodes (34): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+26 more)

### Community 107 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 108 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 109 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.06
Nodes (54): metadata, metadata, acceptInvite(), AcceptInviteForm(), onSubmit(), AcceptInviteFormProps, FALLBACK, passwordMeetsPolicy() (+46 more)

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.19
Nodes (17): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+9 more)

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 121 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

## Knowledge Gaps
- **375 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+370 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1086 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `anthropic-messages.controller.ts`, `config-generator.service.ts`, `chat-provider-call.service.ts`, `branded.types.ts`, `types/index.ts`, `asClientId`, `models.controller.ts`, `redis-vector-store.adapter.ts`, `GatewayConfig`, `provider-manager.service.ts`, `GatewayKey`, `chat.service.ts`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `configuration.ts`, `cli.module.ts`, `config-generator.service.ts`, `LogContext`, `chat-provider-call.service.ts`, `exitWithAgentReport`, `branded.types.ts`, `asClientId`, `types/index.ts`, `models.controller.ts`, `provider-manager.service.ts`, `GatewayConfig`, `asProviderInstanceId`, `GatewayKey`, `chat.service.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `chat.service.ts` to `swagger.setup.ts`, `anthropic-messages.controller.ts`, `LogContext`, `anthropic/anthropic-tools.mapper.ts`, `chat-provider-call.service.ts`, `branded.types.ts`, `types/index.ts`, `redis-vector-store.adapter.ts`, `responses.adapter.ts`, `provider-manager.service.ts`, `semantic-cache.service.ts`, `GatewayKey`, `RedisConnectionService`, `ai-provider-gateway/src/health/health.service.ts`, `response-cache.service.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _375 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.052795031055900624 - nodes in this community are weakly interconnected._
- **Should `isRecord` be split into smaller, more focused modules?**
  _Cohesion score 0.052349336057201226 - nodes in this community are weakly interconnected._
# Graph Report - content-chain  (2026-10-17)

## Corpus Check
- 709 files · ~248,321 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .css 2)

## Summary
- 4729 nodes · 15381 edges · 143 communities (124 shown, 18 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 421 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `104d0d7f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DomainException
- get-run.use-case.ts
- company-context-form.tsx
- ProviderInstanceId
- branded.types.ts
- ModelAlias
- api-error.code.ts
- logging.module.ts
- AuthUserContext
- anthropic/anthropic-tools.mapper.ts
- isRecord
- ref_zod
- archive-runs-view.tsx
- cli.module.ts
- ChatMessageDto
- chat-provider-call.service.ts
- ai-provider.interface.ts
- app-metrics-backend.interface.ts
- exitWithAgentReport
- dashboard-shell.tsx
- AuthController
- filters/http-exception.filter.ts
- semantic-cache.constants.ts
- UserRepository
- redis-vector-store.adapter.ts
- feedback-form.tsx
- PrometheusAppMetricsAdapter
- GatewayConfig
- LoggingService
- asProviderInstanceId
- chat.module.ts
- HealthService
- company-context.controller.ts
- response-cache.service.ts
- AnthropicMessagesRequestDto
- responses.adapter.ts
- runs.types.ts
- enums.ts
- runs-result.types.ts
- RedisConnectionService
- sentry-ai-metrics.adapter.ts
- run.schemas.ts
- openai-models.controller.ts
- ids.ts
- semantic-cache.service.ts
- ai-provider-gateway/src/app.module.ts
- save-output-edited.use-case.ts
- GuestQuotaPort
- swagger.setup.ts
- anthropic-response.mapper.ts
- ListRunsQueryDto
- NoopAppMetricsAdapter
- GatewayKey
- VectorStore
- content.graph.ts
- wizard-orchestrator.service.ts
- users.controller.ts
- start-run-form.tsx
- run-details-view.tsx
- resilient-executor.ts
- metrics.ts
- ref_nestjs_swagger
- packages_shared_dist_index
- openai-chat-completions.controller.ts
- anthropic-messages.controller.ts
- ModelEditCommand
- MetricsController
- RefreshSessionRepository
- OpenAiChatCompletionRequestDto
- new-ids.ts
- health.api.ts
- prisma-invitation.adapter.ts
- packages_shared_dist_index_userid
- api/src/app.module.ts
- InMemoryRunSseHub
- parse-verifier-log-message.ts
- ref_nestjs_common
- api/src/health/health.service.ts
- ClientAddCommand
- llm-gateway.http.adapter.ts
- PrometheusService
- cn
- provider-instances.bootstrap.ts
- SPEC — README
- HealthController
- users-view.tsx
- model-manager.service.ts
- company-context.dto.ts
- ProviderRemoveCommand
- ModelAddCommand
- api/src/main.ts
- AppMetricsBackend
- agent-answers.schema.ts
- social.graph.ts
- CompanyContextRepository
- StartRunDto
- ConfigInitCommand
- route.ts
- EnvPatchService
- InvitationsController
- ClientEditCommand
- configuration.ts
- models.controller.ts
- ProviderAddCommand
- PageDocument
- app/layout.tsx
- CompanyContextController
- InProcessRunWorker
- LlmGatewayHttpAdapter
- app-metrics.service.ts
- http-metrics.interceptor.ts
- ref_react
- openai-params-provider.mapper.ts
- ClientRemoveCommand
- ModelRemoveCommand
- ProviderEditCommand
- EnvironmentVariables
- domain/company-context.types.ts
- JwtAuthGuard
- AppMetricsService
- RolesGuard
- HttpExceptionFilter
- prisma-run.adapter.ts
- metrics.module.ts
- Architektura
- brand.ts
- assert-company-context-writable.ts
- ConsoleLoggerAdapter
- llm-gateway-chat.log.ts
- company-context.schemas.ts
- .get
- RunsModule
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
2. `DomainException` - 84 edges
3. `ProviderInstanceId` - 81 edges
4. `LoggingService` - 73 edges
5. `asProviderInstanceId()` - 67 edges
6. `isRecord()` - 66 edges
7. `GatewayConfig` - 65 edges
8. `cn()` - 65 edges
9. `AuthUserContext` - 62 edges
10. `GatewayKey` - 59 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `Request` --references--> `AuthUserContext`  [EXTRACTED]
  apps/api/src/shared/http/express.d.ts → apps/api/src/shared/types/auth-user-context.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (143 total, 18 thin omitted)

### Community 0 - "DomainException"
Cohesion: 0.06
Nodes (69): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable, comparePassword() (+61 more)

### Community 1 - "get-run.use-case.ts"
Cohesion: 0.05
Nodes (40): ContentPipelineInput, ContentRefineSnapshot, PageOutline, PageOutlineSection, PageOutlineSectionRole, CompositeRunResultReader, GetRunGuestAccess, GetRunOutput (+32 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.05
Nodes (71): metadata, putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+63 more)

### Community 3 - "ProviderInstanceId"
Cohesion: 0.09
Nodes (33): collectPendingSecrets(), ProviderTestCommand, ProviderTestOptions, Command, Option, CliAiProvider, GatewayClient, ProviderTestService (+25 more)

### Community 4 - "branded.types.ts"
Cohesion: 0.13
Nodes (27): CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId(), isFiniteNumber(), isMaxAttempts() (+19 more)

### Community 5 - "ModelAlias"
Cohesion: 0.06
Nodes (55): SemanticStoreEmbedState, CacheIdentityMessage, ChatCacheSource, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional (+47 more)

### Community 6 - "api-error.code.ts"
Cohesion: 0.15
Nodes (23): ChatErrorHandlerService, Injectable, ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus() (+15 more)

### Community 7 - "logging.module.ts"
Cohesion: 0.06
Nodes (23): LEVEL_ORDER, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable, SentryErrorReportingAdapter, Injectable (+15 more)

### Community 8 - "AuthUserContext"
Cohesion: 0.08
Nodes (32): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+24 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (42): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+34 more)

### Community 10 - "isRecord"
Cohesion: 0.08
Nodes (39): ACTIVATION_FAILED_HINT, activateAccount(), Credentials, fetchBootstrapStatus(), fetchUserSession(), loginWithPassword(), patchOwnEmail(), resendActivation() (+31 more)

### Community 11 - "ref_zod"
Cohesion: 0.10
Nodes (12): ConfigGeneratorService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, FileManagerService, Injectable, generateEnvTemplate() (+4 more)

### Community 12 - "archive-runs-view.tsx"
Cohesion: 0.08
Nodes (27): metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, PAGE_OUTLINE_ROLE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, fetchArchiveRuns() (+19 more)

### Community 13 - "cli.module.ts"
Cohesion: 0.04
Nodes (54): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), CliModule, Module, ClientListCommand, ClientListOptions (+46 more)

### Community 14 - "ChatMessageDto"
Cohesion: 0.16
Nodes (16): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+8 more)

### Community 15 - "chat-provider-call.service.ts"
Cohesion: 0.09
Nodes (23): clamp(), isOverrideKey(), resolveProviderCallOptions(), ChatProviderCallService, CompleteOnceResult, Injectable, ChatResponseBuilderService, Injectable (+15 more)

### Community 16 - "ai-provider.interface.ts"
Cohesion: 0.14
Nodes (31): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional (+23 more)

### Community 17 - "app-metrics-backend.interface.ts"
Cohesion: 0.13
Nodes (10): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthStatus, HttpRequestLabels, RateLimitReason (+2 more)

### Community 18 - "exitWithAgentReport"
Cohesion: 0.18
Nodes (8): exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), resolveCliMode(), CliLogger

### Community 19 - "dashboard-shell.tsx"
Cohesion: 0.08
Nodes (32): fetchCompleteness(), CompletenessState, GATE_SECTION_LABELS, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE (+24 more)

### Community 20 - "AuthController"
Cohesion: 0.10
Nodes (25): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+17 more)

### Community 21 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 22 - "semantic-cache.constants.ts"
Cohesion: 0.14
Nodes (11): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+3 more)

### Community 23 - "UserRepository"
Cohesion: 0.05
Nodes (25): Inject, Inject, Inject, Inject, SoftEmailRateLimiter, Inject, AccountActivationRecord, AccountActivationRepository (+17 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.14
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 25 - "feedback-form.tsx"
Cohesion: 0.12
Nodes (25): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+17 more)

### Community 26 - "PrometheusAppMetricsAdapter"
Cohesion: 0.11
Nodes (5): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 27 - "GatewayConfig"
Cohesion: 0.10
Nodes (36): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, PendingSecretsItem, convertClient(), convertRateLimit(), CliRateLimit (+28 more)

### Community 28 - "LoggingService"
Cohesion: 0.09
Nodes (14): Inject, OllamaEmbeddingAdapter, Injectable, Inject, StreamCacheReplayService, Injectable, isProviderRateLimitError(), Inject (+6 more)

### Community 29 - "asProviderInstanceId"
Cohesion: 0.10
Nodes (29): assertInteractiveAllowed(), DEFAULT_MODELS, convertModel(), convertProvider(), CliAiModel, ModelPromptResult, ProviderPromptResult, ProviderPromptService (+21 more)

### Community 30 - "chat.module.ts"
Cohesion: 0.04
Nodes (55): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+47 more)

### Community 31 - "HealthService"
Cohesion: 0.21
Nodes (4): HealthReadinessResponseDto, ApiProperty, HealthService, Injectable

### Community 32 - "company-context.controller.ts"
Cohesion: 0.23
Nodes (12): toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase (+4 more)

### Community 33 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 35 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (71): mapProviderResponseToAiObservation(), toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), buildGenerationConfig() (+63 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.04
Nodes (80): canEditResult(), ArchiveRunsQuery, fetchUserRuns(), finalizeRunReview(), isUserRating(), patchRunRating(), saveOutputEdited(), submitHitl() (+72 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "runs-result.types.ts"
Cohesion: 0.05
Nodes (57): buildOutputEditedBody(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload(), RESULT_KEYS_BY_TASK_TYPE (+49 more)

### Community 39 - "RedisConnectionService"
Cohesion: 0.27
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (35): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+27 more)

### Community 41 - "run.schemas.ts"
Cohesion: 0.12
Nodes (16): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, runIdSchema (+8 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.10
Nodes (25): ApiOpenAiErrorResponses(), OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse (+17 more)

### Community 43 - "ids.ts"
Cohesion: 0.09
Nodes (32): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createFeedbackId() (+24 more)

### Community 44 - "semantic-cache.service.ts"
Cohesion: 0.09
Nodes (24): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, EmbeddingBackend, isSingleTurnUserRequest(), lastUserMessageText() (+16 more)

### Community 45 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.06
Nodes (39): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisConsumer, RedisRequirementSnapshot (+31 more)

### Community 46 - "save-output-edited.use-case.ts"
Cohesion: 0.06
Nodes (42): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+34 more)

### Community 47 - "GuestQuotaPort"
Cohesion: 0.11
Nodes (10): isGuestTaskType(), Inject, Inject, GuestQuotaAdmitResult, GuestQuotaPort, IoredisGuestQuotaAdapter, msUntilNextMidnight(), Injectable (+2 more)

### Community 48 - "swagger.setup.ts"
Cohesion: 0.04
Nodes (56): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional (+48 more)

### Community 49 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (25): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+17 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.14
Nodes (12): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+4 more)

### Community 51 - "NoopAppMetricsAdapter"
Cohesion: 0.13
Nodes (3): NoopAppMetricsAdapter, Injectable, resolveAppMetricsBackend()

### Community 52 - "GatewayKey"
Cohesion: 0.08
Nodes (23): ChatProviderCooldownService, Injectable, resolveClientIdFromKey(), GatewayKey, ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard, Injectable (+15 more)

### Community 54 - "content.graph.ts"
Cohesion: 0.09
Nodes (41): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+33 more)

### Community 55 - "wizard-orchestrator.service.ts"
Cohesion: 0.08
Nodes (32): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, GatewayClientSchema (+24 more)

### Community 56 - "users.controller.ts"
Cohesion: 0.07
Nodes (25): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, PatchUserDto, ApiProperty (+17 more)

### Community 57 - "start-run-form.tsx"
Cohesion: 0.11
Nodes (32): fetchCompanyContext(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode, isGuestAllowedTaskType() (+24 more)

### Community 58 - "run-details-view.tsx"
Cohesion: 0.05
Nodes (59): metadata, SessionContext, SessionContextValue, SessionProvider(), SessionState, useSession(), DemoChip(), DemoModeContext (+51 more)

### Community 59 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 60 - "metrics.ts"
Cohesion: 0.16
Nodes (19): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns() (+11 more)

### Community 61 - "ref_nestjs_swagger"
Cohesion: 0.04
Nodes (55): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+47 more)

### Community 62 - "packages_shared_dist_index"
Cohesion: 0.03
Nodes (83): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase (+75 more)

### Community 63 - "openai-chat-completions.controller.ts"
Cohesion: 0.17
Nodes (21): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional (+13 more)

### Community 64 - "anthropic-messages.controller.ts"
Cohesion: 0.09
Nodes (30): GATEWAY_CACHE_HEADER, ApiAnthropicErrorResponses(), ApiRequestIdHeader(), AnthropicMessagesController, ApiSecurity, ApiTags, Controller, AnthropicModelsController (+22 more)

### Community 65 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 66 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 67 - "RefreshSessionRepository"
Cohesion: 0.10
Nodes (9): Inject, Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter (+1 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (33): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+25 more)

### Community 69 - "new-ids.ts"
Cohesion: 0.12
Nodes (18): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, ErrorEnvelope (+10 more)

### Community 70 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 71 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 72 - "packages_shared_dist_index_userid"
Cohesion: 0.04
Nodes (53): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+45 more)

### Community 73 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (60): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor (+52 more)

### Community 74 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "ref_nestjs_common"
Cohesion: 0.04
Nodes (72): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+64 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.22
Nodes (11): GatewayChatResponse, GatewayErrorBody, RETRYABLE_CODES, LlmGatewayPort, LlmChatCommand, LlmChatMessage, LlmChatResult, LlmUsage (+3 more)

### Community 80 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 81 - "cn"
Cohesion: 0.04
Nodes (66): logoutSession(), GuestLimitModal(), GuestLimitModalProps, FeedbackCta(), FloatingRunsBox(), handleChevronClick(), toggleCollapsed(), EMPTY_START_DRAFT (+58 more)

### Community 82 - "provider-instances.bootstrap.ts"
Cohesion: 0.18
Nodes (13): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+5 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 85 - "users-view.tsx"
Cohesion: 0.07
Nodes (45): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+37 more)

### Community 86 - "model-manager.service.ts"
Cohesion: 0.12
Nodes (25): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable (+17 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 89 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 90 - "api/src/main.ts"
Cohesion: 0.21
Nodes (10): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig(), ref_cookie_parser, ref_helmet (+2 more)

### Community 92 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.10
Nodes (38): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine() (+30 more)

### Community 94 - "CompanyContextRepository"
Cohesion: 0.13
Nodes (11): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, emptyCompanyContext(), jsonArray() (+3 more)

### Community 95 - "StartRunDto"
Cohesion: 0.22
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "EnvPatchService"
Cohesion: 0.18
Nodes (5): KeyGenerateCommand, Command, Option, EnvPatchService, Injectable

### Community 99 - "InvitationsController"
Cohesion: 0.12
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 100 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 101 - "configuration.ts"
Cohesion: 0.08
Nodes (35): asCacheTtlSeconds(), asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, collectInactiveProviderWarnings() (+27 more)

### Community 102 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "PageDocument"
Cohesion: 0.16
Nodes (6): ContentPipelineState, PageDocument, VerifierVerdict, PrismaContentResultAdapter, toContentPipelinePhase(), Injectable

### Community 105 - "app/layout.tsx"
Cohesion: 0.12
Nodes (11): metadata, apps_frontend_src_app_globals, AcceptInvitePage(), metadata, tokenFromSearchParam(), geistMono, geistSans, metadata (+3 more)

### Community 106 - "CompanyContextController"
Cohesion: 0.13
Nodes (11): toCompanyContext(), toPartialCompanyContext(), CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller (+3 more)

### Community 108 - "LlmGatewayHttpAdapter"
Cohesion: 0.15
Nodes (6): LlmGatewayError, LlmGatewayHttpAdapter, Inject, Injectable, GATEWAY_ERROR_CODE_LABELS, toGatewayErrorCodeLabel()

### Community 109 - "app-metrics.service.ts"
Cohesion: 0.23
Nodes (9): HealthModule, Module, HealthCheckResult, HealthRedisCheckResult, APP_METRICS_BACKEND, HealthMetricsSnapshot, PreMetricsScrapeHook, PreMetricsScrapeRegistry (+1 more)

### Community 110 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 111 - "ref_react"
Cohesion: 0.07
Nodes (56): ALL_STATUSES, FLOATING_ROWS, KPI, NAV, ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError() (+48 more)

### Community 112 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 113 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 114 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 115 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 116 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.15
Nodes (21): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+13 more)

### Community 119 - "AppMetricsService"
Cohesion: 0.11
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable, HttpMethod

### Community 122 - "prisma-run.adapter.ts"
Cohesion: 0.07
Nodes (23): LightRunItem, ListRunsResult, RunSnapshot, RunSummaryAggregate, RunLogEntry, RunRecordBase, assertTransition(), PrismaRunAdapter (+15 more)

### Community 123 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand.ts"
Cohesion: 0.33
Nodes (3): unbrand, RunTaskType, RunsSummaryResponse

### Community 126 - "assert-company-context-writable.ts"
Cohesion: 0.32
Nodes (6): assertAudienceProfileNamesUnique(), assertCompanyContextWritable(), isComplete(), normalizeAudienceName(), withEffectiveAudience(), createLoadContextNode()

### Community 128 - "llm-gateway-chat.log.ts"
Cohesion: 0.31
Nodes (8): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmChatParams

### Community 129 - "company-context.schemas.ts"
Cohesion: 0.33
Nodes (5): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema

### Community 130 - ".get"
Cohesion: 0.50
Nodes (3): ApiOkResponse, ApiOperation, Get

## Knowledge Gaps
- **479 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+474 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1286 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `isRunId()` connect `ids.ts` to `run.schemas.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `ModelAlias` connect `ModelAlias` to `ProviderInstanceId`, `branded.types.ts`, `api-error.code.ts`, `chat-provider-call.service.ts`, `ai-provider.interface.ts`, `app-metrics-backend.interface.ts`, `redis-vector-store.adapter.ts`, `PrometheusAppMetricsAdapter`, `GatewayConfig`, `asProviderInstanceId`, `sentry-ai-metrics.adapter.ts`, `semantic-cache.service.ts`, `NoopAppMetricsAdapter`, `wizard-orchestrator.service.ts`, `resilient-executor.ts`, `metrics.ts`, `model-manager.service.ts`, `AppMetricsBackend`, `models.controller.ts`, `app-metrics.service.ts`, `AppMetricsService`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `AuthUserContext` connect `AuthUserContext` to `DomainException`, `get-run.use-case.ts`, `InvitationsController`, `new-ids.ts`, `packages_shared_dist_index_userid`, `ref_nestjs_common`, `save-output-edited.use-case.ts`, `GuestQuotaPort`, `AuthController`, `users.controller.ts`, `packages_shared_dist_index`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _479 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DomainException` be split into smaller, more focused modules?**
  _Cohesion score 0.05660377358490566 - nodes in this community are weakly interconnected._
- **Should `get-run.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05271059216013344 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05364314400458979 - nodes in this community are weakly interconnected._
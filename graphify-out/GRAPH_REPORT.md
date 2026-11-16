# Graph Report - content-chain  (2026-11-16)

## Corpus Check
- 762 files · ~301,366 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 5036 nodes · 16400 edges · 155 communities (141 shown, 11 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 430 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `73237721`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- create-feedback.use-case.ts
- packages_shared_dist_index_runid
- company-context-form.tsx
- packages_shared_dist_index
- app-metrics.service.ts
- semantic-cache.service.ts
- DomainException
- ModelAlias
- AuthUserContext
- anthropic/anthropic-tools.mapper.ts
- RefreshSessionRepository
- GatewayConfig
- exitWithAgentReport
- prisma-run.adapter.ts
- prisma-email-change-request.adapter.ts
- api-error.code.ts
- start-run.use-case.ts
- ai-provider.interface.ts
- runs-result.types.ts
- chat.service.ts
- dashboard-shell.tsx
- run-details-view.tsx
- configuration.ts
- UserRepository
- cn
- google-tools.mapper.ts
- ClientAddCommand
- runs.controller.ts
- anthropic-response.mapper.ts
- openai-messages.mapper.ts
- isRecord
- ai-provider-gateway/src/app.module.ts
- response-cache.service.ts
- provider-registry.service.ts
- PrometheusAppMetricsAdapter
- guest-run-policy.service.ts
- domain/company-context.types.ts
- enums.ts
- content.graph.ts
- redis-vector-store.adapter.ts
- anthropic-models.controller.ts
- invitations.controller.ts
- health.api.ts
- ids.ts
- branded.types.ts
- ClientEditCommand
- PrismaService
- MetricsController
- OpenAiChatCompletionRequestDto
- AppMetricsService
- company-context.module.ts
- ClientRemoveCommand
- ChatMessageDto
- feedback-form.tsx
- RunRepository
- smart-rate-limiter.service.ts
- ref_nestjs_common
- runs.types.ts
- api/src/health/health.service.ts
- metrics.ts
- sentry-ai-metrics.adapter.ts
- export-openapi.ts
- PgBossRunJobEnqueue
- AnthropicMessagesRequestDto
- api/src/app.module.ts
- auth.schemas.ts
- asProviderInstanceId
- should-include-redis-stack.ts
- auth.api.ts
- cli.module.ts
- registration-thank-you.tsx
- responses.adapter.ts
- openai-params-provider.mapper.ts
- auth.module.ts
- LoggingService
- parse-verifier-log-message.ts
- api/src/main.ts
- ref_nestjs_swagger
- start-run-form.tsx
- archive-runs-view.tsx
- CompanyContextRepository
- ChatToolingDto
- transactional-mailer.port.ts
- SPEC — README
- LocalRunSseHub
- users.controller.ts
- run-sse-notify.envelope.ts
- company-context.controller.ts
- metrics.module.ts
- AnthropicContentBlockDto
- EnvironmentVariables
- PrometheusService
- FileManagerService
- social.graph.ts
- http-metrics.interceptor.ts
- swagger.setup.ts
- seed.service.ts
- route.ts
- CompanyContextController
- health-readiness-response.dto.ts
- StartRunDto
- openai-stream.mapper.ts
- resolve-provider-call-options.ts
- AuthController
- ai-provider-gateway/src/health/health.service.ts
- new-ids.ts
- RedisConnectionService
- BootstrapAdminDto
- LoginDto
- src/index.ts
- GatewayKey
- openai-models.controller.ts
- src/pagination.ts
- RegisterUserDto
- llm-gateway-chat.log.ts
- ActivateAccountDto
- PublicConfigController
- domain/is-complete.ts
- get-runs-summary.use-case.ts
- notify-run-sse.hub.ts
- ListUsersUseCase
- assert-audience-profile-names-unique.ts
- prisma-invitation.adapter.ts
- GatewayProviderType
- Architektura
- CompanyContext
- save-output-edited.use-case.ts
- ProviderAddCommand
- anthropic-stream.mapper.ts
- openai-chat-completion-response.dto.ts
- .chat
- metrics.service.ts
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
- llm-gateway.http.adapter.ts
- run-abort-signal.port.ts
- load-company-context-fixture.ts
- JwtAuthGuard
- ModelEditCommand
- ProviderEditCommand
- nodemailer-smtp-mailer.adapter.ts
- CreateFeedbackDto
- RunSseNotifyListener
- GuestGuard

## God Nodes (most connected - your core abstractions)
1. `DomainException` - 95 edges
2. `ModelAlias` - 88 edges
3. `ProviderInstanceId` - 81 edges
4. `LoggingService` - 73 edges
5. `Env` - 73 edges
6. `AuthUserContext` - 71 edges
7. `isRecord()` - 69 edges
8. `asProviderInstanceId()` - 67 edges
9. `GatewayConfig` - 65 edges
10. `cn()` - 65 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `Request` --references--> `AuthUserContext`  [EXTRACTED]
  apps/api/src/shared/http/express.d.ts → apps/api/src/shared/types/auth-user-context.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (155 total, 11 thin omitted)

### Community 0 - "create-feedback.use-case.ts"
Cohesion: 0.09
Nodes (22): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+14 more)

### Community 1 - "packages_shared_dist_index_runid"
Cohesion: 0.05
Nodes (45): ContentPipelineInput, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole, CompositeRunResultReader, GetRunGuestAccess (+37 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.04
Nodes (94): metadata, fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+86 more)

### Community 3 - "packages_shared_dist_index"
Cohesion: 0.07
Nodes (35): DeleteUserResult, JwtPayload, UserListItem, CreateAdminIfNoneData, CreateAdminIfNoneResult, CreateUserData, ListUsersResult, USER_REPOSITORY (+27 more)

### Community 4 - "app-metrics.service.ts"
Cohesion: 0.13
Nodes (14): healthStatusToGaugeValue(), APP_METRICS_BACKEND, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod, HttpRequestLabels (+6 more)

### Community 5 - "semantic-cache.service.ts"
Cohesion: 0.09
Nodes (21): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), EmbeddingBackend, EmbeddingCircuitBreaker, isSingleTurnUserRequest(), lastUserMessageText(), EMBEDDING_CIRCUIT_COOLDOWN_MS (+13 more)

### Community 6 - "DomainException"
Cohesion: 0.09
Nodes (48): AcceptInviteResult, acceptInviteSchema, ActivateAccountOutput, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs() (+40 more)

### Community 7 - "ModelAlias"
Cohesion: 0.07
Nodes (4): ModelAlias, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 8 - "AuthUserContext"
Cohesion: 0.10
Nodes (24): FeedbackController, ApiCookieAuth, ApiTags, Body, Controller, HttpCode, Post, isGuestArchiveStatus() (+16 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (41): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), anthropicModelRejectsSamplingParams(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel (+33 more)

### Community 10 - "RefreshSessionRepository"
Cohesion: 0.12
Nodes (8): LogoutUseCase, Inject, Injectable, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 11 - "GatewayConfig"
Cohesion: 0.07
Nodes (31): buildAppProviderMetricsContext(), DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService (+23 more)

### Community 12 - "exitWithAgentReport"
Cohesion: 0.10
Nodes (15): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), toSafeClientList(), ConfigInitCommand, Command, Option, toSafeConfigSnapshot() (+7 more)

### Community 13 - "prisma-run.adapter.ts"
Cohesion: 0.05
Nodes (30): LightRunItem, ListLightRunsResult, ListRunsResult, PersistedRunLog, RunSnapshot, RunSummaryAggregate, RunSummaryScope, RunLogEntry (+22 more)

### Community 14 - "prisma-email-change-request.adapter.ts"
Cohesion: 0.12
Nodes (11): Inject, Injectable, UpdateMeEmailUseCase, EmailChangeRequestRecord, EmailChangeRequestRepository, UpsertEmailChangeRequestInput, isUniqueConstraintViolation(), PrismaEmailChangeRequestAdapter (+3 more)

### Community 15 - "api-error.code.ts"
Cohesion: 0.13
Nodes (24): ChatErrorHandlerService, Injectable, ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus() (+16 more)

### Community 16 - "start-run.use-case.ts"
Cohesion: 0.09
Nodes (27): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, runIdSchema (+19 more)

### Community 17 - "ai-provider.interface.ts"
Cohesion: 0.12
Nodes (36): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, SseMetaPayload, SseMetaPayloadDto, ApiProperty (+28 more)

### Community 18 - "runs-result.types.ts"
Cohesion: 0.04
Nodes (76): filterFeedbackRunOptions(), buildOutputEditedBody(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+68 more)

### Community 19 - "chat.service.ts"
Cohesion: 0.05
Nodes (60): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ApiBody, ApiOperation, ApiProduces, ApiResponse (+52 more)

### Community 20 - "dashboard-shell.tsx"
Cohesion: 0.08
Nodes (25): DemoChip(), useDemoMode(), FeedbackCta(), GatewayAliveProvider(), FloatingRunsBox(), handleChevronClick(), toggleCollapsed(), AppHeader() (+17 more)

### Community 21 - "run-details-view.tsx"
Cohesion: 0.07
Nodes (43): metadata, deleteOwnAccount(), AccountDeleteForm(), onPurgeConfirm(), onReauthSubmit(), runDelete(), AccountManageMenu(), useSession() (+35 more)

### Community 22 - "configuration.ts"
Cohesion: 0.07
Nodes (51): CliValidateOptions, asSemanticCacheTtlSeconds(), AppConfiguration, RedisRuntimeConfig, SemanticCacheRuntimeConfig, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig() (+43 more)

### Community 23 - "UserRepository"
Cohesion: 0.06
Nodes (15): Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput, AuthUser, UserRepository, ActivationRow (+7 more)

### Community 24 - "cn"
Cohesion: 0.05
Nodes (80): logoutSession(), AccountDeleteFormProps, DeletePhase, AccountEmailFormProps, ModalState, AccountManageMenuProps, ManageDialog, AccountPasswordFormProps (+72 more)

### Community 25 - "google-tools.mapper.ts"
Cohesion: 0.14
Nodes (28): mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), getUsageMetadata(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls() (+20 more)

### Community 26 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 27 - "runs.controller.ts"
Cohesion: 0.05
Nodes (43): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Injectable, GetRunLogsUseCase, Injectable, GetRunUseCase (+35 more)

### Community 28 - "anthropic-response.mapper.ts"
Cohesion: 0.17
Nodes (18): SseDoneEvent, fromGatewayToolCallDto(), toGatewayToolCallDto(), AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+10 more)

### Community 29 - "openai-messages.mapper.ts"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 30 - "isRecord"
Cohesion: 0.06
Nodes (64): metadata, fetchAppConfig(), AppConfig, parseAppConfig(), DemoModeContext, DemoModeContextValue, DemoModeProvider(), DemoModeState (+56 more)

### Community 31 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.07
Nodes (28): ChatModule, Module, DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch (+20 more)

### Community 32 - "response-cache.service.ts"
Cohesion: 0.06
Nodes (32): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+24 more)

### Community 33 - "provider-registry.service.ts"
Cohesion: 0.13
Nodes (23): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+15 more)

### Community 34 - "PrometheusAppMetricsAdapter"
Cohesion: 0.09
Nodes (7): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope, AppRequestLabels, AppTokenUsage

### Community 35 - "guest-run-policy.service.ts"
Cohesion: 0.08
Nodes (21): GUEST_ARCHIVE_STATUSES, GUEST_TASK_TYPES, GuestRunAdmit, isGuestTaskType(), Inject, Inject, GUEST_QUOTA, GuestQuotaAdmitResult (+13 more)

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (15): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+7 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "content.graph.ts"
Cohesion: 0.07
Nodes (41): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+33 more)

### Community 39 - "redis-vector-store.adapter.ts"
Cohesion: 0.10
Nodes (25): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions (+17 more)

### Community 40 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 41 - "invitations.controller.ts"
Cohesion: 0.09
Nodes (16): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+8 more)

### Community 42 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 43 - "ids.ts"
Cohesion: 0.08
Nodes (36): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createEmailChangeRequestId() (+28 more)

### Community 44 - "branded.types.ts"
Cohesion: 0.07
Nodes (50): ProviderTestCommand, ProviderTestOptions, Command, Option, CliAiModel, CliAiProvider, CliRateLimit, ProviderTestService (+42 more)

### Community 45 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 46 - "PrismaService"
Cohesion: 0.07
Nodes (16): DeleteUserUseCase, Inject, Injectable, GUEST_PURGE, GuestPurgeDeleteStats, GuestPurgePort, LIVE_RUN_STATUSES, OutputEditedWrite (+8 more)

### Community 47 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 48 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.08
Nodes (27): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+19 more)

### Community 49 - "AppMetricsService"
Cohesion: 0.10
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable

### Community 50 - "company-context.module.ts"
Cohesion: 0.22
Nodes (11): toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, COMPANY_CONTEXT_REPOSITORY (+3 more)

### Community 51 - "ClientRemoveCommand"
Cohesion: 0.12
Nodes (9): ClientRemoveCommand, Command, Option, ModelRemoveCommand, Command, Option, ProviderRemoveCommand, Command (+1 more)

### Community 52 - "ChatMessageDto"
Cohesion: 0.16
Nodes (16): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+8 more)

### Community 53 - "feedback-form.tsx"
Cohesion: 0.13
Nodes (23): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+15 more)

### Community 54 - "RunRepository"
Cohesion: 0.03
Nodes (42): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, Inject, Inject, Inject, Inject, GuestRunPolicyService (+34 more)

### Community 55 - "smart-rate-limiter.service.ts"
Cohesion: 0.13
Nodes (11): resolveClientIdFromKey(), ResolvedGatewayClient, SmartRateLimitGuard, Injectable, RATE_LIMIT_MODULE_OPTIONS, RateLimitModule, RateLimitModuleOptions, Module (+3 more)

### Community 56 - "ref_nestjs_common"
Cohesion: 0.04
Nodes (67): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+59 more)

### Community 57 - "runs.types.ts"
Cohesion: 0.05
Nodes (74): assertNever(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome, runTerminalToastId() (+66 more)

### Community 58 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 59 - "metrics.ts"
Cohesion: 0.19
Nodes (17): getClientConversationId(), getOrCreateConversationIdForResponse(), buildLlmMetricsContext(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns(), composeSystemPrompt() (+9 more)

### Community 60 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.09
Nodes (32): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+24 more)

### Community 61 - "export-openapi.ts"
Cohesion: 0.12
Nodes (17): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+9 more)

### Community 62 - "PgBossRunJobEnqueue"
Cohesion: 0.17
Nodes (6): RUN_JOB_ENQUEUE, RunJobEnqueuePort, PgBossRunJobEnqueue, Inject, Injectable, PgBossSendClient

### Community 63 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 64 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (54): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind() (+46 more)

### Community 65 - "auth.schemas.ts"
Cohesion: 0.11
Nodes (18): ActivateAccountInput, activateAccountSchema, BootstrapAdminInput, bootstrapAdminSchema, ChangeMePasswordInput, changeMePasswordSchema, confirmEmailChangeSchema, deleteOwnAccountSchema (+10 more)

### Community 66 - "asProviderInstanceId"
Cohesion: 0.06
Nodes (63): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), DEFAULT_MODELS, WIZARD_INIT_STEPS, WIZARD_STEPS (+55 more)

### Community 67 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (11): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+3 more)

### Community 68 - "auth.api.ts"
Cohesion: 0.04
Nodes (80): apps_frontend_src_app_globals, AcceptInvitePage(), metadata, tokenFromSearchParam(), geistMono, inter, metadata, spaceGrotesk (+72 more)

### Community 69 - "cli.module.ts"
Cohesion: 0.06
Nodes (73): AgentReport, AgentReportStatus, PendingSecretsItem, loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers(), CliMode, CliModeFlags (+65 more)

### Community 70 - "registration-thank-you.tsx"
Cohesion: 0.16
Nodes (17): resendActivation(), initialState, RegistrationThankYou(), onResend(), RegistrationThankYouProps, RegistrationThankYouState, LANDING_CONTEXT_IMAGES, LANDING_COPY (+9 more)

### Community 71 - "responses.adapter.ts"
Cohesion: 0.09
Nodes (45): toHttpException(), asSystemFingerprint(), asToolCallId(), ProviderAssistantTurn, ProviderChatInput, ProviderChatTurn, ProviderToolDefinition, ProviderToolResultTurn (+37 more)

### Community 72 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 73 - "auth.module.ts"
Cohesion: 0.04
Nodes (52): AcceptInviteUseCase, Inject, Injectable, ActivateAccountUseCase, Inject, Injectable, BootstrapAdminUseCase, Inject (+44 more)

### Community 74 - "LoggingService"
Cohesion: 0.04
Nodes (39): Inject, OllamaEmbeddingAdapter, Injectable, Inject, ChatProviderCooldownService, Injectable, Inject, Optional (+31 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "api/src/main.ts"
Cohesion: 0.18
Nodes (11): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), ACCESS_COOKIE_NAME, buildSwaggerConfig(), COOKIE_AUTH_NAME (+3 more)

### Community 77 - "ref_nestjs_swagger"
Cohesion: 0.07
Nodes (27): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+19 more)

### Community 78 - "start-run-form.tsx"
Cohesion: 0.08
Nodes (40): metadata, fetchCompanyContext(), GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact (+32 more)

### Community 79 - "archive-runs-view.tsx"
Cohesion: 0.06
Nodes (47): metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, PAGE_OUTLINE_ROLE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, fetchArchiveRuns() (+39 more)

### Community 80 - "CompanyContextRepository"
Cohesion: 0.14
Nodes (8): Inject, Inject, Inject, PutCompanyContextUseCase, Inject, Injectable, CompanyContextRepository, Inject

### Community 81 - "ChatToolingDto"
Cohesion: 0.15
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 82 - "transactional-mailer.port.ts"
Cohesion: 0.14
Nodes (30): EmailChangeConfirmMail, TransactionalMail, UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments() (+22 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "LocalRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, LocalRunSseHub, Inject, Injectable

### Community 85 - "users.controller.ts"
Cohesion: 0.09
Nodes (24): PatchUserDto, ApiProperty, IsBoolean, ApiCookieAuth, ApiTags, Body, Controller, Delete (+16 more)

### Community 86 - "run-sse-notify.envelope.ts"
Cohesion: 0.15
Nodes (9): NotifyRunSseHub, Inject, Injectable, encodeComplete(), encodePublish(), encodePublishLog(), runSseInlineEventSchema, RunSseNotifyEnvelope (+1 more)

### Community 87 - "company-context.controller.ts"
Cohesion: 0.16
Nodes (26): toCompanyContext(), toPartialCompanyContext(), Body, Patch, AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto (+18 more)

### Community 88 - "metrics.module.ts"
Cohesion: 0.21
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 89 - "AnthropicContentBlockDto"
Cohesion: 0.14
Nodes (14): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+6 more)

### Community 90 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 91 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 92 - "FileManagerService"
Cohesion: 0.09
Nodes (9): ModelAddCommand, Command, Option, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, FileManagerService, Injectable (+1 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.10
Nodes (43): LlmHopService, Inject, Injectable, coercePassNoteVerdict(), isPassOnlyIssue(), SocialPipelineFacade, toOutcome(), Inject (+35 more)

### Community 94 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 95 - "swagger.setup.ts"
Cohesion: 0.08
Nodes (28): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+20 more)

### Community 96 - "seed.service.ts"
Cohesion: 0.21
Nodes (7): isEmptyCompanyContext(), SeedCliModule, Module, SeedCompanyContextResult, SeedService, Injectable, ref_reflect_metadata

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 99 - "health-readiness-response.dto.ts"
Cohesion: 0.33
Nodes (8): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional

### Community 100 - "StartRunDto"
Cohesion: 0.22
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 101 - "openai-stream.mapper.ts"
Cohesion: 0.30
Nodes (12): mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields(), buildToolCallsDelta(), chunkLine() (+4 more)

### Community 102 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 103 - "AuthController"
Cohesion: 0.12
Nodes (23): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+15 more)

### Community 104 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.07
Nodes (21): SemanticCacheModule, Module, EMBEDDING_BACKEND, VECTOR_STORE, HealthReadinessResponseDto, ApiProperty, HealthController, ApiOkResponse (+13 more)

### Community 105 - "new-ids.ts"
Cohesion: 0.19
Nodes (7): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable, packages_shared_dist_index_requestid

### Community 106 - "RedisConnectionService"
Cohesion: 0.27
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 107 - "BootstrapAdminDto"
Cohesion: 0.40
Nodes (5): BootstrapAdminDto, ApiProperty, IsEmail, IsString, MinLength

### Community 108 - "LoginDto"
Cohesion: 0.40
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 109 - "src/index.ts"
Cohesion: 0.33
Nodes (3): unbrand, RunTaskType, RunsSummaryResponse

### Community 110 - "GatewayKey"
Cohesion: 0.06
Nodes (39): isRedisRequired(), KeyGenerateCommand, Command, Option, convertRateLimit(), GatewayClient, ClientManagerService, Injectable (+31 more)

### Community 111 - "openai-models.controller.ts"
Cohesion: 0.06
Nodes (41): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+33 more)

### Community 112 - "src/pagination.ts"
Cohesion: 0.29
Nodes (5): DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, PageSize, PaginatedList

### Community 113 - "RegisterUserDto"
Cohesion: 0.40
Nodes (5): RegisterUserDto, ApiProperty, IsEmail, IsString, MinLength

### Community 114 - "llm-gateway-chat.log.ts"
Cohesion: 0.23
Nodes (11): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmChatMessage (+3 more)

### Community 115 - "ActivateAccountDto"
Cohesion: 0.50
Nodes (4): ActivateAccountDto, ApiProperty, IsString, MinLength

### Community 116 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 117 - "domain/is-complete.ts"
Cohesion: 0.39
Nodes (8): assertCompanyContextWritable(), collectGateItemPaths(), isComplete(), isCompleteAudienceProfile(), isCompleteCtaItem(), isCompleteOfferItem(), nonEmpty(), sectionFilled

### Community 118 - "get-runs-summary.use-case.ts"
Cohesion: 0.24
Nodes (8): CacheEntry, cacheKey(), GetRunsSummaryUseCase, RUNS_SUMMARY_CACHE_TTL_MS, RUNS_SUMMARY_WINDOW_MS, scopeFor(), successRate(), Injectable

### Community 119 - "notify-run-sse.hub.ts"
Cohesion: 0.35
Nodes (6): PG_BOSS, PG_NOTIFY_POOL, RUN_ABORT_CHANNEL, RUN_EXECUTE_QUEUE, RUN_SSE_CHANNEL, RUN_WAKE_QUEUE

### Community 120 - "ListUsersUseCase"
Cohesion: 0.20
Nodes (6): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable

### Community 121 - "assert-audience-profile-names-unique.ts"
Cohesion: 0.38
Nodes (5): assertAudienceProfileNamesUnique(), normalizeAudienceName(), withEffectiveAudience(), createLoadContextNode(), createLoadContextNode()

### Community 122 - "prisma-invitation.adapter.ts"
Cohesion: 0.07
Nodes (32): InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase, Inject, Injectable, ResendInvitationUseCase (+24 more)

### Community 123 - "GatewayProviderType"
Cohesion: 0.18
Nodes (14): ProviderInstanceRuntime, assertOpenAiProviderType(), GatewayProviderType, adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn (+6 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "CompanyContext"
Cohesion: 0.33
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 126 - "save-output-edited.use-case.ts"
Cohesion: 0.07
Nodes (35): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+27 more)

### Community 127 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 128 - "anthropic-stream.mapper.ts"
Cohesion: 0.39
Nodes (8): asMessageId(), MessageId, AnthropicStreamState, createAnthropicStreamState(), emitThinkingBlock(), eventLine(), mapSseEventToAnthropic(), nextToolBlockIndex()

### Community 129 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 130 - ".chat"
Cohesion: 0.31
Nodes (3): LlmGatewayHttpAdapter, Inject, Injectable

### Community 131 - "metrics.service.ts"
Cohesion: 0.28
Nodes (5): metricsRegistry, Inject, RUN_STATS_PORT, RunStatsPort, packages_shared_dist_index_run_statuses

### Community 144 - "llm-gateway.http.adapter.ts"
Cohesion: 0.19
Nodes (11): GatewayChatResponse, GatewayErrorBody, RETRYABLE_CODES, LlmGatewayPort, LlmChatCommand, LlmChatResult, GATEWAY_ERROR_CODE_LABELS, toGatewayErrorCodeLabel() (+3 more)

### Community 145 - "run-abort-signal.port.ts"
Cohesion: 0.22
Nodes (5): RUN_ABORT_SIGNAL, RunAbortSignalPort, PgNotifyAbortSignal, Inject, Injectable

### Community 146 - "load-company-context-fixture.ts"
Cohesion: 0.15
Nodes (13): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, audienceProfileSchema, CompanyContextFixture, companyContextFixtureSchema (+5 more)

### Community 148 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 149 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 151 - "nodemailer-smtp-mailer.adapter.ts"
Cohesion: 0.29
Nodes (6): NodemailerSmtpMailerAdapter, readSmtpConfig(), SmtpConfig, Inject, Injectable, ref_nodemailer

### Community 152 - "CreateFeedbackDto"
Cohesion: 0.33
Nodes (6): CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength, MinLength

### Community 153 - "RunSseNotifyListener"
Cohesion: 0.40
Nodes (3): parseRunSseNotifyPayload(), RunSseNotifyListener, Injectable

### Community 154 - "GuestGuard"
Cohesion: 0.40
Nodes (3): GuestGuard, Inject, Injectable

## Knowledge Gaps
- **526 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+521 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1378 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Env` connect `DomainException` to `packages_shared_dist_index_runid`, `.chat`, `packages_shared_dist_index`, `prisma-email-change-request.adapter.ts`, `llm-gateway.http.adapter.ts`, `start-run.use-case.ts`, `UserRepository`, `nodemailer-smtp-mailer.adapter.ts`, `GuestGuard`, `runs.controller.ts`, `guest-run-policy.service.ts`, `RunRepository`, `api/src/health/health.service.ts`, `api/src/app.module.ts`, `auth.module.ts`, `api/src/main.ts`, `CompanyContextRepository`, `LocalRunSseHub`, `social.graph.ts`, `seed.service.ts`, `PublicConfigController`, `prisma-invitation.adapter.ts`, `save-output-edited.use-case.ts`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `start-run.use-case.ts`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `branded.types.ts` to `app-metrics.service.ts`, `ModelAlias`, `GatewayConfig`, `exitWithAgentReport`, `api-error.code.ts`, `ai-provider.interface.ts`, `chat.service.ts`, `configuration.ts`, `provider-registry.service.ts`, `PrometheusAppMetricsAdapter`, `AppMetricsService`, `metrics.ts`, `sentry-ai-metrics.adapter.ts`, `asProviderInstanceId`, `cli.module.ts`, `LoggingService`, `GatewayKey`, `openai-models.controller.ts`, `GatewayProviderType`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _526 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `create-feedback.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0931174089068826 - nodes in this community are weakly interconnected._
- **Should `packages_shared_dist_index_runid` be split into smaller, more focused modules?**
  _Cohesion score 0.04962518740629685 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.03990063654712001 - nodes in this community are weakly interconnected._
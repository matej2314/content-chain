# Graph Report - content-chain  (2026-11-17)

## Corpus Check
- 727 files · ~298,982 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 4798 nodes · 15231 edges · 150 communities (135 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 410 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4ee5c38e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- branded.types.ts
- social.types.ts
- api/company-context.types.ts
- UserRepository
- cn
- redis-vector-store.adapter.ts
- register-user.use-case.ts
- content.types.ts
- asProviderInstanceId
- anthropic/anthropic-tools.mapper.ts
- users-view.tsx
- AuthUserContext
- config-generator.service.ts
- run.schemas.ts
- auth.schemas.ts
- api-error.code.ts
- AppMetricsService
- company-context-form.tsx
- runs.types.ts
- GatewayKey
- completeness-provider.tsx
- run-result-editor.tsx
- configuration.ts
- prisma-guest-purge.adapter.ts
- api/src/app.module.ts
- Env
- ref_nestjs_config
- packages_shared_dist_index
- anthropic-response.mapper.ts
- ModelAlias
- accept-invite-form.tsx
- guest-run-policy.service.ts
- cache.module.ts
- resilient-executor.ts
- invitation-repository.port.ts
- types/index.ts
- domain/company-context.types.ts
- enums.ts
- content.graph.ts
- semantic-cache.service.ts
- anthropic-models.controller.ts
- account-activation-repository.port.ts
- responses.adapter.ts
- ids.ts
- ref_nestjs_common
- openai-params-provider.mapper.ts
- LoggingService
- .create
- OpenAiChatCompletionRequestDto
- social-pipeline.facade.ts
- CompanyContextController
- ClientRemoveCommand
- ref_nestjs_swagger
- EmailChangeRequestRepository
- ai-provider-gateway/src/app.module.ts
- start-run.use-case.ts
- openai-models.controller.ts
- ModelEditCommand
- api/src/health/health.service.ts
- metrics.ts
- sentry-ai-metrics.adapter.ts
- ModelRemoveCommand
- PaginationQueryDto
- AnthropicMessagesRequestDto
- guest.guard.ts
- ClientAddCommand
- GatewayConfig
- EnvironmentVariables
- envelope.ts
- cli.module.ts
- registration-thank-you.tsx
- domain/is-complete.ts
- openai-stream.mapper.ts
- InvitationsController
- LogContext
- parse-verifier-log-message.ts
- PrometheusService
- ChatParamsDto
- start-run-form.tsx
- archive-runs-view.tsx
- exitWithAgentReport
- asClientId
- transactional-mailer.port.ts
- SPEC — README
- company-context-view.tsx
- domain/feedback.types.ts
- CompanyContextRepository
- company-context.controller.ts
- ref_class_validator
- ai-provider-gateway/src/health/health.service.ts
- prisma-output-edited.adapter.ts
- lib/is-complete.ts
- ClientEditCommand
- social.graph.ts
- feedback.module.ts
- export-openapi.ts
- CreateFeedbackUseCase
- route.ts
- OpenAiChatMessageDto
- ModelAddCommand
- FeedbackRepository
- src/index.ts
- .execute
- runs.controller.ts
- PrismaEmailChangeRequestAdapter
- HttpExceptionFilter
- models.controller.ts
- AuthController
- get-runs-summary.use-case.ts
- health.api.ts
- ProviderRemoveCommand
- GuestRunPolicyService
- src/pagination.ts
- HealthController
- AnthropicMessageDto
- CompanyContext
- PublicConfigController
- ProviderEditCommand
- swagger.setup.ts
- SaveOutputEditedUseCase
- PrismaRefreshSessionAdapter
- ResponseFormatDto
- auth.module.ts
- RunSseNotifyListener
- Architektura
- roles.guard.ts
- save-output-edited.use-case.ts
- ProviderAddCommand
- ConfigValidateCommand
- LoginDto
- RegisterUserDto
- openai-chat-message.dto.ts
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
- llm-hop.ts
- LocalRunSseHub
- load-company-context-fixture.ts
- PrismaFeedbackRunReaderAdapter
- RunDispatchShutdown

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `ProviderInstanceId` - 81 edges
3. `LoggingService` - 73 edges
4. `Env` - 71 edges
5. `AuthUserContext` - 71 edges
6. `isRecord()` - 69 edges
7. `asProviderInstanceId()` - 67 edges
8. `GatewayConfig` - 65 edges
9. `cn()` - 65 edges
10. `GatewayKey` - 59 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (150 total, 12 thin omitted)

### Community 0 - "branded.types.ts"
Cohesion: 0.08
Nodes (57): SemanticStoreEmbedState, CachedChatResponse, CachedChatWarning, CachedFinishReason, CacheIdentityMessage, ChatCacheSource, ChatResponseData, SseMetaPayload (+49 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (29): CompositeRunResultReader, GetRunGuestAccess, GetRunOutput, Inject, Inject, RunResultReader, EmptyRunResultReader, Injectable (+21 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.12
Nodes (23): CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextPayload, CONTEXT_TAB_LABELS, CONTEXT_TABS, ContextTab, DEFAULT_CONTEXT_TAB (+15 more)

### Community 3 - "UserRepository"
Cohesion: 0.08
Nodes (20): Inject, Inject, Inject, Inject, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult, CreateUserData (+12 more)

### Community 4 - "cn"
Cohesion: 0.05
Nodes (74): AccountDeleteFormProps, DeletePhase, AccountEmailFormProps, ModalState, AccountManageMenuProps, ManageDialog, AccountPasswordFormProps, INITIAL (+66 more)

### Community 5 - "redis-vector-store.adapter.ts"
Cohesion: 0.07
Nodes (32): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, EmbeddingCircuitBreaker, escapeRedisSearchTag(), normalizeEmbeddingModelForIndex(), semanticIndexName() (+24 more)

### Community 6 - "register-user.use-case.ts"
Cohesion: 0.07
Nodes (36): generateRefreshToken(), formatMailValidityLabel(), polishPlural(), InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable (+28 more)

### Community 7 - "content.types.ts"
Cohesion: 0.09
Nodes (25): ContentPipelineFacade, toOutcome(), Inject, Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject (+17 more)

### Community 8 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (60): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), DEFAULT_MODELS, CliAiProvider, ClientPromptService (+52 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (41): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+33 more)

### Community 10 - "users-view.tsx"
Cohesion: 0.06
Nodes (55): Row, metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated (+47 more)

### Community 11 - "AuthUserContext"
Cohesion: 0.12
Nodes (20): orderItemsBySelectedIds(), isContentStartCommand(), RunsController, ApiCookieAuth, ApiTags, Body, Controller, Get (+12 more)

### Community 12 - "config-generator.service.ts"
Cohesion: 0.09
Nodes (22): isRedisRequired(), InitAnswers, CliGatewayValidatorService, Injectable, WizardState, ConfigGeneratorService, Injectable, FileManagerService (+14 more)

### Community 13 - "run.schemas.ts"
Cohesion: 0.09
Nodes (25): contentBriefSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema, socialStartRunSchema (+17 more)

### Community 14 - "auth.schemas.ts"
Cohesion: 0.07
Nodes (26): ActivateAccountInput, activateAccountSchema, BootstrapAdminInput, bootstrapAdminSchema, ChangeMePasswordInput, changeMePasswordSchema, confirmEmailChangeSchema, deleteOwnAccountSchema (+18 more)

### Community 15 - "api-error.code.ts"
Cohesion: 0.14
Nodes (25): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError() (+17 more)

### Community 16 - "AppMetricsService"
Cohesion: 0.08
Nodes (17): HttpMetricsMiddleware, Injectable, ActiveStreamsTracker, Injectable, AppMetricsService, Inject, Injectable, MetricsController (+9 more)

### Community 17 - "company-context-form.tsx"
Cohesion: 0.12
Nodes (25): audienceProfileHeading(), benefitCountLabel(), caseStudyHeading(), commaToList(), CompanyContextForm(), CompanyContextFormProps, ctaItemHeading(), EXTRAS_SUB_TAB_LABELS (+17 more)

### Community 18 - "runs.types.ts"
Cohesion: 0.06
Nodes (74): filterFeedbackRunOptions(), ArchiveRunsQuery, fetchRunLogs(), fetchUserRuns(), isUserRating(), patchRunRating(), UserRunsPageQuery, HitlAccepted (+66 more)

### Community 19 - "GatewayKey"
Cohesion: 0.08
Nodes (24): ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+16 more)

### Community 20 - "completeness-provider.tsx"
Cohesion: 0.16
Nodes (19): fetchCompleteness(), CompletenessState, GATE_SECTION_LABELS, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE (+11 more)

### Community 21 - "run-result-editor.tsx"
Cohesion: 0.03
Nodes (73): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+65 more)

### Community 22 - "configuration.ts"
Cohesion: 0.06
Nodes (57): CliValidateOptions, normalizeGatewayConfigForWrite(), asPort(), asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig (+49 more)

### Community 23 - "prisma-guest-purge.adapter.ts"
Cohesion: 0.20
Nodes (8): GUEST_PURGE, GuestPurgeDeleteStats, LIVE_RUN_STATUSES, GuestPurgeModule, Module, PrismaGuestPurgeAdapter, Injectable, ref_prisma_client

### Community 24 - "api/src/app.module.ts"
Cohesion: 0.08
Nodes (30): AppModule, Module, CompanyContextModule, Module, ContentModule, Module, bootstrap(), MetricsModule (+22 more)

### Community 25 - "Env"
Cohesion: 0.05
Nodes (43): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Inject (+35 more)

### Community 26 - "ref_nestjs_config"
Cohesion: 0.11
Nodes (19): resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), SmartRateLimitGuard, Injectable (+11 more)

### Community 27 - "packages_shared_dist_index"
Cohesion: 0.04
Nodes (76): FEEDBACK_RUN_READER, FeedbackRunLookup, FeedbackRunReader, createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX (+68 more)

### Community 28 - "anthropic-response.mapper.ts"
Cohesion: 0.12
Nodes (26): SseDoneEvent, fromGatewayToolCallDto(), toGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto (+18 more)

### Community 29 - "ModelAlias"
Cohesion: 0.05
Nodes (26): ProviderTestOptions, CliAiModel, ClientId, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, healthStatusToGaugeValue() (+18 more)

### Community 30 - "accept-invite-form.tsx"
Cohesion: 0.04
Nodes (55): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+47 more)

### Community 31 - "guest-run-policy.service.ts"
Cohesion: 0.08
Nodes (23): GUEST_ARCHIVE_STATUSES, GUEST_TASK_TYPES, GuestRunAdmit, isGuestArchiveStatus(), isGuestTaskType(), ratingSchema, Inject, GUEST_QUOTA (+15 more)

### Community 32 - "cache.module.ts"
Cohesion: 0.09
Nodes (19): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+11 more)

### Community 33 - "resilient-executor.ts"
Cohesion: 0.16
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 34 - "invitation-repository.port.ts"
Cohesion: 0.16
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 35 - "types/index.ts"
Cohesion: 0.23
Nodes (19): CONVERSATION_ID_PATTERN, isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId(), isFiniteNumber(), isMaxAttempts(), isMaxConcurrentStreams() (+11 more)

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.16
Nodes (16): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+8 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "content.graph.ts"
Cohesion: 0.10
Nodes (38): withEffectiveAudience(), coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+30 more)

### Community 39 - "semantic-cache.service.ts"
Cohesion: 0.09
Nodes (23): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend (+15 more)

### Community 40 - "anthropic-models.controller.ts"
Cohesion: 0.12
Nodes (21): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 41 - "account-activation-repository.port.ts"
Cohesion: 0.13
Nodes (9): AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput, ActivationRow, PrismaAccountActivationAdapter, Injectable, UserRow (+1 more)

### Community 42 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (70): toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls() (+62 more)

### Community 43 - "ids.ts"
Cohesion: 0.08
Nodes (36): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createEmailChangeRequestId() (+28 more)

### Community 44 - "ref_nestjs_common"
Cohesion: 0.11
Nodes (21): createInProcessSingleflight(), ChatCachePipelineService, Injectable, ChatErrorHandlerService, Injectable, ChatProviderCallService, Injectable, ChatProviderCooldownService (+13 more)

### Community 45 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (23): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+15 more)

### Community 46 - "LoggingService"
Cohesion: 0.07
Nodes (17): RedisConnectionService, Injectable, Inject, Inject, isRedisRequiredFromConfig(), GlobalExceptionFilter, isPayloadTooLargeError(), Catch (+9 more)

### Community 47 - ".create"
Cohesion: 0.20
Nodes (9): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 48 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 49 - "social-pipeline.facade.ts"
Cohesion: 0.17
Nodes (12): SocialPipelineFacade, toOutcome(), Inject, Injectable, SocialRunExecutor, Inject, Injectable, SOCIAL_RESULT_STORE (+4 more)

### Community 50 - "CompanyContextController"
Cohesion: 0.15
Nodes (10): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller, Get, Patch (+2 more)

### Community 51 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 52 - "ref_nestjs_swagger"
Cohesion: 0.04
Nodes (67): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+59 more)

### Community 53 - "EmailChangeRequestRepository"
Cohesion: 0.12
Nodes (6): ConfirmEmailChangeUseCase, Inject, Injectable, Inject, Inject, EmailChangeRequestRepository

### Community 54 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.06
Nodes (34): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+26 more)

### Community 55 - "start-run.use-case.ts"
Cohesion: 0.16
Nodes (14): isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, newConversationId(), newRunId(), packages_shared_dist_index_contentlanguage, packages_shared_dist_index_contenttasktype (+6 more)

### Community 56 - "openai-models.controller.ts"
Cohesion: 0.07
Nodes (34): ChatModule, Module, AnthropicModule, Module, AnthropicMessagesController, ApiSecurity, ApiTags, Controller (+26 more)

### Community 57 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 58 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 59 - "metrics.ts"
Cohesion: 0.07
Nodes (45): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+37 more)

### Community 60 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+20 more)

### Community 61 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 62 - "PaginationQueryDto"
Cohesion: 0.11
Nodes (17): Delete, Get, Param, Query, ListRunsQueryDto, IsArray, IsIn, IsOptional (+9 more)

### Community 63 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 64 - "guest.guard.ts"
Cohesion: 0.17
Nodes (7): ALLOW_GUEST_KEY, IS_PUBLIC_KEY, GuestGuard, Inject, Injectable, JwtAuthGuard, Injectable

### Community 65 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 66 - "GatewayConfig"
Cohesion: 0.05
Nodes (41): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ClientManagerService, Injectable, ConfigPersistenceService, Injectable (+33 more)

### Community 67 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 68 - "envelope.ts"
Cohesion: 0.05
Nodes (70): apps_frontend_src_app_globals, geistMono, inter, metadata, spaceGrotesk, ACTIVATION_FAILED_HINT, activateAccount(), bootstrapAdmin() (+62 more)

### Community 69 - "cli.module.ts"
Cohesion: 0.06
Nodes (65): AgentReport, AgentReportStatus, PendingSecretsItem, loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers(), CliMode, CliModeFlags (+57 more)

### Community 70 - "registration-thank-you.tsx"
Cohesion: 0.15
Nodes (18): resendActivation(), initialState, RegistrationThankYou(), onResend(), RegistrationThankYouProps, RegistrationThankYouState, LANDING_CONTEXT_IMAGES, LANDING_COPY (+10 more)

### Community 71 - "domain/is-complete.ts"
Cohesion: 0.39
Nodes (8): assertCompanyContextWritable(), collectGateItemPaths(), isComplete(), isCompleteAudienceProfile(), isCompleteCtaItem(), isCompleteOfferItem(), nonEmpty(), sectionFilled

### Community 72 - "openai-stream.mapper.ts"
Cohesion: 0.17
Nodes (20): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional (+12 more)

### Community 73 - "InvitationsController"
Cohesion: 0.12
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 74 - "LogContext"
Cohesion: 0.06
Nodes (26): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+18 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "PrometheusService"
Cohesion: 0.06
Nodes (23): PrometheusService, Injectable, PrometheusMetrics, HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE (+15 more)

### Community 77 - "ChatParamsDto"
Cohesion: 0.17
Nodes (12): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+4 more)

### Community 78 - "start-run-form.tsx"
Cohesion: 0.07
Nodes (41): metadata, GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode (+33 more)

### Community 79 - "archive-runs-view.tsx"
Cohesion: 0.05
Nodes (51): ListRunsOutput, metadata, metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS (+43 more)

### Community 80 - "exitWithAgentReport"
Cohesion: 0.11
Nodes (15): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), toSafeClientList(), ConfigInitCommand, Command, Option, toSafeConfigSnapshot() (+7 more)

### Community 81 - "asClientId"
Cohesion: 0.08
Nodes (43): KeyGenerateCommand, Command, Option, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, CliAiModelSchema, CliAiProviderSchema (+35 more)

### Community 82 - "transactional-mailer.port.ts"
Cohesion: 0.11
Nodes (36): EmailChangeConfirmMail, TransactionalMail, UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments() (+28 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "company-context-view.tsx"
Cohesion: 0.20
Nodes (16): metadata, fetchCompanyContext(), putCompanyContext(), CompanyContext, companyContextForPut(), Completeness, extrasForPut(), nonEmpty() (+8 more)

### Community 85 - "domain/feedback.types.ts"
Cohesion: 0.24
Nodes (8): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_BODY_MAX, FEEDBACK_REPOSITORY, packages_shared_dist_index_feedback_agent_keys, packages_shared_dist_index_feedback_target_types, packages_shared_dist_index_feedbackid

### Community 86 - "CompanyContextRepository"
Cohesion: 0.14
Nodes (16): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+8 more)

### Community 87 - "company-context.controller.ts"
Cohesion: 0.22
Nodes (22): toCompanyContext(), toPartialCompanyContext(), AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto (+14 more)

### Community 88 - "ref_class_validator"
Cohesion: 0.18
Nodes (10): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, packages_shared_dist_index_run_platforms (+2 more)

### Community 89 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.12
Nodes (14): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto (+6 more)

### Community 90 - "prisma-output-edited.adapter.ts"
Cohesion: 0.24
Nodes (6): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable

### Community 91 - "lib/is-complete.ts"
Cohesion: 0.21
Nodes (14): AudienceProfile, CtaItem, GATE_SECTIONS, OfferItem, areAudienceProfileNamesUnique(), isDuplicateAudienceProfileName(), normalizeAudienceProfileName(), isCompleteAudienceProfile() (+6 more)

### Community 92 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 93 - "social.graph.ts"
Cohesion: 0.13
Nodes (34): renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine() (+26 more)

### Community 94 - "feedback.module.ts"
Cohesion: 0.31
Nodes (6): FEEDBACK_PURGE, FeedbackPurgePort, FeedbackModule, Module, PrismaFeedbackPurgeAdapter, Injectable

### Community 95 - "export-openapi.ts"
Cohesion: 0.12
Nodes (17): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+9 more)

### Community 96 - "CreateFeedbackUseCase"
Cohesion: 0.22
Nodes (7): CreateFeedbackUseCase, Inject, Injectable, FeedbackController, ApiCookieAuth, ApiTags, Controller

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 99 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 100 - "FeedbackRepository"
Cohesion: 0.28
Nodes (4): FeedbackEntry, FeedbackRepository, PrismaFeedbackAdapter, Injectable

### Community 101 - "src/index.ts"
Cohesion: 0.25
Nodes (5): unbrand, RunTaskType, RunsSummaryResponse, parseTtlMs(), parseTtlSeconds()

### Community 103 - "runs.controller.ts"
Cohesion: 0.05
Nodes (43): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase (+35 more)

### Community 104 - "PrismaEmailChangeRequestAdapter"
Cohesion: 0.24
Nodes (6): EmailChangeRequestRecord, UpsertEmailChangeRequestInput, isUniqueConstraintViolation(), PrismaEmailChangeRequestAdapter, toRecord(), Injectable

### Community 105 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 106 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 107 - "AuthController"
Cohesion: 0.17
Nodes (16): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+8 more)

### Community 108 - "get-runs-summary.use-case.ts"
Cohesion: 0.19
Nodes (9): CacheEntry, cacheKey(), GetRunsSummaryUseCase, RUNS_SUMMARY_CACHE_TTL_MS, RUNS_SUMMARY_WINDOW_MS, scopeFor(), successRate(), Inject (+1 more)

### Community 109 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 110 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 111 - "GuestRunPolicyService"
Cohesion: 0.25
Nodes (5): Inject, GuestRunPolicyService, Inject, Injectable, Inject

### Community 112 - "src/pagination.ts"
Cohesion: 0.29
Nodes (5): DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, PageSize, PaginatedList

### Community 113 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 114 - "AnthropicMessageDto"
Cohesion: 0.29
Nodes (7): AnthropicMessageDto, ApiProperty, ArrayMinSize, IsArray, IsIn, Type, ValidateNested

### Community 115 - "CompanyContext"
Cohesion: 0.19
Nodes (7): assertAudienceProfileNamesUnique(), CompanyContext, normalizeAudienceName(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 116 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 117 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 118 - "swagger.setup.ts"
Cohesion: 0.05
Nodes (51): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+43 more)

### Community 119 - "SaveOutputEditedUseCase"
Cohesion: 0.43
Nodes (5): assertSameIds(), SaveOutputEditedUseCase, Injectable, validationFailed(), withCharacterCount()

### Community 120 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 121 - "ResponseFormatDto"
Cohesion: 0.29
Nodes (6): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional

### Community 122 - "auth.module.ts"
Cohesion: 0.04
Nodes (57): BootstrapStatusUseCase, Injectable, DeleteOwnAccountUseCase, Inject, Injectable, DeleteUserResult, DeleteUserUseCase, Injectable (+49 more)

### Community 123 - "RunSseNotifyListener"
Cohesion: 0.33
Nodes (3): RunSseNotifyListener, Inject, Injectable

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "roles.guard.ts"
Cohesion: 0.33
Nodes (3): ROLES_KEY, RolesGuard, Injectable

### Community 126 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (32): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+24 more)

### Community 127 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 128 - "ConfigValidateCommand"
Cohesion: 0.40
Nodes (3): ConfigValidateCommand, Command, Option

### Community 129 - "LoginDto"
Cohesion: 0.33
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 130 - "RegisterUserDto"
Cohesion: 0.33
Nodes (5): RegisterUserDto, ApiProperty, IsEmail, IsString, MinLength

### Community 131 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 144 - "llm-hop.ts"
Cohesion: 0.06
Nodes (40): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+32 more)

### Community 145 - "LocalRunSseHub"
Cohesion: 0.29
Nodes (3): LocalRunSseHub, Inject, Injectable

### Community 146 - "load-company-context-fixture.ts"
Cohesion: 0.09
Nodes (21): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, PutCompanyContextUseCase, Inject, Injectable (+13 more)

### Community 148 - "RunDispatchShutdown"
Cohesion: 0.40
Nodes (3): RunDispatchShutdown, Inject, Injectable

## Knowledge Gaps
- **514 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+509 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1326 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `isRunId()` connect `ids.ts` to `run.schemas.ts`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `Env` connect `Env` to `social.types.ts`, `register-user.use-case.ts`, `auth.schemas.ts`, `llm-hop.ts`, `LocalRunSseHub`, `load-company-context-fixture.ts`, `api/src/app.module.ts`, `packages_shared_dist_index`, `guest-run-policy.service.ts`, `EmailChangeRequestRepository`, `start-run.use-case.ts`, `api/src/health/health.service.ts`, `guest.guard.ts`, `transactional-mailer.port.ts`, `prisma-output-edited.adapter.ts`, `runs.controller.ts`, `GuestRunPolicyService`, `PublicConfigController`, `auth.module.ts`, `RunSseNotifyListener`, `save-output-edited.use-case.ts`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `branded.types.ts`, `GatewayConfig`, `types/index.ts`, `cli.module.ts`, `asProviderInstanceId`, `LogContext`, `models.controller.ts`, `ref_nestjs_common`, `config-generator.service.ts`, `exitWithAgentReport`, `asClientId`, `GatewayKey`, `configuration.ts`, `metrics.ts`, `sentry-ai-metrics.adapter.ts`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _514 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `branded.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07515605493133583 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05112347969490827 - nodes in this community are weakly interconnected._
- **Should `api/company-context.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1168091168091168 - nodes in this community are weakly interconnected._
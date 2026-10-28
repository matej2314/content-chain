# Graph Report - content-chain  (2026-10-28)

## Corpus Check
- 730 files · ~282,329 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 4817 nodes · 15649 edges · 134 communities (122 shown, 10 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 421 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `aacc644d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DomainException
- get-run.use-case.ts
- company-context-form.tsx
- asProviderInstanceId
- provider-manager.service.ts
- ChatRequestDto
- CurrentUser
- logging.module.ts
- ref_nestjs_common
- anthropic/anthropic-tools.mapper.ts
- envelope.ts
- PrometheusAppMetricsAdapter
- feedback-form.tsx
- prisma-run.adapter.ts
- dashboard-shell.tsx
- api-error.code.ts
- provider-registry.service.ts
- branded.types.ts
- cli.module.ts
- cancel-run-dialog.tsx
- model-manager.service.ts
- LoggingService
- configuration.ts
- prisma-user.adapter.ts
- provider-instances.bootstrap.ts
- cn
- semantic-cache.constants.ts
- types/index.ts
- PrismaService
- should-include-redis-stack.ts
- packages_shared_dist_index_userid
- ai-provider-gateway/src/health/health.service.ts
- company-context.controller.ts
- users-view.tsx
- AnthropicMessagesRequestDto
- ChatWarningDto
- domain/company-context.types.ts
- enums.ts
- run-result-view.tsx
- redis-vector-store.adapter.ts
- sentry-ai-metrics.adapter.ts
- openai-params-provider.mapper.ts
- app-metrics.service.ts
- ids.ts
- .constructor
- semantic-cache.service.ts
- save-output-edited.use-case.ts
- AppMetricsService
- swagger.setup.ts
- anthropic-response.mapper.ts
- runs.types.ts
- ChatParamsDto
- anthropic-messages.controller.ts
- ChatMessageDto
- content.graph.ts
- exitWithAgentReport
- ai-provider-gateway/src/app.module.ts
- start-run-form.tsx
- api/src/health/health.service.ts
- llm-gateway.http.adapter.ts
- invitations.controller.ts
- OpenAiChatCompletionRequestDto
- HealthService
- openai-stream.mapper.ts
- .getOne
- ClientEditCommand
- Env
- responses.adapter.ts
- ref_nestjs_swagger
- auth.module.ts
- ClientAddCommand
- google-tools.mapper.ts
- home-entry.tsx
- api/src/app.module.ts
- RefreshSessionRepository
- parse-verifier-log-message.ts
- api/src/main.ts
- GatewayKey
- archive-runs-view.tsx
- company-context.mapper.ts
- PrometheusService
- .execute
- transactional-mailer.port.ts
- SPEC — README
- InProcessRunWorker
- ChatService
- ai-provider-gateway/src/health/health.controller.ts
- company-context.dto.ts
- ProviderEditCommand
- anthropic-models.controller.ts
- CompanyContext
- ModelAlias
- GatewayConfig
- social.graph.ts
- health.api.ts
- ConfigInitCommand
- ProviderAddCommand
- route.ts
- feedback.schemas.ts
- ClientRemoveCommand
- start-run.dto.ts
- ModelAddCommand
- models.controller.ts
- ProviderRemoveCommand
- openai-models.controller.ts
- guest.guard.ts
- ChatToolingDto
- GuestGuard
- response-cache.service.ts
- InMemoryRunSseHub
- AnthropicContentBlockDto
- src/pagination.ts
- assert-company-context-writable.ts
- ModelRemoveCommand
- list-runs-query.dto.ts
- ModelEditCommand
- auth.controller.ts
- http/http-exception.filter.ts
- Architektura
- brand.ts
- RedisConnectionService
- filters/http-exception.filter.ts
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
6. `isRecord()` - 67 edges
7. `GatewayConfig` - 65 edges
8. `cn()` - 65 edges
9. `AuthUserContext` - 62 edges
10. `Env` - 61 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (134 total, 10 thin omitted)

### Community 0 - "DomainException"
Cohesion: 0.09
Nodes (34): ActivateAccountOutput, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), ActivateAccountInput (+26 more)

### Community 1 - "get-run.use-case.ts"
Cohesion: 0.05
Nodes (40): ContentPipelineInput, ContentRefineSnapshot, PageDocument, PageOutlineSection, PageOutlineSectionRole, CompositeRunResultReader, GetRunGuestAccess, GetRunOutput (+32 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.04
Nodes (91): metadata, fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+83 more)

### Community 3 - "asProviderInstanceId"
Cohesion: 0.05
Nodes (60): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), KeyGenerateCommand, Command, Option (+52 more)

### Community 4 - "provider-manager.service.ts"
Cohesion: 0.12
Nodes (24): PendingSecretsItem, collectPendingSecrets(), ProviderPromptResult, ProviderManagerService, Injectable, AddProviderInput, EditProviderInput, validateProviderApiKey() (+16 more)

### Community 5 - "ChatRequestDto"
Cohesion: 0.07
Nodes (43): ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsObject, IsOptional (+35 more)

### Community 6 - "CurrentUser"
Cohesion: 0.09
Nodes (29): FeedbackController, ApiCookieAuth, ApiTags, Body, Controller, HttpCode, Post, HitlDto (+21 more)

### Community 7 - "logging.module.ts"
Cohesion: 0.07
Nodes (23): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, SentryErrorReportingAdapter, Injectable (+15 more)

### Community 8 - "ref_nestjs_common"
Cohesion: 0.03
Nodes (106): CreateFeedbackUseCase, Inject, Injectable, FEEDBACK_PURGE, FeedbackPurgePort, FEEDBACK_RUN_READER, FeedbackRunLookup, FeedbackRunReader (+98 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (44): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS (+36 more)

### Community 10 - "envelope.ts"
Cohesion: 0.07
Nodes (50): ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite(), activateAccount(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+42 more)

### Community 11 - "PrometheusAppMetricsAdapter"
Cohesion: 0.13
Nodes (5): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppTokenUsage

### Community 12 - "feedback-form.tsx"
Cohesion: 0.13
Nodes (23): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+15 more)

### Community 13 - "prisma-run.adapter.ts"
Cohesion: 0.04
Nodes (41): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+33 more)

### Community 14 - "dashboard-shell.tsx"
Cohesion: 0.07
Nodes (30): fetchAppConfig(), AppConfig, parseAppConfig(), DemoChip(), DemoModeContext, DemoModeContextValue, DemoModeProvider(), DemoModeState (+22 more)

### Community 15 - "api-error.code.ts"
Cohesion: 0.16
Nodes (21): ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError() (+13 more)

### Community 16 - "provider-registry.service.ts"
Cohesion: 0.07
Nodes (35): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+27 more)

### Community 17 - "branded.types.ts"
Cohesion: 0.08
Nodes (57): SemanticStoreEmbedState, CachedChatResponse, CachedChatWarning, CachedFinishReason, CacheIdentityMessage, ChatCacheSource, CachedChatResponseWithConversation, ChatResponseData (+49 more)

### Community 18 - "cli.module.ts"
Cohesion: 0.06
Nodes (66): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), resolveCliMode() (+58 more)

### Community 19 - "cancel-run-dialog.tsx"
Cohesion: 0.07
Nodes (44): logoutSession(), AuthModal(), AuthModalProps, descriptionFor(), titleFor(), GuestLimitModal(), GuestLimitModalProps, GUEST_ALLOWED_TASK_TYPES (+36 more)

### Community 20 - "model-manager.service.ts"
Cohesion: 0.08
Nodes (37): isRedisRequired(), DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField (+29 more)

### Community 21 - "LoggingService"
Cohesion: 0.08
Nodes (16): Inject, Inject, StreamCacheReplayService, Injectable, isProviderRateLimitError(), Inject, Optional, PinoLoggerAdapter (+8 more)

### Community 22 - "configuration.ts"
Cohesion: 0.06
Nodes (53): CliValidateOptions, normalizeGatewayConfigForWrite(), ValidationFormatter, asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig (+45 more)

### Community 23 - "prisma-user.adapter.ts"
Cohesion: 0.08
Nodes (22): ACCOUNT_ACTIVATION_REPOSITORY, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult (+14 more)

### Community 24 - "provider-instances.bootstrap.ts"
Cohesion: 0.13
Nodes (14): ProviderTestCommand, Command, Option, ProviderTestService, Injectable, ProviderApiKey, adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance() (+6 more)

### Community 25 - "cn"
Cohesion: 0.04
Nodes (72): ACCEPT_INVITE_DEMO_HINT, AcceptInviteFormProps, AcceptInviteFormState, initialState, SessionState, PAGE_OUTLINE_SECTION_ROLES, PageOutlineSectionRole, ReelDurationSeconds (+64 more)

### Community 26 - "semantic-cache.constants.ts"
Cohesion: 0.12
Nodes (13): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+5 more)

### Community 27 - "types/index.ts"
Cohesion: 0.14
Nodes (23): CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId(), isFiniteNumber(), isMaxAttempts() (+15 more)

### Community 28 - "PrismaService"
Cohesion: 0.06
Nodes (20): PrismaFeedbackRunReaderAdapter, Injectable, Inject, GUEST_PURGE, GuestPurgeDeleteStats, GuestPurgePort, LIVE_RUN_STATUSES, OutputEditedWrite (+12 more)

### Community 29 - "should-include-redis-stack.ts"
Cohesion: 0.10
Nodes (22): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+14 more)

### Community 30 - "packages_shared_dist_index_userid"
Cohesion: 0.09
Nodes (35): AcceptInviteResult, acceptInviteSchema, formatMailValidityLabel(), polishPlural(), InviteUserResult, inviteUserSchema, InvitationListItem, isUniqueConstraintViolation() (+27 more)

### Community 31 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.09
Nodes (18): HealthModule, Module, HealthCheckResult, HealthRedisCheckResult, AppMetricsModule, Global, Module, APP_METRICS_BACKEND (+10 more)

### Community 32 - "company-context.controller.ts"
Cohesion: 0.14
Nodes (18): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+10 more)

### Community 33 - "users-view.tsx"
Cohesion: 0.08
Nodes (46): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+38 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 35 - "ChatWarningDto"
Cohesion: 0.24
Nodes (9): ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDonePayloadDto, SseDoneUsageDto, ApiPropertyOptional (+1 more)

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.17
Nodes (19): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CtaItem (+11 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "run-result-view.tsx"
Cohesion: 0.04
Nodes (57): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+49 more)

### Community 39 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (35): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+27 more)

### Community 41 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 42 - "app-metrics.service.ts"
Cohesion: 0.18
Nodes (13): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus (+5 more)

### Community 43 - "ids.ts"
Cohesion: 0.09
Nodes (32): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createFeedbackId() (+24 more)

### Community 44 - ".constructor"
Cohesion: 0.09
Nodes (16): AcceptInviteUseCase, Inject, Injectable, ActivateAccountUseCase, Inject, Injectable, RefreshUseCase, Inject (+8 more)

### Community 45 - "semantic-cache.service.ts"
Cohesion: 0.10
Nodes (21): computeSystemSignature(), hashCallParams(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, isSingleTurnUserRequest() (+13 more)

### Community 46 - "save-output-edited.use-case.ts"
Cohesion: 0.07
Nodes (38): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+30 more)

### Community 47 - "AppMetricsService"
Cohesion: 0.09
Nodes (7): HttpMetricsMiddleware, Injectable, ActiveStreamsTracker, Injectable, AppMetricsService, Inject, Injectable

### Community 48 - "swagger.setup.ts"
Cohesion: 0.07
Nodes (31): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional (+23 more)

### Community 49 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 50 - "runs.types.ts"
Cohesion: 0.05
Nodes (88): filterFeedbackRunOptions(), ArchiveRunsQuery, fetchRunsSummary(), fetchUserRuns(), isUserRating(), patchRunRating(), HitlAccepted, isPageOutlineSectionRole() (+80 more)

### Community 51 - "ChatParamsDto"
Cohesion: 0.12
Nodes (16): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+8 more)

### Community 52 - "anthropic-messages.controller.ts"
Cohesion: 0.06
Nodes (41): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+33 more)

### Community 53 - "ChatMessageDto"
Cohesion: 0.11
Nodes (23): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+15 more)

### Community 54 - "content.graph.ts"
Cohesion: 0.06
Nodes (53): ContentPipelineFacade, toOutcome(), Inject, Injectable, Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput (+45 more)

### Community 55 - "exitWithAgentReport"
Cohesion: 0.10
Nodes (16): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), WizardState (+8 more)

### Community 56 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.06
Nodes (29): ChatModule, Module, ChatErrorHandlerService, Injectable, ChatProviderCooldownService, Injectable, StreamCleanupInterceptor, Injectable (+21 more)

### Community 57 - "start-run-form.tsx"
Cohesion: 0.10
Nodes (31): metadata, AcceptInvitePage(), metadata, tokenFromSearchParam(), fetchCompanyContext(), isGuestAllowedTaskType(), isGuestQuotaCode(), fetchRunSnapshot() (+23 more)

### Community 58 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 59 - "llm-gateway.http.adapter.ts"
Cohesion: 0.05
Nodes (43): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+35 more)

### Community 60 - "invitations.controller.ts"
Cohesion: 0.07
Nodes (27): InviteUserUseCase, Inject, Injectable, ListInvitationsUseCase, Inject, Injectable, ResendInvitationUseCase, Inject (+19 more)

### Community 61 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.08
Nodes (27): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+19 more)

### Community 62 - "HealthService"
Cohesion: 0.13
Nodes (10): HealthReadinessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get (+2 more)

### Community 63 - "openai-stream.mapper.ts"
Cohesion: 0.16
Nodes (21): fromGatewayToolCallDto(), toGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto (+13 more)

### Community 64 - ".getOne"
Cohesion: 0.17
Nodes (12): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+4 more)

### Community 65 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 66 - "Env"
Cohesion: 0.05
Nodes (37): isRecord(), JwtCookieStrategy, Inject, Injectable, PublicConfigController, PublicConfigResponse, ApiOkResponse, ApiOperation (+29 more)

### Community 67 - "responses.adapter.ts"
Cohesion: 0.10
Nodes (42): toHttpException(), asSystemFingerprint(), asToolCallId(), ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionsAdapterOptions, createChatCompletionsAdapter() (+34 more)

### Community 68 - "ref_nestjs_swagger"
Cohesion: 0.16
Nodes (8): IsStringOrArrayOfStrings(), IsThinkingBudget(), isTextContentItem(), normalizeOpenAiContent(), TextContentItem, ref_class_transformer, ref_class_validator, ref_nestjs_swagger

### Community 69 - "auth.module.ts"
Cohesion: 0.04
Nodes (47): resendActivationSchema, BootstrapStatusUseCase, Inject, Injectable, DeleteUserResult, DeleteUserUseCase, Inject, Injectable (+39 more)

### Community 70 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 71 - "google-tools.mapper.ts"
Cohesion: 0.10
Nodes (32): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool, buildGenerationConfig(), createGoogleProvider() (+24 more)

### Community 72 - "home-entry.tsx"
Cohesion: 0.11
Nodes (19): ACTIVATION_FAILED_HINT, AuthMode, AuthUi, GuestSurface, HomeEntry(), initialAuth, LANDING_CONTEXT_IMAGES, LANDING_COPY (+11 more)

### Community 73 - "api/src/app.module.ts"
Cohesion: 0.05
Nodes (62): AuthModule, Module, CompanyContextModule, Module, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Injectable (+54 more)

### Community 74 - "RefreshSessionRepository"
Cohesion: 0.11
Nodes (8): Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "api/src/main.ts"
Cohesion: 0.17
Nodes (12): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), ACCESS_COOKIE_NAME, buildSwaggerConfig(), COOKIE_AUTH_NAME (+4 more)

### Community 77 - "GatewayKey"
Cohesion: 0.11
Nodes (24): readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), ClientId, GatewayKey, Express, Request, ResolvedGatewayClient (+16 more)

### Community 78 - "archive-runs-view.tsx"
Cohesion: 0.04
Nodes (74): metadata, metadata, apps_frontend_src_app_globals, geistMono, inter, metadata, spaceGrotesk, fetchUserSession() (+66 more)

### Community 79 - "company-context.mapper.ts"
Cohesion: 0.10
Nodes (17): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, CompanyContextController (+9 more)

### Community 80 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 81 - ".execute"
Cohesion: 0.20
Nodes (10): isGuestTaskType(), isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot (+2 more)

### Community 82 - "transactional-mailer.port.ts"
Cohesion: 0.11
Nodes (34): TransactionalMail, TransactionalMailer, UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments() (+26 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "InProcessRunWorker"
Cohesion: 0.15
Nodes (4): InProcessRunWorker, Injectable, RunAbortRegistry, Injectable

### Community 85 - "ChatService"
Cohesion: 0.07
Nodes (25): ChatService, Injectable, ChatStreamController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity (+17 more)

### Community 86 - "ai-provider-gateway/src/health/health.controller.ts"
Cohesion: 0.22
Nodes (10): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto (+2 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 89 - "anthropic-models.controller.ts"
Cohesion: 0.30
Nodes (9): AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic(), mapGatewayModelToAnthropic() (+1 more)

### Community 90 - "CompanyContext"
Cohesion: 0.23
Nodes (6): CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 91 - "ModelAlias"
Cohesion: 0.06
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 92 - "GatewayConfig"
Cohesion: 0.11
Nodes (23): CliAiProvider, CliRateLimit, GatewayClient, ClientManagerService, Injectable, ConfigPersistenceService, Injectable, EnvPatchService (+15 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.10
Nodes (42): withEffectiveAudience(), createLoadContextNode(), loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema (+34 more)

### Community 94 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 95 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 96 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "feedback.schemas.ts"
Cohesion: 0.17
Nodes (11): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_BODY_MAX, CreateFeedbackDto, IsIn, IsOptional, IsString (+3 more)

### Community 99 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 100 - "start-run.dto.ts"
Cohesion: 0.16
Nodes (14): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+6 more)

### Community 101 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 102 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 103 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 104 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 105 - "guest.guard.ts"
Cohesion: 0.27
Nodes (5): ALLOW_GUEST_KEY, IS_PUBLIC_KEY, JwtAuthGuard, Injectable, ref_nestjs_core

### Community 106 - "ChatToolingDto"
Cohesion: 0.15
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 107 - "GuestGuard"
Cohesion: 0.40
Nodes (3): GuestGuard, Inject, Injectable

### Community 109 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (19): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, serializeCallParamsForCache(), CacheModule (+11 more)

### Community 110 - "InMemoryRunSseHub"
Cohesion: 0.39
Nodes (3): RunSseEvent, InMemoryRunSseHub, Injectable

### Community 111 - "AnthropicContentBlockDto"
Cohesion: 0.14
Nodes (14): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+6 more)

### Community 112 - "src/pagination.ts"
Cohesion: 0.29
Nodes (5): DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, PageSize, PaginatedList

### Community 113 - "assert-company-context-writable.ts"
Cohesion: 0.48
Nodes (4): assertAudienceProfileNamesUnique(), assertCompanyContextWritable(), CompanyContextWriteDetail, normalizeAudienceName()

### Community 114 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 115 - "list-runs-query.dto.ts"
Cohesion: 0.12
Nodes (15): ListRunsQueryDto, IsArray, IsIn, IsOptional, IsString, Transform, PaginationQueryDto, IsIn (+7 more)

### Community 117 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 120 - "auth.controller.ts"
Cohesion: 0.06
Nodes (43): LogoutUseCase, Injectable, AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get (+35 more)

### Community 121 - "http/http-exception.filter.ts"
Cohesion: 0.18
Nodes (7): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable, packages_shared_dist_index_requestid

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand.ts"
Cohesion: 0.33
Nodes (3): unbrand, RunTaskType, RunsSummaryResponse

### Community 126 - "RedisConnectionService"
Cohesion: 0.18
Nodes (6): RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig(), ref_ioredis

### Community 127 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

## Knowledge Gaps
- **492 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+487 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1298 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `isRunId()` connect `ids.ts` to `prisma-run.adapter.ts`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `AppMetricsBackend` connect `ModelAlias` to `app-metrics.service.ts`, `PrometheusAppMetricsAdapter`, `AppMetricsService`, `ai-provider-gateway/src/health/health.service.ts`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `ChatMessageDto` connect `ChatMessageDto` to `swagger.setup.ts`, `ChatRequestDto`, `google-tools.mapper.ts`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _492 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DomainException` be split into smaller, more focused modules?**
  _Cohesion score 0.09016393442622951 - nodes in this community are weakly interconnected._
- **Should `get-run.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05025568682771998 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.041367806505421184 - nodes in this community are weakly interconnected._
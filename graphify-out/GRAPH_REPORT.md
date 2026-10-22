# Graph Report - content-chain  (2026-10-22)

## Corpus Check
- 726 files · ~279,185 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 4795 nodes · 15582 edges · 142 communities (126 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 421 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4c09c015`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- auth.module.ts
- social.types.ts
- company-context-form.tsx
- asClientId
- asProviderInstanceId
- chat.service.ts
- save-output-edited.use-case.ts
- logging.service.ts
- packages_shared_dist_index
- anthropic/anthropic-tools.mapper.ts
- apiFetch
- openai-chat-completions.controller.ts
- notify-product.tsx
- prisma-run.adapter.ts
- cn
- api-error.code.ts
- branded.types.ts
- ai-provider.interface.ts
- cli.module.ts
- dashboard-shell.tsx
- model-manager.service.ts
- LoggingService
- configuration.ts
- UserRepository
- provider-instances.bootstrap.ts
- feedback-form.tsx
- semantic-cache.service.ts
- types/index.ts
- PrismaService
- EnvironmentVariables
- prisma-invitation.adapter.ts
- start-run.use-case.ts
- company-context.controller.ts
- chat-provider-call.service.ts
- AnthropicMessagesRequestDto
- ref_nestjs_common
- domain/company-context.types.ts
- enums.ts
- run-result-editor.tsx
- redis-vector-store.adapter.ts
- sentry-ai-metrics.adapter.ts
- openai-params-provider.mapper.ts
- ai-provider-gateway/src/health/health.service.ts
- ids.ts
- packages_shared_dist_index_userid
- ChatCacheIdentity
- output-edited-result.schemas.ts
- AppMetricsService
- swagger.setup.ts
- anthropic-messages.controller.ts
- runs.types.ts
- health.api.ts
- chat.module.ts
- ChatMessageDto
- content.graph.ts
- exitWithAgentReport
- ai-provider-gateway/src/app.module.ts
- start-run-form.tsx
- HealthService
- llm-gateway.http.adapter.ts
- users-view.tsx
- OpenAiChatCompletionRequestDto
- HealthService
- app-metrics.service.ts
- anthropic-models.controller.ts
- ClientEditCommand
- http-metrics.interceptor.ts
- responses.adapter.ts
- ref_class_validator
- InvitationsController
- ClientAddCommand
- health-readiness-response.dto.ts
- landing-view.tsx
- api/src/app.module.ts
- InMemoryRunSseHub
- parse-verifier-log-message.ts
- ApiRequestIdHeader
- api/src/health/health.service.ts
- archive-runs-view.tsx
- company-context.schemas.ts
- PrometheusService
- assert-company-context-writable.ts
- user-invited.template.ts
- SPEC — README
- PrometheusAppMetricsAdapter
- UsersController
- accept-invite-form.tsx
- company-context.dto.ts
- ProviderEditCommand
- AppMetricsBackend
- CompanyContextController
- ModelAlias
- GatewayConfig
- social.graph.ts
- CompanyContextRepository
- ConfigInitCommand
- ProviderAddCommand
- route.ts
- config-generator.service.ts
- ClientRemoveCommand
- start-run.dto.ts
- ModelAddCommand
- ref_nestjs_swagger
- ProviderRemoveCommand
- openai-models.controller.ts
- JwtAuthGuard
- chat-tooling.dto.ts
- WizardState
- RegisterUserDto
- response-cache.service.ts
- LoginDto
- llm-hop.ts
- ProviderApiKey
- OpenAiChatMessageDto
- ModelRemoveCommand
- ListRunsQueryDto
- asGatewayKey
- ModelEditCommand
- api/src/main.ts
- app-metrics-backend.interface.ts
- AuthController
- HttpExceptionFilter
- BootstrapAdminDto
- PublicConfigController
- Architektura
- brand.ts
- ListUsersUseCase
- ActiveStreamsTracker
- PatchUserDto
- GuestGuard
- RolesGuard
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
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (142 total, 15 thin omitted)

### Community 0 - "auth.module.ts"
Cohesion: 0.04
Nodes (116): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Inject (+108 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (27): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore (+19 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.04
Nodes (88): metadata, fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+80 more)

### Community 3 - "asClientId"
Cohesion: 0.14
Nodes (32): CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient(), convertRateLimit(), GatewayClientSchema, parseWizardState(), WizardStateSchema (+24 more)

### Community 4 - "asProviderInstanceId"
Cohesion: 0.09
Nodes (46): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, PendingSecretsItem, assertInteractiveAllowed(), collectPendingSecrets(), DEFAULT_MODELS (+38 more)

### Community 5 - "chat.service.ts"
Cohesion: 0.05
Nodes (60): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+52 more)

### Community 6 - "save-output-edited.use-case.ts"
Cohesion: 0.17
Nodes (14): assertSameIds(), EMPTY_VERDICT, SaveOutputEditedUseCase, Inject, Injectable, validationFailed(), withCharacterCount(), assertRunReviewable() (+6 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.07
Nodes (23): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+15 more)

### Community 8 - "packages_shared_dist_index"
Cohesion: 0.04
Nodes (52): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, Inject, GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable (+44 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (40): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+32 more)

### Community 10 - "apiFetch"
Cohesion: 0.04
Nodes (79): apps_frontend_src_app_globals, geistMono, inter, metadata, spaceGrotesk, ACTIVATION_FAILED_HINT, activateAccount(), bootstrapAdmin() (+71 more)

### Community 11 - "openai-chat-completions.controller.ts"
Cohesion: 0.09
Nodes (34): fromGatewayToolCallDto(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiChatCompletionChoiceDto (+26 more)

### Community 12 - "notify-product.tsx"
Cohesion: 0.20
Nodes (15): assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+7 more)

### Community 13 - "prisma-run.adapter.ts"
Cohesion: 0.05
Nodes (39): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+31 more)

### Community 14 - "cn"
Cohesion: 0.06
Nodes (59): logoutSession(), AccountEmailFormState, GuestLimitModalProps, CancelRunDialogProps, FALLBACK, AppHeaderProps, LogoutDialog(), confirm() (+51 more)

### Community 15 - "api-error.code.ts"
Cohesion: 0.11
Nodes (32): ChatErrorHandlerService, Injectable, ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError() (+24 more)

### Community 16 - "branded.types.ts"
Cohesion: 0.14
Nodes (20): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+12 more)

### Community 17 - "ai-provider.interface.ts"
Cohesion: 0.09
Nodes (45): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, ChatWarningDto, ApiProperty, ApiPropertyOptional (+37 more)

### Community 18 - "cli.module.ts"
Cohesion: 0.07
Nodes (64): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), resolveCliMode() (+56 more)

### Community 19 - "dashboard-shell.tsx"
Cohesion: 0.08
Nodes (24): FeedbackCta(), GatewayAliveProvider(), FloatingRunsBox(), handleChevronClick(), toggleCollapsed(), AppHeader(), AppSidebar(), AppSidebarProps (+16 more)

### Community 20 - "model-manager.service.ts"
Cohesion: 0.12
Nodes (25): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable (+17 more)

### Community 21 - "LoggingService"
Cohesion: 0.07
Nodes (18): RedisConnectionService, Injectable, CacheRegistryService, Injectable, Inject, SemanticCacheService, Inject, Injectable (+10 more)

### Community 22 - "configuration.ts"
Cohesion: 0.06
Nodes (52): CliValidateOptions, asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, collectInactiveProviderWarnings() (+44 more)

### Community 23 - "UserRepository"
Cohesion: 0.04
Nodes (28): Inject, Inject, Inject, Inject, Inject, Inject, Inject, AccountActivationRecord (+20 more)

### Community 24 - "provider-instances.bootstrap.ts"
Cohesion: 0.14
Nodes (15): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, FACTORIES (+7 more)

### Community 25 - "feedback-form.tsx"
Cohesion: 0.13
Nodes (24): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+16 more)

### Community 26 - "semantic-cache.service.ts"
Cohesion: 0.08
Nodes (21): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema() (+13 more)

### Community 27 - "types/index.ts"
Cohesion: 0.19
Nodes (21): CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId(), isFiniteNumber(), isMaxAttempts() (+13 more)

### Community 28 - "PrismaService"
Cohesion: 0.04
Nodes (46): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+38 more)

### Community 29 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 30 - "prisma-invitation.adapter.ts"
Cohesion: 0.16
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 31 - "start-run.use-case.ts"
Cohesion: 0.14
Nodes (18): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, StartRunUseCase, Injectable, makeContentRun() (+10 more)

### Community 32 - "company-context.controller.ts"
Cohesion: 0.22
Nodes (14): toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase (+6 more)

### Community 33 - "chat-provider-call.service.ts"
Cohesion: 0.10
Nodes (29): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns() (+21 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 35 - "ref_nestjs_common"
Cohesion: 0.04
Nodes (63): JwtPayload, PublicConfigResponse, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Injectable, GetRunUseCase (+55 more)

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.14
Nodes (23): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+15 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "run-result-editor.tsx"
Cohesion: 0.04
Nodes (70): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+62 more)

### Community 39 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (21): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+13 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (29): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+21 more)

### Community 41 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 42 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.11
Nodes (22): isRedisRequiredFromConfig(), resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), SmartRateLimitGuard (+14 more)

### Community 43 - "ids.ts"
Cohesion: 0.09
Nodes (32): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createFeedbackId() (+24 more)

### Community 44 - "packages_shared_dist_index_userid"
Cohesion: 0.04
Nodes (42): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, FEEDBACK_PURGE, FeedbackPurgePort, PrismaFeedbackPurgeAdapter, Injectable (+34 more)

### Community 45 - "ChatCacheIdentity"
Cohesion: 0.17
Nodes (11): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), ChatCacheIdentity (+3 more)

### Community 46 - "output-edited-result.schemas.ts"
Cohesion: 0.07
Nodes (30): contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema, ideasArraySchema (+22 more)

### Community 47 - "AppMetricsService"
Cohesion: 0.14
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable, HttpMethod

### Community 48 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (25): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+17 more)

### Community 49 - "anthropic-messages.controller.ts"
Cohesion: 0.08
Nodes (36): GATEWAY_CACHE_HEADER, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDoneEvent (+28 more)

### Community 50 - "runs.types.ts"
Cohesion: 0.06
Nodes (71): ArchiveRunsQuery, fetchRunsSummary(), fetchUserRuns(), InitiatorOption, isUserRating(), patchRunRating(), HitlAccepted, isPageOutlineSectionRole() (+63 more)

### Community 51 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 52 - "chat.module.ts"
Cohesion: 0.04
Nodes (53): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+45 more)

### Community 53 - "ChatMessageDto"
Cohesion: 0.10
Nodes (22): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+14 more)

### Community 54 - "content.graph.ts"
Cohesion: 0.06
Nodes (55): ContentPipelineFacade, toOutcome(), Inject, Injectable, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema (+47 more)

### Community 55 - "exitWithAgentReport"
Cohesion: 0.11
Nodes (12): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ConfigGeneratorService (+4 more)

### Community 56 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.05
Nodes (41): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+33 more)

### Community 57 - "start-run-form.tsx"
Cohesion: 0.08
Nodes (40): metadata, fetchCompanyContext(), GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact (+32 more)

### Community 58 - "HealthService"
Cohesion: 0.14
Nodes (13): GatewayLivenessProbe, Inject, Injectable, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+5 more)

### Community 59 - "llm-gateway.http.adapter.ts"
Cohesion: 0.09
Nodes (26): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+18 more)

### Community 60 - "users-view.tsx"
Cohesion: 0.08
Nodes (39): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+31 more)

### Community 61 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 62 - "HealthService"
Cohesion: 0.20
Nodes (4): HealthReadinessResponseDto, ApiProperty, HealthService, Injectable

### Community 63 - "app-metrics.service.ts"
Cohesion: 0.13
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 65 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 66 - "http-metrics.interceptor.ts"
Cohesion: 0.11
Nodes (18): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+10 more)

### Community 67 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (70): mapProviderResponseToAiObservation(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), getUsageMetadata(), buildGenerationConfig() (+62 more)

### Community 68 - "ref_class_validator"
Cohesion: 0.05
Nodes (44): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+36 more)

### Community 69 - "InvitationsController"
Cohesion: 0.10
Nodes (16): ListInvitationsUseCase, Inject, Injectable, RevokeInvitationUseCase, Inject, Injectable, InvitationsController, ApiCookieAuth (+8 more)

### Community 70 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 71 - "health-readiness-response.dto.ts"
Cohesion: 0.33
Nodes (8): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional

### Community 72 - "landing-view.tsx"
Cohesion: 0.27
Nodes (11): LANDING_CONTEXT_IMAGES, LANDING_COPY, LANDING_HERO_IMAGES, LANDING_RUNS_IMAGES, LandingFeature, LandingPersona, LandingStep, LandingTech (+3 more)

### Community 73 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (48): AuthModule, Module, CompanyContextModule, Module, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject (+40 more)

### Community 74 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "ApiRequestIdHeader"
Cohesion: 0.21
Nodes (9): ApiRequestIdHeader(), HealthLivenessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+1 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.13
Nodes (15): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason(), CachedGatewayCheck (+7 more)

### Community 78 - "archive-runs-view.tsx"
Cohesion: 0.04
Nodes (69): metadata, metadata, useSession(), useGuestLocked(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS (+61 more)

### Community 79 - "company-context.schemas.ts"
Cohesion: 0.33
Nodes (5): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema

### Community 80 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 81 - "assert-company-context-writable.ts"
Cohesion: 0.30
Nodes (6): assertAudienceProfileNamesUnique(), CompanyContextWriteDetail, normalizeAudienceName(), withEffectiveAudience(), createLoadContextNode(), createLoadContextNode()

### Community 82 - "user-invited.template.ts"
Cohesion: 0.21
Nodes (21): ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments(), escapeHtml(), MAIL_PALETTE, MailPalette, MailShellContent, MailShellTextContent (+13 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "PrometheusAppMetricsAdapter"
Cohesion: 0.14
Nodes (5): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 85 - "UsersController"
Cohesion: 0.16
Nodes (12): ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode, Param (+4 more)

### Community 86 - "accept-invite-form.tsx"
Cohesion: 0.07
Nodes (39): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+31 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 90 - "CompanyContextController"
Cohesion: 0.13
Nodes (11): toCompanyContext(), toPartialCompanyContext(), CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller (+3 more)

### Community 91 - "ModelAlias"
Cohesion: 0.11
Nodes (7): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), TokenDirection

### Community 92 - "GatewayConfig"
Cohesion: 0.08
Nodes (16): ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable, ProviderManagerService (+8 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.10
Nodes (36): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, canRefine(), MAX_REFINE, nextRefineCount() (+28 more)

### Community 94 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (8): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 95 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 96 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "config-generator.service.ts"
Cohesion: 0.12
Nodes (19): isRedisRequired(), BasicServerAnswers, CacheAnswers, MetricsAnswers, RateLimitAnswers, RedisAnswers, SentryAnswers, ServerConfigPromptResult (+11 more)

### Community 99 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 100 - "start-run.dto.ts"
Cohesion: 0.16
Nodes (14): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+6 more)

### Community 101 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 102 - "ref_nestjs_swagger"
Cohesion: 0.10
Nodes (23): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+15 more)

### Community 103 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 104 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 106 - "chat-tooling.dto.ts"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 107 - "WizardState"
Cohesion: 0.14
Nodes (13): ConfigValidateCommand, Command, Option, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, CliGatewayValidatorService, Injectable (+5 more)

### Community 108 - "RegisterUserDto"
Cohesion: 0.16
Nodes (9): AcceptInviteDto, ApiProperty, IsString, MinLength, RegisterUserDto, ApiProperty, IsEmail, IsString (+1 more)

### Community 109 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (17): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+9 more)

### Community 110 - "LoginDto"
Cohesion: 0.33
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 111 - "llm-hop.ts"
Cohesion: 0.17
Nodes (13): LLM_GATEWAY_PORT, isRetryable(), RetryReason, ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid() (+5 more)

### Community 112 - "ProviderApiKey"
Cohesion: 0.19
Nodes (7): ProviderTestCommand, Command, Option, ProviderTestService, Injectable, ProviderApiKey, ProviderFactoryContext

### Community 113 - "OpenAiChatMessageDto"
Cohesion: 0.16
Nodes (12): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+4 more)

### Community 114 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 115 - "ListRunsQueryDto"
Cohesion: 0.14
Nodes (12): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+4 more)

### Community 116 - "asGatewayKey"
Cohesion: 0.14
Nodes (8): KeyGenerateCommand, Command, Option, KeyGeneratorService, Injectable, KeyPromptService, Injectable, asGatewayKey()

### Community 117 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 118 - "api/src/main.ts"
Cohesion: 0.21
Nodes (10): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig(), ref_cookie_parser, ref_helmet (+2 more)

### Community 119 - "app-metrics-backend.interface.ts"
Cohesion: 0.13
Nodes (10): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+2 more)

### Community 120 - "AuthController"
Cohesion: 0.20
Nodes (13): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+5 more)

### Community 122 - "BootstrapAdminDto"
Cohesion: 0.33
Nodes (5): BootstrapAdminDto, ApiProperty, IsEmail, IsString, MinLength

### Community 123 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand.ts"
Cohesion: 0.33
Nodes (3): unbrand, RunTaskType, RunsSummaryResponse

### Community 126 - "ListUsersUseCase"
Cohesion: 0.18
Nodes (7): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, UserListItem

### Community 128 - "PatchUserDto"
Cohesion: 0.40
Nodes (4): PatchUserDto, ApiProperty, IsBoolean, Equals

### Community 129 - "GuestGuard"
Cohesion: 0.40
Nodes (3): GuestGuard, Inject, Injectable

## Knowledge Gaps
- **484 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+479 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1288 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `isRunId()` connect `ids.ts` to `prisma-run.adapter.ts`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `Env` connect `auth.module.ts` to `GuestGuard`, `ref_nestjs_common`, `save-output-edited.use-case.ts`, `packages_shared_dist_index`, `InMemoryRunSseHub`, `PublicConfigController`, `packages_shared_dist_index_userid`, `api/src/health/health.service.ts`, `llm-hop.ts`, `api/src/main.ts`, `UserRepository`, `HealthService`, `llm-gateway.http.adapter.ts`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `AppMetricsBackend` connect `AppMetricsBackend` to `ModelAlias`, `PrometheusAppMetricsAdapter`, `app-metrics.service.ts`, `app-metrics-backend.interface.ts`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _484 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `auth.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.035543278084714545 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05787545787545788 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.04330637915543576 - nodes in this community are weakly interconnected._
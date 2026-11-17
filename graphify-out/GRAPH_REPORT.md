# Graph Report - content-chain  (2026-11-17)

## Corpus Check
- 661 files · ~288,458 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 4443 nodes · 13912 edges · 163 communities (137 shown, 23 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 392 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f090ec39`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ai-provider.interface.ts
- CompositeRunResultReader
- packages_shared_dist_index
- UserRepository
- cn
- redis-vector-store.adapter.ts
- resilient-executor.ts
- model-manager.service.ts
- asProviderInstanceId
- anthropic/anthropic-tools.mapper.ts
- users.api.ts
- AuthController
- .info
- run.schemas.ts
- PrometheusAppMetricsAdapter
- provider-error.mapper.ts
- AppMetricsService
- company-context-form.tsx
- feedback-form.tsx
- chat.service.ts
- dashboard-shell.tsx
- run-result-view.tsx
- configuration.ts
- prisma-guest-purge.adapter.ts
- ref_nestjs_common
- auth.module.ts
- logging.service.ts
- runs.types.ts
- anthropic-response.mapper.ts
- AppMetricsBackend
- app/layout.tsx
- guest-run-policy.service.ts
- cache.module.ts
- semantic-cache.constants.ts
- register-user.use-case.ts
- CurrentUser
- invitation-repository.port.ts
- enums.ts
- apps_api_src_content_infrastructure_prompts_load_prompt_renderprompt
- semantic-cache.service.ts
- anthropic-models.controller.ts
- provider-input.ts
- chat-completions.adapter.ts
- ids.ts
- ProviderRegistryService
- openai-params-provider.mapper.ts
- LoggingService
- provider-instances.bootstrap.ts
- OpenAiChatCompletionRequestDto
- ModelAlias
- CompanyContextController
- ClientRemoveCommand
- anthropic-messages.controller.ts
- RunResultReader
- ai-provider-gateway/src/app.module.ts
- .completions
- openai-models.controller.ts
- ModelEditCommand
- api/src/health/health.service.ts
- google-tools.mapper.ts
- sentry-ai-metrics.adapter.ts
- ModelRemoveCommand
- UsersController
- AnthropicMessagesRequestDto
- stream-cache-replay.service.ts
- ClientAddCommand
- GatewayConfig
- EnvironmentVariables
- apiFetch
- cli.module.ts
- landing-view.tsx
- domain/is-complete.ts
- openai-chat-completions.controller.ts
- InvitationsController
- logging.module.ts
- parse-verifier-log-message.ts
- run-lifecycle.module.ts
- ChatParamsDto
- ref_react
- archive-runs-view.tsx
- agent-answers.schema.ts
- branded.types.ts
- user-invited.template.ts
- SPEC — README
- start-run-form.tsx
- create-feedback.use-case.ts
- company-context.controller.ts
- company-context.dto.ts
- responses.adapter.ts
- HealthService
- PrometheusService
- start-run.use-case.ts
- ClientEditCommand
- apps_api_src_social_infrastructure_prompts_load_prompt_renderprompt
- response-cache.service.ts
- provider-registry.service.ts
- client-prompt.service.ts
- route.ts
- ref_nestjs_swagger
- ModelAddCommand
- notify-product.tsx
- src/index.ts
- GatewayKey
- runs.controller.ts
- EmailChangeRequestRepository
- HttpExceptionFilter
- GatewayModelsCatalogService
- resolve-provider-call-options.ts
- .getOne
- health.api.ts
- ProviderRemoveCommand
- AnthropicContentBlockDto
- packages_shared_dist_index_creategatewaymodelalias
- ApiRequestIdHeader
- packages_shared_dist_index_gatewaymodelalias
- packages_shared_dist_index_unbrand
- OpenAiChatMessageDto
- ProviderEditCommand
- swagger.setup.ts
- ref_langchain_langgraph
- PrismaRefreshSessionAdapter
- nodemailer-smtp-mailer.adapter.ts
- get-runs-summary.use-case.ts
- ai-provider-gateway/src/health/health.module.ts
- Architektura
- PaginationQueryDto
- save-output-edited.use-case.ts
- ProviderAddCommand
- RedisConnectionService
- ChatCacheIdentity
- health-readiness-response.dto.ts
- openai-messages-provider.mapper.ts
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
- gateway-error-code.ts
- LocalRunSseHub
- load-company-context-fixture.ts
- .create
- RunDispatchShutdown
- asInputTokens
- ref_class_validator
- CliGatewayValidatorService
- src/pagination.ts
- EmbeddingCircuitBreaker
- VectorStore
- BootstrapAdminDto
- LoginDto
- RegisterUserDto
- HitlDto
- PatchRunRatingDto
- ParseRunIdPipe
- RunsModule

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `ProviderInstanceId` - 81 edges
3. `LoggingService` - 73 edges
4. `AuthUserContext` - 71 edges
5. `isRecord()` - 69 edges
6. `asProviderInstanceId()` - 67 edges
7. `Env` - 67 edges
8. `GatewayConfig` - 65 edges
9. `cn()` - 65 edges
10. `GatewayKey` - 59 edges

## Surprising Connections (you probably didn't know these)
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `ResponseCacheService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/response-cache.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (163 total, 23 thin omitted)

### Community 0 - "ai-provider.interface.ts"
Cohesion: 0.11
Nodes (42): ChatResponseData, ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS (+34 more)

### Community 2 - "packages_shared_dist_index"
Cohesion: 0.08
Nodes (34): DeleteUserResult, ListUsersUseCase, Injectable, ReactivateUserUseCase, Injectable, JwtPayload, UserListItem, ListUsersResult (+26 more)

### Community 3 - "UserRepository"
Cohesion: 0.05
Nodes (22): Inject, Inject, Inject, Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput (+14 more)

### Community 4 - "cn"
Cohesion: 0.05
Nodes (61): AccountManageMenuProps, ManageDialog, AccountKpiCards(), FetchResult, KpiGate, resolveKpiGate(), shouldFetchKpi(), DATE_FORMAT (+53 more)

### Community 5 - "redis-vector-store.adapter.ts"
Cohesion: 0.21
Nodes (10): RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), isRedisSearchIndexAlreadyExistsError(), isRedisSearchMissingIndexError(), isRedisSearchModuleMissingError(), redisSearchErrorMessage(), semanticSchemaFtCreateArgs() (+2 more)

### Community 6 - "resilient-executor.ts"
Cohesion: 0.16
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 7 - "model-manager.service.ts"
Cohesion: 0.10
Nodes (25): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ConfigPersistenceService, Injectable, defaultModelPolicy(), ModelEditField (+17 more)

### Community 8 - "asProviderInstanceId"
Cohesion: 0.13
Nodes (34): assertInteractiveAllowed(), DEFAULT_MODELS, InitAnswers, convertModel(), CliAiProvider, ModelPromptResult, ModelPromptService, Injectable (+26 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.10
Nodes (38): asPromptCacheCreationTokens(), asPromptCacheHitTokens(), anthropicModelRejectsSamplingParams(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort() (+30 more)

### Community 10 - "users.api.ts"
Cohesion: 0.10
Nodes (33): fetchInitiatorOptions(), createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+25 more)

### Community 11 - "AuthController"
Cohesion: 0.09
Nodes (27): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+19 more)

### Community 12 - ".info"
Cohesion: 0.06
Nodes (25): ConfigInitCommand, Command, Option, ProviderTestCommand, Command, Option, WizardState, ConfigGeneratorService (+17 more)

### Community 13 - "run.schemas.ts"
Cohesion: 0.09
Nodes (24): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, socialBriefSchema, socialStartRunSchema (+16 more)

### Community 14 - "PrometheusAppMetricsAdapter"
Cohesion: 0.16
Nodes (3): healthStatusToGaugeValue(), PrometheusAppMetricsAdapter, Injectable

### Community 15 - "provider-error.mapper.ts"
Cohesion: 0.17
Nodes (22): ChatErrorHandlerService, Injectable, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus() (+14 more)

### Community 16 - "AppMetricsService"
Cohesion: 0.07
Nodes (19): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable, APP_METRICS_BACKEND, HealthComponent, HealthStatus (+11 more)

### Community 17 - "company-context-form.tsx"
Cohesion: 0.05
Nodes (71): metadata, putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+63 more)

### Community 18 - "feedback-form.tsx"
Cohesion: 0.14
Nodes (22): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+14 more)

### Community 19 - "chat.service.ts"
Cohesion: 0.08
Nodes (40): SemanticStoreEmbedState, CacheIdentityMessage, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+32 more)

### Community 20 - "dashboard-shell.tsx"
Cohesion: 0.06
Nodes (46): fetchCompleteness(), CompletenessState, GATE_SECTION_LABELS, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE (+38 more)

### Community 21 - "run-result-view.tsx"
Cohesion: 0.04
Nodes (60): filterFeedbackRunOptions(), buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload() (+52 more)

### Community 22 - "configuration.ts"
Cohesion: 0.05
Nodes (70): isRedisSearchTagSafeId(), WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+62 more)

### Community 23 - "prisma-guest-purge.adapter.ts"
Cohesion: 0.09
Nodes (15): DeleteOwnAccountUseCase, Inject, Injectable, DeleteUserUseCase, Inject, Injectable, GUEST_PURGE, GuestPurgeDeleteStats (+7 more)

### Community 24 - "ref_nestjs_common"
Cohesion: 0.04
Nodes (54): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, isEmptyCompanyContext(), bootstrap() (+46 more)

### Community 25 - "auth.module.ts"
Cohesion: 0.06
Nodes (43): AcceptInviteUseCase, Inject, Injectable, ActivateAccountUseCase, Inject, Injectable, AuthTokenResult, BootstrapAdminUseCase (+35 more)

### Community 26 - "logging.service.ts"
Cohesion: 0.09
Nodes (21): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), getAppConfigOrThrow(), enrichRequestWithClientId() (+13 more)

### Community 27 - "runs.types.ts"
Cohesion: 0.05
Nodes (93): ArchiveRunsQuery, fetchRunsSummary(), fetchUserRuns(), isUserRating(), patchRunRating(), startRun(), UserRunsPageQuery, HitlAccepted (+85 more)

### Community 28 - "anthropic-response.mapper.ts"
Cohesion: 0.13
Nodes (25): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+17 more)

### Community 30 - "app/layout.tsx"
Cohesion: 0.11
Nodes (12): metadata, metadata, apps_frontend_src_app_globals, AcceptInvitePage(), metadata, tokenFromSearchParam(), geistMono, inter (+4 more)

### Community 31 - "guest-run-policy.service.ts"
Cohesion: 0.08
Nodes (22): GUEST_ARCHIVE_STATUSES, GUEST_TASK_TYPES, GuestRunAdmit, isGuestTaskType(), ratingSchema, Inject, GUEST_QUOTA, GuestQuotaAdmitResult (+14 more)

### Community 32 - "cache.module.ts"
Cohesion: 0.08
Nodes (19): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+11 more)

### Community 33 - "semantic-cache.constants.ts"
Cohesion: 0.21
Nodes (11): normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS, embeddingProbeTimeoutMs() (+3 more)

### Community 34 - "register-user.use-case.ts"
Cohesion: 0.04
Nodes (69): AcceptInviteResult, acceptInviteSchema, ActivateAccountOutput, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), ActivateAccountInput (+61 more)

### Community 35 - "CurrentUser"
Cohesion: 0.16
Nodes (17): ListRunsUserOutput, isTerminalStatus(), RunsController, ApiCookieAuth, ApiTags, Body, Controller, Get (+9 more)

### Community 36 - "invitation-repository.port.ts"
Cohesion: 0.16
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 39 - "semantic-cache.service.ts"
Cohesion: 0.17
Nodes (14): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), isSingleTurnUserRequest(), lastUserMessageText(), EMBED_NOT_ATTEMPTED, SemanticCacheService, SemanticLookupResult (+6 more)

### Community 40 - "anthropic-models.controller.ts"
Cohesion: 0.23
Nodes (11): AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic(), mapGatewayModelToAnthropic() (+3 more)

### Community 41 - "provider-input.ts"
Cohesion: 0.10
Nodes (29): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+21 more)

### Community 42 - "chat-completions.adapter.ts"
Cohesion: 0.21
Nodes (19): toHttpException(), asSystemFingerprint(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText() (+11 more)

### Community 43 - "ids.ts"
Cohesion: 0.08
Nodes (36): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createEmailChangeRequestId() (+28 more)

### Community 44 - "ProviderRegistryService"
Cohesion: 0.14
Nodes (9): buildLlmMetricsContext(), mapProviderResponseToUsage(), ChatProviderCallService, Injectable, StreamCacheReplayService, Injectable, GatewayModelConfig, ProviderRegistryService (+1 more)

### Community 45 - "openai-params-provider.mapper.ts"
Cohesion: 0.15
Nodes (17): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+9 more)

### Community 46 - "LoggingService"
Cohesion: 0.10
Nodes (13): Inject, Inject, ChatProviderCooldownService, Injectable, Inject, Optional, ConsoleLoggerAdapter, Injectable (+5 more)

### Community 47 - "provider-instances.bootstrap.ts"
Cohesion: 0.21
Nodes (11): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+3 more)

### Community 48 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (19): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+11 more)

### Community 49 - "ModelAlias"
Cohesion: 0.08
Nodes (17): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope (+9 more)

### Community 50 - "CompanyContextController"
Cohesion: 0.18
Nodes (8): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller, Patch, Put

### Community 51 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 52 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (50): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+42 more)

### Community 53 - "RunResultReader"
Cohesion: 0.08
Nodes (9): Inject, orderItemsBySelectedIds(), Inject, GuestRunPolicyService, isGuestArchiveStatus(), Inject, Injectable, Inject (+1 more)

### Community 54 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.06
Nodes (36): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+28 more)

### Community 55 - ".completions"
Cohesion: 0.11
Nodes (18): OpenAiChatCompletionsController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags, Body (+10 more)

### Community 56 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 57 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 58 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 59 - "google-tools.mapper.ts"
Cohesion: 0.15
Nodes (23): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+15 more)

### Community 60 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+20 more)

### Community 61 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 62 - "UsersController"
Cohesion: 0.13
Nodes (15): PatchUserDto, ApiProperty, IsBoolean, ApiCookieAuth, ApiTags, Body, Controller, Delete (+7 more)

### Community 63 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 64 - "stream-cache-replay.service.ts"
Cohesion: 0.25
Nodes (7): ChatCacheSource, SseMetaPayload, SseMetaPayloadDto, ApiProperty, ApiPropertyOptional, STREAM_CACHE_REPLAY_CHUNK_SIZE, StreamCacheReplayInput

### Community 65 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 66 - "GatewayConfig"
Cohesion: 0.07
Nodes (24): PendingSecretsItem, ClientManagerService, Injectable, normalizeGatewayConfigForWrite(), EnvPatchService, Injectable, ProviderManagerService, Injectable (+16 more)

### Community 67 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 68 - "apiFetch"
Cohesion: 0.06
Nodes (57): ACTIVATION_FAILED_HINT, activateAccount(), confirmEmailChange(), Credentials, deleteOwnAccount(), fetchBootstrapStatus(), fetchUserSession(), GUEST_HAS_ACTIVE_RUN (+49 more)

### Community 69 - "cli.module.ts"
Cohesion: 0.08
Nodes (50): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers() (+42 more)

### Community 70 - "landing-view.tsx"
Cohesion: 0.27
Nodes (11): LANDING_CONTEXT_IMAGES, LANDING_COPY, LANDING_HERO_IMAGES, LANDING_RUNS_IMAGES, LandingFeature, LandingPersona, LandingStep, LandingTech (+3 more)

### Community 71 - "domain/is-complete.ts"
Cohesion: 0.62
Nodes (6): collectGateItemPaths(), isCompleteAudienceProfile(), isCompleteCtaItem(), isCompleteOfferItem(), nonEmpty(), sectionFilled

### Community 72 - "openai-chat-completions.controller.ts"
Cohesion: 0.17
Nodes (21): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional (+13 more)

### Community 73 - "InvitationsController"
Cohesion: 0.13
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 74 - "logging.module.ts"
Cohesion: 0.07
Nodes (20): LEVEL_ORDER, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable, SentryErrorReportingAdapter, Injectable (+12 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "run-lifecycle.module.ts"
Cohesion: 0.07
Nodes (26): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+18 more)

### Community 77 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 78 - "ref_react"
Cohesion: 0.06
Nodes (74): ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite(), bootstrapAdmin(), registerAccount(), AcceptInviteForm() (+66 more)

### Community 79 - "archive-runs-view.tsx"
Cohesion: 0.04
Nodes (77): metadata, metadata, AccountManageMenu(), useSession(), useGuestLocked(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, PAGE_OUTLINE_ROLE_LABELS (+69 more)

### Community 80 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 81 - "branded.types.ts"
Cohesion: 0.08
Nodes (45): CliAiModel, CliRateLimit, BasicServerAnswers, CacheAnswers, MetricsAnswers, RateLimitAnswers, RedisAnswers, SentryAnswers (+37 more)

### Community 82 - "user-invited.template.ts"
Cohesion: 0.18
Nodes (26): EmailChangeConfirmMail, UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments(), escapeHtml() (+18 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "start-run-form.tsx"
Cohesion: 0.07
Nodes (42): fetchCompanyContext(), GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode (+34 more)

### Community 85 - "create-feedback.use-case.ts"
Cohesion: 0.06
Nodes (33): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_PURGE, FeedbackPurgePort (+25 more)

### Community 86 - "company-context.controller.ts"
Cohesion: 0.13
Nodes (16): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+8 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "responses.adapter.ts"
Cohesion: 0.25
Nodes (17): asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse() (+9 more)

### Community 89 - "HealthService"
Cohesion: 0.18
Nodes (3): HealthReadinessResponseDto, HealthService, Injectable

### Community 90 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 91 - "start-run.use-case.ts"
Cohesion: 0.13
Nodes (14): GetCompletenessUseCase, Inject, Injectable, Get, ParsedStartRunCommand, startRunCommandSchema, isContentStartCommand(), isPlainRecord() (+6 more)

### Community 92 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 94 - "response-cache.service.ts"
Cohesion: 0.20
Nodes (13): isUnservableCachedReply(), CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, parseCachedChatResponse(), asString(), ParsedKnnHits, parseKnnHits() (+5 more)

### Community 95 - "provider-registry.service.ts"
Cohesion: 0.12
Nodes (13): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, UnsupportedProviderException, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId (+5 more)

### Community 96 - "client-prompt.service.ts"
Cohesion: 0.09
Nodes (19): REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, KeyGenerateCommand, Command, Option, GatewayClient, KeyGeneratorService (+11 more)

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "ref_nestjs_swagger"
Cohesion: 0.22
Nodes (11): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional (+3 more)

### Community 99 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 100 - "notify-product.tsx"
Cohesion: 0.18
Nodes (14): assertNever(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome, runTerminalToastId() (+6 more)

### Community 101 - "src/index.ts"
Cohesion: 0.25
Nodes (5): unbrand, RunTaskType, RunsSummaryResponse, parseTtlMs(), parseTtlSeconds()

### Community 102 - "GatewayKey"
Cohesion: 0.09
Nodes (23): ChatService, Injectable, ApiBody, ApiOperation, ApiProduces, ApiResponse, Body, Post (+15 more)

### Community 103 - "runs.controller.ts"
Cohesion: 0.08
Nodes (37): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase (+29 more)

### Community 104 - "EmailChangeRequestRepository"
Cohesion: 0.11
Nodes (10): Inject, Inject, EmailChangeRequestRecord, EmailChangeRequestRepository, UpsertEmailChangeRequestInput, isUniqueConstraintViolation(), PrismaEmailChangeRequestAdapter, Row (+2 more)

### Community 105 - "HttpExceptionFilter"
Cohesion: 0.23
Nodes (5): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), packages_shared_dist_index_requestid

### Community 106 - "GatewayModelsCatalogService"
Cohesion: 0.14
Nodes (12): ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+4 more)

### Community 107 - "resolve-provider-call-options.ts"
Cohesion: 0.39
Nodes (6): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, GatewayParamsConfig

### Community 108 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 109 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 110 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 111 - "AnthropicContentBlockDto"
Cohesion: 0.14
Nodes (14): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+6 more)

### Community 113 - "ApiRequestIdHeader"
Cohesion: 0.21
Nodes (9): ApiRequestIdHeader(), HealthLivenessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+1 more)

### Community 116 - "OpenAiChatMessageDto"
Cohesion: 0.16
Nodes (12): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+4 more)

### Community 117 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 118 - "swagger.setup.ts"
Cohesion: 0.05
Nodes (53): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional (+45 more)

### Community 120 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 121 - "nodemailer-smtp-mailer.adapter.ts"
Cohesion: 0.18
Nodes (9): TransactionalMail, LoggingMailerAdapter, Injectable, NodemailerSmtpMailerAdapter, readSmtpConfig(), SmtpConfig, Inject, Injectable (+1 more)

### Community 122 - "get-runs-summary.use-case.ts"
Cohesion: 0.18
Nodes (10): CacheEntry, cacheKey(), GetRunsSummaryUseCase, RUNS_SUMMARY_CACHE_TTL_MS, RUNS_SUMMARY_WINDOW_MS, scopeFor(), successRate(), Inject (+2 more)

### Community 123 - "ai-provider-gateway/src/health/health.module.ts"
Cohesion: 0.15
Nodes (11): HealthModule, Module, AiMetricsModule, Global, Module, AppMetricsModule, Global, Module (+3 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "PaginationQueryDto"
Cohesion: 0.15
Nodes (13): ListRunsQueryDto, IsArray, IsIn, IsOptional, IsString, Transform, PaginationQueryDto, IsIn (+5 more)

### Community 126 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (27): contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema, ideasArraySchema (+19 more)

### Community 127 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 128 - "RedisConnectionService"
Cohesion: 0.30
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 129 - "ChatCacheIdentity"
Cohesion: 0.29
Nodes (5): ResponseCacheService, Injectable, ChatCacheIdentity, Optional, asCacheKey()

### Community 130 - "health-readiness-response.dto.ts"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 131 - "openai-messages-provider.mapper.ts"
Cohesion: 0.27
Nodes (7): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 145 - "LocalRunSseHub"
Cohesion: 0.29
Nodes (3): LocalRunSseHub, Inject, Injectable

### Community 146 - "load-company-context-fixture.ts"
Cohesion: 0.15
Nodes (13): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, audienceProfileSchema, CompanyContextFixture, companyContextFixtureSchema (+5 more)

### Community 147 - ".create"
Cohesion: 0.20
Nodes (9): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 148 - "RunDispatchShutdown"
Cohesion: 0.40
Nodes (3): RunDispatchShutdown, Inject, Injectable

### Community 149 - "asInputTokens"
Cohesion: 0.39
Nodes (7): buildAppProviderMetricsContext(), mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), getUsageMetadata(), getUsageMetadata()

### Community 151 - "ref_class_validator"
Cohesion: 0.39
Nodes (3): packages_shared_dist_index_run_platforms, ref_class_transformer, ref_class_validator

### Community 152 - "CliGatewayValidatorService"
Cohesion: 0.29
Nodes (5): ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 153 - "src/pagination.ts"
Cohesion: 0.29
Nodes (5): DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, PageSize, PaginatedList

### Community 156 - "BootstrapAdminDto"
Cohesion: 0.33
Nodes (5): BootstrapAdminDto, ApiProperty, IsEmail, IsString, MinLength

### Community 157 - "LoginDto"
Cohesion: 0.33
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 158 - "RegisterUserDto"
Cohesion: 0.33
Nodes (5): RegisterUserDto, ApiProperty, IsEmail, IsString, MinLength

### Community 159 - "HitlDto"
Cohesion: 0.50
Nodes (3): HitlDto, IsArray, IsString

### Community 160 - "PatchRunRatingDto"
Cohesion: 0.50
Nodes (3): PatchRunRatingDto, IsIn, ValidateIf

## Knowledge Gaps
- **481 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+476 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1290 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ProviderInstanceId` connect `ModelAlias` to `ai-provider.interface.ts`, `model-manager.service.ts`, `asProviderInstanceId`, `.info`, `PrometheusAppMetricsAdapter`, `AppMetricsService`, `chat.service.ts`, `configuration.ts`, `AppMetricsBackend`, `LoggingService`, `provider-instances.bootstrap.ts`, `sentry-ai-metrics.adapter.ts`, `stream-cache-replay.service.ts`, `GatewayConfig`, `cli.module.ts`, `logging.module.ts`, `branded.types.ts`, `response-cache.service.ts`, `provider-registry.service.ts`, `ref_nestjs_swagger`, `GatewayKey`, `GatewayModelsCatalogService`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `Env` connect `auth.module.ts` to `packages_shared_dist_index`, `register-user.use-case.ts`, `UserRepository`, `runs.controller.ts`, `run-lifecycle.module.ts`, `LocalRunSseHub`, `RunResultReader`, `ref_nestjs_common`, `nodemailer-smtp-mailer.adapter.ts`, `api/src/health/health.service.ts`, `start-run.use-case.ts`, `save-output-edited.use-case.ts`, `guest-run-policy.service.ts`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `AppMetricsBackend` connect `AppMetricsBackend` to `AppMetricsService`, `ModelAlias`, `PrometheusAppMetricsAdapter`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _481 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ai-provider.interface.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10621942697414395 - nodes in this community are weakly interconnected._
- **Should `packages_shared_dist_index` be split into smaller, more focused modules?**
  _Cohesion score 0.08408249603384453 - nodes in this community are weakly interconnected._
- **Should `UserRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.051587301587301584 - nodes in this community are weakly interconnected._
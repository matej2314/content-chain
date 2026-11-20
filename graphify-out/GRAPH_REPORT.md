# Graph Report - content-chain  (2026-11-20)

## Corpus Check
- 661 files · ~288,790 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 4440 nodes · 13899 edges · 148 communities (119 shown, 26 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 392 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4da40a1b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ref_react
- runs.types.ts
- cli.module.ts
- register-user.use-case.ts
- ref_nestjs_swagger
- ref_nestjs_common
- home-entry.tsx
- client-prompt.service.ts
- company-context-form.tsx
- run-result-view.tsx
- GatewayConfig
- anthropic-messages.controller.ts
- sentry-ai-metrics.adapter.ts
- auth.module.ts
- semantic-cache.service.ts
- ProviderInstanceId
- chat.service.ts
- UserRepository
- start-run-form.tsx
- logging.service.ts
- create-feedback.use-case.ts
- AuthUserContext
- event-source-registry-provider.tsx
- gateway-config.schema.ts
- cn
- AuthController
- exitWithAgentReport
- ModelAlias
- redis-vector-store.adapter.ts
- ai-provider-gateway/src/app.module.ts
- ref_express
- asProviderInstanceId
- archive-runs-view.tsx
- company-context.controller.ts
- packages_shared_dist_index_userid
- LoggingService
- provider-registry.service.ts
- runs.controller.ts
- UsersController
- metrics.module.ts
- anthropic/anthropic-tools.mapper.ts
- cache.module.ts
- metrics.ts
- resilient-executor.ts
- api/src/health/health.service.ts
- invitation-repository.port.ts
- save-output-edited.use-case.ts
- apiFetch
- ids.ts
- OpenAiChatCompletionRequestDto
- user-invited.template.ts
- ai-provider-gateway/src/health/health.service.ts
- provider-error.mapper.ts
- AnthropicMessagesRequestDto
- enums.ts
- anthropic-response.mapper.ts
- google-tools.mapper.ts
- packages_shared_dist_index
- openai-params-provider.mapper.ts
- PrometheusAppMetricsAdapter
- app/layout.tsx
- run.schemas.ts
- branded.types.ts
- AppMetricsBackend
- openai-stream.mapper.ts
- app-metrics-backend.interface.ts
- export-openapi.ts
- chat-completions.adapter.ts
- NoopAppMetricsAdapter
- company-context.dto.ts
- responses.adapter.ts
- provider-instances.bootstrap.ts
- domain/is-complete.ts
- load-company-context-fixture.ts
- route.ts
- AppMetricsService
- filters/http-exception.filter.ts
- list-runs-query.dto.ts
- openai-models.controller.ts
- feedback-form.tsx
- .getOne
- models.controller.ts
- start-run.use-case.ts
- .create
- parse-verifier-log-message.ts
- .getOne
- RunSseNotifyListener
- PrometheusService
- EmailChangeRequestRepository
- TransactionalMailer
- .getOne
- ConfigInitCommand
- AppProviderStreamScope
- get-runs-summary.use-case.ts
- HealthController
- SPEC — README
- anthropic-models.controller.ts
- resolve-provider-call-options.ts
- health.api.ts
- EnvironmentVariables
- app-metrics.service.ts
- packages_shared_dist_index_createuserid
- GatewayModelsCatalogService
- EmbeddingCircuitBreaker
- BootstrapAdminDto
- CompositeRunResultReader
- LocalRunSseHub
- ProviderAddCommand
- LoginDto
- src/index.ts
- ClientAddCommand
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- ModelRemoveCommand
- ProviderEditCommand
- ProviderRemoveCommand
- HttpExceptionFilter
- RegisterUserDto
- ActiveStreamsTracker
- HitlDto
- pagination.ts
- RunDispatchShutdown
- gateway-error-code.ts
- Architektura
- apps_api_src_content_infrastructure_prompts_load_prompt_renderprompt
- apps_api_src_social_infrastructure_prompts_load_prompt_renderprompt
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
- packages_shared_dist_index_creategatewaymodelalias
- packages_shared_dist_index_gatewaymodelalias
- packages_shared_dist_index_unbrand
- ref_langchain_langgraph
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
8. `cn()` - 67 edges
9. `GatewayConfig` - 65 edges
10. `GatewayKey` - 59 edges

## Surprising Connections (you probably didn't know these)
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `ResponseCacheService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/response-cache.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `OllamaEmbeddingAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/semantic/adapters/ollama-embedding.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (148 total, 26 thin omitted)

### Community 0 - "ref_react"
Cohesion: 0.05
Nodes (95): ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite(), bootstrapAdmin(), Credentials, GUEST_HAS_ACTIVE_RUN (+87 more)

### Community 1 - "runs.types.ts"
Cohesion: 0.04
Nodes (99): isGateSection(), parseAudienceProfile(), parseCaseStudy(), parseCompanyContext(), parseCompanyContextPayload(), parseCompleteness(), parseCtaItem(), parseExtras() (+91 more)

### Community 2 - "cli.module.ts"
Cohesion: 0.06
Nodes (71): AgentReport, AgentReportStatus, PendingSecretsItem, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, CliModule (+63 more)

### Community 3 - "register-user.use-case.ts"
Cohesion: 0.08
Nodes (28): comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), AuthTokenResult, LoginUseCase, Inject, Injectable (+20 more)

### Community 4 - "ref_nestjs_swagger"
Cohesion: 0.04
Nodes (71): ChatOutputTextDto, ApiProperty, ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional (+63 more)

### Community 5 - "ref_nestjs_common"
Cohesion: 0.04
Nodes (60): AppModule, Module, Inject, AuthModule, Module, readCookie(), JwtCookieStrategy, Inject (+52 more)

### Community 6 - "home-entry.tsx"
Cohesion: 0.05
Nodes (52): ACTIVATION_FAILED_HINT, activateAccount(), confirmEmailChange(), fetchBootstrapStatus(), fetchUserSession(), patchOwnEmail(), patchOwnPassword(), resendActivation() (+44 more)

### Community 7 - "client-prompt.service.ts"
Cohesion: 0.07
Nodes (29): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), ClientManagerService, Injectable, KeyGeneratorService (+21 more)

### Community 8 - "company-context-form.tsx"
Cohesion: 0.04
Nodes (87): metadata, fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+79 more)

### Community 9 - "run-result-view.tsx"
Cohesion: 0.04
Nodes (66): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+58 more)

### Community 10 - "GatewayConfig"
Cohesion: 0.06
Nodes (47): DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable (+39 more)

### Community 11 - "anthropic-messages.controller.ts"
Cohesion: 0.03
Nodes (77): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+69 more)

### Community 12 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.09
Nodes (32): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+24 more)

### Community 13 - "auth.module.ts"
Cohesion: 0.05
Nodes (58): AcceptInviteUseCase, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable, ActivateAccountInput, activateAccountSchema, BootstrapAdminInput (+50 more)

### Community 14 - "semantic-cache.service.ts"
Cohesion: 0.09
Nodes (19): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend (+11 more)

### Community 15 - "ProviderInstanceId"
Cohesion: 0.07
Nodes (24): KeyGenerateCommand, Command, Option, ProviderTestCommand, ProviderTestOptions, Command, Option, CliAiModel (+16 more)

### Community 16 - "chat.service.ts"
Cohesion: 0.07
Nodes (47): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+39 more)

### Community 17 - "UserRepository"
Cohesion: 0.05
Nodes (27): Inject, Inject, Inject, Inject, Inject, Inject, Inject, AccountActivationRecord (+19 more)

### Community 18 - "start-run-form.tsx"
Cohesion: 0.06
Nodes (50): metadata, metadata, AcceptInvitePage(), metadata, tokenFromSearchParam(), fetchCompanyContext(), GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES (+42 more)

### Community 19 - "logging.service.ts"
Cohesion: 0.07
Nodes (23): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+15 more)

### Community 20 - "create-feedback.use-case.ts"
Cohesion: 0.09
Nodes (23): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+15 more)

### Community 21 - "AuthUserContext"
Cohesion: 0.10
Nodes (21): Get, isRecord(), orderItemsBySelectedIds(), isTerminalStatus(), RunsController, ApiCookieAuth, ApiTags, Body (+13 more)

### Community 22 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

### Community 23 - "gateway-config.schema.ts"
Cohesion: 0.07
Nodes (40): collectPendingSecrets(), CliValidateOptions, ValidationFormatter, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult (+32 more)

### Community 24 - "cn"
Cohesion: 0.04
Nodes (63): AccountManageMenuProps, ManageDialog, SessionState, DemoChip(), useDemoMode(), FeedbackCta(), AccountKpiCards(), FetchResult (+55 more)

### Community 25 - "AuthController"
Cohesion: 0.11
Nodes (26): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Delete, HttpCode, Patch (+18 more)

### Community 26 - "exitWithAgentReport"
Cohesion: 0.15
Nodes (13): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), markAgentRuntime(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList() (+5 more)

### Community 27 - "ModelAlias"
Cohesion: 0.11
Nodes (40): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, ChatUsageDetailsDto, ApiPropertyOptional, SseMetaPayload (+32 more)

### Community 28 - "redis-vector-store.adapter.ts"
Cohesion: 0.08
Nodes (35): isUnservableCachedReply(), CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag() (+27 more)

### Community 29 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.06
Nodes (40): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+32 more)

### Community 30 - "ref_express"
Cohesion: 0.08
Nodes (25): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard (+17 more)

### Community 31 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (44): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+36 more)

### Community 32 - "archive-runs-view.tsx"
Cohesion: 0.05
Nodes (59): metadata, metadata, AccountManageMenu(), useSession(), useGuestLocked(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS (+51 more)

### Community 33 - "company-context.controller.ts"
Cohesion: 0.10
Nodes (18): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+10 more)

### Community 34 - "packages_shared_dist_index_userid"
Cohesion: 0.05
Nodes (34): Inject, DeleteUserResult, DeleteUserUseCase, Inject, Injectable, FEEDBACK_PURGE, FeedbackPurgePort, PrismaFeedbackPurgeAdapter (+26 more)

### Community 35 - "LoggingService"
Cohesion: 0.08
Nodes (15): RedisConnectionService, Injectable, CacheRegistryService, Injectable, Inject, Inject, isRedisRequiredFromConfig(), Inject (+7 more)

### Community 36 - "provider-registry.service.ts"
Cohesion: 0.12
Nodes (16): CompleteOnceResult, ChatValidationService, Injectable, ModelId, GatewayCapabilitiesConfig, GatewayModelConfig, GatewayParamsConfig, AIProvider (+8 more)

### Community 37 - "runs.controller.ts"
Cohesion: 0.05
Nodes (42): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase (+34 more)

### Community 38 - "UsersController"
Cohesion: 0.14
Nodes (15): PatchUserDto, ApiProperty, IsBoolean, ApiCookieAuth, ApiTags, Body, Controller, Delete (+7 more)

### Community 39 - "metrics.module.ts"
Cohesion: 0.10
Nodes (20): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+12 more)

### Community 40 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.10
Nodes (42): asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens(), asPromptCacheHitTokens(), anthropicModelRejectsSamplingParams(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+34 more)

### Community 41 - "cache.module.ts"
Cohesion: 0.08
Nodes (15): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+7 more)

### Community 42 - "metrics.ts"
Cohesion: 0.09
Nodes (31): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+23 more)

### Community 43 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (17): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+9 more)

### Community 44 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 45 - "invitation-repository.port.ts"
Cohesion: 0.16
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 46 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (29): contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema, ideasArraySchema (+21 more)

### Community 47 - "apiFetch"
Cohesion: 0.06
Nodes (57): deleteOwnAccount(), logoutSession(), AccountDeleteForm(), onPurgeConfirm(), onReauthSubmit(), runDelete(), fetchAppConfig(), AppConfig (+49 more)

### Community 48 - "ids.ts"
Cohesion: 0.08
Nodes (36): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createEmailChangeRequestId() (+28 more)

### Community 49 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (33): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+25 more)

### Community 50 - "user-invited.template.ts"
Cohesion: 0.18
Nodes (26): EmailChangeConfirmMail, UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments(), escapeHtml() (+18 more)

### Community 51 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.11
Nodes (14): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto (+6 more)

### Community 52 - "provider-error.mapper.ts"
Cohesion: 0.19
Nodes (20): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 53 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 54 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 55 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 56 - "google-tools.mapper.ts"
Cohesion: 0.15
Nodes (23): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+15 more)

### Community 57 - "packages_shared_dist_index"
Cohesion: 0.05
Nodes (46): AcceptInviteResult, acceptInviteSchema, formatMailValidityLabel(), polishPlural(), InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject (+38 more)

### Community 58 - "openai-params-provider.mapper.ts"
Cohesion: 0.13
Nodes (23): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+15 more)

### Community 59 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (5): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppTokenUsage

### Community 60 - "app/layout.tsx"
Cohesion: 0.22
Nodes (7): apps_frontend_src_app_globals, geistMono, inter, metadata, spaceGrotesk, SessionProvider(), setApiFetchUnauthorizedHandler()

### Community 61 - "run.schemas.ts"
Cohesion: 0.09
Nodes (25): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+17 more)

### Community 62 - "branded.types.ts"
Cohesion: 0.06
Nodes (49): CACHE_BACKEND_TYPE, CliRateLimit, CONVERSATION_ID_PATTERN, isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId(), isFiniteNumber() (+41 more)

### Community 64 - "openai-stream.mapper.ts"
Cohesion: 0.17
Nodes (21): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+13 more)

### Community 65 - "app-metrics-backend.interface.ts"
Cohesion: 0.20
Nodes (11): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+3 more)

### Community 66 - "export-openapi.ts"
Cohesion: 0.11
Nodes (18): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+10 more)

### Community 67 - "chat-completions.adapter.ts"
Cohesion: 0.13
Nodes (27): toHttpException(), asSystemFingerprint(), ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream() (+19 more)

### Community 69 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 70 - "responses.adapter.ts"
Cohesion: 0.25
Nodes (16): asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse() (+8 more)

### Community 71 - "provider-instances.bootstrap.ts"
Cohesion: 0.23
Nodes (11): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+3 more)

### Community 72 - "domain/is-complete.ts"
Cohesion: 0.26
Nodes (11): toPublicCompanyContext(), assertAudienceProfileNamesUnique(), assertCompanyContextWritable(), collectGateItemPaths(), isComplete(), isCompleteAudienceProfile(), isCompleteCtaItem(), isCompleteOfferItem() (+3 more)

### Community 73 - "load-company-context-fixture.ts"
Cohesion: 0.10
Nodes (18): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+10 more)

### Community 74 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 75 - "AppMetricsService"
Cohesion: 0.12
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable, HttpMethod

### Community 76 - "filters/http-exception.filter.ts"
Cohesion: 0.19
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 77 - "list-runs-query.dto.ts"
Cohesion: 0.12
Nodes (15): ListRunsQueryDto, IsArray, IsIn, IsOptional, IsString, Transform, PaginationQueryDto, IsIn (+7 more)

### Community 78 - "openai-models.controller.ts"
Cohesion: 0.27
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 79 - "feedback-form.tsx"
Cohesion: 0.08
Nodes (37): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+29 more)

### Community 80 - ".getOne"
Cohesion: 0.17
Nodes (12): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+4 more)

### Community 81 - "models.controller.ts"
Cohesion: 0.23
Nodes (10): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 82 - "start-run.use-case.ts"
Cohesion: 0.09
Nodes (21): GUEST_ARCHIVE_STATUSES, GUEST_TASK_TYPES, GuestRunAdmit, isGuestArchiveStatus(), isGuestTaskType(), ListRunsOutput, ListRunsUseCase, Inject (+13 more)

### Community 83 - ".create"
Cohesion: 0.13
Nodes (13): FeedbackController, ApiCookieAuth, ApiTags, Body, Controller, HttpCode, Post, CreateFeedbackDto (+5 more)

### Community 84 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 85 - ".getOne"
Cohesion: 0.18
Nodes (11): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+3 more)

### Community 86 - "RunSseNotifyListener"
Cohesion: 0.33
Nodes (3): RunSseNotifyListener, Inject, Injectable

### Community 87 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 88 - "EmailChangeRequestRepository"
Cohesion: 0.11
Nodes (10): Inject, Inject, EmailChangeRequestRecord, EmailChangeRequestRepository, UpsertEmailChangeRequestInput, isUniqueConstraintViolation(), PrismaEmailChangeRequestAdapter, Row (+2 more)

### Community 89 - "TransactionalMailer"
Cohesion: 0.12
Nodes (13): Inject, Inject, Inject, TransactionalMail, TransactionalMailer, LoggingMailerAdapter, Injectable, NodemailerSmtpMailerAdapter (+5 more)

### Community 90 - ".getOne"
Cohesion: 0.19
Nodes (10): ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 91 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 93 - "get-runs-summary.use-case.ts"
Cohesion: 0.19
Nodes (9): CacheEntry, cacheKey(), GetRunsSummaryUseCase, RUNS_SUMMARY_CACHE_TTL_MS, RUNS_SUMMARY_WINDOW_MS, scopeFor(), successRate(), Inject (+1 more)

### Community 94 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 95 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 96 - "anthropic-models.controller.ts"
Cohesion: 0.50
Nodes (6): AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic(), mapGatewayModelToAnthropic(), toDisplayName()

### Community 97 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 98 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 99 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 100 - "app-metrics.service.ts"
Cohesion: 0.15
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

### Community 101 - "packages_shared_dist_index_createuserid"
Cohesion: 0.24
Nodes (5): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable, packages_shared_dist_index_createuserid

### Community 104 - "BootstrapAdminDto"
Cohesion: 0.40
Nodes (5): BootstrapAdminDto, ApiProperty, IsEmail, IsString, MinLength

### Community 106 - "LocalRunSseHub"
Cohesion: 0.29
Nodes (3): LocalRunSseHub, Inject, Injectable

### Community 107 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 108 - "LoginDto"
Cohesion: 0.40
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 109 - "src/index.ts"
Cohesion: 0.25
Nodes (5): unbrand, RunTaskType, RunsSummaryResponse, parseTtlMs(), parseTtlSeconds()

### Community 110 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 111 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 112 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 113 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 114 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 115 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 116 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 117 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 118 - "HttpExceptionFilter"
Cohesion: 0.23
Nodes (5): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), packages_shared_dist_index_requestid

### Community 119 - "RegisterUserDto"
Cohesion: 0.40
Nodes (5): RegisterUserDto, ApiProperty, IsEmail, IsString, MinLength

### Community 121 - "HitlDto"
Cohesion: 0.50
Nodes (3): HitlDto, IsArray, IsString

### Community 122 - "pagination.ts"
Cohesion: 0.29
Nodes (5): DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, PageSize, PaginatedList

### Community 123 - "RunDispatchShutdown"
Cohesion: 0.40
Nodes (3): RunDispatchShutdown, Inject, Injectable

### Community 125 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 145 - "PatchRunRatingDto"
Cohesion: 0.50
Nodes (3): PatchRunRatingDto, IsIn, ValidateIf

## Knowledge Gaps
- **480 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+475 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1290 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ProviderInstanceId` connect `ProviderInstanceId` to `cli.module.ts`, `GatewayConfig`, `anthropic-messages.controller.ts`, `sentry-ai-metrics.adapter.ts`, `chat.service.ts`, `logging.service.ts`, `gateway-config.schema.ts`, `exitWithAgentReport`, `ModelAlias`, `ref_express`, `asProviderInstanceId`, `provider-registry.service.ts`, `metrics.ts`, `PrometheusAppMetricsAdapter`, `branded.types.ts`, `AppMetricsBackend`, `app-metrics-backend.interface.ts`, `NoopAppMetricsAdapter`, `AppMetricsService`, `app-metrics.service.ts`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `Env` connect `ref_nestjs_common` to `packages_shared_dist_index_userid`, `register-user.use-case.ts`, `runs.controller.ts`, `LocalRunSseHub`, `api/src/health/health.service.ts`, `auth.module.ts`, `save-output-edited.use-case.ts`, `UserRepository`, `start-run.use-case.ts`, `RunSseNotifyListener`, `TransactionalMailer`, `packages_shared_dist_index`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `AppMetricsBackend` connect `AppMetricsBackend` to `app-metrics.service.ts`, `app-metrics-backend.interface.ts`, `PrometheusAppMetricsAdapter`, `NoopAppMetricsAdapter`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _480 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ref_react` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._
- **Should `runs.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.042587601078167114 - nodes in this community are weakly interconnected._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05775500698649278 - nodes in this community are weakly interconnected._
# Graph Report - content-chain  (2026-11-17)

## Corpus Check
- 662 files · ~288,594 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 4454 nodes · 13928 edges · 143 communities (118 shown, 22 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 392 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bb586df7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ai-provider.interface.ts
- CompositeRunResultReader
- company-context.types.ts
- UserRepository
- cn
- redis-vector-store.adapter.ts
- run-review-panel.tsx
- model-manager.service.ts
- asProviderInstanceId
- anthropic/anthropic-tools.mapper.ts
- isRecord
- AuthUserContext
- config-generator.service.ts
- run.schemas.ts
- PrometheusAppMetricsAdapter
- api-error.code.ts
- app-metrics.module.ts
- company-context-form.tsx
- feedback-form.tsx
- chat.service.ts
- completeness-provider.tsx
- runs-result.types.ts
- configuration.ts
- delete-user.use-case.ts
- api/src/app.module.ts
- auth.module.ts
- ref_nestjs_config
- runs.types.ts
- anthropic-messages.controller.ts
- ModelAlias
- accept-invite-form.tsx
- ioredis-guest-quota.adapter.ts
- response-cache.service.ts
- semantic-cache.constants.ts
- packages_shared_dist_index_userid
- types/index.ts
- app-metrics.service.ts
- enums.ts
- apps_api_src_content_infrastructure_prompts_load_prompt_renderprompt
- semantic-cache.service.ts
- anthropic-models.controller.ts
- ChatMessageDto
- responses.adapter.ts
- ids.ts
- provider-registry.service.ts
- openai-params-provider.mapper.ts
- LoggingService
- logging.service.ts
- OpenAiChatCompletionRequestDto
- NoopAppMetricsAdapter
- CompanyContextController
- ClientRemoveCommand
- chat.module.ts
- AppMetricsService
- ai-provider-gateway/src/app.module.ts
- .createMessage
- openai-models.controller.ts
- ModelEditCommand
- api/src/health/health.service.ts
- metrics.ts
- sentry-ai-metrics.adapter.ts
- ModelRemoveCommand
- list-runs-query.dto.ts
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
- LogContext
- parse-verifier-log-message.ts
- http-metrics.interceptor.ts
- ref_nestjs_swagger
- button.tsx
- start-run-form.tsx
- exitWithAgentReport
- branded.types.ts
- user-invited.template.ts
- SPEC — README
- company-context-view.tsx
- create-feedback.use-case.ts
- company-context.controller.ts
- company-context.dto.ts
- anthropic.module.ts
- ai-provider-gateway/src/health/health.service.ts
- PrometheusService
- lib/is-complete.ts
- ClientEditCommand
- apps_api_src_social_infrastructure_prompts_load_prompt_renderprompt
- company-context.mapper.ts
- filters/http-exception.filter.ts
- KeyGenerateCommand
- route.ts
- StartRunDto
- ModelAddCommand
- ConfigInitCommand
- src/pagination.ts
- active-streams.tracker.ts
- ref_nestjs_common
- PrismaEmailChangeRequestAdapter
- HttpExceptionFilter
- models.controller.ts
- resolve-provider-call-options.ts
- AppProviderStreamScope
- health.api.ts
- ProviderRemoveCommand
- ResendActivationDto
- packages_shared_dist_index_creategatewaymodelalias
- ApiRequestIdHeader
- packages_shared_dist_index_gatewaymodelalias
- packages_shared_dist_index_unbrand
- .get
- ProviderEditCommand
- swagger.setup.ts
- ref_langchain_langgraph
- PrismaRefreshSessionAdapter
- AcceptInviteDto
- RunSseNotifyListener
- Architektura
- save-output-edited.use-case.ts
- ProviderAddCommand
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
- RunDispatchShutdown

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
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `Request` --references--> `AuthUserContext`  [EXTRACTED]
  apps/api/src/shared/http/express.d.ts → apps/api/src/shared/types/auth-user-context.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (143 total, 22 thin omitted)

### Community 0 - "ai-provider.interface.ts"
Cohesion: 0.16
Nodes (29): ChatResponseData, mapStopReasonToFinishReason(), CompleteOnceResult, StreamOnceParams, StreamOnceResult, ChatResponseBuilderService, ProviderResponse, Injectable (+21 more)

### Community 1 - "CompositeRunResultReader"
Cohesion: 0.09
Nodes (3): CompositeRunResultReader, EmptyRunResultReader, Injectable

### Community 2 - "company-context.types.ts"
Cohesion: 0.13
Nodes (20): CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextPayload, CONTEXT_TABS, DEFAULT_CONTEXT_TAB, EXTRAS_KEYS, extrasForPut() (+12 more)

### Community 3 - "UserRepository"
Cohesion: 0.04
Nodes (40): patchUserSchema, Inject, ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable (+32 more)

### Community 4 - "cn"
Cohesion: 0.04
Nodes (59): apps_frontend_src_app_globals, geistMono, inter, metadata, spaceGrotesk, AccountManageMenuProps, ManageDialog, AppHeader() (+51 more)

### Community 5 - "redis-vector-store.adapter.ts"
Cohesion: 0.10
Nodes (27): isUnservableCachedReply(), CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag() (+19 more)

### Community 6 - "run-review-panel.tsx"
Cohesion: 0.08
Nodes (33): canEditResult(), finalizeRunReview(), isUserRating(), patchRunRating(), saveOutputEdited(), RunResult, UserRating, isCancelableRunStatus() (+25 more)

### Community 7 - "model-manager.service.ts"
Cohesion: 0.12
Nodes (27): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), defaultModelPolicy(), ModelEditField, ModelManagerService (+19 more)

### Community 8 - "asProviderInstanceId"
Cohesion: 0.12
Nodes (31): assertInteractiveAllowed(), DEFAULT_MODELS, convertProvider(), ModelPromptResult, ModelPromptService, Injectable, ProviderPromptResult, ProviderPromptService (+23 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.10
Nodes (38): asPromptCacheCreationTokens(), asPromptCacheHitTokens(), anthropicModelRejectsSamplingParams(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort() (+30 more)

### Community 10 - "isRecord"
Cohesion: 0.08
Nodes (45): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+37 more)

### Community 11 - "AuthUserContext"
Cohesion: 0.07
Nodes (37): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+29 more)

### Community 12 - "config-generator.service.ts"
Cohesion: 0.11
Nodes (16): WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable, Injectable, WizardOrchestratorService, WizardRunResult (+8 more)

### Community 13 - "run.schemas.ts"
Cohesion: 0.13
Nodes (15): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+7 more)

### Community 14 - "PrometheusAppMetricsAdapter"
Cohesion: 0.14
Nodes (4): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppTokenUsage

### Community 15 - "api-error.code.ts"
Cohesion: 0.08
Nodes (42): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+34 more)

### Community 16 - "app-metrics.module.ts"
Cohesion: 0.11
Nodes (13): resolveAppMetricsBackend(), Inject, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller (+5 more)

### Community 17 - "company-context-form.tsx"
Cohesion: 0.13
Nodes (22): CONTEXT_TAB_LABELS, ContextTab, GateSection, gateTabIsMissing(), audienceProfileHeading(), benefitCountLabel(), caseStudyHeading(), commaToList() (+14 more)

### Community 18 - "feedback-form.tsx"
Cohesion: 0.13
Nodes (24): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+16 more)

### Community 19 - "chat.service.ts"
Cohesion: 0.07
Nodes (48): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+40 more)

### Community 20 - "completeness-provider.tsx"
Cohesion: 0.14
Nodes (22): fetchCompleteness(), CompletenessState, GATE_SECTION_LABELS, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE (+14 more)

### Community 21 - "runs-result.types.ts"
Cohesion: 0.04
Nodes (68): buildOutputEditedBody(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload(), RESULT_KEYS_BY_TASK_TYPE (+60 more)

### Community 22 - "configuration.ts"
Cohesion: 0.07
Nodes (42): CliValidateOptions, normalizeGatewayConfigForWrite(), ValidationFormatter, asSemanticCacheTtlSeconds(), AppConfiguration, RedisRuntimeConfig, SemanticCacheRuntimeConfig, collectInactiveProviderWarnings() (+34 more)

### Community 23 - "delete-user.use-case.ts"
Cohesion: 0.08
Nodes (19): Inject, DeleteUserResult, DeleteUserUseCase, Inject, Injectable, FEEDBACK_PURGE, FeedbackPurgePort, PrismaFeedbackPurgeAdapter (+11 more)

### Community 24 - "api/src/app.module.ts"
Cohesion: 0.04
Nodes (50): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, FeedbackModule, Module (+42 more)

### Community 25 - "auth.module.ts"
Cohesion: 0.03
Nodes (108): ActivateAccountOutput, ActivateAccountUseCase, Inject, Injectable, comparePassword(), generateRefreshToken(), hashRefreshToken(), ActivateAccountInput (+100 more)

### Community 26 - "ref_nestjs_config"
Cohesion: 0.14
Nodes (16): resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), enrichRequestWithClientId(), SmartRateLimitGuard, Injectable, AnthropicApiKeyGuard, readAnthropicApiKey() (+8 more)

### Community 27 - "runs.types.ts"
Cohesion: 0.03
Nodes (93): metadata, metadata, assertNever(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput (+85 more)

### Community 28 - "anthropic-messages.controller.ts"
Cohesion: 0.14
Nodes (25): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+17 more)

### Community 30 - "accept-invite-form.tsx"
Cohesion: 0.07
Nodes (36): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, AcceptInviteFormProps, AcceptInviteFormState (+28 more)

### Community 31 - "ioredis-guest-quota.adapter.ts"
Cohesion: 0.09
Nodes (15): isGuestTaskType(), Inject, Inject, GuestQuotaAdmitResult, GuestQuotaPort, createRedis(), IoredisGuestQuotaAdapter, msUntilNextMidnight() (+7 more)

### Community 32 - "response-cache.service.ts"
Cohesion: 0.10
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 33 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 34 - "packages_shared_dist_index_userid"
Cohesion: 0.05
Nodes (52): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, hashPassword(), registerUserSchema, InvitationListItem (+44 more)

### Community 35 - "types/index.ts"
Cohesion: 0.19
Nodes (18): CONVERSATION_ID_PATTERN, isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId(), isFiniteNumber(), isMaxAttempts(), isMaxConcurrentStreams() (+10 more)

### Community 36 - "app-metrics.service.ts"
Cohesion: 0.27
Nodes (12): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+4 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 39 - "semantic-cache.service.ts"
Cohesion: 0.09
Nodes (22): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend (+14 more)

### Community 40 - "anthropic-models.controller.ts"
Cohesion: 0.11
Nodes (22): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+14 more)

### Community 41 - "ChatMessageDto"
Cohesion: 0.16
Nodes (16): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+8 more)

### Community 42 - "responses.adapter.ts"
Cohesion: 0.10
Nodes (42): toHttpException(), asSystemFingerprint(), asToolCallId(), ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionsAdapterOptions, createChatCompletionsAdapter() (+34 more)

### Community 43 - "ids.ts"
Cohesion: 0.08
Nodes (37): brand, unbrand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId() (+29 more)

### Community 44 - "provider-registry.service.ts"
Cohesion: 0.11
Nodes (15): ChatProviderCallService, Injectable, ChatValidationService, Injectable, UnsupportedProviderException, GatewayCapabilitiesConfig, GatewayModelConfig, GatewayParamsConfig (+7 more)

### Community 45 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 46 - "LoggingService"
Cohesion: 0.08
Nodes (13): RedisConnectionService, Injectable, Inject, Inject, isRedisRequiredFromConfig(), ChatProviderCooldownService, Injectable, Inject (+5 more)

### Community 47 - "logging.service.ts"
Cohesion: 0.22
Nodes (11): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+3 more)

### Community 48 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (33): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+25 more)

### Community 50 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 51 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 52 - "chat.module.ts"
Cohesion: 0.06
Nodes (40): ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body, Controller (+32 more)

### Community 53 - "AppMetricsService"
Cohesion: 0.13
Nodes (4): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable

### Community 54 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.07
Nodes (27): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+19 more)

### Community 55 - ".createMessage"
Cohesion: 0.12
Nodes (14): ApiHeader, AnthropicMessagesController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags (+6 more)

### Community 56 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 57 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 58 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 59 - "metrics.ts"
Cohesion: 0.08
Nodes (47): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias() (+39 more)

### Community 60 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (35): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+27 more)

### Community 61 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 62 - "list-runs-query.dto.ts"
Cohesion: 0.08
Nodes (26): ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode, Param (+18 more)

### Community 63 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 64 - "stream-cache-replay.service.ts"
Cohesion: 0.16
Nodes (10): ChatCacheSource, GATEWAY_CACHE_HEADER, SseMetaPayload, SseMetaPayloadDto, ApiProperty, ApiPropertyOptional, STREAM_CACHE_REPLAY_CHUNK_SIZE, StreamCacheReplayInput (+2 more)

### Community 65 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 66 - "GatewayConfig"
Cohesion: 0.09
Nodes (16): ClientManagerService, Injectable, ConfigPersistenceService, Injectable, EnvPatchService, Injectable, ProviderManagerService, Injectable (+8 more)

### Community 67 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 68 - "apiFetch"
Cohesion: 0.05
Nodes (85): toAcceptInviteFormError(), ACTIVATION_FAILED_HINT, acceptInvite(), activateAccount(), bootstrapAdmin(), confirmEmailChange(), Credentials, fetchBootstrapStatus() (+77 more)

### Community 69 - "cli.module.ts"
Cohesion: 0.05
Nodes (72): AgentReport, AgentReportStatus, PendingSecretsItem, loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers(), CliMode, CliModeFlags (+64 more)

### Community 70 - "landing-view.tsx"
Cohesion: 0.27
Nodes (11): LANDING_CONTEXT_IMAGES, LANDING_COPY, LANDING_HERO_IMAGES, LANDING_RUNS_IMAGES, LandingFeature, LandingPersona, LandingStep, LandingTech (+3 more)

### Community 71 - "domain/is-complete.ts"
Cohesion: 0.26
Nodes (11): toPublicCompanyContext(), assertAudienceProfileNamesUnique(), assertCompanyContextWritable(), collectGateItemPaths(), isComplete(), isCompleteAudienceProfile(), isCompleteCtaItem(), isCompleteOfferItem() (+3 more)

### Community 72 - "openai-chat-completions.controller.ts"
Cohesion: 0.07
Nodes (39): toChatResponseDto(), fromGatewayToolCallDto(), toGatewayToolCallDto(), OpenAiChatCompletionsController, ApiBody, ApiOperation, ApiProduces, ApiResponse (+31 more)

### Community 73 - "InvitationsController"
Cohesion: 0.11
Nodes (14): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+6 more)

### Community 74 - "LogContext"
Cohesion: 0.06
Nodes (26): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+18 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "http-metrics.interceptor.ts"
Cohesion: 0.11
Nodes (15): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, Get, Res, gatewayErrorsTotal (+7 more)

### Community 77 - "ref_nestjs_swagger"
Cohesion: 0.04
Nodes (61): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+53 more)

### Community 78 - "button.tsx"
Cohesion: 0.09
Nodes (38): deleteOwnAccount(), GUEST_HAS_ACTIVE_RUN, AccountDeleteForm(), onPurgeConfirm(), onReauthSubmit(), runDelete(), AccountDeleteFormProps, DeletePhase (+30 more)

### Community 79 - "start-run-form.tsx"
Cohesion: 0.03
Nodes (92): metadata, GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode, isGuestAllowedTaskType() (+84 more)

### Community 80 - "exitWithAgentReport"
Cohesion: 0.14
Nodes (13): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+5 more)

### Community 81 - "branded.types.ts"
Cohesion: 0.05
Nodes (77): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, ProviderTestOptions, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep (+69 more)

### Community 82 - "user-invited.template.ts"
Cohesion: 0.18
Nodes (26): EmailChangeConfirmMail, UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments(), escapeHtml() (+18 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "company-context-view.tsx"
Cohesion: 0.23
Nodes (14): metadata, fetchCompanyContext(), putCompanyContext(), CompanyContext, companyContextForPut(), Completeness, parseCompanyContextPayload(), withDraftRows() (+6 more)

### Community 85 - "create-feedback.use-case.ts"
Cohesion: 0.06
Nodes (33): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+25 more)

### Community 86 - "company-context.controller.ts"
Cohesion: 0.15
Nodes (12): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+4 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "anthropic.module.ts"
Cohesion: 0.21
Nodes (10): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+2 more)

### Community 89 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.11
Nodes (14): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto (+6 more)

### Community 90 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 91 - "lib/is-complete.ts"
Cohesion: 0.21
Nodes (16): AudienceProfile, CtaItem, GATE_SECTIONS, areAudienceProfileNamesUnique(), isDuplicateAudienceProfileName(), normalizeAudienceProfileName(), audienceProfileFieldErrors, canRemoveOfferItem() (+8 more)

### Community 92 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 94 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (10): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+2 more)

### Community 95 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 96 - "KeyGenerateCommand"
Cohesion: 0.27
Nodes (3): KeyGenerateCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "StartRunDto"
Cohesion: 0.22
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 99 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 100 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 101 - "src/pagination.ts"
Cohesion: 0.15
Nodes (9): RunTaskType, DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, PageSize, PaginatedList, RunsSummaryResponse, parseTtlMs() (+1 more)

### Community 103 - "ref_nestjs_common"
Cohesion: 0.04
Nodes (76): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase (+68 more)

### Community 104 - "PrismaEmailChangeRequestAdapter"
Cohesion: 0.27
Nodes (5): EmailChangeRequestRecord, isUniqueConstraintViolation(), PrismaEmailChangeRequestAdapter, toRecord(), Injectable

### Community 106 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 107 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 109 - "health.api.ts"
Cohesion: 0.27
Nodes (11): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+3 more)

### Community 110 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 111 - "ResendActivationDto"
Cohesion: 0.50
Nodes (3): ResendActivationDto, ApiProperty, IsEmail

### Community 113 - "ApiRequestIdHeader"
Cohesion: 0.21
Nodes (9): ApiRequestIdHeader(), HealthLivenessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+1 more)

### Community 116 - ".get"
Cohesion: 0.50
Nodes (3): ApiOkResponse, ApiOperation, Get

### Community 117 - "ProviderEditCommand"
Cohesion: 0.33
Nodes (3): ProviderEditCommand, Command, Option

### Community 118 - "swagger.setup.ts"
Cohesion: 0.04
Nodes (59): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional (+51 more)

### Community 120 - "PrismaRefreshSessionAdapter"
Cohesion: 0.31
Nodes (3): RefreshSessionRecord, PrismaRefreshSessionAdapter, Injectable

### Community 122 - "AcceptInviteDto"
Cohesion: 0.40
Nodes (4): AcceptInviteDto, ApiProperty, IsString, MinLength

### Community 123 - "RunSseNotifyListener"
Cohesion: 0.33
Nodes (3): RunSseNotifyListener, Inject, Injectable

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 126 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (27): contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema, ideasArraySchema (+19 more)

### Community 127 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 145 - "LocalRunSseHub"
Cohesion: 0.29
Nodes (3): LocalRunSseHub, Inject, Injectable

### Community 146 - "load-company-context-fixture.ts"
Cohesion: 0.14
Nodes (13): isEmptyCompanyContext(), audienceProfileSchema, CompanyContextFixture, companyContextFixtureSchema, ctaItemSchema, fixturePath(), loadCompanyContextFixture(), offerItemSchema (+5 more)

### Community 148 - "RunDispatchShutdown"
Cohesion: 0.40
Nodes (3): RunDispatchShutdown, Inject, Injectable

## Knowledge Gaps
- **481 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+476 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1299 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ProviderInstanceId` connect `branded.types.ts` to `ai-provider.interface.ts`, `redis-vector-store.adapter.ts`, `model-manager.service.ts`, `asProviderInstanceId`, `config-generator.service.ts`, `PrometheusAppMetricsAdapter`, `chat.service.ts`, `configuration.ts`, `ref_nestjs_config`, `ModelAlias`, `types/index.ts`, `app-metrics.service.ts`, `provider-registry.service.ts`, `NoopAppMetricsAdapter`, `AppMetricsService`, `metrics.ts`, `sentry-ai-metrics.adapter.ts`, `stream-cache-replay.service.ts`, `GatewayConfig`, `cli.module.ts`, `LogContext`, `exitWithAgentReport`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `Env` connect `auth.module.ts` to `packages_shared_dist_index_userid`, `ref_nestjs_common`, `LocalRunSseHub`, `load-company-context-fixture.ts`, `api/src/app.module.ts`, `api/src/health/health.service.ts`, `RunSseNotifyListener`, `save-output-edited.use-case.ts`, `ioredis-guest-quota.adapter.ts`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `AppMetricsBackend` connect `ModelAlias` to `app-metrics.module.ts`, `NoopAppMetricsAdapter`, `app-metrics.service.ts`, `PrometheusAppMetricsAdapter`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _481 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `CompositeRunResultReader` be split into smaller, more focused modules?**
  _Cohesion score 0.09473684210526316 - nodes in this community are weakly interconnected._
- **Should `company-context.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13043478260869565 - nodes in this community are weakly interconnected._
- **Should `UserRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.04276158623984711 - nodes in this community are weakly interconnected._
# Graph Report - content-chain  (2026-11-17)

## Corpus Check
- 660 files · ~288,614 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 4436 nodes · 13882 edges · 136 communities (112 shown, 21 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 392 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fd189aef`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ref_react
- runs.types.ts
- cli.module.ts
- auth.controller.ts
- swagger.setup.ts
- ref_nestjs_common
- auth.api.ts
- asProviderInstanceId
- company-context-form.tsx
- run-result-editor.tsx
- GatewayConfig
- chat.controller.ts
- sentry-ai-metrics.adapter.ts
- chat.service.ts
- semantic-cache.service.ts
- client-manager.service.ts
- GatewayKey
- auth.module.ts
- start-run-form.tsx
- logging.service.ts
- prisma-guest-purge.adapter.ts
- AuthUserContext
- dashboard-shell.tsx
- configuration.ts
- cn
- ref_nestjs_swagger
- .info
- ai-provider.interface.ts
- redis-vector-store.adapter.ts
- ai-provider-gateway/src/app.module.ts
- chat-stream.controller.ts
- config-generator.service.ts
- archive-runs-view.tsx
- useSession
- Env
- LoggingService
- chat.module.ts
- packages_shared_dist_index
- PaginationQueryDto
- http-metrics.interceptor.ts
- anthropic/anthropic-tools.mapper.ts
- response-cache.service.ts
- chat-provider-call.service.ts
- resilient-executor.ts
- api/src/health/health.service.ts
- ChatParamsDto
- save-output-edited.use-case.ts
- apiFetch
- ids.ts
- OpenAiChatCompletionRequestDto
- user-invited.template.ts
- getAppConfigOrThrow
- provider-error.mapper.ts
- AnthropicMessagesRequestDto
- enums.ts
- anthropic-messages.controller.ts
- google-tools.mapper.ts
- invite-user.use-case.ts
- openai-params-provider.mapper.ts
- PrometheusAppMetricsAdapter
- app/layout.tsx
- start-run.dto.ts
- branded.types.ts
- ModelAlias
- openai-chat-completions.controller.ts
- app-metrics-backend.interface.ts
- agent-answers.schema.ts
- chat-completions.adapter.ts
- NoopAppMetricsAdapter
- provider-input.ts
- responses.adapter.ts
- provider-instances.bootstrap.ts
- stream-cache-replay.service.ts
- company-context.dto.ts
- route.ts
- HttpMetricsMiddleware
- api-error.code.ts
- notify-product.tsx
- openai-models.controller.ts
- feedback-form.tsx
- anthropic-models.controller.ts
- models.controller.ts
- start-run.use-case.ts
- landing-view.tsx
- parse-verifier-log-message.ts
- health-readiness-response.dto.ts
- RunSseNotifyListener
- PrometheusService
- PrismaEmailChangeRequestAdapter
- transactional-mailer.port.ts
- ConfigShowCommand
- ConfigValidateCommand
- AppProviderStreamScope
- SPEC — README
- health.api.ts
- EnvironmentVariables
- app-metrics.service.ts
- PrismaRefreshSessionAdapter
- openai-messages-provider.mapper.ts
- CompositeRunResultReader
- LocalRunSseHub
- ProviderAddCommand
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
- ClientId
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
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `ResponseCacheService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/response-cache.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (136 total, 21 thin omitted)

### Community 0 - "ref_react"
Cohesion: 0.06
Nodes (65): bootstrapAdmin(), registerAccount(), AccountDeleteFormProps, DeletePhase, AccountEmailFormProps, ModalState, AccountPasswordFormProps, INITIAL (+57 more)

### Community 1 - "runs.types.ts"
Cohesion: 0.04
Nodes (103): filterFeedbackRunOptions(), ArchiveRunsQuery, fetchRunLogs(), fetchRunsSummary(), fetchUserRuns(), InitiatorOption, isUserRating(), patchRunRating() (+95 more)

### Community 2 - "cli.module.ts"
Cohesion: 0.08
Nodes (49): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers() (+41 more)

### Community 3 - "auth.controller.ts"
Cohesion: 0.03
Nodes (81): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, ActivateAccountUseCase, Injectable, comparePassword(), generateRefreshToken() (+73 more)

### Community 4 - "swagger.setup.ts"
Cohesion: 0.05
Nodes (47): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional (+39 more)

### Community 5 - "ref_nestjs_common"
Cohesion: 0.03
Nodes (77): AppModule, Module, AuthModule, Module, GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase (+69 more)

### Community 6 - "auth.api.ts"
Cohesion: 0.08
Nodes (37): ACTIVATION_FAILED_HINT, activateAccount(), confirmEmailChange(), Credentials, fetchBootstrapStatus(), fetchUserSession(), GUEST_HAS_ACTIVE_RUN, loginWithPassword() (+29 more)

### Community 7 - "asProviderInstanceId"
Cohesion: 0.09
Nodes (45): isRedisSearchTagSafeId(), assertInteractiveAllowed(), DEFAULT_MODELS, InitAnswers, convertModel(), CliAiProvider, ClientPromptService, Injectable (+37 more)

### Community 8 - "company-context-form.tsx"
Cohesion: 0.05
Nodes (70): metadata, putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+62 more)

### Community 9 - "run-result-editor.tsx"
Cohesion: 0.03
Nodes (74): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+66 more)

### Community 10 - "GatewayConfig"
Cohesion: 0.06
Nodes (36): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, defaultModelPolicy() (+28 more)

### Community 11 - "chat.controller.ts"
Cohesion: 0.05
Nodes (43): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+35 more)

### Community 12 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+20 more)

### Community 13 - "chat.service.ts"
Cohesion: 0.16
Nodes (19): SemanticStoreEmbedState, CacheIdentityMessage, CachedChatResponseWithConversation, isCachedChatAllowedForModelAlias(), shouldStoreChatResponse(), createInProcessSingleflight(), toChatCacheIdentity(), isToolingRequest() (+11 more)

### Community 14 - "semantic-cache.service.ts"
Cohesion: 0.07
Nodes (33): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName() (+25 more)

### Community 15 - "client-manager.service.ts"
Cohesion: 0.08
Nodes (20): PendingSecretsItem, KeyGenerateCommand, Command, Option, ClientManagerService, Injectable, EnvPatchService, Injectable (+12 more)

### Community 16 - "GatewayKey"
Cohesion: 0.07
Nodes (36): ChatService, Injectable, ApiBody, ApiOperation, ApiProduces, ApiResponse, Body, Post (+28 more)

### Community 17 - "auth.module.ts"
Cohesion: 0.03
Nodes (60): ActivateAccountOutput, Inject, Inject, DeleteUserResult, DeleteUserUseCase, Inject, Injectable, ListUsersUseCase (+52 more)

### Community 18 - "start-run-form.tsx"
Cohesion: 0.07
Nodes (44): fetchCompanyContext(), GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode (+36 more)

### Community 19 - "logging.service.ts"
Cohesion: 0.06
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 20 - "prisma-guest-purge.adapter.ts"
Cohesion: 0.13
Nodes (8): GUEST_PURGE, GuestPurgeDeleteStats, GuestPurgePort, LIVE_RUN_STATUSES, GuestPurgeModule, Module, PrismaGuestPurgeAdapter, Injectable

### Community 21 - "AuthUserContext"
Cohesion: 0.06
Nodes (41): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+33 more)

### Community 22 - "dashboard-shell.tsx"
Cohesion: 0.08
Nodes (34): CompletenessState, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE, useCompleteness(), FeedbackCta() (+26 more)

### Community 23 - "configuration.ts"
Cohesion: 0.06
Nodes (67): REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient(), convertProvider() (+59 more)

### Community 24 - "cn"
Cohesion: 0.04
Nodes (62): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+54 more)

### Community 25 - "ref_nestjs_swagger"
Cohesion: 0.05
Nodes (40): ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDonePayloadDto, SseDoneUsageDto, ApiPropertyOptional (+32 more)

### Community 26 - ".info"
Cohesion: 0.09
Nodes (14): ConfigInitCommand, Command, Option, toSafeConfigSnapshot(), ProviderTestCommand, Command, Option, ProviderTestService (+6 more)

### Community 27 - "ai-provider.interface.ts"
Cohesion: 0.14
Nodes (30): ChatResponseData, buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, mapStopReasonToFinishReason(), StreamOnceResult, ProviderResponse, SseDeltaEvent, SseFinishReason (+22 more)

### Community 28 - "redis-vector-store.adapter.ts"
Cohesion: 0.10
Nodes (26): isUnservableCachedReply(), CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag() (+18 more)

### Community 29 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.05
Nodes (39): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+31 more)

### Community 30 - "chat-stream.controller.ts"
Cohesion: 0.06
Nodes (36): ChatModule, Module, CHAT_STREAM_API_DESCRIPTION, SseSerializer, StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader() (+28 more)

### Community 31 - "config-generator.service.ts"
Cohesion: 0.13
Nodes (15): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable (+7 more)

### Community 32 - "archive-runs-view.tsx"
Cohesion: 0.06
Nodes (51): metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, fetchArchiveRuns() (+43 more)

### Community 33 - "useSession"
Cohesion: 0.09
Nodes (28): deleteOwnAccount(), logoutSession(), AccountDeleteForm(), onPurgeConfirm(), onReauthSubmit(), runDelete(), AccountManageMenu(), SessionState (+20 more)

### Community 34 - "Env"
Cohesion: 0.05
Nodes (34): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, isRecord(), parseGatewayLivenessBody(), Inject, Inject, GUEST_ARCHIVE_STATUSES, GUEST_TASK_TYPES (+26 more)

### Community 35 - "LoggingService"
Cohesion: 0.08
Nodes (14): RedisConnectionService, Injectable, Inject, Inject, isRedisRequiredFromConfig(), ChatProviderCooldownService, Injectable, Inject (+6 more)

### Community 36 - "chat.module.ts"
Cohesion: 0.08
Nodes (16): ChatStreamController, ApiSecurity, ApiTags, Controller, ChatErrorHandlerService, Injectable, ChatResponseBuilderService, Injectable (+8 more)

### Community 37 - "packages_shared_dist_index"
Cohesion: 0.03
Nodes (90): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+82 more)

### Community 38 - "PaginationQueryDto"
Cohesion: 0.09
Nodes (24): ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode, Param (+16 more)

### Community 39 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 40 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.10
Nodes (38): asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic() (+30 more)

### Community 41 - "response-cache.service.ts"
Cohesion: 0.10
Nodes (17): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+9 more)

### Community 42 - "chat-provider-call.service.ts"
Cohesion: 0.10
Nodes (32): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), buildProviderInputForAlias(), clamp() (+24 more)

### Community 43 - "resilient-executor.ts"
Cohesion: 0.21
Nodes (10): assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions, ResilientExecutionResult, ResilientExecutor, Injectable, asAttemptNumber() (+2 more)

### Community 44 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (24): GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, probeFailureReason(), Inject, Injectable, HealthController, ApiOkResponse (+16 more)

### Community 45 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 46 - "save-output-edited.use-case.ts"
Cohesion: 0.10
Nodes (25): contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema, ideasArraySchema (+17 more)

### Community 47 - "apiFetch"
Cohesion: 0.07
Nodes (50): fetchCompleteness(), parseCompanyContextPayload(), parseCompleteness(), fetchAppConfig(), AppConfig, parseAppConfig(), createInvitation(), fetchInvitations() (+42 more)

### Community 48 - "ids.ts"
Cohesion: 0.08
Nodes (36): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createEmailChangeRequestId() (+28 more)

### Community 49 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (31): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+23 more)

### Community 50 - "user-invited.template.ts"
Cohesion: 0.18
Nodes (26): EmailChangeConfirmMail, UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments(), escapeHtml() (+18 more)

### Community 51 - "getAppConfigOrThrow"
Cohesion: 0.11
Nodes (8): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, getAppConfigOrThrow(), HealthReadinessResponseDto, ApiProperty, HealthService, Injectable

### Community 52 - "provider-error.mapper.ts"
Cohesion: 0.19
Nodes (20): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 53 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (34): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+26 more)

### Community 54 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 55 - "anthropic-messages.controller.ts"
Cohesion: 0.14
Nodes (25): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+17 more)

### Community 56 - "google-tools.mapper.ts"
Cohesion: 0.15
Nodes (26): toCachedChatResponse(), asInputTokens(), asOutputTokens(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), getUsageMetadata() (+18 more)

### Community 57 - "invite-user.use-case.ts"
Cohesion: 0.05
Nodes (51): Inject, formatMailValidityLabel(), polishPlural(), InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable (+43 more)

### Community 58 - "openai-params-provider.mapper.ts"
Cohesion: 0.15
Nodes (17): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+9 more)

### Community 59 - "PrometheusAppMetricsAdapter"
Cohesion: 0.14
Nodes (4): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppTokenUsage

### Community 60 - "app/layout.tsx"
Cohesion: 0.10
Nodes (12): metadata, metadata, metadata, apps_frontend_src_app_globals, geistMono, inter, metadata, spaceGrotesk (+4 more)

### Community 61 - "start-run.dto.ts"
Cohesion: 0.16
Nodes (14): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+6 more)

### Community 62 - "branded.types.ts"
Cohesion: 0.08
Nodes (45): CliAiModel, CliRateLimit, BasicServerAnswers, CacheAnswers, MetricsAnswers, RateLimitAnswers, RedisAnswers, SentryAnswers (+37 more)

### Community 63 - "ModelAlias"
Cohesion: 0.08
Nodes (7): ProviderTestOptions, ModelAlias, ProviderInstanceId, AppMetricsService, Inject, Injectable, AppMetricsBackend

### Community 64 - "openai-chat-completions.controller.ts"
Cohesion: 0.15
Nodes (22): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+14 more)

### Community 65 - "app-metrics-backend.interface.ts"
Cohesion: 0.17
Nodes (11): healthStatusToGaugeValue(), AppRequestLabels, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod, HttpRequestLabels (+3 more)

### Community 66 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 67 - "chat-completions.adapter.ts"
Cohesion: 0.19
Nodes (20): toHttpException(), asSystemFingerprint(), ProviderToolDefinition, ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas() (+12 more)

### Community 68 - "NoopAppMetricsAdapter"
Cohesion: 0.13
Nodes (3): NoopAppMetricsAdapter, Injectable, resolveAppMetricsBackend()

### Community 69 - "provider-input.ts"
Cohesion: 0.22
Nodes (12): toMetricsMessages(), toProviderTurns(), composeSystemPrompt(), getResolvedSystemPrompts(), SYSTEM_PROMPT_SECTION_JOINER, ChatAssistantMessage, ChatMessage, ChatToolMessage (+4 more)

### Community 70 - "responses.adapter.ts"
Cohesion: 0.25
Nodes (17): asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse() (+9 more)

### Community 71 - "provider-instances.bootstrap.ts"
Cohesion: 0.21
Nodes (11): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+3 more)

### Community 72 - "stream-cache-replay.service.ts"
Cohesion: 0.22
Nodes (9): ChatCacheSource, GATEWAY_CACHE_HEADER, SseMetaPayload, SseMetaPayloadDto, ApiProperty, ApiPropertyOptional, STREAM_CACHE_REPLAY_CHUNK_SIZE, StreamCacheReplayInput (+1 more)

### Community 73 - "company-context.dto.ts"
Cohesion: 0.05
Nodes (61): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema (+53 more)

### Community 74 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 76 - "api-error.code.ts"
Cohesion: 0.07
Nodes (34): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+26 more)

### Community 77 - "notify-product.tsx"
Cohesion: 0.16
Nodes (15): assertNever(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome, runTerminalToastId() (+7 more)

### Community 78 - "openai-models.controller.ts"
Cohesion: 0.10
Nodes (25): ApiOpenAiErrorResponses(), OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse (+17 more)

### Community 79 - "feedback-form.tsx"
Cohesion: 0.14
Nodes (22): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+14 more)

### Community 80 - "anthropic-models.controller.ts"
Cohesion: 0.09
Nodes (27): ApiAnthropicErrorResponses(), AnthropicMessagesController, ApiSecurity, ApiTags, Controller, AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse (+19 more)

### Community 81 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 82 - "start-run.use-case.ts"
Cohesion: 0.07
Nodes (27): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+19 more)

### Community 83 - "landing-view.tsx"
Cohesion: 0.27
Nodes (11): LANDING_CONTEXT_IMAGES, LANDING_COPY, LANDING_HERO_IMAGES, LANDING_RUNS_IMAGES, LandingFeature, LandingPersona, LandingStep, LandingTech (+3 more)

### Community 84 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 85 - "health-readiness-response.dto.ts"
Cohesion: 0.33
Nodes (8): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional

### Community 86 - "RunSseNotifyListener"
Cohesion: 0.33
Nodes (3): RunSseNotifyListener, Inject, Injectable

### Community 87 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 88 - "PrismaEmailChangeRequestAdapter"
Cohesion: 0.27
Nodes (5): EmailChangeRequestRecord, isUniqueConstraintViolation(), PrismaEmailChangeRequestAdapter, toRecord(), Injectable

### Community 89 - "transactional-mailer.port.ts"
Cohesion: 0.13
Nodes (13): Inject, Inject, TransactionalMail, TransactionalMailer, LoggingMailerAdapter, Injectable, NodemailerSmtpMailerAdapter, readSmtpConfig() (+5 more)

### Community 90 - "ConfigShowCommand"
Cohesion: 0.40
Nodes (3): ConfigShowCommand, Command, Option

### Community 91 - "ConfigValidateCommand"
Cohesion: 0.50
Nodes (3): ConfigValidateCommand, Command, Option

### Community 95 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 98 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 99 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 100 - "app-metrics.service.ts"
Cohesion: 0.14
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

### Community 101 - "PrismaRefreshSessionAdapter"
Cohesion: 0.31
Nodes (3): RefreshSessionRecord, PrismaRefreshSessionAdapter, Injectable

### Community 103 - "openai-messages-provider.mapper.ts"
Cohesion: 0.27
Nodes (7): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 106 - "LocalRunSseHub"
Cohesion: 0.29
Nodes (3): LocalRunSseHub, Inject, Injectable

### Community 107 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

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

### Community 120 - "ClientId"
Cohesion: 0.26
Nodes (3): ClientId, ActiveStreamsTracker, Injectable

### Community 122 - "pagination.ts"
Cohesion: 0.29
Nodes (5): DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, PageSize, PaginatedList

### Community 123 - "RunDispatchShutdown"
Cohesion: 0.40
Nodes (3): RunDispatchShutdown, Inject, Injectable

### Community 125 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

## Knowledge Gaps
- **479 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+474 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1289 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ProviderInstanceId` connect `ModelAlias` to `cli.module.ts`, `asProviderInstanceId`, `GatewayConfig`, `sentry-ai-metrics.adapter.ts`, `client-manager.service.ts`, `GatewayKey`, `logging.service.ts`, `configuration.ts`, `.info`, `ai-provider.interface.ts`, `redis-vector-store.adapter.ts`, `chat-stream.controller.ts`, `config-generator.service.ts`, `LoggingService`, `chat-provider-call.service.ts`, `PrometheusAppMetricsAdapter`, `branded.types.ts`, `app-metrics-backend.interface.ts`, `NoopAppMetricsAdapter`, `provider-instances.bootstrap.ts`, `stream-cache-replay.service.ts`, `models.controller.ts`, `app-metrics.service.ts`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `Env` connect `Env` to `auth.controller.ts`, `ref_nestjs_common`, `packages_shared_dist_index`, `LocalRunSseHub`, `api/src/health/health.service.ts`, `save-output-edited.use-case.ts`, `auth.module.ts`, `start-run.use-case.ts`, `AuthUserContext`, `RunSseNotifyListener`, `transactional-mailer.port.ts`, `invite-user.use-case.ts`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `AppMetricsBackend` connect `ModelAlias` to `app-metrics-backend.interface.ts`, `app-metrics.service.ts`, `NoopAppMetricsAdapter`, `ClientId`, `PrometheusAppMetricsAdapter`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _479 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ref_react` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `runs.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.041505791505791506 - nodes in this community are weakly interconnected._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08356964136780651 - nodes in this community are weakly interconnected._
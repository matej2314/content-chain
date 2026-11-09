# Graph Report - content-chain  (2026-11-09)

## Corpus Check
- 733 files · ~286,050 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 4840 nodes · 15725 edges · 128 communities (116 shown, 10 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 423 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e0dda7bb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- auth.module.ts
- SocialResultStore
- company-context-form.tsx
- asProviderInstanceId
- model-manager.service.ts
- provider-instances.bootstrap.ts
- runs.controller.ts
- create-feedback.use-case.ts
- packages_shared_dist_index
- anthropic/anthropic-tools.mapper.ts
- runs.types.ts
- GuestQuotaPort
- feedback-form.tsx
- prisma-run.adapter.ts
- account-kpi-cards.tsx
- provider-error.mapper.ts
- resilient-executor.ts
- ai-provider.interface.ts
- cli.module.ts
- chat.service.ts
- branded.types.ts
- LoggingService
- configuration.ts
- UserRepository
- register-user.use-case.ts
- cn
- types/index.ts
- chat-completions.adapter.ts
- DomainException
- account-action-dialog.tsx
- prisma-invitation.adapter.ts
- responses.adapter.ts
- company-context.controller.ts
- apiFetch
- AnthropicMessagesRequestDto
- GatewayKey
- domain/company-context.types.ts
- enums.ts
- run-result-view.tsx
- redis-vector-store.adapter.ts
- sentry-ai-metrics.adapter.ts
- openai-params-provider.mapper.ts
- app/layout.tsx
- ids.ts
- ref_nestjs_common
- semantic-cache.service.ts
- save-output-edited.use-case.ts
- ConfigInitCommand
- export-openapi.ts
- anthropic-response.mapper.ts
- prisma-account-activation.adapter.ts
- openai-chat-completions.controller.ts
- UsersController
- RedisConnectionService
- content.graph.ts
- exitWithAgentReport
- should-include-redis-stack.ts
- archive-runs-view.tsx
- api/src/health/health.service.ts
- llm-gateway.http.adapter.ts
- ClientId
- OpenAiChatCompletionRequestDto
- HealthService
- public-config.controller.ts
- anthropic-models.controller.ts
- RefreshSessionRepository
- .getMetrics
- metrics.ts
- .execute
- ModelAddCommand
- openai-messages-provider.mapper.ts
- google-tools.mapper.ts
- home-entry.tsx
- api/src/app.module.ts
- logging.service.ts
- parse-verifier-log-message.ts
- guest.guard.ts
- VectorStore
- start-run-form.tsx
- CompanyContextController
- PrometheusService
- ClientEditCommand
- user-invited.template.ts
- SPEC — README
- run-details-view.tsx
- .create
- GuestGuard
- company-context.dto.ts
- ProviderEditCommand
- new-ids.ts
- CompanyContextRepository
- ModelAlias
- KeyGenerateCommand
- social.types.ts
- ProviderAddCommand
- route.ts
- packages_shared_dist_index_userid
- ClientRemoveCommand
- StartRunDto
- GatewayConfig
- models.controller.ts
- ProviderRemoveCommand
- openai-models.controller.ts
- company-context.mapper.ts
- ref_nestjs_swagger
- response-cache.service.ts
- InMemoryRunSseHub
- src/pagination.ts
- CompanyContext
- ModelRemoveCommand
- ModelEditCommand
- ClientAddCommand
- auth.controller.ts
- Architektura
- brand.ts
- GlobalExceptionFilter
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
5. `isRecord()` - 69 edges
6. `asProviderInstanceId()` - 67 edges
7. `GatewayConfig` - 65 edges
8. `cn()` - 65 edges
9. `Env` - 63 edges
10. `AuthUserContext` - 62 edges

## Surprising Connections (you probably didn't know these)
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `Request` --references--> `AuthUserContext`  [EXTRACTED]
  apps/api/src/shared/http/express.d.ts → apps/api/src/shared/types/auth-user-context.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (128 total, 10 thin omitted)

### Community 0 - "auth.module.ts"
Cohesion: 0.04
Nodes (58): AcceptInviteUseCase, Inject, Injectable, formatMailValidityLabel(), polishPlural(), InviteUserResult, inviteUserSchema, InviteUserUseCase (+50 more)

### Community 1 - "SocialResultStore"
Cohesion: 0.05
Nodes (23): CompositeRunResultReader, RunResultReader, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore, PipelineState, ReelIdea (+15 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.05
Nodes (78): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+70 more)

### Community 3 - "asProviderInstanceId"
Cohesion: 0.08
Nodes (44): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, PendingSecretsItem, assertInteractiveAllowed(), collectPendingSecrets(), ProviderTestCommand (+36 more)

### Community 4 - "model-manager.service.ts"
Cohesion: 0.10
Nodes (29): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), defaultModelPolicy(), ModelEditField, ModelManagerService (+21 more)

### Community 5 - "provider-instances.bootstrap.ts"
Cohesion: 0.19
Nodes (12): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, openAiCompatibleApiSurface (+4 more)

### Community 6 - "runs.controller.ts"
Cohesion: 0.05
Nodes (50): ListRunsUserItem, ListRunsUserOutput, ListRunsUserUseCase, Inject, Injectable, HitlDto, IsArray, IsString (+42 more)

### Community 7 - "create-feedback.use-case.ts"
Cohesion: 0.06
Nodes (36): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+28 more)

### Community 8 - "packages_shared_dist_index"
Cohesion: 0.04
Nodes (84): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject (+76 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.10
Nodes (37): asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic() (+29 more)

### Community 10 - "runs.types.ts"
Cohesion: 0.05
Nodes (86): GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode, isGuestAllowedTaskType(), isGuestQuotaCode() (+78 more)

### Community 11 - "GuestQuotaPort"
Cohesion: 0.11
Nodes (10): isGuestTaskType(), Inject, Inject, GuestQuotaAdmitResult, GuestQuotaPort, IoredisGuestQuotaAdapter, msUntilNextMidnight(), Injectable (+2 more)

### Community 12 - "feedback-form.tsx"
Cohesion: 0.12
Nodes (25): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+17 more)

### Community 13 - "prisma-run.adapter.ts"
Cohesion: 0.04
Nodes (43): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+35 more)

### Community 14 - "account-kpi-cards.tsx"
Cohesion: 0.05
Nodes (59): SessionState, GATE_SECTION_LABELS, CompletenessChip(), useCompleteness(), DemoChip(), DemoModeContext, DemoModeContextValue, DemoModeProvider() (+51 more)

### Community 15 - "provider-error.mapper.ts"
Cohesion: 0.17
Nodes (22): ChatErrorHandlerService, Injectable, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus() (+14 more)

### Community 16 - "resilient-executor.ts"
Cohesion: 0.16
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 17 - "ai-provider.interface.ts"
Cohesion: 0.07
Nodes (55): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, ChatUsageDetailsDto, ApiPropertyOptional, ChatWarningDto (+47 more)

### Community 18 - "cli.module.ts"
Cohesion: 0.06
Nodes (67): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), CliModule (+59 more)

### Community 19 - "chat.service.ts"
Cohesion: 0.06
Nodes (54): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+46 more)

### Community 20 - "branded.types.ts"
Cohesion: 0.06
Nodes (66): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+58 more)

### Community 21 - "LoggingService"
Cohesion: 0.08
Nodes (14): Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, ChatProviderCooldownService, Injectable, ConsoleLoggerAdapter (+6 more)

### Community 22 - "configuration.ts"
Cohesion: 0.06
Nodes (48): CliValidateOptions, normalizeGatewayConfigForWrite(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, collectInactiveProviderWarnings() (+40 more)

### Community 23 - "UserRepository"
Cohesion: 0.07
Nodes (22): BootstrapStatusUseCase, Inject, Injectable, ListUsersUseCase, Inject, Injectable, Inject, ReactivateUserUseCase (+14 more)

### Community 24 - "register-user.use-case.ts"
Cohesion: 0.06
Nodes (36): ActivateAccountOutput, ActivateAccountUseCase, Inject, Injectable, ActivateAccountInput, activateAccountSchema, BootstrapAdminInput, bootstrapAdminSchema (+28 more)

### Community 25 - "cn"
Cohesion: 0.05
Nodes (58): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+50 more)

### Community 26 - "types/index.ts"
Cohesion: 0.19
Nodes (21): CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId(), isFiniteNumber(), isMaxAttempts() (+13 more)

### Community 27 - "chat-completions.adapter.ts"
Cohesion: 0.21
Nodes (19): toHttpException(), asSystemFingerprint(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText() (+11 more)

### Community 28 - "DomainException"
Cohesion: 0.09
Nodes (33): AcceptInviteResult, acceptInviteSchema, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds() (+25 more)

### Community 29 - "account-action-dialog.tsx"
Cohesion: 0.19
Nodes (19): deleteUser(), fetchUsers(), GUEST_HAS_ACTIVE_RUN, parseOkBody(), reactivateUser(), UsersPageQuery, parseUserList(), parseUserListItem() (+11 more)

### Community 30 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 31 - "responses.adapter.ts"
Cohesion: 0.26
Nodes (16): asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse() (+8 more)

### Community 32 - "company-context.controller.ts"
Cohesion: 0.20
Nodes (14): toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase (+6 more)

### Community 33 - "apiFetch"
Cohesion: 0.07
Nodes (53): activateAccount(), Credentials, fetchBootstrapStatus(), fetchUserSession(), loginWithPassword(), logoutSession(), patchOwnEmail(), parseAuthUserWrapper() (+45 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.06
Nodes (38): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+30 more)

### Community 35 - "GatewayKey"
Cohesion: 0.03
Nodes (68): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+60 more)

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.16
Nodes (20): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CtaItem (+12 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "run-result-view.tsx"
Cohesion: 0.04
Nodes (61): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+53 more)

### Community 39 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (23): isUnservableCachedReply(), CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag() (+15 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.09
Nodes (31): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+23 more)

### Community 41 - "openai-params-provider.mapper.ts"
Cohesion: 0.15
Nodes (18): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+10 more)

### Community 42 - "app/layout.tsx"
Cohesion: 0.13
Nodes (9): metadata, metadata, apps_frontend_src_app_globals, geistMono, inter, metadata, spaceGrotesk, UsersView() (+1 more)

### Community 43 - "ids.ts"
Cohesion: 0.09
Nodes (32): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createFeedbackId() (+24 more)

### Community 44 - "ref_nestjs_common"
Cohesion: 0.05
Nodes (51): ChatModule, Module, ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId (+43 more)

### Community 45 - "semantic-cache.service.ts"
Cohesion: 0.07
Nodes (31): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName() (+23 more)

### Community 46 - "save-output-edited.use-case.ts"
Cohesion: 0.06
Nodes (42): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+34 more)

### Community 47 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 48 - "export-openapi.ts"
Cohesion: 0.09
Nodes (26): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+18 more)

### Community 49 - "anthropic-response.mapper.ts"
Cohesion: 0.13
Nodes (26): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+18 more)

### Community 50 - "prisma-account-activation.adapter.ts"
Cohesion: 0.18
Nodes (9): AccountActivationRecord, CreatePendingUser, RotateActivationTokenInput, ActivationRow, PrismaAccountActivationAdapter, Injectable, UserRow, packages_shared_dist_index_createuserid (+1 more)

### Community 51 - "openai-chat-completions.controller.ts"
Cohesion: 0.17
Nodes (21): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional (+13 more)

### Community 52 - "UsersController"
Cohesion: 0.14
Nodes (15): PatchUserDto, ApiProperty, IsBoolean, ApiCookieAuth, ApiTags, Body, Controller, Delete (+7 more)

### Community 53 - "RedisConnectionService"
Cohesion: 0.22
Nodes (5): RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 54 - "content.graph.ts"
Cohesion: 0.06
Nodes (55): ContentPipelineFacade, toOutcome(), Inject, Injectable, Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput (+47 more)

### Community 55 - "exitWithAgentReport"
Cohesion: 0.10
Nodes (17): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+9 more)

### Community 56 - "should-include-redis-stack.ts"
Cohesion: 0.10
Nodes (23): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+15 more)

### Community 57 - "archive-runs-view.tsx"
Cohesion: 0.05
Nodes (45): metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, PAGE_OUTLINE_ROLE_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, fetchArchiveRuns(), fetchInitiatorOptions() (+37 more)

### Community 58 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (26): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+18 more)

### Community 59 - "llm-gateway.http.adapter.ts"
Cohesion: 0.10
Nodes (25): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+17 more)

### Community 60 - "ClientId"
Cohesion: 0.26
Nodes (5): ClientId, Express, Request, ActiveStreamsTracker, Injectable

### Community 61 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (33): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+25 more)

### Community 62 - "HealthService"
Cohesion: 0.12
Nodes (12): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto (+4 more)

### Community 63 - "public-config.controller.ts"
Cohesion: 0.18
Nodes (9): PublicConfigController, PublicConfigResponse, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, PublicConfigModule (+1 more)

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.08
Nodes (31): ApiAnthropicErrorResponses(), ApiRequestIdHeader(), HealthLivenessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags (+23 more)

### Community 65 - "RefreshSessionRepository"
Cohesion: 0.08
Nodes (15): BootstrapAdminUseCase, Inject, Injectable, LoginUseCase, Inject, Injectable, Inject, RefreshUseCase (+7 more)

### Community 66 - ".getMetrics"
Cohesion: 0.29
Nodes (4): ApiOperation, ApiResponse, Get, Header

### Community 67 - "metrics.ts"
Cohesion: 0.11
Nodes (23): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias() (+15 more)

### Community 68 - ".execute"
Cohesion: 0.09
Nodes (11): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StubRunExecutor, Injectable, makeContentRun(), makeSocialRun(), makeSocialSnapshot() (+3 more)

### Community 69 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 70 - "openai-messages-provider.mapper.ts"
Cohesion: 0.27
Nodes (7): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 71 - "google-tools.mapper.ts"
Cohesion: 0.15
Nodes (27): toCachedChatResponse(), asInputTokens(), asOutputTokens(), getUsageMetadata(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason() (+19 more)

### Community 72 - "home-entry.tsx"
Cohesion: 0.09
Nodes (26): ACTIVATION_FAILED_HINT, resendActivation(), AuthMode, AuthUi, GuestSurface, HomeEntry(), initialAuth, initialState (+18 more)

### Community 73 - "api/src/app.module.ts"
Cohesion: 0.05
Nodes (52): CompanyContextModule, Module, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Injectable, ContentModule, Module (+44 more)

### Community 74 - "logging.service.ts"
Cohesion: 0.06
Nodes (24): LEVEL_ORDER, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable, SentryErrorReportingAdapter, Injectable (+16 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "guest.guard.ts"
Cohesion: 0.06
Nodes (29): HealthModule, Module, HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController (+21 more)

### Community 77 - "VectorStore"
Cohesion: 0.22
Nodes (3): VectorStore, Inject, Optional

### Community 78 - "start-run-form.tsx"
Cohesion: 0.05
Nodes (85): bootstrapAdmin(), registerAccount(), AccountEmailFormState, AuthModal(), AuthModalProps, descriptionFor(), titleFor(), BootstrapAdminForm() (+77 more)

### Community 79 - "CompanyContextController"
Cohesion: 0.29
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 80 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 81 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 82 - "user-invited.template.ts"
Cohesion: 0.11
Nodes (33): TransactionalMail, UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments(), escapeHtml() (+25 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "run-details-view.tsx"
Cohesion: 0.07
Nodes (49): metadata, useSession(), useGuestLocked(), assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef (+41 more)

### Community 85 - ".create"
Cohesion: 0.40
Nodes (4): InviteUserDto, ApiProperty, IsEmail, Body

### Community 86 - "GuestGuard"
Cohesion: 0.40
Nodes (3): GuestGuard, Inject, Injectable

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ProviderEditCommand"
Cohesion: 0.33
Nodes (3): ProviderEditCommand, Command, Option

### Community 89 - "new-ids.ts"
Cohesion: 0.13
Nodes (12): ErrorEnvelope, Express, Request, HttpExceptionFilter, Catch, newAccountActivationId(), newInvitationId(), newRequestId() (+4 more)

### Community 90 - "CompanyContextRepository"
Cohesion: 0.18
Nodes (5): Inject, Inject, Inject, Inject, CompanyContextRepository

### Community 91 - "ModelAlias"
Cohesion: 0.04
Nodes (39): ProviderTestOptions, CliAiModel, HttpMetricsMiddleware, Injectable, ModelAlias, ProviderInstanceId, MissingProviderBaseUrl, HealthCheckResult (+31 more)

### Community 92 - "KeyGenerateCommand"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 93 - "social.types.ts"
Cohesion: 0.12
Nodes (39): loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType (+31 more)

### Community 96 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "packages_shared_dist_index_userid"
Cohesion: 0.06
Nodes (24): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, FEEDBACK_PURGE, FeedbackPurgePort, PrismaFeedbackPurgeAdapter, Injectable (+16 more)

### Community 99 - "ClientRemoveCommand"
Cohesion: 0.33
Nodes (3): ClientRemoveCommand, Command, Option

### Community 100 - "StartRunDto"
Cohesion: 0.22
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 101 - "GatewayConfig"
Cohesion: 0.09
Nodes (15): ClientManagerService, Injectable, ConfigPersistenceService, Injectable, EnvPatchService, Injectable, ProviderManagerService, Injectable (+7 more)

### Community 102 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 103 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 104 - "openai-models.controller.ts"
Cohesion: 0.10
Nodes (25): ApiOpenAiErrorResponses(), OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse (+17 more)

### Community 105 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (12): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+4 more)

### Community 106 - "ref_nestjs_swagger"
Cohesion: 0.04
Nodes (74): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+66 more)

### Community 109 - "response-cache.service.ts"
Cohesion: 0.10
Nodes (17): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, CacheModule, CacheModuleOptions (+9 more)

### Community 110 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 112 - "src/pagination.ts"
Cohesion: 0.29
Nodes (5): DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, PageSize, PaginatedList

### Community 113 - "CompanyContext"
Cohesion: 0.18
Nodes (10): assertAudienceProfileNamesUnique(), CompanyContext, CompanyContextWriteDetail, normalizeAudienceName(), withEffectiveAudience(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter (+2 more)

### Community 114 - "ModelRemoveCommand"
Cohesion: 0.33
Nodes (3): ModelRemoveCommand, Command, Option

### Community 117 - "ModelEditCommand"
Cohesion: 0.33
Nodes (3): ModelEditCommand, Command, Option

### Community 118 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 120 - "auth.controller.ts"
Cohesion: 0.06
Nodes (45): LogoutUseCase, Injectable, MeUseCase, Injectable, AuthController, ApiCookieAuth, ApiTags, Body (+37 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand.ts"
Cohesion: 0.33
Nodes (3): unbrand, RunTaskType, RunsSummaryResponse

### Community 127 - "GlobalExceptionFilter"
Cohesion: 0.38
Nodes (3): GlobalExceptionFilter, Catch, Injectable

## Knowledge Gaps
- **497 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+492 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1305 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Env` connect `auth.module.ts` to `RefreshSessionRepository`, `runs.controller.ts`, `packages_shared_dist_index`, `api/src/app.module.ts`, `GuestQuotaPort`, `guest.guard.ts`, `auth.controller.ts`, `save-output-edited.use-case.ts`, `InMemoryRunSseHub`, `export-openapi.ts`, `user-invited.template.ts`, `GuestGuard`, `register-user.use-case.ts`, `api/src/health/health.service.ts`, `llm-gateway.http.adapter.ts`, `DomainException`, `public-config.controller.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `DomainException` connect `DomainException` to `auth.module.ts`, `runs.controller.ts`, `create-feedback.use-case.ts`, `packages_shared_dist_index`, `GuestQuotaPort`, `prisma-run.adapter.ts`, `UserRepository`, `register-user.use-case.ts`, `prisma-invitation.adapter.ts`, `company-context.controller.ts`, `save-output-edited.use-case.ts`, `prisma-account-activation.adapter.ts`, `.execute`, `api/src/app.module.ts`, `guest.guard.ts`, `new-ids.ts`, `packages_shared_dist_index_userid`, `CompanyContext`, `auth.controller.ts`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `prisma-run.adapter.ts`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _497 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `auth.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04417773237997957 - nodes in this community are weakly interconnected._
- **Should `SocialResultStore` be split into smaller, more focused modules?**
  _Cohesion score 0.051462904911180773 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.048733874820831344 - nodes in this community are weakly interconnected._
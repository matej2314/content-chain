# Graph Report - content-chain  (2026-10-19)

## Corpus Check
- 715 files · ~255,098 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4759 nodes · 15447 edges · 127 communities (115 shown, 11 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 421 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f662c284`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DomainException
- packages_shared_dist_index_runid
- company-context-form.tsx
- EnvRef
- asProviderInstanceId
- GatewayKey
- envelope.ts
- logging.module.ts
- packages_shared_dist_index
- anthropic/anthropic-tools.mapper.ts
- runs.types.ts
- auth.module.ts
- run-details-view.tsx
- prisma-run.adapter.ts
- cn
- provider-error.mapper.ts
- button.tsx
- branded.types.ts
- exitWithAgentReport
- cancel-run-dialog.tsx
- types/index.ts
- LoggingService
- configuration.ts
- UserRepository
- redis-vector-store.adapter.ts
- feedback-form.tsx
- GatewayConfig
- resilient-executor.ts
- create-feedback.use-case.ts
- ref_express
- prisma-account-activation.adapter.ts
- semantic-cache.constants.ts
- company-context.controller.ts
- GlobalExceptionFilter
- AnthropicMessagesRequestDto
- ref_nestjs_common
- domain/company-context.types.ts
- enums.ts
- runs-result.types.ts
- semantic-cache.service.ts
- sentry-ai-metrics.adapter.ts
- responses.adapter.ts
- anthropic.module.ts
- ids.ts
- Env
- metrics.ts
- save-output-edited.use-case.ts
- .execute
- export-openapi.ts
- anthropic-response.mapper.ts
- accept-invite-form.tsx
- health.api.ts
- anthropic-messages.controller.ts
- SmartRateLimiterService
- content.graph.ts
- CompanyContext
- company-context.mapper.ts
- start-run-form.tsx
- ref_nestjs_swagger
- llm-gateway.http.adapter.ts
- CurrentUser
- OpenAiChatCompletionRequestDto
- HealthService
- RunRepository
- .getOne
- ClientEditCommand
- http-metrics.interceptor.ts
- RedisConnectionService
- RefreshSessionRepository
- .getOne
- ClientAddCommand
- .chat
- packages_shared_dist_index_userid
- api/src/app.module.ts
- InMemoryRunSseHub
- parse-verifier-log-message.ts
- llm-hop.ts
- api/src/health/health.service.ts
- archive-runs-view.tsx
- CompanyContextController
- PrometheusService
- openai-models.controller.ts
- anthropic-models.controller.ts
- SPEC — README
- llm-gateway-chat.log.ts
- InvitationsController
- EnvironmentVariables
- company-context.dto.ts
- ProviderEditCommand
- ClientRemoveCommand
- config-generator.service.ts
- ModelAlias
- cli.module.ts
- social.graph.ts
- MetricsService
- route.ts
- ProviderRemoveCommand
- provider-registry.service.ts
- api/src/main.ts
- GatewayModelsCatalogService
- ProviderAddCommand
- .getOne
- should-include-redis-stack.ts
- cache.module.ts
- ref_react
- ModelRemoveCommand
- ModelAddCommand
- ConfigValidateCommand
- ModelEditCommand
- guest.guard.ts
- ai-provider-gateway/src/app.module.ts
- RolesGuard
- new-ids.ts
- PublicConfigController
- Architektura
- brand.ts
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
10. `GatewayKey` - 59 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `ProviderTestOptions` --references--> `ProviderInstanceId`  [EXTRACTED]
  apps/ai-provider-gateway/src/cli/commands/provider/provider-test.command.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `send()` --calls--> `submitHitl()`  [EXTRACTED]
  apps/frontend/src/modules/runs/components/hitl-panel.tsx → apps/frontend/src/modules/runs/api/runs.api.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (127 total, 11 thin omitted)

### Community 0 - "DomainException"
Cohesion: 0.06
Nodes (64): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable, comparePassword() (+56 more)

### Community 1 - "packages_shared_dist_index_runid"
Cohesion: 0.06
Nodes (27): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore (+19 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.05
Nodes (71): metadata, putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+63 more)

### Community 3 - "EnvRef"
Cohesion: 0.08
Nodes (15): ConfigSecretsStatusCommand, Command, Option, KeyGenerateCommand, Command, Option, ClientManagerService, Injectable (+7 more)

### Community 4 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (53): assertInteractiveAllowed(), WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema (+45 more)

### Community 5 - "GatewayKey"
Cohesion: 0.06
Nodes (39): ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+31 more)

### Community 6 - "envelope.ts"
Cohesion: 0.07
Nodes (52): bootstrapAdmin(), Credentials, fetchUserSession(), loginWithPassword(), patchOwnEmail(), registerAccount(), resendActivation(), parseAuthUserWrapper() (+44 more)

### Community 7 - "logging.module.ts"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 8 - "packages_shared_dist_index"
Cohesion: 0.03
Nodes (92): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Injectable, GetRunLogsOutput, GetRunLogsUseCase, Inject (+84 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.06
Nodes (69): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens() (+61 more)

### Community 10 - "runs.types.ts"
Cohesion: 0.05
Nodes (85): metadata, ArchiveRunsQuery, fetchInitiatorOptions(), fetchRunLogs(), fetchRunsSummary(), fetchUserRuns(), finalizeRunReview(), isUserRating() (+77 more)

### Community 11 - "auth.module.ts"
Cohesion: 0.06
Nodes (47): InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase, Inject (+39 more)

### Community 12 - "run-details-view.tsx"
Cohesion: 0.06
Nodes (47): metadata, useSession(), useGuestLocked(), RUN_PLATFORM_LABELS, RUN_TASK_TYPE_LABELS, fetchRunSnapshot(), isCancelableRunStatus(), isLiveRunStatus() (+39 more)

### Community 13 - "prisma-run.adapter.ts"
Cohesion: 0.08
Nodes (15): LightRunItem, ListRunsResult, RunSnapshot, RunSummaryAggregate, RunSummaryScope, RunLogEntry, ALLOWED_RUN_STATES, assertTransition() (+7 more)

### Community 14 - "cn"
Cohesion: 0.05
Nodes (50): RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RunLiveHero(), RunLiveHeroProps, RunStatusView(), RunStatusViewProps, STATUS_PILL, AppHeader() (+42 more)

### Community 15 - "provider-error.mapper.ts"
Cohesion: 0.17
Nodes (20): ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError() (+12 more)

### Community 16 - "button.tsx"
Cohesion: 0.08
Nodes (41): logoutSession(), AuthModal(), AuthModalProps, AuthMode, descriptionFor(), titleFor(), RegisterSuccess, GuestLimitModal() (+33 more)

### Community 17 - "branded.types.ts"
Cohesion: 0.07
Nodes (62): SemanticStoreEmbedState, CachedChatResponse, CachedChatWarning, CachedFinishReason, CacheIdentityMessage, ChatCacheSource, CachedChatResponseWithConversation, ChatResponseData (+54 more)

### Community 18 - "exitWithAgentReport"
Cohesion: 0.12
Nodes (17): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), CliModeFlags, markAgentRuntime(), resolveCliMode(), toSafeClientList() (+9 more)

### Community 19 - "cancel-run-dialog.tsx"
Cohesion: 0.07
Nodes (36): ACTIVATION_FAILED_HINT, activateAccount(), fetchBootstrapStatus(), AuthUi, GuestSurface, HomeEntry(), HomeEntryInner(), initialAuth (+28 more)

### Community 20 - "types/index.ts"
Cohesion: 0.08
Nodes (41): REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, CliRateLimit, GatewayClient, ClientBasicAnswers, ClientPromptResult, RateLimitAnswers (+33 more)

### Community 21 - "LoggingService"
Cohesion: 0.07
Nodes (16): Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, Inject, Optional, LogContext (+8 more)

### Community 22 - "configuration.ts"
Cohesion: 0.06
Nodes (45): isRedisRequired(), CliGatewayValidatorService, CliValidateOptions, Injectable, normalizeGatewayConfigForWrite(), ValidationFormatter, asPort(), asSemanticCacheTtlSeconds() (+37 more)

### Community 23 - "UserRepository"
Cohesion: 0.06
Nodes (27): BootstrapStatusUseCase, Inject, Injectable, ListUsersUseCase, Inject, Injectable, MeUseCase, Inject (+19 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.11
Nodes (22): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+14 more)

### Community 25 - "feedback-form.tsx"
Cohesion: 0.10
Nodes (29): ParseRunIdPipe, Injectable, createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX (+21 more)

### Community 26 - "GatewayConfig"
Cohesion: 0.08
Nodes (46): isRedisSearchTagSafeId(), DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertClient(), convertRateLimit() (+38 more)

### Community 27 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 28 - "create-feedback.use-case.ts"
Cohesion: 0.08
Nodes (27): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+19 more)

### Community 29 - "ref_express"
Cohesion: 0.13
Nodes (18): readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId() (+10 more)

### Community 30 - "prisma-account-activation.adapter.ts"
Cohesion: 0.08
Nodes (13): Inject, Inject, SoftEmailRateLimiter, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput, ActivationRow (+5 more)

### Community 31 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 32 - "company-context.controller.ts"
Cohesion: 0.14
Nodes (14): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+6 more)

### Community 33 - "GlobalExceptionFilter"
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "ref_nestjs_common"
Cohesion: 0.06
Nodes (43): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+35 more)

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.12
Nodes (25): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+17 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "runs-result.types.ts"
Cohesion: 0.03
Nodes (87): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+79 more)

### Community 39 - "semantic-cache.service.ts"
Cohesion: 0.14
Nodes (17): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), SemanticCacheModule (+9 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (26): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+18 more)

### Community 41 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (67): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, toHttpException(), asSystemFingerprint(), asToolCallId(), asWarningCode(), ProviderAssistantTurn, ProviderChatTurn (+59 more)

### Community 42 - "anthropic.module.ts"
Cohesion: 0.14
Nodes (12): ChatModule, Module, AnthropicModule, Module, OpenAiExceptionFilter, Catch, OpenAiBearerAuthGuard, Injectable (+4 more)

### Community 43 - "ids.ts"
Cohesion: 0.09
Nodes (32): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createFeedbackId() (+24 more)

### Community 44 - "Env"
Cohesion: 0.05
Nodes (39): Inject, readSmtpConfig(), SmtpConfig, Inject, readCookie(), isRecord(), JwtCookieStrategy, Inject (+31 more)

### Community 45 - "metrics.ts"
Cohesion: 0.07
Nodes (38): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+30 more)

### Community 46 - "save-output-edited.use-case.ts"
Cohesion: 0.10
Nodes (27): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+19 more)

### Community 47 - ".execute"
Cohesion: 0.31
Nodes (9): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, newConversationId() (+1 more)

### Community 48 - "export-openapi.ts"
Cohesion: 0.12
Nodes (17): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+9 more)

### Community 49 - "anthropic-response.mapper.ts"
Cohesion: 0.06
Nodes (52): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDoneEvent, fromGatewayToolCallDto() (+44 more)

### Community 50 - "accept-invite-form.tsx"
Cohesion: 0.07
Nodes (39): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+31 more)

### Community 51 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 52 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (72): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+64 more)

### Community 53 - "SmartRateLimiterService"
Cohesion: 0.11
Nodes (12): StreamCleanupInterceptor, Injectable, AnthropicMessagesController, ApiSecurity, ApiTags, Controller, OpenAiChatCompletionsController, ApiSecurity (+4 more)

### Community 54 - "content.graph.ts"
Cohesion: 0.06
Nodes (56): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+48 more)

### Community 55 - "CompanyContext"
Cohesion: 0.27
Nodes (9): toPublicCompanyContext(), assertAudienceProfileNamesUnique(), assertCompanyContextWritable(), PartialCompanyContext, CompanyContext, isComplete(), mergeCompanyContext(), normalizeAudienceName() (+1 more)

### Community 56 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 57 - "start-run-form.tsx"
Cohesion: 0.07
Nodes (39): metadata, apps_frontend_src_app_globals, geistMono, inter, metadata, spaceGrotesk, fetchCompanyContext(), GUEST_ALLOWED_TASK_TYPES (+31 more)

### Community 58 - "ref_nestjs_swagger"
Cohesion: 0.04
Nodes (66): ChatOutputTextDto, ApiProperty, ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional (+58 more)

### Community 59 - "llm-gateway.http.adapter.ts"
Cohesion: 0.20
Nodes (10): GatewayChatResponse, GatewayErrorBody, RETRYABLE_CODES, LlmGatewayPort, LlmChatCommand, LlmChatResult, Inject, packages_shared_dist_index_createrequestid (+2 more)

### Community 60 - "CurrentUser"
Cohesion: 0.05
Nodes (51): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+43 more)

### Community 61 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.08
Nodes (27): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+19 more)

### Community 62 - "HealthService"
Cohesion: 0.09
Nodes (18): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto (+10 more)

### Community 63 - "RunRepository"
Cohesion: 0.04
Nodes (20): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, Inject, Inject, InProcessRunWorker, Inject, Injectable (+12 more)

### Community 64 - ".getOne"
Cohesion: 0.18
Nodes (11): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+3 more)

### Community 65 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 66 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 67 - "RedisConnectionService"
Cohesion: 0.27
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 68 - "RefreshSessionRepository"
Cohesion: 0.11
Nodes (9): Inject, Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter (+1 more)

### Community 69 - ".getOne"
Cohesion: 0.19
Nodes (10): ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 70 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 71 - ".chat"
Cohesion: 0.19
Nodes (6): buildGatewayChatErrorLog(), LlmGatewayHttpAdapter, Inject, Injectable, GATEWAY_ERROR_CODE_LABELS, toGatewayErrorCodeLabel()

### Community 72 - "packages_shared_dist_index_userid"
Cohesion: 0.06
Nodes (24): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, FEEDBACK_PURGE, FeedbackPurgePort, PrismaFeedbackPurgeAdapter, Injectable (+16 more)

### Community 73 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (56): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Inject, Injectable, ContentRunExecutor, isCanonicalOutlineSelection() (+48 more)

### Community 74 - "InMemoryRunSseHub"
Cohesion: 0.39
Nodes (3): RunSseEvent, InMemoryRunSseHub, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "llm-hop.ts"
Cohesion: 0.16
Nodes (13): LLM_GATEWAY_PORT, isRetryable(), RetryReason, ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid() (+5 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (26): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+18 more)

### Community 78 - "archive-runs-view.tsx"
Cohesion: 0.07
Nodes (29): RunRecordBase, LightRunRow, toPipelinePhase(), RunSnapshotBase, toRunSnapshotBase(), toSelectedIdeaIds(), metadata, CONTENT_KIND_LABELS (+21 more)

### Community 79 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 80 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 81 - "openai-models.controller.ts"
Cohesion: 0.27
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 82 - "anthropic-models.controller.ts"
Cohesion: 0.33
Nodes (8): AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic(), mapGatewayModelToAnthropic(), toDisplayName(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "llm-gateway-chat.log.ts"
Cohesion: 0.24
Nodes (10): buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmChatMessage, LlmChatParams (+2 more)

### Community 85 - "InvitationsController"
Cohesion: 0.06
Nodes (28): InviteUserDto, ApiProperty, IsEmail, PatchUserDto, ApiProperty, IsBoolean, InvitationsController, ApiCookieAuth (+20 more)

### Community 86 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 89 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 90 - "config-generator.service.ts"
Cohesion: 0.11
Nodes (16): WizardState, ConfigGeneratorService, Injectable, ConfigPersistenceService, Injectable, FileManagerService, Injectable, ServerConfigPromptResult (+8 more)

### Community 91 - "ModelAlias"
Cohesion: 0.03
Nodes (40): HttpMetricsMiddleware, Injectable, ModelAlias, ProviderInstanceId, HealthCheckResult, HealthRedisCheckResult, NoopAppMetricsAdapter, Injectable (+32 more)

### Community 92 - "cli.module.ts"
Cohesion: 0.05
Nodes (71): AgentReport, AgentReportStatus, PendingSecretsItem, collectPendingSecrets(), assertAgentHasAnswers(), CliMode, CliModule, Module (+63 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.08
Nodes (49): coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput, IdeasOutput, ideasOutputSchema, isPlainRecord(), readNonEmptyString() (+41 more)

### Community 94 - "MetricsService"
Cohesion: 0.22
Nodes (6): MetricsController, Controller, Get, Res, MetricsService, Injectable

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 99 - "provider-registry.service.ts"
Cohesion: 0.08
Nodes (28): ProviderTestCommand, Command, Option, CliAiProvider, ProviderTestService, Injectable, ProviderCli, AddProviderInput (+20 more)

### Community 101 - "api/src/main.ts"
Cohesion: 0.21
Nodes (10): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig(), ref_cookie_parser, ref_helmet (+2 more)

### Community 102 - "GatewayModelsCatalogService"
Cohesion: 0.21
Nodes (8): GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto, ApiProperty, GatewayModelsCatalogService, Injectable

### Community 103 - "ProviderAddCommand"
Cohesion: 0.31
Nodes (3): ProviderAddCommand, Command, Option

### Community 105 - ".getOne"
Cohesion: 0.18
Nodes (11): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+3 more)

### Community 107 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (11): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+3 more)

### Community 109 - "cache.module.ts"
Cohesion: 0.09
Nodes (19): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+11 more)

### Community 111 - "ref_react"
Cohesion: 0.10
Nodes (31): fetchCompleteness(), CompletenessState, GATE_SECTION_LABELS, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE (+23 more)

### Community 114 - "ModelRemoveCommand"
Cohesion: 0.33
Nodes (3): ModelRemoveCommand, Command, Option

### Community 115 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 116 - "ConfigValidateCommand"
Cohesion: 0.40
Nodes (3): ConfigValidateCommand, Command, Option

### Community 117 - "ModelEditCommand"
Cohesion: 0.33
Nodes (3): ModelEditCommand, Command, Option

### Community 118 - "guest.guard.ts"
Cohesion: 0.19
Nodes (7): ALLOW_GUEST_KEY, IS_PUBLIC_KEY, GuestGuard, Injectable, JwtAuthGuard, Injectable, ref_nestjs_core

### Community 119 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.08
Nodes (24): RequestIdMiddleware, Injectable, HealthModule, Module, IntegrationsModule, Module, AiMetricsModule, Global (+16 more)

### Community 121 - "new-ids.ts"
Cohesion: 0.18
Nodes (8): ErrorEnvelope, HttpExceptionFilter, Catch, newInvitationId(), newRequestId(), packages_shared_dist_index_accountactivationid, packages_shared_dist_index_createaccountactivationid, packages_shared_dist_index_requestid

### Community 123 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand.ts"
Cohesion: 0.33
Nodes (3): unbrand, RunTaskType, RunsSummaryResponse

## Knowledge Gaps
- **482 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+477 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1287 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `isRunId()` connect `ids.ts` to `packages_shared_dist_index`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `AuthUserContext` connect `packages_shared_dist_index` to `DomainException`, `ref_nestjs_common`, `packages_shared_dist_index_userid`, `auth.module.ts`, `Env`, `CurrentUser`, `save-output-edited.use-case.ts`, `.execute`, `InvitationsController`, `guest.guard.ts`, `UserRepository`, `create-feedback.use-case.ts`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _482 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DomainException` be split into smaller, more focused modules?**
  _Cohesion score 0.05757575757575758 - nodes in this community are weakly interconnected._
- **Should `packages_shared_dist_index_runid` be split into smaller, more focused modules?**
  _Cohesion score 0.05750350631136045 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05364314400458979 - nodes in this community are weakly interconnected._
- **Should `EnvRef` be split into smaller, more focused modules?**
  _Cohesion score 0.07712765957446809 - nodes in this community are weakly interconnected._
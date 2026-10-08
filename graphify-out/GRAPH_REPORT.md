# Graph Report - content-chain  (2026-10-08)

## Corpus Check
- 693 files · ~229,010 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4480 nodes · 13825 edges · 143 communities (128 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 418 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `18d33854`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- runs-result.types.ts
- social.types.ts
- api/company-context.types.ts
- anthropic/anthropic-tools.mapper.ts
- wizard-orchestrator.service.ts
- run-details-view.tsx
- api-error.code.ts
- LogContext
- responses.adapter.ts
- cli.module.ts
- getAppConfig
- RefreshSessionRepository
- social.graph.ts
- RunRepository
- InvitationsController
- chat-params.dto.ts
- PrometheusAppMetricsAdapter
- ChatRequestDto
- run-review-panel.tsx
- apiFetch
- AuthController
- resilient-executor.ts
- register-form.tsx
- rate-run.use-case.ts
- redis-vector-store.adapter.ts
- openai-params-provider.mapper.ts
- VectorStore
- start-run-form.tsx
- swagger.setup.ts
- FileManagerService
- auth.module.ts
- HealthService
- ai-provider-gateway/src/main.ts
- response-cache.service.ts
- AnthropicMessagesRequestDto
- anthropic-response.mapper.ts
- runs.types.ts
- enums.ts
- feedback-form.tsx
- anthropic-messages.controller.ts
- sentry-ai-metrics.adapter.ts
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- LoggingService
- ConfigInitCommand
- DomainException
- runs.controller.ts
- run.types.ts
- isRecord
- ListRunsQueryDto
- ModelAlias
- types/index.ts
- exitWithAgentReport
- RunRecord
- users.controller.ts
- content.graph.ts
- domain/company-context.types.ts
- start-run.use-case.ts
- health-readiness-response.dto.ts
- provider-registry.service.ts
- ai-provider-gateway/src/health/health.service.ts
- guest.guard.ts
- app-metrics.service.ts
- api/src/app.module.ts
- ModelRemoveCommand
- ChatToolingDto
- provider-manager.service.ts
- OpenAiChatCompletionRequestDto
- http/http-exception.filter.ts
- HealthController
- llm-hop.ts
- openai-stream.mapper.ts
- .getOne
- ClientEditCommand
- parse-verifier-log-message.ts
- company-context.mapper.ts
- api/src/health/health.service.ts
- .getOne
- llm-gateway.http.adapter.ts
- PrometheusService
- .getOne
- ModelEditCommand
- SPEC — README
- UsersController
- ChatMessageDto
- asProviderInstanceId
- company-context.dto.ts
- model-prompt.service.ts
- ProviderRemoveCommand
- EnvironmentVariables
- ChatParamsDto
- openai-chat-completions.controller.ts
- KeyGenerateCommand
- PrismaService
- StartRunDto
- branded.types.ts
- route.ts
- OpenAiChatMessageDto
- HttpExceptionFilter
- CompanyContextController
- save-output-edited.use-case.ts
- filters/http-exception.filter.ts
- ProviderAddCommand
- ProviderEditCommand
- openai-chat-completion-response.dto.ts
- AuthUserContext
- ClientAddCommand
- UserRepository
- JwtAuthGuard
- chat.service.ts
- GatewayModelsCatalogService
- isRedisRequiredFromConfig
- AutoFinalizeExpiredReviewsUseCase
- cn
- patch-company-context.use-case.ts
- HitlDto
- CompanyContextRepository
- prisma-invitation.adapter.ts
- PatchRunRatingDto
- CompanyContext
- ClientRemoveCommand
- AppMetricsService
- Architektura
- brand
- configuration.ts
- event-source-registry-provider.tsx
- ai-provider-gateway/src/app.module.ts
- anthropic-models.controller.ts
- openai-chat-message.dto.ts
- models.controller.ts
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
- openai-chat-completion-request.dto.ts

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `ProviderInstanceId` - 81 edges
3. `DomainException` - 81 edges
4. `LoggingService` - 73 edges
5. `asProviderInstanceId()` - 67 edges
6. `GatewayConfig` - 65 edges
7. `isRecord()` - 64 edges
8. `cn()` - 62 edges
9. `GatewayKey` - 59 edges
10. `Env` - 59 edges

## Surprising Connections (you probably didn't know these)
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (143 total, 14 thin omitted)

### Community 0 - "runs-result.types.ts"
Cohesion: 0.05
Nodes (53): PAGE_OUTLINE_ROLE_LABELS, submitHitl(), HitlAccepted, isPageOutlineSectionRole(), isReelDuration(), PAGE_OUTLINE_SECTION_ROLES, PageDocument, PageOutline (+45 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (26): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore (+18 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.05
Nodes (82): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+74 more)

### Community 3 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (40): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+32 more)

### Community 4 - "wizard-orchestrator.service.ts"
Cohesion: 0.06
Nodes (64): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+56 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.06
Nodes (51): metadata, metadata, assertNever(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput (+43 more)

### Community 6 - "api-error.code.ts"
Cohesion: 0.17
Nodes (21): ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError() (+13 more)

### Community 7 - "LogContext"
Cohesion: 0.06
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (67): toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), buildGenerationConfig(), createGoogleProvider() (+59 more)

### Community 9 - "cli.module.ts"
Cohesion: 0.06
Nodes (58): AgentReport, AgentReportStatus, PendingSecretsItem, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime() (+50 more)

### Community 10 - "getAppConfig"
Cohesion: 0.10
Nodes (22): ChatModule, Module, readGatewayKeyHeader(), getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicModule (+14 more)

### Community 11 - "RefreshSessionRepository"
Cohesion: 0.10
Nodes (9): Inject, Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter (+1 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.12
Nodes (33): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine() (+25 more)

### Community 13 - "RunRepository"
Cohesion: 0.06
Nodes (10): Inject, Inject, Inject, Inject, Inject, Inject, Inject, Inject (+2 more)

### Community 14 - "InvitationsController"
Cohesion: 0.13
Nodes (12): ListInvitationsUseCase, Inject, Injectable, InvitationsController, ApiCookieAuth, ApiTags, Controller, Delete (+4 more)

### Community 15 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 16 - "PrometheusAppMetricsAdapter"
Cohesion: 0.11
Nodes (4): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppTokenUsage

### Community 17 - "ChatRequestDto"
Cohesion: 0.09
Nodes (22): ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsObject, IsOptional (+14 more)

### Community 18 - "run-review-panel.tsx"
Cohesion: 0.08
Nodes (39): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+31 more)

### Community 19 - "apiFetch"
Cohesion: 0.08
Nodes (40): metadata, fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive() (+32 more)

### Community 20 - "AuthController"
Cohesion: 0.04
Nodes (48): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+40 more)

### Community 21 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 22 - "register-form.tsx"
Cohesion: 0.10
Nodes (27): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+19 more)

### Community 23 - "rate-run.use-case.ts"
Cohesion: 0.10
Nodes (15): ratingSchema, assertRunReviewable(), ReviewWindowParams, GUEST_QUOTA, GuestQuotaAdmitResult, GuestQuotaPort, computeReviewExpiresAt(), isReviewWindowOpen() (+7 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.08
Nodes (28): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, EmbeddingCircuitBreaker, escapeRedisSearchTag(), normalizeEmbeddingModelForIndex(), semanticIndexName() (+20 more)

### Community 25 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 26 - "VectorStore"
Cohesion: 0.12
Nodes (5): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, VectorStore

### Community 27 - "start-run-form.tsx"
Cohesion: 0.10
Nodes (34): logoutSession(), GuestLimitModal(), GuestLimitModalProps, GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact (+26 more)

### Community 28 - "swagger.setup.ts"
Cohesion: 0.08
Nodes (30): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+22 more)

### Community 29 - "FileManagerService"
Cohesion: 0.08
Nodes (15): ConfigValidateCommand, Command, Option, ModelAddCommand, Command, Option, CliGatewayValidatorService, Injectable (+7 more)

### Community 30 - "auth.module.ts"
Cohesion: 0.06
Nodes (46): InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, RESEND_ACTIVATION_RATE_LIMITER, ResendActivationOutput, SUCCESS (+38 more)

### Community 31 - "HealthService"
Cohesion: 0.17
Nodes (5): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthService, Injectable

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "response-cache.service.ts"
Cohesion: 0.08
Nodes (25): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+17 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "anthropic-response.mapper.ts"
Cohesion: 0.21
Nodes (15): AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto, AnthropicThinkingContentBlockDto, AnthropicToolUseContentBlockDto, ApiProperty (+7 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.05
Nodes (63): metadata, filterFeedbackRunOptions(), ArchiveRunsQuery, fetchRunSnapshot(), fetchUserRuns(), InitiatorOption, parseNullableIso(), parseReviewFields() (+55 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.21
Nodes (14): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+6 more)

### Community 39 - "anthropic-messages.controller.ts"
Cohesion: 0.13
Nodes (19): asMessageId(), MessageId, AnthropicMessagesController, ApiSecurity, ApiTags, Controller, AnthropicAuth(), ANTHROPIC_STREAM_API_DESCRIPTION (+11 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.11
Nodes (27): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+19 more)

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.05
Nodes (28): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, socialBriefSchema, socialStartRunSchema (+20 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.21
Nodes (12): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto (+4 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "LoggingService"
Cohesion: 0.06
Nodes (33): RedisConnectionService, Injectable, ChatService, Injectable, ChatErrorHandlerService, Injectable, ChatProviderCooldownService, Injectable (+25 more)

### Community 45 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 46 - "DomainException"
Cohesion: 0.06
Nodes (58): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable, comparePassword() (+50 more)

### Community 47 - "runs.controller.ts"
Cohesion: 0.08
Nodes (43): CancelRunUseCase, Injectable, FinalizeReviewUseCase, Injectable, GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable (+35 more)

### Community 48 - "run.types.ts"
Cohesion: 0.09
Nodes (19): Inject, Inject, RunAbortRegistry, Injectable, RunLifecycleService, TransitionExtras, Inject, Injectable (+11 more)

### Community 49 - "isRecord"
Cohesion: 0.08
Nodes (38): geistMono, geistSans, metadata, ACTIVATION_FAILED_HINT, activateAccount(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+30 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.06
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 52 - "types/index.ts"
Cohesion: 0.09
Nodes (33): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+25 more)

### Community 53 - "exitWithAgentReport"
Cohesion: 0.19
Nodes (8): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList()

### Community 54 - "RunRecord"
Cohesion: 0.13
Nodes (3): InProcessRunWorker, Injectable, RunRecord

### Community 55 - "users.controller.ts"
Cohesion: 0.07
Nodes (26): AppModule, Module, PatchUserDto, ApiProperty, IsBoolean, FeedbackController, ApiCookieAuth, ApiTags (+18 more)

### Community 56 - "content.graph.ts"
Cohesion: 0.08
Nodes (43): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+35 more)

### Community 57 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 58 - "start-run.use-case.ts"
Cohesion: 0.17
Nodes (13): isGuestTaskType(), ParsedStartRunCommand, isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, makeContentRun() (+5 more)

### Community 59 - "health-readiness-response.dto.ts"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 60 - "provider-registry.service.ts"
Cohesion: 0.06
Nodes (35): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias() (+27 more)

### Community 61 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.17
Nodes (12): EMBEDDING_BACKEND, VECTOR_STORE, HealthCheckResult, HealthRedisCheckResult, AppMetricsModule, resolveAppMetricsBackend(), Global, Module (+4 more)

### Community 62 - "guest.guard.ts"
Cohesion: 0.29
Nodes (4): ALLOW_GUEST_KEY, GuestGuard, Inject, Injectable

### Community 63 - "app-metrics.service.ts"
Cohesion: 0.23
Nodes (13): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus (+5 more)

### Community 64 - "api/src/app.module.ts"
Cohesion: 0.05
Nodes (55): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Inject, Injectable (+47 more)

### Community 65 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 66 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 67 - "provider-manager.service.ts"
Cohesion: 0.06
Nodes (52): collectPendingSecrets(), ProviderTestCommand, Command, Option, CliAiProvider, EnvPatchService, EnvPatchValue, Injectable (+44 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "http/http-exception.filter.ts"
Cohesion: 0.32
Nodes (4): ErrorEnvelope, newRequestId(), RequestIdMiddleware, Injectable

### Community 70 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 71 - "llm-hop.ts"
Cohesion: 0.22
Nodes (12): isRetryable(), RetryReason, isAbortError(), ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid() (+4 more)

### Community 72 - "openai-stream.mapper.ts"
Cohesion: 0.28
Nodes (13): SseDoneEvent, fromGatewayToolCallDto(), mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields() (+5 more)

### Community 73 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 74 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - ".getOne"
Cohesion: 0.19
Nodes (10): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.05
Nodes (41): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+33 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - ".getOne"
Cohesion: 0.19
Nodes (10): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 82 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "UsersController"
Cohesion: 0.21
Nodes (10): ApiCookieAuth, ApiTags, Body, Controller, Delete, HttpCode, Param, Patch (+2 more)

### Community 85 - "ChatMessageDto"
Cohesion: 0.18
Nodes (11): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+3 more)

### Community 86 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (40): assertInteractiveAllowed(), DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), ClientManagerService, Injectable (+32 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "model-prompt.service.ts"
Cohesion: 0.31
Nodes (6): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, DEFAULT_MODELS, ModelPromptResult

### Community 89 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 90 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 91 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 92 - "openai-chat-completions.controller.ts"
Cohesion: 0.04
Nodes (60): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+52 more)

### Community 93 - "KeyGenerateCommand"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 94 - "PrismaService"
Cohesion: 0.04
Nodes (40): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+32 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "branded.types.ts"
Cohesion: 0.10
Nodes (42): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, SseMetaPayload, SseMetaPayloadDto, ApiProperty (+34 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 100 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 101 - "save-output-edited.use-case.ts"
Cohesion: 0.06
Nodes (41): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+33 more)

### Community 102 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 105 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 106 - "AuthUserContext"
Cohesion: 0.12
Nodes (20): Body, orderItemsBySelectedIds(), isTerminalStatus(), RunsController, ApiCookieAuth, ApiTags, Body, Controller (+12 more)

### Community 107 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 108 - "UserRepository"
Cohesion: 0.05
Nodes (32): Inject, BootstrapStatusUseCase, Inject, Injectable, ListUsersUseCase, Inject, Injectable, Inject (+24 more)

### Community 109 - "JwtAuthGuard"
Cohesion: 0.40
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 110 - "chat.service.ts"
Cohesion: 0.08
Nodes (36): computeSystemSignature(), hashCallParams(), isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs(), EMBED_NOT_ATTEMPTED, SemanticCacheService, SemanticLookupResult (+28 more)

### Community 113 - "AutoFinalizeExpiredReviewsUseCase"
Cohesion: 0.40
Nodes (3): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable

### Community 114 - "cn"
Cohesion: 0.05
Nodes (54): resendActivation(), RegistrationThankYou(), onResend(), RegistrationThankYouProps, DemoChip(), useDemoMode(), AppHeader(), AppHeaderProps (+46 more)

### Community 115 - "patch-company-context.use-case.ts"
Cohesion: 0.27
Nodes (8): toPublicCompanyContext(), PatchCompanyContextUseCase, Inject, Injectable, assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 116 - "HitlDto"
Cohesion: 0.50
Nodes (3): HitlDto, IsArray, IsString

### Community 117 - "CompanyContextRepository"
Cohesion: 0.21
Nodes (11): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PutCompanyContextUseCase, Inject (+3 more)

### Community 118 - "prisma-invitation.adapter.ts"
Cohesion: 0.10
Nodes (22): Inject, InvitationListItem, RevokeInvitationUseCase, Inject, Injectable, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput (+14 more)

### Community 119 - "PatchRunRatingDto"
Cohesion: 0.50
Nodes (3): PatchRunRatingDto, IsIn, ValidateIf

### Community 121 - "CompanyContext"
Cohesion: 0.23
Nodes (6): CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 122 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 123 - "AppMetricsService"
Cohesion: 0.07
Nodes (12): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable, MetricsController, ApiOperation, ApiResponse (+4 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 126 - "configuration.ts"
Cohesion: 0.07
Nodes (43): CliValidateOptions, normalizeGatewayConfigForWrite(), ValidationFormatter, asSemanticCacheTtlSeconds(), collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions (+35 more)

### Community 127 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

### Community 128 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.06
Nodes (32): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+24 more)

### Community 129 - "anthropic-models.controller.ts"
Cohesion: 0.28
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 130 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 131 - "models.controller.ts"
Cohesion: 0.24
Nodes (9): ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto (+1 more)

## Knowledge Gaps
- **427 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+422 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1202 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `branded.types.ts`, `provider-manager.service.ts`, `wizard-orchestrator.service.ts`, `models.controller.ts`, `api-error.code.ts`, `sentry-ai-metrics.adapter.ts`, `cli.module.ts`, `LoggingService`, `chat.service.ts`, `GatewayModelsCatalogService`, `PrometheusAppMetricsAdapter`, `types/index.ts`, `resilient-executor.ts`, `asProviderInstanceId`, `AppMetricsService`, `provider-registry.service.ts`, `app-metrics.service.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `branded.types.ts`, `provider-manager.service.ts`, `wizard-orchestrator.service.ts`, `models.controller.ts`, `LogContext`, `sentry-ai-metrics.adapter.ts`, `cli.module.ts`, `LoggingService`, `GatewayModelsCatalogService`, `PrometheusAppMetricsAdapter`, `types/index.ts`, `exitWithAgentReport`, `asProviderInstanceId`, `AppMetricsService`, `provider-registry.service.ts`, `configuration.ts`, `app-metrics.service.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `branded.types.ts`, `response-cache.service.ts`, `ai-provider-gateway/src/main.ts`, `anthropic/anthropic-tools.mapper.ts`, `provider-manager.service.ts`, `filters/http-exception.filter.ts`, `LogContext`, `responses.adapter.ts`, `swagger.setup.ts`, `chat.service.ts`, `resilient-executor.ts`, `redis-vector-store.adapter.ts`, `VectorStore`, `provider-registry.service.ts`, `ai-provider-gateway/src/health/health.service.ts`, `HealthService`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _427 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `runs-result.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.053821800090456805 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05787545787545788 - nodes in this community are weakly interconnected._
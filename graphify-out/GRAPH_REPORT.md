# Graph Report - content-chain  (2026-10-15)

## Corpus Check
- 703 files · ~240,860 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4573 nodes · 14059 edges · 144 communities (130 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 419 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d8008c79`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DomainException
- social.types.ts
- api/company-context.types.ts
- chat-completions.adapter.ts
- asProviderInstanceId
- start-run-form.tsx
- provider-error.mapper.ts
- LogContext
- AuthUserContext
- anthropic/anthropic-tools.mapper.ts
- chat.service.ts
- gateway-config.schema.ts
- WizardState
- cli.module.ts
- ChatMessageDto
- ChatParamsDto
- ai-provider.interface.ts
- app-metrics-backend.interface.ts
- archive-runs-view.tsx
- own-runs-provider.tsx
- auth.module.ts
- resilient-executor.ts
- users-view.tsx
- UserRepository
- redis-vector-store.adapter.ts
- feedback-form.tsx
- PrometheusAppMetricsAdapter
- GatewayConfig
- LoggingService
- .getOne
- GatewayKey
- HealthService
- RunRepository
- logging.service.ts
- AnthropicMessagesRequestDto
- google-tools.mapper.ts
- runs.types.ts
- enums.ts
- runs-result.types.ts
- runs.module.ts
- sentry-ai-metrics.adapter.ts
- PrismaRunAdapter
- openai-models.controller.ts
- ids.ts
- semantic-cache.service.ts
- prisma-run.adapter.ts
- save-output-edited.use-case.ts
- delete-user.use-case.ts
- swagger.setup.ts
- anthropic-response.mapper.ts
- ListRunsQueryDto
- ModelAlias
- AppMetricsModule
- get-run.use-case.ts
- content.graph.ts
- config-generator.service.ts
- isOpenAiProviderType
- domain/company-context.types.ts
- responses.adapter.ts
- branded.types.ts
- metrics.ts
- exitWithAgentReport
- Env
- filters/http-exception.filter.ts
- anthropic-models.controller.ts
- ModelEditCommand
- app-metrics.service.ts
- ai-provider-gateway/src/app.module.ts
- OpenAiChatCompletionRequestDto
- start-run.use-case.ts
- http-metrics.interceptor.ts
- dashboard-shell.tsx
- invite-user.use-case.ts
- RunRecord
- run-lifecycle.module.ts
- parse-verifier-log-message.ts
- company-context.schemas.ts
- api/src/health/health.service.ts
- ClientAddCommand
- llm-hop.ts
- PrometheusService
- cn
- provider-instances.bootstrap.ts
- SPEC — README
- RolesGuard
- assert-audience-profile-names-unique.ts
- model-manager.service.ts
- company-context.dto.ts
- ClientRemoveCommand
- ModelAddCommand
- users.controller.ts
- AuthController
- chat.module.ts
- social.graph.ts
- CompanyContextRepository
- StartRunDto
- ProviderEditCommand
- route.ts
- RefreshSessionRepository
- ChatToolingDto
- InvitationsController
- configuration.ts
- models.controller.ts
- ProviderAddCommand
- configuration-validation.service.ts
- PrismaService
- .completions
- AppMetricsService
- .getOne
- config-validator.ts
- should-include-redis-stack.ts
- isRecord
- openai-params-provider.mapper.ts
- ModelRemoveCommand
- ProviderRemoveCommand
- HttpExceptionFilter
- EnvironmentVariables
- company-context.controller.ts
- .getOne
- company-context.port.ts
- run.port.ts
- HealthController
- api/src/app.module.ts
- page-document-body.tsx
- Architektura
- brand
- ClientEditCommand
- health.api.ts
- health-readiness-response.dto.ts
- openai-chat-completion-response.dto.ts
- GatewayModelsCatalogService
- openai-stream.mapper.ts
- resolve-provider-call-options.ts
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
2. `DomainException` - 83 edges
3. `ProviderInstanceId` - 81 edges
4. `LoggingService` - 73 edges
5. `asProviderInstanceId()` - 67 edges
6. `isRecord()` - 66 edges
7. `GatewayConfig` - 65 edges
8. `cn()` - 65 edges
9. `GatewayKey` - 59 edges
10. `Env` - 59 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (144 total, 13 thin omitted)

### Community 0 - "DomainException"
Cohesion: 0.07
Nodes (41): AcceptInviteResult, acceptInviteSchema, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds() (+33 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (30): PageOutline, CompositeRunResultReader, OutputEditedWrite, OutputEditedWriter, RunResultReader, EmptyRunResultReader, Injectable, applyWrite() (+22 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.05
Nodes (71): metadata, putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+63 more)

### Community 3 - "chat-completions.adapter.ts"
Cohesion: 0.13
Nodes (26): toHttpException(), asSystemFingerprint(), ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream() (+18 more)

### Community 4 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (58): assertInteractiveAllowed(), DEFAULT_MODELS, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema (+50 more)

### Community 5 - "start-run-form.tsx"
Cohesion: 0.10
Nodes (33): metadata, fetchCompanyContext(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode (+25 more)

### Community 6 - "provider-error.mapper.ts"
Cohesion: 0.16
Nodes (21): ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+13 more)

### Community 7 - "LogContext"
Cohesion: 0.07
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "AuthUserContext"
Cohesion: 0.10
Nodes (28): ApiCookieAuth, Patch, Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional (+20 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.10
Nodes (38): asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic() (+30 more)

### Community 10 - "chat.service.ts"
Cohesion: 0.06
Nodes (60): SemanticStoreEmbedState, CacheIdentityMessage, ChatCacheSource, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize (+52 more)

### Community 11 - "gateway-config.schema.ts"
Cohesion: 0.08
Nodes (36): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, KeyGenerateCommand, Command, Option, convertClient() (+28 more)

### Community 12 - "WizardState"
Cohesion: 0.10
Nodes (13): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable (+5 more)

### Community 13 - "cli.module.ts"
Cohesion: 0.06
Nodes (59): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), resolveCliMode() (+51 more)

### Community 14 - "ChatMessageDto"
Cohesion: 0.08
Nodes (28): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+20 more)

### Community 15 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 16 - "ai-provider.interface.ts"
Cohesion: 0.15
Nodes (28): CachedChatWarning, CachedFinishReason, mapStopReasonToFinishReason(), CompleteOnceResult, StreamOnceResult, ProviderResponse, InputTokens, ModelId (+20 more)

### Community 17 - "app-metrics-backend.interface.ts"
Cohesion: 0.14
Nodes (12): AppProviderCallContext, AppProviderStreamScope, AppRequestMethod, AppRequestStatus, AppTokenUsage, HealthComponent, HealthMetricsSnapshot, HealthStatus (+4 more)

### Community 18 - "archive-runs-view.tsx"
Cohesion: 0.04
Nodes (69): metadata, metadata, geistMono, geistSans, metadata, fetchUserSession(), patchOwnEmail(), AccountEmailForm() (+61 more)

### Community 19 - "own-runs-provider.tsx"
Cohesion: 0.08
Nodes (34): assertNever(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome, runTerminalToastId() (+26 more)

### Community 20 - "auth.module.ts"
Cohesion: 0.04
Nodes (57): AcceptInviteUseCase, Inject, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable, BootstrapAdminUseCase, Injectable (+49 more)

### Community 21 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (19): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+11 more)

### Community 22 - "users-view.tsx"
Cohesion: 0.06
Nodes (62): metadata, logoutSession(), GuestLimitModal(), GuestLimitModalProps, CancelRunDialogProps, FALLBACK, RunResultEditActions(), RunResultEditActionsProps (+54 more)

### Community 23 - "UserRepository"
Cohesion: 0.06
Nodes (22): Inject, Inject, Inject, Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput (+14 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.11
Nodes (25): isUnservableCachedReply(), CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag() (+17 more)

### Community 25 - "feedback-form.tsx"
Cohesion: 0.16
Nodes (18): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+10 more)

### Community 26 - "PrometheusAppMetricsAdapter"
Cohesion: 0.11
Nodes (5): healthStatusToGaugeValue(), PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppRequestLabels

### Community 27 - "GatewayConfig"
Cohesion: 0.08
Nodes (16): PendingSecretsItem, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable (+8 more)

### Community 28 - "LoggingService"
Cohesion: 0.05
Nodes (27): Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, ChatErrorHandlerService, Injectable, ChatProviderCallService (+19 more)

### Community 29 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 30 - "GatewayKey"
Cohesion: 0.05
Nodes (58): ApiHeader, GATEWAY_CACHE_HEADER, ChatModule, Module, toChatResponseDto(), toChatResponseDtoFromCache(), ApiErrorCode, readClientGatewayKey() (+50 more)

### Community 31 - "HealthService"
Cohesion: 0.17
Nodes (6): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, ApiProperty, HealthService, Injectable

### Community 32 - "RunRepository"
Cohesion: 0.06
Nodes (10): Inject, Inject, Inject, GuestRunPolicyService, Injectable, Inject, Inject, Inject (+2 more)

### Community 33 - "logging.service.ts"
Cohesion: 0.07
Nodes (21): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+13 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "google-tools.mapper.ts"
Cohesion: 0.15
Nodes (26): mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason() (+18 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.06
Nodes (53): canEditResult(), ArchiveRunsQuery, fetchRunLogs(), fetchUserRuns(), finalizeRunReview(), isUserRating(), patchRunRating(), HitlAccepted (+45 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "runs-result.types.ts"
Cohesion: 0.04
Nodes (72): buildOutputEditedBody(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload(), RESULT_KEYS_BY_TASK_TYPE (+64 more)

### Community 39 - "runs.module.ts"
Cohesion: 0.10
Nodes (22): AutoFinalizeExpiredReviewsUseCase, Injectable, Inject, RunDispatchExecutor, RunLifecycleService, Injectable, RecoverInterruptedRunsUseCase, Inject (+14 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+20 more)

### Community 41 - "PrismaRunAdapter"
Cohesion: 0.11
Nodes (5): RunSnapshot, RunLogEntry, assertTransition(), PrismaRunAdapter, Injectable

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.21
Nodes (12): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto (+4 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "semantic-cache.service.ts"
Cohesion: 0.07
Nodes (31): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName() (+23 more)

### Community 45 - "prisma-run.adapter.ts"
Cohesion: 0.14
Nodes (15): contentBriefSchema, socialBriefSchema, LightRunItem, RunRecordBase, ALLOWED_RUN_STATES, CANCELABLE_RUN_STATUSES, RunLogRow, RunReviewFields (+7 more)

### Community 46 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (33): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+25 more)

### Community 47 - "delete-user.use-case.ts"
Cohesion: 0.09
Nodes (18): DeleteUserResult, isGuestTaskType(), Inject, GUEST_QUOTA, GuestQuotaAdmitResult, GuestQuotaPort, GuestQuotaModule, Module (+10 more)

### Community 48 - "swagger.setup.ts"
Cohesion: 0.08
Nodes (29): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional (+21 more)

### Community 49 - "anthropic-response.mapper.ts"
Cohesion: 0.15
Nodes (23): asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto, AnthropicThinkingContentBlockDto (+15 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.07
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 52 - "AppMetricsModule"
Cohesion: 0.12
Nodes (13): AiMetricsModule, Global, Module, AppMetricsModule, Global, Module, ObservabilityModule, Global (+5 more)

### Community 53 - "get-run.use-case.ts"
Cohesion: 0.13
Nodes (12): CancelRunUseCase, Inject, Injectable, GetRunOutput, GetRunUseCase, Injectable, GUEST_TASK_TYPES, GuestRunAdmit (+4 more)

### Community 54 - "content.graph.ts"
Cohesion: 0.08
Nodes (43): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+35 more)

### Community 55 - "config-generator.service.ts"
Cohesion: 0.16
Nodes (11): ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, EnvTemplateInput, generateEnvTemplate(), isEnvInputRedisRequired() (+3 more)

### Community 56 - "isOpenAiProviderType"
Cohesion: 0.18
Nodes (14): collectPendingSecrets(), GatewayConfigSchema, assertEnabledProviderApiKeysPresent(), collectMissingEnabledProviderApiKeyErrors(), formatMissingProviderApiKeyError(), isApiKeyRequiredForProviderType(), MissingProviderApiKey, assertEnabledProviderBaseUrlPresent() (+6 more)

### Community 57 - "domain/company-context.types.ts"
Cohesion: 0.17
Nodes (19): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+11 more)

### Community 58 - "responses.adapter.ts"
Cohesion: 0.26
Nodes (15): asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse() (+7 more)

### Community 59 - "branded.types.ts"
Cohesion: 0.11
Nodes (31): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createConversationId(), createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds() (+23 more)

### Community 60 - "metrics.ts"
Cohesion: 0.27
Nodes (11): getClientConversationId(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns(), composeSystemPrompt() (+3 more)

### Community 61 - "exitWithAgentReport"
Cohesion: 0.11
Nodes (12): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand (+4 more)

### Community 62 - "Env"
Cohesion: 0.04
Nodes (55): readSmtpConfig(), SmtpConfig, Inject, readCookie(), isRecord(), JwtCookieStrategy, Inject, Injectable (+47 more)

### Community 63 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.28
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 65 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 66 - "app-metrics.service.ts"
Cohesion: 0.13
Nodes (13): HealthCheckResult, HealthRedisCheckResult, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller (+5 more)

### Community 67 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.14
Nodes (14): HealthModule, Module, IntegrationsModule, Module, LoggingModule, Global, Module, ProviderInstancesBootstrap (+6 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (31): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+23 more)

### Community 69 - "start-run.use-case.ts"
Cohesion: 0.13
Nodes (22): GetRunLogsOutput, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, runIdSchema, socialStartRunSchema (+14 more)

### Community 70 - "http-metrics.interceptor.ts"
Cohesion: 0.11
Nodes (18): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+10 more)

### Community 71 - "dashboard-shell.tsx"
Cohesion: 0.09
Nodes (30): fetchCompleteness(), CompletenessState, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE, useCompleteness() (+22 more)

### Community 72 - "invite-user.use-case.ts"
Cohesion: 0.05
Nodes (46): InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase, Inject (+38 more)

### Community 73 - "RunRecord"
Cohesion: 0.21
Nodes (3): InProcessRunWorker, Injectable, RunRecord

### Community 74 - "run-lifecycle.module.ts"
Cohesion: 0.17
Nodes (7): TransitionExtras, RUN_SSE_HUB, RunSseEvent, RunSseHub, InMemoryRunSseHub, Inject, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "company-context.schemas.ts"
Cohesion: 0.33
Nodes (5): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 79 - "llm-hop.ts"
Cohesion: 0.08
Nodes (32): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+24 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "cn"
Cohesion: 0.07
Nodes (38): AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), APP_NAV, AppNavItem, navItemsForRole() (+30 more)

### Community 82 - "provider-instances.bootstrap.ts"
Cohesion: 0.23
Nodes (11): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+3 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 85 - "assert-audience-profile-names-unique.ts"
Cohesion: 0.60
Nodes (3): assertAudienceProfileNamesUnique(), normalizeAudienceName(), withEffectiveAudience()

### Community 86 - "model-manager.service.ts"
Cohesion: 0.12
Nodes (24): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable (+16 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 89 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 90 - "users.controller.ts"
Cohesion: 0.07
Nodes (27): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, PatchUserDto, ApiProperty (+19 more)

### Community 91 - "AuthController"
Cohesion: 0.11
Nodes (22): AuthController, ApiTags, Body, Controller, Get, HttpCode, Post, Req (+14 more)

### Community 92 - "chat.module.ts"
Cohesion: 0.06
Nodes (37): ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body, Controller (+29 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.13
Nodes (32): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 94 - "CompanyContextRepository"
Cohesion: 0.13
Nodes (10): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, jsonArray(), jsonRecord() (+2 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "RefreshSessionRepository"
Cohesion: 0.10
Nodes (9): Inject, Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter (+1 more)

### Community 99 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 100 - "InvitationsController"
Cohesion: 0.16
Nodes (10): InvitationsController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+2 more)

### Community 101 - "configuration.ts"
Cohesion: 0.12
Nodes (22): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration(), buildEffectiveGatewayConfig() (+14 more)

### Community 102 - "models.controller.ts"
Cohesion: 0.24
Nodes (9): ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto (+1 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "configuration-validation.service.ts"
Cohesion: 0.16
Nodes (7): CACHE_BACKEND_TYPE, configurationValidation, ConfigurationValidationService, CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment, RawGatewayConfig

### Community 105 - "PrismaService"
Cohesion: 0.04
Nodes (43): DeleteUserUseCase, Inject, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand (+35 more)

### Community 106 - ".completions"
Cohesion: 0.16
Nodes (14): ApiBody, ApiOperation, ApiProduces, ApiResponse, Body, Post, Req, Res (+6 more)

### Community 107 - "AppMetricsService"
Cohesion: 0.10
Nodes (6): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable, HttpMethod

### Community 108 - ".getOne"
Cohesion: 0.19
Nodes (10): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 109 - "config-validator.ts"
Cohesion: 0.30
Nodes (9): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, assertMasterKeyPresent(), validateEnvironment() (+1 more)

### Community 110 - "should-include-redis-stack.ts"
Cohesion: 0.35
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 111 - "isRecord"
Cohesion: 0.05
Nodes (81): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), ACTIVATION_FAILED_HINT (+73 more)

### Community 112 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 113 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 114 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 116 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 117 - "company-context.controller.ts"
Cohesion: 0.10
Nodes (22): toCompanyContext(), toPartialCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable (+14 more)

### Community 118 - ".getOne"
Cohesion: 0.19
Nodes (10): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 119 - "company-context.port.ts"
Cohesion: 0.42
Nodes (5): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 120 - "run.port.ts"
Cohesion: 0.23
Nodes (8): ListRunsOutput, ListRunsUseCase, Inject, Injectable, ListRunsQuery, ListRunsResult, PAGE_SIZE, RunStartedBy

### Community 121 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 122 - "api/src/app.module.ts"
Cohesion: 0.05
Nodes (52): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome() (+44 more)

### Community 123 - "page-document-body.tsx"
Cohesion: 0.47
Nodes (5): MdBlock, PageDocumentBody(), PageDocumentBodyProps, parseMarkdownBlocks(), renderInline()

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 126 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 127 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 128 - "health-readiness-response.dto.ts"
Cohesion: 0.33
Nodes (8): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional

### Community 129 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 131 - "openai-stream.mapper.ts"
Cohesion: 0.25
Nodes (14): SseDoneEvent, fromGatewayToolCallDto(), mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields() (+6 more)

### Community 132 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

## Knowledge Gaps
- **468 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+463 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1247 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `GatewayModelsCatalogService`, `app-metrics.service.ts`, `asProviderInstanceId`, `models.controller.ts`, `sentry-ai-metrics.adapter.ts`, `chat.service.ts`, `gateway-config.schema.ts`, `AppMetricsService`, `ai-provider.interface.ts`, `app-metrics-backend.interface.ts`, `resilient-executor.ts`, `model-manager.service.ts`, `config-generator.service.ts`, `redis-vector-store.adapter.ts`, `PrometheusAppMetricsAdapter`, `branded.types.ts`, `metrics.ts`, `GatewayKey`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `GatewayModelsCatalogService`, `asProviderInstanceId`, `LogContext`, `chat.service.ts`, `gateway-config.schema.ts`, `cli.module.ts`, `ai-provider.interface.ts`, `app-metrics-backend.interface.ts`, `redis-vector-store.adapter.ts`, `PrometheusAppMetricsAdapter`, `GatewayKey`, `sentry-ai-metrics.adapter.ts`, `config-generator.service.ts`, `isOpenAiProviderType`, `branded.types.ts`, `metrics.ts`, `exitWithAgentReport`, `app-metrics.service.ts`, `model-manager.service.ts`, `configuration.ts`, `models.controller.ts`, `AppMetricsService`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `DomainException` connect `DomainException` to `AuthUserContext`, `auth.module.ts`, `UserRepository`, `runs.module.ts`, `PrismaRunAdapter`, `prisma-run.adapter.ts`, `save-output-edited.use-case.ts`, `delete-user.use-case.ts`, `get-run.use-case.ts`, `Env`, `start-run.use-case.ts`, `http-metrics.interceptor.ts`, `invite-user.use-case.ts`, `llm-hop.ts`, `assert-audience-profile-names-unique.ts`, `InvitationsController`, `PrismaService`, `company-context.port.ts`, `api/src/app.module.ts`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _468 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DomainException` be split into smaller, more focused modules?**
  _Cohesion score 0.07205452775073028 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0504950495049505 - nodes in this community are weakly interconnected._
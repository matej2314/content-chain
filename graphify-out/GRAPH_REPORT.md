# Graph Report - content-chain  (2026-10-15)

## Corpus Check
- 701 files · ~240,043 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4557 nodes · 14010 edges · 128 communities (114 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 419 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6973b495`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- auth.module.ts
- social.types.ts
- api/company-context.types.ts
- responses.adapter.ts
- provider-manager.service.ts
- notify-product.tsx
- api-error.code.ts
- logging.service.ts
- resolve-provider-call-options.ts
- anthropic/anthropic-tools.mapper.ts
- chat.service.ts
- start-agent-dialog.tsx
- exitWithAgentReport
- cli.module.ts
- swagger.setup.ts
- chat-params.dto.ts
- ai-provider.interface.ts
- app-metrics.service.ts
- start-run-form.tsx
- asClientId
- AuthController
- types/index.ts
- users-view.tsx
- AuthUser
- redis-vector-store.adapter.ts
- feedback-form.tsx
- PrometheusAppMetricsAdapter
- GatewayConfig
- branded.types.ts
- .getOne
- LoggingService
- HealthService
- env.schema.ts
- response-cache.service.ts
- AnthropicMessagesRequestDto
- .getOne
- runs.types.ts
- enums.ts
- run-result-view.tsx
- llm-hop.ts
- sentry-ai-metrics.adapter.ts
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- semantic-cache.service.ts
- chat.module.ts
- save-output-edited.use-case.ts
- rate-run.use-case.ts
- ai-provider-gateway/src/main.ts
- anthropic-response.mapper.ts
- ListRunsQueryDto
- ModelAlias
- AppMetricsModule
- ConfigInitCommand
- content.graph.ts
- ChatCacheIdentity
- JwtAuthGuard
- domain/company-context.types.ts
- OpenAiChatMessageDto
- .getOne
- metrics.ts
- GatewayModelsCatalogService
- RunRepository
- filters/http-exception.filter.ts
- anthropic-models.controller.ts
- ModelEditCommand
- AppMetricsService
- event-source-registry-provider.tsx
- OpenAiChatCompletionRequestDto
- .execute
- models.controller.ts
- demo-mode-provider.tsx
- prisma-invitation.adapter.ts
- HealthController
- InMemoryRunSseHub
- parse-verifier-log-message.ts
- company-context.mapper.ts
- api/src/health/health.service.ts
- ClientAddCommand
- llm-gateway.http.adapter.ts
- PrometheusService
- cn
- CompanyContextController
- SPEC — README
- RolesGuard
- assert-audience-profile-names-unique.ts
- asProviderInstanceId
- company-context.dto.ts
- ClientRemoveCommand
- ModelAddCommand
- AuthUserContext
- HttpExceptionFilter
- anthropic-messages.controller.ts
- social.graph.ts
- StartRunDto
- ProviderEditCommand
- route.ts
- RedisConnectionService
- configuration.ts
- ChatParamsDto
- ProviderAddCommand
- patch-company-context.use-case.ts
- PrismaService
- envelope.ts
- openai-params-provider.mapper.ts
- env.validation.ts
- CompanyContextRepository
- openai-chat-message.dto.ts
- guest.guard.ts
- openai-chat-completion-request.dto.ts
- api/src/app.module.ts
- Architektura
- brand
- ClientEditCommand
- health.api.ts
- ai-provider-gateway/src/app.module.ts
- openai-stream.mapper.ts
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
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (128 total, 13 thin omitted)

### Community 0 - "auth.module.ts"
Cohesion: 0.03
Nodes (103): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable, comparePassword() (+95 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (33): CompositeRunResultReader, GetRunOutput, Inject, OutputEditedWrite, OutputEditedWriter, RunResultReader, SocialBrief, EmptyRunResultReader (+25 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.05
Nodes (72): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+64 more)

### Community 3 - "responses.adapter.ts"
Cohesion: 0.08
Nodes (60): mapProviderResponseToAiObservation(), toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), getUsageMetadata() (+52 more)

### Community 4 - "provider-manager.service.ts"
Cohesion: 0.14
Nodes (24): DEFAULT_MODELS, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, ModelPromptResult, ModelPromptService, Injectable, ProviderPromptResult (+16 more)

### Community 5 - "notify-product.tsx"
Cohesion: 0.11
Nodes (24): GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode, isGuestAllowedTaskType(), isGuestQuotaCode() (+16 more)

### Community 6 - "api-error.code.ts"
Cohesion: 0.10
Nodes (31): ChatErrorHandlerService, Injectable, ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus() (+23 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.07
Nodes (19): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, SentryErrorReportingAdapter, Injectable (+11 more)

### Community 8 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (39): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+31 more)

### Community 10 - "chat.service.ts"
Cohesion: 0.05
Nodes (64): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+56 more)

### Community 11 - "start-agent-dialog.tsx"
Cohesion: 0.15
Nodes (19): CompletenessChip(), useCompleteness(), FALLBACK_ENVELOPE, GatewayAliveContext, GatewayAliveContextValue, GatewayAliveProvider(), GatewayAliveState, useGatewayAlive() (+11 more)

### Community 12 - "exitWithAgentReport"
Cohesion: 0.08
Nodes (21): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand (+13 more)

### Community 13 - "cli.module.ts"
Cohesion: 0.06
Nodes (67): AgentReport, AgentReportStatus, PendingSecretsItem, loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers(), CliMode, CliModeFlags (+59 more)

### Community 14 - "swagger.setup.ts"
Cohesion: 0.05
Nodes (48): ChatCacheSource, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional (+40 more)

### Community 15 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 16 - "ai-provider.interface.ts"
Cohesion: 0.10
Nodes (40): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, mapStopReasonToFinishReason(), CompleteOnceResult, StreamOnceParams, StreamOnceResult (+32 more)

### Community 17 - "app-metrics.service.ts"
Cohesion: 0.20
Nodes (14): healthStatusToGaugeValue(), resolveAppMetricsBackend(), APP_METRICS_BACKEND, AppRequestLabels, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus (+6 more)

### Community 18 - "start-run-form.tsx"
Cohesion: 0.05
Nodes (72): metadata, metadata, useSession(), GuestLimitModal(), GuestLimitModalProps, useGuestLocked(), CONTENT_KIND_LABELS, LANGUAGE_LABELS (+64 more)

### Community 19 - "asClientId"
Cohesion: 0.06
Nodes (46): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), KeyGenerateCommand, Command, Option (+38 more)

### Community 20 - "AuthController"
Cohesion: 0.06
Nodes (37): AuthController, ApiTags, Body, Controller, Get, HttpCode, Post, Req (+29 more)

### Community 21 - "types/index.ts"
Cohesion: 0.09
Nodes (39): ModelRetrySource, assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions, ResilientExecutionResult, RetryPolicy, ResilientExecutor (+31 more)

### Community 22 - "users-view.tsx"
Cohesion: 0.06
Nodes (57): metadata, logoutSession(), FeedbackCta(), LogoutDialog(), confirm(), LogoutDialogProps, createInvitation(), fetchInvitations() (+49 more)

### Community 23 - "AuthUser"
Cohesion: 0.07
Nodes (18): Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult (+10 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (21): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+13 more)

### Community 25 - "feedback-form.tsx"
Cohesion: 0.11
Nodes (25): metadata, createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated (+17 more)

### Community 26 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (5): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 27 - "GatewayConfig"
Cohesion: 0.07
Nodes (16): ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable, ProviderManagerService (+8 more)

### Community 28 - "branded.types.ts"
Cohesion: 0.07
Nodes (49): isRedisRequired(), CliAiProvider, CliRateLimit, GatewayClient, EnvPatchValue, WizardRunResult, ClientCli, EnvTemplateInput (+41 more)

### Community 29 - ".getOne"
Cohesion: 0.19
Nodes (10): ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 30 - "LoggingService"
Cohesion: 0.11
Nodes (9): Inject, Inject, PinoLoggerAdapter, Injectable, LogContext, LoggingService, Injectable, Inject (+1 more)

### Community 31 - "HealthService"
Cohesion: 0.20
Nodes (4): HealthReadinessResponseDto, ApiProperty, HealthService, Injectable

### Community 32 - "env.schema.ts"
Cohesion: 0.17
Nodes (11): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+3 more)

### Community 33 - "response-cache.service.ts"
Cohesion: 0.10
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - ".getOne"
Cohesion: 0.18
Nodes (11): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+3 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.05
Nodes (87): ArchiveRunsQuery, fetchRunLogs(), fetchUserRuns(), isUserRating(), patchRunRating(), HitlAccepted, isPageOutlineSectionRole(), isReelDuration() (+79 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "run-result-view.tsx"
Cohesion: 0.04
Nodes (58): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+50 more)

### Community 39 - "llm-hop.ts"
Cohesion: 0.21
Nodes (12): LLM_GATEWAY_PORT, isRetryable(), RetryReason, ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid() (+4 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+20 more)

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.07
Nodes (19): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, RunRecordBase, ALLOWED_RUN_STATES, assertTransition(), CANCELABLE_RUN_STATUSES (+11 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.27
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "semantic-cache.service.ts"
Cohesion: 0.07
Nodes (29): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex() (+21 more)

### Community 45 - "chat.module.ts"
Cohesion: 0.07
Nodes (30): ChatModule, Module, StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), ResolvedGatewayClient (+22 more)

### Community 46 - "save-output-edited.use-case.ts"
Cohesion: 0.06
Nodes (42): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+34 more)

### Community 47 - "rate-run.use-case.ts"
Cohesion: 0.07
Nodes (26): isGuestTaskType(), ratingSchema, assertSameIds(), SaveOutputEditedUseCase, Injectable, validationFailed(), withCharacterCount(), assertRunReviewable() (+18 more)

### Community 48 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 49 - "anthropic-response.mapper.ts"
Cohesion: 0.12
Nodes (26): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+18 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.06
Nodes (8): ProviderTestOptions, CliAiModel, ModelAlias, ProviderInstanceId, MissingProviderApiKey, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 52 - "AppMetricsModule"
Cohesion: 0.12
Nodes (13): AiMetricsModule, Global, Module, AppMetricsModule, Global, Module, ObservabilityModule, Global (+5 more)

### Community 53 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 54 - "content.graph.ts"
Cohesion: 0.08
Nodes (45): ContentPipelineFacade, toOutcome(), Inject, Injectable, Inject, pageOutlineOutputSchema, ContentResultStore, ContentPipelineInput (+37 more)

### Community 55 - "ChatCacheIdentity"
Cohesion: 0.29
Nodes (5): ResponseCacheService, Injectable, ChatCacheIdentity, Optional, asCacheKey()

### Community 57 - "domain/company-context.types.ts"
Cohesion: 0.13
Nodes (24): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection (+16 more)

### Community 58 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 59 - ".getOne"
Cohesion: 0.19
Nodes (10): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 60 - "metrics.ts"
Cohesion: 0.09
Nodes (33): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+25 more)

### Community 61 - "GatewayModelsCatalogService"
Cohesion: 0.27
Nodes (6): GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, GatewayModelsCatalogService, Injectable

### Community 62 - "RunRepository"
Cohesion: 0.03
Nodes (84): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject (+76 more)

### Community 63 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.28
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 65 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 66 - "AppMetricsService"
Cohesion: 0.06
Nodes (16): HttpMetricsMiddleware, Injectable, Inject, Optional, AppMetricsService, Inject, Injectable, MetricsController (+8 more)

### Community 67 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - ".execute"
Cohesion: 0.17
Nodes (13): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, ErrorEnvelope (+5 more)

### Community 70 - "models.controller.ts"
Cohesion: 0.31
Nodes (6): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto, ApiProperty

### Community 71 - "demo-mode-provider.tsx"
Cohesion: 0.27
Nodes (8): fetchAppConfig(), AppConfig, parseAppConfig(), DemoModeContext, DemoModeContextValue, DemoModeProvider(), DemoModeState, FALLBACK_ENVELOPE

### Community 72 - "prisma-invitation.adapter.ts"
Cohesion: 0.05
Nodes (40): Inject, InviteUserUseCase, Injectable, InvitationListItem, ListInvitationsUseCase, Inject, Injectable, ResendInvitationUseCase (+32 more)

### Community 73 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 74 - "InMemoryRunSseHub"
Cohesion: 0.27
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (10): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+2 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (40): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+32 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "cn"
Cohesion: 0.05
Nodes (47): DemoChip(), useDemoMode(), AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot() (+39 more)

### Community 82 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 85 - "assert-audience-profile-names-unique.ts"
Cohesion: 0.60
Nodes (3): assertAudienceProfileNamesUnique(), normalizeAudienceName(), withEffectiveAudience()

### Community 86 - "asProviderInstanceId"
Cohesion: 0.10
Nodes (30): buildAppProviderMetricsContext(), DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), defaultModelPolicy(), ModelEditField (+22 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 89 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 90 - "AuthUserContext"
Cohesion: 0.04
Nodes (55): ReactivateUserUseCase, Inject, Injectable, ApiCookieAuth, Patch, InviteUserDto, ApiProperty, IsEmail (+47 more)

### Community 91 - "HttpExceptionFilter"
Cohesion: 0.15
Nodes (9): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject, HttpExceptionFilter (+1 more)

### Community 92 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (62): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+54 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.13
Nodes (34): loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType (+26 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 99 - "RedisConnectionService"
Cohesion: 0.27
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 101 - "configuration.ts"
Cohesion: 0.08
Nodes (45): asSemanticCacheTtlSeconds(), AppConfiguration, RedisRuntimeConfig, SemanticCacheRuntimeConfig, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions (+37 more)

### Community 102 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.12
Nodes (9): ModelRemoveCommand, Command, Option, ProviderAddCommand, Command, Option, ProviderRemoveCommand, Command (+1 more)

### Community 104 - "patch-company-context.use-case.ts"
Cohesion: 0.44
Nodes (5): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 105 - "PrismaService"
Cohesion: 0.03
Nodes (48): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable (+40 more)

### Community 111 - "envelope.ts"
Cohesion: 0.05
Nodes (78): AcceptInvitePage(), metadata, tokenFromSearchParam(), geistMono, geistSans, metadata, ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT (+70 more)

### Community 112 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 116 - "env.validation.ts"
Cohesion: 0.10
Nodes (15): CACHE_BACKEND_TYPE, CACHE_BACKEND_VALUES, EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional (+7 more)

### Community 117 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (14): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+6 more)

### Community 118 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 119 - "guest.guard.ts"
Cohesion: 0.24
Nodes (5): ALLOW_GUEST_KEY, IS_PUBLIC_KEY, GuestGuard, Inject, Injectable

### Community 122 - "api/src/app.module.ts"
Cohesion: 0.07
Nodes (46): AuthModule, Module, CompanyContextModule, Module, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Injectable (+38 more)

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

### Community 128 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.07
Nodes (35): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisConsumer, RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+27 more)

### Community 131 - "openai-stream.mapper.ts"
Cohesion: 0.15
Nodes (22): fromGatewayToolCallDto(), toGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto (+14 more)

## Knowledge Gaps
- **468 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+463 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1247 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `AppMetricsService`, `api-error.code.ts`, `sentry-ai-metrics.adapter.ts`, `chat.service.ts`, `semantic-cache.service.ts`, `branded.types.ts`, `swagger.setup.ts`, `ai-provider.interface.ts`, `app-metrics.service.ts`, `asClientId`, `types/index.ts`, `asProviderInstanceId`, `ChatCacheIdentity`, `redis-vector-store.adapter.ts`, `PrometheusAppMetricsAdapter`, `metrics.ts`, `GatewayModelsCatalogService`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `provider-manager.service.ts`, `api-error.code.ts`, `logging.service.ts`, `chat.service.ts`, `exitWithAgentReport`, `cli.module.ts`, `swagger.setup.ts`, `ai-provider.interface.ts`, `app-metrics.service.ts`, `asClientId`, `types/index.ts`, `PrometheusAppMetricsAdapter`, `GatewayConfig`, `branded.types.ts`, `LoggingService`, `sentry-ai-metrics.adapter.ts`, `metrics.ts`, `GatewayModelsCatalogService`, `AppMetricsService`, `asProviderInstanceId`, `configuration.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `RunRepository`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _468 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `auth.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03454556493230526 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0478021978021978 - nodes in this community are weakly interconnected._
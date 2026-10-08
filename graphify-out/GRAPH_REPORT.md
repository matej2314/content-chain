# Graph Report - content-chain  (2026-10-08)

## Corpus Check
- 693 files · ~228,617 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4477 nodes · 13784 edges · 137 communities (120 shown, 16 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 412 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `508ec4d2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- start-run-form.tsx
- social.types.ts
- api/company-context.types.ts
- provider-base-url.validation.ts
- gateway-config.schema.ts
- run-details-view.tsx
- provider-error.mapper.ts
- LogContext
- responses.adapter.ts
- cli.module.ts
- InMemoryRunSseHub
- ChatToolingDto
- social.graph.ts
- wizard-orchestrator.service.ts
- InvitationsController
- ChatParamsDto
- PrometheusAppMetricsAdapter
- semantic-cache.constants.ts
- run-review-panel.tsx
- apiFetch
- AuthController
- AppMetricsService
- llm-hop.ts
- GuestQuotaPort
- RedisVectorStoreAdapter
- SemanticCacheService
- LoggingService
- button.tsx
- openai-params-provider.mapper.ts
- ModelAddCommand
- auth.module.ts
- HealthService
- swagger.setup.ts
- response-cache.service.ts
- AnthropicMessagesRequestDto
- anthropic-response.mapper.ts
- runs.types.ts
- enums.ts
- feedback-form.tsx
- .info
- sentry-ai-metrics.adapter.ts
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- openai-chat-completion-response.dto.ts
- anthropic.module.ts
- DomainException
- own-runs-provider.tsx
- RunRepository
- auth.api.ts
- ListRunsQueryDto
- ModelAlias
- types/index.ts
- config-generator.service.ts
- PublicConfigController
- anthropic/anthropic-tools.mapper.ts
- content.graph.ts
- domain/company-context.types.ts
- RefreshSessionRepository
- health-readiness-response.dto.ts
- metrics.ts
- app-metrics.service.ts
- MetricsController
- app-metrics-backend.interface.ts
- api/src/app.module.ts
- ModelRemoveCommand
- InProcessRunWorker
- asProviderInstanceId
- OpenAiChatCompletionRequestDto
- .execute
- RedisConnectionService
- configuration-validation.service.ts
- openai-messages.mapper.ts
- prisma-guest-purge.adapter.ts
- ClientEditCommand
- parse-verifier-log-message.ts
- company-context.mapper.ts
- api/src/health/health.service.ts
- KeyGenerateCommand
- llm-gateway.http.adapter.ts
- PrometheusService
- resolve-provider-call-options.ts
- ModelEditCommand
- SPEC — README
- auth.schemas.ts
- redis-vector-store.adapter.ts
- GatewayConfig
- company-context.dto.ts
- health.api.ts
- ProviderRemoveCommand
- EnvironmentVariables
- prisma-output-edited.adapter.ts
- GatewayKey
- gateway-key.guard.branded-types.test-d.ts
- PrismaService
- StartRunDto
- branded.types.ts
- route.ts
- config-validator.ts
- HttpExceptionFilter
- CompanyContextController
- save-output-edited.use-case.ts
- GlobalExceptionFilter
- ProviderAddCommand
- ProviderEditCommand
- observability.module.ts
- AllowGuest
- ClientAddCommand
- UserRepository
- JwtAuthGuard
- chat.service.ts
- VectorStore
- ConfigSecretsStatusCommand
- RolesGuard
- cn
- CompanyContextRepository
- prisma-invitation.adapter.ts
- should-include-redis-stack.ts
- ConfigValidateCommand
- ClientRemoveCommand
- Architektura
- brand
- configuration.ts
- ai-provider-gateway/src/app.module.ts
- anthropic-models.controller.ts
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
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `LiveItemSubscription()` --calls--> `useRunEventSource()`  [EXTRACTED]
  apps/frontend/src/modules/runs/components/own-runs-provider.tsx → apps/frontend/src/modules/runs/components/use-run-event-source.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (137 total, 16 thin omitted)

### Community 0 - "start-run-form.tsx"
Cohesion: 0.09
Nodes (34): metadata, CompletenessChip(), useCompleteness(), isGuestAllowedTaskType(), isGuestQuotaCode(), FALLBACK_ENVELOPE, GatewayAliveContext, GatewayAliveContextValue (+26 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (26): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore (+18 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (66): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+58 more)

### Community 3 - "provider-base-url.validation.ts"
Cohesion: 0.43
Nodes (6): assertEnabledProviderBaseUrlPresent(), collectMissingBaseUrlErrors(), formatMissingBaseUrlError(), MissingProviderBaseUrl, RawGatewayConfig, resolveBaseUrlFromEnv()

### Community 4 - "gateway-config.schema.ts"
Cohesion: 0.09
Nodes (39): REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, PendingSecretsItem, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+31 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.09
Nodes (36): metadata, metadata, useSession(), useGuestLocked(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS (+28 more)

### Community 6 - "provider-error.mapper.ts"
Cohesion: 0.19
Nodes (20): ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 7 - "LogContext"
Cohesion: 0.07
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (67): toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), buildGenerationConfig(), createGoogleProvider() (+59 more)

### Community 9 - "cli.module.ts"
Cohesion: 0.07
Nodes (60): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+52 more)

### Community 10 - "InMemoryRunSseHub"
Cohesion: 0.27
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 11 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (34): loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType (+26 more)

### Community 13 - "wizard-orchestrator.service.ts"
Cohesion: 0.09
Nodes (26): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, parseWizardState(), KeyGeneratorService, Injectable, ClientPromptService (+18 more)

### Community 14 - "InvitationsController"
Cohesion: 0.12
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 15 - "ChatParamsDto"
Cohesion: 0.07
Nodes (30): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+22 more)

### Community 16 - "PrometheusAppMetricsAdapter"
Cohesion: 0.11
Nodes (5): healthStatusToGaugeValue(), PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppRequestLabels

### Community 17 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 18 - "run-review-panel.tsx"
Cohesion: 0.05
Nodes (52): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+44 more)

### Community 19 - "apiFetch"
Cohesion: 0.07
Nodes (42): metadata, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, RegisterFieldErrors, fetchAppConfig(), AppConfig, parseAppConfig(), DemoModeContext (+34 more)

### Community 20 - "AuthController"
Cohesion: 0.05
Nodes (42): BootstrapStatusUseCase, Inject, Injectable, AuthController, ApiCookieAuth, ApiTags, Body, Controller (+34 more)

### Community 21 - "AppMetricsService"
Cohesion: 0.09
Nodes (8): HttpMetricsMiddleware, Injectable, Inject, Optional, AppMetricsService, Inject, Injectable, HttpMethod

### Community 22 - "llm-hop.ts"
Cohesion: 0.11
Nodes (19): Inject, LLM_GATEWAY_PORT, isRetryable(), RetryReason, isAbortError(), ChatJsonInput, hopErrorLogMessage(), hopUserContent() (+11 more)

### Community 23 - "GuestQuotaPort"
Cohesion: 0.09
Nodes (17): isGuestTaskType(), Inject, GUEST_QUOTA, GuestQuotaAdmitResult, GuestQuotaPort, GuestQuotaModule, Module, createRedis() (+9 more)

### Community 24 - "RedisVectorStoreAdapter"
Cohesion: 0.23
Nodes (7): RedisVectorStoreAdapter, Injectable, isRedisSearchIndexAlreadyExistsError(), isRedisSearchMissingIndexError(), isRedisSearchModuleMissingError(), redisSearchErrorMessage(), VectorStoreKnnInput

### Community 25 - "SemanticCacheService"
Cohesion: 0.14
Nodes (14): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Inject, Injectable, isSingleTurnUserRequest(), lastUserMessageText() (+6 more)

### Community 26 - "LoggingService"
Cohesion: 0.04
Nodes (41): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, ChatErrorHandlerService, Injectable, ChatProviderCallService, CompleteOnceResult (+33 more)

### Community 27 - "button.tsx"
Cohesion: 0.07
Nodes (52): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, toAcceptInviteFormError(), acceptInvite(), logoutSession(), registerAccount() (+44 more)

### Community 28 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 29 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 30 - "auth.module.ts"
Cohesion: 0.04
Nodes (80): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, ActivateAccountUseCase, Injectable, BootstrapAdminUseCase (+72 more)

### Community 31 - "HealthService"
Cohesion: 0.11
Nodes (12): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags (+4 more)

### Community 32 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (23): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+15 more)

### Community 33 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (20): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+12 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "anthropic-response.mapper.ts"
Cohesion: 0.08
Nodes (43): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDoneEvent, fromGatewayToolCallDto() (+35 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.06
Nodes (76): ArchiveRunsQuery, fetchUserRuns(), InitiatorOption, isUserRating(), patchRunRating(), HitlAccepted, isPageOutlineSectionRole(), isReelDuration() (+68 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.09
Nodes (29): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+21 more)

### Community 39 - ".info"
Cohesion: 0.13
Nodes (10): toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand, Command, Option, ProviderTestService (+2 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+20 more)

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.07
Nodes (18): LightRunItem, ListRunsResult, RunSnapshot, RunRecordBase, ALLOWED_RUN_STATES, assertTransition(), CANCELABLE_RUN_STATUSES, PrismaRunAdapter (+10 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 45 - "anthropic.module.ts"
Cohesion: 0.18
Nodes (10): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+2 more)

### Community 46 - "DomainException"
Cohesion: 0.08
Nodes (29): comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), AuthTokenResult, isUniqueConstraintViolation() (+21 more)

### Community 47 - "own-runs-provider.tsx"
Cohesion: 0.13
Nodes (20): assertNever(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome, runTerminalToastId() (+12 more)

### Community 48 - "RunRepository"
Cohesion: 0.04
Nodes (76): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject (+68 more)

### Community 49 - "auth.api.ts"
Cohesion: 0.06
Nodes (42): geistMono, geistSans, metadata, ACTIVATION_FAILED_HINT, activateAccount(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+34 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.07
Nodes (7): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend, AppTokenUsage

### Community 52 - "types/index.ts"
Cohesion: 0.08
Nodes (44): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+36 more)

### Community 53 - "config-generator.service.ts"
Cohesion: 0.08
Nodes (21): ConfigInitCommand, Command, Option, WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable (+13 more)

### Community 54 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 55 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (40): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+32 more)

### Community 56 - "content.graph.ts"
Cohesion: 0.07
Nodes (48): toOutcome(), coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+40 more)

### Community 57 - "domain/company-context.types.ts"
Cohesion: 0.12
Nodes (23): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection (+15 more)

### Community 58 - "RefreshSessionRepository"
Cohesion: 0.11
Nodes (8): LogoutUseCase, Inject, Injectable, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 59 - "health-readiness-response.dto.ts"
Cohesion: 0.33
Nodes (8): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional

### Community 60 - "metrics.ts"
Cohesion: 0.07
Nodes (40): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+32 more)

### Community 61 - "app-metrics.service.ts"
Cohesion: 0.19
Nodes (11): EMBEDDING_BACKEND, VECTOR_STORE, HealthCheckResult, HealthRedisCheckResult, AppMetricsModule, Global, Module, APP_METRICS_BACKEND (+3 more)

### Community 62 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 63 - "app-metrics-backend.interface.ts"
Cohesion: 0.15
Nodes (11): AppProviderCallContext, AppProviderStreamScope, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+3 more)

### Community 64 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (49): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, Injectable, ContentRunExecutor, isCanonicalOutlineSelection() (+41 more)

### Community 65 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 67 - "asProviderInstanceId"
Cohesion: 0.08
Nodes (45): isRedisSearchTagSafeId(), assertInteractiveAllowed(), collectPendingSecrets(), DEFAULT_MODELS, convertProvider(), CliAiModel, CliAiProvider, EnvPatchService (+37 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - ".execute"
Cohesion: 0.15
Nodes (15): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, ErrorEnvelope (+7 more)

### Community 70 - "RedisConnectionService"
Cohesion: 0.27
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 71 - "configuration-validation.service.ts"
Cohesion: 0.16
Nodes (8): CACHE_BACKEND_TYPE, assertEnabledProviderSecretsPresent(), configurationValidation, ConfigurationValidationService, CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment, RawGatewayConfig

### Community 72 - "openai-messages.mapper.ts"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 73 - "prisma-guest-purge.adapter.ts"
Cohesion: 0.16
Nodes (8): GUEST_PURGE, GuestPurgeDeleteStats, GuestPurgePort, LIVE_RUN_STATUSES, GuestPurgeModule, Module, PrismaGuestPurgeAdapter, Injectable

### Community 74 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (12): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+4 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "KeyGenerateCommand"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (39): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+31 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 82 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "auth.schemas.ts"
Cohesion: 0.12
Nodes (15): ActivateAccountOutput, ActivateAccountInput, activateAccountSchema, BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand (+7 more)

### Community 85 - "redis-vector-store.adapter.ts"
Cohesion: 0.32
Nodes (9): isUnservableCachedReply(), parseCachedChatResponse(), escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits(), VectorSearchHit, VectorStoreProbeResult (+1 more)

### Community 86 - "GatewayConfig"
Cohesion: 0.08
Nodes (32): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable (+24 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 89 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 90 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 91 - "prisma-output-edited.adapter.ts"
Cohesion: 0.24
Nodes (6): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable

### Community 92 - "GatewayKey"
Cohesion: 0.03
Nodes (92): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+84 more)

### Community 94 - "PrismaService"
Cohesion: 0.04
Nodes (44): AppModule, Module, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema (+36 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "branded.types.ts"
Cohesion: 0.08
Nodes (49): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, ChatWarningDto, ApiProperty, ApiPropertyOptional (+41 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "config-validator.ts"
Cohesion: 0.43
Nodes (7): collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, buildEffectiveGatewayConfig(), assertMasterKeyPresent(), EXPECTED_SCHEMA_VERSION

### Community 100 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 101 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (33): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+25 more)

### Community 102 - "GlobalExceptionFilter"
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 105 - "observability.module.ts"
Cohesion: 0.29
Nodes (6): AiMetricsModule, Global, Module, ObservabilityModule, Global, Module

### Community 106 - "AllowGuest"
Cohesion: 0.11
Nodes (24): Body, HttpCode, Post, HitlDto, IsArray, IsString, PatchRunRatingDto, IsIn (+16 more)

### Community 107 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 108 - "UserRepository"
Cohesion: 0.04
Nodes (48): Inject, ListUsersUseCase, Inject, Injectable, Inject, ReactivateUserUseCase, Inject, Injectable (+40 more)

### Community 110 - "chat.service.ts"
Cohesion: 0.06
Nodes (51): EMBED_NOT_ATTEMPTED, SemanticLookupResult, SemanticStoreEmbedState, VectorStorePartition, VectorStoreUpsertInput, CacheIdentityMessage, ChatRequestDto, ApiProperty (+43 more)

### Community 112 - "ConfigSecretsStatusCommand"
Cohesion: 0.40
Nodes (3): ConfigSecretsStatusCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.06
Nodes (41): DemoChip(), useDemoMode(), FeedbackCta(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot() (+33 more)

### Community 117 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (19): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+11 more)

### Community 118 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 120 - "should-include-redis-stack.ts"
Cohesion: 0.35
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 121 - "ConfigValidateCommand"
Cohesion: 0.50
Nodes (3): ConfigValidateCommand, Command, Option

### Community 122 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 126 - "configuration.ts"
Cohesion: 0.15
Nodes (19): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration(), BuildEffectiveGatewayConfigOptions (+11 more)

### Community 128 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.11
Nodes (16): HealthModule, Module, LoggingModule, Global, Module, ProviderInstancesBootstrap, Injectable, ProviderRegistryModule (+8 more)

### Community 129 - "anthropic-models.controller.ts"
Cohesion: 0.11
Nodes (22): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+14 more)

### Community 131 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

## Knowledge Gaps
- **426 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+421 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1205 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `branded.types.ts`, `asProviderInstanceId`, `gateway-config.schema.ts`, `models.controller.ts`, `sentry-ai-metrics.adapter.ts`, `chat.service.ts`, `GatewayKey`, `PrometheusAppMetricsAdapter`, `types/index.ts`, `config-generator.service.ts`, `GatewayConfig`, `AppMetricsService`, `LoggingService`, `metrics.ts`, `app-metrics.service.ts`, `app-metrics-backend.interface.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `provider-base-url.validation.ts`, `gateway-config.schema.ts`, `models.controller.ts`, `LogContext`, `cli.module.ts`, `PrometheusAppMetricsAdapter`, `AppMetricsService`, `LoggingService`, `.info`, `sentry-ai-metrics.adapter.ts`, `types/index.ts`, `config-generator.service.ts`, `metrics.ts`, `app-metrics.service.ts`, `app-metrics-backend.interface.ts`, `asProviderInstanceId`, `GatewayConfig`, `GatewayKey`, `branded.types.ts`, `chat.service.ts`, `configuration.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `DomainException` connect `DomainException` to `api/src/app.module.ts`, `save-output-edited.use-case.ts`, `.execute`, `prisma-run.adapter.ts`, `UserRepository`, `InvitationsController`, `llm-gateway.http.adapter.ts`, `RunRepository`, `auth.schemas.ts`, `CompanyContextRepository`, `prisma-invitation.adapter.ts`, `PrismaService`, `GuestQuotaPort`, `domain/company-context.types.ts`, `llm-hop.ts`, `auth.module.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _426 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `start-run-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09191919191919191 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.056100981767180924 - nodes in this community are weakly interconnected._
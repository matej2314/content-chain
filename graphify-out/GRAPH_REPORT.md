# Graph Report - content-chain  (2026-10-07)

## Corpus Check
- 687 files · ~222,436 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4446 nodes · 13732 edges · 140 communities (126 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 412 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8441c622`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- users.controller.ts
- social.types.ts
- api/company-context.types.ts
- cli-apply.types.ts
- wizard-orchestrator.service.ts
- run-details-view.tsx
- api-error.code.ts
- LogContext
- google-tools.mapper.ts
- cli.module.ts
- InMemoryRunSseHub
- ChatMessageDto
- social.graph.ts
- mappers/anthropic-tools.mapper.ts
- InvitationsController
- ChatParamsDto
- PrometheusAppMetricsAdapter
- semantic-cache.service.ts
- run-review-panel.tsx
- apiFetch
- auth.controller.ts
- ModelAlias
- NoopAppMetricsAdapter
- rate-run.use-case.ts
- redis-vector-store.adapter.ts
- cancel-run-dialog.tsx
- provider-instances.bootstrap.ts
- button.tsx
- chat-validation.service.ts
- ModelAddCommand
- auth.module.ts
- HealthService
- swagger.setup.ts
- logging.service.ts
- AnthropicMessagesRequestDto
- anthropic-response.mapper.ts
- runs.types.ts
- enums.ts
- feedback-form.tsx
- exitWithAgentReport
- sentry-ai-metrics.adapter.ts
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- openai-stream.mapper.ts
- config-validator.ts
- DomainException
- anthropic-models.controller.ts
- runs.controller.ts
- auth.api.ts
- ListRunsQueryDto
- AppMetricsBackend
- branded.types.ts
- FileManagerService
- Env
- anthropic/anthropic-tools.mapper.ts
- content.graph.ts
- domain/company-context.types.ts
- chat-completions.adapter.ts
- health-readiness-response.dto.ts
- HttpMethod
- RunRepository
- app-metrics.service.ts
- app-metrics-backend.interface.ts
- api/src/app.module.ts
- ChatToolingDto
- CompanyContext
- asProviderInstanceId
- OpenAiChatCompletionRequestDto
- http/http-exception.filter.ts
- LoggingService
- ChatResponseDto
- openai-messages.mapper.ts
- patch-company-context.use-case.ts
- HttpExceptionFilter
- parse-verifier-log-message.ts
- company-context.mapper.ts
- api/src/health/health.service.ts
- OpenAiChatMessageDto
- llm-gateway.http.adapter.ts
- PrometheusService
- ClientEditCommand
- SPEC — README
- openai-chat-message.dto.ts
- responses.adapter.ts
- GatewayConfig
- company-context.dto.ts
- .getOne
- ProviderRemoveCommand
- GatewayKey
- configuration.ts
- create-feedback.use-case.ts
- StartRunDto
- ai-provider.interface.ts
- route.ts
- start-run-form.tsx
- ModelEditCommand
- CompanyContextController
- save-output-edited.use-case.ts
- filters/http-exception.filter.ts
- ProviderAddCommand
- ProviderEditCommand
- AppMetricsModule
- AuthUserContext
- ClientAddCommand
- UserRepository
- openai-chat-completion-request.dto.ts
- chat.service.ts
- HealthController
- PrismaRefreshSessionAdapter
- cn
- EnvironmentVariables
- CompanyContextRepository
- prisma-invitation.adapter.ts
- PrismaService
- should-include-redis-stack.ts
- ConfigInitCommand
- ClientRemoveCommand
- ModelRemoveCommand
- Architektura
- brand
- configuration-validation.service.ts
- ai-provider-gateway/src/app.module.ts
- .getOne
- .getOne
- models.controller.ts
- openai-params-provider.mapper.ts
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
- health.api.ts
- openai-messages-provider.mapper.ts

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
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `ResponseCacheService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/response-cache.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (140 total, 13 thin omitted)

### Community 0 - "users.controller.ts"
Cohesion: 0.08
Nodes (24): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Injectable (+16 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (27): PageOutline, CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson() (+19 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (64): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+56 more)

### Community 3 - "cli-apply.types.ts"
Cohesion: 0.13
Nodes (15): PendingSecretsItem, CliRateLimit, ClientManagerService, Injectable, EnvPatchService, Injectable, AddClientInput, ApplyMutationResult (+7 more)

### Community 4 - "wizard-orchestrator.service.ts"
Cohesion: 0.05
Nodes (70): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, KeyGenerateCommand, Command, Option, WIZARD_INIT_STEPS (+62 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.06
Nodes (54): metadata, metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS (+46 more)

### Community 6 - "api-error.code.ts"
Cohesion: 0.16
Nodes (22): ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus() (+14 more)

### Community 7 - "LogContext"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 8 - "google-tools.mapper.ts"
Cohesion: 0.16
Nodes (24): asInputTokens(), asOutputTokens(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), getUsageMetadata(), textStream() (+16 more)

### Community 9 - "cli.module.ts"
Cohesion: 0.06
Nodes (58): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), resolveCliMode() (+50 more)

### Community 10 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 11 - "ChatMessageDto"
Cohesion: 0.08
Nodes (27): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+19 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.10
Nodes (41): isSocialRunRecord(), LlmHopService, Injectable, coercePassNoteVerdict(), isPassOnlyIssue(), toOutcome(), Inject, ideasOutputSchema (+33 more)

### Community 13 - "mappers/anthropic-tools.mapper.ts"
Cohesion: 0.12
Nodes (19): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+11 more)

### Community 14 - "InvitationsController"
Cohesion: 0.12
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 15 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 16 - "PrometheusAppMetricsAdapter"
Cohesion: 0.13
Nodes (5): healthStatusToGaugeValue(), PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppRequestLabels

### Community 17 - "semantic-cache.service.ts"
Cohesion: 0.06
Nodes (33): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend (+25 more)

### Community 18 - "run-review-panel.tsx"
Cohesion: 0.07
Nodes (41): DemoChip(), useDemoMode(), useGuestLocked(), buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload() (+33 more)

### Community 19 - "apiFetch"
Cohesion: 0.08
Nodes (38): metadata, fetchAppConfig(), AppConfig, parseAppConfig(), DemoModeContext, DemoModeContextValue, DemoModeProvider(), DemoModeState (+30 more)

### Community 20 - "auth.controller.ts"
Cohesion: 0.05
Nodes (46): BootstrapStatusUseCase, Inject, Injectable, AuthController, ApiCookieAuth, ApiTags, Body, Controller (+38 more)

### Community 21 - "ModelAlias"
Cohesion: 0.14
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, AppMetricsService, Injectable, TokenDirection

### Community 22 - "NoopAppMetricsAdapter"
Cohesion: 0.12
Nodes (3): NoopAppMetricsAdapter, Injectable, AppTokenUsage

### Community 23 - "rate-run.use-case.ts"
Cohesion: 0.08
Nodes (23): isGuestTaskType(), Inject, ratingSchema, Inject, assertRunReviewable(), ReviewWindowParams, GUEST_QUOTA, GuestQuotaAdmitResult (+15 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.11
Nodes (23): isUnservableCachedReply(), CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag() (+15 more)

### Community 25 - "cancel-run-dialog.tsx"
Cohesion: 0.11
Nodes (29): logoutSession(), GuestLimitModal(), GuestLimitModalProps, assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef (+21 more)

### Community 26 - "provider-instances.bootstrap.ts"
Cohesion: 0.27
Nodes (10): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+2 more)

### Community 27 - "button.tsx"
Cohesion: 0.10
Nodes (34): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite(), registerAccount() (+26 more)

### Community 28 - "chat-validation.service.ts"
Cohesion: 0.22
Nodes (13): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), ChatCompletionThinkingParam, isOpenAiEffortLevel(), isOpenAiReasoningRequested(), mapThinkingBudgetToEffort(), mapThinkingToResponsesReasoning() (+5 more)

### Community 29 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 30 - "auth.module.ts"
Cohesion: 0.05
Nodes (60): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, ActivateAccountOutput, ActivateAccountInput, activateAccountSchema (+52 more)

### Community 31 - "HealthService"
Cohesion: 0.17
Nodes (5): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthService, Injectable

### Community 32 - "swagger.setup.ts"
Cohesion: 0.10
Nodes (21): AppModule, Module, ChatOutputTextDto, ApiProperty, SseDeltaPayloadDto, ApiProperty, bootstrap(), API_GLOBAL_PREFIX (+13 more)

### Community 33 - "logging.service.ts"
Cohesion: 0.10
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 35 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.05
Nodes (83): PAGE_OUTLINE_ROLE_LABELS, ArchiveRunsQuery, fetchUserRuns(), InitiatorOption, submitHitl(), HitlAccepted, isPageOutlineSectionRole(), isReelDuration() (+75 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.10
Nodes (28): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+20 more)

### Community 39 - "exitWithAgentReport"
Cohesion: 0.19
Nodes (7): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList()

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+20 more)

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.08
Nodes (18): LightRunItem, ListRunsResult, RunSnapshot, RunRecordBase, ALLOWED_RUN_STATES, assertTransition(), CANCELABLE_RUN_STATUSES, PrismaRunAdapter (+10 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.27
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "openai-stream.mapper.ts"
Cohesion: 0.17
Nodes (21): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+13 more)

### Community 45 - "config-validator.ts"
Cohesion: 0.31
Nodes (9): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, buildEffectiveGatewayConfig(), assertMasterKeyPresent() (+1 more)

### Community 46 - "DomainException"
Cohesion: 0.07
Nodes (36): ActivateAccountUseCase, Injectable, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds() (+28 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.28
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 48 - "runs.controller.ts"
Cohesion: 0.04
Nodes (72): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Injectable, GetRunLogsOutput, GetRunLogsUseCase, Inject (+64 more)

### Community 49 - "auth.api.ts"
Cohesion: 0.06
Nodes (38): geistMono, geistSans, metadata, ACTIVATION_FAILED_HINT, activateAccount(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+30 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 52 - "branded.types.ts"
Cohesion: 0.07
Nodes (49): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+41 more)

### Community 53 - "FileManagerService"
Cohesion: 0.11
Nodes (8): ConfigGeneratorService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, FileManagerService, Injectable, ValidationFormatter

### Community 54 - "Env"
Cohesion: 0.05
Nodes (36): AppModule, Module, readCookie(), isRecord(), JwtCookieStrategy, Inject, Injectable, NodemailerSmtpMailerAdapter (+28 more)

### Community 55 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.10
Nodes (37): asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic() (+29 more)

### Community 56 - "content.graph.ts"
Cohesion: 0.07
Nodes (46): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+38 more)

### Community 57 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 58 - "chat-completions.adapter.ts"
Cohesion: 0.19
Nodes (20): toHttpException(), asSystemFingerprint(), ProviderToolDefinition, ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas() (+12 more)

### Community 59 - "health-readiness-response.dto.ts"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 60 - "HttpMethod"
Cohesion: 0.22
Nodes (3): HttpMetricsMiddleware, Injectable, HttpMethod

### Community 61 - "RunRepository"
Cohesion: 0.05
Nodes (26): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, InProcessRunWorker, Inject, Injectable, Inject, Inject (+18 more)

### Community 62 - "app-metrics.service.ts"
Cohesion: 0.13
Nodes (13): HealthCheckResult, HealthRedisCheckResult, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller (+5 more)

### Community 63 - "app-metrics-backend.interface.ts"
Cohesion: 0.13
Nodes (10): AppProviderCallContext, AppProviderStreamScope, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+2 more)

### Community 64 - "api/src/app.module.ts"
Cohesion: 0.05
Nodes (58): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor (+50 more)

### Community 65 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 66 - "CompanyContext"
Cohesion: 0.29
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 67 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (41): collectPendingSecrets(), ProviderTestCommand, Command, Option, DEFAULT_MODELS, CliAiProvider, EnvPatchValue, ProviderPromptResult (+33 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "http/http-exception.filter.ts"
Cohesion: 0.32
Nodes (4): ErrorEnvelope, newRequestId(), RequestIdMiddleware, Injectable

### Community 70 - "LoggingService"
Cohesion: 0.06
Nodes (21): RedisConnectionService, Injectable, Inject, Inject, isRedisRequiredFromConfig(), ChatProviderCooldownService, Injectable, ChatValidationService (+13 more)

### Community 71 - "ChatResponseDto"
Cohesion: 0.22
Nodes (8): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, ChatUsageDto, ApiPropertyOptional

### Community 72 - "openai-messages.mapper.ts"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 73 - "patch-company-context.use-case.ts"
Cohesion: 0.27
Nodes (8): toPublicCompanyContext(), PatchCompanyContextUseCase, Inject, Injectable, assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.05
Nodes (40): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+32 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 82 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 85 - "responses.adapter.ts"
Cohesion: 0.26
Nodes (15): asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse() (+7 more)

### Community 86 - "GatewayConfig"
Cohesion: 0.09
Nodes (32): assertInteractiveAllowed(), DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), defaultModelPolicy(), ModelEditField (+24 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - ".getOne"
Cohesion: 0.19
Nodes (10): ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 89 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 92 - "GatewayKey"
Cohesion: 0.03
Nodes (88): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+80 more)

### Community 93 - "configuration.ts"
Cohesion: 0.12
Nodes (20): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration(), BuildEffectiveGatewayConfigOptions (+12 more)

### Community 94 - "create-feedback.use-case.ts"
Cohesion: 0.07
Nodes (29): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+21 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "ai-provider.interface.ts"
Cohesion: 0.08
Nodes (54): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, mapStopReasonToFinishReason(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation() (+46 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "start-run-form.tsx"
Cohesion: 0.08
Nodes (40): metadata, GATE_SECTION_LABELS, CompletenessChip(), useCompleteness(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType (+32 more)

### Community 99 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 100 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 101 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (33): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+25 more)

### Community 102 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 105 - "AppMetricsModule"
Cohesion: 0.12
Nodes (13): AiMetricsModule, Global, Module, AppMetricsModule, Global, Module, ObservabilityModule, Global (+5 more)

### Community 106 - "AuthUserContext"
Cohesion: 0.12
Nodes (22): Body, HttpCode, Post, orderItemsBySelectedIds(), isTerminalStatus(), RunsController, ApiCookieAuth, ApiTags (+14 more)

### Community 107 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 108 - "UserRepository"
Cohesion: 0.05
Nodes (24): Inject, MeUseCase, Inject, Injectable, Inject, Inject, Inject, AccountActivationRecord (+16 more)

### Community 110 - "chat.service.ts"
Cohesion: 0.05
Nodes (64): SemanticStoreEmbedState, CacheIdentityMessage, ChatCacheSource, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional (+56 more)

### Community 111 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 112 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 114 - "cn"
Cohesion: 0.07
Nodes (39): FeedbackCta(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot(), FloatingBoxSlot(), APP_NAV (+31 more)

### Community 115 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 117 - "CompanyContextRepository"
Cohesion: 0.21
Nodes (11): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PutCompanyContextUseCase, Inject (+3 more)

### Community 118 - "prisma-invitation.adapter.ts"
Cohesion: 0.15
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 119 - "PrismaService"
Cohesion: 0.10
Nodes (11): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable, PrismaModule, Global (+3 more)

### Community 120 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

### Community 121 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 122 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 123 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 126 - "configuration-validation.service.ts"
Cohesion: 0.16
Nodes (14): assertEnabledProviderSecretsPresent(), configurationValidation, ConfigurationValidationService, validate(), ValidatedEnvironment, assertEnabledProviderApiKeysPresent(), formatMissingProviderApiKeyError(), RawGatewayConfig (+6 more)

### Community 128 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.11
Nodes (19): ChatModule, Module, HealthModule, Module, AnthropicModule, Module, IntegrationsModule, Module (+11 more)

### Community 129 - ".getOne"
Cohesion: 0.18
Nodes (11): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+3 more)

### Community 130 - ".getOne"
Cohesion: 0.18
Nodes (11): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+3 more)

### Community 131 - "models.controller.ts"
Cohesion: 0.23
Nodes (10): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 132 - "openai-params-provider.mapper.ts"
Cohesion: 0.24
Nodes (11): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+3 more)

### Community 144 - "health.api.ts"
Cohesion: 0.27
Nodes (11): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+3 more)

### Community 145 - "openai-messages-provider.mapper.ts"
Cohesion: 0.27
Nodes (7): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

## Knowledge Gaps
- **426 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+421 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1192 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `ai-provider.interface.ts`, `cli-apply.types.ts`, `wizard-orchestrator.service.ts`, `asProviderInstanceId`, `api-error.code.ts`, `sentry-ai-metrics.adapter.ts`, `chat.service.ts`, `PrometheusAppMetricsAdapter`, `AppMetricsBackend`, `branded.types.ts`, `GatewayConfig`, `NoopAppMetricsAdapter`, `redis-vector-store.adapter.ts`, `app-metrics.service.ts`, `app-metrics-backend.interface.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `ai-provider.interface.ts`, `asProviderInstanceId`, `wizard-orchestrator.service.ts`, `cli-apply.types.ts`, `LoggingService`, `exitWithAgentReport`, `LogContext`, `sentry-ai-metrics.adapter.ts`, `chat.service.ts`, `PrometheusAppMetricsAdapter`, `branded.types.ts`, `GatewayConfig`, `NoopAppMetricsAdapter`, `app-metrics.service.ts`, `GatewayKey`, `configuration.ts`, `configuration-validation.service.ts`, `app-metrics-backend.interface.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `runs.controller.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _426 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `users.controller.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0761904761904762 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05460526315789474 - nodes in this community are weakly interconnected._
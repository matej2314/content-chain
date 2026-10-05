# Graph Report - content-chain  (2026-10-05)

## Corpus Check
- 672 files · ~215,824 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4365 nodes · 13437 edges · 136 communities (119 shown, 16 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 405 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `004a453a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- RunRepository
- social.types.ts
- isRecord
- runs-result.types.ts
- google-tools.mapper.ts
- start-run-form.tsx
- provider-error.mapper.ts
- LogContext
- anthropic/anthropic-tools.mapper.ts
- cli.module.ts
- in-process-run.worker.ts
- ConfigInitCommand
- social.graph.ts
- branded.types.ts
- run-review-panel.tsx
- chat-params.dto.ts
- register-form.tsx
- redis-vector-store.adapter.ts
- EnvRef
- users-view.tsx
- llm-hop.ts
- GatewayKey
- provider-instances.bootstrap.ts
- configuration.ts
- ai-provider-gateway/src/app.module.ts
- notify-product.tsx
- types/index.ts
- asProviderInstanceId
- PrometheusAppMetricsAdapter
- ModelAddCommand
- auth-user.types.ts
- ai-provider-gateway/src/health/health.service.ts
- swagger.setup.ts
- provider-registry.service.ts
- AnthropicMessagesRequestDto
- app-metrics.service.ts
- runs.types.ts
- enums.ts
- feedback-form.tsx
- DomainException
- sentry-ai-metrics.adapter.ts
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- openai-stream.mapper.ts
- LoggingService
- domain/feedback.types.ts
- anthropic-models.controller.ts
- RefreshSessionRepository
- http-metrics.interceptor.ts
- ListRunsQueryDto
- ModelAlias
- CompanyContext
- config-generator.service.ts
- apiFetch
- AppMetricsService
- content.graph.ts
- health.api.ts
- metrics.ts
- semantic-cache.service.ts
- GatewayModelDto
- company-context.dto.ts
- responses.adapter.ts
- logging.service.ts
- openai-params-provider.mapper.ts
- app-metrics-backend.interface.ts
- metrics.module.ts
- configuration-validation.service.ts
- OpenAiChatCompletionRequestDto
- HttpExceptionFilter
- company-context.mapper.ts
- PrismaService
- PublicConfigController
- prisma-invitation.adapter.ts
- UserRepository
- parse-verifier-log-message.ts
- EnvironmentVariables
- api/src/health/health.service.ts
- company-context.controller.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- patch-company-context.use-case.ts
- ClientEditCommand
- SPEC — README
- AuthController
- api/src/app.module.ts
- GatewayConfig
- .getOne
- should-include-redis-stack.ts
- ProviderRemoveCommand
- .create
- .getOne
- chat-stream.controller.ts
- .getOne
- GatewayModelsCatalogService
- StartRunDto
- api-error.code.ts
- route.ts
- home-entry.tsx
- ModelEditCommand
- ClientRemoveCommand
- save-output-edited.use-case.ts
- PrismaFeedbackRunReaderAdapter
- ProviderAddCommand
- ProviderEditCommand
- JwtAuthGuard
- AuthUserContext
- ClientAddCommand
- RolesGuard
- chat.service.ts
- HealthController
- ModelRemoveCommand
- cn
- domain/company-context.types.ts
- auth.module.ts
- CompanyContextController
- create-feedback.use-case.ts
- exitWithAgentReport
- start-run.use-case.ts
- Architektura
- brand
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
- ChatParamsDto
- OpenAiChatMessageDto
- openai-chat-message.dto.ts
- openai-chat-completion-request.dto.ts

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `ProviderInstanceId` - 81 edges
3. `DomainException` - 76 edges
4. `LoggingService` - 73 edges
5. `asProviderInstanceId()` - 67 edges
6. `GatewayConfig` - 65 edges
7. `isRecord()` - 62 edges
8. `cn()` - 62 edges
9. `GatewayKey` - 59 edges
10. `ClientId` - 54 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (136 total, 16 thin omitted)

### Community 0 - "RunRepository"
Cohesion: 0.03
Nodes (57): Inject, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput (+49 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (31): CompositeRunResultReader, GetRunOutput, OutputEditedWrite, OutputEditedWriter, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable (+23 more)

### Community 2 - "isRecord"
Cohesion: 0.06
Nodes (66): metadata, fetchCompanyContext(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+58 more)

### Community 3 - "runs-result.types.ts"
Cohesion: 0.06
Nodes (52): PAGE_OUTLINE_ROLE_LABELS, submitHitl(), HitlAccepted, isPageOutlineSectionRole(), isReelDuration(), PAGE_OUTLINE_SECTION_ROLES, PageDocument, PageOutline (+44 more)

### Community 4 - "google-tools.mapper.ts"
Cohesion: 0.15
Nodes (23): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+15 more)

### Community 5 - "start-run-form.tsx"
Cohesion: 0.07
Nodes (37): metadata, metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS (+29 more)

### Community 6 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 7 - "LogContext"
Cohesion: 0.07
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (39): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+31 more)

### Community 9 - "cli.module.ts"
Cohesion: 0.06
Nodes (63): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), CliModule (+55 more)

### Community 10 - "in-process-run.worker.ts"
Cohesion: 0.08
Nodes (20): AutoFinalizeExpiredReviewsUseCase, Injectable, Inject, RecoverInterruptedRunsUseCase, Inject, Injectable, RunLifecycleService, TransitionExtras (+12 more)

### Community 11 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 12 - "social.graph.ts"
Cohesion: 0.07
Nodes (59): CompanyContextRepository, LlmHopService, Injectable, coercePassNoteVerdict(), isPassOnlyIssue(), SocialPipelineFacade, toOutcome(), Inject (+51 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.12
Nodes (35): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, mapStopReasonToFinishReason(), CompleteOnceResult, StreamOnceResult, ProviderResponse (+27 more)

### Community 14 - "run-review-panel.tsx"
Cohesion: 0.08
Nodes (38): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+30 more)

### Community 15 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 16 - "register-form.tsx"
Cohesion: 0.12
Nodes (27): metadata, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite(), registerAccount(), AcceptInviteForm(), onSubmit() (+19 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (21): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+13 more)

### Community 18 - "EnvRef"
Cohesion: 0.15
Nodes (9): KeyGenerateCommand, Command, Option, EnvPatchService, Injectable, ClientCli, EnvRef, MissingProviderApiKey (+1 more)

### Community 19 - "users-view.tsx"
Cohesion: 0.09
Nodes (36): metadata, logoutSession(), CancelRunDialogProps, FALLBACK, LogoutDialog(), confirm(), LogoutDialogProps, createInvitation() (+28 more)

### Community 20 - "llm-hop.ts"
Cohesion: 0.21
Nodes (12): LLM_GATEWAY_PORT, isRetryable(), RetryReason, ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid() (+4 more)

### Community 21 - "GatewayKey"
Cohesion: 0.06
Nodes (34): GATEWAY_CACHE_HEADER, resolveClientIdFromKey(), GatewayKey, Express, Request, ResolvedGatewayClient, SmartRateLimitGuard, Injectable (+26 more)

### Community 22 - "provider-instances.bootstrap.ts"
Cohesion: 0.18
Nodes (12): GatewayProviderInstanceConfig, adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, AIProvider (+4 more)

### Community 23 - "configuration.ts"
Cohesion: 0.06
Nodes (66): PendingSecretsItem, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema (+58 more)

### Community 24 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.08
Nodes (21): ChatModule, Module, UnsupportedProviderException, GatewayModelConfig, AnthropicModule, Module, IntegrationsModule, Module (+13 more)

### Community 25 - "notify-product.tsx"
Cohesion: 0.21
Nodes (14): assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+6 more)

### Community 26 - "types/index.ts"
Cohesion: 0.09
Nodes (36): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createConversationId(), createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds() (+28 more)

### Community 27 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (50): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), collectPendingSecrets(), ProviderTestCommand, Command (+42 more)

### Community 28 - "PrometheusAppMetricsAdapter"
Cohesion: 0.10
Nodes (7): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope, AppRequestLabels, AppTokenUsage

### Community 29 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 30 - "auth-user.types.ts"
Cohesion: 0.07
Nodes (29): ListUsersUseCase, Inject, Injectable, SoftDeleteUserUseCase, Injectable, JwtPayload, UserListItem, PatchUserDto (+21 more)

### Community 31 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.10
Nodes (18): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty (+10 more)

### Community 32 - "swagger.setup.ts"
Cohesion: 0.04
Nodes (67): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional (+59 more)

### Community 33 - "provider-registry.service.ts"
Cohesion: 0.15
Nodes (21): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+13 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "app-metrics.service.ts"
Cohesion: 0.09
Nodes (18): AppMetricsModule, Global, Module, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags (+10 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.05
Nodes (68): metadata, useSession(), filterFeedbackRunOptions(), ArchiveRunsQuery, fetchRunLogs(), fetchRunSnapshot(), fetchUserRuns(), InitiatorOption (+60 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.23
Nodes (13): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+5 more)

### Community 39 - "DomainException"
Cohesion: 0.07
Nodes (36): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, comparePassword(), hashPassword(), ActivateAccountInput, activateAccountSchema (+28 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (33): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+25 more)

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.07
Nodes (19): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, RunRecordBase, ALLOWED_RUN_STATES, assertTransition(), CANCELABLE_RUN_STATUSES (+11 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.27
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "openai-stream.mapper.ts"
Cohesion: 0.17
Nodes (21): SseDoneEvent, fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto (+13 more)

### Community 45 - "LoggingService"
Cohesion: 0.06
Nodes (19): RedisConnectionService, Injectable, Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, isRedisRequiredFromConfig() (+11 more)

### Community 46 - "domain/feedback.types.ts"
Cohesion: 0.19
Nodes (8): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_BODY_MAX, FeedbackEntry, FeedbackRepository, PrismaFeedbackAdapter, Injectable

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.28
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 48 - "RefreshSessionRepository"
Cohesion: 0.10
Nodes (9): Inject, Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter (+1 more)

### Community 49 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.08
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 52 - "CompanyContext"
Cohesion: 0.26
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 53 - "config-generator.service.ts"
Cohesion: 0.11
Nodes (16): WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable, Injectable, WizardOrchestratorService, WizardRunResult (+8 more)

### Community 54 - "apiFetch"
Cohesion: 0.08
Nodes (39): geistMono, geistSans, metadata, activateAccount(), bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession() (+31 more)

### Community 55 - "AppMetricsService"
Cohesion: 0.10
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable

### Community 56 - "content.graph.ts"
Cohesion: 0.07
Nodes (47): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+39 more)

### Community 57 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 58 - "metrics.ts"
Cohesion: 0.07
Nodes (40): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+32 more)

### Community 59 - "semantic-cache.service.ts"
Cohesion: 0.07
Nodes (31): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName() (+23 more)

### Community 60 - "GatewayModelDto"
Cohesion: 0.36
Nodes (6): GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto, ApiProperty

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "responses.adapter.ts"
Cohesion: 0.09
Nodes (48): mapProviderResponseToAiObservation(), toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), mapAnthropicContentBlockToGateway() (+40 more)

### Community 63 - "logging.service.ts"
Cohesion: 0.09
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 64 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 65 - "app-metrics-backend.interface.ts"
Cohesion: 0.15
Nodes (10): healthStatusToGaugeValue(), AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod, HttpRequestLabels, RateLimitReason (+2 more)

### Community 66 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 67 - "configuration-validation.service.ts"
Cohesion: 0.12
Nodes (21): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, assertEnabledProviderSecretsPresent(), assertMasterKeyPresent() (+13 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 70 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 71 - "PrismaService"
Cohesion: 0.17
Nodes (5): PrismaModule, Global, Module, PrismaService, Injectable

### Community 72 - "PublicConfigController"
Cohesion: 0.17
Nodes (9): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject, PublicConfigModule (+1 more)

### Community 73 - "prisma-invitation.adapter.ts"
Cohesion: 0.13
Nodes (19): Inject, InvitationListItem, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, INVITATION_REPOSITORY, InvitationListRecord (+11 more)

### Community 74 - "UserRepository"
Cohesion: 0.05
Nodes (22): Inject, Inject, Inject, Inject, Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser (+14 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "company-context.controller.ts"
Cohesion: 0.19
Nodes (10): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PutCompanyContextUseCase, Inject (+2 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.10
Nodes (23): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+15 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "patch-company-context.use-case.ts"
Cohesion: 0.27
Nodes (8): toPublicCompanyContext(), PatchCompanyContextUseCase, Inject, Injectable, assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 82 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "AuthController"
Cohesion: 0.05
Nodes (38): BootstrapStatusUseCase, Injectable, AuthController, ApiTags, Body, Controller, HttpCode, Post (+30 more)

### Community 85 - "api/src/app.module.ts"
Cohesion: 0.07
Nodes (44): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome() (+36 more)

### Community 86 - "GatewayConfig"
Cohesion: 0.06
Nodes (36): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, defaultModelPolicy() (+28 more)

### Community 87 - ".getOne"
Cohesion: 0.19
Nodes (10): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 88 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

### Community 89 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 90 - ".create"
Cohesion: 0.20
Nodes (9): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 91 - ".getOne"
Cohesion: 0.19
Nodes (10): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 92 - "chat-stream.controller.ts"
Cohesion: 0.04
Nodes (57): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+49 more)

### Community 93 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "api-error.code.ts"
Cohesion: 0.08
Nodes (25): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload (+17 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "home-entry.tsx"
Cohesion: 0.06
Nodes (38): ACTIVATION_FAILED_HINT, GuestView, HomeEntry(), RegisterSuccess, fetchCompleteness(), CompletenessState, CompletenessChip(), CompletenessContext (+30 more)

### Community 99 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 100 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 101 - "save-output-edited.use-case.ts"
Cohesion: 0.14
Nodes (20): contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema, ideasArraySchema (+12 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 106 - "AuthUserContext"
Cohesion: 0.05
Nodes (44): InviteUserUseCase, Inject, Injectable, ListInvitationsUseCase, Inject, Injectable, MeUseCase, Injectable (+36 more)

### Community 107 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 110 - "chat.service.ts"
Cohesion: 0.05
Nodes (64): SemanticStoreEmbedState, ChatCacheSource, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+56 more)

### Community 111 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.07
Nodes (38): FeedbackCta(), FloatingRunsBox(), handleChevronClick(), toggleCollapsed(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot() (+30 more)

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 118 - "auth.module.ts"
Cohesion: 0.05
Nodes (59): ActivateAccountOutput, ActivateAccountUseCase, Injectable, generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), InviteUserResult (+51 more)

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 120 - "create-feedback.use-case.ts"
Cohesion: 0.16
Nodes (13): CreateFeedbackUseCase, Inject, Injectable, FEEDBACK_RUN_READER, FeedbackRunLookup, FeedbackRunReader, FEEDBACK_REPOSITORY, FeedbackController (+5 more)

### Community 121 - "exitWithAgentReport"
Cohesion: 0.23
Nodes (8): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList()

### Community 122 - "start-run.use-case.ts"
Cohesion: 0.06
Nodes (31): InProcessRunWorker, Injectable, Inject, contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId (+23 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 146 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 147 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 150 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

## Knowledge Gaps
- **413 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+408 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1170 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `api-error.code.ts`, `provider-registry.service.ts`, `app-metrics-backend.interface.ts`, `types/index.ts`, `app-metrics.service.ts`, `asProviderInstanceId`, `sentry-ai-metrics.adapter.ts`, `branded.types.ts`, `chat.service.ts`, `redis-vector-store.adapter.ts`, `config-generator.service.ts`, `GatewayConfig`, `configuration.ts`, `AppMetricsService`, `metrics.ts`, `semantic-cache.service.ts`, `PrometheusAppMetricsAdapter`, `GatewayModelsCatalogService`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `LogContext`, `branded.types.ts`, `EnvRef`, `GatewayKey`, `provider-instances.bootstrap.ts`, `configuration.ts`, `types/index.ts`, `asProviderInstanceId`, `PrometheusAppMetricsAdapter`, `provider-registry.service.ts`, `app-metrics.service.ts`, `sentry-ai-metrics.adapter.ts`, `config-generator.service.ts`, `AppMetricsService`, `metrics.ts`, `app-metrics-backend.interface.ts`, `configuration-validation.service.ts`, `GatewayConfig`, `GatewayModelsCatalogService`, `chat.service.ts`, `exitWithAgentReport`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `api-error.code.ts`, `provider-registry.service.ts`, `swagger.setup.ts`, `google-tools.mapper.ts`, `LogContext`, `anthropic/anthropic-tools.mapper.ts`, `chat.service.ts`, `redis-vector-store.adapter.ts`, `GatewayKey`, `provider-instances.bootstrap.ts`, `ai-provider-gateway/src/app.module.ts`, `semantic-cache.service.ts`, `ai-provider-gateway/src/health/health.service.ts`, `responses.adapter.ts`, `logging.service.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _413 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `RunRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.03458815958815959 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04989322461657931 - nodes in this community are weakly interconnected._
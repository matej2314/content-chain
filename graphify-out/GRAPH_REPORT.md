# Graph Report - content-chain  (2026-11-16)

## Corpus Check
- 769 files · ~303,044 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 5091 nodes · 16588 edges · 153 communities (135 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 433 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `55159b17`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- create-feedback.use-case.ts
- social.types.ts
- company-context-form.tsx
- prisma-user.adapter.ts
- cn
- semantic-cache.service.ts
- Env
- AppMetricsBackend
- useSession
- anthropic/anthropic-tools.mapper.ts
- users.api.ts
- branded.types.ts
- .info
- PrismaRunAdapter
- prisma-email-change-request.adapter.ts
- provider-error.mapper.ts
- ref_nestjs_common
- .createMessage
- own-runs-provider.tsx
- chat.service.ts
- dashboard-shell.tsx
- runs.types.ts
- configuration.ts
- ai-provider-gateway/src/app.module.ts
- api/src/app.module.ts
- auth.module.ts
- RunRepository
- packages_shared_dist_index_userid
- anthropic-response.mapper.ts
- PrometheusAppMetricsAdapter
- content.types.ts
- RedisConnectionService
- logging.service.ts
- provider-registry.service.ts
- resolve-provider-call-options.ts
- ModelAlias
- domain/company-context.types.ts
- enums.ts
- content.graph.ts
- redis-vector-store.adapter.ts
- anthropic-models.controller.ts
- InvitationsController
- openai-params-provider.mapper.ts
- ids.ts
- wizard-orchestrator.service.ts
- openai-models.controller.ts
- LoggingService
- app-metrics.service.ts
- OpenAiChatCompletionRequestDto
- types/index.ts
- CompanyContextRepository
- ClientManagerService
- GatewayKey
- feedback-form.tsx
- app-metrics-backend.interface.ts
- agent-answers.schema.ts
- chat-stream.controller.ts
- ModelEditCommand
- api/src/health/health.service.ts
- metrics.ts
- sentry-ai-metrics.adapter.ts
- ModelRemoveCommand
- ref_class_transformer
- AnthropicMessagesRequestDto
- start-run.use-case.ts
- ClientAddCommand
- asProviderInstanceId
- ref_nestjs_swagger
- apiFetch
- cli.module.ts
- landing-view.tsx
- responses.adapter.ts
- openai-stream.mapper.ts
- anthropic-messages.controller.ts
- logging.module.ts
- parse-verifier-log-message.ts
- http-metrics.interceptor.ts
- ChatParamsDto
- StartRunForm
- archive-runs-view.tsx
- provider-instances.bootstrap.ts
- NoopAppMetricsAdapter
- user-invited.template.ts
- SPEC — README
- start-run-form.tsx
- UsersController
- company-context.mapper.ts
- company-context.dto.ts
- filters/http-exception.filter.ts
- should-include-redis-stack.ts
- EnvironmentVariables
- llm-hop.ts
- chat-tooling.dto.ts
- social.graph.ts
- RunExecutePump
- swagger.setup.ts
- HealthController
- route.ts
- CompanyContextController
- ModelAddCommand
- start-run.dto.ts
- seed.service.ts
- PrometheusService
- AuthUserContext
- HealthService
- HttpExceptionFilter
- AnthropicContentBlockDto
- AuthController
- api/src/main.ts
- src/index.ts
- ProviderRemoveCommand
- models.controller.ts
- src/pagination.ts
- ai-provider-gateway/src/health/health.service.ts
- ClientEditCommand
- CompanyContext
- .get
- ProviderEditCommand
- http-metrics.middleware.ts
- health-readiness-response.dto.ts
- PrismaRefreshSessionAdapter
- LocalRunSseHub
- prisma-invitation.adapter.ts
- http/http-exception.filter.ts
- Architektura
- RunSseNotifyListener
- output-edited-result.schemas.ts
- ProviderAddCommand
- api-openai-error-response.decorator.ts
- ListUsersUseCase
- LoginDto
- ConfigShowCommand
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
- llm-gateway.http.adapter.ts
- RunDispatchShutdown
- load-company-context-fixture.ts
- WorkerDispatchShutdown
- GuestGuard
- JwtAuthGuard
- RolesGuard
- RunsModule

## God Nodes (most connected - your core abstractions)
1. `DomainException` - 95 edges
2. `ModelAlias` - 88 edges
3. `ProviderInstanceId` - 81 edges
4. `Env` - 80 edges
5. `LoggingService` - 73 edges
6. `AuthUserContext` - 71 edges
7. `isRecord()` - 69 edges
8. `asProviderInstanceId()` - 67 edges
9. `GatewayConfig` - 65 edges
10. `cn()` - 65 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (153 total, 15 thin omitted)

### Community 0 - "create-feedback.use-case.ts"
Cohesion: 0.08
Nodes (27): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+19 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (27): PageOutline, CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, SocialResultStore (+19 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.05
Nodes (79): metadata, fetchCompanyContext(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+71 more)

### Community 3 - "prisma-user.adapter.ts"
Cohesion: 0.07
Nodes (20): Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult (+12 more)

### Community 4 - "cn"
Cohesion: 0.04
Nodes (66): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+58 more)

### Community 5 - "semantic-cache.service.ts"
Cohesion: 0.06
Nodes (35): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName() (+27 more)

### Community 6 - "Env"
Cohesion: 0.03
Nodes (51): Inject, Inject, Inject, Inject, Inject, Inject, RefreshSessionRepository, NodemailerSmtpMailerAdapter (+43 more)

### Community 8 - "useSession"
Cohesion: 0.08
Nodes (33): AccountManageMenu(), SessionState, useSession(), fetchAppConfig(), AppConfig, parseAppConfig(), DemoChip(), DemoModeContext (+25 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.06
Nodes (65): mapProviderResponseToAiObservation(), toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+57 more)

### Community 10 - "users.api.ts"
Cohesion: 0.10
Nodes (32): createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired(), parseInvitationList() (+24 more)

### Community 11 - "branded.types.ts"
Cohesion: 0.07
Nodes (57): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, PendingSecretsItem, DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens() (+49 more)

### Community 12 - ".info"
Cohesion: 0.06
Nodes (22): ConfigInitCommand, Command, Option, toSafeConfigSnapshot(), ConfigValidateCommand, Command, Option, ProviderTestCommand (+14 more)

### Community 13 - "PrismaRunAdapter"
Cohesion: 0.07
Nodes (12): RunSnapshot, RunLogEntry, RunRecordBase, PrismaRunAdapter, Injectable, RunLogRow, RunReviewFields, RunRow (+4 more)

### Community 14 - "prisma-email-change-request.adapter.ts"
Cohesion: 0.09
Nodes (12): Inject, Inject, Inject, EmailChangeRequestRecord, EmailChangeRequestRepository, UpsertEmailChangeRequestInput, isUniqueConstraintViolation(), PrismaEmailChangeRequestAdapter (+4 more)

### Community 15 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 16 - "ref_nestjs_common"
Cohesion: 0.03
Nodes (102): CancelRunUseCase, Inject, Injectable, GetRunLogsOutput, GetRunGuestAccess, CacheEntry, RUNS_SUMMARY_CACHE_TTL_MS, RUNS_SUMMARY_WINDOW_MS (+94 more)

### Community 17 - ".createMessage"
Cohesion: 0.06
Nodes (34): ApiHeader, ApiBody, ApiOperation, ApiResponse, Body, Post, Req, toChatResponseDto() (+26 more)

### Community 18 - "own-runs-provider.tsx"
Cohesion: 0.07
Nodes (41): assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+33 more)

### Community 19 - "chat.service.ts"
Cohesion: 0.05
Nodes (85): SemanticStoreEmbedState, CacheIdentityMessage, ChatCacheSource, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional (+77 more)

### Community 20 - "dashboard-shell.tsx"
Cohesion: 0.07
Nodes (41): fetchCompleteness(), CompletenessState, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE, useCompleteness() (+33 more)

### Community 21 - "runs.types.ts"
Cohesion: 0.03
Nodes (143): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+135 more)

### Community 22 - "configuration.ts"
Cohesion: 0.06
Nodes (45): CliValidateOptions, normalizeGatewayConfigForWrite(), ValidationFormatter, asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig (+37 more)

### Community 23 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.09
Nodes (21): ChatModule, Module, GatewayKeyGuard, Injectable, AnthropicModule, Module, IntegrationsModule, Module (+13 more)

### Community 24 - "api/src/app.module.ts"
Cohesion: 0.05
Nodes (58): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor (+50 more)

### Community 25 - "auth.module.ts"
Cohesion: 0.03
Nodes (120): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable, comparePassword() (+112 more)

### Community 26 - "RunRepository"
Cohesion: 0.04
Nodes (47): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsUseCase, Inject, Injectable, GetRunUseCase, Inject (+39 more)

### Community 27 - "packages_shared_dist_index_userid"
Cohesion: 0.04
Nodes (50): Inject, DeleteUserResult, DeleteUserUseCase, Inject, Injectable, RotateRefreshSessionResult, FEEDBACK_PURGE, FeedbackPurgePort (+42 more)

### Community 28 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 29 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (5): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope

### Community 30 - "content.types.ts"
Cohesion: 0.10
Nodes (15): ContentPipelineInput, ContentPipelineState, ContentRefineSnapshot, PageDocument, PageOutlineSection, PageOutlineSectionRole, VerifierVerdict, PrismaContentResultAdapter (+7 more)

### Community 31 - "RedisConnectionService"
Cohesion: 0.18
Nodes (6): RedisConnectionService, Injectable, isRedisRequiredFromConfig(), Inject, Optional, ref_ioredis

### Community 32 - "logging.service.ts"
Cohesion: 0.10
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 33 - "provider-registry.service.ts"
Cohesion: 0.13
Nodes (22): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+14 more)

### Community 34 - "resolve-provider-call-options.ts"
Cohesion: 0.39
Nodes (6): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, GatewayParamsConfig

### Community 35 - "ModelAlias"
Cohesion: 0.14
Nodes (6): ProviderTestOptions, CliAiModel, ModelAlias, ProviderInstanceId, AppMetricsService, Injectable

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.16
Nodes (21): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+13 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "content.graph.ts"
Cohesion: 0.11
Nodes (39): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+31 more)

### Community 39 - "redis-vector-store.adapter.ts"
Cohesion: 0.09
Nodes (29): isUnservableCachedReply(), CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag() (+21 more)

### Community 40 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 41 - "InvitationsController"
Cohesion: 0.14
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 42 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 43 - "ids.ts"
Cohesion: 0.08
Nodes (36): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createEmailChangeRequestId() (+28 more)

### Community 44 - "wizard-orchestrator.service.ts"
Cohesion: 0.06
Nodes (45): KeyGenerateCommand, Command, Option, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema (+37 more)

### Community 45 - "openai-models.controller.ts"
Cohesion: 0.12
Nodes (21): ApiOpenAiErrorResponses(), OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse (+13 more)

### Community 46 - "LoggingService"
Cohesion: 0.05
Nodes (25): Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, ChatErrorHandlerService, Injectable, ChatProviderCallService (+17 more)

### Community 47 - "app-metrics.service.ts"
Cohesion: 0.13
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

### Community 48 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (31): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+23 more)

### Community 49 - "types/index.ts"
Cohesion: 0.23
Nodes (18): CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId(), isFiniteNumber(), isMaxAttempts() (+10 more)

### Community 50 - "CompanyContextRepository"
Cohesion: 0.14
Nodes (15): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+7 more)

### Community 51 - "ClientManagerService"
Cohesion: 0.15
Nodes (5): ClientRemoveCommand, Command, Option, ClientManagerService, Injectable

### Community 52 - "GatewayKey"
Cohesion: 0.10
Nodes (23): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), GatewayKey, ResolvedGatewayClient, getAppConfig() (+15 more)

### Community 53 - "feedback-form.tsx"
Cohesion: 0.11
Nodes (26): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+18 more)

### Community 54 - "app-metrics-backend.interface.ts"
Cohesion: 0.18
Nodes (11): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+3 more)

### Community 55 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 56 - "chat-stream.controller.ts"
Cohesion: 0.09
Nodes (22): ChatController, ApiSecurity, ApiTags, Controller, ChatStreamController, ApiBody, ApiOperation, ApiProduces (+14 more)

### Community 57 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 58 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 59 - "metrics.ts"
Cohesion: 0.18
Nodes (17): getClientConversationId(), getOrCreateConversationIdForResponse(), buildLlmMetricsContext(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns(), composeSystemPrompt(), getResolvedSystemPrompts() (+9 more)

### Community 60 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (35): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+27 more)

### Community 61 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 62 - "ref_class_transformer"
Cohesion: 0.13
Nodes (15): ListRunsQueryDto, IsArray, IsIn, IsOptional, IsString, Transform, PaginationQueryDto, IsIn (+7 more)

### Community 63 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 64 - "start-run.use-case.ts"
Cohesion: 0.07
Nodes (29): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+21 more)

### Community 65 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 66 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (42): assertInteractiveAllowed(), convertModel(), CliAiProvider, ConfigPersistenceService, Injectable, defaultModelPolicy(), ModelManagerService, Injectable (+34 more)

### Community 67 - "ref_nestjs_swagger"
Cohesion: 0.06
Nodes (35): ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDonePayloadDto, SseDoneUsageDto, ApiPropertyOptional (+27 more)

### Community 68 - "apiFetch"
Cohesion: 0.06
Nodes (60): ACTIVATION_FAILED_HINT, activateAccount(), bootstrapAdmin(), confirmEmailChange(), Credentials, deleteOwnAccount(), fetchBootstrapStatus(), fetchUserSession() (+52 more)

### Community 69 - "cli.module.ts"
Cohesion: 0.09
Nodes (48): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+40 more)

### Community 70 - "landing-view.tsx"
Cohesion: 0.27
Nodes (11): LANDING_CONTEXT_IMAGES, LANDING_COPY, LANDING_HERO_IMAGES, LANDING_RUNS_IMAGES, LandingFeature, LandingPersona, LandingStep, LandingTech (+3 more)

### Community 71 - "responses.adapter.ts"
Cohesion: 0.08
Nodes (49): asSystemFingerprint(), asToolCallId(), assertOpenAiProviderType(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), ProviderAssistantTurn, ProviderChatInput, ProviderChatTurn (+41 more)

### Community 72 - "openai-stream.mapper.ts"
Cohesion: 0.18
Nodes (20): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+12 more)

### Community 73 - "anthropic-messages.controller.ts"
Cohesion: 0.12
Nodes (20): GATEWAY_CACHE_HEADER, ApiErrorCode, ApiErrorPayload, requireClientGatewayKey(), ANTHROPIC_STREAM_API_DESCRIPTION, mapAnthropicRequestToGateway(), AnthropicTool, mapAnthropicContentBlockToGateway() (+12 more)

### Community 74 - "logging.module.ts"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "http-metrics.interceptor.ts"
Cohesion: 0.11
Nodes (18): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+10 more)

### Community 77 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 78 - "StartRunForm"
Cohesion: 0.10
Nodes (25): GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode, isGuestAllowedTaskType(), isGuestQuotaCode() (+17 more)

### Community 79 - "archive-runs-view.tsx"
Cohesion: 0.05
Nodes (46): metadata, metadata, metadata, metadata, apps_frontend_src_app_globals, geistMono, inter, metadata (+38 more)

### Community 80 - "provider-instances.bootstrap.ts"
Cohesion: 0.12
Nodes (20): collectPendingSecrets(), EnvPatchService, Injectable, EnvRef, GatewayProviderInstanceConfig, assertEnabledProviderApiKeysPresent(), collectMissingEnabledProviderApiKeyErrors(), formatMissingProviderApiKeyError() (+12 more)

### Community 81 - "NoopAppMetricsAdapter"
Cohesion: 0.11
Nodes (3): NoopAppMetricsAdapter, Injectable, AppTokenUsage

### Community 82 - "user-invited.template.ts"
Cohesion: 0.18
Nodes (26): EmailChangeConfirmMail, UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments(), escapeHtml() (+18 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "start-run-form.tsx"
Cohesion: 0.06
Nodes (72): AccountDeleteFormProps, DeletePhase, AccountEmailFormProps, ModalState, AccountPasswordFormProps, INITIAL, PasswordFormState, AccountPendingEmailBannerProps (+64 more)

### Community 85 - "UsersController"
Cohesion: 0.13
Nodes (15): PatchUserDto, ApiProperty, IsBoolean, ApiCookieAuth, ApiTags, Body, Controller, Delete (+7 more)

### Community 86 - "company-context.mapper.ts"
Cohesion: 0.36
Nodes (6): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, CompanyContextWriteDetail, isComplete(), mergeCompanyContext()

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 89 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

### Community 90 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 91 - "llm-hop.ts"
Cohesion: 0.16
Nodes (14): LLM_GATEWAY_PORT, isRetryable(), RetryReason, ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid() (+6 more)

### Community 92 - "chat-tooling.dto.ts"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.13
Nodes (34): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+26 more)

### Community 94 - "RunExecutePump"
Cohesion: 0.18
Nodes (3): RunExecutePump, Injectable, hasPublishLog()

### Community 95 - "swagger.setup.ts"
Cohesion: 0.05
Nodes (42): AppModule, Module, ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString (+34 more)

### Community 96 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "CompanyContextController"
Cohesion: 0.13
Nodes (12): toCompanyContext(), toPartialCompanyContext(), CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller (+4 more)

### Community 99 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 100 - "start-run.dto.ts"
Cohesion: 0.16
Nodes (14): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+6 more)

### Community 101 - "seed.service.ts"
Cohesion: 0.17
Nodes (9): isEmptyCompanyContext(), SeedCliModule, Module, SeedModule, Module, SeedCompanyContextResult, SeedService, Injectable (+1 more)

### Community 102 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 103 - "AuthUserContext"
Cohesion: 0.06
Nodes (43): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+35 more)

### Community 104 - "HealthService"
Cohesion: 0.21
Nodes (4): HealthReadinessResponseDto, ApiProperty, HealthService, Injectable

### Community 106 - "AnthropicContentBlockDto"
Cohesion: 0.14
Nodes (14): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+6 more)

### Community 107 - "AuthController"
Cohesion: 0.16
Nodes (16): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+8 more)

### Community 108 - "api/src/main.ts"
Cohesion: 0.23
Nodes (9): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig(), ref_cookie_parser, ref_helmet (+1 more)

### Community 109 - "src/index.ts"
Cohesion: 0.33
Nodes (3): unbrand, RunTaskType, RunsSummaryResponse

### Community 110 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 111 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 112 - "src/pagination.ts"
Cohesion: 0.29
Nodes (5): DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, PageSize, PaginatedList

### Community 113 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.25
Nodes (7): RedisConsumer, HealthLivenessResponseDto, ApiProperty, HealthModule, Module, HealthCheckResult, HealthRedisCheckResult

### Community 114 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 115 - "CompanyContext"
Cohesion: 0.22
Nodes (8): assertAudienceProfileNamesUnique(), CompanyContext, normalizeAudienceName(), withEffectiveAudience(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 116 - ".get"
Cohesion: 0.50
Nodes (3): ApiOkResponse, ApiOperation, Get

### Community 117 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 118 - "http-metrics.middleware.ts"
Cohesion: 0.22
Nodes (3): HttpMetricsMiddleware, Injectable, HttpMethod

### Community 119 - "health-readiness-response.dto.ts"
Cohesion: 0.36
Nodes (7): HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional

### Community 120 - "PrismaRefreshSessionAdapter"
Cohesion: 0.31
Nodes (3): RefreshSessionRecord, PrismaRefreshSessionAdapter, Injectable

### Community 121 - "LocalRunSseHub"
Cohesion: 0.29
Nodes (3): LocalRunSseHub, Inject, Injectable

### Community 122 - "prisma-invitation.adapter.ts"
Cohesion: 0.16
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 123 - "http/http-exception.filter.ts"
Cohesion: 0.32
Nodes (4): ErrorEnvelope, newRequestId(), RequestIdMiddleware, Injectable

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "RunSseNotifyListener"
Cohesion: 0.33
Nodes (3): RunSseNotifyListener, Inject, Injectable

### Community 126 - "output-edited-result.schemas.ts"
Cohesion: 0.07
Nodes (30): contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema, ideasArraySchema (+22 more)

### Community 127 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 128 - "api-openai-error-response.decorator.ts"
Cohesion: 0.47
Nodes (4): OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional

### Community 129 - "ListUsersUseCase"
Cohesion: 0.33
Nodes (3): ListUsersUseCase, Inject, Injectable

### Community 130 - "LoginDto"
Cohesion: 0.33
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 131 - "ConfigShowCommand"
Cohesion: 0.40
Nodes (3): ConfigShowCommand, Command, Option

### Community 144 - "llm-gateway.http.adapter.ts"
Cohesion: 0.09
Nodes (26): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+18 more)

### Community 145 - "RunDispatchShutdown"
Cohesion: 0.40
Nodes (3): RunDispatchShutdown, Inject, Injectable

### Community 146 - "load-company-context-fixture.ts"
Cohesion: 0.15
Nodes (13): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, audienceProfileSchema, CompanyContextFixture, companyContextFixtureSchema (+5 more)

### Community 147 - "WorkerDispatchShutdown"
Cohesion: 0.40
Nodes (3): Inject, Injectable, WorkerDispatchShutdown

### Community 148 - "GuestGuard"
Cohesion: 0.40
Nodes (3): GuestGuard, Inject, Injectable

## Knowledge Gaps
- **529 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+524 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1395 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Env` connect `Env` to `start-run.use-case.ts`, `LocalRunSseHub`, `prisma-user.adapter.ts`, `RunRepository`, `seed.service.ts`, `llm-hop.ts`, `api/src/main.ts`, `prisma-email-change-request.adapter.ts`, `llm-gateway.http.adapter.ts`, `ref_nestjs_common`, `CompanyContextRepository`, `GuestGuard`, `auth.module.ts`, `api/src/health/health.service.ts`, `packages_shared_dist_index_userid`, `RunSseNotifyListener`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `start-run.use-case.ts`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `AppMetricsBackend`, `branded.types.ts`, `.info`, `chat.service.ts`, `configuration.ts`, `PrometheusAppMetricsAdapter`, `provider-registry.service.ts`, `redis-vector-store.adapter.ts`, `wizard-orchestrator.service.ts`, `LoggingService`, `app-metrics.service.ts`, `types/index.ts`, `app-metrics-backend.interface.ts`, `metrics.ts`, `sentry-ai-metrics.adapter.ts`, `asProviderInstanceId`, `cli.module.ts`, `logging.module.ts`, `provider-instances.bootstrap.ts`, `NoopAppMetricsAdapter`, `models.controller.ts`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _529 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `create-feedback.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08194905869324474 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.053975363941769314 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.04758636467627545 - nodes in this community are weakly interconnected._
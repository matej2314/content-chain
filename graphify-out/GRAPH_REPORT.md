# Graph Report - content-chain  (2026-11-17)

## Corpus Check
- 771 files · ~303,272 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 5098 nodes · 16601 edges · 136 communities (120 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 433 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ea4944fb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ai-provider.interface.ts
- packages_shared_dist_index_runid
- company-context-form.tsx
- AuthUser
- cn
- semantic-cache.service.ts
- DomainException
- AppMetricsBackend
- asProviderInstanceId
- anthropic/anthropic-tools.mapper.ts
- apiFetch
- provider-manager.service.ts
- .section
- prisma-run.adapter.ts
- PrismaEmailChangeRequestAdapter
- provider-registry.service.ts
- pg-boss-run.worker.ts
- google-tools.mapper.ts
- own-runs-provider.tsx
- chat.service.ts
- health.api.ts
- runs.types.ts
- configuration.ts
- ai-provider-gateway/src/app.module.ts
- worker-runtime.module.ts
- auth.module.ts
- RunRepository
- packages_shared_dist_index
- anthropic-messages.controller.ts
- PrometheusAppMetricsAdapter
- app/layout.tsx
- ioredis-guest-quota.adapter.ts
- ref_nestjs_common
- resilient-executor.ts
- resolve-provider-call-options.ts
- AppMetricsService
- domain/company-context.types.ts
- enums.ts
- content.graph.ts
- redis-vector-store.adapter.ts
- anthropic-models.controller.ts
- auth.schemas.ts
- openai-params-provider.mapper.ts
- ids.ts
- cli.module.ts
- openai-models.controller.ts
- LoggingService
- domain/is-complete.ts
- OpenAiChatCompletionRequestDto
- branded.types.ts
- CompanyContextRepository
- ClientRemoveCommand
- ref_express
- feedback-form.tsx
- app-metrics.service.ts
- ConfigValidateCommand
- chat-stream.controller.ts
- ModelEditCommand
- api/src/health/health.service.ts
- metrics.ts
- sentry-ai-metrics.adapter.ts
- ModelRemoveCommand
- JwtCookieStrategy
- AnthropicMessagesRequestDto
- run.schemas.ts
- ClientAddCommand
- GatewayConfig
- ref_nestjs_swagger
- home-entry.tsx
- exitWithAgentReport
- responses.adapter.ts
- openai-chat-completions.controller.ts
- ChatMessageDto
- LogContext
- parse-verifier-log-message.ts
- metrics.module.ts
- ChatParamsDto
- start-run-form.tsx
- archive-runs-view.tsx
- EnvRef
- ModelAlias
- transactional-mailer.port.ts
- SPEC — README
- ref_react
- PaginationQueryDto
- patch-company-context.use-case.ts
- company-context.dto.ts
- filters/http-exception.filter.ts
- should-include-redis-stack.ts
- EnvironmentVariables
- llm-hop.ts
- RunExecutePump
- export-openapi.ts
- ApiRequestIdHeader
- route.ts
- company-context.mapper.ts
- ModelAddCommand
- StartRunDto
- PrometheusService
- AuthUserContext
- HealthService
- http/http-exception.filter.ts
- AuthController
- api/src/main.ts
- ProviderRemoveCommand
- models.controller.ts
- src/pagination.ts
- ClientEditCommand
- PrismaCompanyContextAdapter
- PublicConfigController
- ProviderEditCommand
- health-readiness-response.dto.ts
- RefreshSessionRepository
- prisma-invitation.adapter.ts
- Architektura
- save-output-edited.use-case.ts
- ProviderAddCommand
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
- run-dispatch.module.ts
- load-company-context-fixture.ts
- guest.guard.ts
- JwtAuthGuard
- RolesGuard

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
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `Request` --references--> `AuthUserContext`  [EXTRACTED]
  apps/api/src/shared/http/express.d.ts → apps/api/src/shared/types/auth-user-context.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `ResponseCacheService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/response-cache.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (136 total, 13 thin omitted)

### Community 0 - "ai-provider.interface.ts"
Cohesion: 0.13
Nodes (32): CachedChatResponse, CachedChatWarning, CachedFinishReason, mapStopReasonToFinishReason(), CompleteOnceResult, StreamOnceParams, StreamOnceResult, ProviderResponse (+24 more)

### Community 1 - "packages_shared_dist_index_runid"
Cohesion: 0.05
Nodes (40): CompositeRunResultReader, GetRunGuestAccess, GetRunOutput, orderItemsBySelectedIds(), OutputEditedWrite, OutputEditedWriter, RUN_RESULT_READER, RunResultReader (+32 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.03
Nodes (106): metadata, fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+98 more)

### Community 3 - "AuthUser"
Cohesion: 0.06
Nodes (20): AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult, CreateUserData (+12 more)

### Community 4 - "cn"
Cohesion: 0.05
Nodes (59): AccountManageMenu(), AccountManageMenuProps, ManageDialog, SessionState, DemoChip(), useDemoMode(), FeedbackCta(), AccountKpiCards() (+51 more)

### Community 5 - "semantic-cache.service.ts"
Cohesion: 0.06
Nodes (35): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName() (+27 more)

### Community 6 - "DomainException"
Cohesion: 0.07
Nodes (52): AcceptInviteResult, acceptInviteSchema, ActivateAccountOutput, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs() (+44 more)

### Community 8 - "asProviderInstanceId"
Cohesion: 0.12
Nodes (28): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+20 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (46): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens(), asPromptCacheHitTokens() (+38 more)

### Community 10 - "apiFetch"
Cohesion: 0.06
Nodes (52): deleteOwnAccount(), AccountDeleteForm(), onPurgeConfirm(), onReauthSubmit(), runDelete(), fetchAppConfig(), AppConfig, parseAppConfig() (+44 more)

### Community 11 - "provider-manager.service.ts"
Cohesion: 0.13
Nodes (27): PendingSecretsItem, DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ModelEditField, AddModelInput (+19 more)

### Community 12 - ".section"
Cohesion: 0.10
Nodes (13): ConfigInitCommand, Command, Option, ProviderTestCommand, Command, Option, CliGatewayValidatorService, Injectable (+5 more)

### Community 13 - "prisma-run.adapter.ts"
Cohesion: 0.05
Nodes (45): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, LightRunItem, ListLightRunsResult, ListRunsResult (+37 more)

### Community 14 - "PrismaEmailChangeRequestAdapter"
Cohesion: 0.24
Nodes (6): EmailChangeRequestRecord, UpsertEmailChangeRequestInput, isUniqueConstraintViolation(), PrismaEmailChangeRequestAdapter, toRecord(), Injectable

### Community 15 - "provider-registry.service.ts"
Cohesion: 0.15
Nodes (23): ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus() (+15 more)

### Community 16 - "pg-boss-run.worker.ts"
Cohesion: 0.07
Nodes (23): RunSseEvent, RunSseHub, RUN_EXECUTE_QUEUE, RUN_SSE_CHANNEL, RUN_WAKE_QUEUE, RunJobPayload, runJobPayloadSchema, LocalRunSseHub (+15 more)

### Community 17 - "google-tools.mapper.ts"
Cohesion: 0.16
Nodes (22): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+14 more)

### Community 18 - "own-runs-provider.tsx"
Cohesion: 0.07
Nodes (44): fetchUserSession(), patchOwnEmail(), resendEmailChangeConfirm(), parseSessionUser(), AccountEmailForm(), onConfirm(), onModalSubmit(), AccountPendingEmailBanner() (+36 more)

### Community 19 - "chat.service.ts"
Cohesion: 0.05
Nodes (64): SemanticStoreEmbedState, CacheIdentityMessage, ChatCacheSource, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional (+56 more)

### Community 20 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 21 - "runs.types.ts"
Cohesion: 0.03
Nodes (146): filterFeedbackRunOptions(), buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload() (+138 more)

### Community 22 - "configuration.ts"
Cohesion: 0.06
Nodes (59): CliValidateOptions, asCacheTtlSeconds(), asSemanticCacheTtlSeconds(), AppConfiguration, RedisRuntimeConfig, SemanticCacheRuntimeConfig, collectInactiveProviderWarnings(), formatZodIssues() (+51 more)

### Community 23 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.06
Nodes (32): ChatModule, Module, HealthModule, Module, AnthropicModule, Module, IntegrationsModule, Module (+24 more)

### Community 24 - "worker-runtime.module.ts"
Cohesion: 0.05
Nodes (61): AuthModule, Module, ContentPipelineFacade, Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject (+53 more)

### Community 25 - "auth.module.ts"
Cohesion: 0.03
Nodes (75): AcceptInviteUseCase, Injectable, ActivateAccountUseCase, Inject, Injectable, BootstrapAdminUseCase, Inject, Injectable (+67 more)

### Community 26 - "RunRepository"
Cohesion: 0.07
Nodes (5): Inject, Inject, Inject, Inject, RunRepository

### Community 27 - "packages_shared_dist_index"
Cohesion: 0.03
Nodes (68): DeleteUserResult, Inject, Row, UserRow, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+60 more)

### Community 28 - "anthropic-messages.controller.ts"
Cohesion: 0.10
Nodes (31): GATEWAY_CACHE_HEADER, SseDeltaEvent, SseDoneEvent, SseFinishReason, SseMetaEvent, fromGatewayToolCallDto(), asMessageId(), MessageId (+23 more)

### Community 29 - "PrometheusAppMetricsAdapter"
Cohesion: 0.13
Nodes (5): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppTokenUsage

### Community 30 - "app/layout.tsx"
Cohesion: 0.11
Nodes (13): metadata, metadata, apps_frontend_src_app_globals, AcceptInvitePage(), metadata, tokenFromSearchParam(), geistMono, inter (+5 more)

### Community 31 - "ioredis-guest-quota.adapter.ts"
Cohesion: 0.12
Nodes (14): GuestQuotaAdmitResult, GuestQuotaModule, Module, createRedis(), IoredisGuestQuotaAdapter, msUntilNextMidnight(), REDIS_COMMAND_OPTIONS, Inject (+6 more)

### Community 32 - "ref_nestjs_common"
Cohesion: 0.09
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 33 - "resilient-executor.ts"
Cohesion: 0.16
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 34 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 35 - "AppMetricsService"
Cohesion: 0.11
Nodes (4): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.19
Nodes (14): COMPANY_CONTEXT_SINGLETON_ID, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail, CtaItem (+6 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "content.graph.ts"
Cohesion: 0.07
Nodes (53): toOutcome(), Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+45 more)

### Community 39 - "redis-vector-store.adapter.ts"
Cohesion: 0.15
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 40 - "anthropic-models.controller.ts"
Cohesion: 0.09
Nodes (27): ApiAnthropicErrorResponses(), AnthropicMessagesController, ApiSecurity, ApiTags, Controller, AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse (+19 more)

### Community 41 - "auth.schemas.ts"
Cohesion: 0.11
Nodes (18): ActivateAccountInput, activateAccountSchema, BootstrapAdminInput, bootstrapAdminSchema, ChangeMePasswordInput, changeMePasswordSchema, confirmEmailChangeSchema, deleteOwnAccountSchema (+10 more)

### Community 42 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 43 - "ids.ts"
Cohesion: 0.08
Nodes (36): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createEmailChangeRequestId() (+28 more)

### Community 44 - "cli.module.ts"
Cohesion: 0.05
Nodes (59): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), CliModule, Module, ClientListCommand (+51 more)

### Community 45 - "openai-models.controller.ts"
Cohesion: 0.10
Nodes (25): ApiOpenAiErrorResponses(), OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse (+17 more)

### Community 46 - "LoggingService"
Cohesion: 0.07
Nodes (16): RedisConnectionService, Injectable, CacheRegistryService, Injectable, Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend (+8 more)

### Community 47 - "domain/is-complete.ts"
Cohesion: 0.50
Nodes (7): GATE_SECTIONS, collectGateItemPaths(), isCompleteAudienceProfile(), isCompleteCtaItem(), isCompleteOfferItem(), nonEmpty(), sectionFilled

### Community 48 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (33): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+25 more)

### Community 49 - "branded.types.ts"
Cohesion: 0.10
Nodes (34): CliRateLimit, RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds() (+26 more)

### Community 50 - "CompanyContextRepository"
Cohesion: 0.06
Nodes (33): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PutCompanyContextUseCase, Inject (+25 more)

### Community 51 - "ClientRemoveCommand"
Cohesion: 0.33
Nodes (3): ClientRemoveCommand, Command, Option

### Community 52 - "ref_express"
Cohesion: 0.10
Nodes (24): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard (+16 more)

### Community 53 - "feedback-form.tsx"
Cohesion: 0.12
Nodes (24): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+16 more)

### Community 54 - "app-metrics.service.ts"
Cohesion: 0.16
Nodes (14): healthStatusToGaugeValue(), APP_METRICS_BACKEND, AppProviderStreamScope, AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot (+6 more)

### Community 55 - "ConfigValidateCommand"
Cohesion: 0.40
Nodes (3): ConfigValidateCommand, Command, Option

### Community 56 - "chat-stream.controller.ts"
Cohesion: 0.04
Nodes (51): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+43 more)

### Community 57 - "ModelEditCommand"
Cohesion: 0.33
Nodes (3): ModelEditCommand, Command, Option

### Community 58 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 59 - "metrics.ts"
Cohesion: 0.09
Nodes (25): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias() (+17 more)

### Community 60 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.09
Nodes (31): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+23 more)

### Community 61 - "ModelRemoveCommand"
Cohesion: 0.33
Nodes (3): ModelRemoveCommand, Command, Option

### Community 62 - "JwtCookieStrategy"
Cohesion: 0.33
Nodes (4): isRecord(), JwtCookieStrategy, Inject, Injectable

### Community 63 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 64 - "run.schemas.ts"
Cohesion: 0.13
Nodes (15): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+7 more)

### Community 65 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 66 - "GatewayConfig"
Cohesion: 0.06
Nodes (26): ClientManagerService, Injectable, ConfigGeneratorService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, FileManagerService (+18 more)

### Community 67 - "ref_nestjs_swagger"
Cohesion: 0.05
Nodes (52): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+44 more)

### Community 68 - "home-entry.tsx"
Cohesion: 0.10
Nodes (24): ACTIVATION_FAILED_HINT, activateAccount(), confirmEmailChange(), fetchBootstrapStatus(), resendActivation(), AuthMode, AuthUi, GuestSurface (+16 more)

### Community 69 - "exitWithAgentReport"
Cohesion: 0.08
Nodes (56): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers() (+48 more)

### Community 71 - "responses.adapter.ts"
Cohesion: 0.08
Nodes (48): toHttpException(), asSystemFingerprint(), asToolCallId(), assertOpenAiProviderType(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), ProviderAssistantTurn, ProviderChatTurn (+40 more)

### Community 72 - "openai-chat-completions.controller.ts"
Cohesion: 0.17
Nodes (21): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional (+13 more)

### Community 73 - "ChatMessageDto"
Cohesion: 0.16
Nodes (16): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+8 more)

### Community 74 - "LogContext"
Cohesion: 0.06
Nodes (26): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+18 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "metrics.module.ts"
Cohesion: 0.15
Nodes (11): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Inject (+3 more)

### Community 77 - "ChatParamsDto"
Cohesion: 0.12
Nodes (16): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+8 more)

### Community 78 - "start-run-form.tsx"
Cohesion: 0.08
Nodes (39): metadata, fetchCompanyContext(), GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact (+31 more)

### Community 79 - "archive-runs-view.tsx"
Cohesion: 0.04
Nodes (71): metadata, useGuestLocked(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS (+63 more)

### Community 80 - "EnvRef"
Cohesion: 0.10
Nodes (19): ConfigSecretsStatusCommand, Command, Option, CliAiProvider, EnvPatchService, Injectable, ProviderTestService, Injectable (+11 more)

### Community 81 - "ModelAlias"
Cohesion: 0.11
Nodes (6): ProviderTestOptions, CliAiModel, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable

### Community 82 - "transactional-mailer.port.ts"
Cohesion: 0.15
Nodes (28): EmailChangeConfirmMail, TransactionalMail, UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments() (+20 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ref_react"
Cohesion: 0.05
Nodes (92): ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite(), bootstrapAdmin(), Credentials, GUEST_HAS_ACTIVE_RUN (+84 more)

### Community 85 - "PaginationQueryDto"
Cohesion: 0.07
Nodes (29): PatchUserDto, ApiProperty, IsBoolean, ApiCookieAuth, ApiTags, Body, Controller, Delete (+21 more)

### Community 86 - "patch-company-context.use-case.ts"
Cohesion: 0.22
Nodes (10): toPublicCompanyContext(), PatchCompanyContextUseCase, Inject, Injectable, assertAudienceProfileNamesUnique(), assertCompanyContextWritable(), PartialCompanyContext, isComplete() (+2 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "filters/http-exception.filter.ts"
Cohesion: 0.19
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 89 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

### Community 90 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 93 - "llm-hop.ts"
Cohesion: 0.08
Nodes (50): withEffectiveAudience(), LLM_GATEWAY_PORT, isAbortError(), ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid() (+42 more)

### Community 94 - "RunExecutePump"
Cohesion: 0.11
Nodes (11): RunAbortRegistry, Injectable, RunExecutePump, Injectable, PgBossRunWorker, Inject, Injectable, RunAbortNotifyListener (+3 more)

### Community 95 - "export-openapi.ts"
Cohesion: 0.12
Nodes (17): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+9 more)

### Community 96 - "ApiRequestIdHeader"
Cohesion: 0.20
Nodes (9): ApiRequestIdHeader(), HealthLivenessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+1 more)

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 99 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 100 - "StartRunDto"
Cohesion: 0.22
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 102 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 103 - "AuthUserContext"
Cohesion: 0.04
Nodes (79): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase (+71 more)

### Community 104 - "HealthService"
Cohesion: 0.11
Nodes (10): HealthReadinessResponseDto, HealthService, Injectable, ApiOperation, ApiResponse, Get, PreMetricsScrapeHook, PreMetricsScrapeRegistry (+2 more)

### Community 105 - "http/http-exception.filter.ts"
Cohesion: 0.19
Nodes (7): ErrorEnvelope, Express, Request, HttpExceptionFilter, Catch, newRequestId(), packages_shared_dist_index_requestid

### Community 107 - "AuthController"
Cohesion: 0.07
Nodes (43): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+35 more)

### Community 108 - "api/src/main.ts"
Cohesion: 0.23
Nodes (9): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig(), ref_cookie_parser, ref_helmet (+1 more)

### Community 110 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 111 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 112 - "src/pagination.ts"
Cohesion: 0.15
Nodes (8): unbrand, RunTaskType, DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, PageSize, PaginatedList, RunsSummaryResponse

### Community 114 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 115 - "PrismaCompanyContextAdapter"
Cohesion: 0.31
Nodes (4): jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 116 - "PublicConfigController"
Cohesion: 0.17
Nodes (9): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject, PublicConfigModule (+1 more)

### Community 117 - "ProviderEditCommand"
Cohesion: 0.33
Nodes (3): ProviderEditCommand, Command, Option

### Community 119 - "health-readiness-response.dto.ts"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 120 - "RefreshSessionRepository"
Cohesion: 0.15
Nodes (6): Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 122 - "prisma-invitation.adapter.ts"
Cohesion: 0.05
Nodes (49): Inject, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase, Inject, Injectable (+41 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 126 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (33): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+25 more)

### Community 127 - "ProviderAddCommand"
Cohesion: 0.31
Nodes (3): ProviderAddCommand, Command, Option

### Community 144 - "llm-gateway.http.adapter.ts"
Cohesion: 0.07
Nodes (35): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+27 more)

### Community 145 - "run-dispatch.module.ts"
Cohesion: 0.06
Nodes (34): Inject, RUN_ABORT_SIGNAL, RunAbortSignalPort, RUN_JOB_ENQUEUE, RunJobEnqueuePort, createInProcessPgBossClient(), WorkHandler, isQueueNotFound() (+26 more)

### Community 146 - "load-company-context-fixture.ts"
Cohesion: 0.25
Nodes (8): audienceProfileSchema, CompanyContextFixture, companyContextFixtureSchema, ctaItemSchema, fixturePath(), loadCompanyContextFixture(), offerItemSchema, ref_node_fs

### Community 148 - "guest.guard.ts"
Cohesion: 0.21
Nodes (6): ALLOW_GUEST_KEY, IS_PUBLIC_KEY, GuestGuard, Inject, Injectable, ref_nestjs_passport

## Knowledge Gaps
- **529 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+524 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1397 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `isRunId()` connect `ids.ts` to `run.schemas.ts`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `Env` connect `DomainException` to `packages_shared_dist_index_runid`, `prisma-run.adapter.ts`, `llm-gateway.http.adapter.ts`, `run-dispatch.module.ts`, `pg-boss-run.worker.ts`, `guest.guard.ts`, `worker-runtime.module.ts`, `auth.module.ts`, `RunRepository`, `packages_shared_dist_index`, `ioredis-guest-quota.adapter.ts`, `content.graph.ts`, `CompanyContextRepository`, `api/src/health/health.service.ts`, `JwtCookieStrategy`, `llm-hop.ts`, `RunExecutePump`, `AuthUserContext`, `api/src/main.ts`, `PublicConfigController`, `prisma-invitation.adapter.ts`, `save-output-edited.use-case.ts`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `ai-provider.interface.ts`, `AppMetricsBackend`, `asProviderInstanceId`, `provider-manager.service.ts`, `.section`, `provider-registry.service.ts`, `chat.service.ts`, `configuration.ts`, `PrometheusAppMetricsAdapter`, `AppMetricsService`, `cli.module.ts`, `branded.types.ts`, `ref_express`, `app-metrics.service.ts`, `metrics.ts`, `sentry-ai-metrics.adapter.ts`, `GatewayConfig`, `ref_nestjs_swagger`, `exitWithAgentReport`, `LogContext`, `EnvRef`, `models.controller.ts`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _529 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ai-provider.interface.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13472706155632985 - nodes in this community are weakly interconnected._
- **Should `packages_shared_dist_index_runid` be split into smaller, more focused modules?**
  _Cohesion score 0.04750815090824406 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.03377284293314828 - nodes in this community are weakly interconnected._
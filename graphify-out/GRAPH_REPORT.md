# Graph Report - content-chain  (2026-11-13)

## Corpus Check
- 748 files · ~295,070 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 4945 nodes · 16122 edges · 150 communities (132 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 430 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `02fe1bc7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- auth.module.ts
- get-run.use-case.ts
- company-context-form.tsx
- dashboard-shell.tsx
- GatewayConfig
- semantic-cache.service.ts
- DomainException
- ModelAlias
- packages_shared_dist_index
- anthropic/anthropic-tools.mapper.ts
- branded.types.ts
- asProviderInstanceId
- prisma-invitation.adapter.ts
- prisma-run.adapter.ts
- prisma-email-change-request.adapter.ts
- api-error.code.ts
- swagger.setup.ts
- ai-provider.interface.ts
- ProviderTestCommand
- chat.service.ts
- .execute
- openai-models.controller.ts
- configuration.ts
- packages_shared_dist_index_userid
- cn
- AuthUserContext
- ClientAddCommand
- ref_express
- anthropic-messages.controller.ts
- invite-user.use-case.ts
- users-view.tsx
- ai-provider-gateway/src/app.module.ts
- response-cache.service.ts
- provider-registry.service.ts
- AnthropicMessagesRequestDto
- chat-stream.controller.ts
- domain/company-context.types.ts
- enums.ts
- content.graph.ts
- redis-vector-store.adapter.ts
- anthropic-models.controller.ts
- logging.service.ts
- health.api.ts
- ids.ts
- types/index.ts
- ClientEditCommand
- PrismaService
- responses.adapter.ts
- ref_nestjs_swagger
- google-tools.mapper.ts
- company-context.controller.ts
- ProviderRemoveCommand
- metrics.ts
- feedback-form.tsx
- metrics.module.ts
- OpenAiChatCompletionRequestDto
- should-include-redis-stack.ts
- archive-runs-view.tsx
- api/src/health/health.service.ts
- provider-instances.bootstrap.ts
- ai-metrics-backend.interface.ts
- Env
- openai-chat-completions.controller.ts
- isRecord
- company-context.mapper.ts
- agent-answers.schema.ts
- cli.module.ts
- apiFetch
- cancel-run-dialog.tsx
- exitWithAgentReport
- sentry-ai-metrics.adapter.ts
- openai-params-provider.mapper.ts
- landing-view.tsx
- api/src/app.module.ts
- logging.module.ts
- parse-verifier-log-message.ts
- LoggingService
- ChatToolingDto
- start-run-form.tsx
- runs.types.ts
- chat-completions.adapter.ts
- HealthService
- user-invited.template.ts
- SPEC — README
- InMemoryRunSseHub
- http-metrics.interceptor.ts
- ioredis-guest-quota.adapter.ts
- company-context.dto.ts
- ProviderRegistryService
- AuthController
- EnvironmentVariables
- PrometheusService
- FileManagerService
- social.graph.ts
- load-company-context-fixture.ts
- health-readiness-response.dto.ts
- openai-messages-provider.mapper.ts
- route.ts
- CompanyContextController
- ClientRemoveCommand
- start-run.dto.ts
- llm-gateway-chat.log.ts
- ModelEditCommand
- PaginationQueryDto
- ConsoleLoggerAdapter
- HttpExceptionFilter
- ProviderAddCommand
- ProviderEditCommand
- ModelRemoveCommand
- src/index.ts
- CompanyContext
- models.controller.ts
- src/pagination.ts
- ConfigInitCommand
- PinoLoggerAdapter
- assert-company-context-writable.ts
- openai-messages.mapper.ts
- LoggerBackend
- .chat
- .execute
- resolve-provider-call-options.ts
- ModelAddCommand
- ref_nestjs_common
- observability.module.ts
- Architektura
- .getMetrics
- save-output-edited.use-case.ts
- ClientListCommand
- ConfigSecretsStatusCommand
- ConfigShowCommand
- ModelListCommand
- gateway.command.ts
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
- instrument.ts
- CompanyContextRepository
- JwtAuthGuard
- RefreshSessionRepository

## God Nodes (most connected - your core abstractions)
1. `DomainException` - 95 edges
2. `ModelAlias` - 88 edges
3. `ProviderInstanceId` - 81 edges
4. `LoggingService` - 73 edges
5. `AuthUserContext` - 71 edges
6. `Env` - 69 edges
7. `isRecord()` - 69 edges
8. `asProviderInstanceId()` - 67 edges
9. `GatewayConfig` - 65 edges
10. `cn()` - 65 edges

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

## Communities (150 total, 15 thin omitted)

### Community 0 - "auth.module.ts"
Cohesion: 0.04
Nodes (55): AcceptInviteUseCase, Injectable, ActivateAccountUseCase, Injectable, BootstrapAdminUseCase, Injectable, BootstrapStatusUseCase, Injectable (+47 more)

### Community 1 - "get-run.use-case.ts"
Cohesion: 0.04
Nodes (42): ContentPipelineInput, ContentPipelineState, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole, VerifierVerdict (+34 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.05
Nodes (71): metadata, putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+63 more)

### Community 3 - "dashboard-shell.tsx"
Cohesion: 0.08
Nodes (34): fetchCompleteness(), CompletenessState, GATE_SECTION_LABELS, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE (+26 more)

### Community 4 - "GatewayConfig"
Cohesion: 0.09
Nodes (13): PendingSecretsItem, ClientManagerService, Injectable, ConfigPersistenceService, Injectable, EnvPatchService, Injectable, ProviderManagerService (+5 more)

### Community 5 - "semantic-cache.service.ts"
Cohesion: 0.07
Nodes (30): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName() (+22 more)

### Community 6 - "DomainException"
Cohesion: 0.08
Nodes (48): AcceptInviteResult, acceptInviteSchema, ActivateAccountOutput, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs() (+40 more)

### Community 7 - "ModelAlias"
Cohesion: 0.03
Nodes (36): HttpMetricsMiddleware, Injectable, ClientId, ModelAlias, ActiveStreamsTracker, Injectable, NoopAppMetricsAdapter, Injectable (+28 more)

### Community 8 - "packages_shared_dist_index"
Cohesion: 0.03
Nodes (85): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject (+77 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.10
Nodes (39): asPromptCacheCreationTokens(), asPromptCacheHitTokens(), anthropicModelRejectsSamplingParams(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort() (+31 more)

### Community 10 - "branded.types.ts"
Cohesion: 0.08
Nodes (53): ProviderTestOptions, DEFAULT_MODELS, CliAiModel, CliAiProvider, CliRateLimit, GatewayClient, ProviderPromptResult, ProviderTestService (+45 more)

### Community 11 - "asProviderInstanceId"
Cohesion: 0.12
Nodes (29): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), defaultModelPolicy(), ModelEditField, ModelManagerService (+21 more)

### Community 12 - "prisma-invitation.adapter.ts"
Cohesion: 0.16
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 13 - "prisma-run.adapter.ts"
Cohesion: 0.03
Nodes (49): InProcessRunWorker, Injectable, contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief (+41 more)

### Community 14 - "prisma-email-change-request.adapter.ts"
Cohesion: 0.21
Nodes (8): EmailChangeRequestRecord, UpsertEmailChangeRequestInput, isUniqueConstraintViolation(), PrismaEmailChangeRequestAdapter, Row, toRecord(), Injectable, packages_shared_dist_index_isuserrole

### Community 15 - "api-error.code.ts"
Cohesion: 0.14
Nodes (25): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError() (+17 more)

### Community 16 - "swagger.setup.ts"
Cohesion: 0.08
Nodes (33): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional (+25 more)

### Community 17 - "ai-provider.interface.ts"
Cohesion: 0.12
Nodes (35): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, SseMetaPayload, mapStopReasonToFinishReason(), CompleteOnceResult, StreamOnceParams (+27 more)

### Community 18 - "ProviderTestCommand"
Cohesion: 0.33
Nodes (3): ProviderTestCommand, Command, Option

### Community 19 - "chat.service.ts"
Cohesion: 0.06
Nodes (56): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+48 more)

### Community 20 - ".execute"
Cohesion: 0.09
Nodes (16): Inject, DeleteUserUseCase, Inject, Injectable, ApiCookieAuth, ApiTags, Body, Controller (+8 more)

### Community 21 - "openai-models.controller.ts"
Cohesion: 0.11
Nodes (22): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam (+14 more)

### Community 22 - "configuration.ts"
Cohesion: 0.06
Nodes (51): CliValidateOptions, normalizeGatewayConfigForWrite(), EnvPatchValue, ValidationFormatter, asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig (+43 more)

### Community 23 - "packages_shared_dist_index_userid"
Cohesion: 0.04
Nodes (38): Inject, DeleteUserResult, ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable (+30 more)

### Community 24 - "cn"
Cohesion: 0.03
Nodes (96): ACCEPT_INVITE_DEMO_HINT, logoutSession(), AcceptInviteFormProps, AcceptInviteFormState, initialState, AuthModal(), AuthModalProps, descriptionFor() (+88 more)

### Community 25 - "AuthUserContext"
Cohesion: 0.09
Nodes (28): orderItemsBySelectedIds(), isGuestArchiveStatus(), HitlDto, IsArray, IsString, PatchRunRatingDto, IsIn, ValidateIf (+20 more)

### Community 26 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 27 - "ref_express"
Cohesion: 0.09
Nodes (23): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard (+15 more)

### Community 28 - "anthropic-messages.controller.ts"
Cohesion: 0.13
Nodes (26): GATEWAY_CACHE_HEADER, SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+18 more)

### Community 29 - "invite-user.use-case.ts"
Cohesion: 0.09
Nodes (22): polishPlural(), InviteUserResult, inviteUserSchema, Inject, InvitationListItem, Inject, Inject, INVITATION_REPOSITORY (+14 more)

### Community 30 - "users-view.tsx"
Cohesion: 0.08
Nodes (44): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+36 more)

### Community 31 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.06
Nodes (30): ChatModule, Module, GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable, HealthModule, Module (+22 more)

### Community 32 - "response-cache.service.ts"
Cohesion: 0.10
Nodes (16): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, CacheModule, CacheModuleOptions (+8 more)

### Community 33 - "provider-registry.service.ts"
Cohesion: 0.13
Nodes (21): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+13 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "chat-stream.controller.ts"
Cohesion: 0.04
Nodes (57): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+49 more)

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.16
Nodes (20): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+12 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "content.graph.ts"
Cohesion: 0.09
Nodes (44): ContentPipelineFacade, toOutcome(), Inject, Injectable, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput (+36 more)

### Community 39 - "redis-vector-store.adapter.ts"
Cohesion: 0.10
Nodes (24): isUnservableCachedReply(), CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag() (+16 more)

### Community 40 - "anthropic-models.controller.ts"
Cohesion: 0.10
Nodes (25): ApiAnthropicErrorResponses(), AnthropicMessagesController, ApiSecurity, ApiTags, Controller, AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse (+17 more)

### Community 41 - "logging.service.ts"
Cohesion: 0.18
Nodes (9): RedisCacheModule, Module, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, getAppConfigOrThrow(), HealthCheckResult, HealthRedisCheckResult (+1 more)

### Community 42 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 43 - "ids.ts"
Cohesion: 0.08
Nodes (36): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createEmailChangeRequestId() (+28 more)

### Community 44 - "types/index.ts"
Cohesion: 0.12
Nodes (25): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+17 more)

### Community 45 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 46 - "PrismaService"
Cohesion: 0.05
Nodes (45): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+37 more)

### Community 47 - "responses.adapter.ts"
Cohesion: 0.22
Nodes (19): toCachedChatResponse(), asInputTokens(), asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls() (+11 more)

### Community 48 - "ref_nestjs_swagger"
Cohesion: 0.06
Nodes (38): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+30 more)

### Community 49 - "google-tools.mapper.ts"
Cohesion: 0.15
Nodes (25): asOutputTokens(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), getUsageMetadata(), textStream(), mapStopSequences() (+17 more)

### Community 50 - "company-context.controller.ts"
Cohesion: 0.22
Nodes (14): toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase (+6 more)

### Community 51 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 52 - "metrics.ts"
Cohesion: 0.07
Nodes (41): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+33 more)

### Community 53 - "feedback-form.tsx"
Cohesion: 0.11
Nodes (26): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+18 more)

### Community 54 - "metrics.module.ts"
Cohesion: 0.17
Nodes (9): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Inject (+1 more)

### Community 55 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.08
Nodes (27): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+19 more)

### Community 56 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

### Community 57 - "archive-runs-view.tsx"
Cohesion: 0.06
Nodes (47): metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, fetchArchiveRuns() (+39 more)

### Community 58 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 59 - "provider-instances.bootstrap.ts"
Cohesion: 0.23
Nodes (10): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+2 more)

### Community 60 - "ai-metrics-backend.interface.ts"
Cohesion: 0.14
Nodes (14): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, AiMetricsService, Inject, Injectable, AI_METRICS_BACKEND (+6 more)

### Community 61 - "Env"
Cohesion: 0.05
Nodes (35): Inject, Inject, NodemailerSmtpMailerAdapter, readSmtpConfig(), SmtpConfig, Inject, Injectable, readCookie() (+27 more)

### Community 62 - "openai-chat-completions.controller.ts"
Cohesion: 0.12
Nodes (27): fromGatewayToolCallDto(), OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiAuth(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto (+19 more)

### Community 63 - "isRecord"
Cohesion: 0.04
Nodes (83): buildOutputEditedBody(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload(), RESULT_KEYS_BY_TASK_TYPE (+75 more)

### Community 64 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (10): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+2 more)

### Community 65 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 66 - "cli.module.ts"
Cohesion: 0.05
Nodes (65): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), CliModule, Module, KeyGenerateCommand (+57 more)

### Community 67 - "apiFetch"
Cohesion: 0.04
Nodes (89): apps_frontend_src_app_globals, AcceptInvitePage(), metadata, tokenFromSearchParam(), geistMono, inter, metadata, spaceGrotesk (+81 more)

### Community 68 - "cancel-run-dialog.tsx"
Cohesion: 0.18
Nodes (17): assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+9 more)

### Community 69 - "exitWithAgentReport"
Cohesion: 0.12
Nodes (32): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers() (+24 more)

### Community 70 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.23
Nodes (15): applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext(), clearRequestMetadataContext(), SentryAiMetricsAdapter (+7 more)

### Community 71 - "openai-params-provider.mapper.ts"
Cohesion: 0.13
Nodes (23): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+15 more)

### Community 72 - "landing-view.tsx"
Cohesion: 0.27
Nodes (11): LANDING_CONTEXT_IMAGES, LANDING_COPY, LANDING_HERO_IMAGES, LANDING_RUNS_IMAGES, LandingFeature, LandingPersona, LandingStep, LandingTech (+3 more)

### Community 73 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (54): CompanyContextModule, Module, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject, Injectable, ContentModule (+46 more)

### Community 74 - "logging.module.ts"
Cohesion: 0.10
Nodes (19): LEVEL_ORDER, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, SentryErrorReportingAdapter, Injectable, parseLogLevel(), ErrorReportingBackend (+11 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "LoggingService"
Cohesion: 0.09
Nodes (12): RedisConnectionService, Injectable, Inject, Inject, isRedisRequiredFromConfig(), Inject, Optional, LogContext (+4 more)

### Community 77 - "ChatToolingDto"
Cohesion: 0.15
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 78 - "start-run-form.tsx"
Cohesion: 0.10
Nodes (32): metadata, fetchCompanyContext(), isGuestAllowedTaskType(), isGuestQuotaCode(), fetchRunSnapshot(), startRun(), parseStartRunAccepted(), AccountView() (+24 more)

### Community 79 - "runs.types.ts"
Cohesion: 0.04
Nodes (95): metadata, useSession(), useGuestLocked(), canEditResult(), ArchiveRunsQuery, fetchRunLogs(), fetchRunsSummary(), fetchUserRuns() (+87 more)

### Community 80 - "chat-completions.adapter.ts"
Cohesion: 0.21
Nodes (19): toHttpException(), asSystemFingerprint(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText() (+11 more)

### Community 81 - "HealthService"
Cohesion: 0.26
Nodes (3): HealthReadinessResponseDto, HealthService, Injectable

### Community 82 - "user-invited.template.ts"
Cohesion: 0.18
Nodes (26): EmailChangeConfirmMail, UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments(), escapeHtml() (+18 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "InMemoryRunSseHub"
Cohesion: 0.39
Nodes (3): RunSseEvent, InMemoryRunSseHub, Injectable

### Community 85 - "http-metrics.interceptor.ts"
Cohesion: 0.19
Nodes (11): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+3 more)

### Community 86 - "ioredis-guest-quota.adapter.ts"
Cohesion: 0.08
Nodes (19): isGuestTaskType(), Inject, Inject, GUEST_QUOTA, GuestQuotaAdmitResult, GuestQuotaPort, GuestQuotaModule, Module (+11 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ProviderRegistryService"
Cohesion: 0.19
Nodes (6): ChatProviderCallService, Injectable, UnsupportedProviderException, GatewayModelConfig, ProviderRegistryService, Injectable

### Community 89 - "AuthController"
Cohesion: 0.08
Nodes (32): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+24 more)

### Community 90 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 91 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 92 - "FileManagerService"
Cohesion: 0.11
Nodes (12): ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable, ConfigGeneratorService, Injectable, FileManagerService (+4 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.12
Nodes (36): loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType (+28 more)

### Community 94 - "load-company-context-fixture.ts"
Cohesion: 0.12
Nodes (15): isEmptyCompanyContext(), audienceProfileSchema, CompanyContextFixture, companyContextFixtureSchema, ctaItemSchema, fixturePath(), loadCompanyContextFixture(), offerItemSchema (+7 more)

### Community 95 - "health-readiness-response.dto.ts"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 96 - "openai-messages-provider.mapper.ts"
Cohesion: 0.27
Nodes (7): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 99 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 100 - "start-run.dto.ts"
Cohesion: 0.16
Nodes (14): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+6 more)

### Community 101 - "llm-gateway-chat.log.ts"
Cohesion: 0.23
Nodes (11): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmChatMessage (+3 more)

### Community 102 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 103 - "PaginationQueryDto"
Cohesion: 0.15
Nodes (13): ListRunsQueryDto, IsArray, IsIn, IsOptional, IsString, Transform, PaginationQueryDto, IsIn (+5 more)

### Community 105 - "HttpExceptionFilter"
Cohesion: 0.36
Nodes (3): ErrorEnvelope, HttpExceptionFilter, Catch

### Community 106 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 107 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 108 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 109 - "src/index.ts"
Cohesion: 0.33
Nodes (3): unbrand, RunTaskType, RunsSummaryResponse

### Community 110 - "CompanyContext"
Cohesion: 0.29
Nodes (6): CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 111 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 112 - "src/pagination.ts"
Cohesion: 0.29
Nodes (5): DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, PageSize, PaginatedList

### Community 113 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 115 - "assert-company-context-writable.ts"
Cohesion: 0.36
Nodes (5): assertAudienceProfileNamesUnique(), CompanyContextWriteDetail, normalizeAudienceName(), withEffectiveAudience(), createLoadContextNode()

### Community 116 - "openai-messages.mapper.ts"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 118 - ".chat"
Cohesion: 0.31
Nodes (3): LlmGatewayHttpAdapter, Inject, Injectable

### Community 119 - ".execute"
Cohesion: 0.31
Nodes (9): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, newConversationId() (+1 more)

### Community 120 - "resolve-provider-call-options.ts"
Cohesion: 0.39
Nodes (6): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, GatewayParamsConfig

### Community 121 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 122 - "ref_nestjs_common"
Cohesion: 0.05
Nodes (43): AppModule, Module, InviteUserUseCase, Injectable, ListInvitationsUseCase, Inject, Injectable, ResendInvitationUseCase (+35 more)

### Community 123 - "observability.module.ts"
Cohesion: 0.29
Nodes (6): AiMetricsModule, Global, Module, ObservabilityModule, Global, Module

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - ".getMetrics"
Cohesion: 0.29
Nodes (4): ApiOperation, ApiResponse, Get, Header

### Community 126 - "save-output-edited.use-case.ts"
Cohesion: 0.05
Nodes (48): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+40 more)

### Community 127 - "ClientListCommand"
Cohesion: 0.40
Nodes (3): ClientListCommand, Command, Option

### Community 128 - "ConfigSecretsStatusCommand"
Cohesion: 0.40
Nodes (3): ConfigSecretsStatusCommand, Command, Option

### Community 129 - "ConfigShowCommand"
Cohesion: 0.40
Nodes (3): ConfigShowCommand, Command, Option

### Community 130 - "ModelListCommand"
Cohesion: 0.40
Nodes (3): ModelListCommand, Command, Option

### Community 131 - "gateway.command.ts"
Cohesion: 0.40
Nodes (3): GatewayCommand, Command, ref_boxen

### Community 144 - "llm-gateway.http.adapter.ts"
Cohesion: 0.16
Nodes (12): GatewayChatResponse, GatewayErrorBody, RETRYABLE_CODES, LlmGatewayPort, LlmChatCommand, LlmChatResult, GATEWAY_ERROR_CODE_LABELS, toGatewayErrorCodeLabel() (+4 more)

### Community 146 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (6): Inject, Inject, Inject, Inject, CompanyContextRepository, Inject

### Community 149 - "RefreshSessionRepository"
Cohesion: 0.09
Nodes (10): Inject, Inject, Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult (+2 more)

## Knowledge Gaps
- **509 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+504 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1344 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Env` connect `Env` to `auth.module.ts`, `get-run.use-case.ts`, `DomainException`, `ref_nestjs_common`, `packages_shared_dist_index`, `api/src/app.module.ts`, `llm-gateway.http.adapter.ts`, `CompanyContextRepository`, `RefreshSessionRepository`, `.chat`, `ioredis-guest-quota.adapter.ts`, `load-company-context-fixture.ts`, `api/src/health/health.service.ts`, `invite-user.use-case.ts`, `save-output-edited.use-case.ts`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `prisma-run.adapter.ts`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `branded.types.ts` to `provider-registry.service.ts`, `exitWithAgentReport`, `ModelAlias`, `logging.module.ts`, `asProviderInstanceId`, `types/index.ts`, `LoggingService`, `api-error.code.ts`, `ai-provider.interface.ts`, `ProviderTestCommand`, `chat.service.ts`, `metrics.ts`, `configuration.ts`, `ai-metrics-backend.interface.ts`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _509 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `auth.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `get-run.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04358256697321072 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05364314400458979 - nodes in this community are weakly interconnected._
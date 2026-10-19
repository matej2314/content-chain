# Graph Report - content-chain  (2026-10-19)

## Corpus Check
- 715 files · ~257,592 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 4760 nodes · 15448 edges · 126 communities (112 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 421 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `63539ccc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ref_nestjs_common
- social.types.ts
- company-context-form.tsx
- asClientId
- provider-manager.service.ts
- chat.service.ts
- apiFetch
- logging.module.ts
- runs.controller.ts
- anthropic/anthropic-tools.mapper.ts
- users-view.tsx
- prisma-invitation.adapter.ts
- button.tsx
- prisma-run.adapter.ts
- cn
- api-error.code.ts
- PrismaService
- ai-provider.interface.ts
- asProviderInstanceId
- FileManagerService
- branded.types.ts
- LoggingService
- configuration.ts
- UserRepository
- redis-vector-store.adapter.ts
- feedback-form.tsx
- types/index.ts
- resilient-executor.ts
- create-feedback.use-case.ts
- AppMetricsBackend
- ChatParamsDto
- wizard-orchestrator.service.ts
- company-context.controller.ts
- ChatToolingDto
- AnthropicMessagesRequestDto
- AuthController
- domain/company-context.types.ts
- enums.ts
- run-result-view.tsx
- semantic-cache.service.ts
- sentry-ai-metrics.adapter.ts
- responses.adapter.ts
- landing-view.tsx
- ids.ts
- packages_shared_dist_index
- ChatMessageDto
- output-edited-result.schemas.ts
- HttpRequestLabels
- swagger.setup.ts
- anthropic-messages.controller.ts
- runs.types.ts
- health.api.ts
- chat.controller.ts
- GatewayKey
- run.types.ts
- CompanyContext
- company-context.mapper.ts
- start-run-form.tsx
- ref_nestjs_swagger
- llm-hop.ts
- AuthUserContext
- OpenAiChatCompletionRequestDto
- HealthService
- MetricsController
- anthropic-models.controller.ts
- ClientEditCommand
- ref_express
- ConfigInitCommand
- RefreshSessionRepository
- event-source-registry-provider.tsx
- ClientAddCommand
- openai-chat-completions.controller.ts
- api/src/app.module.ts
- InMemoryRunSseHub
- parse-verifier-log-message.ts
- api/src/health/health.service.ts
- archive-runs-view.tsx
- CompanyContextController
- PrometheusService
- openai-models.controller.ts
- SPEC — README
- PrometheusAppMetricsAdapter
- InvitationsController
- company-context.dto.ts
- ProviderEditCommand
- ClientRemoveCommand
- EnvPatchService
- ModelAlias
- cli.module.ts
- social.graph.ts
- HealthService
- ApiRequestIdHeader
- route.ts
- ProviderRemoveCommand
- start-run.dto.ts
- api/src/main.ts
- models.controller.ts
- ProviderAddCommand
- CompanyContextRepository
- should-include-redis-stack.ts
- ListRunsQueryDto
- cache.module.ts
- .postRegister
- LoginDto
- ModelRemoveCommand
- ModelAddCommand
- GuestGuard
- ModelEditCommand
- app-metrics.service.ts
- HttpExceptionFilter
- AcceptInviteDto
- PublicConfigController
- Architektura
- brand.ts
- JwtAuthGuard
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
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `Request` --references--> `AuthUserContext`  [EXTRACTED]
  apps/api/src/shared/http/express.d.ts → apps/api/src/shared/types/auth-user-context.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (126 total, 13 thin omitted)

### Community 0 - "ref_nestjs_common"
Cohesion: 0.04
Nodes (118): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable (+110 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (28): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore (+20 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.04
Nodes (91): metadata, fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+83 more)

### Community 3 - "asClientId"
Cohesion: 0.08
Nodes (35): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, isRedisRequired(), InitAnswers, CliAiModelSchema, CliAiProviderSchema (+27 more)

### Community 4 - "provider-manager.service.ts"
Cohesion: 0.21
Nodes (18): assertInteractiveAllowed(), ProviderPromptResult, ProviderPromptService, Injectable, validateProviderApiKey(), defaultBaseUrlForOpenAiProviderType(), normalizeCliProviderBaseUrl(), validateCliProviderBaseUrl() (+10 more)

### Community 5 - "chat.service.ts"
Cohesion: 0.05
Nodes (63): SemanticStoreEmbedState, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsObject (+55 more)

### Community 6 - "apiFetch"
Cohesion: 0.04
Nodes (83): ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), ACTIVATION_FAILED_HINT, acceptInvite(), activateAccount(), bootstrapAdmin(), Credentials (+75 more)

### Community 7 - "logging.module.ts"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 8 - "runs.controller.ts"
Cohesion: 0.02
Nodes (97): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject (+89 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.06
Nodes (70): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, mapProviderResponseToAiObservation(), toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens() (+62 more)

### Community 10 - "users-view.tsx"
Cohesion: 0.08
Nodes (39): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+31 more)

### Community 11 - "prisma-invitation.adapter.ts"
Cohesion: 0.09
Nodes (24): InvitationListItem, ListInvitationsUseCase, Inject, Injectable, RevokeInvitationUseCase, Inject, Injectable, AcceptInviteAndCreateUserInput (+16 more)

### Community 12 - "button.tsx"
Cohesion: 0.10
Nodes (32): logoutSession(), GuestLimitModal(), GuestLimitModalProps, assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef (+24 more)

### Community 13 - "prisma-run.adapter.ts"
Cohesion: 0.05
Nodes (30): contentBriefSchema, socialBriefSchema, LightRunItem, ListRunsResult, RunSnapshot, RunSummaryAggregate, RunSummaryScope, RunLogEntry (+22 more)

### Community 14 - "cn"
Cohesion: 0.04
Nodes (82): ACCEPT_INVITE_DEMO_HINT, AcceptInviteFormProps, AcceptInviteFormState, initialState, fetchAppConfig(), AppConfig, parseAppConfig(), DemoChip() (+74 more)

### Community 15 - "api-error.code.ts"
Cohesion: 0.16
Nodes (22): ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus() (+14 more)

### Community 16 - "PrismaService"
Cohesion: 0.05
Nodes (29): DeleteUserUseCase, Inject, Injectable, assertSameIds(), SaveOutputEditedUseCase, Inject, Injectable, validationFailed() (+21 more)

### Community 17 - "ai-provider.interface.ts"
Cohesion: 0.10
Nodes (42): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, SseMetaPayload, SseMetaPayloadDto, ApiProperty (+34 more)

### Community 18 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (26): toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand, Command, Option, convertModel() (+18 more)

### Community 19 - "FileManagerService"
Cohesion: 0.10
Nodes (11): ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable, ConfigGeneratorService, Injectable, ConfigPersistenceService (+3 more)

### Community 20 - "branded.types.ts"
Cohesion: 0.06
Nodes (64): DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, CliAiModel, CliAiProvider, CliRateLimit (+56 more)

### Community 21 - "LoggingService"
Cohesion: 0.05
Nodes (31): RedisConnectionService, Injectable, Inject, Inject, isRedisRequiredFromConfig(), ChatErrorHandlerService, Injectable, ChatProviderCallService (+23 more)

### Community 22 - "configuration.ts"
Cohesion: 0.06
Nodes (52): CliValidateOptions, normalizeGatewayConfigForWrite(), ValidationFormatter, asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig (+44 more)

### Community 23 - "UserRepository"
Cohesion: 0.05
Nodes (24): Inject, Inject, Inject, Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput (+16 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.09
Nodes (30): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions (+22 more)

### Community 25 - "feedback-form.tsx"
Cohesion: 0.10
Nodes (29): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+21 more)

### Community 26 - "types/index.ts"
Cohesion: 0.12
Nodes (25): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+17 more)

### Community 27 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 28 - "create-feedback.use-case.ts"
Cohesion: 0.07
Nodes (29): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_PURGE, FeedbackPurgePort (+21 more)

### Community 30 - "ChatParamsDto"
Cohesion: 0.12
Nodes (16): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+8 more)

### Community 31 - "wizard-orchestrator.service.ts"
Cohesion: 0.10
Nodes (24): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, WizardState, ClientPromptService, Injectable, KeyPromptService, Injectable (+16 more)

### Community 32 - "company-context.controller.ts"
Cohesion: 0.20
Nodes (14): toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase (+6 more)

### Community 33 - "ChatToolingDto"
Cohesion: 0.15
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "AuthController"
Cohesion: 0.11
Nodes (24): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+16 more)

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.16
Nodes (20): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CtaItem (+12 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "run-result-view.tsx"
Cohesion: 0.04
Nodes (57): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+49 more)

### Community 39 - "semantic-cache.service.ts"
Cohesion: 0.07
Nodes (25): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend (+17 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (35): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+27 more)

### Community 41 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (65): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asSystemFingerprint(), asToolCallId(), asWarningCode(), ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn (+57 more)

### Community 42 - "landing-view.tsx"
Cohesion: 0.27
Nodes (11): LANDING_CONTEXT_IMAGES, LANDING_COPY, LANDING_HERO_IMAGES, LANDING_RUNS_IMAGES, LandingFeature, LandingPersona, LandingStep, LandingTech (+3 more)

### Community 43 - "ids.ts"
Cohesion: 0.09
Nodes (32): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createFeedbackId() (+24 more)

### Community 44 - "packages_shared_dist_index"
Cohesion: 0.08
Nodes (25): DeleteUserResult, JwtPayload, GUEST_ARCHIVE_STATUSES, GUEST_TASK_TYPES, GuestRunAdmit, isGuestTaskType(), ListRunsUserItem, GUEST_QUOTA (+17 more)

### Community 45 - "ChatMessageDto"
Cohesion: 0.14
Nodes (17): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+9 more)

### Community 46 - "output-edited-result.schemas.ts"
Cohesion: 0.08
Nodes (24): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString(), verifierIssueSchema (+16 more)

### Community 47 - "HttpRequestLabels"
Cohesion: 0.22
Nodes (3): HttpMetricsMiddleware, Injectable, HttpRequestLabels

### Community 48 - "swagger.setup.ts"
Cohesion: 0.08
Nodes (29): AppModule, Module, RedisConsumer, SseDeltaPayloadDto, ApiProperty, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto (+21 more)

### Community 49 - "anthropic-messages.controller.ts"
Cohesion: 0.08
Nodes (37): GATEWAY_CACHE_HEADER, SseDoneEvent, asMessageId(), MessageId, AnthropicMessagesController, ApiSecurity, ApiTags, Controller (+29 more)

### Community 50 - "runs.types.ts"
Cohesion: 0.05
Nodes (84): PAGE_OUTLINE_ROLE_LABELS, ArchiveRunsQuery, fetchRunsSummary(), fetchUserRuns(), InitiatorOption, isUserRating(), patchRunRating(), HitlAccepted (+76 more)

### Community 51 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 52 - "chat.controller.ts"
Cohesion: 0.07
Nodes (34): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+26 more)

### Community 53 - "GatewayKey"
Cohesion: 0.04
Nodes (70): ChatModule, Module, ChatService, Injectable, ChatStreamController, ApiBody, ApiOperation, ApiProduces (+62 more)

### Community 54 - "run.types.ts"
Cohesion: 0.07
Nodes (54): ContentPipelineFacade, toOutcome(), Inject, Injectable, pageDocumentOutputSchema, pageOutlineOutputSchema, CONTENT_RESULT_STORE, ContentResultStore (+46 more)

### Community 55 - "CompanyContext"
Cohesion: 0.18
Nodes (10): assertAudienceProfileNamesUnique(), CompanyContext, CompanyContextWriteDetail, normalizeAudienceName(), withEffectiveAudience(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter (+2 more)

### Community 56 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (12): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+4 more)

### Community 57 - "start-run-form.tsx"
Cohesion: 0.06
Nodes (48): metadata, apps_frontend_src_app_globals, AcceptInvitePage(), metadata, tokenFromSearchParam(), geistMono, inter, metadata (+40 more)

### Community 58 - "ref_nestjs_swagger"
Cohesion: 0.07
Nodes (30): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+22 more)

### Community 59 - "llm-hop.ts"
Cohesion: 0.06
Nodes (41): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+33 more)

### Community 60 - "AuthUserContext"
Cohesion: 0.05
Nodes (53): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, UserListItem, PatchUserDto (+45 more)

### Community 61 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.08
Nodes (27): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+19 more)

### Community 62 - "HealthService"
Cohesion: 0.17
Nodes (6): HealthReadinessResponseDto, ApiProperty, HealthService, Inject, Injectable, Optional

### Community 63 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 65 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 66 - "ref_express"
Cohesion: 0.06
Nodes (34): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+26 more)

### Community 67 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 68 - "RefreshSessionRepository"
Cohesion: 0.12
Nodes (8): Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 69 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

### Community 70 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 71 - "openai-chat-completions.controller.ts"
Cohesion: 0.16
Nodes (22): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+14 more)

### Community 73 - "api/src/app.module.ts"
Cohesion: 0.05
Nodes (48): AuthModule, Module, CompanyContextModule, Module, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject (+40 more)

### Community 74 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.11
Nodes (18): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+10 more)

### Community 78 - "archive-runs-view.tsx"
Cohesion: 0.04
Nodes (68): metadata, metadata, useSession(), useGuestLocked(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS (+60 more)

### Community 79 - "CompanyContextController"
Cohesion: 0.29
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 80 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 81 - "openai-models.controller.ts"
Cohesion: 0.10
Nodes (25): ApiOpenAiErrorResponses(), OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse (+17 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "PrometheusAppMetricsAdapter"
Cohesion: 0.11
Nodes (6): healthStatusToGaugeValue(), PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope

### Community 85 - "InvitationsController"
Cohesion: 0.14
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 89 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 90 - "EnvPatchService"
Cohesion: 0.13
Nodes (8): ConfigSecretsStatusCommand, Command, Option, KeyGenerateCommand, Command, Option, EnvPatchService, Injectable

### Community 91 - "ModelAlias"
Cohesion: 0.08
Nodes (8): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsService, Injectable, AppTokenUsage

### Community 92 - "cli.module.ts"
Cohesion: 0.07
Nodes (68): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), PendingSecretsItem, loadAnswers(), collectPendingSecrets() (+60 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.08
Nodes (52): loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput, contentOutputSchema, IdeasOutput (+44 more)

### Community 95 - "HealthService"
Cohesion: 0.17
Nodes (10): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+2 more)

### Community 96 - "ApiRequestIdHeader"
Cohesion: 0.20
Nodes (9): ApiRequestIdHeader(), HealthLivenessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+1 more)

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 100 - "start-run.dto.ts"
Cohesion: 0.16
Nodes (14): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+6 more)

### Community 101 - "api/src/main.ts"
Cohesion: 0.21
Nodes (10): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig(), ref_cookie_parser, ref_helmet (+2 more)

### Community 102 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 105 - "CompanyContextRepository"
Cohesion: 0.18
Nodes (5): Inject, Inject, Inject, Inject, CompanyContextRepository

### Community 107 - "should-include-redis-stack.ts"
Cohesion: 0.10
Nodes (22): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+14 more)

### Community 108 - "ListRunsQueryDto"
Cohesion: 0.20
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 109 - "cache.module.ts"
Cohesion: 0.08
Nodes (23): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+15 more)

### Community 112 - ".postRegister"
Cohesion: 0.33
Nodes (5): RegisterUserDto, ApiProperty, IsEmail, IsString, MinLength

### Community 113 - "LoginDto"
Cohesion: 0.40
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 114 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 115 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 116 - "GuestGuard"
Cohesion: 0.40
Nodes (3): GuestGuard, Inject, Injectable

### Community 117 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 119 - "app-metrics.service.ts"
Cohesion: 0.13
Nodes (18): HealthModule, Module, HealthCheckResult, HealthRedisCheckResult, APP_METRICS_BACKEND, AppRequestLabels, AppRequestMethod, AppRequestStatus (+10 more)

### Community 122 - "AcceptInviteDto"
Cohesion: 0.50
Nodes (4): AcceptInviteDto, ApiProperty, IsString, MinLength

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
- **483 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+478 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1288 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `isRunId()` connect `ids.ts` to `runs.controller.ts`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `AuthUserContext` connect `AuthUserContext` to `ref_nestjs_common`, `ref_express`, `AuthController`, `runs.controller.ts`, `packages_shared_dist_index`, `PrismaService`, `InvitationsController`, `create-feedback.use-case.ts`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `AppMetricsBackend` connect `AppMetricsBackend` to `ModelAlias`, `PrometheusAppMetricsAdapter`, `app-metrics.service.ts`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _483 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ref_nestjs_common` be split into smaller, more focused modules?**
  _Cohesion score 0.03564466722361459 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.053975363941769314 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.04144144144144144 - nodes in this community are weakly interconnected._
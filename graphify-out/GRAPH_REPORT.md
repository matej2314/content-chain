# Graph Report - content-chain  (2026-10-18)

## Corpus Check
- 710 files · ~250,013 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4737 nodes · 15409 edges · 124 communities (107 shown, 16 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 421 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1d5a49ba`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ref_nestjs_common
- save-output-edited.use-case.ts
- company-context-form.tsx
- configuration.ts
- asProviderInstanceId
- chat.service.ts
- chat.module.ts
- logging.module.ts
- AuthUserContext
- anthropic/anthropic-tools.mapper.ts
- envelope.ts
- dashboard-shell.tsx
- archive-runs-view.tsx
- prisma-run.adapter.ts
- ChatMessageDto
- api-error.code.ts
- ai-provider.interface.ts
- GatewayConfig
- exitWithAgentReport
- runs.types.ts
- AuthController
- metrics.ts
- ApiRequestIdHeader
- AuthUser
- redis-vector-store.adapter.ts
- feedback-form.tsx
- app-metrics.service.ts
- branded.types.ts
- llm-hop.ts
- prisma-invitation.adapter.ts
- env.validation.ts
- HealthService
- company-context.controller.ts
- LoggingService
- AnthropicMessagesRequestDto
- responses.adapter.ts
- runs-result.types.ts
- enums.ts
- run-review-panel.tsx
- PrismaContentResultAdapter
- sentry-ai-metrics.adapter.ts
- ConfigInitCommand
- openai-models.controller.ts
- ids.ts
- IoredisGuestQuotaAdapter
- ai-provider-gateway/src/app.module.ts
- output-edited-result.schemas.ts
- DomainException
- swagger.setup.ts
- chat-response.dto.ts
- ListRunsQueryDto
- ChatToolingDto
- .streamChat
- new-ids.ts
- content.graph.ts
- company-context.port.ts
- PrometheusAppMetricsAdapter
- start-run-form.tsx
- ChatParamsDto
- domain/is-complete.ts
- UsersController
- OpenAiChatCompletionRequestDto
- packages_shared_dist_index
- openai-stream.mapper.ts
- anthropic-models.controller.ts
- ModelEditCommand
- llm-gateway.http.adapter.ts
- PrismaRefreshSessionAdapter
- GlobalExceptionFilter
- AppMetricsService
- health.api.ts
- ref_nestjs_swagger
- packages_shared_dist_index_userid
- api/src/app.module.ts
- InMemoryRunSseHub
- parse-verifier-log-message.ts
- PublicConfigController
- api/src/health/health.service.ts
- LlmHopService
- company-context.schemas.ts
- PrometheusService
- cn
- RunsModule
- SPEC — README
- RequestIdMiddleware
- isRecord
- config-generator.service.ts
- company-context.dto.ts
- ProviderManagerService
- ClientRemoveCommand
- api/src/main.ts
- ModelAlias
- cli.module.ts
- social.graph.ts
- start-run.dto.ts
- GuestGuard
- route.ts
- EnvRef
- models.controller.ts
- ProviderAddCommand
- ai-provider-gateway/src/health/health.service.ts
- http-metrics.interceptor.ts
- ref_react
- ModelRemoveCommand
- domain/company-context.types.ts
- JwtAuthGuard
- RolesGuard
- HttpExceptionFilter
- PrismaRunAdapter
- Architektura
- brand.ts
- assert-audience-profile-names-unique.ts
- Roles
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
7. `cn()` - 67 edges
8. `GatewayConfig` - 65 edges
9. `AuthUserContext` - 62 edges
10. `GatewayKey` - 59 edges

## Surprising Connections (you probably didn't know these)
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `Request` --references--> `AuthUserContext`  [EXTRACTED]
  apps/api/src/shared/http/express.d.ts → apps/api/src/shared/types/auth-user-context.ts
- `ResponseCacheService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/response-cache.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisVectorStoreAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/semantic/adapters/redis-vector-store.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `SemanticCacheService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/semantic/semantic-cache.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (124 total, 16 thin omitted)

### Community 0 - "ref_nestjs_common"
Cohesion: 0.03
Nodes (107): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable (+99 more)

### Community 1 - "save-output-edited.use-case.ts"
Cohesion: 0.04
Nodes (53): ContentPipelineInput, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole, CompositeRunResultReader, GetRunGuestAccess (+45 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.05
Nodes (72): metadata, putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+64 more)

### Community 3 - "configuration.ts"
Cohesion: 0.06
Nodes (70): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema (+62 more)

### Community 4 - "asProviderInstanceId"
Cohesion: 0.06
Nodes (62): DEFAULT_MODELS, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, convertProvider(), CliAiModel, CliAiProvider (+54 more)

### Community 5 - "chat.service.ts"
Cohesion: 0.04
Nodes (65): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+57 more)

### Community 6 - "chat.module.ts"
Cohesion: 0.07
Nodes (31): ChatModule, Module, CHAT_STREAM_API_DESCRIPTION, SseSerializer, StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader() (+23 more)

### Community 7 - "logging.module.ts"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 8 - "AuthUserContext"
Cohesion: 0.07
Nodes (35): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, isRecord(), Body (+27 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.06
Nodes (69): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, mapProviderResponseToAiObservation(), toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens() (+61 more)

### Community 10 - "envelope.ts"
Cohesion: 0.06
Nodes (61): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+53 more)

### Community 11 - "dashboard-shell.tsx"
Cohesion: 0.07
Nodes (38): fetchCompleteness(), CompletenessState, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE, useCompleteness() (+30 more)

### Community 12 - "archive-runs-view.tsx"
Cohesion: 0.04
Nodes (71): metadata, metadata, apps_frontend_src_app_globals, geistMono, inter, metadata, spaceGrotesk, SessionContext (+63 more)

### Community 13 - "prisma-run.adapter.ts"
Cohesion: 0.06
Nodes (36): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+28 more)

### Community 14 - "ChatMessageDto"
Cohesion: 0.08
Nodes (32): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+24 more)

### Community 15 - "api-error.code.ts"
Cohesion: 0.15
Nodes (24): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus() (+16 more)

### Community 16 - "ai-provider.interface.ts"
Cohesion: 0.09
Nodes (46): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, SseMetaPayload, SseMetaPayloadDto, ApiProperty (+38 more)

### Community 17 - "GatewayConfig"
Cohesion: 0.11
Nodes (31): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), defaultModelPolicy(), ModelEditField, ModelManagerService (+23 more)

### Community 18 - "exitWithAgentReport"
Cohesion: 0.12
Nodes (7): exitWithAgentReport(), resolveCliMode(), ProviderTestCommand, Command, Option, ProviderTestService, Injectable

### Community 19 - "runs.types.ts"
Cohesion: 0.05
Nodes (70): assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+62 more)

### Community 20 - "AuthController"
Cohesion: 0.21
Nodes (13): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+5 more)

### Community 21 - "metrics.ts"
Cohesion: 0.14
Nodes (20): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns() (+12 more)

### Community 22 - "ApiRequestIdHeader"
Cohesion: 0.13
Nodes (15): ApiRequestIdHeader(), HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, ApiBody (+7 more)

### Community 23 - "AuthUser"
Cohesion: 0.07
Nodes (19): Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult (+11 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.05
Nodes (49): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), isUnservableCachedReply(), ResponseCacheService, Injectable, parseCachedChatResponse(), RedisVectorStoreAdapter (+41 more)

### Community 25 - "feedback-form.tsx"
Cohesion: 0.13
Nodes (24): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+16 more)

### Community 26 - "app-metrics.service.ts"
Cohesion: 0.24
Nodes (12): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+4 more)

### Community 27 - "branded.types.ts"
Cohesion: 0.06
Nodes (55): CACHE_BACKEND_TYPE, buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult (+47 more)

### Community 28 - "llm-hop.ts"
Cohesion: 0.20
Nodes (12): LLM_GATEWAY_PORT, isRetryable(), RetryReason, isAbortError(), ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable() (+4 more)

### Community 29 - "prisma-invitation.adapter.ts"
Cohesion: 0.06
Nodes (38): InvitationListItem, ListInvitationsUseCase, Inject, Injectable, ResendInvitationUseCase, Inject, Injectable, RevokeInvitationUseCase (+30 more)

### Community 30 - "env.validation.ts"
Cohesion: 0.12
Nodes (12): CACHE_BACKEND_VALUES, EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString (+4 more)

### Community 31 - "HealthService"
Cohesion: 0.21
Nodes (4): HealthReadinessResponseDto, ApiProperty, HealthService, Injectable

### Community 32 - "company-context.controller.ts"
Cohesion: 0.10
Nodes (20): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+12 more)

### Community 33 - "LoggingService"
Cohesion: 0.04
Nodes (34): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisConnectionService, Injectable (+26 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 35 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (66): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asSystemFingerprint(), asToolCallId(), asWarningCode(), ProviderAssistantTurn, ProviderChatTurn, ProviderToolDefinition (+58 more)

### Community 36 - "runs-result.types.ts"
Cohesion: 0.05
Nodes (58): submitHitl(), HitlAccepted, isPageOutlineSectionRole(), isReelDuration(), PAGE_OUTLINE_SECTION_ROLES, PageDocument, PageOutline, PageOutlineSection (+50 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "run-review-panel.tsx"
Cohesion: 0.09
Nodes (32): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+24 more)

### Community 39 - "PrismaContentResultAdapter"
Cohesion: 0.14
Nodes (5): ContentPipelineState, VerifierVerdict, PrismaContentResultAdapter, toContentPipelinePhase(), Injectable

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+20 more)

### Community 41 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.10
Nodes (25): ApiOpenAiErrorResponses(), OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse (+17 more)

### Community 43 - "ids.ts"
Cohesion: 0.09
Nodes (32): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createFeedbackId() (+24 more)

### Community 44 - "IoredisGuestQuotaAdapter"
Cohesion: 0.18
Nodes (6): GuestQuotaAdmitResult, IoredisGuestQuotaAdapter, msUntilNextMidnight(), Injectable, utcDateKey(), UnavailableGuestQuotaAdapter

### Community 45 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.10
Nodes (24): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+16 more)

### Community 46 - "output-edited-result.schemas.ts"
Cohesion: 0.07
Nodes (30): contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema, ideasArraySchema (+22 more)

### Community 47 - "DomainException"
Cohesion: 0.06
Nodes (31): generateRefreshToken(), hashPassword(), parseTtlMs(), isUniqueConstraintViolation(), rejectDeadGuestSession(), validatePasswordPolicy(), orderItemsBySelectedIds(), isGuestArchiveStatus() (+23 more)

### Community 48 - "swagger.setup.ts"
Cohesion: 0.08
Nodes (31): AppModule, Module, RedisConsumer, SseDeltaPayloadDto, ApiProperty, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto (+23 more)

### Community 49 - "chat-response.dto.ts"
Cohesion: 0.06
Nodes (54): ApiHeader, GATEWAY_CACHE_HEADER, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, toChatResponseDto(), toChatResponseDtoFromCache() (+46 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.20
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ChatToolingDto"
Cohesion: 0.15
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 52 - ".streamChat"
Cohesion: 0.07
Nodes (25): ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body, Controller (+17 more)

### Community 53 - "new-ids.ts"
Cohesion: 0.13
Nodes (17): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, ErrorEnvelope (+9 more)

### Community 54 - "content.graph.ts"
Cohesion: 0.10
Nodes (39): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+31 more)

### Community 55 - "company-context.port.ts"
Cohesion: 0.42
Nodes (5): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 56 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (5): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope

### Community 57 - "start-run-form.tsx"
Cohesion: 0.09
Nodes (37): metadata, fetchCompanyContext(), GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact (+29 more)

### Community 58 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 59 - "domain/is-complete.ts"
Cohesion: 0.35
Nodes (9): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, collectGateItemPaths(), isCompleteAudienceProfile(), isCompleteCtaItem(), isCompleteOfferItem(), nonEmpty() (+1 more)

### Community 60 - "UsersController"
Cohesion: 0.12
Nodes (15): PatchUserDto, ApiProperty, IsBoolean, ApiCookieAuth, ApiTags, Body, Controller, Delete (+7 more)

### Community 61 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (37): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+29 more)

### Community 62 - "packages_shared_dist_index"
Cohesion: 0.03
Nodes (92): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject (+84 more)

### Community 63 - "openai-stream.mapper.ts"
Cohesion: 0.17
Nodes (20): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional (+12 more)

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.10
Nodes (25): ApiAnthropicErrorResponses(), AnthropicMessagesController, ApiSecurity, ApiTags, Controller, AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse (+17 more)

### Community 65 - "ModelEditCommand"
Cohesion: 0.33
Nodes (3): ModelEditCommand, Command, Option

### Community 66 - "llm-gateway.http.adapter.ts"
Cohesion: 0.09
Nodes (26): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+18 more)

### Community 67 - "PrismaRefreshSessionAdapter"
Cohesion: 0.31
Nodes (3): RefreshSessionRecord, PrismaRefreshSessionAdapter, Injectable

### Community 68 - "GlobalExceptionFilter"
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 69 - "AppMetricsService"
Cohesion: 0.07
Nodes (12): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable, MetricsController, ApiOperation, ApiResponse (+4 more)

### Community 70 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 71 - "ref_nestjs_swagger"
Cohesion: 0.04
Nodes (51): ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional (+43 more)

### Community 72 - "packages_shared_dist_index_userid"
Cohesion: 0.04
Nodes (53): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+45 more)

### Community 73 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (52): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor (+44 more)

### Community 74 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "LlmHopService"
Cohesion: 0.29
Nodes (5): LlmHopService, Inject, Injectable, Inject, CompileSocialGraphOptions

### Community 79 - "company-context.schemas.ts"
Cohesion: 0.33
Nodes (5): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema

### Community 80 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 81 - "cn"
Cohesion: 0.06
Nodes (46): AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), APP_NAV, AppNavItem, navItemsForRole() (+38 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 85 - "isRecord"
Cohesion: 0.06
Nodes (59): ACTIVATION_FAILED_HINT, activateAccount(), Credentials, fetchBootstrapStatus(), fetchUserSession(), loginWithPassword(), patchOwnEmail(), resendActivation() (+51 more)

### Community 86 - "config-generator.service.ts"
Cohesion: 0.15
Nodes (12): ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, ClientCli, EnvTemplateInput, generateEnvTemplate() (+4 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ProviderManagerService"
Cohesion: 0.08
Nodes (13): ProviderEditCommand, Command, Option, ProviderRemoveCommand, Command, Option, normalizeGatewayConfigForWrite(), ProviderManagerService (+5 more)

### Community 89 - "ClientRemoveCommand"
Cohesion: 0.18
Nodes (6): ClientRemoveCommand, Command, Option, ModelAddCommand, Command, Option

### Community 90 - "api/src/main.ts"
Cohesion: 0.21
Nodes (10): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig(), ref_cookie_parser, ref_helmet (+2 more)

### Community 91 - "ModelAlias"
Cohesion: 0.06
Nodes (7): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend, AppTokenUsage

### Community 92 - "cli.module.ts"
Cohesion: 0.05
Nodes (81): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), PendingSecretsItem, loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers() (+73 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.14
Nodes (32): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 95 - "start-run.dto.ts"
Cohesion: 0.16
Nodes (14): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+6 more)

### Community 96 - "GuestGuard"
Cohesion: 0.40
Nodes (3): GuestGuard, Inject, Injectable

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "EnvRef"
Cohesion: 0.05
Nodes (25): ClientAddCommand, Command, Option, ClientEditCommand, Command, Option, ConfigSecretsStatusCommand, Command (+17 more)

### Community 102 - "models.controller.ts"
Cohesion: 0.12
Nodes (19): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+11 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.31
Nodes (3): ProviderAddCommand, Command, Option

### Community 109 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.08
Nodes (24): RedisCacheModule, Module, CacheModule, CacheModuleOptions, Module, CACHE_BACKEND, SemanticCacheModule, Module (+16 more)

### Community 110 - "http-metrics.interceptor.ts"
Cohesion: 0.12
Nodes (16): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+8 more)

### Community 111 - "ref_react"
Cohesion: 0.10
Nodes (35): metadata, logoutSession(), AccountEmailFormState, GuestLimitModalProps, CancelRunDialogProps, FALLBACK, LogoutDialog(), confirm() (+27 more)

### Community 114 - "ModelRemoveCommand"
Cohesion: 0.33
Nodes (3): ModelRemoveCommand, Command, Option

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.15
Nodes (18): AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail, Completeness, CtaItem (+10 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand.ts"
Cohesion: 0.33
Nodes (3): unbrand, RunTaskType, RunsSummaryResponse

### Community 126 - "assert-audience-profile-names-unique.ts"
Cohesion: 0.38
Nodes (5): assertAudienceProfileNamesUnique(), normalizeAudienceName(), withEffectiveAudience(), createLoadContextNode(), createLoadContextNode()

### Community 129 - "Roles"
Cohesion: 0.29
Nodes (6): toCompanyContext(), toPartialCompanyContext(), Body, Patch, Roles(), Put

## Knowledge Gaps
- **478 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+473 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1284 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `isRunId()` connect `ids.ts` to `prisma-run.adapter.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `AuthUserContext` connect `AuthUserContext` to `ref_nestjs_common`, `save-output-edited.use-case.ts`, `packages_shared_dist_index_userid`, `DomainException`, `AuthController`, `new-ids.ts`, `UsersController`, `prisma-invitation.adapter.ts`, `packages_shared_dist_index`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `AppMetricsBackend` connect `ModelAlias` to `PrometheusAppMetricsAdapter`, `app-metrics.service.ts`, `AppMetricsService`, `ai-provider-gateway/src/health/health.service.ts`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _478 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ref_nestjs_common` be split into smaller, more focused modules?**
  _Cohesion score 0.032565225671300706 - nodes in this community are weakly interconnected._
- **Should `save-output-edited.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04469476744186047 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.052941176470588235 - nodes in this community are weakly interconnected._
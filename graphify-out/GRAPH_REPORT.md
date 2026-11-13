# Graph Report - content-chain  (2026-11-13)

## Corpus Check
- 752 files · ~297,267 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 4972 nodes · 16248 edges · 147 communities (128 shown, 16 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 430 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a67d2a44`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- BootstrapAdminDto
- social.types.ts
- company-context-form.tsx
- run-result-editor.tsx
- GatewayConfig
- semantic-cache.service.ts
- auth.module.ts
- ModelAlias
- ref_nestjs_common
- anthropic/anthropic-tools.mapper.ts
- Env
- model-manager.service.ts
- exitWithAgentReport
- PrismaRunAdapter
- PrismaService
- provider-error.mapper.ts
- export-openapi.ts
- ai-provider.interface.ts
- app/layout.tsx
- chat.service.ts
- PatchUserDto
- openai-models.controller.ts
- configuration.ts
- UserRepository
- cn
- AuthUserContext
- ClientAddCommand
- openai-chat-completions.controller.ts
- anthropic-response.mapper.ts
- PrometheusAppMetricsAdapter
- apiFetch
- ai-provider-gateway/src/app.module.ts
- redis-cache.adapter.ts
- resilient-executor.ts
- AnthropicMessagesRequestDto
- anthropic-messages.controller.ts
- domain/company-context.types.ts
- enums.ts
- content.graph.ts
- RedisVectorStoreAdapter
- anthropic-models.controller.ts
- AppMetricsService
- gateway-alive-provider.tsx
- ids.ts
- branded.types.ts
- ClientEditCommand
- create-feedback.use-case.ts
- app-metrics.module.ts
- ChatParamsDto
- InvitationsController
- CompanyContextRepository
- ProviderRemoveCommand
- llm-hop.ts
- feedback-form.tsx
- prisma-run.adapter.ts
- OpenAiChatCompletionRequestDto
- ai-provider-gateway/src/health/health.service.ts
- archive-runs-view.tsx
- api/src/health/health.service.ts
- redis-vector-store.adapter.ts
- sentry-ai-metrics.adapter.ts
- api/src/main.ts
- PrismaContentResultAdapter
- .streamChat
- save-output-edited.use-case.ts
- new-ids.ts
- asProviderInstanceId
- home-entry.tsx
- ref_react
- cli.module.ts
- index-name.ts
- openai-params-provider.mapper.ts
- landing-view.tsx
- api/src/app.module.ts
- logging.service.ts
- parse-verifier-log-message.ts
- LoggingService
- ref_nestjs_swagger
- start-run-form.tsx
- runs.types.ts
- responses.adapter.ts
- HealthService
- user-invited.template.ts
- SPEC — README
- InMemoryRunSseHub
- http-metrics.interceptor.ts
- packages_shared_dist_index_userid
- company-context.dto.ts
- MetricsService
- AuthController
- EnvironmentVariables
- PrometheusService
- config-generator.service.ts
- social.graph.ts
- company-context.mapper.ts
- patch-company-context.use-case.ts
- domain/is-complete.ts
- route.ts
- CompanyContextController
- ClientRemoveCommand
- start-run.dto.ts
- RedisConnectionService
- ModelEditCommand
- list-runs-query.dto.ts
- chat-stream.controller.ts
- HttpExceptionFilter
- ProviderAddCommand
- ProviderEditCommand
- ModelRemoveCommand
- src/index.ts
- KeyGenerateCommand
- models.controller.ts
- src/pagination.ts
- RunLogEntry
- event-source-registry-provider.tsx
- assert-audience-profile-names-unique.ts
- GuestGuard
- .get
- RolesGuard
- LoginDto
- app-metrics.service.ts
- ModelAddCommand
- prisma-invitation.adapter.ts
- response-cache.service.ts
- Architektura
- RegisterUserDto
- output-edited-result.schemas.ts
- AcceptInviteDto
- ActivateAccountDto
- RunsModule
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
- load-company-context-fixture.ts
- JwtAuthGuard
- PrismaRefreshSessionAdapter

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
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (147 total, 16 thin omitted)

### Community 0 - "BootstrapAdminDto"
Cohesion: 0.40
Nodes (5): BootstrapAdminDto, ApiProperty, IsEmail, IsString, MinLength

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (34): ContentPipelineInput, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole, CompositeRunResultReader, GetRunOutput (+26 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.04
Nodes (91): metadata, fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+83 more)

### Community 3 - "run-result-editor.tsx"
Cohesion: 0.03
Nodes (72): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+64 more)

### Community 4 - "GatewayConfig"
Cohesion: 0.07
Nodes (17): PendingSecretsItem, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable (+9 more)

### Community 5 - "semantic-cache.service.ts"
Cohesion: 0.05
Nodes (31): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend (+23 more)

### Community 6 - "auth.module.ts"
Cohesion: 0.04
Nodes (106): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable, comparePassword() (+98 more)

### Community 7 - "ModelAlias"
Cohesion: 0.06
Nodes (4): ModelAlias, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 8 - "ref_nestjs_common"
Cohesion: 0.03
Nodes (88): FeedbackRunLookup, FeedbackRunReader, AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable (+80 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.05
Nodes (71): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens(), asPromptCacheHitTokens() (+63 more)

### Community 10 - "Env"
Cohesion: 0.04
Nodes (39): Inject, Inject, Inject, Inject, Inject, Inject, Inject, EmailChangeRequestRepository (+31 more)

### Community 11 - "model-manager.service.ts"
Cohesion: 0.17
Nodes (19): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, RemoveModelInput, buildDefaultModelCapabilities() (+11 more)

### Community 12 - "exitWithAgentReport"
Cohesion: 0.18
Nodes (10): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+2 more)

### Community 13 - "PrismaRunAdapter"
Cohesion: 0.12
Nodes (3): RunSnapshot, PrismaRunAdapter, Injectable

### Community 14 - "PrismaService"
Cohesion: 0.07
Nodes (25): EmailChangeRequestRecord, UpsertEmailChangeRequestInput, RotateRefreshSessionResult, isUniqueConstraintViolation(), PrismaEmailChangeRequestAdapter, Row, toRecord(), Injectable (+17 more)

### Community 15 - "provider-error.mapper.ts"
Cohesion: 0.14
Nodes (23): ChatErrorHandlerService, Injectable, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError() (+15 more)

### Community 16 - "export-openapi.ts"
Cohesion: 0.12
Nodes (17): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+9 more)

### Community 17 - "ai-provider.interface.ts"
Cohesion: 0.09
Nodes (49): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, mapStopReasonToFinishReason(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation() (+41 more)

### Community 18 - "app/layout.tsx"
Cohesion: 0.09
Nodes (15): metadata, metadata, metadata, apps_frontend_src_app_globals, AcceptInvitePage(), metadata, tokenFromSearchParam(), geistMono (+7 more)

### Community 19 - "chat.service.ts"
Cohesion: 0.05
Nodes (69): SemanticStoreEmbedState, ChatCacheSource, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+61 more)

### Community 20 - "PatchUserDto"
Cohesion: 0.50
Nodes (4): PatchUserDto, ApiProperty, IsBoolean, Equals

### Community 21 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 22 - "configuration.ts"
Cohesion: 0.05
Nodes (63): collectPendingSecrets(), DEFAULT_MODELS, validateProviderApiKey(), asSemanticCacheTtlSeconds(), AppConfiguration, RedisRuntimeConfig, SemanticCacheRuntimeConfig, collectInactiveProviderWarnings() (+55 more)

### Community 23 - "UserRepository"
Cohesion: 0.04
Nodes (40): Inject, Inject, Inject, Inject, Inject, Inject, Inject, Inject (+32 more)

### Community 24 - "cn"
Cohesion: 0.03
Nodes (89): ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite(), logoutSession(), AcceptInviteForm(), onSubmit() (+81 more)

### Community 25 - "AuthUserContext"
Cohesion: 0.05
Nodes (54): ReactivateUserUseCase, Inject, Injectable, ApiCookieAuth, ApiTags, Body, Controller, Delete (+46 more)

### Community 26 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 27 - "openai-chat-completions.controller.ts"
Cohesion: 0.12
Nodes (28): GATEWAY_CACHE_HEADER, fromGatewayToolCallDto(), OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiAuth(), OpenAiChatCompletionChoiceDto (+20 more)

### Community 28 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 29 - "PrometheusAppMetricsAdapter"
Cohesion: 0.11
Nodes (4): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppTokenUsage

### Community 30 - "apiFetch"
Cohesion: 0.08
Nodes (44): deleteOwnAccount(), AccountDeleteForm(), onPurgeConfirm(), onReauthSubmit(), runDelete(), createInvitation(), fetchInvitations(), resendInvitation() (+36 more)

### Community 31 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.09
Nodes (24): ChatModule, Module, HealthModule, Module, AnthropicModule, Module, IntegrationsModule, Module (+16 more)

### Community 32 - "redis-cache.adapter.ts"
Cohesion: 0.13
Nodes (10): NoOpCacheBackend, Injectable, RedisCacheAdapter, Injectable, CacheRegistryService, Injectable, CacheBackend, asCacheTtlSeconds() (+2 more)

### Community 33 - "resilient-executor.ts"
Cohesion: 0.16
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (63): ApiHeader, ApiBody, ApiOperation, ApiResponse, Body, Post, Req, ChatMessageDto (+55 more)

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.16
Nodes (16): AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CtaItem, emptyCompanyContext(), OfferItem (+8 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "content.graph.ts"
Cohesion: 0.11
Nodes (39): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+31 more)

### Community 39 - "RedisVectorStoreAdapter"
Cohesion: 0.24
Nodes (5): RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), VectorSearchHit, VectorStoreKnnInput

### Community 40 - "anthropic-models.controller.ts"
Cohesion: 0.11
Nodes (22): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+14 more)

### Community 41 - "AppMetricsService"
Cohesion: 0.10
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable

### Community 42 - "gateway-alive-provider.tsx"
Cohesion: 0.18
Nodes (15): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+7 more)

### Community 43 - "ids.ts"
Cohesion: 0.08
Nodes (36): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createEmailChangeRequestId() (+28 more)

### Community 44 - "branded.types.ts"
Cohesion: 0.06
Nodes (60): ProviderTestCommand, ProviderTestOptions, Command, Option, CliAiModel, CliAiProvider, CliRateLimit, GatewayClient (+52 more)

### Community 45 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 46 - "create-feedback.use-case.ts"
Cohesion: 0.07
Nodes (27): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_PURGE, FeedbackPurgePort (+19 more)

### Community 47 - "app-metrics.module.ts"
Cohesion: 0.12
Nodes (12): resolveAppMetricsBackend(), APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get (+4 more)

### Community 48 - "ChatParamsDto"
Cohesion: 0.12
Nodes (16): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+8 more)

### Community 49 - "InvitationsController"
Cohesion: 0.14
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 50 - "CompanyContextRepository"
Cohesion: 0.13
Nodes (16): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+8 more)

### Community 51 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 52 - "llm-hop.ts"
Cohesion: 0.17
Nodes (13): LLM_GATEWAY_PORT, isRetryable(), RetryReason, ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid() (+5 more)

### Community 53 - "feedback-form.tsx"
Cohesion: 0.11
Nodes (27): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+19 more)

### Community 54 - "prisma-run.adapter.ts"
Cohesion: 0.08
Nodes (31): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+23 more)

### Community 55 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.08
Nodes (27): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+19 more)

### Community 56 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.07
Nodes (35): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+27 more)

### Community 57 - "archive-runs-view.tsx"
Cohesion: 0.06
Nodes (48): metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, fetchArchiveRuns() (+40 more)

### Community 58 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 59 - "redis-vector-store.adapter.ts"
Cohesion: 0.28
Nodes (11): isUnservableCachedReply(), parseCachedChatResponse(), asString(), ParsedKnnHits, parseKnnHits(), isRedisSearchIndexAlreadyExistsError(), isRedisSearchMissingIndexError(), isRedisSearchModuleMissingError() (+3 more)

### Community 60 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (35): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+27 more)

### Community 61 - "api/src/main.ts"
Cohesion: 0.23
Nodes (9): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig(), ref_cookie_parser, ref_helmet (+1 more)

### Community 62 - "PrismaContentResultAdapter"
Cohesion: 0.14
Nodes (5): ContentPipelineState, VerifierVerdict, PrismaContentResultAdapter, toContentPipelinePhase(), Injectable

### Community 63 - ".streamChat"
Cohesion: 0.13
Nodes (13): ChatStreamController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags, Body (+5 more)

### Community 64 - "save-output-edited.use-case.ts"
Cohesion: 0.17
Nodes (14): assertSameIds(), EMPTY_VERDICT, SaveOutputEditedUseCase, Inject, Injectable, validationFailed(), withCharacterCount(), assertRunReviewable() (+6 more)

### Community 65 - "new-ids.ts"
Cohesion: 0.07
Nodes (16): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), assertTransition(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot (+8 more)

### Community 66 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (62): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep (+54 more)

### Community 67 - "home-entry.tsx"
Cohesion: 0.08
Nodes (36): ACTIVATION_FAILED_HINT, activateAccount(), confirmEmailChange(), fetchBootstrapStatus(), fetchUserSession(), patchOwnEmail(), resendEmailChangeConfirm(), parseSessionUser() (+28 more)

### Community 68 - "ref_react"
Cohesion: 0.06
Nodes (81): bootstrapAdmin(), Credentials, GUEST_HAS_ACTIVE_RUN, loginWithPassword(), patchOwnPassword(), registerAccount(), resendActivation(), parseAuthUserWrapper() (+73 more)

### Community 69 - "cli.module.ts"
Cohesion: 0.05
Nodes (73): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), CliModule (+65 more)

### Community 70 - "index-name.ts"
Cohesion: 0.47
Nodes (5): normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), SEMANTIC_CACHE_PROJECT_ID

### Community 71 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 72 - "landing-view.tsx"
Cohesion: 0.27
Nodes (11): LANDING_CONTEXT_IMAGES, LANDING_COPY, LANDING_HERO_IMAGES, LANDING_RUNS_IMAGES, LandingFeature, LandingPersona, LandingStep, LandingTech (+3 more)

### Community 73 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (55): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor (+47 more)

### Community 74 - "logging.service.ts"
Cohesion: 0.07
Nodes (26): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+18 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "LoggingService"
Cohesion: 0.07
Nodes (18): Inject, Inject, ChatProviderCallService, Injectable, ChatProviderCooldownService, Injectable, StreamCacheReplayService, Injectable (+10 more)

### Community 77 - "ref_nestjs_swagger"
Cohesion: 0.05
Nodes (50): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+42 more)

### Community 78 - "start-run-form.tsx"
Cohesion: 0.08
Nodes (43): fetchCompanyContext(), GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode (+35 more)

### Community 79 - "runs.types.ts"
Cohesion: 0.04
Nodes (99): ArchiveRunsQuery, fetchRunLogs(), fetchRunsSummary(), fetchUserRuns(), isUserRating(), patchRunRating(), UserRunsPageQuery, HitlAccepted (+91 more)

### Community 80 - "responses.adapter.ts"
Cohesion: 0.08
Nodes (47): toHttpException(), asSystemFingerprint(), asToolCallId(), assertOpenAiProviderType(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), ProviderAssistantTurn, ProviderChatTurn (+39 more)

### Community 81 - "HealthService"
Cohesion: 0.13
Nodes (12): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto (+4 more)

### Community 82 - "user-invited.template.ts"
Cohesion: 0.18
Nodes (26): EmailChangeConfirmMail, UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments(), escapeHtml() (+18 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 85 - "http-metrics.interceptor.ts"
Cohesion: 0.19
Nodes (11): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+3 more)

### Community 86 - "packages_shared_dist_index_userid"
Cohesion: 0.06
Nodes (27): Inject, DeleteUserResult, DeleteUserUseCase, Inject, Injectable, GUEST_ARCHIVE_STATUSES, GUEST_TASK_TYPES, GuestRunAdmit (+19 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "MetricsService"
Cohesion: 0.17
Nodes (8): MetricsController, Controller, Get, Res, MetricsService, Inject, Injectable, RunStatsPort

### Community 89 - "AuthController"
Cohesion: 0.15
Nodes (19): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+11 more)

### Community 90 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 91 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 92 - "config-generator.service.ts"
Cohesion: 0.08
Nodes (24): isRedisRequired(), ConfigInitCommand, Command, Option, ConfigGeneratorService, Injectable, FileManagerService, Injectable (+16 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.08
Nodes (50): coercePassNoteVerdict(), isPassOnlyIssue(), Inject, coerceVerifierIssue(), ContentOutput, contentOutputSchema, IdeasOutput, ideasOutputSchema (+42 more)

### Community 94 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (12): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+4 more)

### Community 95 - "patch-company-context.use-case.ts"
Cohesion: 0.38
Nodes (6): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, CompanyContextWriteDetail, isComplete(), mergeCompanyContext()

### Community 96 - "domain/is-complete.ts"
Cohesion: 0.35
Nodes (9): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, collectGateItemPaths(), isCompleteAudienceProfile(), isCompleteCtaItem(), isCompleteOfferItem(), nonEmpty() (+1 more)

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

### Community 102 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 103 - "list-runs-query.dto.ts"
Cohesion: 0.12
Nodes (15): ListRunsQueryDto, IsArray, IsIn, IsOptional, IsString, Transform, PaginationQueryDto, IsIn (+7 more)

### Community 104 - "chat-stream.controller.ts"
Cohesion: 0.08
Nodes (22): ChatController, ApiSecurity, ApiTags, Controller, SseMetaPayloadDto, ApiProperty, ApiPropertyOptional, CHAT_STREAM_API_DESCRIPTION (+14 more)

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

### Community 110 - "KeyGenerateCommand"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 111 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 112 - "src/pagination.ts"
Cohesion: 0.29
Nodes (5): DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, PageSize, PaginatedList

### Community 114 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

### Community 115 - "assert-audience-profile-names-unique.ts"
Cohesion: 0.46
Nodes (4): assertAudienceProfileNamesUnique(), normalizeAudienceName(), withEffectiveAudience(), createLoadContextNode()

### Community 116 - "GuestGuard"
Cohesion: 0.40
Nodes (3): GuestGuard, Inject, Injectable

### Community 117 - ".get"
Cohesion: 0.50
Nodes (3): ApiOkResponse, ApiOperation, Get

### Community 119 - "LoginDto"
Cohesion: 0.40
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 120 - "app-metrics.service.ts"
Cohesion: 0.20
Nodes (13): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus (+5 more)

### Community 121 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 122 - "prisma-invitation.adapter.ts"
Cohesion: 0.16
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 123 - "response-cache.service.ts"
Cohesion: 0.17
Nodes (10): NoopCacheModule, Module, RedisCacheModule, Module, CacheModule, CacheModuleOptions, Module, CACHE_BACKEND (+2 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "RegisterUserDto"
Cohesion: 0.40
Nodes (5): RegisterUserDto, ApiProperty, IsEmail, IsString, MinLength

### Community 126 - "output-edited-result.schemas.ts"
Cohesion: 0.13
Nodes (14): contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema, ideasArraySchema (+6 more)

### Community 127 - "AcceptInviteDto"
Cohesion: 0.50
Nodes (4): AcceptInviteDto, ApiProperty, IsString, MinLength

### Community 128 - "ActivateAccountDto"
Cohesion: 0.50
Nodes (4): ActivateAccountDto, ApiProperty, IsString, MinLength

### Community 144 - "llm-gateway.http.adapter.ts"
Cohesion: 0.09
Nodes (27): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+19 more)

### Community 146 - "load-company-context-fixture.ts"
Cohesion: 0.11
Nodes (17): isEmptyCompanyContext(), audienceProfileSchema, CompanyContextFixture, companyContextFixtureSchema, ctaItemSchema, fixturePath(), loadCompanyContextFixture(), offerItemSchema (+9 more)

### Community 149 - "PrismaRefreshSessionAdapter"
Cohesion: 0.31
Nodes (3): RefreshSessionRecord, PrismaRefreshSessionAdapter, Injectable

## Knowledge Gaps
- **518 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+513 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1355 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Env` connect `Env` to `save-output-edited.use-case.ts`, `auth.module.ts`, `ref_nestjs_common`, `llm-gateway.http.adapter.ts`, `load-company-context-fixture.ts`, `CompanyContextRepository`, `InMemoryRunSseHub`, `GuestGuard`, `packages_shared_dist_index_userid`, `UserRepository`, `llm-hop.ts`, `api/src/health/health.service.ts`, `api/src/main.ts`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `prisma-run.adapter.ts`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `branded.types.ts` to `asProviderInstanceId`, `GatewayConfig`, `ModelAlias`, `AppMetricsService`, `logging.service.ts`, `model-manager.service.ts`, `exitWithAgentReport`, `ref_nestjs_swagger`, `sentry-ai-metrics.adapter.ts`, `ai-provider.interface.ts`, `chat.service.ts`, `configuration.ts`, `app-metrics.service.ts`, `config-generator.service.ts`, `PrometheusAppMetricsAdapter`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _518 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.050597460791635546 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.041277641277641275 - nodes in this community are weakly interconnected._
- **Should `run-result-editor.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.033973985633857506 - nodes in this community are weakly interconnected._
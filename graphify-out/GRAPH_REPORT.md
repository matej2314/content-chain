# Graph Report - content-chain  (2026-10-21)

## Corpus Check
- 722 files · ~262,780 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 4781 nodes · 15526 edges · 138 communities (123 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 421 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bc7c8162`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- auth.module.ts
- social.types.ts
- company-context-form.tsx
- GatewayConfig
- asProviderInstanceId
- chat.service.ts
- apiFetch
- logging.module.ts
- ref_nestjs_common
- anthropic/anthropic-tools.mapper.ts
- users-view.tsx
- transactional-mailer.port.ts
- dashboard-shell.tsx
- PrismaRunAdapter
- cn
- provider-error.mapper.ts
- branded.types.ts
- ai-provider.interface.ts
- exitWithAgentReport
- accept-invite-form.tsx
- model-manager.service.ts
- LoggingService
- configuration.ts
- UserRepository
- redis-vector-store.adapter.ts
- feedback-form.tsx
- ChatToolingDto
- provider-registry.service.ts
- packages_shared_dist_index_userid
- EnvironmentVariables
- prisma-invitation.adapter.ts
- new-ids.ts
- company-context.controller.ts
- google-tools.mapper.ts
- AnthropicMessagesRequestDto
- AuthUserContext
- domain/company-context.types.ts
- enums.ts
- run-result-view.tsx
- semantic-cache.service.ts
- sentry-ai-metrics.adapter.ts
- openai-params-provider.mapper.ts
- ai-provider-gateway/src/health/health.service.ts
- ids.ts
- rate-run.use-case.ts
- metrics.ts
- save-output-edited.use-case.ts
- AppMetricsService
- swagger.setup.ts
- anthropic-response.mapper.ts
- runs.types.ts
- health.api.ts
- GatewayKey
- ref_nestjs_swagger
- run.types.ts
- PrismaCompanyContextAdapter
- company-context.schemas.ts
- start-run-form.tsx
- ChatMessageDto
- llm-hop.ts
- create-feedback.use-case.ts
- OpenAiChatCompletionRequestDto
- HealthService
- app-metrics.module.ts
- anthropic-models.controller.ts
- ClientEditCommand
- guest.guard.ts
- responses.adapter.ts
- chat-completions.adapter.ts
- prisma-run.adapter.ts
- ClientAddCommand
- api/src/main.ts
- to-run-snapshot-base.ts
- api/src/app.module.ts
- InMemoryRunSseHub
- parse-verifier-log-message.ts
- provider-instances.bootstrap.ts
- api/src/health/health.service.ts
- archive-runs-view.tsx
- CompanyContextController
- PrometheusService
- assert-audience-profile-names-unique.ts
- user-activation.template.ts
- SPEC — README
- PrometheusAppMetricsAdapter
- UsersController
- content.schemas.ts
- company-context.dto.ts
- ProviderEditCommand
- ClientRemoveCommand
- EnvPatchService
- ModelAlias
- cli.module.ts
- social.graph.ts
- run.schemas.ts
- openai-messages.mapper.ts
- ProviderRemoveCommand
- route.ts
- FileManagerService
- CompanyContext
- StartRunDto
- health-readiness-response.dto.ts
- models.controller.ts
- ProviderAddCommand
- openai-models.controller.ts
- JwtAuthGuard
- filters/http-exception.filter.ts
- ai-provider-gateway/src/app.module.ts
- ListRunsQueryDto
- logging.service.ts
- LoginDto
- ConfigInitCommand
- RunLogEntry
- RolesGuard
- ModelRemoveCommand
- ModelAddCommand
- KeyGenerateCommand
- ModelEditCommand
- server-prompt.service.ts
- app-metrics.service.ts
- AuthController
- HttpExceptionFilter
- BootstrapAdminDto
- .get
- Architektura
- brand.ts
- GuestGuard
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
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (138 total, 14 thin omitted)

### Community 0 - "auth.module.ts"
Cohesion: 0.05
Nodes (90): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable, comparePassword() (+82 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (28): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore (+20 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.04
Nodes (91): metadata, fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+83 more)

### Community 3 - "GatewayConfig"
Cohesion: 0.09
Nodes (32): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), convertClient(), convertRateLimit(), ClientManagerService (+24 more)

### Community 4 - "asProviderInstanceId"
Cohesion: 0.10
Nodes (44): collectPendingSecrets(), DEFAULT_MODELS, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema (+36 more)

### Community 5 - "chat.service.ts"
Cohesion: 0.06
Nodes (47): SemanticStoreEmbedState, CacheIdentityMessage, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+39 more)

### Community 6 - "apiFetch"
Cohesion: 0.04
Nodes (83): ACTIVATION_FAILED_HINT, activateAccount(), bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession(), loginWithPassword(), logoutSession() (+75 more)

### Community 7 - "logging.module.ts"
Cohesion: 0.06
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "ref_nestjs_common"
Cohesion: 0.03
Nodes (87): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject (+79 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (40): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+32 more)

### Community 10 - "users-view.tsx"
Cohesion: 0.08
Nodes (39): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+31 more)

### Community 11 - "transactional-mailer.port.ts"
Cohesion: 0.16
Nodes (11): Inject, TransactionalMail, TransactionalMailer, LoggingMailerAdapter, Injectable, NodemailerSmtpMailerAdapter, readSmtpConfig(), SmtpConfig (+3 more)

### Community 12 - "dashboard-shell.tsx"
Cohesion: 0.09
Nodes (26): GatewayAliveProvider(), assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput (+18 more)

### Community 13 - "PrismaRunAdapter"
Cohesion: 0.12
Nodes (4): ListRunsResult, RunSnapshot, PrismaRunAdapter, Injectable

### Community 14 - "cn"
Cohesion: 0.06
Nodes (61): AccountEmailFormState, GuestLimitModalProps, FeedbackCta(), CancelRunDialogProps, FALLBACK, AppHeader(), AppHeaderProps, AppSidebar() (+53 more)

### Community 15 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 16 - "branded.types.ts"
Cohesion: 0.07
Nodes (57): PendingSecretsItem, ProviderTestOptions, CliAiModel, CliAiProvider, CliRateLimit, GatewayClient, ProviderTestService, Injectable (+49 more)

### Community 17 - "ai-provider.interface.ts"
Cohesion: 0.12
Nodes (37): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional (+29 more)

### Community 18 - "exitWithAgentReport"
Cohesion: 0.17
Nodes (16): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliModeFlags, markAgentRuntime(), resolveCliMode() (+8 more)

### Community 19 - "accept-invite-form.tsx"
Cohesion: 0.06
Nodes (39): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+31 more)

### Community 20 - "model-manager.service.ts"
Cohesion: 0.08
Nodes (29): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, defaultModelPolicy() (+21 more)

### Community 21 - "LoggingService"
Cohesion: 0.05
Nodes (24): RedisConnectionService, Injectable, Inject, Inject, isRedisRequiredFromConfig(), ChatProviderCallService, Injectable, ChatProviderCooldownService (+16 more)

### Community 22 - "configuration.ts"
Cohesion: 0.07
Nodes (46): CliValidateOptions, asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, collectInactiveProviderWarnings() (+38 more)

### Community 23 - "UserRepository"
Cohesion: 0.03
Nodes (31): Inject, Inject, Inject, ListUsersUseCase, Inject, Injectable, Inject, Inject (+23 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (21): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+13 more)

### Community 25 - "feedback-form.tsx"
Cohesion: 0.12
Nodes (25): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+17 more)

### Community 26 - "ChatToolingDto"
Cohesion: 0.15
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 27 - "provider-registry.service.ts"
Cohesion: 0.09
Nodes (34): clamp(), isOverrideKey(), resolveProviderCallOptions(), buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle() (+26 more)

### Community 28 - "packages_shared_dist_index_userid"
Cohesion: 0.05
Nodes (34): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, RefreshSessionRecord, RotateRefreshSessionResult, ActivationRow, UserRow (+26 more)

### Community 29 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 30 - "prisma-invitation.adapter.ts"
Cohesion: 0.05
Nodes (40): Inject, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase, Inject, Injectable (+32 more)

### Community 31 - "new-ids.ts"
Cohesion: 0.14
Nodes (16): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, ErrorEnvelope (+8 more)

### Community 32 - "company-context.controller.ts"
Cohesion: 0.14
Nodes (14): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+6 more)

### Community 33 - "google-tools.mapper.ts"
Cohesion: 0.14
Nodes (28): mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), getUsageMetadata(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls() (+20 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "AuthUserContext"
Cohesion: 0.06
Nodes (41): InviteUserDto, ApiProperty, IsEmail, Body, HttpCode, Post, CreateFeedbackDto, IsIn (+33 more)

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.15
Nodes (22): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+14 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "run-result-view.tsx"
Cohesion: 0.04
Nodes (58): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+50 more)

### Community 39 - "semantic-cache.service.ts"
Cohesion: 0.06
Nodes (34): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend (+26 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (29): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+21 more)

### Community 41 - "openai-params-provider.mapper.ts"
Cohesion: 0.13
Nodes (23): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+15 more)

### Community 42 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.11
Nodes (22): readGatewayKeyHeader(), resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), SmartRateLimitGuard (+14 more)

### Community 43 - "ids.ts"
Cohesion: 0.09
Nodes (32): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createFeedbackId() (+24 more)

### Community 44 - "rate-run.use-case.ts"
Cohesion: 0.07
Nodes (24): isGuestTaskType(), RateRunUseCase, ratingSchema, Inject, Injectable, assertRunReviewable(), ReviewWindowParams, GUEST_QUOTA (+16 more)

### Community 45 - "metrics.ts"
Cohesion: 0.30
Nodes (11): buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns(), composeSystemPrompt(), isChatAssistantMessage() (+3 more)

### Community 46 - "save-output-edited.use-case.ts"
Cohesion: 0.06
Nodes (40): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+32 more)

### Community 47 - "AppMetricsService"
Cohesion: 0.13
Nodes (4): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable

### Community 48 - "swagger.setup.ts"
Cohesion: 0.07
Nodes (31): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional (+23 more)

### Community 49 - "anthropic-response.mapper.ts"
Cohesion: 0.08
Nodes (44): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+36 more)

### Community 50 - "runs.types.ts"
Cohesion: 0.05
Nodes (88): filterFeedbackRunOptions(), ArchiveRunsQuery, fetchRunsSummary(), fetchUserRuns(), isUserRating(), patchRunRating(), HitlAccepted, isPageOutlineSectionRole() (+80 more)

### Community 51 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 52 - "GatewayKey"
Cohesion: 0.03
Nodes (87): ApiHeader, ChatCacheSource, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity (+79 more)

### Community 53 - "ref_nestjs_swagger"
Cohesion: 0.06
Nodes (37): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+29 more)

### Community 54 - "run.types.ts"
Cohesion: 0.07
Nodes (54): ContentPipelineFacade, toOutcome(), Inject, Injectable, pageOutlineOutputSchema, CONTENT_RESULT_STORE, ContentResultStore, ContentPipelineInput (+46 more)

### Community 55 - "PrismaCompanyContextAdapter"
Cohesion: 0.31
Nodes (4): jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 56 - "company-context.schemas.ts"
Cohesion: 0.33
Nodes (5): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema

### Community 57 - "start-run-form.tsx"
Cohesion: 0.08
Nodes (38): metadata, fetchCompanyContext(), GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact (+30 more)

### Community 58 - "ChatMessageDto"
Cohesion: 0.10
Nodes (23): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+15 more)

### Community 59 - "llm-hop.ts"
Cohesion: 0.07
Nodes (37): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+29 more)

### Community 60 - "create-feedback.use-case.ts"
Cohesion: 0.08
Nodes (27): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+19 more)

### Community 61 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.08
Nodes (27): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+19 more)

### Community 62 - "HealthService"
Cohesion: 0.09
Nodes (13): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+5 more)

### Community 63 - "app-metrics.module.ts"
Cohesion: 0.11
Nodes (13): resolveAppMetricsBackend(), Inject, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller (+5 more)

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 65 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 66 - "guest.guard.ts"
Cohesion: 0.10
Nodes (19): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+11 more)

### Community 67 - "responses.adapter.ts"
Cohesion: 0.15
Nodes (24): asToolCallId(), ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi() (+16 more)

### Community 68 - "chat-completions.adapter.ts"
Cohesion: 0.19
Nodes (20): toHttpException(), asSystemFingerprint(), ProviderToolDefinition, ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas() (+12 more)

### Community 69 - "prisma-run.adapter.ts"
Cohesion: 0.16
Nodes (13): socialBriefSchema, LightRunItem, RunSummaryAggregate, RunSummaryScope, CANCELABLE_RUN_STATUSES, LightRunRow, toLightRunItem(), packages_shared_dist_index_createconversationid (+5 more)

### Community 70 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 71 - "api/src/main.ts"
Cohesion: 0.21
Nodes (10): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig(), ref_cookie_parser, ref_helmet (+2 more)

### Community 72 - "to-run-snapshot-base.ts"
Cohesion: 0.29
Nodes (7): RunRecordBase, RunReviewFields, RunRow, toPipelinePhase(), RunSnapshotBase, toRunSnapshotBase(), toSelectedIdeaIds()

### Community 73 - "api/src/app.module.ts"
Cohesion: 0.07
Nodes (44): AuthModule, Module, CompanyContextModule, Module, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject (+36 more)

### Community 74 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "provider-instances.bootstrap.ts"
Cohesion: 0.20
Nodes (11): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, AIProvider (+3 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "archive-runs-view.tsx"
Cohesion: 0.04
Nodes (77): metadata, metadata, apps_frontend_src_app_globals, geistMono, inter, metadata, spaceGrotesk, SessionContext (+69 more)

### Community 79 - "CompanyContextController"
Cohesion: 0.13
Nodes (12): toCompanyContext(), toPartialCompanyContext(), CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller (+4 more)

### Community 80 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 81 - "assert-audience-profile-names-unique.ts"
Cohesion: 0.38
Nodes (5): assertAudienceProfileNamesUnique(), normalizeAudienceName(), withEffectiveAudience(), createLoadContextNode(), createLoadContextNode()

### Community 82 - "user-activation.template.ts"
Cohesion: 0.28
Nodes (14): UserActivationMail, UserInvitedMail, escapeHtml(), MAIL_PALETTE, MailPalette, MailShellContent, MailShellTextContent, wrapMailHtml() (+6 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "PrometheusAppMetricsAdapter"
Cohesion: 0.11
Nodes (4): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppTokenUsage

### Community 85 - "UsersController"
Cohesion: 0.12
Nodes (15): PatchUserDto, ApiProperty, IsBoolean, ApiCookieAuth, ApiTags, Body, Controller, Delete (+7 more)

### Community 86 - "content.schemas.ts"
Cohesion: 0.24
Nodes (9): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString(), verifierIssueSchema (+1 more)

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
Cohesion: 0.14
Nodes (6): EnvPatchService, Injectable, ProviderManagerService, Injectable, RemoveProviderInput, countActiveModelsAfterProviderChange()

### Community 91 - "ModelAlias"
Cohesion: 0.06
Nodes (4): ModelAlias, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 92 - "cli.module.ts"
Cohesion: 0.05
Nodes (67): AgentReport, AgentReportStatus, CliMode, CliModule, Module, ClientListCommand, ClientListOptions, Command (+59 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.12
Nodes (37): LlmHopService, Injectable, coercePassNoteVerdict(), isPassOnlyIssue(), Inject, ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType() (+29 more)

### Community 94 - "run.schemas.ts"
Cohesion: 0.14
Nodes (14): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialStartRunSchema (+6 more)

### Community 95 - "openai-messages.mapper.ts"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 96 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "FileManagerService"
Cohesion: 0.11
Nodes (14): isRedisRequired(), WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable, Injectable, WizardOrchestratorService (+6 more)

### Community 99 - "CompanyContext"
Cohesion: 0.43
Nodes (6): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, CompanyContext, isComplete(), mergeCompanyContext()

### Community 100 - "StartRunDto"
Cohesion: 0.22
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 101 - "health-readiness-response.dto.ts"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 102 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "openai-models.controller.ts"
Cohesion: 0.11
Nodes (22): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam (+14 more)

### Community 106 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 107 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.05
Nodes (42): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+34 more)

### Community 108 - "ListRunsQueryDto"
Cohesion: 0.14
Nodes (12): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+4 more)

### Community 109 - "logging.service.ts"
Cohesion: 0.09
Nodes (19): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+11 more)

### Community 110 - "LoginDto"
Cohesion: 0.40
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 111 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 114 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 115 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 116 - "KeyGenerateCommand"
Cohesion: 0.29
Nodes (3): KeyGenerateCommand, Command, Option

### Community 117 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 118 - "server-prompt.service.ts"
Cohesion: 0.22
Nodes (8): BasicServerAnswers, CacheAnswers, MetricsAnswers, RateLimitAnswers, RedisAnswers, SentryAnswers, ServerPromptService, Injectable

### Community 119 - "app-metrics.service.ts"
Cohesion: 0.21
Nodes (12): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+4 more)

### Community 120 - "AuthController"
Cohesion: 0.09
Nodes (26): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+18 more)

### Community 122 - "BootstrapAdminDto"
Cohesion: 0.40
Nodes (5): BootstrapAdminDto, ApiProperty, IsEmail, IsString, MinLength

### Community 123 - ".get"
Cohesion: 0.50
Nodes (3): ApiOkResponse, ApiOperation, Get

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand.ts"
Cohesion: 0.33
Nodes (3): unbrand, RunTaskType, RunsSummaryResponse

### Community 126 - "GuestGuard"
Cohesion: 0.40
Nodes (3): GuestGuard, Inject, Injectable

## Knowledge Gaps
- **482 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+477 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1287 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `isRunId()` connect `ids.ts` to `run.schemas.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `RunRepository` connect `ref_nestjs_common` to `PrismaRunAdapter`, `rate-run.use-case.ts`, `prisma-run.adapter.ts`, `save-output-edited.use-case.ts`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `AppMetricsBackend` connect `ModelAlias` to `PrometheusAppMetricsAdapter`, `app-metrics.module.ts`, `app-metrics.service.ts`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _482 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `auth.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04894615922485266 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.051756785188302123 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.041367806505421184 - nodes in this community are weakly interconnected._
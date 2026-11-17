# Graph Report - content-chain  (2026-11-17)

## Corpus Check
- 772 files · ~305,277 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 5099 nodes · 16566 edges · 148 communities (132 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 433 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f3eb1546`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- branded.types.ts
- get-run.use-case.ts
- company-context-form.tsx
- prisma-user.adapter.ts
- cn
- redis-vector-store.adapter.ts
- Env
- AppMetricsBackend
- asProviderInstanceId
- anthropic/anthropic-tools.mapper.ts
- isRecord
- AuthUserContext
- config-generator.service.ts
- prisma-run.adapter.ts
- prisma-email-change-request.adapter.ts
- provider-error.mapper.ts
- RunSseNotifyListener
- google-tools.mapper.ts
- useSession
- chat.service.ts
- health.api.ts
- runs.types.ts
- configuration.ts
- PrismaService
- api/src/app.module.ts
- auth.module.ts
- DomainException
- create-feedback.use-case.ts
- anthropic-response.mapper.ts
- PrometheusAppMetricsAdapter
- accept-invite-form.tsx
- ioredis-guest-quota.adapter.ts
- logging.service.ts
- types/index.ts
- prisma-invitation.adapter.ts
- HttpMetricsMiddleware
- domain/company-context.types.ts
- enums.ts
- run.types.ts
- ModelAlias
- .getOne
- auth.schemas.ts
- openai-params-provider.mapper.ts
- ids.ts
- wizard-orchestrator.service.ts
- .getOne
- LoggingService
- .completions
- OpenAiChatCompletionRequestDto
- chat-completions.adapter.ts
- company-context.controller.ts
- ClientRemoveCommand
- ref_nestjs_common
- feedback-form.tsx
- app-metrics.service.ts
- ConfigValidateCommand
- .streamChat
- ModelEditCommand
- api/src/health/health.service.ts
- metrics.ts
- sentry-ai-metrics.adapter.ts
- ModelRemoveCommand
- list-runs-query.dto.ts
- AnthropicMessagesRequestDto
- ChatToolingDto
- ClientAddCommand
- GatewayConfig
- ref_nestjs_swagger
- apiFetch
- cli.module.ts
- landing-view.tsx
- responses.adapter.ts
- openai-stream.mapper.ts
- .createMessage
- LogContext
- parse-verifier-log-message.ts
- http-metrics.interceptor.ts
- ChatParamsDto
- start-run-form.tsx
- archive-runs-view.tsx
- .info
- NoopAppMetricsAdapter
- user-invited.template.ts
- SPEC — README
- form-field.tsx
- UsersController
- assert-company-context-writable.ts
- company-context.dto.ts
- AnthropicContentBlockDto
- should-include-redis-stack.ts
- .execute
- openai-messages-provider.mapper.ts
- worker-env.schema.ts
- social.graph.ts
- RunRecord
- swagger.setup.ts
- KeyGenerateCommand
- route.ts
- CompanyContextController
- ModelAddCommand
- StartRunDto
- src/index.ts
- PrometheusService
- packages_shared_dist_index
- anthropic-models.mapper.ts
- new-ids.ts
- GatewayModelDto
- AuthController
- api/src/main.ts
- GatewayModelsCatalogService
- ProviderRemoveCommand
- .getOne
- src/pagination.ts
- openai-models.mapper.ts
- CreateFeedbackDto
- CompanyContextRepository
- PublicConfigController
- ProviderEditCommand
- openai-error-response.dto.ts
- BootstrapAdminDto
- packages_shared_dist_index_userid
- LoginDto
- invitations.controller.ts
- RegisterUserDto
- Architektura
- AcceptInviteDto
- save-output-edited.use-case.ts
- ProviderAddCommand
- ActivateAccountDto
- HitlDto
- PatchRunRatingDto
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
- worker-runtime.module.ts
- load-company-context-fixture.ts
- guest.guard.ts

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
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (148 total, 13 thin omitted)

### Community 0 - "branded.types.ts"
Cohesion: 0.08
Nodes (50): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData (+42 more)

### Community 1 - "get-run.use-case.ts"
Cohesion: 0.05
Nodes (31): CompositeRunResultReader, GetRunGuestAccess, GetRunOutput, RUN_RESULT_READER, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable (+23 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.04
Nodes (96): metadata, fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+88 more)

### Community 3 - "prisma-user.adapter.ts"
Cohesion: 0.07
Nodes (20): Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult (+12 more)

### Community 4 - "cn"
Cohesion: 0.05
Nodes (56): AccountManageMenuProps, ManageDialog, DemoChip(), FeedbackCta(), AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps (+48 more)

### Community 5 - "redis-vector-store.adapter.ts"
Cohesion: 0.04
Nodes (56): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), isUnservableCachedReply(), ResponseCacheService, Injectable, parseCachedChatResponse(), OllamaEmbeddingAdapter (+48 more)

### Community 6 - "Env"
Cohesion: 0.07
Nodes (47): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, ActivateAccountOutput, hashPassword(), hashRefreshToken() (+39 more)

### Community 8 - "asProviderInstanceId"
Cohesion: 0.08
Nodes (46): collectPendingSecrets(), DEFAULT_MODELS, convertProvider(), CliAiModel, CliAiProvider, EnvPatchService, Injectable, ProviderPromptResult (+38 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.10
Nodes (39): asPromptCacheCreationTokens(), asPromptCacheHitTokens(), anthropicModelRejectsSamplingParams(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort() (+31 more)

### Community 10 - "isRecord"
Cohesion: 0.08
Nodes (45): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+37 more)

### Community 11 - "AuthUserContext"
Cohesion: 0.10
Nodes (25): Body, HttpCode, Post, orderItemsBySelectedIds(), isTerminalStatus(), RunsController, ApiCookieAuth, ApiTags (+17 more)

### Community 12 - "config-generator.service.ts"
Cohesion: 0.07
Nodes (23): isRedisRequired(), ConfigInitCommand, Command, Option, WizardState, ConfigGeneratorService, Injectable, ConfigPersistenceService (+15 more)

### Community 13 - "prisma-run.adapter.ts"
Cohesion: 0.04
Nodes (46): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+38 more)

### Community 14 - "prisma-email-change-request.adapter.ts"
Cohesion: 0.11
Nodes (11): Inject, Inject, Inject, EmailChangeRequestRecord, EmailChangeRequestRepository, UpsertEmailChangeRequestInput, isUniqueConstraintViolation(), PrismaEmailChangeRequestAdapter (+3 more)

### Community 15 - "provider-error.mapper.ts"
Cohesion: 0.27
Nodes (15): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+7 more)

### Community 16 - "RunSseNotifyListener"
Cohesion: 0.40
Nodes (3): parseRunSseNotifyPayload(), RunSseNotifyListener, Injectable

### Community 17 - "google-tools.mapper.ts"
Cohesion: 0.16
Nodes (23): toHttpException(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel() (+15 more)

### Community 18 - "useSession"
Cohesion: 0.07
Nodes (40): AccountManageMenu(), useSession(), useDemoMode(), useGuestLocked(), viewingRunIdFromPathname(), useViewingRunId(), fetchRunLogs(), isLiveRunStatus() (+32 more)

### Community 19 - "chat.service.ts"
Cohesion: 0.05
Nodes (54): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+46 more)

### Community 20 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 21 - "runs.types.ts"
Cohesion: 0.02
Nodes (142): filterFeedbackRunOptions(), buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload() (+134 more)

### Community 22 - "configuration.ts"
Cohesion: 0.05
Nodes (55): CliGatewayValidatorService, CliValidateOptions, Injectable, normalizeGatewayConfigForWrite(), ValidationFormatter, asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig (+47 more)

### Community 23 - "PrismaService"
Cohesion: 0.07
Nodes (14): Inject, PrismaFeedbackRunReaderAdapter, Injectable, GUEST_PURGE, GuestPurgeDeleteStats, GuestPurgePort, LIVE_RUN_STATUSES, GuestPurgeModule (+6 more)

### Community 24 - "api/src/app.module.ts"
Cohesion: 0.05
Nodes (56): AuthModule, Module, CompanyContextModule, Module, ContentRunExecutor, Injectable, ContentModule, Module (+48 more)

### Community 25 - "auth.module.ts"
Cohesion: 0.05
Nodes (51): ActivateAccountUseCase, Injectable, BootstrapAdminUseCase, Injectable, BootstrapStatusUseCase, Inject, Injectable, ChangeMePasswordUseCase (+43 more)

### Community 26 - "DomainException"
Cohesion: 0.15
Nodes (16): comparePassword(), generateRefreshToken(), AuthTokenResult, LoginUseCase, Injectable, MeResult, RefreshUseCase, Injectable (+8 more)

### Community 27 - "create-feedback.use-case.ts"
Cohesion: 0.07
Nodes (29): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_PURGE, FeedbackPurgePort (+21 more)

### Community 28 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 29 - "PrometheusAppMetricsAdapter"
Cohesion: 0.13
Nodes (4): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppProviderStreamScope

### Community 30 - "accept-invite-form.tsx"
Cohesion: 0.07
Nodes (35): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), AcceptInviteForm() (+27 more)

### Community 31 - "ioredis-guest-quota.adapter.ts"
Cohesion: 0.10
Nodes (17): isGuestTaskType(), GUEST_QUOTA, GuestQuotaAdmitResult, GuestQuotaPort, GuestQuotaModule, Module, createRedis(), IoredisGuestQuotaAdapter (+9 more)

### Community 32 - "logging.service.ts"
Cohesion: 0.09
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 33 - "types/index.ts"
Cohesion: 0.08
Nodes (44): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+36 more)

### Community 34 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.16
Nodes (21): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+13 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "run.types.ts"
Cohesion: 0.05
Nodes (67): ContentPipelineFacade, toOutcome(), Inject, Injectable, isCanonicalOutlineSelection(), isMissingContentKind(), Inject, coerceVerifierIssue() (+59 more)

### Community 39 - "ModelAlias"
Cohesion: 0.12
Nodes (4): ProviderTestOptions, ModelAlias, ProviderInstanceId, AppTokenUsage

### Community 40 - ".getOne"
Cohesion: 0.19
Nodes (10): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 41 - "auth.schemas.ts"
Cohesion: 0.11
Nodes (18): ActivateAccountInput, activateAccountSchema, BootstrapAdminInput, bootstrapAdminSchema, ChangeMePasswordInput, changeMePasswordSchema, confirmEmailChangeSchema, deleteOwnAccountSchema (+10 more)

### Community 42 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 43 - "ids.ts"
Cohesion: 0.08
Nodes (36): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createEmailChangeRequestId() (+28 more)

### Community 44 - "wizard-orchestrator.service.ts"
Cohesion: 0.06
Nodes (63): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep (+55 more)

### Community 45 - ".getOne"
Cohesion: 0.19
Nodes (10): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 46 - "LoggingService"
Cohesion: 0.04
Nodes (37): RedisConnectionService, Injectable, Inject, Inject, isRedisRequiredFromConfig(), ChatErrorHandlerService, Injectable, ChatProviderCallService (+29 more)

### Community 47 - ".completions"
Cohesion: 0.11
Nodes (18): OpenAiChatCompletionsController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags, Body (+10 more)

### Community 48 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.08
Nodes (27): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+19 more)

### Community 49 - "chat-completions.adapter.ts"
Cohesion: 0.20
Nodes (19): asSystemFingerprint(), ProviderToolDefinition, ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText() (+11 more)

### Community 50 - "company-context.controller.ts"
Cohesion: 0.18
Nodes (16): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase (+8 more)

### Community 51 - "ClientRemoveCommand"
Cohesion: 0.33
Nodes (3): ClientRemoveCommand, Command, Option

### Community 52 - "ref_nestjs_common"
Cohesion: 0.03
Nodes (97): GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+89 more)

### Community 53 - "feedback-form.tsx"
Cohesion: 0.16
Nodes (19): createFeedback(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated(), FALLBACK, FeedbackForm() (+11 more)

### Community 54 - "app-metrics.service.ts"
Cohesion: 0.23
Nodes (12): healthStatusToGaugeValue(), APP_METRICS_BACKEND, AppRequestLabels, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+4 more)

### Community 55 - "ConfigValidateCommand"
Cohesion: 0.40
Nodes (3): ConfigValidateCommand, Command, Option

### Community 56 - ".streamChat"
Cohesion: 0.13
Nodes (13): ChatStreamController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags, Body (+5 more)

### Community 57 - "ModelEditCommand"
Cohesion: 0.33
Nodes (3): ModelEditCommand, Command, Option

### Community 58 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 59 - "metrics.ts"
Cohesion: 0.08
Nodes (37): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+29 more)

### Community 60 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.09
Nodes (28): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+20 more)

### Community 61 - "ModelRemoveCommand"
Cohesion: 0.33
Nodes (3): ModelRemoveCommand, Command, Option

### Community 62 - "list-runs-query.dto.ts"
Cohesion: 0.12
Nodes (15): ListRunsQueryDto, IsArray, IsIn, IsOptional, IsString, Transform, PaginationQueryDto, IsIn (+7 more)

### Community 63 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 64 - "ChatToolingDto"
Cohesion: 0.15
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 65 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 66 - "GatewayConfig"
Cohesion: 0.08
Nodes (37): PendingSecretsItem, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService (+29 more)

### Community 67 - "ref_nestjs_swagger"
Cohesion: 0.10
Nodes (20): ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDonePayloadDto, SseDoneUsageDto, ApiPropertyOptional (+12 more)

### Community 68 - "apiFetch"
Cohesion: 0.05
Nodes (66): ACTIVATION_FAILED_HINT, acceptInvite(), activateAccount(), bootstrapAdmin(), confirmEmailChange(), Credentials, fetchBootstrapStatus(), fetchUserSession() (+58 more)

### Community 69 - "cli.module.ts"
Cohesion: 0.07
Nodes (68): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+60 more)

### Community 70 - "landing-view.tsx"
Cohesion: 0.27
Nodes (11): LANDING_CONTEXT_IMAGES, LANDING_COPY, LANDING_HERO_IMAGES, LANDING_RUNS_IMAGES, LandingFeature, LandingPersona, LandingStep, LandingTech (+3 more)

### Community 71 - "responses.adapter.ts"
Cohesion: 0.22
Nodes (20): toCachedChatResponse(), asInputTokens(), asOutputTokens(), asToolCallId(), getUsageMetadata(), buildResponsesCreateParams(), createResponsesAdapter(), textStream() (+12 more)

### Community 72 - "openai-stream.mapper.ts"
Cohesion: 0.18
Nodes (20): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+12 more)

### Community 73 - ".createMessage"
Cohesion: 0.12
Nodes (18): ApiHeader, AnthropicMessagesController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags (+10 more)

### Community 74 - "LogContext"
Cohesion: 0.06
Nodes (26): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+18 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "http-metrics.interceptor.ts"
Cohesion: 0.10
Nodes (17): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+9 more)

### Community 77 - "ChatParamsDto"
Cohesion: 0.12
Nodes (16): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+8 more)

### Community 78 - "start-run-form.tsx"
Cohesion: 0.06
Nodes (43): metadata, metadata, apps_frontend_src_app_globals, geistMono, inter, metadata, spaceGrotesk, fetchCompanyContext() (+35 more)

### Community 79 - "archive-runs-view.tsx"
Cohesion: 0.05
Nodes (54): metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, fetchArchiveRuns() (+46 more)

### Community 80 - ".info"
Cohesion: 0.15
Nodes (10): toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand, Command, Option, ProviderTestService (+2 more)

### Community 81 - "NoopAppMetricsAdapter"
Cohesion: 0.12
Nodes (3): NoopAppMetricsAdapter, Injectable, resolveAppMetricsBackend()

### Community 82 - "user-invited.template.ts"
Cohesion: 0.18
Nodes (26): EmailChangeConfirmMail, UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments(), escapeHtml() (+18 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "form-field.tsx"
Cohesion: 0.06
Nodes (57): deleteOwnAccount(), GUEST_HAS_ACTIVE_RUN, logoutSession(), registerAccount(), AccountDeleteForm(), onPurgeConfirm(), onReauthSubmit(), runDelete() (+49 more)

### Community 85 - "UsersController"
Cohesion: 0.14
Nodes (15): PatchUserDto, ApiProperty, IsBoolean, ApiCookieAuth, ApiTags, Body, Controller, Delete (+7 more)

### Community 86 - "assert-company-context-writable.ts"
Cohesion: 0.26
Nodes (7): assertAudienceProfileNamesUnique(), assertCompanyContextWritable(), CompanyContextWriteDetail, isComplete(), normalizeAudienceName(), withEffectiveAudience(), createLoadContextNode()

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "AnthropicContentBlockDto"
Cohesion: 0.14
Nodes (14): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+6 more)

### Community 89 - "should-include-redis-stack.ts"
Cohesion: 0.05
Nodes (32): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+24 more)

### Community 90 - ".execute"
Cohesion: 0.27
Nodes (9): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, newConversationId() (+1 more)

### Community 91 - "openai-messages-provider.mapper.ts"
Cohesion: 0.27
Nodes (7): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 92 - "worker-env.schema.ts"
Cohesion: 0.24
Nodes (8): Global, Module, WorkerEnvModule, assertPositiveTtl(), validateWorkerEnv(), WorkerEnvInput, workerEnvInputSchema, workerEnvSchema

### Community 93 - "social.graph.ts"
Cohesion: 0.09
Nodes (49): loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput, IdeasOutput, ideasOutputSchema (+41 more)

### Community 94 - "RunRecord"
Cohesion: 0.08
Nodes (19): RunAbortRegistry, Injectable, RunDispatchExecutor, RunExecutePump, Inject, Injectable, hasPublishLog(), RunLifecycleService (+11 more)

### Community 95 - "swagger.setup.ts"
Cohesion: 0.05
Nodes (44): AppModule, Module, RedisConsumer, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty (+36 more)

### Community 96 - "KeyGenerateCommand"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "CompanyContextController"
Cohesion: 0.15
Nodes (10): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller, Get, Patch (+2 more)

### Community 99 - "ModelAddCommand"
Cohesion: 0.33
Nodes (3): ModelAddCommand, Command, Option

### Community 100 - "StartRunDto"
Cohesion: 0.22
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 101 - "src/index.ts"
Cohesion: 0.25
Nodes (5): unbrand, RunTaskType, RunsSummaryResponse, parseTtlMs(), parseTtlSeconds()

### Community 102 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 103 - "packages_shared_dist_index"
Cohesion: 0.03
Nodes (81): FeedbackRunLookup, FeedbackRunReader, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject, Injectable (+73 more)

### Community 104 - "anthropic-models.mapper.ts"
Cohesion: 0.43
Nodes (6): AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic(), mapGatewayModelToAnthropic(), toDisplayName()

### Community 105 - "new-ids.ts"
Cohesion: 0.15
Nodes (10): ErrorEnvelope, HttpExceptionFilter, Catch, newInvitationId(), newRequestId(), RequestIdMiddleware, Injectable, packages_shared_dist_index_accountactivationid (+2 more)

### Community 106 - "GatewayModelDto"
Cohesion: 0.36
Nodes (6): GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto, ApiProperty

### Community 107 - "AuthController"
Cohesion: 0.15
Nodes (19): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+11 more)

### Community 108 - "api/src/main.ts"
Cohesion: 0.23
Nodes (9): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig(), ref_cookie_parser, ref_helmet (+1 more)

### Community 110 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 111 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 112 - "src/pagination.ts"
Cohesion: 0.29
Nodes (5): DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, PageSize, PaginatedList

### Community 113 - "openai-models.mapper.ts"
Cohesion: 0.48
Nodes (5): OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty, mapGatewayModelsListToOpenAi(), mapGatewayModelToOpenAi()

### Community 114 - "CreateFeedbackDto"
Cohesion: 0.33
Nodes (6): CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength, MinLength

### Community 115 - "CompanyContextRepository"
Cohesion: 0.12
Nodes (11): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, jsonArray(), jsonRecord() (+3 more)

### Community 116 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 117 - "ProviderEditCommand"
Cohesion: 0.33
Nodes (3): ProviderEditCommand, Command, Option

### Community 118 - "openai-error-response.dto.ts"
Cohesion: 0.50
Nodes (4): OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional

### Community 119 - "BootstrapAdminDto"
Cohesion: 0.40
Nodes (5): BootstrapAdminDto, ApiProperty, IsEmail, IsString, MinLength

### Community 120 - "packages_shared_dist_index_userid"
Cohesion: 0.09
Nodes (11): Inject, Inject, Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult (+3 more)

### Community 121 - "LoginDto"
Cohesion: 0.40
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 122 - "invitations.controller.ts"
Cohesion: 0.07
Nodes (25): InviteUserUseCase, Injectable, ListInvitationsUseCase, Inject, Injectable, ResendInvitationUseCase, Injectable, RevokeInvitationUseCase (+17 more)

### Community 123 - "RegisterUserDto"
Cohesion: 0.40
Nodes (5): RegisterUserDto, ApiProperty, IsEmail, IsString, MinLength

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "AcceptInviteDto"
Cohesion: 0.50
Nodes (4): AcceptInviteDto, ApiProperty, IsString, MinLength

### Community 126 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (30): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+22 more)

### Community 127 - "ProviderAddCommand"
Cohesion: 0.16
Nodes (6): ClientEditCommand, Command, Option, ProviderAddCommand, Command, Option

### Community 128 - "ActivateAccountDto"
Cohesion: 0.50
Nodes (4): ActivateAccountDto, ApiProperty, IsString, MinLength

### Community 129 - "HitlDto"
Cohesion: 0.50
Nodes (3): HitlDto, IsArray, IsString

### Community 130 - "PatchRunRatingDto"
Cohesion: 0.50
Nodes (3): PatchRunRatingDto, IsIn, ValidateIf

### Community 144 - "llm-gateway.http.adapter.ts"
Cohesion: 0.09
Nodes (27): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+19 more)

### Community 145 - "worker-runtime.module.ts"
Cohesion: 0.03
Nodes (63): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, AFTER_RECOVER_WAKE, AfterRecoverWake, Inject, Injectable, WorkerRecoverySweepBoot (+55 more)

### Community 146 - "load-company-context-fixture.ts"
Cohesion: 0.09
Nodes (20): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, isEmptyCompanyContext(), audienceProfileSchema, CompanyContextFixture (+12 more)

### Community 148 - "guest.guard.ts"
Cohesion: 0.11
Nodes (11): ALLOW_GUEST_KEY, IS_PUBLIC_KEY, ROLES_KEY, GuestGuard, Inject, Injectable, JwtAuthGuard, Injectable (+3 more)

## Knowledge Gaps
- **529 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+524 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1397 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Env` connect `Env` to `get-run.use-case.ts`, `prisma-user.adapter.ts`, `prisma-email-change-request.adapter.ts`, `llm-gateway.http.adapter.ts`, `worker-runtime.module.ts`, `load-company-context-fixture.ts`, `guest.guard.ts`, `api/src/app.module.ts`, `auth.module.ts`, `DomainException`, `ioredis-guest-quota.adapter.ts`, `api/src/health/health.service.ts`, `worker-env.schema.ts`, `RunRecord`, `packages_shared_dist_index`, `api/src/main.ts`, `CompanyContextRepository`, `PublicConfigController`, `packages_shared_dist_index_userid`, `save-output-edited.use-case.ts`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `prisma-run.adapter.ts`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `DomainException` connect `DomainException` to `get-run.use-case.ts`, `prisma-user.adapter.ts`, `Env`, `AuthUserContext`, `prisma-run.adapter.ts`, `prisma-email-change-request.adapter.ts`, `PrismaService`, `api/src/app.module.ts`, `auth.module.ts`, `create-feedback.use-case.ts`, `ioredis-guest-quota.adapter.ts`, `prisma-invitation.adapter.ts`, `run.types.ts`, `http-metrics.interceptor.ts`, `assert-company-context-writable.ts`, `.execute`, `RunRecord`, `packages_shared_dist_index`, `new-ids.ts`, `invitations.controller.ts`, `save-output-edited.use-case.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _529 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `branded.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08105022831050228 - nodes in this community are weakly interconnected._
- **Should `get-run.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.052121212121212124 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0391304347826087 - nodes in this community are weakly interconnected._
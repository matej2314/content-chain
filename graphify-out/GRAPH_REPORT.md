# Graph Report - content-chain  (2026-11-09)

## Corpus Check
- 734 files · ~286,143 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 4843 nodes · 15731 edges · 133 communities (117 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 423 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9dc0a00a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- prisma-invitation.adapter.ts
- social.types.ts
- company-context-form.tsx
- asProviderInstanceId
- model-manager.service.ts
- ai-provider-gateway/src/app.module.ts
- AuthUserContext
- FileManagerService
- runs.controller.ts
- anthropic/anthropic-tools.mapper.ts
- runs.types.ts
- Env
- feedback-form.tsx
- prisma-run.adapter.ts
- dashboard-shell.tsx
- api-error.code.ts
- resilient-executor.ts
- ai-provider.interface.ts
- cli.module.ts
- chat.service.ts
- button.tsx
- LoggingService
- configuration.ts
- UserRepository
- auth.module.ts
- cn
- branded.types.ts
- chat-completions.adapter.ts
- anthropic-response.mapper.ts
- users-view.tsx
- PrismaContentResultAdapter
- openai-params-provider.mapper.ts
- google-tools.mapper.ts
- auth.api.ts
- AnthropicMessagesRequestDto
- anthropic-messages.controller.ts
- domain/company-context.types.ts
- enums.ts
- run-details-view.tsx
- redis-vector-store.adapter.ts
- metrics.ts
- ChatMessageDto
- GatewayConfig
- ids.ts
- configuration.types.ts
- semantic-cache.service.ts
- output-edited-result.schemas.ts
- responses.adapter.ts
- swagger.setup.ts
- ref_nestjs_swagger
- company-context.controller.ts
- openai-stream.mapper.ts
- UsersController
- rate-limit.module.ts
- content.graph.ts
- EnvironmentVariables
- archive-runs-view.tsx
- api/src/health/health.service.ts
- llm-gateway.http.adapter.ts
- OpenAiChatCompletionRequestDto
- HealthService
- anthropic-models.controller.ts
- PrismaRefreshSessionAdapter
- ModelAddCommand
- provider-instances.bootstrap.ts
- EnvelopeError
- api/src/app.module.ts
- logging.module.ts
- parse-verifier-log-message.ts
- http-metrics.interceptor.ts
- chat-tooling.dto.ts
- start-run-form.tsx
- run-result-view.tsx
- ClientEditCommand
- user-invited.template.ts
- SPEC — README
- notify-product.tsx
- invite-user.use-case.ts
- GuestGuard
- company-context.dto.ts
- ProviderEditCommand
- ref_nestjs_common
- ref_react
- ModelAlias
- KeyGeneratorService
- social.graph.ts
- CompanyContextController
- provider-registry.service.ts
- ProviderAddCommand
- route.ts
- create-feedback.use-case.ts
- ClientRemoveCommand
- start-run.dto.ts
- .info
- models.controller.ts
- ProviderRemoveCommand
- openai-models.controller.ts
- ref_class_validator
- api/src/main.ts
- health.api.ts
- InMemoryRunSseHub
- src/pagination.ts
- CompanyContext
- ModelRemoveCommand
- llm-hop.ts
- JwtAuthGuard
- ModelEditCommand
- ClientAddCommand
- HttpExceptionFilter
- PublicConfigController
- ConfigInitCommand
- Architektura
- assert-audience-profile-names-unique.ts
- save-output-edited.use-case.ts
- filters/http-exception.filter.ts
- openai-messages.mapper.ts
- PrismaCompanyContextAdapter
- company-context.schemas.ts
- src/index.ts
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
- RolesGuard

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `DomainException` - 84 edges
3. `ProviderInstanceId` - 81 edges
4. `LoggingService` - 73 edges
5. `isRecord()` - 69 edges
6. `asProviderInstanceId()` - 67 edges
7. `GatewayConfig` - 65 edges
8. `cn()` - 65 edges
9. `Env` - 63 edges
10. `AuthUserContext` - 62 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `Request` --references--> `AuthUserContext`  [EXTRACTED]
  apps/api/src/shared/http/express.d.ts → apps/api/src/shared/types/auth-user-context.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (133 total, 13 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (30): PageDocument, PageOutline, VerifierVerdict, CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader (+22 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.05
Nodes (71): metadata, putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+63 more)

### Community 3 - "asProviderInstanceId"
Cohesion: 0.06
Nodes (68): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), collectPendingSecrets(), DEFAULT_MODELS, WIZARD_INIT_STEPS (+60 more)

### Community 4 - "model-manager.service.ts"
Cohesion: 0.09
Nodes (27): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ConfigPersistenceService, Injectable, defaultModelPolicy(), ModelEditField (+19 more)

### Community 5 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.08
Nodes (25): ChatModule, Module, HealthModule, Module, AnthropicModule, Module, IntegrationsModule, Module (+17 more)

### Community 6 - "AuthUserContext"
Cohesion: 0.08
Nodes (35): Get, Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString (+27 more)

### Community 7 - "FileManagerService"
Cohesion: 0.10
Nodes (17): ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable, WizardState, ConfigGeneratorService, Injectable (+9 more)

### Community 8 - "runs.controller.ts"
Cohesion: 0.02
Nodes (106): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject (+98 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.10
Nodes (43): toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens(), asPromptCacheHitTokens(), anthropicModelRejectsSamplingParams(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel (+35 more)

### Community 10 - "runs.types.ts"
Cohesion: 0.05
Nodes (90): ArchiveRunsQuery, fetchRunsSummary(), fetchUserRuns(), isUserRating(), patchRunRating(), UserRunsPageQuery, HitlAccepted, isPageOutlineSectionRole() (+82 more)

### Community 11 - "Env"
Cohesion: 0.05
Nodes (39): Inject, NodemailerSmtpMailerAdapter, readSmtpConfig(), SmtpConfig, Inject, Injectable, readCookie(), isRecord() (+31 more)

### Community 12 - "feedback-form.tsx"
Cohesion: 0.14
Nodes (23): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+15 more)

### Community 13 - "prisma-run.adapter.ts"
Cohesion: 0.05
Nodes (33): contentBriefSchema, socialBriefSchema, LightRunItem, ListLightRunsResult, ListRunsResult, RunSnapshot, RunSummaryAggregate, RunSummaryScope (+25 more)

### Community 14 - "dashboard-shell.tsx"
Cohesion: 0.08
Nodes (33): fetchCompleteness(), CompletenessState, GATE_SECTION_LABELS, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE (+25 more)

### Community 15 - "api-error.code.ts"
Cohesion: 0.18
Nodes (21): ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError() (+13 more)

### Community 16 - "resilient-executor.ts"
Cohesion: 0.16
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 17 - "ai-provider.interface.ts"
Cohesion: 0.09
Nodes (46): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, ChatWarningDto, ApiProperty, ApiPropertyOptional (+38 more)

### Community 18 - "cli.module.ts"
Cohesion: 0.06
Nodes (69): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+61 more)

### Community 19 - "chat.service.ts"
Cohesion: 0.05
Nodes (64): SemanticStoreEmbedState, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize (+56 more)

### Community 20 - "button.tsx"
Cohesion: 0.07
Nodes (44): loginWithPassword(), logoutSession(), AccountEmailFormState, AuthModal(), AuthModalProps, descriptionFor(), titleFor(), INITIAL_LOGIN_CARD_STATE (+36 more)

### Community 21 - "LoggingService"
Cohesion: 0.04
Nodes (34): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+26 more)

### Community 22 - "configuration.ts"
Cohesion: 0.04
Nodes (61): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+53 more)

### Community 23 - "UserRepository"
Cohesion: 0.04
Nodes (21): Inject, Inject, Inject, Inject, Inject, Inject, Inject, Inject (+13 more)

### Community 24 - "auth.module.ts"
Cohesion: 0.05
Nodes (80): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable, comparePassword() (+72 more)

### Community 25 - "cn"
Cohesion: 0.06
Nodes (44): AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), SidebarBrandMark(), APP_NAV, AppNavItem (+36 more)

### Community 26 - "branded.types.ts"
Cohesion: 0.07
Nodes (46): CliAiModel, CliAiProvider, EnvPatchService, Injectable, ProviderTestService, Injectable, ClientCli, generateEnvTemplate() (+38 more)

### Community 27 - "chat-completions.adapter.ts"
Cohesion: 0.21
Nodes (19): toHttpException(), asSystemFingerprint(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText() (+11 more)

### Community 28 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (25): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+17 more)

### Community 29 - "users-view.tsx"
Cohesion: 0.07
Nodes (52): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+44 more)

### Community 30 - "PrismaContentResultAdapter"
Cohesion: 0.29
Nodes (3): PrismaContentResultAdapter, toContentPipelinePhase(), Injectable

### Community 31 - "openai-params-provider.mapper.ts"
Cohesion: 0.15
Nodes (18): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+10 more)

### Community 32 - "google-tools.mapper.ts"
Cohesion: 0.14
Nodes (25): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+17 more)

### Community 33 - "auth.api.ts"
Cohesion: 0.06
Nodes (51): apps_frontend_src_app_globals, geistMono, inter, metadata, spaceGrotesk, ACTIVATION_FAILED_HINT, activateAccount(), bootstrapAdmin() (+43 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 35 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (58): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+50 more)

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.15
Nodes (22): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+14 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "run-details-view.tsx"
Cohesion: 0.08
Nodes (39): metadata, useSession(), useGuestLocked(), canEditResult(), fetchRunLogs(), fetchUserRunsPage(), finalizeRunReview(), UserRating (+31 more)

### Community 39 - "redis-vector-store.adapter.ts"
Cohesion: 0.11
Nodes (24): isUnservableCachedReply(), CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag() (+16 more)

### Community 40 - "metrics.ts"
Cohesion: 0.08
Nodes (36): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+28 more)

### Community 41 - "ChatMessageDto"
Cohesion: 0.16
Nodes (16): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+8 more)

### Community 42 - "GatewayConfig"
Cohesion: 0.12
Nodes (23): PendingSecretsItem, convertRateLimit(), CliRateLimit, ClientManagerService, Injectable, ProviderManagerService, Injectable, generateGatewayConfigTemplate() (+15 more)

### Community 43 - "ids.ts"
Cohesion: 0.09
Nodes (32): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createFeedbackId() (+24 more)

### Community 44 - "configuration.types.ts"
Cohesion: 0.12
Nodes (17): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard (+9 more)

### Community 45 - "semantic-cache.service.ts"
Cohesion: 0.06
Nodes (35): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), CACHE_BACKEND, ResponseCacheService, Injectable, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex() (+27 more)

### Community 46 - "output-edited-result.schemas.ts"
Cohesion: 0.08
Nodes (28): contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema, ideasArraySchema (+20 more)

### Community 47 - "responses.adapter.ts"
Cohesion: 0.15
Nodes (23): asToolCallId(), ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi() (+15 more)

### Community 48 - "swagger.setup.ts"
Cohesion: 0.06
Nodes (40): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional (+32 more)

### Community 49 - "ref_nestjs_swagger"
Cohesion: 0.08
Nodes (27): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional (+19 more)

### Community 50 - "company-context.controller.ts"
Cohesion: 0.14
Nodes (14): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+6 more)

### Community 51 - "openai-stream.mapper.ts"
Cohesion: 0.17
Nodes (20): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional (+12 more)

### Community 52 - "UsersController"
Cohesion: 0.13
Nodes (15): PatchUserDto, ApiProperty, IsBoolean, ApiCookieAuth, ApiTags, Body, Controller, Delete (+7 more)

### Community 53 - "rate-limit.module.ts"
Cohesion: 0.22
Nodes (7): AppMetricsModule, Global, Module, RATE_LIMIT_MODULE_OPTIONS, RateLimitModule, RateLimitModuleOptions, Module

### Community 54 - "content.graph.ts"
Cohesion: 0.07
Nodes (54): ContentPipelineFacade, toOutcome(), Inject, Injectable, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema (+46 more)

### Community 56 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 57 - "archive-runs-view.tsx"
Cohesion: 0.05
Nodes (56): metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, PAGE_OUTLINE_ROLE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS (+48 more)

### Community 58 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 59 - "llm-gateway.http.adapter.ts"
Cohesion: 0.09
Nodes (27): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+19 more)

### Community 61 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.05
Nodes (48): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+40 more)

### Community 62 - "HealthService"
Cohesion: 0.13
Nodes (9): HealthReadinessResponseDto, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthService (+1 more)

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.09
Nodes (27): ApiAnthropicErrorResponses(), AnthropicMessagesController, ApiSecurity, ApiTags, Controller, AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse (+19 more)

### Community 65 - "PrismaRefreshSessionAdapter"
Cohesion: 0.31
Nodes (3): RefreshSessionRecord, PrismaRefreshSessionAdapter, Injectable

### Community 69 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 70 - "provider-instances.bootstrap.ts"
Cohesion: 0.17
Nodes (13): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+5 more)

### Community 72 - "EnvelopeError"
Cohesion: 0.15
Nodes (18): resendActivation(), initialState, RegistrationThankYou(), onResend(), RegistrationThankYouProps, RegistrationThankYouState, LANDING_CONTEXT_IMAGES, LANDING_COPY (+10 more)

### Community 73 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (50): AuthModule, Module, CompanyContextModule, Module, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject (+42 more)

### Community 74 - "logging.module.ts"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "http-metrics.interceptor.ts"
Cohesion: 0.07
Nodes (22): PrometheusService, Injectable, PrometheusMetrics, HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE (+14 more)

### Community 77 - "chat-tooling.dto.ts"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 78 - "start-run-form.tsx"
Cohesion: 0.10
Nodes (33): metadata, fetchCompanyContext(), isGuestAllowedTaskType(), isGuestQuotaCode(), fetchRunSnapshot(), startRun(), parseStartRunAccepted(), AccountView() (+25 more)

### Community 79 - "run-result-view.tsx"
Cohesion: 0.05
Nodes (39): buildOutputEditedBody(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload(), RESULT_KEYS_BY_TASK_TYPE (+31 more)

### Community 81 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 82 - "user-invited.template.ts"
Cohesion: 0.18
Nodes (24): UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments(), escapeHtml(), MAIL_PALETTE (+16 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "notify-product.tsx"
Cohesion: 0.20
Nodes (15): assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+7 more)

### Community 85 - "invite-user.use-case.ts"
Cohesion: 0.05
Nodes (47): InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase, Inject (+39 more)

### Community 86 - "GuestGuard"
Cohesion: 0.40
Nodes (3): GuestGuard, Inject, Injectable

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 89 - "ref_nestjs_common"
Cohesion: 0.05
Nodes (54): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, ListUsersUseCase, Injectable, ReactivateUserUseCase, Injectable (+46 more)

### Community 90 - "ref_react"
Cohesion: 0.07
Nodes (37): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+29 more)

### Community 91 - "ModelAlias"
Cohesion: 0.03
Nodes (41): ProviderTestOptions, HttpMetricsMiddleware, Injectable, ModelAlias, ProviderInstanceId, HealthCheckResult, HealthRedisCheckResult, NoopAppMetricsAdapter (+33 more)

### Community 92 - "KeyGeneratorService"
Cohesion: 0.16
Nodes (5): KeyGenerateCommand, Command, Option, KeyGeneratorService, Injectable

### Community 93 - "social.graph.ts"
Cohesion: 0.13
Nodes (34): coercePassNoteVerdict(), isPassOnlyIssue(), contentOutputSchema, ideasOutputSchema, reelIdeasOutputSchema, reelScriptOutputSchema, isReelTaskType(), ReelTaskType (+26 more)

### Community 94 - "CompanyContextController"
Cohesion: 0.13
Nodes (12): toCompanyContext(), toPartialCompanyContext(), CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller (+4 more)

### Community 95 - "provider-registry.service.ts"
Cohesion: 0.07
Nodes (30): buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns(), clamp() (+22 more)

### Community 96 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "create-feedback.use-case.ts"
Cohesion: 0.08
Nodes (25): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+17 more)

### Community 99 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 100 - "start-run.dto.ts"
Cohesion: 0.16
Nodes (14): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+6 more)

### Community 101 - ".info"
Cohesion: 0.15
Nodes (8): toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand, Command, Option, RemoveProviderInput

### Community 102 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 103 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 104 - "openai-models.controller.ts"
Cohesion: 0.12
Nodes (21): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 106 - "ref_class_validator"
Cohesion: 0.04
Nodes (45): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+37 more)

### Community 107 - "api/src/main.ts"
Cohesion: 0.28
Nodes (7): AppModule, Module, bootstrap(), configureHttpApp(), buildSwaggerConfig(), ref_nestjs_pino, ref_reflect_metadata

### Community 108 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 110 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 112 - "src/pagination.ts"
Cohesion: 0.29
Nodes (5): DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, PageSize, PaginatedList

### Community 113 - "CompanyContext"
Cohesion: 0.43
Nodes (6): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, CompanyContext, isComplete(), mergeCompanyContext()

### Community 114 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 115 - "llm-hop.ts"
Cohesion: 0.22
Nodes (11): isRetryable(), RetryReason, ChatJsonInput, hopUserContent(), isHopRetryable(), isStructuredOutputInvalid(), repairSuffix(), extractJsonText() (+3 more)

### Community 117 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 118 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 120 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 123 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "assert-audience-profile-names-unique.ts"
Cohesion: 0.38
Nodes (5): assertAudienceProfileNamesUnique(), normalizeAudienceName(), withEffectiveAudience(), createLoadContextNode(), createLoadContextNode()

### Community 126 - "save-output-edited.use-case.ts"
Cohesion: 0.12
Nodes (18): ratingSchema, assertSameIds(), EMPTY_VERDICT, SaveOutputEditedUseCase, Inject, Injectable, validationFailed(), withCharacterCount() (+10 more)

### Community 127 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 128 - "openai-messages.mapper.ts"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 129 - "PrismaCompanyContextAdapter"
Cohesion: 0.31
Nodes (4): jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 130 - "company-context.schemas.ts"
Cohesion: 0.33
Nodes (5): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema

### Community 131 - "src/index.ts"
Cohesion: 0.33
Nodes (3): unbrand, RunTaskType, RunsSummaryResponse

## Knowledge Gaps
- **499 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+494 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1308 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `isRunId()` connect `ids.ts` to `runs.controller.ts`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `asProviderInstanceId`, `model-manager.service.ts`, `.info`, `models.controller.ts`, `FileManagerService`, `metrics.ts`, `provider-instances.bootstrap.ts`, `GatewayConfig`, `logging.module.ts`, `configuration.types.ts`, `ai-provider.interface.ts`, `cli.module.ts`, `chat.service.ts`, `LoggingService`, `configuration.ts`, `branded.types.ts`, `provider-registry.service.ts`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _499 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04808080808080808 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05364314400458979 - nodes in this community are weakly interconnected._
- **Should `asProviderInstanceId` be split into smaller, more focused modules?**
  _Cohesion score 0.06222832303820636 - nodes in this community are weakly interconnected._
- **Should `model-manager.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0935374149659864 - nodes in this community are weakly interconnected._
# Graph Report - content-chain  (2026-11-16)

## Corpus Check
- 767 files · ~302,601 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 5073 nodes · 16558 edges · 135 communities (122 shown, 10 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 433 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0ec2042e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- create-feedback.use-case.ts
- packages_shared_dist_index
- isRecord
- UserRepository
- cn
- semantic-cache.service.ts
- DomainException
- ModelAlias
- ref_react
- anthropic/anthropic-tools.mapper.ts
- users-view.tsx
- model-manager.service.ts
- exitWithAgentReport
- RunRepository
- jwt-cookie.strategy.ts
- api-error.code.ts
- Env
- ai-provider.interface.ts
- runs.types.ts
- chat.service.ts
- gateway-alive-provider.tsx
- runs-result.types.ts
- configuration.ts
- provider-instances.bootstrap.ts
- llm-hop.ts
- auth.module.ts
- prisma-run.adapter.ts
- PrismaService
- anthropic-response.mapper.ts
- PrometheusAppMetricsAdapter
- google-tools.mapper.ts
- ai-provider-gateway/src/health/health.service.ts
- response-cache.service.ts
- resilient-executor.ts
- provider-registry.service.ts
- guest-run-policy.service.ts
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
- branded.types.ts
- company-context.controller.ts
- ClientRemoveCommand
- GatewayKey
- feedback-form.tsx
- app-metrics-backend.interface.ts
- health.api.ts
- anthropic-messages.controller.ts
- ModelEditCommand
- api/src/health/health.service.ts
- metrics.ts
- sentry-ai-metrics.adapter.ts
- ModelRemoveCommand
- list-runs-query.dto.ts
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
- ChatMessageDto
- logging.service.ts
- parse-verifier-log-message.ts
- ref_nestjs_common
- HitlDto
- start-run-form.tsx
- archive-runs-view.tsx
- GatewayConfig
- get-runs-summary.use-case.ts
- user-invited.template.ts
- SPEC — README
- button.tsx
- UsersController
- assert-company-context-writable.ts
- company-context.dto.ts
- filters/http-exception.filter.ts
- ConfigInitCommand
- EnvironmentVariables
- KeyGenerateCommand
- config-generator.service.ts
- social.graph.ts
- VectorStore
- export-openapi.ts
- HealthController
- route.ts
- CompanyContextController
- ModelAddCommand
- start-run.dto.ts
- PrometheusService
- AuthUserContext
- HealthService
- http/http-exception.filter.ts
- AuthController
- src/index.ts
- ProviderRemoveCommand
- models.controller.ts
- src/pagination.ts
- ClientEditCommand
- CompanyContextRepository
- PublicConfigController
- ProviderEditCommand
- AppMetricsService
- prisma-invitation.adapter.ts
- Architektura
- save-output-edited.use-case.ts
- ProviderAddCommand
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
- load-company-context-fixture.ts

## God Nodes (most connected - your core abstractions)
1. `DomainException` - 95 edges
2. `ModelAlias` - 88 edges
3. `ProviderInstanceId` - 81 edges
4. `Env` - 79 edges
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
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (135 total, 10 thin omitted)

### Community 0 - "create-feedback.use-case.ts"
Cohesion: 0.08
Nodes (25): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+17 more)

### Community 1 - "packages_shared_dist_index"
Cohesion: 0.04
Nodes (54): ContentPipelineInput, ContentPipelineState, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole, VerifierVerdict (+46 more)

### Community 2 - "isRecord"
Cohesion: 0.05
Nodes (84): metadata, fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+76 more)

### Community 3 - "UserRepository"
Cohesion: 0.05
Nodes (28): Inject, Inject, Inject, Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput (+20 more)

### Community 4 - "cn"
Cohesion: 0.04
Nodes (78): ACCEPT_INVITE_DEMO_HINT, deleteOwnAccount(), AcceptInviteFormProps, AcceptInviteFormState, initialState, AccountDeleteForm(), onPurgeConfirm(), onReauthSubmit() (+70 more)

### Community 5 - "semantic-cache.service.ts"
Cohesion: 0.07
Nodes (30): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName() (+22 more)

### Community 6 - "DomainException"
Cohesion: 0.05
Nodes (56): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, ActivateAccountUseCase, Injectable, comparePassword(), generateRefreshToken() (+48 more)

### Community 7 - "ModelAlias"
Cohesion: 0.07
Nodes (4): ModelAlias, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 8 - "ref_react"
Cohesion: 0.08
Nodes (31): apps_frontend_src_app_globals, geistMono, inter, metadata, spaceGrotesk, canEditResult(), finalizeRunReview(), isUserRating() (+23 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (41): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), anthropicModelRejectsSamplingParams(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel (+33 more)

### Community 10 - "users-view.tsx"
Cohesion: 0.08
Nodes (43): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+35 more)

### Community 11 - "model-manager.service.ts"
Cohesion: 0.10
Nodes (28): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), defaultModelPolicy(), ModelEditField, ModelManagerService (+20 more)

### Community 12 - "exitWithAgentReport"
Cohesion: 0.12
Nodes (14): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+6 more)

### Community 13 - "RunRepository"
Cohesion: 0.04
Nodes (21): RunExecutePump, Inject, Injectable, hasPublishLog(), RunLifecycleService, Inject, Injectable, Inject (+13 more)

### Community 14 - "jwt-cookie.strategy.ts"
Cohesion: 0.06
Nodes (23): Inject, MeUseCase, Inject, Injectable, Inject, Inject, EmailChangeRequestRecord, EmailChangeRequestRepository (+15 more)

### Community 15 - "api-error.code.ts"
Cohesion: 0.14
Nodes (23): ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus() (+15 more)

### Community 16 - "Env"
Cohesion: 0.03
Nodes (83): readSmtpConfig(), SmtpConfig, Inject, PublicConfigResponse, AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase (+75 more)

### Community 17 - "ai-provider.interface.ts"
Cohesion: 0.11
Nodes (34): CachedChatResponse, CachedChatWarning, CachedFinishReason, SseMetaPayload, mapStopReasonToFinishReason(), CompleteOnceResult, StreamOnceResult, ProviderResponse (+26 more)

### Community 18 - "runs.types.ts"
Cohesion: 0.05
Nodes (74): metadata, ArchiveRunsQuery, fetchInitiatorOptions(), fetchRunLogs(), fetchRunsSummary(), fetchUserRuns(), UserRunsPageQuery, parseNullableIso() (+66 more)

### Community 19 - "chat.service.ts"
Cohesion: 0.06
Nodes (57): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+49 more)

### Community 20 - "gateway-alive-provider.tsx"
Cohesion: 0.16
Nodes (18): GATE_SECTION_LABELS, CompletenessChip(), useCompleteness(), FALLBACK_ENVELOPE, GatewayAliveContext, GatewayAliveContextValue, GatewayAliveProvider(), GatewayAliveState (+10 more)

### Community 21 - "runs-result.types.ts"
Cohesion: 0.04
Nodes (75): buildOutputEditedBody(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload(), RESULT_KEYS_BY_TASK_TYPE (+67 more)

### Community 22 - "configuration.ts"
Cohesion: 0.06
Nodes (56): CACHE_BACKEND_TYPE, getRedisConsumers(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+48 more)

### Community 23 - "provider-instances.bootstrap.ts"
Cohesion: 0.14
Nodes (16): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+8 more)

### Community 24 - "llm-hop.ts"
Cohesion: 0.07
Nodes (44): ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject, Injectable (+36 more)

### Community 25 - "auth.module.ts"
Cohesion: 0.06
Nodes (62): Inject, ActivateAccountOutput, ActivateAccountInput, activateAccountSchema, BootstrapAdminInput, bootstrapAdminSchema, ChangeMePasswordInput, changeMePasswordSchema (+54 more)

### Community 26 - "prisma-run.adapter.ts"
Cohesion: 0.07
Nodes (34): ListRunsOutput, ListRunsUseCase, Inject, Injectable, LightRunItem, ListLightRunsResult, ListRunsQuery, ListRunsResult (+26 more)

### Community 27 - "PrismaService"
Cohesion: 0.06
Nodes (20): Inject, DeleteUserResult, DeleteUserUseCase, Inject, Injectable, FEEDBACK_PURGE, FeedbackPurgePort, PrismaFeedbackPurgeAdapter (+12 more)

### Community 28 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 29 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (4): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppRequestLabels

### Community 30 - "google-tools.mapper.ts"
Cohesion: 0.13
Nodes (29): mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), getUsageMetadata(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls() (+21 more)

### Community 31 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.11
Nodes (18): RedisConnectionService, Injectable, isRedisRequiredFromConfig(), getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), HealthCheckResult (+10 more)

### Community 32 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 33 - "resilient-executor.ts"
Cohesion: 0.15
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 34 - "provider-registry.service.ts"
Cohesion: 0.19
Nodes (12): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, GatewayCapabilitiesConfig, GatewayParamsConfig, AIProvider (+4 more)

### Community 35 - "guest-run-policy.service.ts"
Cohesion: 0.09
Nodes (20): GUEST_ARCHIVE_STATUSES, GUEST_TASK_TYPES, GuestRunAdmit, isGuestTaskType(), Inject, GUEST_QUOTA, GuestQuotaAdmitResult, GuestQuotaPort (+12 more)

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.15
Nodes (22): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+14 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "content.graph.ts"
Cohesion: 0.10
Nodes (39): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+31 more)

### Community 39 - "redis-vector-store.adapter.ts"
Cohesion: 0.14
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 40 - "anthropic-models.controller.ts"
Cohesion: 0.10
Nodes (25): ApiAnthropicErrorResponses(), AnthropicMessagesController, ApiSecurity, ApiTags, Controller, AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse (+17 more)

### Community 41 - "InvitationsController"
Cohesion: 0.07
Nodes (22): InviteUserUseCase, Inject, Injectable, ListInvitationsUseCase, Inject, Injectable, RevokeInvitationUseCase, Inject (+14 more)

### Community 42 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 43 - "ids.ts"
Cohesion: 0.08
Nodes (36): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createEmailChangeRequestId() (+28 more)

### Community 44 - "wizard-orchestrator.service.ts"
Cohesion: 0.07
Nodes (49): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep (+41 more)

### Community 45 - "openai-models.controller.ts"
Cohesion: 0.12
Nodes (21): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 46 - "LoggingService"
Cohesion: 0.07
Nodes (16): Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, PinoLoggerAdapter, Injectable, LogContext (+8 more)

### Community 47 - "app-metrics.service.ts"
Cohesion: 0.12
Nodes (12): Inject, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get (+4 more)

### Community 48 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (33): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+25 more)

### Community 49 - "branded.types.ts"
Cohesion: 0.07
Nodes (47): ProviderTestCommand, ProviderTestOptions, Command, Option, CliAiModel, CliAiProvider, ServerConfigPromptResult, ProviderTestService (+39 more)

### Community 50 - "company-context.controller.ts"
Cohesion: 0.23
Nodes (12): toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase (+4 more)

### Community 51 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 52 - "GatewayKey"
Cohesion: 0.09
Nodes (19): ChatProviderCooldownService, Injectable, resolveClientIdFromKey(), GatewayKey, ResolvedGatewayClient, SmartRateLimitGuard, Injectable, OpenAiChatCompletionsController (+11 more)

### Community 53 - "feedback-form.tsx"
Cohesion: 0.11
Nodes (26): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+18 more)

### Community 54 - "app-metrics-backend.interface.ts"
Cohesion: 0.15
Nodes (11): healthStatusToGaugeValue(), AppProviderCallContext, AppProviderStreamScope, AppRequestStatus, AppTokenUsage, HealthComponent, HealthMetricsSnapshot, HealthStatus (+3 more)

### Community 55 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 56 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (63): ApiHeader, ChatCacheSource, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity (+55 more)

### Community 57 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 58 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 59 - "metrics.ts"
Cohesion: 0.13
Nodes (22): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns() (+14 more)

### Community 60 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (35): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+27 more)

### Community 61 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 62 - "list-runs-query.dto.ts"
Cohesion: 0.12
Nodes (15): ListRunsQueryDto, IsArray, IsIn, IsOptional, IsString, Transform, PaginationQueryDto, IsIn (+7 more)

### Community 63 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 64 - "start-run.use-case.ts"
Cohesion: 0.07
Nodes (38): GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable, GuestRunPolicyService, Injectable, ResumeHitlUseCase, Inject (+30 more)

### Community 65 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 66 - "asProviderInstanceId"
Cohesion: 0.11
Nodes (31): collectPendingSecrets(), DEFAULT_MODELS, InitAnswers, convertProvider(), ProviderPromptResult, ProviderPromptService, Injectable, ProviderManagerService (+23 more)

### Community 67 - "ref_nestjs_swagger"
Cohesion: 0.04
Nodes (72): ChatOutputTextDto, ApiProperty, ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional (+64 more)

### Community 68 - "apiFetch"
Cohesion: 0.05
Nodes (78): ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), ACTIVATION_FAILED_HINT, acceptInvite(), activateAccount(), bootstrapAdmin(), confirmEmailChange() (+70 more)

### Community 69 - "cli.module.ts"
Cohesion: 0.06
Nodes (65): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), CliModule (+57 more)

### Community 70 - "landing-view.tsx"
Cohesion: 0.27
Nodes (11): LANDING_CONTEXT_IMAGES, LANDING_COPY, LANDING_HERO_IMAGES, LANDING_RUNS_IMAGES, LandingFeature, LandingPersona, LandingStep, LandingTech (+3 more)

### Community 71 - "responses.adapter.ts"
Cohesion: 0.11
Nodes (39): toHttpException(), asSystemFingerprint(), asToolCallId(), ProviderChatInput, ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), buildResponsesCreateParams() (+31 more)

### Community 72 - "openai-stream.mapper.ts"
Cohesion: 0.18
Nodes (20): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+12 more)

### Community 73 - "ChatMessageDto"
Cohesion: 0.16
Nodes (16): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+8 more)

### Community 74 - "logging.service.ts"
Cohesion: 0.07
Nodes (23): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, SentryErrorReportingAdapter, Injectable (+15 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "ref_nestjs_common"
Cohesion: 0.04
Nodes (63): AppModule, Module, CompanyContextModule, Module, ContentModule, Module, LlmModule, Module (+55 more)

### Community 77 - "HitlDto"
Cohesion: 0.50
Nodes (3): HitlDto, IsArray, IsString

### Community 78 - "start-run-form.tsx"
Cohesion: 0.07
Nodes (41): metadata, AcceptInvitePage(), metadata, tokenFromSearchParam(), fetchCompanyContext(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES (+33 more)

### Community 79 - "archive-runs-view.tsx"
Cohesion: 0.05
Nodes (57): metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, PAGE_OUTLINE_ROLE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS (+49 more)

### Community 80 - "GatewayConfig"
Cohesion: 0.09
Nodes (19): PendingSecretsItem, CliRateLimit, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService (+11 more)

### Community 81 - "get-runs-summary.use-case.ts"
Cohesion: 0.19
Nodes (9): CacheEntry, cacheKey(), GetRunsSummaryUseCase, RUNS_SUMMARY_CACHE_TTL_MS, RUNS_SUMMARY_WINDOW_MS, scopeFor(), successRate(), Inject (+1 more)

### Community 82 - "user-invited.template.ts"
Cohesion: 0.18
Nodes (26): EmailChangeConfirmMail, UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments(), escapeHtml() (+18 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "button.tsx"
Cohesion: 0.07
Nodes (50): GUEST_HAS_ACTIVE_RUN, logoutSession(), AccountDeleteFormProps, DeletePhase, AccountEmailFormProps, ModalState, AccountPasswordFormProps, INITIAL (+42 more)

### Community 85 - "UsersController"
Cohesion: 0.08
Nodes (21): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, PatchUserDto, ApiProperty (+13 more)

### Community 86 - "assert-company-context-writable.ts"
Cohesion: 0.32
Nodes (6): assertAudienceProfileNamesUnique(), assertCompanyContextWritable(), isComplete(), normalizeAudienceName(), withEffectiveAudience(), createLoadContextNode()

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 89 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 90 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 91 - "KeyGenerateCommand"
Cohesion: 0.29
Nodes (3): KeyGenerateCommand, Command, Option

### Community 92 - "config-generator.service.ts"
Cohesion: 0.10
Nodes (17): ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable, ConfigGeneratorService, Injectable, FileManagerService (+9 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.11
Nodes (35): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine() (+27 more)

### Community 94 - "VectorStore"
Cohesion: 0.22
Nodes (3): VectorStore, Inject, Optional

### Community 95 - "export-openapi.ts"
Cohesion: 0.12
Nodes (17): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+9 more)

### Community 96 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "CompanyContextController"
Cohesion: 0.13
Nodes (11): toCompanyContext(), toPartialCompanyContext(), CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller (+3 more)

### Community 99 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 100 - "start-run.dto.ts"
Cohesion: 0.16
Nodes (14): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+6 more)

### Community 102 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 103 - "AuthUserContext"
Cohesion: 0.07
Nodes (37): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+29 more)

### Community 104 - "HealthService"
Cohesion: 0.10
Nodes (18): getRedisConsumersFromConfig(), RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty, ApiPropertyOptional (+10 more)

### Community 105 - "http/http-exception.filter.ts"
Cohesion: 0.26
Nodes (4): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId()

### Community 107 - "AuthController"
Cohesion: 0.07
Nodes (43): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+35 more)

### Community 109 - "src/index.ts"
Cohesion: 0.33
Nodes (3): unbrand, RunTaskType, RunsSummaryResponse

### Community 110 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 111 - "models.controller.ts"
Cohesion: 0.08
Nodes (29): ChatModule, Module, ApiGatewayModelsErrorResponses(), AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule (+21 more)

### Community 112 - "src/pagination.ts"
Cohesion: 0.29
Nodes (5): DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, PageSize, PaginatedList

### Community 114 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 115 - "CompanyContextRepository"
Cohesion: 0.13
Nodes (10): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, jsonArray(), jsonRecord() (+2 more)

### Community 116 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 117 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 118 - "AppMetricsService"
Cohesion: 0.10
Nodes (6): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable, HttpMethod, HttpRequestLabels

### Community 122 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 126 - "save-output-edited.use-case.ts"
Cohesion: 0.05
Nodes (53): pageDocumentOutputSchema, ListRunsUserItem, ListRunsUserOutput, ListRunsUserUseCase, Inject, Injectable, contentsArraySchema, editedContentItemSchema (+45 more)

### Community 127 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 129 - "PatchRunRatingDto"
Cohesion: 0.50
Nodes (3): PatchRunRatingDto, IsIn, ValidateIf

### Community 144 - "llm-gateway.http.adapter.ts"
Cohesion: 0.07
Nodes (35): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+27 more)

### Community 146 - "load-company-context-fixture.ts"
Cohesion: 0.10
Nodes (18): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, isEmptyCompanyContext(), audienceProfileSchema, CompanyContextFixture (+10 more)

## Knowledge Gaps
- **525 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+520 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1385 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Env` connect `Env` to `start-run.use-case.ts`, `packages_shared_dist_index`, `UserRepository`, `guest-run-policy.service.ts`, `DomainException`, `content.graph.ts`, `InvitationsController`, `AuthController`, `ref_nestjs_common`, `RunRepository`, `jwt-cookie.strategy.ts`, `llm-gateway.http.adapter.ts`, `load-company-context-fixture.ts`, `PublicConfigController`, `llm-hop.ts`, `auth.module.ts`, `api/src/health/health.service.ts`, `save-output-edited.use-case.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `start-run.use-case.ts`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `branded.types.ts` to `ModelAlias`, `model-manager.service.ts`, `exitWithAgentReport`, `api-error.code.ts`, `ai-provider.interface.ts`, `chat.service.ts`, `configuration.ts`, `PrometheusAppMetricsAdapter`, `provider-registry.service.ts`, `wizard-orchestrator.service.ts`, `LoggingService`, `app-metrics.service.ts`, `GatewayKey`, `app-metrics-backend.interface.ts`, `anthropic-messages.controller.ts`, `metrics.ts`, `sentry-ai-metrics.adapter.ts`, `asProviderInstanceId`, `ref_nestjs_swagger`, `logging.service.ts`, `GatewayConfig`, `config-generator.service.ts`, `AppMetricsService`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _525 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `create-feedback.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08478513356562137 - nodes in this community are weakly interconnected._
- **Should `packages_shared_dist_index` be split into smaller, more focused modules?**
  _Cohesion score 0.04224049331963001 - nodes in this community are weakly interconnected._
- **Should `isRecord` be split into smaller, more focused modules?**
  _Cohesion score 0.045763760049474335 - nodes in this community are weakly interconnected._
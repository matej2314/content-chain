# Graph Report - content-chain  (2026-10-11)

## Corpus Check
- 696 files · ~232,822 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4500 nodes · 13911 edges · 130 communities (116 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 418 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a1b87172`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- prisma-invitation.adapter.ts
- social.types.ts
- api/company-context.types.ts
- anthropic/anthropic-tools.mapper.ts
- gateway-config.schema.ts
- run-details-view.tsx
- provider-error.mapper.ts
- LogContext
- AccountActivationRepository
- cli.module.ts
- api-error.code.ts
- provider-registry.service.ts
- social.graph.ts
- RefreshSessionRepository
- responses.adapter.ts
- ChatParamsDto
- PrometheusAppMetricsAdapter
- LoggingService
- WizardState
- apiFetch
- AuthController
- resilient-executor.ts
- auth.api.ts
- Env
- redis-vector-store.adapter.ts
- feedback-form.tsx
- demo-mode-provider.tsx
- cancel-run-dialog.tsx
- swagger.setup.ts
- config-generator.service.ts
- anthropic.module.ts
- ai-provider-gateway/src/health/health.service.ts
- ai-provider-gateway/src/main.ts
- cache.module.ts
- AnthropicMessagesRequestDto
- anthropic-response.mapper.ts
- runs.types.ts
- enums.ts
- run-result-editor.tsx
- .getOne
- sentry-ai-metrics.adapter.ts
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- GatewayKey
- ConfigInitCommand
- DomainException
- RunRepository
- InMemoryRunSseHub
- configure-swagger.ts
- ListRunsQueryDto
- ModelAlias
- PublicConfigController
- exitWithAgentReport
- llm-hop.ts
- UsersController
- content.graph.ts
- domain/company-context.types.ts
- .execute
- HttpExceptionFilter
- metrics.ts
- RolesGuard
- EnvRef
- app-metrics.service.ts
- api/src/app.module.ts
- ModelRemoveCommand
- ChatToolingDto
- OpenAiChatCompletionRequestDto
- configuration-validation.service.ts
- HealthController
- openai-stream.mapper.ts
- models.controller.ts
- ClientEditCommand
- parse-verifier-log-message.ts
- company-context.mapper.ts
- api/src/health/health.service.ts
- should-include-redis-stack.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- ModelEditCommand
- SPEC — README
- MetricsController
- GatewayConfig
- company-context.dto.ts
- asProviderInstanceId
- ProviderRemoveCommand
- EnvironmentVariables
- anthropic-messages.controller.ts
- KeyGeneratorService
- PrismaService
- StartRunDto
- branded.types.ts
- route.ts
- OpenAiChatMessageDto
- types/index.ts
- CompanyContextController
- save-output-edited.use-case.ts
- ProviderAddCommand
- ProviderEditCommand
- openai-chat-completion-response.dto.ts
- AuthUserContext
- ClientAddCommand
- auth.module.ts
- JwtAuthGuard
- chat.service.ts
- ModelAddCommand
- cn
- patch-company-context.use-case.ts
- company-context.controller.ts
- invitations.controller.ts
- CompanyContext
- ClientRemoveCommand
- AppMetricsService
- Architektura
- brand
- configuration.ts
- health.api.ts
- ai-provider-gateway/src/app.module.ts
- anthropic-models.controller.ts
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
2. `ProviderInstanceId` - 81 edges
3. `DomainException` - 81 edges
4. `LoggingService` - 73 edges
5. `asProviderInstanceId()` - 67 edges
6. `isRecord()` - 66 edges
7. `GatewayConfig` - 65 edges
8. `cn()` - 62 edges
9. `GatewayKey` - 59 edges
10. `Env` - 59 edges

## Surprising Connections (you probably didn't know these)
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (130 total, 13 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.13
Nodes (19): Inject, InvitationListItem, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, INVITATION_REPOSITORY, InvitationListRecord (+11 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (26): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore (+18 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.05
Nodes (82): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+74 more)

### Community 3 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.06
Nodes (69): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens() (+61 more)

### Community 4 - "gateway-config.schema.ts"
Cohesion: 0.10
Nodes (39): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+31 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.07
Nodes (50): metadata, metadata, metadata, useSession(), isGuestAllowedTaskType(), isGuestQuotaCode(), useGuestLocked(), CONTENT_KIND_LABELS (+42 more)

### Community 6 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 7 - "LogContext"
Cohesion: 0.05
Nodes (29): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable, ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter (+21 more)

### Community 8 - "AccountActivationRepository"
Cohesion: 0.11
Nodes (9): Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput, ActivationRow, PrismaAccountActivationAdapter, Injectable (+1 more)

### Community 9 - "cli.module.ts"
Cohesion: 0.06
Nodes (61): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), CliModule (+53 more)

### Community 10 - "api-error.code.ts"
Cohesion: 0.10
Nodes (24): ApiErrorCode, ApiErrorPayload, getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey() (+16 more)

### Community 11 - "provider-registry.service.ts"
Cohesion: 0.10
Nodes (21): UnsupportedProviderException, GatewayCapabilitiesConfig, GatewayModelConfig, GatewayParamsConfig, GatewayProviderInstanceConfig, adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore() (+13 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.09
Nodes (48): loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput, IdeasOutput, ideasOutputSchema (+40 more)

### Community 13 - "RefreshSessionRepository"
Cohesion: 0.11
Nodes (8): Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 14 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (65): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, toHttpException(), asSystemFingerprint(), asToolCallId(), asWarningCode(), ProviderAssistantTurn, ProviderChatTurn (+57 more)

### Community 15 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 16 - "PrometheusAppMetricsAdapter"
Cohesion: 0.10
Nodes (7): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope, AppRequestLabels, AppTokenUsage

### Community 17 - "LoggingService"
Cohesion: 0.05
Nodes (37): RedisConnectionService, Injectable, computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Inject, Injectable (+29 more)

### Community 18 - "WizardState"
Cohesion: 0.24
Nodes (8): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, WizardState, Injectable, WizardOrchestratorService, Injectable, WizardStateManager

### Community 19 - "apiFetch"
Cohesion: 0.09
Nodes (41): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+33 more)

### Community 20 - "AuthController"
Cohesion: 0.06
Nodes (40): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+32 more)

### Community 21 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 22 - "auth.api.ts"
Cohesion: 0.05
Nodes (70): AcceptInvitePage(), metadata, tokenFromSearchParam(), geistMono, geistSans, metadata, ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT (+62 more)

### Community 23 - "Env"
Cohesion: 0.04
Nodes (48): InviteUserResult, inviteUserSchema, Inject, Inject, Inject, TRANSACTIONAL_MAILER, TransactionalMail, TransactionalMailer (+40 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.07
Nodes (29): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, EmbeddingCircuitBreaker, escapeRedisSearchTag(), normalizeEmbeddingModelForIndex(), semanticIndexName() (+21 more)

### Community 25 - "feedback-form.tsx"
Cohesion: 0.23
Nodes (13): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+5 more)

### Community 26 - "demo-mode-provider.tsx"
Cohesion: 0.20
Nodes (11): fetchAppConfig(), AppConfig, parseAppConfig(), DemoChip(), DemoModeContext, DemoModeContextValue, DemoModeProvider(), DemoModeState (+3 more)

### Community 27 - "cancel-run-dialog.tsx"
Cohesion: 0.06
Nodes (43): logoutSession(), GuestLimitModal(), GuestLimitModalProps, GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact (+35 more)

### Community 28 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (24): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+16 more)

### Community 29 - "config-generator.service.ts"
Cohesion: 0.14
Nodes (12): ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, ClientCli, EnvTemplateInput, generateEnvTemplate() (+4 more)

### Community 30 - "anthropic.module.ts"
Cohesion: 0.21
Nodes (10): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+2 more)

### Community 31 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.09
Nodes (21): EMBEDDING_BACKEND, VECTOR_STORE, RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto (+13 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.14
Nodes (14): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+6 more)

### Community 33 - "cache.module.ts"
Cohesion: 0.09
Nodes (20): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+12 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (25): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+17 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.05
Nodes (84): filterFeedbackRunOptions(), ArchiveRunsQuery, fetchUserRuns(), InitiatorOption, HitlAccepted, isPageOutlineSectionRole(), isReelDuration(), PageOutlineSection (+76 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "run-result-editor.tsx"
Cohesion: 0.04
Nodes (66): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+58 more)

### Community 39 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.11
Nodes (27): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+19 more)

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.07
Nodes (19): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, RunRecordBase, ALLOWED_RUN_STATES, assertTransition(), CANCELABLE_RUN_STATUSES (+11 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "GatewayKey"
Cohesion: 0.09
Nodes (21): ChatService, Injectable, ChatErrorHandlerService, Injectable, ChatExecutionContext, ChatIngressProfile, isProviderRateLimitError(), resolveClientIdFromKey() (+13 more)

### Community 45 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 46 - "DomainException"
Cohesion: 0.06
Nodes (51): AcceptInviteResult, acceptInviteSchema, ActivateAccountOutput, ActivateAccountUseCase, Injectable, comparePassword(), generateRefreshToken(), hashPassword() (+43 more)

### Community 47 - "RunRepository"
Cohesion: 0.03
Nodes (78): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject (+70 more)

### Community 48 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 49 - "configure-swagger.ts"
Cohesion: 0.27
Nodes (7): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), ACCESS_COOKIE_NAME, buildSwaggerConfig()

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.07
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 52 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 53 - "exitWithAgentReport"
Cohesion: 0.20
Nodes (8): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList()

### Community 54 - "llm-hop.ts"
Cohesion: 0.19
Nodes (13): LLM_GATEWAY_PORT, isRetryable(), RetryReason, isAbortError(), ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable() (+5 more)

### Community 55 - "UsersController"
Cohesion: 0.12
Nodes (15): PatchUserDto, ApiProperty, IsBoolean, ApiCookieAuth, ApiTags, Body, Controller, Delete (+7 more)

### Community 56 - "content.graph.ts"
Cohesion: 0.07
Nodes (50): CompanyContextRepository, ContentPipelineFacade, toOutcome(), Inject, Injectable, Inject, pageOutlineOutputSchema, ContentResultStore (+42 more)

### Community 57 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 58 - ".execute"
Cohesion: 0.12
Nodes (15): isGuestTaskType(), isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot (+7 more)

### Community 60 - "metrics.ts"
Cohesion: 0.08
Nodes (35): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+27 more)

### Community 62 - "EnvRef"
Cohesion: 0.12
Nodes (16): ProviderTestCommand, Command, Option, CliAiProvider, EnvPatchService, EnvPatchValue, Injectable, ProviderTestService (+8 more)

### Community 63 - "app-metrics.service.ts"
Cohesion: 0.13
Nodes (15): healthStatusToGaugeValue(), APP_METRICS_BACKEND, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+7 more)

### Community 64 - "api/src/app.module.ts"
Cohesion: 0.05
Nodes (47): AuthModule, Module, CompanyContextModule, Module, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Injectable (+39 more)

### Community 65 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 66 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (19): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+11 more)

### Community 69 - "configuration-validation.service.ts"
Cohesion: 0.12
Nodes (22): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, buildEffectiveGatewayConfig(), assertEnabledProviderSecretsPresent() (+14 more)

### Community 70 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 72 - "openai-stream.mapper.ts"
Cohesion: 0.33
Nodes (11): mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields(), buildToolCallsDelta(), chunkLine() (+3 more)

### Community 73 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 74 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (39): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+31 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 82 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 86 - "GatewayConfig"
Cohesion: 0.05
Nodes (41): DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), ClientManagerService, Injectable (+33 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "asProviderInstanceId"
Cohesion: 0.08
Nodes (47): PendingSecretsItem, assertInteractiveAllowed(), collectPendingSecrets(), InitAnswers, convertProvider(), ClientPromptService, Injectable, KeyPromptService (+39 more)

### Community 89 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 90 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 92 - "anthropic-messages.controller.ts"
Cohesion: 0.03
Nodes (69): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+61 more)

### Community 93 - "KeyGeneratorService"
Cohesion: 0.17
Nodes (5): KeyGenerateCommand, Command, Option, KeyGeneratorService, Injectable

### Community 94 - "PrismaService"
Cohesion: 0.04
Nodes (41): Inject, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_PURGE (+33 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "branded.types.ts"
Cohesion: 0.10
Nodes (44): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, toChatResponseDto(), SseMetaPayload, SseMetaPayloadDto (+36 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "OpenAiChatMessageDto"
Cohesion: 0.16
Nodes (12): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+4 more)

### Community 99 - "types/index.ts"
Cohesion: 0.14
Nodes (26): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+18 more)

### Community 100 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 101 - "save-output-edited.use-case.ts"
Cohesion: 0.07
Nodes (33): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+25 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 105 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 106 - "AuthUserContext"
Cohesion: 0.09
Nodes (28): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+20 more)

### Community 107 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 108 - "auth.module.ts"
Cohesion: 0.05
Nodes (53): AcceptInviteUseCase, Injectable, BootstrapStatusUseCase, Inject, Injectable, DeleteUserResult, DeleteUserUseCase, Injectable (+45 more)

### Community 110 - "chat.service.ts"
Cohesion: 0.07
Nodes (43): SemanticStoreEmbedState, CacheIdentityMessage, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+35 more)

### Community 111 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.05
Nodes (47): AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps, DashboardShell(), EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry() (+39 more)

### Community 115 - "patch-company-context.use-case.ts"
Cohesion: 0.44
Nodes (5): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 117 - "company-context.controller.ts"
Cohesion: 0.16
Nodes (13): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+5 more)

### Community 118 - "invitations.controller.ts"
Cohesion: 0.07
Nodes (25): InviteUserUseCase, Injectable, ListInvitationsUseCase, Inject, Injectable, ResendInvitationUseCase, Injectable, RevokeInvitationUseCase (+17 more)

### Community 121 - "CompanyContext"
Cohesion: 0.29
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 122 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 123 - "AppMetricsService"
Cohesion: 0.10
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 126 - "configuration.ts"
Cohesion: 0.12
Nodes (19): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration(), BuildEffectiveGatewayConfigOptions (+11 more)

### Community 127 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 128 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.10
Nodes (19): HealthModule, Module, AiMetricsModule, Global, Module, ObservabilityModule, Global, Module (+11 more)

### Community 129 - "anthropic-models.controller.ts"
Cohesion: 0.23
Nodes (11): AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic(), mapGatewayModelToAnthropic() (+3 more)

## Knowledge Gaps
- **431 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+426 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1206 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `branded.types.ts`, `types/index.ts`, `gateway-config.schema.ts`, `sentry-ai-metrics.adapter.ts`, `models.controller.ts`, `api-error.code.ts`, `provider-registry.service.ts`, `GatewayKey`, `chat.service.ts`, `PrometheusAppMetricsAdapter`, `LoggingService`, `resilient-executor.ts`, `GatewayConfig`, `AppMetricsService`, `metrics.ts`, `config-generator.service.ts`, `EnvRef`, `app-metrics.service.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `gateway-config.schema.ts`, `LogContext`, `provider-registry.service.ts`, `PrometheusAppMetricsAdapter`, `config-generator.service.ts`, `sentry-ai-metrics.adapter.ts`, `GatewayKey`, `exitWithAgentReport`, `metrics.ts`, `EnvRef`, `app-metrics.service.ts`, `configuration-validation.service.ts`, `models.controller.ts`, `GatewayConfig`, `asProviderInstanceId`, `branded.types.ts`, `types/index.ts`, `AppMetricsService`, `configuration.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `RunRepository`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _431 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `prisma-invitation.adapter.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1265597147950089 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05709507883420927 - nodes in this community are weakly interconnected._
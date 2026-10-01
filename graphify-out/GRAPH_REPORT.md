# Graph Report - content-chain  (2026-10-01)

## Corpus Check
- 648 files · ~196,567 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4179 nodes · 12920 edges · 137 communities (119 shown, 17 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 400 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1b2efe8d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- invite-user.use-case.ts
- social.types.ts
- api/company-context.types.ts
- cli.module.ts
- dashboard-shell.tsx
- run-details-view.tsx
- PrometheusAppMetricsAdapter
- LogContext
- anthropic/anthropic-tools.mapper.ts
- .info
- cancel-run-dialog.tsx
- wizard-orchestrator.service.ts
- social.graph.ts
- branded.types.ts
- run-result-view.tsx
- HttpMetricsMiddleware
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- AuthUserContext
- llm-hop.ts
- sentry-ai-metrics.adapter.ts
- configuration.ts
- ConfigInitCommand
- config-generator.service.ts
- FileManagerService
- chat-provider-call.service.ts
- LoggingService
- start-run.use-case.ts
- SemanticCacheService
- app-metrics.service.ts
- users.controller.ts
- HealthService
- ai-provider-gateway/src/main.ts
- config-validator.ts
- AnthropicMessagesRequestDto
- run-result-editor.tsx
- runs.types.ts
- enums.ts
- feedback-form.tsx
- auth.module.ts
- HttpExceptionFilter
- run.types.ts
- openai-models.controller.ts
- ids.ts
- types/index.ts
- model-manager.service.ts
- getAppConfig
- anthropic-models.controller.ts
- ai-provider-gateway/src/health/health.service.ts
- chat-params.dto.ts
- ListRunsQueryDto
- ModelAlias
- CompanyContext
- openai-params-provider.mapper.ts
- users-view.tsx
- .chat
- content.graph.ts
- anthropic-messages.controller.ts
- HealthController
- responses.adapter.ts
- models.controller.ts
- company-context.dto.ts
- should-include-redis-stack.ts
- response-cache.service.ts
- asProviderInstanceId
- InvitationsController
- swagger.setup.ts
- provider-instances.bootstrap.ts
- OpenAiChatCompletionRequestDto
- DomainException
- company-context.mapper.ts
- RunRepository
- NoopAppMetricsAdapter
- http-metrics.interceptor.ts
- InProcessRunWorker
- parse-verifier-log-message.ts
- UserRepository
- metrics.module.ts
- CompanyContextRepository
- llm-gateway.http.adapter.ts
- PrometheusService
- GatewayKey
- openai-chat-completions.controller.ts
- SPEC — README
- ChatParamsDto
- api/src/app.module.ts
- OpenAiChatMessageDto
- gateway-config.schema.ts
- EnvironmentVariables
- provider-base-url.validation.ts
- InMemoryRunSseHub
- StartRunDto
- public.decorator.ts
- provider-error.mapper.ts
- ClientEditCommand
- ModelAddCommand
- chat-stream.controller.ts
- route.ts
- KeyGenerateCommand
- ModelEditCommand
- ClientRemoveCommand
- create-feedback.use-case.ts
- ProviderEditCommand
- ProviderAddCommand
- PrismaService
- ProviderRemoveCommand
- api/src/main.ts
- ClientAddCommand
- GlobalExceptionFilter
- openai-chat-message.dto.ts
- chat.service.ts
- semantic-cache.service.ts
- ModelRemoveCommand
- openai-chat-completion-request.dto.ts
- cn
- configuration-validation.service.ts
- RunsModule
- domain/company-context.types.ts
- PrismaRefreshSessionAdapter
- CompanyContextController
- app-metrics.module.ts
- RolesGuard
- ai-provider-gateway/src/app.module.ts
- Architektura
- brand.ts
- app-configuration.types.ts
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
3. `LoggingService` - 73 edges
4. `DomainException` - 70 edges
5. `asProviderInstanceId()` - 67 edges
6. `GatewayConfig` - 65 edges
7. `cn()` - 62 edges
8. `isRecord()` - 60 edges
9. `GatewayKey` - 59 edges
10. `ClientId` - 54 edges

## Surprising Connections (you probably didn't know these)
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --implements--> `CacheBackend`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/cache/interfaces/cache-backend-interface.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (137 total, 17 thin omitted)

### Community 0 - "invite-user.use-case.ts"
Cohesion: 0.08
Nodes (30): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, Inject (+22 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (29): PageOutline, CompositeRunResultReader, GetRunOutput, OUTPUT_EDITED_WRITER, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable (+21 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.05
Nodes (69): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+61 more)

### Community 3 - "cli.module.ts"
Cohesion: 0.06
Nodes (64): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), CliMode, CliModeFlags, markAgentRuntime() (+56 more)

### Community 4 - "dashboard-shell.tsx"
Cohesion: 0.13
Nodes (14): AgentsGateTooltip(), AppHeader(), FloatingBoxSlot(), DashboardShell(), EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry (+6 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.06
Nodes (49): metadata, metadata, metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS (+41 more)

### Community 6 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (4): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppTokenUsage

### Community 7 - "LogContext"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.11
Nodes (35): ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic(), resolveAnthropicOutputConfig(), ContentBlockParam (+27 more)

### Community 9 - ".info"
Cohesion: 0.10
Nodes (16): loadAnswers(), assertAgentHasAnswers(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand, Command (+8 more)

### Community 10 - "cancel-run-dialog.tsx"
Cohesion: 0.10
Nodes (31): CompletenessChip(), FeedbackCta(), assertNever(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput (+23 more)

### Community 11 - "wizard-orchestrator.service.ts"
Cohesion: 0.09
Nodes (28): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, GatewayClientSchema (+20 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.09
Nodes (48): coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput, contentOutputSchema, IdeasOutput, ideasOutputSchema, isPlainRecord() (+40 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.11
Nodes (36): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, mapStopReasonToFinishReason() (+28 more)

### Community 14 - "run-result-view.tsx"
Cohesion: 0.06
Nodes (41): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+33 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.11
Nodes (21): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+13 more)

### Community 18 - "AuthUserContext"
Cohesion: 0.08
Nodes (27): ApiCookieAuth, Get, Patch, InviteUserDto, ApiProperty, IsEmail, isTerminalStatus(), RunsController (+19 more)

### Community 19 - "llm-hop.ts"
Cohesion: 0.19
Nodes (13): LLM_GATEWAY_PORT, isRetryable(), RetryReason, isAbortError(), ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable() (+5 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (33): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+25 more)

### Community 21 - "configuration.ts"
Cohesion: 0.22
Nodes (14): asSemanticCacheTtlSeconds(), buildAppConfiguration(), buildEffectiveGatewayConfig(), BuildEffectiveGatewayConfigOptions, buildGatewayKeyRuntime(), readRequiredPrompt(), stripHtmlComments(), tryReadOptionalPrompts() (+6 more)

### Community 22 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 23 - "config-generator.service.ts"
Cohesion: 0.14
Nodes (14): ProviderTestService, Injectable, WizardRunResult, ClientCli, EnvTemplateInput, generateEnvTemplate(), isEnvInputRedisRequired(), ProviderCli (+6 more)

### Community 24 - "FileManagerService"
Cohesion: 0.13
Nodes (6): ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, FileManagerService, Injectable, ValidationFormatter

### Community 25 - "chat-provider-call.service.ts"
Cohesion: 0.08
Nodes (39): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias() (+31 more)

### Community 26 - "LoggingService"
Cohesion: 0.09
Nodes (13): RedisCacheAdapter, Injectable, RedisConnectionService, Injectable, Inject, Inject, isRedisRequiredFromConfig(), Inject (+5 more)

### Community 27 - "start-run.use-case.ts"
Cohesion: 0.09
Nodes (26): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+18 more)

### Community 28 - "SemanticCacheService"
Cohesion: 0.16
Nodes (12): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), SemanticCacheService (+4 more)

### Community 29 - "app-metrics.service.ts"
Cohesion: 0.20
Nodes (13): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus (+5 more)

### Community 30 - "users.controller.ts"
Cohesion: 0.09
Nodes (20): ListUsersUseCase, Inject, Injectable, SoftDeleteUserUseCase, Inject, Injectable, PatchUserDto, ApiProperty (+12 more)

### Community 31 - "HealthService"
Cohesion: 0.10
Nodes (13): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+5 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "config-validator.ts"
Cohesion: 0.35
Nodes (8): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, assertMasterKeyPresent(), validateEnvironment()

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "run-result-editor.tsx"
Cohesion: 0.10
Nodes (25): metadata, acceptInvite(), AcceptInviteForm(), onSubmit(), AcceptInviteFormProps, passwordMeetsPolicy(), PAGE_OUTLINE_SECTION_ROLES, PageOutlineSectionRole (+17 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.05
Nodes (90): ArchiveRunsQuery, fetchUserRuns(), finalizeRunReview(), InitiatorOption, isUserRating(), patchRunRating(), HitlAccepted, isPageOutlineSectionRole() (+82 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.19
Nodes (16): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+8 more)

### Community 39 - "auth.module.ts"
Cohesion: 0.04
Nodes (66): comparePassword(), generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), AuthTokenResult, BootstrapAdminUseCase, Inject (+58 more)

### Community 41 - "run.types.ts"
Cohesion: 0.07
Nodes (22): TransitionExtras, LightRunItem, ListRunsResult, RunSnapshot, RUN_SSE_HUB, RunLogEntry, RunRecordBase, SocialRunRecord (+14 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.10
Nodes (25): ApiOpenAiErrorResponses(), OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse (+17 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "types/index.ts"
Cohesion: 0.08
Nodes (44): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+36 more)

### Community 45 - "model-manager.service.ts"
Cohesion: 0.09
Nodes (34): isRedisSearchTagSafeId(), DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), defaultModelPolicy() (+26 more)

### Community 46 - "getAppConfig"
Cohesion: 0.18
Nodes (11): getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable, OpenAiBearerAuthGuard (+3 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.10
Nodes (25): ApiAnthropicErrorResponses(), AnthropicMessagesController, ApiSecurity, ApiTags, Controller, AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse (+17 more)

### Community 48 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.24
Nodes (11): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+3 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.07
Nodes (7): ProviderTestOptions, ModelAlias, ProviderInstanceId, AppMetricsService, Inject, Injectable, AppMetricsBackend

### Community 52 - "CompanyContext"
Cohesion: 0.23
Nodes (6): CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 53 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 54 - "users-view.tsx"
Cohesion: 0.06
Nodes (58): metadata, geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession() (+50 more)

### Community 55 - ".chat"
Cohesion: 0.21
Nodes (5): LlmGatewayHttpAdapter, Inject, Injectable, GATEWAY_ERROR_CODE_LABELS, toGatewayErrorCodeLabel()

### Community 56 - "content.graph.ts"
Cohesion: 0.07
Nodes (49): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+41 more)

### Community 57 - "anthropic-messages.controller.ts"
Cohesion: 0.14
Nodes (17): ApiErrorCode, ApiErrorPayload, ToolCallId, ANTHROPIC_STREAM_API_DESCRIPTION, mapAnthropicRequestToGateway(), AnthropicTool, mapAnthropicContentBlockToGateway(), mapAnthropicToolChoice() (+9 more)

### Community 58 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 59 - "responses.adapter.ts"
Cohesion: 0.07
Nodes (63): toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), getUsageMetadata(), buildGenerationConfig() (+55 more)

### Community 60 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "should-include-redis-stack.ts"
Cohesion: 0.35
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 63 - "response-cache.service.ts"
Cohesion: 0.11
Nodes (16): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheModule, Module, CacheModule, CacheModuleOptions (+8 more)

### Community 64 - "asProviderInstanceId"
Cohesion: 0.09
Nodes (37): assertInteractiveAllowed(), collectPendingSecrets(), convertProvider(), CliAiProvider, ProviderPromptResult, ProviderPromptService, Injectable, ProviderManagerService (+29 more)

### Community 65 - "InvitationsController"
Cohesion: 0.09
Nodes (18): ListInvitationsUseCase, Inject, Injectable, ResendInvitationUseCase, Injectable, RevokeInvitationUseCase, Inject, Injectable (+10 more)

### Community 66 - "swagger.setup.ts"
Cohesion: 0.05
Nodes (52): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+44 more)

### Community 67 - "provider-instances.bootstrap.ts"
Cohesion: 0.11
Nodes (17): GatewayProviderInstanceConfig, adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, FACTORIES (+9 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "DomainException"
Cohesion: 0.06
Nodes (45): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, hashPassword(), BootstrapAdminInput, bootstrapAdminSchema, LoginInput (+37 more)

### Community 70 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 71 - "RunRepository"
Cohesion: 0.03
Nodes (62): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase (+54 more)

### Community 73 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 74 - "InProcessRunWorker"
Cohesion: 0.12
Nodes (5): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, InProcessRunWorker, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "UserRepository"
Cohesion: 0.08
Nodes (18): Inject, MeUseCase, Inject, Injectable, Inject, Inject, AuthUser, JwtPayload (+10 more)

### Community 77 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 78 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (19): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+11 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.19
Nodes (16): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+8 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "GatewayKey"
Cohesion: 0.12
Nodes (13): isProviderRateLimitError(), StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), GatewayKey, ResolvedGatewayClient (+5 more)

### Community 82 - "openai-chat-completions.controller.ts"
Cohesion: 0.09
Nodes (33): ChatCacheSource, GATEWAY_CACHE_HEADER, SseMetaPayload, SseMetaPayloadDto, ApiProperty, ApiPropertyOptional, SseDeltaEvent, SseFinishReason (+25 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 85 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (50): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome() (+42 more)

### Community 86 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 87 - "gateway-config.schema.ts"
Cohesion: 0.08
Nodes (36): REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, PendingSecretsItem, convertClient(), convertRateLimit(), CliRateLimit, GatewayClient (+28 more)

### Community 88 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 89 - "provider-base-url.validation.ts"
Cohesion: 0.43
Nodes (6): assertEnabledProviderBaseUrlPresent(), collectMissingBaseUrlErrors(), formatMissingBaseUrlError(), MissingProviderBaseUrl, RawGatewayConfig, resolveBaseUrlFromEnv()

### Community 90 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 91 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 92 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 93 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 94 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 95 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 96 - "chat-stream.controller.ts"
Cohesion: 0.04
Nodes (54): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+46 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "KeyGenerateCommand"
Cohesion: 0.27
Nodes (3): KeyGenerateCommand, Command, Option

### Community 99 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 100 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 101 - "create-feedback.use-case.ts"
Cohesion: 0.07
Nodes (32): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+24 more)

### Community 102 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "PrismaService"
Cohesion: 0.10
Nodes (11): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable, PrismaModule, Global (+3 more)

### Community 105 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 106 - "api/src/main.ts"
Cohesion: 0.60
Nodes (4): bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig()

### Community 107 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 108 - "GlobalExceptionFilter"
Cohesion: 0.38
Nodes (3): GlobalExceptionFilter, Catch, Injectable

### Community 109 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 110 - "chat.service.ts"
Cohesion: 0.06
Nodes (58): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+50 more)

### Community 111 - "semantic-cache.service.ts"
Cohesion: 0.08
Nodes (22): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema() (+14 more)

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.07
Nodes (37): AppHeaderProps, AppSidebar(), AppSidebarProps, APP_NAV, AppNavItem, navItemsForRole(), CardAction(), CardDescription() (+29 more)

### Community 115 - "configuration-validation.service.ts"
Cohesion: 0.16
Nodes (7): CACHE_BACKEND_TYPE, configurationValidation, ConfigurationValidationService, CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment, RawGatewayConfig

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.19
Nodes (17): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+9 more)

### Community 118 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 121 - "app-metrics.module.ts"
Cohesion: 0.10
Nodes (15): AppMetricsModule, resolveAppMetricsBackend(), Global, Module, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse (+7 more)

### Community 123 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.15
Nodes (14): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+6 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 127 - "app-configuration.types.ts"
Cohesion: 0.17
Nodes (8): AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, ProviderInstanceRuntime, GatewayKeyRuntimeConfig, _badRuntimeConfig

## Knowledge Gaps
- **380 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+375 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1107 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `asProviderInstanceId`, `PrometheusAppMetricsAdapter`, `NoopAppMetricsAdapter`, `wizard-orchestrator.service.ts`, `types/index.ts`, `branded.types.ts`, `chat.service.ts`, `model-manager.service.ts`, `redis-vector-store.adapter.ts`, `openai-chat-completions.controller.ts`, `config-generator.service.ts`, `sentry-ai-metrics.adapter.ts`, `gateway-config.schema.ts`, `chat-provider-call.service.ts`, `models.controller.ts`, `app-metrics.service.ts`, `anthropic-messages.controller.ts`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `cli.module.ts`, `PrometheusAppMetricsAdapter`, `LogContext`, `.info`, `wizard-orchestrator.service.ts`, `branded.types.ts`, `sentry-ai-metrics.adapter.ts`, `config-generator.service.ts`, `chat-provider-call.service.ts`, `app-metrics.service.ts`, `types/index.ts`, `model-manager.service.ts`, `models.controller.ts`, `asProviderInstanceId`, `NoopAppMetricsAdapter`, `openai-chat-completions.controller.ts`, `gateway-config.schema.ts`, `provider-base-url.validation.ts`, `chat.service.ts`, `app-configuration.types.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `chat-stream.controller.ts`, `ai-provider-gateway/src/main.ts`, `swagger.setup.ts`, `provider-instances.bootstrap.ts`, `LogContext`, `anthropic/anthropic-tools.mapper.ts`, `types/index.ts`, `GlobalExceptionFilter`, `chat.service.ts`, `semantic-cache.service.ts`, `ai-provider-gateway/src/health/health.service.ts`, `redis-vector-store.adapter.ts`, `GatewayKey`, `HealthService`, `chat-provider-call.service.ts`, `responses.adapter.ts`, `SemanticCacheService`, `response-cache.service.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _380 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `invite-user.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07617051013277429 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05280875236692615 - nodes in this community are weakly interconnected._
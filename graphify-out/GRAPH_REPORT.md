# Graph Report - content-chain  (2026-09-30)

## Corpus Check
- 641 files · ~192,249 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4152 nodes · 12803 edges · 124 communities (111 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 399 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ba03bdcd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- prisma-invitation.adapter.ts
- social.types.ts
- api/company-context.types.ts
- asModelAlias
- runs.types.ts
- start-run-form.tsx
- ModelAlias
- LogContext
- anthropic/anthropic-tools.mapper.ts
- ai-provider-gateway/src/app.module.ts
- responses.adapter.ts
- invitations.controller.ts
- social.graph.ts
- branded.types.ts
- DomainException
- models.controller.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- AuthUserContext
- api/src/app.module.ts
- sentry-ai-metrics.adapter.ts
- GatewayKey
- config-generator.service.ts
- RolesGuard
- run.types.ts
- openai-params-provider.mapper.ts
- RunRepository
- start-run.use-case.ts
- save-output-edited.use-case.ts
- configure-swagger.ts
- UsersController
- HealthService
- swagger.setup.ts
- provider-instances.bootstrap.ts
- AnthropicMessagesRequestDto
- runs-result.types.ts
- dashboard-shell.tsx
- enums.ts
- feedback-form.tsx
- AuthController
- new-ids.ts
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- runs.controller.ts
- model-manager.service.ts
- getAppConfig
- anthropic-models.controller.ts
- health-readiness-response.dto.ts
- ChatParamsDto
- ListRunsQueryDto
- cli.module.ts
- types/index.ts
- .create
- isRecord
- TransactionalMailer
- content.graph.ts
- RunRecord
- .completions
- HealthController
- http-metrics.interceptor.ts
- company-context.dto.ts
- should-include-redis-stack.ts
- cache.module.ts
- asProviderInstanceId
- auth.module.ts
- metrics.ts
- metrics.module.ts
- OpenAiChatCompletionRequestDto
- PrismaRefreshSessionAdapter
- company-context.mapper.ts
- PrismaService
- prisma.feedback-run-reader.adapter.ts
- toInputJson
- EnvRef
- parse-verifier-log-message.ts
- UserRepository
- auth.schemas.ts
- CompanyContextRepository
- llm-gateway.http.adapter.ts
- PrometheusService
- resolve-provider-call-options.ts
- SPEC — README
- configuration.ts
- llm-hop.ts
- MetricsController
- GatewayConfig
- EnvironmentVariables
- users-view.tsx
- InMemoryRunSseHub
- StartRunDto
- public.decorator.ts
- provider-error.mapper.ts
- .createMessage
- anthropic-messages.controller.ts
- route.ts
- KeyGenerateCommand
- ProviderAddCommand
- create-feedback.use-case.ts
- AppMetricsModule
- ProviderEditCommand
- CompanyContext
- ProviderRemoveCommand
- ApiRequestIdHeader
- chat.service.ts
- semantic-cache.service.ts
- ConfigValidateCommand
- cn
- domain/company-context.types.ts
- CompanyContextController
- ClientEditCommand
- Architektura
- brand.ts
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
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `ProviderTestOptions` --references--> `ProviderInstanceId`  [EXTRACTED]
  apps/ai-provider-gateway/src/cli/commands/provider/provider-test.command.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (124 total, 12 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.13
Nodes (19): Inject, InvitationListItem, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, INVITATION_REPOSITORY, InvitationListRecord (+11 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (31): PageDocument, VerifierVerdict, CompositeRunResultReader, GetRunOutput, orderItemsBySelectedIds(), OUTPUT_EDITED_WRITER, RUN_RESULT_READER, RunResultReader (+23 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (63): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+55 more)

### Community 3 - "asModelAlias"
Cohesion: 0.10
Nodes (19): toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand, Command, Option, defaultModelPolicy() (+11 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.05
Nodes (78): metadata, useSession(), filterFeedbackRunOptions(), canEditResult(), ArchiveRunsQuery, fetchRunLogs(), fetchRunSnapshot(), fetchUserRuns() (+70 more)

### Community 5 - "start-run-form.tsx"
Cohesion: 0.07
Nodes (41): metadata, metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS (+33 more)

### Community 6 - "ModelAlias"
Cohesion: 0.04
Nodes (38): CliAiModel, AddModelInput, HttpMetricsMiddleware, Injectable, ClientId, ModelAlias, ProviderInstanceId, Express (+30 more)

### Community 7 - "LogContext"
Cohesion: 0.05
Nodes (29): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable, ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter (+21 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (40): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+32 more)

### Community 9 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.10
Nodes (19): CacheModule, Module, ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module (+11 more)

### Community 10 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (70): mapProviderResponseToAiObservation(), toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), buildGenerationConfig() (+62 more)

### Community 11 - "invitations.controller.ts"
Cohesion: 0.07
Nodes (25): InviteUserUseCase, Inject, Injectable, ListInvitationsUseCase, Inject, Injectable, ResendInvitationUseCase, Inject (+17 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.09
Nodes (47): Inject, CompileContentGraphOptions, RunLifecyclePort, isSocialRunRecord(), LlmHopService, Injectable, coercePassNoteVerdict(), isPassOnlyIssue() (+39 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.09
Nodes (46): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, SseMetaPayload, SseMetaPayloadDto, ApiProperty (+38 more)

### Community 14 - "DomainException"
Cohesion: 0.17
Nodes (16): AcceptInviteResult, acceptInviteSchema, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds() (+8 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.06
Nodes (54): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDoneEvent, fromGatewayToolCallDto() (+46 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.09
Nodes (27): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, EmbeddingCircuitBreaker, escapeRedisSearchTag(), normalizeEmbeddingModelForIndex(), semanticIndexName() (+19 more)

### Community 18 - "AuthUserContext"
Cohesion: 0.09
Nodes (21): Body, ratingSchema, assertRunReviewable(), isTerminalStatus(), RunsController, ApiCookieAuth, ApiTags, Body (+13 more)

### Community 19 - "api/src/app.module.ts"
Cohesion: 0.08
Nodes (33): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind() (+25 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.09
Nodes (27): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+19 more)

### Community 21 - "GatewayKey"
Cohesion: 0.06
Nodes (60): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+52 more)

### Community 22 - "config-generator.service.ts"
Cohesion: 0.08
Nodes (22): ConfigInitCommand, Command, Option, CliGatewayValidatorService, Injectable, WizardState, ConfigGeneratorService, Injectable (+14 more)

### Community 24 - "run.types.ts"
Cohesion: 0.11
Nodes (19): GetRunLogsOutput, Inject, ListRunsOutput, RecoverInterruptedRunsUseCase, Inject, Injectable, RunLifecycleService, TransitionExtras (+11 more)

### Community 25 - "openai-params-provider.mapper.ts"
Cohesion: 0.08
Nodes (33): ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDonePayloadDto, SseDoneUsageDto, ApiPropertyOptional (+25 more)

### Community 26 - "RunRepository"
Cohesion: 0.06
Nodes (10): Inject, Inject, Inject, Inject, Inject, Inject, Inject, Inject (+2 more)

### Community 27 - "start-run.use-case.ts"
Cohesion: 0.18
Nodes (14): ParsedStartRunCommand, startRunCommandSchema, isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, SocialRunRecord (+6 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.08
Nodes (35): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+27 more)

### Community 29 - "configure-swagger.ts"
Cohesion: 0.24
Nodes (8): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), ACCESS_COOKIE_NAME, buildSwaggerConfig(), COOKIE_AUTH_NAME

### Community 30 - "UsersController"
Cohesion: 0.08
Nodes (20): ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Inject, Injectable, PatchUserDto, ApiProperty (+12 more)

### Community 31 - "HealthService"
Cohesion: 0.21
Nodes (3): HealthReadinessResponseDto, HealthService, Injectable

### Community 32 - "swagger.setup.ts"
Cohesion: 0.06
Nodes (38): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional (+30 more)

### Community 33 - "provider-instances.bootstrap.ts"
Cohesion: 0.35
Nodes (8): adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryContext, ProviderFactoryFn, FACTORIES

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "runs-result.types.ts"
Cohesion: 0.04
Nodes (74): buildOutputEditedBody(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload(), RESULT_KEYS_BY_TASK_TYPE (+66 more)

### Community 36 - "dashboard-shell.tsx"
Cohesion: 0.13
Nodes (14): CompletenessProvider(), AgentsGateTooltip(), AppHeader(), DashboardShell(), EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry (+6 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.23
Nodes (13): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+5 more)

### Community 39 - "AuthController"
Cohesion: 0.08
Nodes (27): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+19 more)

### Community 40 - "new-ids.ts"
Cohesion: 0.17
Nodes (8): ErrorEnvelope, HttpExceptionFilter, Catch, newInvitationId(), newRequestId(), newUserId(), RequestIdMiddleware, Injectable

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.06
Nodes (22): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, socialBriefSchema, socialStartRunSchema (+14 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.11
Nodes (22): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam (+14 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "runs.controller.ts"
Cohesion: 0.06
Nodes (37): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Injectable, GetRunLogsUseCase, Injectable, GetRunUseCase (+29 more)

### Community 45 - "model-manager.service.ts"
Cohesion: 0.22
Nodes (15): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ModelEditField, buildDefaultModelCapabilities(), buildDefaultModelPolicy(), getMaxOutputTokensBound() (+7 more)

### Community 46 - "getAppConfig"
Cohesion: 0.10
Nodes (20): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), asGatewayKey(), ResolvedGatewayClient, getAppConfig() (+12 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 48 - "health-readiness-response.dto.ts"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 49 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "cli.module.ts"
Cohesion: 0.07
Nodes (60): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers() (+52 more)

### Community 52 - "types/index.ts"
Cohesion: 0.08
Nodes (43): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+35 more)

### Community 53 - ".create"
Cohesion: 0.12
Nodes (15): CreateFeedbackUseCase, Injectable, FeedbackController, ApiCookieAuth, ApiTags, Body, Controller, HttpCode (+7 more)

### Community 54 - "isRecord"
Cohesion: 0.05
Nodes (59): metadata, geistMono, geistSans, metadata, acceptInvite(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+51 more)

### Community 55 - "TransactionalMailer"
Cohesion: 0.20
Nodes (9): TransactionalMailer, UserInvitedMail, LoggingMailerAdapter, Injectable, NodemailerSmtpMailerAdapter, readSmtpConfig(), SmtpConfig, Inject (+1 more)

### Community 56 - "content.graph.ts"
Cohesion: 0.12
Nodes (32): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+24 more)

### Community 57 - "RunRecord"
Cohesion: 0.11
Nodes (9): InProcessRunWorker, Injectable, RunDispatchExecutor, RUN_EXECUTOR, RunExecuteOptions, RunExecutorPort, RunRecord, StubRunExecutor (+1 more)

### Community 58 - ".completions"
Cohesion: 0.13
Nodes (13): OpenAiChatCompletionsController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags, Body (+5 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "should-include-redis-stack.ts"
Cohesion: 0.11
Nodes (15): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot (+7 more)

### Community 63 - "cache.module.ts"
Cohesion: 0.10
Nodes (17): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+9 more)

### Community 64 - "asProviderInstanceId"
Cohesion: 0.08
Nodes (50): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), DEFAULT_MODELS, convertProvider(), CliAiProvider (+42 more)

### Community 65 - "auth.module.ts"
Cohesion: 0.07
Nodes (39): AcceptInviteUseCase, Injectable, AuthTokenResult, BootstrapAdminUseCase, Inject, Injectable, BootstrapStatusUseCase, Injectable (+31 more)

### Community 66 - "metrics.ts"
Cohesion: 0.06
Nodes (43): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+35 more)

### Community 67 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (31): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+23 more)

### Community 69 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 70 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 71 - "PrismaService"
Cohesion: 0.18
Nodes (5): PrismaModule, Global, Module, PrismaService, Injectable

### Community 72 - "prisma.feedback-run-reader.adapter.ts"
Cohesion: 0.24
Nodes (5): Inject, FeedbackRunLookup, FeedbackRunReader, PrismaFeedbackRunReaderAdapter, Injectable

### Community 73 - "toInputJson"
Cohesion: 0.24
Nodes (6): OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable, toInputJson()

### Community 74 - "EnvRef"
Cohesion: 0.10
Nodes (12): ConfigSecretsStatusCommand, Command, Option, ModelAddCommand, Command, Option, ConfigPersistenceService, Injectable (+4 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "UserRepository"
Cohesion: 0.08
Nodes (19): Inject, ListUsersUseCase, Inject, Injectable, Inject, Inject, AuthUser, JwtPayload (+11 more)

### Community 77 - "auth.schemas.ts"
Cohesion: 0.22
Nodes (8): BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema, UpdateMeEmailInput, updateMeEmailSchema

### Community 78 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (19): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+11 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.11
Nodes (22): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+14 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "resolve-provider-call-options.ts"
Cohesion: 0.39
Nodes (6): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, GatewayParamsConfig

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "configuration.ts"
Cohesion: 0.09
Nodes (30): CliValidateOptions, asCacheTtlSeconds(), asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig (+22 more)

### Community 85 - "llm-hop.ts"
Cohesion: 0.13
Nodes (17): LlmGatewayError, LLM_GATEWAY_PORT, isRetryable(), RetryReason, isAbortError(), ChatJsonInput, hopErrorLogMessage(), hopUserContent() (+9 more)

### Community 86 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 87 - "GatewayConfig"
Cohesion: 0.13
Nodes (11): PendingSecretsItem, normalizeGatewayConfigForWrite(), ProviderManagerService, Injectable, ApplyMutationResult, EditProviderInput, RemoveProviderInput, countActiveModelsAfterProviderChange() (+3 more)

### Community 88 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 89 - "users-view.tsx"
Cohesion: 0.09
Nodes (32): metadata, logoutSession(), assertNever(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput (+24 more)

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
Cohesion: 0.17
Nodes (21): ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError() (+13 more)

### Community 95 - ".createMessage"
Cohesion: 0.12
Nodes (14): ApiHeader, AnthropicMessagesController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags (+6 more)

### Community 96 - "anthropic-messages.controller.ts"
Cohesion: 0.05
Nodes (49): GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+41 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "KeyGenerateCommand"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 99 - "ProviderAddCommand"
Cohesion: 0.06
Nodes (15): ClientAddCommand, Command, Option, ClientRemoveCommand, Command, Option, ModelEditCommand, Command (+7 more)

### Community 101 - "create-feedback.use-case.ts"
Cohesion: 0.17
Nodes (12): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FEEDBACK_BODY_MAX, FEEDBACK_REPOSITORY, FeedbackEntry, FeedbackRepository (+4 more)

### Community 102 - "AppMetricsModule"
Cohesion: 0.22
Nodes (7): AppMetricsModule, Global, Module, RATE_LIMIT_MODULE_OPTIONS, RateLimitModule, RateLimitModuleOptions, Module

### Community 103 - "ProviderEditCommand"
Cohesion: 0.33
Nodes (3): ProviderEditCommand, Command, Option

### Community 104 - "CompanyContext"
Cohesion: 0.23
Nodes (6): CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 106 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 109 - "ApiRequestIdHeader"
Cohesion: 0.17
Nodes (11): ApiRequestIdHeader(), HealthLivenessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+3 more)

### Community 110 - "chat.service.ts"
Cohesion: 0.04
Nodes (63): RedisConnectionService, Injectable, OllamaEmbeddingAdapter, Injectable, SemanticStoreEmbedState, ChatService, Injectable, ChatRequestDto (+55 more)

### Community 111 - "semantic-cache.service.ts"
Cohesion: 0.07
Nodes (30): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Inject, Injectable, EmbeddingBackend, isSingleTurnUserRequest() (+22 more)

### Community 112 - "ConfigValidateCommand"
Cohesion: 0.40
Nodes (3): ConfigValidateCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.06
Nodes (54): AcceptInviteFormProps, FALLBACK, FeedbackCta(), FloatingRunsBox(), handleChevronClick(), toggleCollapsed(), AppHeaderProps, AppSidebar() (+46 more)

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.19
Nodes (17): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+9 more)

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 121 - "ClientEditCommand"
Cohesion: 0.33
Nodes (3): ClientEditCommand, Command, Option

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

## Knowledge Gaps
- **382 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+377 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1101 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `anthropic-messages.controller.ts`, `asProviderInstanceId`, `metrics.ts`, `asModelAlias`, `branded.types.ts`, `chat.service.ts`, `semantic-cache.service.ts`, `models.controller.ts`, `types/index.ts`, `GatewayKey`, `config-generator.service.ts`, `GatewayConfig`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `asProviderInstanceId`, `metrics.ts`, `asModelAlias`, `LogContext`, `EnvRef`, `branded.types.ts`, `chat.service.ts`, `models.controller.ts`, `cli.module.ts`, `types/index.ts`, `GatewayKey`, `config-generator.service.ts`, `GatewayConfig`, `configuration.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `chat.service.ts` to `anthropic-messages.controller.ts`, `swagger.setup.ts`, `provider-instances.bootstrap.ts`, `LogContext`, `anthropic/anthropic-tools.mapper.ts`, `ai-provider-gateway/src/app.module.ts`, `responses.adapter.ts`, `semantic-cache.service.ts`, `redis-vector-store.adapter.ts`, `types/index.ts`, `GatewayKey`, `HealthService`, `provider-error.mapper.ts`, `cache.module.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _382 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `prisma-invitation.adapter.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1265597147950089 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05070707070707071 - nodes in this community are weakly interconnected._
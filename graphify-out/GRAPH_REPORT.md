# Graph Report - content-chain  (2026-09-30)

## Corpus Check
- 641 files · ~192,706 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4155 nodes · 12818 edges · 131 communities (116 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 399 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9bb6ce4f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- prisma-invitation.adapter.ts
- social.types.ts
- api/company-context.types.ts
- exitWithAgentReport
- dashboard-shell.tsx
- run-details-view.tsx
- ModelAlias
- LogContext
- anthropic/anthropic-tools.mapper.ts
- anthropic.module.ts
- cancel-run-dialog.tsx
- invite-user.use-case.ts
- social.graph.ts
- branded.types.ts
- run-result-view.tsx
- types/index.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- DomainException
- PageDocument
- sentry-ai-metrics.adapter.ts
- configuration.ts
- ConfigInitCommand
- config-generator.service.ts
- run.types.ts
- openai-thinking-provider.mapper.ts
- RunRepository
- start-run.use-case.ts
- save-output-edited.use-case.ts
- AnthropicContentBlockDto
- users.controller.ts
- HealthService
- swagger.setup.ts
- cache.module.ts
- AnthropicMessagesRequestDto
- run-result-editor.tsx
- runs.types.ts
- enums.ts
- feedback-form.tsx
- AuthController
- new-ids.ts
- run.port.ts
- openai-models.controller.ts
- ids.ts
- runs.module.ts
- GatewayConfig
- getAppConfig
- anthropic-models.controller.ts
- health-readiness-response.dto.ts
- ChatParamsDto
- ListRunsQueryDto
- cli.module.ts
- resilient-executor.ts
- configure-swagger.ts
- users-view.tsx
- ChatToolingDto
- llm-hop.ts
- InProcessRunWorker
- HealthController
- responses.adapter.ts
- models.controller.ts
- company-context.dto.ts
- should-include-redis-stack.ts
- redis-cache.adapter.ts
- EnvRef
- openai-stream.mapper.ts
- metrics.ts
- LlmGatewayHttpAdapter
- OpenAiChatCompletionRequestDto
- auth.module.ts
- company-context.mapper.ts
- runs.controller.ts
- http-metrics.interceptor.ts
- metrics.module.ts
- app-configuration.types.ts
- parse-verifier-log-message.ts
- UserRepository
- content.schemas.ts
- CompanyContextRepository
- llm-gateway.http.adapter.ts
- PrometheusService
- chat.service.ts
- ProviderRemoveCommand
- SPEC — README
- anthropic-stream.mapper.ts
- api/src/app.module.ts
- openai-chat-completion-response.dto.ts
- asProviderInstanceId
- EnvironmentVariables
- openai-messages.mapper.ts
- InMemoryRunSseHub
- StartRunDto
- public.decorator.ts
- provider-error.mapper.ts
- ClientEditCommand
- ChatResponseDto
- anthropic-messages.controller.ts
- route.ts
- ClientManagerService
- .constructor
- PrismaService
- ProviderAddCommand
- CompanyContext
- ClientAddCommand
- ApiRequestIdHeader
- GatewayKey
- LoggingService
- ModelRemoveCommand
- OpenAiChatMessageDto
- cn
- openai-chat-message.dto.ts
- openai-chat-completion-request.dto.ts
- domain/company-context.types.ts
- PrismaRefreshSessionAdapter
- CompanyContextController
- api-error.code.ts
- ai-provider-gateway/src/app.module.ts
- Architektura
- brand.ts
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
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (131 total, 14 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (28): CompositeRunResultReader, GetRunOutput, orderItemsBySelectedIds(), RUN_RESULT_READER, RunResultReader, ContentBrief, SocialBrief, EmptyRunResultReader (+20 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.05
Nodes (69): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+61 more)

### Community 3 - "exitWithAgentReport"
Cohesion: 0.16
Nodes (12): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+4 more)

### Community 4 - "dashboard-shell.tsx"
Cohesion: 0.13
Nodes (14): AgentsGateTooltip(), AppHeader(), FloatingBoxSlot(), DashboardShell(), EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry (+6 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.06
Nodes (49): metadata, metadata, metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS (+41 more)

### Community 6 - "ModelAlias"
Cohesion: 0.03
Nodes (41): AddModelInput, HttpMetricsMiddleware, Injectable, ModelAlias, ProviderInstanceId, ActiveStreamsTracker, Injectable, NoopAppMetricsAdapter (+33 more)

### Community 7 - "LogContext"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.06
Nodes (68): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens() (+60 more)

### Community 9 - "anthropic.module.ts"
Cohesion: 0.21
Nodes (10): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+2 more)

### Community 10 - "cancel-run-dialog.tsx"
Cohesion: 0.10
Nodes (31): CompletenessChip(), FeedbackCta(), assertNever(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput (+23 more)

### Community 11 - "invite-user.use-case.ts"
Cohesion: 0.05
Nodes (42): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+34 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.11
Nodes (40): loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), SocialPipelineFacade, toOutcome(), Injectable, ideasOutputSchema (+32 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.09
Nodes (48): VectorStorePartition, VectorStoreTextIdentityInput, VectorStoreUpsertInput, CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, mapStopReasonToFinishReason() (+40 more)

### Community 14 - "run-result-view.tsx"
Cohesion: 0.06
Nodes (41): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+33 more)

### Community 15 - "types/index.ts"
Cohesion: 0.14
Nodes (27): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+19 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.19
Nodes (16): SseDoneEvent, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto, AnthropicThinkingContentBlockDto, AnthropicToolUseContentBlockDto (+8 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.09
Nodes (27): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, EmbeddingCircuitBreaker, escapeRedisSearchTag(), normalizeEmbeddingModelForIndex(), semanticIndexName() (+19 more)

### Community 18 - "DomainException"
Cohesion: 0.08
Nodes (27): AcceptInviteResult, acceptInviteSchema, hashPassword(), Injectable, UpdateMeEmailUseCase, validatePasswordPolicy(), ratingSchema, assertRunReviewable() (+19 more)

### Community 19 - "PageDocument"
Cohesion: 0.10
Nodes (13): ContentPipelineState, PageDocument, VerifierVerdict, PrismaContentResultAdapter, toContentPipelinePhase(), Injectable, Inject, OutputEditedWrite (+5 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (24): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+16 more)

### Community 21 - "configuration.ts"
Cohesion: 0.07
Nodes (47): CliValidateOptions, asCacheTtlSeconds(), asSemanticCacheTtlSeconds(), collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult (+39 more)

### Community 22 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 23 - "config-generator.service.ts"
Cohesion: 0.10
Nodes (18): WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable, ServerPromptService, Injectable, Injectable (+10 more)

### Community 24 - "run.types.ts"
Cohesion: 0.18
Nodes (11): GetRunLogsOutput, RunDispatchExecutor, runIdSchema, RunExecuteOptions, RunExecutorPort, isSocialRunRecord(), RunLogLevel, RunRecordBase (+3 more)

### Community 25 - "openai-thinking-provider.mapper.ts"
Cohesion: 0.11
Nodes (24): ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDonePayloadDto, SseDoneUsageDto, ApiPropertyOptional (+16 more)

### Community 26 - "RunRepository"
Cohesion: 0.09
Nodes (8): CancelRunUseCase, Inject, Injectable, GetRunUseCase, Inject, Injectable, RunRepository, RunRecord

### Community 27 - "start-run.use-case.ts"
Cohesion: 0.11
Nodes (23): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+15 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.08
Nodes (36): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+28 more)

### Community 29 - "AnthropicContentBlockDto"
Cohesion: 0.14
Nodes (14): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+6 more)

### Community 30 - "users.controller.ts"
Cohesion: 0.08
Nodes (22): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, PatchUserDto, ApiProperty (+14 more)

### Community 31 - "HealthService"
Cohesion: 0.23
Nodes (3): HealthReadinessResponseDto, HealthService, Injectable

### Community 32 - "swagger.setup.ts"
Cohesion: 0.08
Nodes (25): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+17 more)

### Community 33 - "cache.module.ts"
Cohesion: 0.16
Nodes (10): NoopCacheModule, Module, RedisCacheModule, Module, CacheModule, CacheModuleOptions, Module, CACHE_BACKEND (+2 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

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

### Community 39 - "AuthController"
Cohesion: 0.09
Nodes (27): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+19 more)

### Community 40 - "new-ids.ts"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 41 - "run.port.ts"
Cohesion: 0.08
Nodes (18): ListRunsOutput, LightRunItem, ListRunsQuery, ListRunsResult, PAGE_SIZE, RunSnapshot, RunStartedBy, RunLogEntry (+10 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.11
Nodes (22): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam (+14 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "runs.module.ts"
Cohesion: 0.11
Nodes (18): Inject, RecoverInterruptedRunsUseCase, Inject, Injectable, ResumeHitlUseCase, Inject, Injectable, RunAbortRegistry (+10 more)

### Community 45 - "GatewayConfig"
Cohesion: 0.07
Nodes (40): DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable (+32 more)

### Community 46 - "getAppConfig"
Cohesion: 0.12
Nodes (17): readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), asGatewayKey(), getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId() (+9 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.10
Nodes (25): ApiAnthropicErrorResponses(), AnthropicMessagesController, ApiSecurity, ApiTags, Controller, AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse (+17 more)

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
Cohesion: 0.05
Nodes (64): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), CliModule (+56 more)

### Community 52 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (19): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+11 more)

### Community 53 - "configure-swagger.ts"
Cohesion: 0.18
Nodes (11): bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins(), validateEnv(), configureHttpApp() (+3 more)

### Community 54 - "users-view.tsx"
Cohesion: 0.06
Nodes (58): metadata, geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession() (+50 more)

### Community 55 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 56 - "llm-hop.ts"
Cohesion: 0.06
Nodes (61): ContentPipelineFacade, toOutcome(), Inject, Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject (+53 more)

### Community 57 - "InProcessRunWorker"
Cohesion: 0.14
Nodes (5): InProcessRunWorker, Injectable, Inject, StubRunExecutor, Injectable

### Community 58 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 59 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (58): toHttpException(), asSystemFingerprint(), asToolCallId(), assertOpenAiProviderType(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ProviderFactoryFn (+50 more)

### Community 60 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "should-include-redis-stack.ts"
Cohesion: 0.13
Nodes (13): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot (+5 more)

### Community 63 - "redis-cache.adapter.ts"
Cohesion: 0.14
Nodes (9): NoOpCacheBackend, Injectable, RedisCacheAdapter, Injectable, CacheRegistryService, Injectable, CacheBackend, CacheKey (+1 more)

### Community 64 - "EnvRef"
Cohesion: 0.12
Nodes (20): collectPendingSecrets(), ProviderTestOptions, CliAiProvider, EnvPatchService, EnvPatchValue, Injectable, ProviderTestService, Injectable (+12 more)

### Community 65 - "openai-stream.mapper.ts"
Cohesion: 0.31
Nodes (12): fromGatewayToolCallDto(), mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields(), buildToolCallsDelta() (+4 more)

### Community 66 - "metrics.ts"
Cohesion: 0.08
Nodes (37): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+29 more)

### Community 67 - "LlmGatewayHttpAdapter"
Cohesion: 0.15
Nodes (6): LlmGatewayError, LlmGatewayHttpAdapter, Inject, Injectable, GATEWAY_ERROR_CODE_LABELS, toGatewayErrorCodeLabel()

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "auth.module.ts"
Cohesion: 0.07
Nodes (40): AcceptInviteUseCase, Injectable, comparePassword(), generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), AuthTokenResult (+32 more)

### Community 70 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 71 - "runs.controller.ts"
Cohesion: 0.06
Nodes (29): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsUseCase, Inject, Injectable, ListRunsUseCase, Inject (+21 more)

### Community 72 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 73 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 74 - "app-configuration.types.ts"
Cohesion: 0.18
Nodes (7): AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, GatewayKeyRuntimeConfig, _badRuntimeConfig

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "UserRepository"
Cohesion: 0.07
Nodes (23): BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema, UpdateMeEmailInput, updateMeEmailSchema (+15 more)

### Community 77 - "content.schemas.ts"
Cohesion: 0.24
Nodes (9): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString(), verifierIssueSchema (+1 more)

### Community 78 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (19): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+11 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.19
Nodes (16): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+8 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "chat.service.ts"
Cohesion: 0.06
Nodes (30): CachedChatResponseWithConversation, createInProcessSingleflight(), clamp(), isOverrideKey(), resolveProviderCallOptions(), ChatProviderCallService, Injectable, ChatValidationService (+22 more)

### Community 82 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "anthropic-stream.mapper.ts"
Cohesion: 0.39
Nodes (8): asMessageId(), MessageId, AnthropicStreamState, createAnthropicStreamState(), emitThinkingBlock(), eventLine(), mapSseEventToAnthropic(), nextToolBlockIndex()

### Community 85 - "api/src/app.module.ts"
Cohesion: 0.10
Nodes (21): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, ContentModule, Module (+13 more)

### Community 86 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 87 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (64): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, PendingSecretsItem, assertInteractiveAllowed(), WIZARD_INIT_STEPS, WIZARD_STEPS (+56 more)

### Community 88 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 89 - "openai-messages.mapper.ts"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

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

### Community 95 - "ChatResponseDto"
Cohesion: 0.33
Nodes (6): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString

### Community 96 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (62): ApiHeader, ChatCacheSource, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity (+54 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "ClientManagerService"
Cohesion: 0.11
Nodes (8): KeyGenerateCommand, Command, Option, ClientManagerService, Injectable, KeyGeneratorService, Injectable, RemoveClientInput

### Community 101 - "PrismaService"
Cohesion: 0.06
Nodes (35): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+27 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.06
Nodes (15): ClientRemoveCommand, Command, Option, ModelAddCommand, Command, Option, ModelEditCommand, Command (+7 more)

### Community 104 - "CompanyContext"
Cohesion: 0.23
Nodes (6): CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 107 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 109 - "ApiRequestIdHeader"
Cohesion: 0.29
Nodes (7): ApiRequestIdHeader(), HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 110 - "GatewayKey"
Cohesion: 0.08
Nodes (36): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+28 more)

### Community 111 - "LoggingService"
Cohesion: 0.04
Nodes (49): RedisConnectionService, Injectable, computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Inject, Injectable (+41 more)

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.33
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 114 - "cn"
Cohesion: 0.07
Nodes (37): AppHeaderProps, AppSidebar(), AppSidebarProps, APP_NAV, AppNavItem, navItemsForRole(), CardAction(), CardDescription() (+29 more)

### Community 115 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.19
Nodes (17): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+9 more)

### Community 118 - "PrismaRefreshSessionAdapter"
Cohesion: 0.31
Nodes (3): RefreshSessionRecord, PrismaRefreshSessionAdapter, Injectable

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 120 - "api-error.code.ts"
Cohesion: 0.17
Nodes (9): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch (+1 more)

### Community 123 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.11
Nodes (17): HealthModule, Module, AppMetricsModule, Global, Module, ObservabilityModule, Global, Module (+9 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

## Knowledge Gaps
- **381 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+376 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1101 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `anthropic-messages.controller.ts`, `metrics.ts`, `branded.types.ts`, `GatewayKey`, `GatewayConfig`, `types/index.ts`, `chat.service.ts`, `LoggingService`, `resilient-executor.ts`, `config-generator.service.ts`, `asProviderInstanceId`, `api-error.code.ts`, `models.controller.ts`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `anthropic-messages.controller.ts`, `EnvRef`, `metrics.ts`, `exitWithAgentReport`, `LogContext`, `app-configuration.types.ts`, `branded.types.ts`, `GatewayKey`, `LoggingService`, `GatewayConfig`, `types/index.ts`, `chat.service.ts`, `config-generator.service.ts`, `configuration.ts`, `asProviderInstanceId`, `models.controller.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `swagger.setup.ts`, `LogContext`, `anthropic/anthropic-tools.mapper.ts`, `GatewayKey`, `chat.service.ts`, `redis-vector-store.adapter.ts`, `resilient-executor.ts`, `configuration.ts`, `api-error.code.ts`, `responses.adapter.ts`, `HealthService`, `redis-cache.adapter.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _381 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05531914893617021 - nodes in this community are weakly interconnected._
- **Should `api/company-context.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05450372920252438 - nodes in this community are weakly interconnected._
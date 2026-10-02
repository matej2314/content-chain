# Graph Report - content-chain  (2026-10-02)

## Corpus Check
- 651 files · ~198,260 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4190 nodes · 12955 edges · 128 communities (114 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 400 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `55a02efb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- auth.module.ts
- social.types.ts
- api/company-context.types.ts
- cli.module.ts
- dashboard-shell.tsx
- run-details-view.tsx
- save-output-edited.use-case.ts
- LogContext
- anthropic/anthropic-tools.mapper.ts
- .info
- RefreshSessionRepository
- config-generator.service.ts
- social.graph.ts
- branded.types.ts
- run-review-panel.tsx
- ChatParamsDto
- anthropic-messages.controller.ts
- redis-vector-store.adapter.ts
- AuthUserContext
- isRecord
- sentry-ai-metrics.adapter.ts
- configuration.ts
- start-run-form.tsx
- GatewayConfig
- OpenAiChatMessageDto
- chat-provider-call.service.ts
- resilient-executor.ts
- start-run.use-case.ts
- semantic-cache.service.ts
- openai-chat-completions.controller.ts
- users.controller.ts
- HealthService
- swagger.setup.ts
- configuration-validation.service.ts
- AnthropicMessagesRequestDto
- runs-result.types.ts
- runs.types.ts
- enums.ts
- feedback-form.tsx
- DomainException
- public.decorator.ts
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- types/index.ts
- LoggingService
- ai-provider-gateway/src/app.module.ts
- anthropic-models.controller.ts
- AnthropicContentBlockDto
- server-prompt.service.ts
- ListRunsQueryDto
- ModelAlias
- CompanyContext
- EnvPatchService
- apiFetch
- ApiRequestIdHeader
- content.graph.ts
- filters/http-exception.filter.ts
- HealthController
- responses.adapter.ts
- models.controller.ts
- company-context.dto.ts
- should-include-redis-stack.ts
- cache.module.ts
- asProviderInstanceId
- Env
- ChatToolingDto
- provider-instances.bootstrap.ts
- OpenAiChatCompletionRequestDto
- HttpExceptionFilter
- company-context.mapper.ts
- RunRepository
- provider-base-url.validation.ts
- http-metrics.interceptor.ts
- InProcessRunWorker
- parse-verifier-log-message.ts
- UserRepository
- openai-params-provider.mapper.ts
- CompanyContextRepository
- llm-gateway.http.adapter.ts
- PrometheusService
- .completions
- llm-hop.ts
- SPEC — README
- api/src/app.module.ts
- patch-company-context.use-case.ts
- EnvironmentVariables
- metrics.module.ts
- health-readiness-response.dto.ts
- StartRunDto
- .chat
- api-error.code.ts
- ClientEditCommand
- ModelAddCommand
- GatewayKey
- route.ts
- gateway-config.schema.ts
- ModelEditCommand
- ClientRemoveCommand
- PrismaService
- ProviderEditCommand
- ProviderAddCommand
- ProviderRemoveCommand
- InMemoryRunSseHub
- ClientAddCommand
- content.schemas.ts
- chat.service.ts
- KeyGenerateCommand
- ModelRemoveCommand
- cn
- ConfigInitCommand
- domain/company-context.types.ts
- prisma-invitation.adapter.ts
- CompanyContextController
- RolesGuard
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
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `ResponseCacheService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/response-cache.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (128 total, 13 thin omitted)

### Community 0 - "auth.module.ts"
Cohesion: 0.05
Nodes (44): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+36 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (26): CompositeRunResultReader, Inject, RunResultReader, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore, PipelineState (+18 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (68): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+60 more)

### Community 3 - "cli.module.ts"
Cohesion: 0.07
Nodes (58): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+50 more)

### Community 4 - "dashboard-shell.tsx"
Cohesion: 0.10
Nodes (18): FeedbackCta(), AppHeader(), AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot(), FloatingBoxSlot(), DashboardShell() (+10 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.09
Nodes (34): metadata, metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS (+26 more)

### Community 6 - "save-output-edited.use-case.ts"
Cohesion: 0.07
Nodes (39): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+31 more)

### Community 7 - "LogContext"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.10
Nodes (37): asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic() (+29 more)

### Community 9 - ".info"
Cohesion: 0.14
Nodes (9): toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand, Command, Option, ProviderTestService (+1 more)

### Community 10 - "RefreshSessionRepository"
Cohesion: 0.09
Nodes (11): Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable (+3 more)

### Community 11 - "config-generator.service.ts"
Cohesion: 0.10
Nodes (18): CliGatewayValidatorService, Injectable, WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable, Injectable (+10 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (32): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.07
Nodes (52): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, toChatResponseDto(), ChatWarningDto, ApiProperty (+44 more)

### Community 14 - "run-review-panel.tsx"
Cohesion: 0.08
Nodes (39): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+31 more)

### Community 15 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 16 - "anthropic-messages.controller.ts"
Cohesion: 0.11
Nodes (30): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, asMessageId(), MessageId (+22 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.09
Nodes (27): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, EmbeddingCircuitBreaker, escapeRedisSearchTag(), normalizeEmbeddingModelForIndex(), semanticIndexName() (+19 more)

### Community 18 - "AuthUserContext"
Cohesion: 0.12
Nodes (19): ListRunsUserItem, ListRunsUserOutput, isTerminalStatus(), RunsController, ApiCookieAuth, ApiTags, Body, Controller (+11 more)

### Community 19 - "isRecord"
Cohesion: 0.15
Nodes (23): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+15 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.09
Nodes (27): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+19 more)

### Community 21 - "configuration.ts"
Cohesion: 0.12
Nodes (20): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration(), BuildEffectiveGatewayConfigOptions (+12 more)

### Community 22 - "start-run-form.tsx"
Cohesion: 0.07
Nodes (44): metadata, assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput (+36 more)

### Community 23 - "GatewayConfig"
Cohesion: 0.07
Nodes (36): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable (+28 more)

### Community 24 - "OpenAiChatMessageDto"
Cohesion: 0.16
Nodes (12): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+4 more)

### Community 25 - "chat-provider-call.service.ts"
Cohesion: 0.06
Nodes (49): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+41 more)

### Community 26 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 27 - "start-run.use-case.ts"
Cohesion: 0.09
Nodes (26): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+18 more)

### Community 28 - "semantic-cache.service.ts"
Cohesion: 0.07
Nodes (27): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend (+19 more)

### Community 29 - "openai-chat-completions.controller.ts"
Cohesion: 0.14
Nodes (24): GATEWAY_CACHE_HEADER, SseDoneEvent, fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto (+16 more)

### Community 30 - "users.controller.ts"
Cohesion: 0.06
Nodes (31): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Inject (+23 more)

### Community 31 - "HealthService"
Cohesion: 0.21
Nodes (3): HealthReadinessResponseDto, HealthService, Injectable

### Community 32 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (23): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+15 more)

### Community 33 - "configuration-validation.service.ts"
Cohesion: 0.17
Nodes (15): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, buildEffectiveGatewayConfig(), assertEnabledProviderSecretsPresent() (+7 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 35 - "runs-result.types.ts"
Cohesion: 0.05
Nodes (55): PAGE_OUTLINE_ROLE_LABELS, submitHitl(), HitlAccepted, isPageOutlineSectionRole(), isReelDuration(), PAGE_OUTLINE_SECTION_ROLES, PageDocument, PageOutline (+47 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.06
Nodes (54): ArchiveRunsQuery, fetchRunLogs(), fetchUserRuns(), InitiatorOption, ArchiveRunItem, ArchiveRunsPage, CANCELABLE_STATUSES, CancelableRunStatus (+46 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.22
Nodes (14): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+6 more)

### Community 39 - "DomainException"
Cohesion: 0.08
Nodes (37): AcceptInviteResult, acceptInviteSchema, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds() (+29 more)

### Community 40 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.07
Nodes (19): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, RunRecordBase, ALLOWED_RUN_STATES, assertTransition(), CANCELABLE_RUN_STATUSES (+11 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.09
Nodes (27): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiModelsController (+19 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "types/index.ts"
Cohesion: 0.14
Nodes (26): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+18 more)

### Community 45 - "LoggingService"
Cohesion: 0.05
Nodes (25): RedisConnectionService, Injectable, Inject, Inject, isRedisRequiredFromConfig(), ChatProviderCooldownService, Injectable, StreamCacheReplayService (+17 more)

### Community 46 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.07
Nodes (30): ChatModule, Module, resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId() (+22 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.10
Nodes (25): ApiAnthropicErrorResponses(), AnthropicMessagesController, ApiSecurity, ApiTags, Controller, AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse (+17 more)

### Community 48 - "AnthropicContentBlockDto"
Cohesion: 0.14
Nodes (14): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+6 more)

### Community 49 - "server-prompt.service.ts"
Cohesion: 0.13
Nodes (14): ClientPromptService, Injectable, KeyPromptService, Injectable, BasicServerAnswers, CacheAnswers, MetricsAnswers, RateLimitAnswers (+6 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.03
Nodes (44): ProviderTestOptions, HttpMetricsMiddleware, Injectable, ClientId, ModelAlias, ProviderInstanceId, HealthCheckResult, HealthRedisCheckResult (+36 more)

### Community 52 - "CompanyContext"
Cohesion: 0.29
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 53 - "EnvPatchService"
Cohesion: 0.24
Nodes (5): ConfigSecretsStatusCommand, Command, Option, EnvPatchService, Injectable

### Community 54 - "apiFetch"
Cohesion: 0.09
Nodes (37): geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession(), loginWithPassword() (+29 more)

### Community 55 - "ApiRequestIdHeader"
Cohesion: 0.13
Nodes (14): ApiRequestIdHeader(), HealthLivenessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+6 more)

### Community 56 - "content.graph.ts"
Cohesion: 0.07
Nodes (51): ContentPipelineFacade, toOutcome(), Inject, Injectable, pageOutlineOutputSchema, CONTENT_RESULT_STORE, ContentResultStore, ContentPipelineInput (+43 more)

### Community 57 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 58 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 59 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (73): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint() (+65 more)

### Community 60 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

### Community 63 - "cache.module.ts"
Cohesion: 0.09
Nodes (20): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+12 more)

### Community 64 - "asProviderInstanceId"
Cohesion: 0.09
Nodes (44): PendingSecretsItem, assertInteractiveAllowed(), collectPendingSecrets(), DEFAULT_MODELS, CliAiProvider, EnvPatchValue, ModelPromptResult, ModelPromptService (+36 more)

### Community 65 - "Env"
Cohesion: 0.05
Nodes (49): AcceptInviteUseCase, Injectable, BootstrapStatusUseCase, Injectable, LoginUseCase, Inject, Injectable, LogoutUseCase (+41 more)

### Community 66 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 67 - "provider-instances.bootstrap.ts"
Cohesion: 0.16
Nodes (15): GatewayProviderInstanceConfig, adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, FACTORIES (+7 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (19): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+11 more)

### Community 70 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 71 - "RunRepository"
Cohesion: 0.03
Nodes (61): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject (+53 more)

### Community 72 - "provider-base-url.validation.ts"
Cohesion: 0.43
Nodes (6): assertEnabledProviderBaseUrlPresent(), collectMissingBaseUrlErrors(), formatMissingBaseUrlError(), MissingProviderBaseUrl, RawGatewayConfig, resolveBaseUrlFromEnv()

### Community 73 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 74 - "InProcessRunWorker"
Cohesion: 0.23
Nodes (3): InProcessRunWorker, Injectable, Inject

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "UserRepository"
Cohesion: 0.09
Nodes (16): Inject, Inject, Inject, AuthUser, JwtPayload, UserListItem, CreateAdminIfNoneData, CreateAdminIfNoneResult (+8 more)

### Community 77 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 78 - "CompanyContextRepository"
Cohesion: 0.21
Nodes (11): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PutCompanyContextUseCase, Inject (+3 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.19
Nodes (16): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+8 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - ".completions"
Cohesion: 0.17
Nodes (13): ApiBody, ApiOperation, ApiProduces, ApiResponse, Body, Post, Req, Res (+5 more)

### Community 82 - "llm-hop.ts"
Cohesion: 0.16
Nodes (14): LlmGatewayError, LLM_GATEWAY_PORT, isRetryable(), RetryReason, isAbortError(), ChatJsonInput, hopErrorLogMessage(), hopUserContent() (+6 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 85 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (45): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, ContentRunExecutor, isCanonicalOutlineSelection() (+37 more)

### Community 86 - "patch-company-context.use-case.ts"
Cohesion: 0.27
Nodes (8): toPublicCompanyContext(), PatchCompanyContextUseCase, Inject, Injectable, assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 88 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 89 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 90 - "health-readiness-response.dto.ts"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 91 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 92 - ".chat"
Cohesion: 0.21
Nodes (5): LlmGatewayHttpAdapter, Inject, Injectable, GATEWAY_ERROR_CODE_LABELS, toGatewayErrorCodeLabel()

### Community 93 - "api-error.code.ts"
Cohesion: 0.14
Nodes (24): ChatErrorHandlerService, Injectable, ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus() (+16 more)

### Community 94 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 95 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 96 - "GatewayKey"
Cohesion: 0.06
Nodes (34): ApiHeader, ApiBody, ApiOperation, ApiResponse, Body, Post, Req, ApiBody (+26 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "gateway-config.schema.ts"
Cohesion: 0.08
Nodes (46): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers (+38 more)

### Community 99 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 100 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 101 - "PrismaService"
Cohesion: 0.05
Nodes (34): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+26 more)

### Community 102 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 105 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 106 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 107 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 109 - "content.schemas.ts"
Cohesion: 0.24
Nodes (9): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString(), verifierIssueSchema (+1 more)

### Community 110 - "chat.service.ts"
Cohesion: 0.05
Nodes (65): SemanticStoreEmbedState, ChatController, ApiSecurity, ApiTags, Controller, ChatService, Injectable, ChatStreamController (+57 more)

### Community 111 - "KeyGenerateCommand"
Cohesion: 0.39
Nodes (3): KeyGenerateCommand, Command, Option

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.06
Nodes (52): metadata, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite(), AcceptInviteForm(), onSubmit(), AcceptInviteFormProps (+44 more)

### Community 115 - "ConfigInitCommand"
Cohesion: 0.17
Nodes (6): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 118 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

## Knowledge Gaps
- **382 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+377 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1109 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `asProviderInstanceId`, `gateway-config.schema.ts`, `config-generator.service.ts`, `types/index.ts`, `branded.types.ts`, `chat.service.ts`, `models.controller.ts`, `LoggingService`, `GatewayConfig`, `chat-provider-call.service.ts`, `resilient-executor.ts`, `semantic-cache.service.ts`, `api-error.code.ts`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `asProviderInstanceId`, `gateway-config.schema.ts`, `LogContext`, `provider-base-url.validation.ts`, `.info`, `config-generator.service.ts`, `types/index.ts`, `branded.types.ts`, `chat.service.ts`, `LoggingService`, `configuration.ts`, `GatewayConfig`, `chat-provider-call.service.ts`, `models.controller.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `swagger.setup.ts`, `GatewayKey`, `provider-instances.bootstrap.ts`, `LogContext`, `anthropic/anthropic-tools.mapper.ts`, `branded.types.ts`, `chat.service.ts`, `HealthService`, `ai-provider-gateway/src/app.module.ts`, `redis-vector-store.adapter.ts`, `ModelAlias`, `filters/http-exception.filter.ts`, `resilient-executor.ts`, `responses.adapter.ts`, `semantic-cache.service.ts`, `api-error.code.ts`, `cache.module.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _382 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `auth.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.053830227743271224 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.050724637681159424 - nodes in this community are weakly interconnected._
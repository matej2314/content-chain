# Graph Report - content-chain  (2026-10-03)

## Corpus Check
- 664 files · ~207,057 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4301 nodes · 13304 edges · 139 communities (124 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 404 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ac55db62`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- auth.controller.ts
- get-run.use-case.ts
- api/company-context.types.ts
- semantic-cache.service.ts
- GatewayConfig
- run-details-view.tsx
- provider-error.mapper.ts
- logging.module.ts
- anthropic/anthropic-tools.mapper.ts
- cli.module.ts
- InMemoryRunSseHub
- ConfigInitCommand
- social.graph.ts
- branded.types.ts
- run-result-editor.tsx
- chat-params.dto.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- anthropic-messages.controller.ts
- users-view.tsx
- app-metrics-backend.interface.ts
- configuration-validation.service.ts
- provider-instances.bootstrap.ts
- asProviderInstanceId
- app-metrics.service.ts
- own-runs-provider.tsx
- PrometheusAppMetricsAdapter
- in-process-run.worker.ts
- api/src/main.ts
- ModelAddCommand
- users.controller.ts
- HealthService
- swagger.setup.ts
- types/index.ts
- AnthropicMessagesRequestDto
- MetricsController
- runs.types.ts
- enums.ts
- feedback-form.tsx
- DomainException
- chat-provider-call.service.ts
- PrismaRunAdapter
- openai-models.controller.ts
- ids.ts
- responses.adapter.ts
- LoggingService
- ProviderApiKey
- anthropic-models.controller.ts
- RefreshSessionRepository
- RunRepository
- ListRunsQueryDto
- ModelAlias
- CompanyContext
- config-generator.service.ts
- apiFetch
- AppMetricsService
- content.graph.ts
- google-tools.mapper.ts
- HealthController
- SemanticCacheService
- models.controller.ts
- company-context.dto.ts
- InProcessRunWorker
- response-cache.service.ts
- chat-completions.adapter.ts
- InvitationsController
- ChatToolingDto
- configuration.ts
- OpenAiChatCompletionRequestDto
- new-ids.ts
- company-context.mapper.ts
- runs.controller.ts
- llm-hop.ts
- http-metrics.interceptor.ts
- UserRepository
- parse-verifier-log-message.ts
- metrics.module.ts
- openai-thinking-provider.mapper.ts
- CompanyContextRepository
- llm-gateway.http.adapter.ts
- PrometheusService
- openai-params-provider.mapper.ts
- config-validator.ts
- SPEC — README
- AuthController
- api/src/app.module.ts
- KeyGenerateCommand
- openai-messages.mapper.ts
- should-include-redis-stack.ts
- .chat
- ai-provider-gateway/src/health/health.controller.ts
- StartRunDto
- openai-chat-completions.controller.ts
- openai-messages-provider.mapper.ts
- provider-base-url.validation.ts
- start-run.use-case.ts
- GatewayKey
- route.ts
- event-source-registry-provider.tsx
- ModelEditCommand
- ClientRemoveCommand
- save-output-edited.use-case.ts
- gateway-config.schema.ts
- ProviderAddCommand
- ProviderEditCommand
- VectorStore
- prisma-invitation.adapter.ts
- ClientAddCommand
- gateway-key.guard.branded-types.test-d.ts
- chat.service.ts
- public.decorator.ts
- ModelRemoveCommand
- cn
- domain/company-context.types.ts
- auth.module.ts
- CompanyContextController
- PrismaService
- exitWithAgentReport
- Architektura
- brand
- HealthController
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
- EnvironmentVariables
- ChatParamsDto
- OpenAiChatMessageDto
- run.port.ts
- openai-chat-message.dto.ts
- RolesGuard
- openai-chat-completion-request.dto.ts

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `ProviderInstanceId` - 81 edges
3. `DomainException` - 76 edges
4. `LoggingService` - 73 edges
5. `asProviderInstanceId()` - 67 edges
6. `GatewayConfig` - 65 edges
7. `isRecord()` - 62 edges
8. `cn()` - 62 edges
9. `GatewayKey` - 59 edges
10. `ClientId` - 54 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `LiveItemSubscription()` --calls--> `useRunEventSource()`  [EXTRACTED]
  apps/frontend/src/modules/runs/components/own-runs-provider.tsx → apps/frontend/src/modules/runs/components/use-run-event-source.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (139 total, 14 thin omitted)

### Community 0 - "auth.controller.ts"
Cohesion: 0.05
Nodes (44): MeUseCase, Injectable, JwtPayload, AcceptInviteDto, ApiProperty, IsString, MinLength, ActivateAccountDto (+36 more)

### Community 1 - "get-run.use-case.ts"
Cohesion: 0.05
Nodes (33): CompositeRunResultReader, GetRunOutput, orderItemsBySelectedIds(), Inject, OutputEditedWrite, OutputEditedWriter, RunResultReader, SocialBrief (+25 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.05
Nodes (69): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+61 more)

### Community 3 - "semantic-cache.service.ts"
Cohesion: 0.09
Nodes (19): EmbeddingBackend, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER (+11 more)

### Community 4 - "GatewayConfig"
Cohesion: 0.08
Nodes (30): PendingSecretsItem, assertInteractiveAllowed(), CliRateLimit, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable (+22 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.06
Nodes (52): metadata, metadata, metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS (+44 more)

### Community 6 - "provider-error.mapper.ts"
Cohesion: 0.19
Nodes (20): ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 7 - "logging.module.ts"
Cohesion: 0.06
Nodes (24): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+16 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.11
Nodes (34): ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic(), resolveAnthropicOutputConfig(), ContentBlockParam (+26 more)

### Community 9 - "cli.module.ts"
Cohesion: 0.06
Nodes (61): AgentReport, AgentReportStatus, loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime() (+53 more)

### Community 10 - "InMemoryRunSseHub"
Cohesion: 0.27
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 11 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 12 - "social.graph.ts"
Cohesion: 0.14
Nodes (33): renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine() (+25 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.07
Nodes (55): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData (+47 more)

### Community 14 - "run-result-editor.tsx"
Cohesion: 0.04
Nodes (62): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+54 more)

### Community 15 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.07
Nodes (51): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDoneEvent, fromGatewayToolCallDto() (+43 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.14
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 18 - "anthropic-messages.controller.ts"
Cohesion: 0.07
Nodes (36): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+28 more)

### Community 19 - "users-view.tsx"
Cohesion: 0.09
Nodes (36): metadata, CancelRunDialogProps, FALLBACK, StartRunDraft, LogoutDialogProps, createInvitation(), fetchInvitations(), resendInvitation() (+28 more)

### Community 20 - "app-metrics-backend.interface.ts"
Cohesion: 0.13
Nodes (13): healthStatusToGaugeValue(), AppProviderCallContext, AppProviderStreamScope, AppRequestMethod, AppRequestStatus, AppTokenUsage, HealthComponent, HealthMetricsSnapshot (+5 more)

### Community 21 - "configuration-validation.service.ts"
Cohesion: 0.29
Nodes (6): assertEnabledProviderSecretsPresent(), configurationValidation, ConfigurationValidationService, validate(), ValidatedEnvironment, RawGatewayConfig

### Community 22 - "provider-instances.bootstrap.ts"
Cohesion: 0.14
Nodes (17): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+9 more)

### Community 23 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (56): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+48 more)

### Community 24 - "app-metrics.service.ts"
Cohesion: 0.09
Nodes (21): HealthModule, Module, HealthCheckResult, HealthRedisCheckResult, AiMetricsModule, Global, Module, AppMetricsModule (+13 more)

### Community 25 - "own-runs-provider.tsx"
Cohesion: 0.13
Nodes (20): assertNever(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome, runTerminalToastId() (+12 more)

### Community 26 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (4): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppRequestLabels

### Community 27 - "in-process-run.worker.ts"
Cohesion: 0.13
Nodes (16): AutoFinalizeExpiredReviewsUseCase, Injectable, Inject, RecoverInterruptedRunsUseCase, Inject, Injectable, RunLifecycleService, TransitionExtras (+8 more)

### Community 28 - "api/src/main.ts"
Cohesion: 0.60
Nodes (4): bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig()

### Community 29 - "ModelAddCommand"
Cohesion: 0.33
Nodes (3): ModelAddCommand, Command, Option

### Community 30 - "users.controller.ts"
Cohesion: 0.08
Nodes (24): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Injectable (+16 more)

### Community 31 - "HealthService"
Cohesion: 0.15
Nodes (6): HealthReadinessResponseDto, ApiProperty, HealthService, Inject, Injectable, Optional

### Community 32 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (23): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+15 more)

### Community 33 - "types/index.ts"
Cohesion: 0.12
Nodes (30): getClientConversationId(), getOrCreateConversationIdForResponse(), RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createConversationId(), createRequestId(), isAttemptNumber() (+22 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 36 - "runs.types.ts"
Cohesion: 0.06
Nodes (77): ArchiveRunsQuery, fetchUserRuns(), InitiatorOption, isUserRating(), patchRunRating(), HitlAccepted, isPageOutlineSectionRole(), isReelDuration() (+69 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.19
Nodes (16): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+8 more)

### Community 39 - "DomainException"
Cohesion: 0.08
Nodes (43): AcceptInviteResult, acceptInviteSchema, ActivateAccountOutput, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs() (+35 more)

### Community 40 - "chat-provider-call.service.ts"
Cohesion: 0.05
Nodes (66): buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), clamp(), isOverrideKey(), resolveProviderCallOptions(), buildRetryPolicyFromResolved() (+58 more)

### Community 41 - "PrismaRunAdapter"
Cohesion: 0.12
Nodes (5): RunSnapshot, RunLogEntry, assertTransition(), PrismaRunAdapter, Injectable

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.11
Nodes (22): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam (+14 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "responses.adapter.ts"
Cohesion: 0.22
Nodes (19): asInputTokens(), asOutputTokens(), asToolCallId(), getUsageMetadata(), getUsageMetadata(), buildResponsesCreateParams(), createResponsesAdapter(), textStream() (+11 more)

### Community 45 - "LoggingService"
Cohesion: 0.05
Nodes (25): RedisConnectionService, Injectable, Inject, OllamaEmbeddingAdapter, Injectable, Inject, isRedisRequiredFromConfig(), ChatProviderCooldownService (+17 more)

### Community 46 - "ProviderApiKey"
Cohesion: 0.17
Nodes (10): ProviderTestCommand, Command, Option, CliAiProvider, ProviderTestService, Injectable, ProviderCli, BaseUrl (+2 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 48 - "RefreshSessionRepository"
Cohesion: 0.05
Nodes (22): AcceptInviteUseCase, Inject, Injectable, ActivateAccountUseCase, Inject, Injectable, Inject, Inject (+14 more)

### Community 49 - "RunRepository"
Cohesion: 0.06
Nodes (9): Inject, Inject, Inject, Inject, Inject, Inject, Inject, Inject (+1 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.07
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 52 - "CompanyContext"
Cohesion: 0.23
Nodes (6): CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 53 - "config-generator.service.ts"
Cohesion: 0.10
Nodes (20): isRedisRequired(), ConfigGeneratorService, Injectable, FileManagerService, Injectable, BasicServerAnswers, CacheAnswers, MetricsAnswers (+12 more)

### Community 54 - "apiFetch"
Cohesion: 0.05
Nodes (72): metadata, geistMono, geistSans, metadata, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), ACTIVATION_FAILED_HINT (+64 more)

### Community 55 - "AppMetricsService"
Cohesion: 0.10
Nodes (6): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable, HttpMethod

### Community 56 - "content.graph.ts"
Cohesion: 0.07
Nodes (45): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+37 more)

### Community 57 - "google-tools.mapper.ts"
Cohesion: 0.17
Nodes (21): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+13 more)

### Community 58 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 59 - "SemanticCacheService"
Cohesion: 0.19
Nodes (11): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), SemanticCacheService (+3 more)

### Community 60 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "InProcessRunWorker"
Cohesion: 0.12
Nodes (4): InProcessRunWorker, Injectable, StubRunExecutor, Injectable

### Community 63 - "response-cache.service.ts"
Cohesion: 0.10
Nodes (19): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+11 more)

### Community 64 - "chat-completions.adapter.ts"
Cohesion: 0.21
Nodes (19): toHttpException(), asSystemFingerprint(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText() (+11 more)

### Community 65 - "InvitationsController"
Cohesion: 0.16
Nodes (9): InvitationsController, ApiCookieAuth, ApiTags, Controller, Delete, Get, HttpCode, Param (+1 more)

### Community 66 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 67 - "configuration.ts"
Cohesion: 0.20
Nodes (15): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration(), BuildEffectiveGatewayConfigOptions (+7 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "new-ids.ts"
Cohesion: 0.18
Nodes (7): ErrorEnvelope, HttpExceptionFilter, Catch, newInvitationId(), newRequestId(), RequestIdMiddleware, Injectable

### Community 70 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 71 - "runs.controller.ts"
Cohesion: 0.07
Nodes (35): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Injectable, GetRunLogsUseCase, Injectable, GetRunUseCase (+27 more)

### Community 72 - "llm-hop.ts"
Cohesion: 0.19
Nodes (13): LLM_GATEWAY_PORT, isRetryable(), RetryReason, isAbortError(), ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable() (+5 more)

### Community 73 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 74 - "UserRepository"
Cohesion: 0.06
Nodes (22): BootstrapStatusUseCase, Inject, Injectable, Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput (+14 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 77 - "openai-thinking-provider.mapper.ts"
Cohesion: 0.23
Nodes (13): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), ChatCompletionThinkingParam, isOpenAiEffortLevel(), isOpenAiReasoningRequested(), mapThinkingBudgetToEffort(), mapThinkingToResponsesReasoning() (+5 more)

### Community 78 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (19): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+11 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.16
Nodes (18): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+10 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "openai-params-provider.mapper.ts"
Cohesion: 0.24
Nodes (11): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+3 more)

### Community 82 - "config-validator.ts"
Cohesion: 0.29
Nodes (10): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, buildEffectiveGatewayConfig(), assertMasterKeyPresent() (+2 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "AuthController"
Cohesion: 0.14
Nodes (19): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+11 more)

### Community 85 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (52): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome() (+44 more)

### Community 86 - "KeyGenerateCommand"
Cohesion: 0.27
Nodes (3): KeyGenerateCommand, Command, Option

### Community 87 - "openai-messages.mapper.ts"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 88 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (11): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+3 more)

### Community 89 - ".chat"
Cohesion: 0.27
Nodes (4): LlmGatewayError, LlmGatewayHttpAdapter, Inject, Injectable

### Community 90 - "ai-provider-gateway/src/health/health.controller.ts"
Cohesion: 0.22
Nodes (10): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto (+2 more)

### Community 91 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 92 - "openai-chat-completions.controller.ts"
Cohesion: 0.04
Nodes (63): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+55 more)

### Community 93 - "openai-messages-provider.mapper.ts"
Cohesion: 0.28
Nodes (6): ProviderAssistantTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 94 - "provider-base-url.validation.ts"
Cohesion: 0.43
Nodes (6): assertEnabledProviderBaseUrlPresent(), collectMissingBaseUrlErrors(), formatMissingBaseUrlError(), MissingProviderBaseUrl, RawGatewayConfig, resolveBaseUrlFromEnv()

### Community 95 - "start-run.use-case.ts"
Cohesion: 0.11
Nodes (23): GetRunLogsOutput, contentBriefSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, runIdSchema (+15 more)

### Community 96 - "GatewayKey"
Cohesion: 0.06
Nodes (37): ChatModule, Module, ChatErrorHandlerService, Injectable, ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, isProviderRateLimitError(), UnsupportedProviderException (+29 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

### Community 99 - "ModelEditCommand"
Cohesion: 0.33
Nodes (3): ModelEditCommand, Command, Option

### Community 100 - "ClientRemoveCommand"
Cohesion: 0.33
Nodes (3): ClientRemoveCommand, Command, Option

### Community 101 - "save-output-edited.use-case.ts"
Cohesion: 0.08
Nodes (36): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+28 more)

### Community 102 - "gateway-config.schema.ts"
Cohesion: 0.08
Nodes (43): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel() (+35 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.15
Nodes (6): ProviderAddCommand, Command, Option, ProviderRemoveCommand, Command, Option

### Community 104 - "ProviderEditCommand"
Cohesion: 0.33
Nodes (3): ProviderEditCommand, Command, Option

### Community 106 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 107 - "ClientAddCommand"
Cohesion: 0.16
Nodes (6): ClientAddCommand, Command, Option, ClientEditCommand, Command, Option

### Community 110 - "chat.service.ts"
Cohesion: 0.07
Nodes (52): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+44 more)

### Community 111 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.33
Nodes (3): ModelRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.05
Nodes (48): FeedbackCta(), AgentsGateTooltip(), AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot() (+40 more)

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.19
Nodes (17): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+9 more)

### Community 118 - "auth.module.ts"
Cohesion: 0.05
Nodes (53): resendActivationSchema, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+45 more)

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 120 - "PrismaService"
Cohesion: 0.04
Nodes (41): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+33 more)

### Community 121 - "exitWithAgentReport"
Cohesion: 0.18
Nodes (10): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+2 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 130 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 145 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 146 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 147 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 149 - "run.port.ts"
Cohesion: 0.10
Nodes (21): ListRunsOutput, ListRunsUseCase, Inject, Injectable, LightRunItem, ListRunsQuery, ListRunsResult, PAGE_SIZE (+13 more)

### Community 150 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

## Knowledge Gaps
- **398 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+393 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1148 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `GatewayKey`, `types/index.ts`, `GatewayConfig`, `gateway-config.schema.ts`, `chat-provider-call.service.ts`, `branded.types.ts`, `chat.service.ts`, `redis-vector-store.adapter.ts`, `app-metrics-backend.interface.ts`, `config-generator.service.ts`, `AppMetricsService`, `asProviderInstanceId`, `app-metrics.service.ts`, `PrometheusAppMetricsAdapter`, `models.controller.ts`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `GatewayConfig`, `logging.module.ts`, `cli.module.ts`, `branded.types.ts`, `app-metrics-backend.interface.ts`, `asProviderInstanceId`, `app-metrics.service.ts`, `PrometheusAppMetricsAdapter`, `types/index.ts`, `chat-provider-call.service.ts`, `LoggingService`, `ProviderApiKey`, `config-generator.service.ts`, `AppMetricsService`, `models.controller.ts`, `configuration.ts`, `provider-base-url.validation.ts`, `GatewayKey`, `gateway-config.schema.ts`, `exitWithAgentReport`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `GatewayKey`, `swagger.setup.ts`, `chat-completions.adapter.ts`, `semantic-cache.service.ts`, `logging.module.ts`, `chat-provider-call.service.ts`, `anthropic/anthropic-tools.mapper.ts`, `responses.adapter.ts`, `branded.types.ts`, `chat.service.ts`, `redis-vector-store.adapter.ts`, `provider-instances.bootstrap.ts`, `app-metrics.service.ts`, `google-tools.mapper.ts`, `SemanticCacheService`, `HealthService`, `response-cache.service.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _398 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `auth.controller.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05060882800608828 - nodes in this community are weakly interconnected._
- **Should `get-run.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04963369963369963 - nodes in this community are weakly interconnected._
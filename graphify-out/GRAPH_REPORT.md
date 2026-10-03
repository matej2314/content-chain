# Graph Report - content-chain  (2026-10-03)

## Corpus Check
- 669 files · ~210,779 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4348 nodes · 13412 edges · 144 communities (129 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 405 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1de9b616`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- runs.controller.ts
- social.types.ts
- api/company-context.types.ts
- stream-cache-replay.service.ts
- google-tools.mapper.ts
- run-details-view.tsx
- provider-error.mapper.ts
- LogContext
- anthropic/anthropic-tools.mapper.ts
- cli.module.ts
- run-lifecycle.service.ts
- ConfigInitCommand
- social.graph.ts
- branded.types.ts
- run-result-editor.tsx
- chat-params.dto.ts
- anthropic-response.mapper.ts
- RedisVectorStoreAdapter
- resolve-provider-call-options.ts
- users-view.tsx
- runs.module.ts
- GatewayKey
- provider-registry.service.ts
- asClientId
- ai-provider-gateway/src/app.module.ts
- start-run-form.tsx
- types/index.ts
- EnvRef
- PrometheusAppMetricsAdapter
- ModelAddCommand
- users.controller.ts
- ai-provider-gateway/src/health/health.service.ts
- swagger.setup.ts
- resilient-executor.ts
- AnthropicMessagesRequestDto
- MetricsController
- runs.types.ts
- enums.ts
- feedback-form.tsx
- DomainException
- sentry-ai-metrics.adapter.ts
- PrismaRunAdapter
- openai-models.controller.ts
- ids.ts
- tooling-types.ts
- LoggingService
- run.port.ts
- anthropic-models.controller.ts
- PrismaRefreshSessionAdapter
- AppMetricsModule
- ListRunsQueryDto
- ModelAlias
- CompanyContext
- config-generator.service.ts
- apiFetch
- HttpMetricsMiddleware
- content.graph.ts
- health.api.ts
- metrics.ts
- semantic-cache.service.ts
- models.controller.ts
- company-context.dto.ts
- responses.adapter.ts
- logging.service.ts
- openai-params-provider.mapper.ts
- app-metrics.service.ts
- content.types.ts
- configuration.ts
- OpenAiChatCompletionRequestDto
- HttpExceptionFilter
- company-context.mapper.ts
- RunRepository
- ChatRequestDto
- prisma-invitation.adapter.ts
- UserRepository
- parse-verifier-log-message.ts
- PrismaSocialResultAdapter
- api/src/health/health.service.ts
- CompanyContextRepository
- llm-gateway.http.adapter.ts
- PrometheusService
- patch-company-context.use-case.ts
- ClientEditCommand
- SPEC — README
- AuthController
- api/src/app.module.ts
- asProviderInstanceId
- .getOne
- should-include-redis-stack.ts
- ProviderRemoveCommand
- resend-activation.use-case.ts
- .getOne
- anthropic-messages.controller.ts
- .getOne
- agent-answers.schema.ts
- StartRunDto
- api-error.code.ts
- route.ts
- envelope.ts
- ModelEditCommand
- ClientRemoveCommand
- save-output-edited.use-case.ts
- ProviderRegistryService
- ProviderAddCommand
- ProviderEditCommand
- InProcessRunWorker
- invite-user.use-case.ts
- ClientAddCommand
- openai-messages-provider.mapper.ts
- RunLifecycleService
- chat.service.ts
- HealthController
- ModelRemoveCommand
- redis-vector-store.adapter.ts
- cn
- resume-hitl.use-case.ts
- VectorStore
- domain/company-context.types.ts
- auth.module.ts
- CompanyContextController
- PrismaService
- .info
- run.types.ts
- GlobalExceptionFilter
- Architektura
- brand
- index-name.ts
- ConfigShowCommand
- GatewayCommand
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
- ChatParamsDto
- OpenAiChatMessageDto
- openai-chat-message.dto.ts
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

## Communities (144 total, 14 thin omitted)

### Community 0 - "runs.controller.ts"
Cohesion: 0.05
Nodes (47): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsUseCase, Injectable, GetRunUseCase, Inject, Injectable (+39 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (31): CompositeRunResultReader, GetRunOutput, RunResultReader, isSocialRunRecord(), SocialBrief, EmptyRunResultReader, Injectable, SocialPipelineFacade (+23 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (59): metadata, fetchCompanyContext(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+51 more)

### Community 3 - "stream-cache-replay.service.ts"
Cohesion: 0.23
Nodes (8): ChatCacheSource, GATEWAY_CACHE_HEADER, SseMetaPayload, SseMetaPayloadDto, ApiProperty, ApiPropertyOptional, STREAM_CACHE_REPLAY_CHUNK_SIZE, StreamCacheReplayInput

### Community 4 - "google-tools.mapper.ts"
Cohesion: 0.16
Nodes (22): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+14 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.06
Nodes (56): metadata, metadata, useSession(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS (+48 more)

### Community 6 - "provider-error.mapper.ts"
Cohesion: 0.16
Nodes (21): ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+13 more)

### Community 7 - "LogContext"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.11
Nodes (35): ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic(), resolveAnthropicOutputConfig(), ContentBlockParam (+27 more)

### Community 9 - "cli.module.ts"
Cohesion: 0.10
Nodes (38): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+30 more)

### Community 10 - "run-lifecycle.service.ts"
Cohesion: 0.17
Nodes (7): TransitionExtras, RUN_SSE_HUB, RunSseEvent, RunSseHub, InMemoryRunSseHub, Inject, Injectable

### Community 11 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (32): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.13
Nodes (32): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, mapStopReasonToFinishReason() (+24 more)

### Community 14 - "run-result-editor.tsx"
Cohesion: 0.04
Nodes (62): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+54 more)

### Community 15 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 17 - "RedisVectorStoreAdapter"
Cohesion: 0.21
Nodes (8): RedisVectorStoreAdapter, Injectable, isRedisSearchIndexAlreadyExistsError(), isRedisSearchMissingIndexError(), isRedisSearchModuleMissingError(), redisSearchErrorMessage(), semanticSchemaFtCreateArgs(), VectorStoreKnnInput

### Community 18 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 19 - "users-view.tsx"
Cohesion: 0.14
Nodes (22): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+14 more)

### Community 20 - "runs.module.ts"
Cohesion: 0.12
Nodes (17): AutoFinalizeExpiredReviewsUseCase, Injectable, CancelRunUseCase, Inject, Injectable, Inject, RecoverInterruptedRunsUseCase, Injectable (+9 more)

### Community 21 - "GatewayKey"
Cohesion: 0.07
Nodes (34): ChatService, Injectable, ApiBody, ApiOperation, ApiProduces, ApiResponse, Body, Post (+26 more)

### Community 22 - "provider-registry.service.ts"
Cohesion: 0.14
Nodes (20): CompleteOnceResult, ModelId, GatewayCapabilitiesConfig, GatewayParamsConfig, GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance() (+12 more)

### Community 23 - "asClientId"
Cohesion: 0.06
Nodes (50): KeyGenerateCommand, Command, Option, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema (+42 more)

### Community 24 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.10
Nodes (21): ChatModule, Module, GatewayKeyGuard, Injectable, AnthropicModule, Module, IntegrationsModule, Module (+13 more)

### Community 25 - "start-run-form.tsx"
Cohesion: 0.09
Nodes (39): metadata, assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput (+31 more)

### Community 26 - "types/index.ts"
Cohesion: 0.16
Nodes (23): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+15 more)

### Community 27 - "EnvRef"
Cohesion: 0.16
Nodes (16): PendingSecretsItem, collectPendingSecrets(), CliAiProvider, EnvPatchService, EnvPatchValue, Injectable, ClientCli, ProviderCli (+8 more)

### Community 28 - "PrometheusAppMetricsAdapter"
Cohesion: 0.11
Nodes (6): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 29 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 30 - "users.controller.ts"
Cohesion: 0.06
Nodes (30): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Injectable (+22 more)

### Community 31 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.10
Nodes (18): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty (+10 more)

### Community 32 - "swagger.setup.ts"
Cohesion: 0.04
Nodes (58): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional (+50 more)

### Community 33 - "resilient-executor.ts"
Cohesion: 0.16
Nodes (19): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+11 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 36 - "runs.types.ts"
Cohesion: 0.07
Nodes (66): ArchiveRunsQuery, isUserRating(), patchRunRating(), HitlAccepted, isPageOutlineSectionRole(), isReelDuration(), PageOutlineSection, parseArray() (+58 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.19
Nodes (16): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+8 more)

### Community 39 - "DomainException"
Cohesion: 0.09
Nodes (30): AcceptInviteResult, acceptInviteSchema, ActivateAccountOutput, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs() (+22 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+20 more)

### Community 41 - "PrismaRunAdapter"
Cohesion: 0.11
Nodes (5): RunSnapshot, RunLogEntry, assertTransition(), PrismaRunAdapter, Injectable

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.27
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "tooling-types.ts"
Cohesion: 0.14
Nodes (22): fromGatewayToolCallDto(), toGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto (+14 more)

### Community 45 - "LoggingService"
Cohesion: 0.06
Nodes (18): RedisConnectionService, Injectable, Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, isRedisRequiredFromConfig() (+10 more)

### Community 46 - "run.port.ts"
Cohesion: 0.13
Nodes (18): ListRunsOutput, LightRunItem, ListRunsQuery, ListRunsResult, PAGE_SIZE, RunStartedBy, RunRecordBase, ALLOWED_RUN_STATES (+10 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.28
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 48 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 49 - "AppMetricsModule"
Cohesion: 0.20
Nodes (9): AiMetricsModule, Global, Module, AppMetricsModule, Global, Module, ObservabilityModule, Global (+1 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.05
Nodes (10): ProviderTestOptions, AddModelInput, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsService, Inject (+2 more)

### Community 52 - "CompanyContext"
Cohesion: 0.29
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 53 - "config-generator.service.ts"
Cohesion: 0.07
Nodes (23): ConfigGeneratorService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, FileManagerService, Injectable, BasicServerAnswers (+15 more)

### Community 54 - "apiFetch"
Cohesion: 0.08
Nodes (44): geistMono, geistSans, metadata, acceptInvite(), activateAccount(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+36 more)

### Community 56 - "content.graph.ts"
Cohesion: 0.11
Nodes (37): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+29 more)

### Community 57 - "health.api.ts"
Cohesion: 0.27
Nodes (11): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+3 more)

### Community 58 - "metrics.ts"
Cohesion: 0.09
Nodes (33): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+25 more)

### Community 59 - "semantic-cache.service.ts"
Cohesion: 0.08
Nodes (25): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, EmbeddingCircuitBreaker, isSingleTurnUserRequest(), lastUserMessageText() (+17 more)

### Community 60 - "models.controller.ts"
Cohesion: 0.23
Nodes (10): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "responses.adapter.ts"
Cohesion: 0.12
Nodes (39): mapProviderResponseToAiObservation(), toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), getUsageMetadata() (+31 more)

### Community 63 - "logging.service.ts"
Cohesion: 0.10
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 64 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 65 - "app-metrics.service.ts"
Cohesion: 0.14
Nodes (16): healthStatusToGaugeValue(), APP_METRICS_BACKEND, AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus (+8 more)

### Community 66 - "content.types.ts"
Cohesion: 0.11
Nodes (13): ContentPipelineInput, ContentPipelineState, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole, VerifierVerdict (+5 more)

### Community 67 - "configuration.ts"
Cohesion: 0.06
Nodes (48): CliValidateOptions, asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, collectInactiveProviderWarnings() (+40 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 70 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 71 - "RunRepository"
Cohesion: 0.08
Nodes (6): Inject, Inject, Inject, Inject, RunRepository, RunRecord

### Community 72 - "ChatRequestDto"
Cohesion: 0.09
Nodes (24): ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsObject, IsOptional (+16 more)

### Community 73 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 74 - "UserRepository"
Cohesion: 0.05
Nodes (26): Inject, Inject, Inject, Inject, Inject, Inject, AccountActivationRecord, AccountActivationRepository (+18 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "PrismaSocialResultAdapter"
Cohesion: 0.10
Nodes (9): OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable, toInputJson(), PipelineState, PrismaSocialResultAdapter (+1 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.06
Nodes (31): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+23 more)

### Community 78 - "CompanyContextRepository"
Cohesion: 0.21
Nodes (11): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PutCompanyContextUseCase, Inject (+3 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.05
Nodes (41): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+33 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "patch-company-context.use-case.ts"
Cohesion: 0.27
Nodes (8): toPublicCompanyContext(), PatchCompanyContextUseCase, Inject, Injectable, assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 82 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "AuthController"
Cohesion: 0.06
Nodes (39): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+31 more)

### Community 85 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (47): AppModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor (+39 more)

### Community 86 - "asProviderInstanceId"
Cohesion: 0.06
Nodes (63): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens() (+55 more)

### Community 87 - ".getOne"
Cohesion: 0.19
Nodes (10): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 88 - "should-include-redis-stack.ts"
Cohesion: 0.10
Nodes (23): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+15 more)

### Community 89 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 90 - "resend-activation.use-case.ts"
Cohesion: 0.09
Nodes (18): ActivateAccountInput, activateAccountSchema, BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema (+10 more)

### Community 91 - ".getOne"
Cohesion: 0.19
Nodes (10): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 92 - "anthropic-messages.controller.ts"
Cohesion: 0.05
Nodes (48): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+40 more)

### Community 93 - ".getOne"
Cohesion: 0.19
Nodes (10): ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 94 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "api-error.code.ts"
Cohesion: 0.11
Nodes (20): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, PayloadTooLargeError, RequestWithId, resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), enrichRequestWithClientId() (+12 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "envelope.ts"
Cohesion: 0.06
Nodes (41): ACTIVATION_FAILED_HINT, GuestView, HomeEntry(), RegisterSuccess, RegisterFieldErrors, fetchCompleteness(), CompletenessState, CompletenessChip() (+33 more)

### Community 99 - "ModelEditCommand"
Cohesion: 0.33
Nodes (3): ModelEditCommand, Command, Option

### Community 100 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 101 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (32): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+24 more)

### Community 102 - "ProviderRegistryService"
Cohesion: 0.14
Nodes (7): ChatValidationService, Injectable, GatewayModelConfig, ProviderInstancesBootstrap, Injectable, ProviderRegistryService, Injectable

### Community 103 - "ProviderAddCommand"
Cohesion: 0.31
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "ProviderEditCommand"
Cohesion: 0.33
Nodes (3): ProviderEditCommand, Command, Option

### Community 105 - "InProcessRunWorker"
Cohesion: 0.16
Nodes (4): InProcessRunWorker, Injectable, Inject, Inject

### Community 106 - "invite-user.use-case.ts"
Cohesion: 0.05
Nodes (39): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+31 more)

### Community 107 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 108 - "openai-messages-provider.mapper.ts"
Cohesion: 0.27
Nodes (7): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 109 - "RunLifecycleService"
Cohesion: 0.16
Nodes (6): Inject, RunLifecycleService, Inject, Injectable, StubRunExecutor, Injectable

### Community 110 - "chat.service.ts"
Cohesion: 0.12
Nodes (27): SemanticStoreEmbedState, CacheIdentityMessage, CachedChatResponseWithConversation, isCachedChatAllowedForModelAlias(), shouldStoreChatResponse(), createInProcessSingleflight(), getResolvedSystemPrompts(), SYSTEM_PROMPT_SECTION_JOINER (+19 more)

### Community 111 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.33
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "redis-vector-store.adapter.ts"
Cohesion: 0.28
Nodes (12): isUnservableCachedReply(), parseCachedChatResponse(), escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits(), VectorSearchHit, VectorStorePartition (+4 more)

### Community 114 - "cn"
Cohesion: 0.05
Nodes (60): metadata, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), AcceptInviteForm(), onSubmit(), AcceptInviteFormProps, LoginCardProps (+52 more)

### Community 115 - "resume-hitl.use-case.ts"
Cohesion: 0.15
Nodes (14): GetRunLogsOutput, contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand (+6 more)

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 118 - "auth.module.ts"
Cohesion: 0.06
Nodes (51): AcceptInviteUseCase, Injectable, ActivateAccountUseCase, Injectable, AuthTokenResult, BootstrapAdminUseCase, Inject, Injectable (+43 more)

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 120 - "PrismaService"
Cohesion: 0.05
Nodes (37): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+29 more)

### Community 121 - ".info"
Cohesion: 0.12
Nodes (11): toSafeConfigSnapshot(), ProviderTestCommand, Command, Option, WizardState, ProviderTestService, Injectable, Injectable (+3 more)

### Community 122 - "run.types.ts"
Cohesion: 0.24
Nodes (13): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, ContentRunRecord, SocialRunRecord, makeContentRun() (+5 more)

### Community 123 - "GlobalExceptionFilter"
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 126 - "index-name.ts"
Cohesion: 0.47
Nodes (5): normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), SEMANTIC_CACHE_PROJECT_ID

### Community 127 - "ConfigShowCommand"
Cohesion: 0.40
Nodes (3): ConfigShowCommand, Command, Option

### Community 146 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 147 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 150 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

## Knowledge Gaps
- **411 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+406 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1160 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `resilient-executor.ts`, `app-metrics.service.ts`, `stream-cache-replay.service.ts`, `types/index.ts`, `sentry-ai-metrics.adapter.ts`, `branded.types.ts`, `chat.service.ts`, `redis-vector-store.adapter.ts`, `GatewayKey`, `config-generator.service.ts`, `asClientId`, `asProviderInstanceId`, `provider-registry.service.ts`, `metrics.ts`, `EnvRef`, `PrometheusAppMetricsAdapter`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `api-error.code.ts`, `app-metrics.service.ts`, `stream-cache-replay.service.ts`, `types/index.ts`, `configuration.ts`, `ProviderRegistryService`, `LogContext`, `sentry-ai-metrics.adapter.ts`, `branded.types.ts`, `PrometheusAppMetricsAdapter`, `GatewayKey`, `provider-registry.service.ts`, `asClientId`, `config-generator.service.ts`, `.info`, `metrics.ts`, `EnvRef`, `asProviderInstanceId`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `api-error.code.ts`, `resilient-executor.ts`, `swagger.setup.ts`, `stream-cache-replay.service.ts`, `google-tools.mapper.ts`, `ProviderRegistryService`, `LogContext`, `anthropic/anthropic-tools.mapper.ts`, `GlobalExceptionFilter`, `chat.service.ts`, `redis-vector-store.adapter.ts`, `RedisVectorStoreAdapter`, `GatewayKey`, `provider-registry.service.ts`, `semantic-cache.service.ts`, `ai-provider-gateway/src/health/health.service.ts`, `responses.adapter.ts`, `logging.service.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _411 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `runs.controller.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04982456140350877 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06106442577030812 - nodes in this community are weakly interconnected._
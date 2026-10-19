# Graph Report - content-chain  (2026-10-19)

## Corpus Check
- 711 files · ~252,076 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4739 nodes · 15414 edges · 121 communities (108 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 421 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d7a24bbe`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- auth.module.ts
- get-run.use-case.ts
- company-context-form.tsx
- cli.module.ts
- asProviderInstanceId
- branded.types.ts
- chat.module.ts
- logging.service.ts
- packages_shared_dist_index
- anthropic/anthropic-tools.mapper.ts
- ref_react
- dashboard-shell.tsx
- archive-runs-view.tsx
- prisma-run.adapter.ts
- cn
- api-error.code.ts
- google-tools.mapper.ts
- model-manager.service.ts
- exitWithAgentReport
- runs.types.ts
- AuthController
- provider-input.ts
- configuration.ts
- prisma-account-activation.adapter.ts
- redis-vector-store.adapter.ts
- feedback-form.tsx
- semantic-cache.service.ts
- types/index.ts
- chat-completions.adapter.ts
- invite-user.use-case.ts
- RefreshSessionRepository
- export-openapi.ts
- company-context.controller.ts
- LoggingService
- AnthropicMessagesRequestDto
- openai-params-provider.mapper.ts
- run-result-view.tsx
- enums.ts
- run-review-panel.tsx
- semantic-cache.constants.ts
- sentry-ai-metrics.adapter.ts
- ConfigInitCommand
- run.schemas.ts
- ids.ts
- Env
- ai-provider-gateway/src/app.module.ts
- save-output-edited.use-case.ts
- DomainException
- ref_nestjs_swagger
- anthropic-response.mapper.ts
- responses.adapter.ts
- ref_uuid
- .createMessage
- ai-provider-gateway/src/health/health.service.ts
- content.graph.ts
- cancel-run-dialog.tsx
- CompanyContextRepository
- start-run-form.tsx
- RedisConnectionService
- StartRunDto
- AuthUserContext
- OpenAiChatCompletionRequestDto
- RunRepository
- openai-chat-completions.controller.ts
- anthropic-messages.controller.ts
- ModelEditCommand
- llm-gateway.http.adapter.ts
- openai-messages-provider.mapper.ts
- VectorStore
- app-metrics/metrics.controller.ts
- KeyGenerateCommand
- BootstrapAdminDto
- packages_shared_dist_index_userid
- api/src/app.module.ts
- InMemoryRunSseHub
- parse-verifier-log-message.ts
- ClientAddCommand
- api/src/health/health.service.ts
- ClientEditCommand
- company-context.schemas.ts
- PrometheusService
- ModelAddCommand
- ProviderRemoveCommand
- SPEC — README
- RegisterUserDto
- app/layout.tsx
- LoginDto
- company-context.dto.ts
- ProviderEditCommand
- ClientRemoveCommand
- api/src/main.ts
- ModelAlias
- agent-answers.schema.ts
- llm-hop.ts
- ListRunsQueryDto
- route.ts
- GatewayConfig
- openai-models.controller.ts
- ProviderAddCommand
- response-cache.service.ts
- ref_nestjs_common
- users-view.tsx
- ModelRemoveCommand
- domain/company-context.types.ts
- JwtAuthGuard
- HttpExceptionFilter
- Architektura
- brand.ts
- assert-company-context-writable.ts
- CompanyContextController
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
2. `DomainException` - 84 edges
3. `ProviderInstanceId` - 81 edges
4. `LoggingService` - 73 edges
5. `asProviderInstanceId()` - 67 edges
6. `isRecord()` - 67 edges
7. `GatewayConfig` - 65 edges
8. `cn()` - 65 edges
9. `AuthUserContext` - 62 edges
10. `GatewayKey` - 59 edges

## Surprising Connections (you probably didn't know these)
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `Request` --references--> `AuthUserContext`  [EXTRACTED]
  apps/api/src/shared/http/express.d.ts → apps/api/src/shared/types/auth-user-context.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (121 total, 12 thin omitted)

### Community 0 - "auth.module.ts"
Cohesion: 0.03
Nodes (77): AcceptInviteUseCase, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Inject, Injectable, ActivateAccountInput, activateAccountSchema (+69 more)

### Community 1 - "get-run.use-case.ts"
Cohesion: 0.05
Nodes (30): CompositeRunResultReader, GetRunGuestAccess, GetRunOutput, RunResultReader, ContentBrief, SocialBrief, EmptyRunResultReader, Injectable (+22 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.05
Nodes (70): metadata, putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+62 more)

### Community 3 - "cli.module.ts"
Cohesion: 0.03
Nodes (85): isRedisRequired(), CliModule, Module, ClientListOptions, toSafeClientList(), ConfigShowOptions, toSafeConfigSnapshot(), ConfigValidateCommand (+77 more)

### Community 4 - "asProviderInstanceId"
Cohesion: 0.06
Nodes (63): isRedisSearchTagSafeId(), AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), PendingSecretsItem, assertInteractiveAllowed(), collectPendingSecrets() (+55 more)

### Community 5 - "branded.types.ts"
Cohesion: 0.03
Nodes (118): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, SemanticStoreEmbedState, CachedChatResponse, CachedChatWarning, CachedFinishReason, CacheIdentityMessage (+110 more)

### Community 6 - "chat.module.ts"
Cohesion: 0.05
Nodes (49): ChatController, ApiSecurity, ApiTags, Controller, ChatStreamController, ApiBody, ApiOperation, ApiProduces (+41 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.06
Nodes (23): LEVEL_ORDER, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable, SentryErrorReportingAdapter, Injectable (+15 more)

### Community 8 - "packages_shared_dist_index"
Cohesion: 0.05
Nodes (53): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase (+45 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.10
Nodes (42): mapProviderResponseToAiObservation(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+34 more)

### Community 10 - "ref_react"
Cohesion: 0.04
Nodes (103): ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), ACTIVATION_FAILED_HINT, acceptInvite(), activateAccount(), bootstrapAdmin() (+95 more)

### Community 11 - "dashboard-shell.tsx"
Cohesion: 0.06
Nodes (42): fetchCompleteness(), CompletenessState, GATE_SECTION_LABELS, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE (+34 more)

### Community 12 - "archive-runs-view.tsx"
Cohesion: 0.05
Nodes (59): metadata, metadata, useSession(), useGuestLocked(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS (+51 more)

### Community 13 - "prisma-run.adapter.ts"
Cohesion: 0.06
Nodes (35): ListRunsOutput, LightRunItem, ListRunsQuery, ListRunsResult, PAGE_SIZE, RunSnapshot, RunStartedBy, RunSummaryAggregate (+27 more)

### Community 14 - "cn"
Cohesion: 0.05
Nodes (59): DemoChip(), useDemoMode(), GuestLimitModal(), GuestLimitModalProps, FeedbackCta(), EMPTY_START_DRAFT, StartRunDraft, AgentsGateTooltip() (+51 more)

### Community 15 - "api-error.code.ts"
Cohesion: 0.14
Nodes (24): ChatErrorHandlerService, Injectable, ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus() (+16 more)

### Community 16 - "google-tools.mapper.ts"
Cohesion: 0.15
Nodes (23): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+15 more)

### Community 17 - "model-manager.service.ts"
Cohesion: 0.13
Nodes (26): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable (+18 more)

### Community 18 - "exitWithAgentReport"
Cohesion: 0.11
Nodes (22): exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), resolveCliMode(), ClientListCommand (+14 more)

### Community 19 - "runs.types.ts"
Cohesion: 0.04
Nodes (111): parseAudienceProfile(), parseCaseStudy(), parseCompanyContext(), parseCtaItem(), parseExtras(), parseObjection(), parseOfferItem(), parseStringArray() (+103 more)

### Community 20 - "AuthController"
Cohesion: 0.14
Nodes (18): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+10 more)

### Community 21 - "provider-input.ts"
Cohesion: 0.28
Nodes (11): toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns(), composeSystemPrompt(), ChatAssistantMessage, ChatMessage, ChatToolMessage, ChatUserMessage (+3 more)

### Community 22 - "configuration.ts"
Cohesion: 0.08
Nodes (35): REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, asSemanticCacheTtlSeconds(), collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions (+27 more)

### Community 23 - "prisma-account-activation.adapter.ts"
Cohesion: 0.18
Nodes (8): AccountActivationRecord, CreatePendingUser, RotateActivationTokenInput, ActivationRow, PrismaAccountActivationAdapter, Injectable, UserRow, packages_shared_dist_index_createaccountactivationid

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.15
Nodes (19): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+11 more)

### Community 25 - "feedback-form.tsx"
Cohesion: 0.14
Nodes (22): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+14 more)

### Community 26 - "semantic-cache.service.ts"
Cohesion: 0.07
Nodes (27): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend (+19 more)

### Community 27 - "types/index.ts"
Cohesion: 0.07
Nodes (48): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+40 more)

### Community 28 - "chat-completions.adapter.ts"
Cohesion: 0.18
Nodes (21): toHttpException(), asSystemFingerprint(), ProviderChatInput, ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas() (+13 more)

### Community 29 - "invite-user.use-case.ts"
Cohesion: 0.04
Nodes (60): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+52 more)

### Community 30 - "RefreshSessionRepository"
Cohesion: 0.10
Nodes (9): Inject, Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter (+1 more)

### Community 31 - "export-openapi.ts"
Cohesion: 0.12
Nodes (17): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+9 more)

### Community 32 - "company-context.controller.ts"
Cohesion: 0.23
Nodes (12): toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase (+4 more)

### Community 33 - "LoggingService"
Cohesion: 0.10
Nodes (13): Inject, Inject, StreamCacheReplayService, Injectable, ConsoleLoggerAdapter, Injectable, LogContext, LoggingService (+5 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.05
Nodes (49): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+41 more)

### Community 35 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 36 - "run-result-view.tsx"
Cohesion: 0.07
Nodes (22): PAGE_OUTLINE_ROLE_LABELS, submitHitl(), PageDocument, PageOutline, parseHitlAccepted(), ReelIdea, SocialIdea, FALLBACK (+14 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "run-review-panel.tsx"
Cohesion: 0.09
Nodes (32): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+24 more)

### Community 39 - "semantic-cache.constants.ts"
Cohesion: 0.25
Nodes (9): normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_PROBE_TIMEOUT_MS, GATEWAY_HEALTHCHECK_TIMEOUT_MS, SEMANTIC_CACHE_PROJECT_ID, SEMANTIC_SCHEMA_TAG_FIELDS (+1 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.09
Nodes (28): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+20 more)

### Community 41 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 42 - "run.schemas.ts"
Cohesion: 0.13
Nodes (15): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+7 more)

### Community 43 - "ids.ts"
Cohesion: 0.09
Nodes (32): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createFeedbackId() (+24 more)

### Community 44 - "Env"
Cohesion: 0.05
Nodes (37): readCookie(), isRecord(), JwtCookieStrategy, Inject, Injectable, AutoFinalizeExpiredReviewsUseCase, Inject, Injectable (+29 more)

### Community 45 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.09
Nodes (24): ChatModule, Module, HealthModule, Module, AnthropicModule, Module, IntegrationsModule, Module (+16 more)

### Community 46 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (33): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+25 more)

### Community 47 - "DomainException"
Cohesion: 0.10
Nodes (32): AcceptInviteResult, acceptInviteSchema, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds() (+24 more)

### Community 48 - "ref_nestjs_swagger"
Cohesion: 0.04
Nodes (73): ChatOutputTextDto, ApiProperty, ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional (+65 more)

### Community 49 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 50 - "responses.adapter.ts"
Cohesion: 0.26
Nodes (16): asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse() (+8 more)

### Community 51 - "ref_uuid"
Cohesion: 0.24
Nodes (7): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable, ref_uuid

### Community 52 - ".createMessage"
Cohesion: 0.05
Nodes (37): ApiHeader, ApiBody, ApiOperation, ApiResponse, Body, Post, Req, toChatResponseDto() (+29 more)

### Community 53 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.05
Nodes (40): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisConsumer, RedisRequirementSnapshot, resolveCacheForRequirement() (+32 more)

### Community 54 - "content.graph.ts"
Cohesion: 0.07
Nodes (52): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+44 more)

### Community 55 - "cancel-run-dialog.tsx"
Cohesion: 0.20
Nodes (15): assertNever(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome, runTerminalToastId() (+7 more)

### Community 56 - "CompanyContextRepository"
Cohesion: 0.16
Nodes (8): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 57 - "start-run-form.tsx"
Cohesion: 0.12
Nodes (29): fetchCompanyContext(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode, isGuestAllowedTaskType() (+21 more)

### Community 58 - "RedisConnectionService"
Cohesion: 0.22
Nodes (5): RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 59 - "StartRunDto"
Cohesion: 0.22
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 60 - "AuthUserContext"
Cohesion: 0.05
Nodes (55): InviteUserDto, ApiProperty, IsEmail, PatchUserDto, ApiProperty, IsBoolean, InvitationsController, ApiCookieAuth (+47 more)

### Community 61 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (34): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+26 more)

### Community 62 - "RunRepository"
Cohesion: 0.05
Nodes (23): Inject, InProcessRunWorker, Inject, Injectable, RunAbortRegistry, Injectable, RunLifecycleService, TransitionExtras (+15 more)

### Community 63 - "openai-chat-completions.controller.ts"
Cohesion: 0.16
Nodes (22): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+14 more)

### Community 64 - "anthropic-messages.controller.ts"
Cohesion: 0.06
Nodes (37): GATEWAY_CACHE_HEADER, ApiAnthropicErrorResponses(), ApiRequestIdHeader(), HealthLivenessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation (+29 more)

### Community 65 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 66 - "llm-gateway.http.adapter.ts"
Cohesion: 0.10
Nodes (25): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+17 more)

### Community 67 - "openai-messages-provider.mapper.ts"
Cohesion: 0.27
Nodes (7): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 68 - "VectorStore"
Cohesion: 0.22
Nodes (3): VectorStore, Inject, Optional

### Community 69 - "app-metrics/metrics.controller.ts"
Cohesion: 0.20
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 70 - "KeyGenerateCommand"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 71 - "BootstrapAdminDto"
Cohesion: 0.40
Nodes (5): BootstrapAdminDto, ApiProperty, IsEmail, IsString, MinLength

### Community 72 - "packages_shared_dist_index_userid"
Cohesion: 0.04
Nodes (52): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+44 more)

### Community 73 - "api/src/app.module.ts"
Cohesion: 0.04
Nodes (63): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor (+55 more)

### Community 74 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (26): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+18 more)

### Community 78 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 79 - "company-context.schemas.ts"
Cohesion: 0.33
Nodes (5): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema

### Community 80 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 81 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 82 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "RegisterUserDto"
Cohesion: 0.40
Nodes (5): RegisterUserDto, ApiProperty, IsEmail, IsString, MinLength

### Community 85 - "app/layout.tsx"
Cohesion: 0.14
Nodes (10): metadata, apps_frontend_src_app_globals, AcceptInvitePage(), metadata, tokenFromSearchParam(), geistMono, inter, metadata (+2 more)

### Community 86 - "LoginDto"
Cohesion: 0.40
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 89 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 90 - "api/src/main.ts"
Cohesion: 0.21
Nodes (10): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig(), ref_cookie_parser, ref_helmet (+2 more)

### Community 91 - "ModelAlias"
Cohesion: 0.04
Nodes (33): KeyGenerateOptions, ProviderTestOptions, CliAiModel, HttpMetricsMiddleware, Injectable, ClientId, ModelAlias, ProviderInstanceId (+25 more)

### Community 92 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (22): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+14 more)

### Community 93 - "llm-hop.ts"
Cohesion: 0.07
Nodes (56): Inject, CompileContentGraphOptions, LlmGatewayError, RUN_LIFECYCLE, RunLifecyclePort, isSocialRunRecord(), ChatJsonInput, hopUserContent() (+48 more)

### Community 95 - "ListRunsQueryDto"
Cohesion: 0.13
Nodes (13): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+5 more)

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "GatewayConfig"
Cohesion: 0.07
Nodes (35): convertRateLimit(), CliRateLimit, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService (+27 more)

### Community 102 - "openai-models.controller.ts"
Cohesion: 0.06
Nodes (43): ApiGatewayModelsErrorResponses(), ApiOpenAiErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, OpenAiChatCompletionsController, ApiSecurity, ApiTags (+35 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 109 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (17): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, CacheModule, CacheModuleOptions (+9 more)

### Community 110 - "ref_nestjs_common"
Cohesion: 0.05
Nodes (35): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+27 more)

### Community 111 - "users-view.tsx"
Cohesion: 0.08
Nodes (39): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+31 more)

### Community 114 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.13
Nodes (24): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+16 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand.ts"
Cohesion: 0.33
Nodes (3): unbrand, RunTaskType, RunsSummaryResponse

### Community 126 - "assert-company-context-writable.ts"
Cohesion: 0.32
Nodes (6): assertAudienceProfileNamesUnique(), assertCompanyContextWritable(), isComplete(), normalizeAudienceName(), withEffectiveAudience(), createLoadContextNode()

### Community 129 - "CompanyContextController"
Cohesion: 0.13
Nodes (11): toCompanyContext(), toPartialCompanyContext(), CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller (+3 more)

## Knowledge Gaps
- **478 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+473 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1284 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `isRunId()` connect `ids.ts` to `run.schemas.ts`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `AuthUserContext` connect `AuthUserContext` to `auth.module.ts`, `get-run.use-case.ts`, `packages_shared_dist_index_userid`, `packages_shared_dist_index`, `api/src/app.module.ts`, `Env`, `save-output-edited.use-case.ts`, `DomainException`, `ref_nestjs_common`, `AuthController`, `RunRepository`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `AppMetricsBackend` connect `ModelAlias` to `ai-provider-gateway/src/health/health.service.ts`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _478 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `auth.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03018740882055886 - nodes in this community are weakly interconnected._
- **Should `get-run.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.054627911770768915 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.052782558806655194 - nodes in this community are weakly interconnected._
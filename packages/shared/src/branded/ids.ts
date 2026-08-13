import { brand, type Brand } from './brand';

// ---------------------------------------------------------------------------
// Typy identyfikatorów — formaty z docs/brand_types.md
// ---------------------------------------------------------------------------

export type RequestId = Brand<string, 'RequestId'>;
export type ConversationId = Brand<string, 'ConversationId'>;
export type UserId = Brand<string, 'UserId'>;
export type RunId = Brand<string, 'RunId'>;
export type GatewayModelAlias = Brand<string, 'GatewayModelAlias'>;

// ---------------------------------------------------------------------------
// Wzorce (norma: format zgodny z ai-provider-gateway dla RequestId/ConversationId)
// ---------------------------------------------------------------------------

const UUID_PART = '[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
const REQUEST_ID_RE = new RegExp(`^req_${UUID_PART}$`, 'i');
const CONV_ID_RE = new RegExp(`^conv_${UUID_PART}$`, 'i');
const USER_ID_RE = new RegExp(`^usr_${UUID_PART}$`, 'i');
const RUN_ID_RE = new RegExp(`^run_${UUID_PART}$`, 'i');

// ---------------------------------------------------------------------------
// RequestId — nadaje middleware apps/api; klient NIE generuje
// ---------------------------------------------------------------------------

export const isRequestId = (value: string): value is RequestId => REQUEST_ID_RE.test(value);
export const createRequestId = (value: string): RequestId => {
	if (!isRequestId(value)) throw new Error('Invalid RequestId');
	return brand<RequestId>(value);
};

// ---------------------------------------------------------------------------
// ConversationId — tworzony przez apps/api przy starcie runu (jeden na run)
// ---------------------------------------------------------------------------

export const isConversationId = (value: string): value is ConversationId => CONV_ID_RE.test(value);
export const createConversationId = (value: string): ConversationId => {
	if (!isConversationId(value)) throw new Error('Invalid ConversationId');
	return brand<ConversationId>(value);
};

// ---------------------------------------------------------------------------
// UserId
// ---------------------------------------------------------------------------

export const isUserId = (value: string): value is UserId => USER_ID_RE.test(value);
export const createUserId = (value: string): UserId => {
	if (!isUserId(value)) throw new Error('Invalid UserId');
	return brand<UserId>(value);
};

// ---------------------------------------------------------------------------
// RunId
// ---------------------------------------------------------------------------

export const isRunId = (value: string): value is RunId => RUN_ID_RE.test(value);
export const createRunId = (value: string): RunId => {
	if (!isRunId(value)) throw new Error('Invalid RunId');
	return brand<RunId>(value);
};

// ---------------------------------------------------------------------------
// GatewayModelAlias — alias modelu z konfiguracji gateway; walidacja "niepusty"
// ---------------------------------------------------------------------------

export const isGatewayModelAlias = (value: string): value is GatewayModelAlias => value.trim().length > 0;
export const createGatewayModelAlias = (value: string): GatewayModelAlias => {
	if (!isGatewayModelAlias(value)) throw new Error('Invalid GatewayModelAlias');
	return brand<GatewayModelAlias>(value);
};

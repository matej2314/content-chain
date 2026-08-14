export class LlmGatewayError extends Error {
  constructor(
    message: string,
    public readonly gatewayCode: string | undefined,
    public readonly gatewayRequestId: string | undefined,
    public readonly retryable: boolean,
    public readonly details: unknown[] = [],
  ) {
    super(message);
    this.name = 'LlmGatewayError';
  }
}

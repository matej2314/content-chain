import { createGatewayModelAlias } from '@content-chain/shared';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import type { LlmGatewayPort } from '../src/llm/llm-gateway.port';
import { LLM_GATEWAY_PORT } from '../src/llm/llm.tokens';
import { newConversationId } from '../src/shared/http/new-ids';

const enabled = process.env.SMOKE_GATEWAY === '1';

(enabled ? describe : describe.skip)('smoke api → gateway', () => {
  it('completes native chat through LlmGatewayPort', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const port = moduleRef.get<LlmGatewayPort>(LLM_GATEWAY_PORT);
    const result = await port.chat({
      modelAlias: createGatewayModelAlias(
        process.env.GATEWAY_MODEL_ALIAS ?? 'chat-default',
      ),
      conversationId: newConversationId(),
      messages: [{ role: 'user', content: 'Reply with the single word pong.' }],
    });
    expect(result.text.length).toBeGreaterThan(0);
    expect(result.requestId.startsWith('req_')).toBe(true);
    expect(JSON.stringify(result)).not.toMatch(/X-Gateway-Key|GATEWAY_KEY/i);
    await moduleRef.close();
  });
});

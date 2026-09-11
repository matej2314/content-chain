import { Controller, Body, HttpCode, Post } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { COOKIE_AUTH_NAME } from '../shared/http/configure-swagger';
import { CreateFeedbackUseCase } from './application/create-feedback.use-case';
import { CreateFeedbackDto } from './http/dto/create-feedback.dto';
import type { AuthUserContext } from '../shared/types/auth-user-context';

@ApiTags('feedback')
@ApiCookieAuth(COOKIE_AUTH_NAME)
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly createFeedback: CreateFeedbackUseCase) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() body: CreateFeedbackDto,
    @CurrentUser() user: AuthUserContext,
  ) {
    const entry = await this.createFeedback.execute(body, user);
    return {
      id: entry.id,
      targetType: entry.targetType,
      agentKey: entry.agentKey,
      runId: entry.runId,
      body: entry.body,
      authorId: entry.authorId,
      createdAt: entry.createdAt.toISOString(),
    };
  }
}

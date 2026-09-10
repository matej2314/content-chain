import {
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  FEEDBACK_AGENT_KEYS,
  FEEDBACK_TARGET_TYPES,
} from '@content-chain/shared';
import { FEEDBACK_BODY_MAX } from '../../domain/feedback.types';

export class CreateFeedbackDto {
  @IsIn([...FEEDBACK_TARGET_TYPES])
  targetType!: (typeof FEEDBACK_TARGET_TYPES)[number];

  @IsString()
  @MinLength(1)
  @MaxLength(FEEDBACK_BODY_MAX)
  body!: string;

  @IsOptional()
  @IsIn([...FEEDBACK_AGENT_KEYS])
  agentKey?: (typeof FEEDBACK_AGENT_KEYS)[number];

  @IsOptional()
  @IsString()
  @MinLength(1)
  runId?: string;
}

import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import {
  RUN_STATUSES,
  RUN_TASK_TYPES,
  SOCIAL_PLATFORMS,
} from '@content-chain/shared';

export class ListRunsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsIn([...RUN_STATUSES])
  status?: (typeof RUN_STATUSES)[number];

  @IsOptional()
  @IsIn([...RUN_TASK_TYPES])
  taskType?: (typeof RUN_TASK_TYPES)[number];

  @IsOptional()
  @IsIn([...SOCIAL_PLATFORMS])
  platform?: (typeof SOCIAL_PLATFORMS)[number];

  @IsOptional()
  @IsString()
  userId?: string;
}

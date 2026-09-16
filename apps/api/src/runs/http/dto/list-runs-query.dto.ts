import { Transform, Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  RUN_PLATFORMS,
  RUN_STATUSES,
  RUN_TASK_TYPES,
  type RunStatus,
} from '@content-chain/shared';

function parseStatusQuery(value: unknown): RunStatus[] | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }
  if (Array.isArray(value)) {
    return value as RunStatus[];
  }
  if (typeof value !== 'string') {
    return value as RunStatus[];
  }
  const parts = value
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
  return [...new Set(parts)] as RunStatus[];
}

export class ListRunsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseStatusQuery(value))
  @IsArray()
  @ArrayUnique()
  @IsIn([...RUN_STATUSES], { each: true })
  status?: RunStatus[];

  @IsOptional()
  @IsIn([...RUN_TASK_TYPES])
  taskType?: (typeof RUN_TASK_TYPES)[number];

  @IsOptional()
  @IsIn([...RUN_PLATFORMS])
  platform?: (typeof RUN_PLATFORMS)[number];

  @IsOptional()
  @IsString()
  userId?: string;
}

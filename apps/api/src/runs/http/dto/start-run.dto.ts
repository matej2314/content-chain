import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  CONTENT_LANGUAGES,
  RUN_TASK_TYPES,
  SOCIAL_PLATFORMS,
} from '@content-chain/shared';

export class RunBriefDto {
  @IsString()
  topic!: string;

  @IsOptional()
  @IsString()
  audience?: string;

  @IsOptional()
  @IsString()
  goal?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  ideaCount?: number;
}

export class StartRunDto {
  @ApiProperty({ enum: RUN_TASK_TYPES })
  @IsIn([...RUN_TASK_TYPES])
  taskType!: (typeof RUN_TASK_TYPES)[number];

  @ApiProperty({ enum: SOCIAL_PLATFORMS })
  @IsIn([...SOCIAL_PLATFORMS])
  platform!: (typeof SOCIAL_PLATFORMS)[number];

  @ApiProperty({ enum: CONTENT_LANGUAGES })
  @IsIn([...CONTENT_LANGUAGES])
  language!: (typeof CONTENT_LANGUAGES)[number];

  @ValidateNested()
  @Type(() => RunBriefDto)
  brief!: RunBriefDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  selectedIdeaIds?: string[];
}

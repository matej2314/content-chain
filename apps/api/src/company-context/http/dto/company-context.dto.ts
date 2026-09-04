import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsString,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class OfferItemDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  benefit!: string[];

  @ApiProperty()
  @IsString()
  description!: string;
}

export class CtaItemDto {
  @ApiProperty()
  @IsString()
  label!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  target?: string;
}

export class AudienceProfileDto {
  @ApiProperty()
  @IsString()
  description!: string;
}

export class IdentityDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  description!: string;
}

export class OfferDto {
  @ApiProperty({ type: [OfferItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OfferItemDto)
  items!: OfferItemDto[];
}

export class VoiceDto {
  @ApiProperty()
  @IsString()
  weDo!: string;

  @ApiProperty()
  @IsString()
  weDont!: string;
}

export class CtaDto {
  @ApiProperty({ type: [CtaItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CtaItemDto)
  items!: CtaItemDto[];
}

export class AudienceDto {
  @ApiProperty({ type: [AudienceProfileDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AudienceProfileDto)
  profiles!: AudienceProfileDto[];
}

export class PatchIdentityDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;
}

export class PatchVoiceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  weDo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  weDont?: string;
}

export class PutCompanyContextDto {
  @ApiProperty({ type: IdentityDto })
  @ValidateNested()
  @Type(() => IdentityDto)
  identity!: IdentityDto;

  @ApiProperty({ type: OfferDto })
  @ValidateNested()
  @Type(() => OfferDto)
  offer!: OfferDto;

  @ApiProperty({ type: VoiceDto })
  @ValidateNested()
  @Type(() => VoiceDto)
  voice!: VoiceDto;

  @ApiProperty({ type: CtaDto })
  @ValidateNested()
  @Type(() => CtaDto)
  cta!: CtaDto;

  @ApiProperty({ type: AudienceDto })
  @ValidateNested()
  @Type(() => AudienceDto)
  audience!: AudienceDto;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: true,
    nullable: true,
    description:
      'CompanyContextExtras (Zod .strict() w application). Nieznane klucze → VALIDATION_FAILED. DTO = cienka bramka Nest (@IsObject).',
  })
  @IsOptional()
  @IsObject()
  extras?: Record<string, unknown> | null;
}

export class PatchCompanyContextDto {
  @ApiPropertyOptional({ type: PatchIdentityDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => PatchIdentityDto)
  identity?: PatchIdentityDto;

  @ApiPropertyOptional({ type: OfferDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => OfferDto)
  offer?: OfferDto;

  @ApiPropertyOptional({ type: PatchVoiceDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => PatchVoiceDto)
  voice?: PatchVoiceDto;

  @ApiPropertyOptional({ type: CtaDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CtaDto)
  cta?: CtaDto;

  @ApiPropertyOptional({ type: AudienceDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => AudienceDto)
  audience?: AudienceDto;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: true,
    nullable: true,
    description:
      'CompanyContextExtras (Zod .strict() w application). Nieznane klucze → VALIDATION_FAILED. DTO = cienka bramka Nest (@IsObject).',
  })
  @IsOptional()
  @IsObject()
  extras?: Record<string, unknown> | null;
}

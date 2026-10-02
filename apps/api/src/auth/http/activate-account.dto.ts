import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ActivateAccountDto {
  @ApiProperty({ minLength: 1 })
  @IsString()
  @MinLength(1)
  token!: string;
}

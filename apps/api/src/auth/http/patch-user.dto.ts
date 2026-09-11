import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsBoolean } from 'class-validator';

export class PatchUserDto {
  @ApiProperty({ type: Boolean, enum: [true] })
  @IsBoolean()
  @Equals(true)
  isActive!: true;
}

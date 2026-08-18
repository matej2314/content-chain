import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class HitlDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  selectedIdeaIds!: string[];
}

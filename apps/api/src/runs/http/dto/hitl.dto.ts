import { IsArray, IsString } from 'class-validator';

export class HitlDto {
  @IsArray()
  @IsString({ each: true })
  selectedIdeaIds!: string[];
}

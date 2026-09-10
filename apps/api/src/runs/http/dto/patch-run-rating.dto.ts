import { IsIn, ValidateIf } from 'class-validator';

export class PatchRunRatingDto {
  @ValidateIf((_, value: unknown) => value !== null)
  @IsIn([1, 2, 3, 4, 5])
  rating!: 1 | 2 | 3 | 4 | 5 | null;
}

import { IsNumber } from 'class-validator';

export class InsertScoreDto {
  @IsNumber()
  score: number;
}

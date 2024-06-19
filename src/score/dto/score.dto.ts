import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InsertScoreDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNumber()
  score: number;
}

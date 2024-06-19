import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InsertScoreDto } from './dto';
import { ScoreService } from './score.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(JwtGuard)
@Controller('scores')
export class ScoreController {
  constructor(private scoreService: ScoreService) {}

  @UseGuards(ThrottlerGuard)
  @Post()
  async insertScore(@GetUser() user: User, @Body() dto: InsertScoreDto) {
    return this.scoreService.insertScore(user, dto);
  }
}

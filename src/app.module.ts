import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { ScoreModule } from './score/score.module';

@Module({
  imports: [AuthModule, UserModule, LeaderboardModule, ScoreModule],
})
export class AppModule {}

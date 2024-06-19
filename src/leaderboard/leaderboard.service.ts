import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LeaderboardService {
  constructor(private prisma: PrismaService) {}

  async getLeaderboard() {
    return this.prisma
      .$queryRaw`SELECT username, MAX(score) max_score from public.scores GROUP BY username ORDER BY max_score DESC`;
  }
}

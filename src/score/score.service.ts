import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { InsertScoreDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ScoreService {
  constructor(private prisma: PrismaService) {}

  async insertScore(user: User, dto: InsertScoreDto) {
    try {
      const score = await this.prisma.score.create({
        data: {
          username: user.username,
          score: dto.score,
        },
      });

      return score;
    } catch (error) {
      throw error;
    }
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { InsertScoreDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ScoreService {
  constructor(private prisma: PrismaService) {}

  async insertScore(user: User, dto: InsertScoreDto) {
    try {
      // regular user only able to submit score for themself
      if (user.role === 'user' && user.username !== dto.username) {
        throw new ForbiddenException('Only able to submit own score');
      }

      const userCheck = await this.prisma.user.findUnique({
        where: {
          username: dto.username,
        },
      });
      if (!userCheck) throw new ForbiddenException('Username not exists');

      const score = await this.prisma.score.create({
        data: {
          username: dto.username,
          score: dto.score,
        },
      });

      return score;
    } catch (error) {
      throw error;
    }
  }
}

import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewRepo } from './review.repo';
import { PrismaService } from '@/shared/prisma-client/prisma.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepo, PrismaService],
})
export class ReviewModule {}

import { Module, forwardRef } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewRepo } from './review.repo';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { NotificationsModule } from '@/notifications/notifications.module';
import { ReviewRequestModule } from '@/review-request/review-request.module';
import { ReviewRequestRepo } from '@/review-request/review-request.repo';

@Module({
  imports: [NotificationsModule, forwardRef(() => ReviewRequestModule)],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepo, PrismaService,ReviewRequestRepo],
})
export class ReviewModule {}

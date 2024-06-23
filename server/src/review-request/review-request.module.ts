import { Module, forwardRef } from '@nestjs/common';
import { ReviewRequestService } from './review-request.service';
import { ReviewRequestController } from './review-request.controller';
import { ReviewRequestRepo } from './review-request.repo';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { ReportModule } from '@/report/report.module';
import { NotificationsModule } from '@/notifications/notifications.module';
import { ConfigModule } from '@/config/config.module';

@Module({
  imports: [forwardRef(() => ReportModule), NotificationsModule, ConfigModule],
  controllers: [ReviewRequestController],
  providers: [ReviewRequestService, ReviewRequestRepo, PrismaService],
  exports: [ReviewRequestService],
})
export class ReviewRequestModule {}

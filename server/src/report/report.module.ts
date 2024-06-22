import { Module, forwardRef } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ReportRepo } from './report.repo';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { NotificationsModule } from '@/notifications/notifications.module';
import { ReviewRequestModule } from '@/review-request/review-request.module';

@Module({
  imports: [NotificationsModule, forwardRef(() => ReviewRequestModule)],
  controllers: [ReportController],
  providers: [ReportService, ReportRepo, PrismaService],
  exports: [ReportService],
})
export class ReportModule {}

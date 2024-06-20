import { Module } from '@nestjs/common';
import { ReviewRequestService } from './review-request.service';
import { ReviewRequestController } from './review-request.controller';
import { ReviewRequestRepo } from './review-request.repo';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { ReportModule } from '@/report/report.module';
import { RadiologistRepo } from '@/radiologist/radiologist.repo';

@Module({
  imports: [ReportModule],
  controllers: [ReviewRequestController],
  providers: [
    ReviewRequestService,
    ReviewRequestRepo,
    PrismaService,
  ],
})
export class ReviewRequestModule {}

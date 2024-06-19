import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ReportRepo } from './report.repo';
import { PrismaService } from '@/shared/prisma-client/prisma.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService,ReportRepo,PrismaService],
})
export class ReportModule {}

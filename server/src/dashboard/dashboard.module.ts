import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { DashboardRepo } from './dashboard.repo';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, PrismaService, DashboardRepo],
})
export class DashboardModule {}

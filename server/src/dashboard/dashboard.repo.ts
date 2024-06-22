import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardRepo {
  constructor(private prisma: PrismaService) {}

  async getTotalReports() {
    try {
      return await this.prisma.report.count({});
    } catch (error) {
      throw error;
    }
  }

  async getAcceptedReports() {
    try {
      return await this.prisma.report.count({
        where: {
          ReviewRequest: {
            approved: true,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getRejectedReports() {
    try {
      return await this.prisma.report.count({
        where: {
          ReviewRequest: {
            approved: false,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getPendingReports() {
    try {
      return await this.prisma.report.count({
        where: {
          ReviewRequest: {
            approved: null,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

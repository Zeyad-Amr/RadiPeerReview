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

  async getAverageSuccessScore() {
    try {
      // calc average
      const overAllQuality = await this.prisma.report.findMany({
        where: {
          ReviewRequest: {
            approved: true,
          },
        },
        select: {
          Review: {
            select: {
              overallAssessment: {
                select: {
                  overallQuality: true,
                },
              },
            },
          },
        },
      });

      if (!overAllQuality.length) {
        return 0;
      }

      let sum = 0.0;
      overAllQuality.forEach((report) => {
        sum += report.Review.overallAssessment.overallQuality;
      });
      return sum / overAllQuality.length;
    } catch (error) {
      throw error;
    }
  }

  async getAverageFailureScore() {
    try {
      // calc average
      const overAllQuality = await this.prisma.report.findMany({
        where: {
          ReviewRequest: {
            approved: false,
          },
        },
        select: {
          Review: {
            select: {
              overallAssessment: {
                select: {
                  overallQuality: true,
                },
              },
            },
          },
        },
      });
      if (overAllQuality.length === 0) {
        return 0;
      }

      let sum = 0.0;
      overAllQuality.forEach((report) => {
        sum += report.Review.overallAssessment.overallQuality;
      });
      return sum / overAllQuality.length;
    } catch (error) {
      throw error;
    }
  }
}

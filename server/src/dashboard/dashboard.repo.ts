import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';

@Injectable()
export class DashboardRepo {
  constructor(private prisma: PrismaService) {}

  async getTotalReports() {
    try {
      return await this.prisma.reviewRequest.count({});
    } catch (error) {
      throw error;
    }
  }

  async getAcceptedReports() {
    try {
      return await this.prisma.reviewRequest.count({
        where: {
          status: Status.Completed,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getRejectedReports() {
    try {
      return await this.prisma.reviewRequest.count({
        where: {
          status: Status.Reviewed,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getPendingReports() {
    try {
      return await this.prisma.reviewRequest.count({
        where: {
          status: Status.Assigned,
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
            status: Status.Completed,
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
            status: Status.Reviewed,
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
        if (report.Review) { 
          sum += report.Review.overallAssessment.overallQuality;
        }
      });
      return sum / overAllQuality.length;
    } catch (error) {
      throw error;
    }
  }

  async getLeaderBoard() {
    try {
      const highestApprovalRadiologists =
        await this.prisma.reviewRequest.groupBy({
          by: 'creatorId',
          _count: { status: true },
          where: {
            status: Status.Completed,
          },
          orderBy: {
            _count: {
              status: 'desc',
            },
          },
          take: 5,
        });

      return highestApprovalRadiologists;
    } catch (error) {
      throw error;
    }
  }

  async getRadiologistsData(creatorIds: string[]) {
    try {
      return await this.prisma.auth.findMany({
        where: {
          id: {
            in: creatorIds,
          },
        },
        include: {
          radiologist: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

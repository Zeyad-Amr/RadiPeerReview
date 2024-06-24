import { PrismaGenericRepo } from '@/shared/prisma-client/prisma-generic.repo';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, ReviewRequest, Status } from '@prisma/client';

@Injectable()
export class ReviewRequestRepo extends PrismaGenericRepo<
  Prisma.ReviewRequestCreateInput,
  ReviewRequest,
  Prisma.ReviewRequestInclude
> {
  constructor(private prismaService: PrismaService) {
    super('reviewRequest', prismaService, {
      report: {
        include: {
          Review: {
            include: {
              feedbacks: true,
              accuracyOfFindings: true,
              clarityAndCompleteness: true,
              impressionAndRecommendations: true,
              technicalQuality: true,
              overallAssessment: true,
              complianceAndStandardization: true,
            },
          },
        },
      },
      reviewer: {
        select: {
          id: true,
          username: true,
          role: true,
          radiologist: true,
        },
      },
      creator: {
        select: {
          id: true,
          username: true,
          role: true,
          radiologist: true,
        },
      },
    });
  }

  async getOne(where: Prisma.ReviewRequestWhereInput) {
    try {
      const res = await this.prismaService.reviewRequest.findFirst({
        where,
        include: this.includesObj,
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getAllRequests(query: { [key: string]: any }, radiologistId: string) {
    try {
      const filters = Object.keys(query);
      const filterErrorMsg = (cause: string) =>
        `Invalid filter value: ${cause}`;

      // where object initialization
      const whereObj: Prisma.ReviewRequestWhereInput = {};

      // filter the query object and insert where clause in where object
      let q;
      filters.map((filter: any) => {
        if (this.accepted_filters.includes(filter)) {
          q = query[filter];
          switch (filter) {
            case 'user_is':
              if (q === 'creator') {
                whereObj['creatorId'] = radiologistId;
              } else if (q === 'reviewer') {
                whereObj['reviewerId'] = radiologistId;
              } else {
                throw new BadRequestException(filterErrorMsg('user_is'));
              }
              break;
            case 'status':
              if (!Object.keys(Status).includes(q)) {
                throw new BadRequestException(filterErrorMsg('status'));
              }
              whereObj['status'] = q;
              break;

            default:
              break;
          }
        }
      });

      // The QUERY
      const data = await this.prismaService.reviewRequest.findMany({
        where: whereObj,
        include: this.includesObj,
      });

      return data;
    } catch (error: any) {
      throw error;
    }
  }

  async getBestRadMatch(reportOwnerID: string) {
    try {
      // get highes matching between specializations
      const user = await this.prismaService.auth.findUnique({
        where: { id: reportOwnerID },
        include: {
          radiologist: {
            select: {
              specializations: true,
            },
          },
        },
      });

      if (!user) {
        // get one with least number of reports assigned
        return new NotFoundException('User not found');
      }

      const matchingRadiologists =
        await this.prismaService.radiologist.findMany({
          where: {
            id: {
              not: user.radiologistId,
            },
            specializations: {
              hasSome: user.radiologist.specializations,
            },
          },
          select: {
            auth: { select: { id: true } },
            specializations: true,
          },
        });

      const sortedRadiologists = matchingRadiologists
        .map((radiologist) => {
          const matchingCount = radiologist.specializations.filter((spec) =>
            user.radiologist.specializations.includes(spec),
          ).length;
          return { ...radiologist, matchingCount };
        })
        .filter((radiologist) => radiologist.matchingCount > 0)
        .sort((a, b) => b.matchingCount - a.matchingCount);

      if (sortedRadiologists.length === 0) {
        const result = await this.prismaService.reviewRequest.groupBy({
          by: ['reviewerId'],
          _count: {
            _all: true,
          },
          where: {
            reviewer: {
              isdeactivated: false,
            },
            status: 'Assigned',
          },
        });

        const radiologistsWithLeastReports = result.sort(
          (a, b) => a._count._all - b._count._all,
        );

        return radiologistsWithLeastReports[0];
      }
      // get the radiologists with the same matching count and select the one with the least number of reports
      const highestMatchingCount = sortedRadiologists[0]?.matchingCount || 0;

      // Get the radiologists with the same highest matching count
      const radiologistsWithHighestMatchingCount = sortedRadiologists.filter(
        (radiologist) => radiologist.matchingCount === highestMatchingCount,
      );

      // check if one of them does not have any reports assigned
      const radiologistWithNoReports =
        radiologistsWithHighestMatchingCount.find(async (radi) => {
          const count = await this.prismaService.reviewRequest.count({
            where: {
              reviewerId: radi.auth.id,
              status: 'Assigned',
              reviewer: {
                isdeactivated: false,
              },
            },
          });
          return count === 0;
        });

      if (radiologistWithNoReports) {
        return radiologistWithNoReports;
      }

      // Get the radiologist with the least number of reports
      const result = await this.prismaService.reviewRequest.groupBy({
        by: ['reviewerId'],
        _count: {
          _all: true,
        },
        where: {
          reviewerId: {
            in: radiologistsWithHighestMatchingCount.map(
              (radi) => radi.auth.id,
            ),
          },
          reviewer: {
            isdeactivated: false,
          },
          status: 'Assigned',
        },
      });

      const radiologistsWithLeastReports = result.sort(
        (a, b) => a._count._all - b._count._all,
      );

      return radiologistsWithLeastReports[0];
    } catch (error) {
      throw error;
    }
  }

  private accepted_filters = ['status', 'approved', 'user_is'];
}

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

  checkBool(s: string) {
    if (s === 'true') {
      return true;
    }
    if (s === 'false') {
      return false;
    } else {
      return s;
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
        return await this.prismaService.auth.findFirst({
          where: {
            role: 'RADIOLOGIST',
            isdeactivated: false,
          },
          select: {
            id: true,
          },
          orderBy: {
            ReviewRequestAsReviewer: {
              _count: 'asc',
            },
          },
        });
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
            id: true,
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
        throw new NotFoundException('No radiologist found');
      }

      return sortedRadiologists[0];
    } catch (error) {
      throw error;
    }
  }

  private accepted_filters = ['status', 'approved', 'user_is'];
}

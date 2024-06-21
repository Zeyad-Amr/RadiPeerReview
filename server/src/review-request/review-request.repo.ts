import { PrismaGenericRepo } from '@/shared/prisma-client/prisma-generic.repo';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
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
      reviewer: true,
      creator: true,
    });
  }

  async getAllRequests(query: { [key: string]: any }, radiologistId: string) {
    try {
      let filters = Object.keys(query);
      const filterErrorMsg = (cause: string) =>
        `Invalid filter value: ${cause}`;

      // where object initialization
      let whereObj: Prisma.ReviewRequestWhereInput = {};

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
            case 'approved':
              if (q === 'true') {
                whereObj['approved'] = true;
              } else if (q === 'false') {
                whereObj['approved'] = false;
              } else {
                throw new BadRequestException(filterErrorMsg('approved'));
              }
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

  private accepted_filters = ['status', 'approved', 'user_is'];
}

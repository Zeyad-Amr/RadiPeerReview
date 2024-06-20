import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaGenericRepo } from '@/shared/prisma-client/prisma-generic.repo';
import { Prisma, Review } from '@prisma/client';
import { PrismaService } from '@/shared/prisma-client/prisma.service';

@Injectable()
export class ReviewRepo extends PrismaGenericRepo<
  Prisma.ReviewCreateInput,
  Review,
  Prisma.ReviewInclude
> {
  constructor(private prismaService: PrismaService) {
    super('review', prismaService, {
      Report: true,
      feedbacks: true,
      accuracyOfFindings: true,
      clarityAndCompleteness: true,
      impressionAndRecommendations: true,
      technicalQuality: true,
      overallAssessment: true,
      complianceAndStandardization: true,
    });
  }
  async createReview(createReviewDto: CreateReviewDto) {
    const {
      feedbackToRadiologist,
      additionalReviewerComments,
      accuracyOfFindings,
      clarityAndCompleteness,
      impressionAndRecommendations,
      technicalQuality,
      overallAssessment,
      complianceAndStandardization,
      reportId,
    } = createReviewDto;
    const { correctnessOfFindings, commentsOnAccuracy, MissedFindings } =
      accuracyOfFindings;

    return await this.prismaService.review.create({
      data: {
        feedbackToRadiologist,
        additionalReviewerComments,
        Report: {
          connect: {
            id: reportId,
          },
        },
        accuracyOfFindings: accuracyOfFindings
          ? {
              create: {
                correctnessOfFindings,
                commentsOnAccuracy,
                MissedFinding: MissedFindings
                  ? {
                      createMany: {
                        data: MissedFindings,
                      },
                    }
                  : undefined,
              },
            }
          : undefined,
        clarityAndCompleteness: clarityAndCompleteness
          ? {
              create: clarityAndCompleteness,
            }
          : undefined,
        impressionAndRecommendations: impressionAndRecommendations
          ? {
              create: impressionAndRecommendations,
            }
          : undefined,
        technicalQuality: technicalQuality
          ? {
              create: technicalQuality,
            }
          : undefined,
        overallAssessment: overallAssessment
          ? {
              create: overallAssessment,
            }
          : undefined,
        complianceAndStandardization: complianceAndStandardization
          ? {
              create: complianceAndStandardization,
            }
          : undefined,
      },
      include: this.includesObj,
    });
  }
}

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
        reviewRequest: true,
        feedbacks: true,
        accuracyOfFindings: true,
        clarityAndCompleteness: true,
        impressionAndRecommendations: true,
        technicalQuality: true,
        overallAssessment: true,
        complianceAndStandardization: true,
      });
  }
  async createReview(createReviewDto: CreateReviewDto,reviewerId:string) {
    const {
      reviewRequestId,
      feedbackToRadiologist,
      additionalReviewerComments,
      accuracyOfFindings,
      clarityAndCompleteness,
      impressionAndRecommendations,
      technicalQuality,
      overallAssessment,
      complianceAndStandardization,
    } = createReviewDto;

    return await this.prismaService.$transaction(async (prisma) => {
      const review = await prisma.review.create({
        data: {
          reviewRequest: {
            connect: {
              id: reviewRequestId,
            },
          },
          feedbackToRadiologist,
          additionalReviewerComments,
          reviwer:{
            connect:{
                id:reviewerId
            }
          }
        },
      });

      if (accuracyOfFindings) {
        const { correctnessOfFindings, commentsOnAccuracy, missedFindings } =
          accuracyOfFindings;
        await prisma.accuracyOfFindings.create({
          data: {
            correctnessOfFindings,
            commentsOnAccuracy,
            missedFindings: missedFindings
              ? {
                  create: {
                    ...missedFindings,
                  },
                }
              : undefined,
            Review: { connect: { id: review.id } },
          },
        });
      }

      if (clarityAndCompleteness) {
        await prisma.clarityAndCompleteness.create({
          data: {
            ...clarityAndCompleteness,
            Review: { connect: { id: review.id } },
          },
        });
      }

      if (impressionAndRecommendations) {
        await prisma.impressionAndRecommendations.create({
          data: {
            ...impressionAndRecommendations,
            Review: { connect: { id: review.id } },
          },
        });
      }

      if (technicalQuality) {
        await prisma.technicalQuality.create({
          data: {
            ...technicalQuality,
            Review: { connect: { id: review.id } },
          },
        });
      }

      if (overallAssessment) {
        await prisma.overallAssessment.create({
          data: {
            ...overallAssessment,
            Review: { connect: { id: review.id } },
          },
        });
      }

      if (complianceAndStandardization) {
        await prisma.complianceAndStandardization.create({
          data: {
            ...complianceAndStandardization,
            Review: { connect: { id: review.id } },
          },
        });
      }

      return review;
    });
  }
}

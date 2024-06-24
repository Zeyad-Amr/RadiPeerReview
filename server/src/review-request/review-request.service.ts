import { BadRequestException, Injectable } from '@nestjs/common';
import { ReviewRequestRepo } from './review-request.repo';
import { Status } from '@prisma/client';

@Injectable()
export class ReviewRequestService {
  constructor(private reviewRequestRepo: ReviewRequestRepo) {}

  async createReviewRequest(name: string, reportId: string, creatorId: string) {
    try {
      const request = await this.reviewRequestRepo.create({
        name,
        report: {
          connect: {
            id: reportId,
          },
        },
        creator: {
          connect: {
            id: creatorId,
          },
        },
      });
      return request;
    } catch (error) {
      throw error;
    }
  }

  async assignReviewer(reviewRequestId: string, reviewerId: string) {
    try {
      const request = await this.reviewRequestRepo.update(reviewRequestId, {
        reviewer: {
          connect: {
            id: reviewerId,
          },
        },
      });
      return request;
    } catch (error) {
      throw error;
    }
  }

  async findAll(query, radiologistId) {
    try {
      const review = await this.reviewRequestRepo.getAllRequests(
        query,
        radiologistId,
      );
      return review;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const review = await this.reviewRequestRepo.getByID(id);
      return review;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const review = await this.reviewRequestRepo.delete(id);
      return review;
    } catch (error) {
      throw error;
    }
  }
  async assignReviewRequest(id: string, reviewerId: string) {
    try {
      const reviewRequest = await this.reviewRequestRepo.update(id, {
        reviewer: {
          connect: {
            id: reviewerId,
          },
        },
        status: Status.Assigned,
      });
      return reviewRequest;
    } catch (error) {
      throw error;
    }
  }

  async approveReviewRequest(id: string,status:number) {
    try {
      const reviewRequest = await this.reviewRequestRepo.update(id, {
        status: status === 1? Status.Completed: Status.Reviewed,
      });
      return reviewRequest;
    } catch (error) {
      throw error;
    }
  }

  async allocateRadiologist(reportOwnerID: string) {
    try {
      return await this.reviewRequestRepo.getBestRadMatch(reportOwnerID);
    } catch (error) {
      throw error;
    }
  }
}

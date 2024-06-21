import { Injectable } from '@nestjs/common';
import { ReviewRequestRepo } from './review-request.repo';

@Injectable()
export class ReviewRequestService {
  constructor(
    private reviewRequestRepo: ReviewRequestRepo,
  ) {}

  async createReviewRequest(
    reportId: string,
    creatorId: string,
  ) {
    try {
      return await this.reviewRequestRepo.create({
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
    } catch (error) {
      throw error;
    }
  }

  async findAll(query,radiologistId) {
    try {
      const review = await this.reviewRequestRepo.getAllRequests(query,radiologistId);
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

  async assignReview(id: string, reviewerId) {
    try {
      const review = await this.reviewRequestRepo.update(id, {
        reviewer: {
          connect: {
            id: reviewerId,
          },
        },
        status: 'Assigned',
      });
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
}

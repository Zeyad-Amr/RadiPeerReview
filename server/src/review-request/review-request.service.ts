import { Injectable } from '@nestjs/common';
import { ReviewRequestRepo } from './review-request.repo';
import { NotificationType, Role, Status } from '@prisma/client';

@Injectable()
export class ReviewRequestService {
  constructor(
    private reviewRequestRepo: ReviewRequestRepo,
  ) {}

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

  async approveReviewRequest(id: string) {
    try {
      const reviewRequest = await this.reviewRequestRepo.update(id, {
        approved: true,
      });
      return reviewRequest;
    } catch (error) {
      throw error;
    }
  }
}

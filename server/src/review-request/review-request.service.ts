import { Body, Injectable } from '@nestjs/common';
import { CreateReviewRequestDto } from './dto/create-review-request.dto';
import { UpdateReviewRequestDto } from './dto/update-review-request.dto';
import { ReviewRequestRepo } from './review-request.repo';
import { RadiologistRepo } from '@/radiologist/radiologist.repo';

@Injectable()
export class ReviewRequestService {
  constructor(
    private reviewRequestRepo: ReviewRequestRepo,
    private radiologistRepo: RadiologistRepo,
  ) {}

  async createReviewRequest(
    reportId: string,
    creatorId: string,
    autoAssign?: boolean,
  ) {
    try {
      let reviewerId;
      console.log('55', autoAssign);

      if (autoAssign) {
        const radiologists = await this.radiologistRepo.getAll();
        if (radiologists.length > 0) {
          const randomIndex = Math.floor(Math.random() * radiologists.length);
          reviewerId = radiologists[randomIndex].id;
        } else {
          throw new Error('No available radiologists for assignment');
        }
      }
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
        reviewer: reviewerId
          ? {
              connect: {
                id: reviewerId,
              },
            }
          : undefined,
        status: reviewerId ? 'Assigned' : undefined,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const review = await this.reviewRequestRepo.getAll();
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
        status:"Assigned"
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

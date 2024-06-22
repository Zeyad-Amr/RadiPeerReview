import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRepo } from './review.repo';
import { NotificationsService } from '@/notifications/notifications.service';
import { NotificationType, Role } from '@prisma/client';
import { ReviewRequestService } from '@/review-request/review-request.service';

@Injectable()
export class ReviewService {
  constructor(
    private reviewRepo: ReviewRepo,
    private notificationsService: NotificationsService,
    private reviewRequestService: ReviewRequestService,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    try {
      const review = await this.reviewRepo.createReview(createReviewDto);

      // Get Review Request
      const reviewRequest = await this.reviewRequestService.findOne(
        review.Report.reviewRequestId,
      );

      // Notify the Radiologist that the review has been completed
      this.notificationsService.notifyUser({
        receiverRole: Role.RADIOLOGIST,
        receiverId: reviewRequest.creatorId,
        type: NotificationType.REQUEST_REVIEWED,
        entityId: reviewRequest.id,
      });

      return review;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const review = await this.reviewRepo.getAll();
      return review;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const review = await this.reviewRepo.getByID(id);
      return review;
    } catch (error) {
      throw error;
    }
  }

  // async update(id: string, updateReviewDto: UpdateReviewDto) {
  //   try {
  //     const review = await this.reviewRepo.update(id,updateReviewDto);
  //     return review;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async remove(id: string) {
    try {
      const review = await this.reviewRepo.delete(id);
      return review;
    } catch (error) {
      throw error;
    }
  }
}

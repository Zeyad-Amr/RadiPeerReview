import { Injectable } from '@nestjs/common';
import { ReviewRequestRepo } from './review-request.repo';
import { NotificationsService } from '@/notifications/notifications.service';
import { NotificationType, Role, Status } from '@prisma/client';
import { ConfigService } from '@/config/config.service';
import { ConfigKeys } from '@/config/entities/config.entity';

@Injectable()
export class ReviewRequestService {
  constructor(
    private reviewRequestRepo: ReviewRequestRepo,
    private notificationsService: NotificationsService,
    private configService: ConfigService,
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

      const config = await this.configService.getConfig(
        ConfigKeys.ASSIGNMENT_MODE,
      );

      if (config.value.toLowerCase() === 'manual') {
        // If Assignment Mode is Manual, then notify the Admin
        this.notificationsService.notifyUser({
          receiverRole: Role.ADMIN,
          type: NotificationType.UNASSIGNED_REVIEW_REQUEST,
          entityId: request.id,
        });
      } else if (config.value.toLowerCase() === 'auto') {
        // If Assignment Mode is Auto, then notify the Radiologists
        this.notificationsService.notifyUser({
          receiverRole: Role.RADIOLOGIST,
          receiverId: creatorId, // TODO: Change this to the Radiologist ID after auto-assignment is implemented
          type: NotificationType.REQUEST_ASSIGNED,
          entityId: request.id,
        });
      }

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

      // Notify the Radiologist that the request has been assigned to them
      this.notificationsService.notifyUser({
        receiverRole: Role.RADIOLOGIST,
        receiverId: reviewerId,
        type: NotificationType.REQUEST_ASSIGNED,
        entityId: reviewRequest.id,
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

      // Notify the Radiologist that the request has been approved
      this.notificationsService.notifyUser({
        receiverRole: Role.RADIOLOGIST,
        receiverId: reviewRequest.creatorId,
        type: NotificationType.REQUEST_APPROVED,
        entityId: reviewRequest.id,
      });

      return reviewRequest;
    } catch (error) {
      throw error;
    }
  }
}

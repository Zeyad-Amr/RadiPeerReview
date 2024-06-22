import { Injectable } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';

import { NotifyUserDto } from './dto/notify-user.dto';
import { NotificationStatus, NotificationType, Role } from '@prisma/client';
import { NotificationsRepo } from './notifications.repo';
import { AuthRepo } from '@/auth/auth.repo';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsGateway: NotificationsGateway,
    private readonly notificationsRepo: NotificationsRepo,
    private readonly authRepo: AuthRepo,
  ) {}

  private generateMessage(type: NotificationType): string {
    switch (type) {
      case NotificationType.REQUEST_ASSIGNED:
        return 'You have been assigned a new review request. View the details in your dashboard.';
      case NotificationType.UNASSIGNED_REVIEW_REQUEST:
        return 'A new review request has been created and is currently unassigned. Assign it to a reviewer from your dashboard.';
      case NotificationType.REQUEST_REVIEWED:
        return 'Your review request has been completed. Check the details in your dashboard.';
      case NotificationType.REQUEST_REPORT_RESUBMITTED:
        return 'A report you reviewed has been resubmitted for further evaluation. Review the updated report in your dashboard.';
      case NotificationType.REVIEW_FEEDBACK_RECEIVED:
        return 'You have received new feedback on your review. See the feedback in your dashboard.';
      case NotificationType.REQUEST_APPROVED:
        return 'Your review request has been approved. View the approval details in your dashboard.';
      case NotificationType.GENERAL:
        return 'You have a new notification. Please check your dashboard for more details.';
      case NotificationType.REQUEST_REJECTED:
        return 'Your review request has been rejected. See the rejection details in your dashboard.';
      case NotificationType.REQUEST_REREVIEWED:
        return 'Your review request has been re-reviewed. Check the updated review details in your dashboard.';
      default:
        return 'You have a new notification. Please check your dashboard for more details.';
    }
  }

  async notifyUser(notifyUserDto: NotifyUserDto) {
    try {
      const { receiverId, message, receiverRole, entityId, type } =
        notifyUserDto;

      // Generate message if not provided
      const notificationMessage = message || this.generateMessage(type);

      // Save the notification to the database
      const createData = {
        message: notificationMessage,
        status: NotificationStatus.UNREAD,
        type,
        entityId,
      };
      if (receiverRole !== Role.ADMIN) {
        createData['receiver'] = { connect: { id: receiverId } };
      }

      await this.notificationsRepo.create(createData);

      // Send the notification via WebSocket
      if (receiverRole === Role.ADMIN) {
        this.notificationsGateway.sendNotificationToAllAdmins(
          notificationMessage,
        );
      } else {
        this.notificationsGateway.sendNotification(
          receiverId,
          notificationMessage,
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllNotifications() {
    try {
      return this.notificationsRepo.getAll();
    } catch (error) {
      throw error;
    }
  }

  async getUserNotifications(userId: string) {
    let user;

    try {
      user = await this.authRepo.getByID(userId);
    } catch (error) {
      throw { statusCode: 404, message: 'User not found' };
    }

    try {
      // Check if user is admin
      if (user && user.role === Role.ADMIN) {
        // If user is admin, fetch notifications with null receiver
        return this.notificationsRepo.getAll({
          where: { receiverId: null, status: NotificationStatus.UNREAD },
        });
      } else {
        // If user is not admin, fetch their notifications
        return this.notificationsRepo.getAll({
          where: { receiverId: userId, status: NotificationStatus.UNREAD },
          include: { receiver: true },
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async markAsRead(notificationId: string) {
    try {
      return this.notificationsRepo.update(notificationId, {
        status: NotificationStatus.READ,
      });
    } catch (error) {
      throw error;
    }
  }
}

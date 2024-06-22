import { Injectable } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';

import { NotifyUserDto } from './dto/notify-user.dto';
import { NotificationStatus, Role } from '@prisma/client';
import { NotificationsRepo } from './notifications.repo';
import { AuthRepo } from '@/auth/auth.repo';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsGateway: NotificationsGateway,
    private readonly notificationsRepo: NotificationsRepo,
    private readonly authRepo: AuthRepo,
  ) {}

  async notifyUser(notifyUserDto: NotifyUserDto) {
    const { receiverId, message, receiverRole, entityId, type } = notifyUserDto;

    // Save the notification to the database
    const createData = {
      message,
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
      this.notificationsGateway.sendNotificationToAllAdmins(message);
    } else {
      this.notificationsGateway.sendNotification(receiverId, message);
    }
  }

  async getAllNotifications() {
    return this.notificationsRepo.getAll();
  }

  async getUserNotifications(userId: string) {
    const user = await this.authRepo.getByID(userId);

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
  }

  async markAsRead(notificationId: string) {
    return this.notificationsRepo.update(notificationId, {
      status: NotificationStatus.READ,
    });
  }
}

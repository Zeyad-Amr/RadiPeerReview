// src/notifications/notifications.service.ts
import { Injectable } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
    constructor(private readonly notificationsGateway: NotificationsGateway) { }

    notifyUser(userId: string, message: string) {
        this.notificationsGateway.sendNotification(userId, message);
    }
}

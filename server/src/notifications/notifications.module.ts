import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsRepo } from './notifications.repo';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { AuthRepo } from '@/auth/auth.repo';

@Module({
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationsGateway,
    NotificationsRepo,
    PrismaService,
    AuthRepo,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}

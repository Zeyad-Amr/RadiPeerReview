import { Injectable } from '@nestjs/common';
import { PrismaGenericRepo } from '@/shared/prisma-client/prisma-generic.repo';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { Notification, Prisma } from '@prisma/client';

@Injectable()
export class NotificationsRepo extends PrismaGenericRepo<
  Prisma.NotificationCreateInput,
  Notification,
  Prisma.NotificationInclude
> {
  constructor(private prismaService: PrismaService) {
    super('notification', prismaService, {
      receiver: true,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationType } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async createApplicationNotification(userId: number, jobId: number) {
    return this.prisma.notifications.create({
      data: {
        userId,
        jobId,
        type: NotificationType.APPLICATION,
      },
    });
  }

  async createCancelNotification(userId: number, jobId: number) {
    return this.prisma.notifications.create({
      data: {
        userId,
        jobId,
        type: NotificationType.CANCEL,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Applications,
  Chats,
  Jobs,
  Notifications,
  Users,
} from '@prisma/client';

export type NotificationModel = Notifications & {
  jobs: Jobs & {
    applications: (Applications & {
      users: Users;
    })[];
    chats: Chats[];
    users: Users;
  };
  users: Users;
};

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async getUserNotifications(
    userId: number,
    unreadOnly: boolean = false,
  ): Promise<NotificationModel[]> {
    const notifications = await this.prisma.notifications.findMany({
      where: {
        userId: userId,
        ...(unreadOnly ? { readAt: null } : {}),
      },
      include: {
        jobs: {
          include: {
            applications: {
              include: {
                users: true,
              },
            },
            chats: true,
            users: true,
          },
        },
        users: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!unreadOnly) {
      // unreadOnlyがfalseの場合、readAtを更新
      const now = new Date();
      await this.prisma.notifications.updateMany({
        where: {
          userId: userId,
          readAt: null,
        },
        data: {
          readAt: now,
        },
      });
    }

    return notifications;
  }
}

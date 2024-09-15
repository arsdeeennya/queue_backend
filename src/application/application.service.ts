import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from './dto/application.dto';
import {
  Applications,
  Chats,
  Jobs,
  NotificationType,
  Users,
} from '@prisma/client';
import { IApplicationService } from './interface/application.interface';
import { v4 as uuidv4 } from 'uuid';

export type ApplicationModel = Applications & {
  jobs: Jobs & {
    users: Users;
    chats: Chats[];
  };
};

@Injectable()
export class ApplicationService implements IApplicationService {
  constructor(private prisma: PrismaService) {}

  // 応募を取得する
  async getApplications(userId: number): Promise<ApplicationModel[]> {
    // const result = await this.prisma.$queryRaw<ApplicationsWithJob[]>(
    //   Prisma.sql`
    //     SELECT *
    //     FROM "Applications" a
    //     JOIN "Job" j ON a."jobId" = j."id"
    //     JOIN "User" u ON j."userId" = u."id"
    //     WHERE (a."userId" = ${userId}
    //     AND a."updatedAt" != a."createdAt") OR a."jobId" IN (
    //       SELECT id FROM "Job" WHERE "userId" = ${userId}
    //     )
    //     ORDER BY
    //       CASE
    //         WHEN a."userId" = ${userId} AND a."updatedAt" != a."createdAt" THEN a."createdAt"
    //         WHEN a."jobId" IN (SELECT id FROM "Job" WHERE "userId" = ${userId}) THEN a."updatedAt"
    //       END DESC
    //   `,
    // );
    // return result;
    return await this.prisma.applications.findMany({
      include: {
        jobs: {
          include: {
            users: true,
            chats: true,
          },
        },
      },
      where: {
        OR: [
          {
            userId: userId,
            NOT: {
              updatedAt: {
                equals: this.prisma.applications.fields.createdAt,
              },
            },
          },
          { jobs: { userId: userId } },
        ],
      },
    });
  }

  // ここに並ぶ
  async createApplication(
    userId: number,
    dto: CreateApplicationDto,
  ): Promise<Applications> {
    // ジョブの応募者のステータスをチェック
    const existingApplication = await this.prisma.applications.findFirst({
      where: {
        jobId: dto.jobId,
        status: true,
      },
    });

    if (existingApplication) {
      throw new Error('このジョブは既に応募が承認されています。');
    }

    const application = await this.prisma.applications.create({
      data: {
        ...dto,
        userId: userId,
      },
    });
    const job = await this.prisma.jobs.findUnique({
      where: { id: dto.jobId },
    });
    await this.prisma.notifications.create({
      data: {
        userId: job.userId,
        ...dto,
        applicationId: application.id,
        type: NotificationType.APPLICATION,
      },
    });
    return application;
  }

  // 承諾or不承諾
  async updateApplication(
    userId: number,
    dto: UpdateApplicationDto,
  ): Promise<void> {
    const { notificationId, status } = dto;
    const notification = await this.prisma.notifications.findUnique({
      where: { id: notificationId },
      include: { applications: true, jobs: true },
    });

    if (!notification) {
      throw new Error('通知が見つかりません。');
    }

    // キャンセルされている場合は、承諾or不承諾できない
    if (notification.applications.deletedAt) {
      throw new Error('この応募はキャンセルされています。');
    }

    await this.prisma.$transaction(async () => {
      await this.prisma.applications.update({
        where: { id: notification.applicationId },
        data: { status },
      });

      const type = status ? NotificationType.APPROVAL : NotificationType.REJECT;
      await this.prisma.notifications.create({
        data: {
          userId: notification.applications.userId,
          jobId: notification.jobId,
          applicationId: notification.applicationId,
          type: type,
        },
      });

      if (status) {
        const uniqueId = uuidv4();
        await this.prisma.chats.create({
          data: {
            roomId: uniqueId,
            userId: userId,
            jobId: notification.jobId,
            text: '',
          },
        });
      }
    });
  }

  // キャンセル
  async cancelApplication(userId: number, jobId: number): Promise<void> {
    const application = await this.prisma.applications.findFirst({
      where: {
        userId: userId,
        jobId: jobId,
      },
    });

    if (!application) {
      throw new Error('応募が見つかりません。');
    }

    if (application.status) {
      throw new Error('このジョブは既に応募が承認されています。');
    }

    // ジョブ取得
    const job = await this.prisma.jobs.findUnique({
      where: { id: jobId },
    });

    await this.prisma.applications.updateMany({
      where: {
        userId: userId,
        jobId: jobId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    await this.prisma.notifications.create({
      data: {
        userId: job.userId,
        jobId: jobId,
        applicationId: application.id,
        type: NotificationType.CANCEL,
      },
    });
  }
}

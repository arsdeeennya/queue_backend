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

  // 承諾する
  async updateApplication(
    userId: number,
    dto: UpdateApplicationDto,
  ): Promise<void> {
    const { applicationId, jobId, status } = dto;
    await this.prisma.$transaction(async () => {
      await this.prisma.applications.update({
        where: { id: applicationId },
        data: { status },
      });
      await this.prisma.notifications.create({
        data: {
          userId,
          jobId,
          applicationId,
          type: NotificationType.APPROVAL,
        },
      });
      const uniqueId = uuidv4();
      // chatsにレコードcreate
      await this.prisma.chats.create({
        data: {
          roomId: uniqueId,
          userId: userId,
          jobId: jobId,
          text: '',
        },
      });
    });
  }

  // 取り消す
  async cancelApplication(userId: number, jobId: number): Promise<void> {
    const application = await this.prisma.applications.findFirst({
      where: {
        userId: userId,
        jobId: jobId,
      },
    });

    if (!application) {
      throw new Error('Application not found');
    }

    await this.prisma.applications.deleteMany({
      where: {
        userId: userId,
        jobId: jobId,
      },
    });

    await this.prisma.notifications.create({
      data: {
        userId,
        jobId: jobId,
        applicationId: application.id,
        type: NotificationType.CANCEL,
      },
    });
  }
}

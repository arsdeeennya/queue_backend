import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from './dto/application.dto';
import { Applications, Chats, Jobs, Users } from '@prisma/client';
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
    // console.log(8888888);
    // console.log(8888888);
    // console.log(8888888);
    // console.log(8888888);
    // console.log(8888888);
    // console.log(result);
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

  // 応募者を作成する
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

    // // notificationsテーブルにレコードを追加
    // await this.prisma.notifications.create({
    //   data: {
    //     userId,
    //     jobId: dto.jobId,
    //     type: NotificationType.APPLICATION,
    //   },
    // });
    return application;
  }

  // 応募者を更新する
  async updateApplication(
    userId: number,
    dto: UpdateApplicationDto,
  ): Promise<void> {
    const { applicationId, jobId, status } = dto;
    await this.prisma.applications.update({
      where: { id: applicationId },
      data: { status },
    });

    const uniqueId = uuidv4();
    console.log('A unique ID:', uniqueId);
    // chatsにレコードcreate
    await this.prisma.chats.create({
      data: {
        roomId: uniqueId,
        userId: userId,
        jobId: jobId,
        text: '',
      },
    });
  }

  // 取り消す
  async cancelApplication(userId: number, jobId: number): Promise<void> {
    await this.prisma.applications.deleteMany({
      where: {
        userId: userId,
        jobId: jobId,
      },
    });
  }
}

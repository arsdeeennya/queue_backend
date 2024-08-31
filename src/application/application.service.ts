import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from './dto/application.dto';
import { Applications, Jobs, Users } from '@prisma/client';
import { IApplicationService } from './interface/application.interface';

export type ApplicationsWithJob = Applications & {
  jobs: Jobs & {
    users: Users;
  };
};

@Injectable()
export class ApplicationService implements IApplicationService {
  constructor(private prisma: PrismaService) {}

  // 応募を取得する
  async getApplications(userId: number): Promise<ApplicationsWithJob[]> {
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
    return this.prisma.applications.create({
      data: {
        ...dto,
        userId: userId,
      },
    });
  }

  // 応募者を更新する
  async updateApplication(dto: UpdateApplicationDto): Promise<void> {
    const { applicationId, status } = dto;
    await this.prisma.applications.update({
      where: { id: applicationId },
      data: { status },
    });
    // // chatsにレコードcreate
    // await this.prisma.chats.create({
    //   data: {
    //     applicationId: applicationId,
    //     message: '応募が承認されました',
    //   },
    // });
  }
}

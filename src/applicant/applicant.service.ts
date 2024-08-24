import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApplicantDto, UpdateApplicantDto } from './dto/applicant.dto';
import { Applicants, Job, User } from '@prisma/client';
import { IApplicantService } from './interface/applicant.interface';
import { Prisma } from '@prisma/client';

export type ApplicantsWithJob = Applicants & {
  job: Job & {
    user: User;
  };
};

@Injectable()
export class ApplicantService implements IApplicantService {
  constructor(private prisma: PrismaService) {}

  // 応募を取得する
  async getApplicants(userId: number): Promise<ApplicantsWithJob[]> {
    // const result = await this.prisma.$queryRaw<ApplicantsWithJob[]>(
    //   Prisma.sql`
    //     SELECT *
    //     FROM "Applicants" a
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
    return await this.prisma.applicants.findMany({
      include: {
        job: {
          include: {
            user: true,
          },
        },
      },
      where: {
        OR: [
          {
            userId: userId,
            NOT: {
              updatedAt: {
                equals: this.prisma.applicants.fields.createdAt,
              },
            },
          },
          { job: { userId: userId } },
        ],
      },
    });
  }

  // 応募者を作成する
  async createApplicant(
    userId: number,
    dto: CreateApplicantDto,
  ): Promise<Applicants> {
    return this.prisma.applicants.create({
      data: {
        ...dto,
        userId: userId,
      },
    });
  }

  // 応募者を更新する
  async updateApplicant(dto: UpdateApplicantDto): Promise<void> {
    const { applicantId, status } = dto;
    await this.prisma.applicants.update({
      where: { id: applicantId },
      data: { status },
    });
  }
}

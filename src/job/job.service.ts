import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Applicants, Job, User } from '@prisma/client';
import {
  CreateJobDto,
  DeleteJobDto,
  // UpdateJobAddAcceptedIdDto,
  // UpdateJobAddRejectedIdDto,
  // UpdateJobDto,
} from './dto/update-job.dto';
import { IJobService } from './interface/job.interface';

export type JobWithApplicants = Job & {
  user: User;
  applicants: Applicants[];
};

@Injectable()
export class JobService implements IJobService {
  constructor(private prisma: PrismaService) {}

  getJobs(): Promise<JobWithApplicants[]> {
    return this.prisma.job.findMany({
      include: {
        user: true,
        applicants: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // async updateJobById(userId: number, dto: UpdateJobDto): Promise<Applicants> {
  //   const job = await this.prisma.job.findUnique({
  //     include: {
  //       applicants: true,
  //     },
  //     where: {
  //       id: dto.jobId,
  //     },
  //   });
  //   if (!job) throw new ForbiddenException('ジョブが見つかりません。');
  //   for (const applicant of job.applicants) {
  //     if (applicant.userId === userId) {
  //       throw new ForbiddenException('このユーザーはすでに応募しています。');
  //     }
  //   }

  //   return this.prisma.applicants.create({
  //     data: {
  //       ...dto,
  //       userId: userId,
  //     },
  //     // include: {
  //     //   applicants: true,
  //     // },
  //     // where: {
  //     //   // appilicantのuserIdがuserIdと一致するものを探す
  //     //   applicants: {
  //     //     some: {
  //     //       userId: userId,
  //     //     },
  //     //   },
  //     // },
  //     // data: {
  //     //   ...dto,
  //     // },
  //   });
  // }

  // async addAcceptedId(dto: UpdateJobAddAcceptedIdDto): Promise<void> {
  //   const job = await this.prisma.job.findUnique({
  //     where: {
  //       id: dto.jobId,
  //     },
  //   });
  //   if (!job) throw new ForbiddenException('ジョブが見つかりません。');

  //   await this.prisma.applicants.update({
  //     where: {
  //       jobId: dto.jobId,
  //       userId: dto.acceptedId,
  //     },
  //     data: {
  //       status: true,
  //     },
  //   });
  // }

  // async addRejectedId(dto: UpdateJobAddRejectedIdDto): Promise<void> {
  //   const job = await this.prisma.job.findUnique({
  //     where: {
  //       id: dto.jobId,
  //     },
  //   });
  //   if (!job) throw new ForbiddenException('ジョブが見つかりません。');

  //   await this.prisma.job.update({
  //     where: {
  //       id: dto.jobId,
  //     },
  //     data: {
  //       rejectedIds: {
  //         push: dto.rejectedId,
  //       },
  //     },
  //   });

  //   await this.prisma.notice.update({
  //     where: {
  //       id: dto.noticeId,
  //     },
  //     data: {
  //       answer: false,
  //     },
  //   });
  // }

  async createJob(userId: number, dto: CreateJobDto): Promise<Job> {
    return this.prisma.job.create({
      data: {
        ...dto,
        userId: userId,
      },
    });
  }

  async deleteJobById(userId: number, dto: DeleteJobDto): Promise<void> {
    const job = await this.prisma.job.findUnique({
      where: {
        id: dto.jobId,
      },
    });

    if (!job || job.userId !== userId)
      throw new ForbiddenException('No permission to delete');

    await this.prisma.job.delete({
      where: {
        id: dto.jobId,
      },
    });
  }
}

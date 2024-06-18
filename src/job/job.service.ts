import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Job } from '@prisma/client';
import {
  CreateJobDto,
  DeleteJobDto,
  UpdateJobAddAcceptedIdDto,
  UpdateJobAddRejectedIdDto,
  UpdateJobDto,
} from './dto/update-job.dto';
import { IJobService } from './interface/job.interface';

@Injectable()
export class JobService implements IJobService {
  constructor(private prisma: PrismaService) {}

  getJobs(): Promise<Job[]> {
    return this.prisma.job.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateJobById(userId: number, dto: UpdateJobDto): Promise<Job> {
    const job = await this.prisma.job.findUnique({
      where: {
        id: dto.jobId,
      },
    });
    if (!job) throw new ForbiddenException('ジョブが見つかりません。');
    if (job.applicants.includes(userId)) {
      throw new ForbiddenException('このユーザーはすでに応募しています。');
    }

    return this.prisma.job.update({
      where: {
        id: dto.jobId,
      },
      data: {
        applicants: {
          push: userId,
        },
      },
    });
  }

  async addAcceptedId(dto: UpdateJobAddAcceptedIdDto): Promise<void> {
    const job = await this.prisma.job.findUnique({
      where: {
        id: dto.jobId,
      },
    });
    if (!job) throw new ForbiddenException('ジョブが見つかりません。');

    await this.prisma.job.update({
      where: {
        id: dto.jobId,
      },
      data: {
        acceptedId: dto.acceptedId,
      },
    });
  }

  async addRejectedId(dto: UpdateJobAddRejectedIdDto): Promise<void> {
    const job = await this.prisma.job.findUnique({
      where: {
        id: dto.jobId,
      },
    });
    if (!job) throw new ForbiddenException('ジョブが見つかりません。');

    await this.prisma.job.update({
      where: {
        id: dto.jobId,
      },
      data: {
        rejectedIds: {
          push: dto.rejectedId,
        },
      },
    });
  }

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

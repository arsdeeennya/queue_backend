import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Notice } from '@prisma/client';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { INoticeService } from 'src/notice/interface/notice.interface';

@Injectable()
export class NoticeService implements INoticeService {
  constructor(private prisma: PrismaService) {}

  async getNotices(userId: number): Promise<Notice[]> {
    return await this.prisma.notice.findMany({
      where: {
        userId: userId,
        read: false,
      },
    });
  }

  // async updateJobById(userId: number, dto: UpdateJobDto): Promise<any> {
  //   const job = await this.prisma.job.findUnique({
  //     where: {
  //       id: dto.jobId,
  //     },
  //   });
  //   if (!job) throw new ForbiddenException('ジョブが見つかりません。');
  //   if (job.applicants.includes(userId)) {
  //     throw new ForbiddenException('このユーザーはすでに応募しています。');
  //   }

  //   return this.prisma.job.update({
  //     where: {
  //       id: dto.jobId,
  //     },
  //     data: {
  //       applicants: {
  //         push: userId,
  //       },
  //     },
  //   });
  // }

  async createNotice(userId: number, dto: CreateNoticeDto): Promise<void> {
    const job = await this.prisma.job.findUnique({
      where: {
        id: dto.jobId,
      },
    });
    if (!job) throw new ForbiddenException('ジョブが見つかりません。');

    await this.prisma.notice.create({
      include: {
        job: true,
      },
      data: {
        ...dto,
        userId: userId,
        applicantId: userId,
        recruiterId: job.userId,
      },
    });
  }

  // async deleteJobById(userId: number, dto: DeleteJobDto): Promise<void> {
  //   const job = await this.prisma.job.findUnique({
  //     where: {
  //       id: dto.jobId,
  //     },
  //   });

  //   if (!job || job.userId !== userId)
  //     throw new ForbiddenException('No permission to delete');

  //   await this.prisma.job.delete({
  //     where: {
  //       id: dto.jobId,
  //     },
  //   });
  // }
}
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApplicantDto } from './dto/applicant.dto';
import { Applicants } from '@prisma/client';
import { IApplicantService } from './interface/applicant.interface';

@Injectable()
export class ApplicantService implements IApplicantService {
  constructor(private prisma: PrismaService) {}

  // 応募を取得する
  getApplicants(): Promise<Applicants[]> {
    return this.prisma.applicants.findMany();
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
}

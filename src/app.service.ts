import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { IUserService } from './user/interface/user.interface';
import { Job, User, Applicants } from '@prisma/client';

export type UserWithJobs = User & {
  jobs: (Job & {
    applicants: Applicants[];
  })[];
};

@Injectable()
export class UserService implements IUserService {
  constructor(private prisma: PrismaService) {}

  getUser(userId: number): Promise<UserWithJobs> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        jobs: {
          include: {
            applicants: true,
          },
        },
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Applicants, Job, User } from '@prisma/client';
import { IUserService } from './interface/user.interface';

export type UserWithJobs = User & {
  jobs: (Job & {
    applicants: Applicants[];
  })[];
};

@Injectable()
export class UserService implements IUserService {
  constructor(private prisma: PrismaService) {}

  async updateUser(
    userId: number,
    dto: UpdateUserDto,
  ): Promise<Omit<User, 'hashedPassword'>> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    delete user.hashedPassword;
    return user;
  }

  async getUser(userId: number): Promise<UserWithJobs> {
    return await this.prisma.user.findUnique({
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

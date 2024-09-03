import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users, Jobs, Applications } from '@prisma/client';
import { IUserService } from './interface/user.interface';

export type UserModel = Users & {
  jobs: (Jobs & {
    applications: Applications[];
  })[];
};

@Injectable()
export class UserService implements IUserService {
  constructor(private prisma: PrismaService) {}

  async updateUser(
    userId: number,
    dto: UpdateUserDto,
  ): Promise<Omit<Users, 'hashedPassword'>> {
    const user = await this.prisma.users.update({
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

  async getUser(userId: number): Promise<UserModel> {
    return await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
      include: {
        jobs: {
          include: {
            applications: true,
          },
        },
      },
    });
  }
}

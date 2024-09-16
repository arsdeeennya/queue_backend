import { Injectable, ForbiddenException } from '@nestjs/common';
import { Chats } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { IChatService } from './interface/chat.interface';

@Injectable()
export class ChatService implements IChatService {
  constructor(private readonly prisma: PrismaService) {}

  async getChats(id: string, userId: number): Promise<Chats[]> {
    const job = await this.prisma.jobs.findFirst({
      where: {
        chats: {
          some: {
            roomId: id,
          },
        },
      },
      include: {
        applications: {
          where: {
            status: true,
          },
        },
      },
    });

    if (
      !job ||
      (job.userId !== userId &&
        !job.applications.some((app) => app.userId === userId))
    ) {
      throw new ForbiddenException(
        'このチャットにアクセスする権限がありません。',
      );
    }

    return this.prisma.chats.findMany({
      where: {
        roomId: id,
        text: {
          not: '',
        },
      },
    });
  }

  createChat(userId: string, chat: Chats): Promise<Chats> {
    return this.prisma.chats.create({
      data: {
        ...chat,
        userId: Number(userId),
      },
    });
  }
}

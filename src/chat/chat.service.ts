import { Injectable } from '@nestjs/common';
import { Chats } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { IChatService } from './interface/chat.interface';

@Injectable()
export class ChatService implements IChatService {
  constructor(private readonly prisma: PrismaService) {}

  getChats(id: string): Promise<Chats[]> {
    return this.prisma.chats.findMany({
      where: {
        roomId: id,
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

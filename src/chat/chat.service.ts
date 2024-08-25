import { Injectable } from '@nestjs/common';
import { Chats } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { IChatService } from './interface/chat.interface';

@Injectable()
export class ChatService implements IChatService {
  constructor(private readonly prisma: PrismaService) {}

  getChats(): Promise<Chats[]> {
    return this.prisma.chats.findMany();
  }
}

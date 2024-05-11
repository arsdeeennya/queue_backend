import { Injectable } from '@nestjs/common';
import { Chat } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { IChatService } from './interface/chat.interface';

@Injectable()
export class ChatService implements IChatService {
  constructor(private readonly prisma: PrismaService) {}

  getChats(): Promise<Chat[]> {
    return this.prisma.chat.findMany();
  }
}

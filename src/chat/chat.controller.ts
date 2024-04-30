import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from '@prisma/client';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getChats(): Promise<Chat[]> {
    return this.chatService.getChats();
  }
}

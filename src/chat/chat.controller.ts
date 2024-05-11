import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from '@prisma/client';

@Controller('chat')
export class ChatController {
  constructor(
    @Inject('ChatService')
    private readonly chatService: ChatService,
  ) {}

  @Get()
  getChats(): Promise<Chat[]> {
    return this.chatService.getChats();
  }
}

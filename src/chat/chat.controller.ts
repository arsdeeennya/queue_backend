import { Controller, Get, Inject } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chats } from '@prisma/client';

@Controller('chat')
export class ChatController {
  constructor(
    @Inject('ChatService')
    private readonly chatService: ChatService,
  ) {}

  @Get()
  getChats(): Promise<Chats[]> {
    return this.chatService.getChats();
  }
}

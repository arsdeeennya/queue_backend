import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chats } from '@prisma/client';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('chat')
export class ChatController {
  constructor(
    @Inject('ChatService')
    private readonly chatService: ChatService,
  ) {}

  @Get(':id')
  getChats(@Param('id') id: string): Promise<Chats[]> {
    return this.chatService.getChats(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createChat(@Req() req: Request, @Body() chat: Chats): Promise<Chats> {
    console.log(33333, req.user);
    return this.chatService.createChat(req.user.id, chat);
  }
}

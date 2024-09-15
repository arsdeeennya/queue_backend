import { Controller, Get, Req, UseGuards, Query } from '@nestjs/common';
import { NotificationModel, NotificationService } from './notification.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getNotifications(
    @Req() req: Request,
    @Query('unreadOnly') unreadOnly?: string,
  ): Promise<NotificationModel[]> {
    const unreadOnlyBool = unreadOnly === 'true';
    return this.notificationService.getUserNotifications(
      req.user.id,
      unreadOnlyBool,
    );
  }
}

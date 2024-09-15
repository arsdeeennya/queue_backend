import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { NotificationModel, NotificationService } from './notification.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getNotifications(@Req() req: Request): Promise<NotificationModel[]> {
    return this.notificationService.getUserNotifications(req.user.id);
  }
}

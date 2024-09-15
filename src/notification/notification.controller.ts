import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  //   @Post('application')
  //   async createApplicationNotification(
  //     @Body() body: { userId: number; jobId: number },
  //   ) {
  //     return this.notificationService.createApplicationNotification(
  //       body.userId,
  //       body.jobId,
  //     );
  //   }

  //   @Post('cancel')
  //   async createCancelNotification(
  //     @Body() body: { userId: number; jobId: number },
  //   ) {
  //     return this.notificationService.createCancelNotification(
  //       body.userId,
  //       body.jobId,
  //     );
  //   }
}

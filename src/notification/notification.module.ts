import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { PrismaModule } from '../prisma/prisma.module'; // このパスは実際の構造に合わせて調整してください

@Module({
  imports: [PrismaModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}

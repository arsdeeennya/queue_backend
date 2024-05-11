import { Module } from '@nestjs/common';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NoticeController],
  providers: [
    {
      provide: 'NoticeService',
      useClass: NoticeService,
    },
  ],
})
export class NoticeModule {}

import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ApplicationController],
  providers: [
    {
      provide: 'ApplicationService',
      useClass: ApplicationService,
    },
  ],
})
export class ApplicationModule {}

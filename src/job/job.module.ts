import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [JobController],
  providers: [
    {
      provide: 'JobService',
      useClass: JobService,
    },
  ],
})
export class JobModule {}

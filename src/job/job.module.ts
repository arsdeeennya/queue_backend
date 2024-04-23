import { Module } from '@nestjs/common';
// import { PrismaModule } from 'src/prisma/prisma.module';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  // imports: [],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
